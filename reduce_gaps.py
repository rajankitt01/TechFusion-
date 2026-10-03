import os
import re

replacements = {
    # Y-axis padding
    r'\bpy-32\b': 'py-20',
    r'\blg:py-32\b': 'lg:py-20',
    r'\bpy-24\b': 'py-16',
    r'\blg:py-24\b': 'lg:py-16',
    r'\bpy-20\b': 'py-12',
    r'\blg:py-20\b': 'lg:py-16',
    r'\bpy-16\b': 'py-10',
    r'\blg:py-16\b': 'lg:py-12',
    
    # Bottom padding
    r'\bpb-32\b': 'pb-20',
    r'\blg:pb-32\b': 'lg:pb-20',
    r'\bpb-24\b': 'pb-16',
    r'\blg:pb-24\b': 'lg:pb-16',
    r'\bpb-20\b': 'pb-12',
    r'\blg:pb-20\b': 'lg:pb-16',
    r'\bpb-16\b': 'pb-10',
    r'\blg:pb-16\b': 'lg:pb-12',

    # Top padding
    r'\bpt-32\b': 'pt-20',
    r'\blg:pt-32\b': 'lg:pt-20',
    r'\bpt-24\b': 'pt-16',
    r'\blg:pt-24\b': 'lg:pt-16',
    r'\bpt-20\b': 'pt-12',
    r'\blg:pt-20\b': 'lg:pt-16',
    r'\bpt-16\b': 'pt-10',
    r'\blg:pt-16\b': 'lg:pt-12',
    
    # Margin bottom (for section headings)
    r'\bmb-16\b': 'mb-10',
    r'\bmb-12\b': 'mb-8',
}

def reduce_gaps(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old_pattern, new_class in replacements.items():
        new_content = re.sub(old_pattern, new_class, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Reduced gaps in {filepath}")

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                reduce_gaps(os.path.join(root, file))

if __name__ == '__main__':
    process_dir('src/components')
    process_dir('src/pages')
