import os
import re

replacements = {
    'bg-white': 'bg-[#111827]',
    'bg-gray-50': 'bg-[#0B1220]',
    'bg-slate-900': 'bg-[#0B1220]',
    'bg-slate-800': 'bg-[#111827]',
    'text-slate-900': 'text-[#F8FAFC]',
    'text-gray-900': 'text-[#F8FAFC]',
    'text-gray-800': 'text-[#F8FAFC]',
    'text-gray-700': 'text-[#94A3B8]',
    'text-gray-600': 'text-[#94A3B8]',
    'text-gray-500': 'text-[#94A3B8]',
    'text-slate-500': 'text-[#94A3B8]',
    'border-gray-100': 'border-[#1F2937]',
    'border-gray-200': 'border-[#1F2937]',
    'border-gray-300': 'border-[#1F2937]',
    'border-slate-700': 'border-[#1F2937]',
    'bg-blue-50': 'bg-[#2563EB]/10',
    'bg-blue-100': 'bg-[#2563EB]/20',
    'bg-blue-600/20': 'bg-[#2563EB]/20',
    'text-blue-600': 'text-[#2563EB]',
    'bg-gray-100': 'bg-[#1F2937]',
    'bg-gray-200': 'bg-[#1F2937]',
    'bg-white/90': 'bg-[#111827]/90',
    'bg-white/10': 'bg-[#1F2937]/50',
    'border-white': 'border-[#1F2937]',
    'shadow-sm': 'shadow-md shadow-black/20',
    'shadow-md': 'shadow-lg shadow-black/20',
    'shadow-lg': 'shadow-xl shadow-black/20',
    'shadow-xl': 'shadow-2xl shadow-black/40',
    'shadow-2xl': 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]',
    'text-blue-100': 'text-[#06B6D4]',
    'border-blue-100': 'border-[#2563EB]/20',
    'bg-blue-600': 'bg-[#2563EB]',
    'hover:bg-blue-700': 'hover:bg-[#2563EB]/80',
    'hover:text-blue-700': 'hover:text-[#06B6D4]',
    'text-blue-500': 'text-[#2563EB]',
    'bg-blue-500/10': 'bg-[#2563EB]/10',
    'text-blue-400': 'text-[#06B6D4]',
    'bg-slate-100': 'bg-[#1F2937]',
    'hover:bg-gray-50': 'hover:bg-[#1F2937]',
    'hover:bg-gray-100': 'hover:bg-[#1F2937]',
}

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    # To avoid replacing parts of classes (like hover:bg-white), we use word boundaries
    for old, new in replacements.items():
        # replace exact tailwind class
        pattern = r'(?<![a-zA-Z0-9_-])' + re.escape(old) + r'(?![a-zA-Z0-9_-])'
        new_content = re.sub(pattern, new, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                replace_in_file(os.path.join(root, file))

if __name__ == '__main__':
    process_dir('src/components')
    process_dir('src/pages')
