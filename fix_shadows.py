import os
import re

def fix_shadows(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # replace the cascaded shadow classes
    # e.g., shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-black/40 shadow-black/20 shadow-black/20 shadow-black/20
    # we just want standard tailwind shadows for dark theme: shadow-md shadow-black/20, shadow-lg shadow-black/40, shadow-xl shadow-black/50
    
    new_content = content
    # A regex to catch all corrupted shadow strings
    pattern = r'shadow-\[0_25px_50px_-12px_rgba\(0,0,0,0\.5\)\](\s*shadow-black/\d+)+'
    new_content = re.sub(pattern, 'shadow-2xl shadow-black/50', new_content)
    
    pattern2 = r'shadow-xl(\s*shadow-black/\d+)+'
    new_content = re.sub(pattern2, 'shadow-xl shadow-black/40', new_content)

    pattern3 = r'shadow-lg(\s*shadow-black/\d+)+'
    new_content = re.sub(pattern3, 'shadow-lg shadow-black/30', new_content)
    
    pattern4 = r'shadow-md(\s*shadow-black/\d+)+'
    new_content = re.sub(pattern4, 'shadow-md shadow-black/20', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                fix_shadows(os.path.join(root, file))

if __name__ == '__main__':
    process_dir('src/components')
    process_dir('src/pages')
