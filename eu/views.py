import markdown
import os
from django.shortcuts import render
from django.http import Http404

def home(request):
    return render(request, 'home.html')

def markdown_page(request, markdown_path):
    full_path = os.path.join('eu/pages/', markdown_path + '.md')
    try:
        with open(full_path, 'r') as file:
            markdown_content = file.read()
        html_content = markdown.markdown(markdown_content)
        return render(request, 'md.html', {'content': html_content})
    except FileNotFoundError:
        raise Http404('Page not found')
