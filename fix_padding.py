import os
import re

def fix_first_section_padding(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace `py-20 lg:py-32` with `pt-10 pb-20 lg:pt-16 lg:pb-32` 
    # ONLY on the first <section> or hero div right after <PageWrapper>
    
    # Simple regex to replace the first occurrence of py-16, py-20, py-24, py-32 with pt-8 pb-16 etc.
    # Actually, a simpler way is to find the first <section className="..."> and replace py-\d+ with pt-8 pb-16
    
    # Find the first section tag
    match = re.search(r'<section className="([^"]+)">', content)
    if match:
        class_str = match.group(1)
        # If it has py-20 lg:py-32 or something similar
        new_class_str = class_str
        
        # Replace py-\d+
        new_class_str = re.sub(r'\bpy-16\b', 'pt-8 pb-16', new_class_str)
        new_class_str = re.sub(r'\bpy-20\b', 'pt-8 pb-20', new_class_str)
        new_class_str = re.sub(r'\bpy-24\b', 'pt-10 pb-24', new_class_str)
        new_class_str = re.sub(r'\bpy-32\b', 'pt-12 pb-32', new_class_str)
        
        # Replace lg:py-\d+
        new_class_str = re.sub(r'\blg:py-24\b', 'lg:pt-12 lg:pb-24', new_class_str)
        new_class_str = re.sub(r'\blg:py-32\b', 'lg:pt-16 lg:pb-32', new_class_str)
        
        if new_class_str != class_str:
            new_content = content[:match.start(1)] + new_class_str + content[match.end(1):]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed padding in {filepath}")

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                fix_first_section_padding(os.path.join(root, file))

if __name__ == '__main__':
    process_dir('src/pages')
