from django.shortcuts import render


# Create your views here.
def home(request):
    return render(request=request, template_name="home/home.html")


def test(request):
    return render(request=request, template_name="home/test.html")
