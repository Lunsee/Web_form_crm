"""
URL configuration for djangoProject1 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from django.contrib import admin
from django.urls import path
from form.views import table_view
from django.urls import path
from form.utils.api_view import MyAPIHandler

from django.views.generic import TemplateView




urlpatterns = [
    path('admin/', admin.site.urls),
    path('form/', include('form.urls')),
    path('', table_view, name='table'),
    path('api/', MyAPIHandler.as_view(), name='api'),
    path('script.js', TemplateView.as_view(template_name='js/script.js', content_type='application/javascript')),
]
