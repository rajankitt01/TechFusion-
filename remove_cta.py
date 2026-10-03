import os
import re

def remove_cta(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(r"import\s*\{\s*CTA\s*\}\s*from\s*'[^']*(CTA|CTA\.jsx?)';\n?", "", content)
    new_content = re.sub(r"\s*<CTA\s*/>\s*", "\n", new_content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed CTA from {filepath}")

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                remove_cta(os.path.join(root, file))

if __name__ == '__main__':
    process_dir('src/pages')
    process_dir('src/components')
