from django.urls import path, include
from . import views

#routing for APIs 
from rest_framework import routers 
router = routers.DefaultRouter()
router.register(r'books', views.BookView)

urlpatterns = [
	path('api/', include(router.urls)),
	#needs admin credentials
	path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', views.index, name="index"),
    path('save_book/', views.save_book, name="save_book"),
    path('list_book', views.list_book, name="list_book"),
    path('delete_book/<int:pk>', views.delete_book, name="delete_book"),
]

