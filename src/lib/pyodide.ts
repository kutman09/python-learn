export interface RunResult {
  stdout: string;
  stderr: string;
  error?: string;
  checkSuccess?: boolean;
  checkError?: string;
}

let pyodideWorker: Worker | null = null;
let runPromiseResolvers: Record<string, { resolve: (res: any) => void; reject: (err: any) => void }> = {};
let initPromise: Promise<void> | null = null;
let currentStdout = '';
let currentStderr = '';
let currentId = '';
let timeoutId: NodeJS.Timeout | null = null;

export function getPyodideWorker(): Promise<Worker> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Window undefined'));
    
    if (pyodideWorker && initPromise) {
      initPromise.then(() => resolve(pyodideWorker!)).catch(reject);
      return;
    }

    pyodideWorker = new Worker('/pyodideWorker.js');
    
    initPromise = new Promise((initResolve, initReject) => {
      pyodideWorker!.onmessage = (event) => {
        const { type, id, text, error, checkSuccess, checkError } = event.data;
        
        if (type === 'init_complete') {
          initResolve();
        } else if (type === 'init_error') {
          initReject(new Error(error));
        } else if (type === 'run_start') {
          // This means pyodide is ready and execution just started. Now we start the timeout timer!
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            if (runPromiseResolvers[id]) {
              console.warn("Timeout reached, terminating worker.");
              pyodideWorker?.terminate();
              pyodideWorker = null;
              initPromise = null;
              const resolvers = runPromiseResolvers[id];
              delete runPromiseResolvers[id];
              resolvers.resolve({
                stdout: currentStdout,
                stderr: currentStderr,
                error: "TimeoutError: Код выполняется слишком долго. Возможно, бесконечный цикл."
              });
            }
          }, 5000);
        } else if (type === 'stdout') {
          if (id === currentId || !id) currentStdout += text + '\n';
        } else if (type === 'stderr') {
          if (id === currentId || !id) currentStderr += text + '\n';
        } else if (type === 'success' || type === 'error') {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = null;
          
          const resolvers = runPromiseResolvers[id];
          if (resolvers) {
            resolvers.resolve({
              stdout: currentStdout,
              stderr: currentStderr,
              error: type === 'error' ? error : undefined,
              checkSuccess,
              checkError
            });
            delete runPromiseResolvers[id];
          }
        }
      };
      
      // Start init
      pyodideWorker!.postMessage({ command: 'init' });
    });
    
    initPromise.then(() => resolve(pyodideWorker!)).catch(reject);
  });
}

// Prefetch pyodide when called
export function initPyodide() {
  getPyodideWorker().catch(e => console.error("Prefetch Pyodide Error:", e));
}

export async function runPythonCode(code: string, checkScript?: string): Promise<RunResult> {
  const worker = await getPyodideWorker();

  const id = Math.random().toString(36).substring(7);
  currentId = id;
  currentStdout = '';
  currentStderr = '';

  return new Promise((resolve, reject) => {
    runPromiseResolvers[id] = { resolve, reject };

    worker.postMessage({
      command: 'run',
      id,
      code,
      checkScript
    });
  });
}
