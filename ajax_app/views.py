from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Book


def index(request):
	return render(request, 'index.html', {})


def save_book(request):
	name = request.GET['x']
	price = request.GET['y']
	pages = request.GET['z']
	book = Book(name=name, price=price, pages=pages)
	try:
		book.save()
		return HttpResponse('True')
	except:
		print('Book Not Saved')
		return HttpResponse('False')


from .serializers import BookSerializer
import json
def list_book(request):
	data = []
	books = Book.objects.all()
	for book in books:
		api_content = BookSerializer(book)
		data.append(api_content.data)
		print(json.dumps(data))
	return HttpResponse(json.dumps(data))


### Rest API view ###
from rest_framework import viewsets, permissions
class BookView(viewsets.ModelViewSet):
	queryset = Book.objects.all()
	serializer_class = BookSerializer
	#needs admin credentials
	permission_classes = [permissions.IsAuthenticated]
