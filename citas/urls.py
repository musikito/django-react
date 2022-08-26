from django.urls import path
from . import views

urlpatterns = [
    path('api/citas/', views.CitasListCreate.as_view()),
]
