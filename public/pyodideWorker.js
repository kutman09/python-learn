self.importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

let pyodideReadyPromise;
let currentRunId = null;

async function loadPyodideAndPackages() {
  self.pyodide = await self.loadPyodide();
  self.pyodide.setStdout({ batched: (msg) => {
    if (currentRunId) {
      self.postMessage({ type: 'stdout', id: currentRunId, text: msg });
    }
  }});
  self.pyodide.setStderr({ batched: (msg) => {
    if (currentRunId) {
      self.postMessage({ type: 'stderr', id: currentRunId, text: msg });
    }
  }});
  return self.pyodide;
}

self.onmessage = async (event) => {
  const { command, id, code, checkScript, context } = event.data;
  
  if (command === 'init') {
    if (!pyodideReadyPromise) {
      pyodideReadyPromise = loadPyodideAndPackages();
    }
    try {
      await pyodideReadyPromise;
      self.postMessage({ type: 'init_complete' });
    } catch (err) {
      self.postMessage({ type: 'init_error', error: err.message });
    }
    return;
  }
  
  if (command === 'run') {
    currentRunId = id;
    
    if (!pyodideReadyPromise) {
      pyodideReadyPromise = loadPyodideAndPackages();
    }
    
    try {
      await pyodideReadyPromise;
      // Signal that execution is starting (to start the timeout safely)
      self.postMessage({ type: 'run_start', id });
      
      const pyodide = self.pyodide;
      const globals = pyodide.globals.get("dict")();
      
      if (context) {
        for (const [key, value] of Object.entries(context)) {
          globals.set(key, value);
        }
      }

      try {
        await pyodide.runPythonAsync(code, { globals });
        
        let checkSuccess = true;
        let checkError = null;
        if (checkScript) {
          try {
            await pyodide.runPythonAsync(checkScript, { globals });
          } catch (err) {
            checkSuccess = false;
            checkError = err.message;
          }
        }
        
        self.postMessage({ type: 'success', id, checkSuccess, checkError });
      } catch (err) {
        self.postMessage({ type: 'error', id, error: err.message });
      } finally {
        globals.destroy();
        currentRunId = null;
      }
    } catch (err) {
      self.postMessage({ type: 'error', id, error: "Failed to initialize Pyodide: " + err.message });
      currentRunId = null;
    }
  }
};

self.onerror = (err) => {
  console.error("Worker error:", err);
};

self.onunhandledrejection = (err) => {
  console.error("Worker unhandled rejection:", err);
};
