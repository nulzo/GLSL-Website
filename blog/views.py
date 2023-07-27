from django.shortcuts import render
from .models import Blog


# Create your views here.
def blog_home(request):
    blogs = Blog.blogs.get_queryset()
    context = {"blogs": blogs}
    return render(request=request, template_name="blog/blog_home.html", context=context)
