with open('src/data/lessons/lesson-5-loops.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('`count = 0`', '<code>count = 0</code>')
text = text.replace('`print(x)`', '<code>print(x)</code>')
text = text.replace('`for user in users:`', '<code>for user in users:</code>')
text = text.replace('`print(f"Hello, {user}")`', '<code>print(f"Hello, {user}")</code>')
text = text.replace('`users = ["Tom", "Jerry"]`', '<code>users = ["Tom", "Jerry"]</code>')

with open('src/data/lessons/lesson-5-loops.ts', 'w', encoding='utf-8') as f:
    f.write(text)
