from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core import serializers as djangoserializers
from django.http import HttpResponse
from django.conf import settings
from .models import Image
from .serializers import *
import json

def displayHomepage(request):
    return render(request, 'homepage.html', {})

@api_view(['GET'])
def getImage(request):
    if request.method == 'GET':
        current_page = 1
        page = request.GET.get('page')
        images = Image.objects.all()
        paginator = Paginator(images, 18)
        qs = []
        try:
            qs = paginator.page(page).object_list
        except PageNotAnInteger:
            qs = paginator.page(1).object_list
        except EmptyPage:
            qs = paginator.page(1).object_list

        try:
            qs_json = djangoserializers.serialize('json', qs)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # data = JsonResponse(list(qs.values()), safe=False)
        #serializer = ImageSerializer(data=qs_json, context={'request': request}, many=True)
        response = json.dumps({
            'status': 'success',
            'url': request.build_absolute_uri(),
            'data': {
                'image_list': json.loads(qs_json), 
                'next_page': current_page+1, 
                'num': paginator.count,
                'prefix': settings.STATIC_URL,
            }
        })
        return HttpResponse(response, content_type='application/json')        


@api_view(['GET','PUT'])
def annotateImage(request, uuid):
    try:
        image = Image.objects.get(uuid=uuid)
    except Image.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ImageSerializer(image, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        # serializer = ImageSerializer(image, context={'request': request})
        response = json.dumps({
            'status': 'success',
            'url': request.build_absolute_uri(),
            'data': json.loads(djangoserializers.serialize('json', [image]))[0],
        })
        return HttpResponse(response, content_type='application/json')
        



    
