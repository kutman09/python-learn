import os, re
for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith('.scss'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            if 'darken(' in content or 'lighten(' in content:
                content = re.sub(r'darken\(([^,]+),\s*([^)]+)\)', r'color.adjust(\1, $lightness: -\2)', content)
                content = re.sub(r'lighten\(([^,]+),\s*([^)]+)\)', r'color.adjust(\1, $lightness: \2)', content)
                
                if "@use 'sass:color';" not in content and '@use "sass:color";' not in content:
                    content = "@use 'sass:color';\n" + content
                    
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
