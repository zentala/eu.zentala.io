import os

def find_markdown_files(directory):
    markdown_paths = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                full_path = os.path.join(root, file)
                relative_path = os.path.relpath(full_path, directory)
                markdown_paths.append(relative_path[:-3])  # Usuwa '.md'
    return markdown_paths

def path_to_url(path):
    url = path.replace(os.path.sep, '/')  # Zamienia separator na '/'
    return '/' + url
