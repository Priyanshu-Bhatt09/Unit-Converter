from django.urls import path
from .views import convert_units

urlpatterns = [
    path('convert/', convert_units)
]