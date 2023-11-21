from django.shortcuts import render

from rest_framework import viewsets, permissions
from .serializers import CustomerSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer



class CustomerViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)


# views.py

class RegisterView(APIView):
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        # Nhận thông tin đăng nhập từ request
        username = request.data.get('customer_username')
        password = request.data.get('customer_password')

        # Kiểm tra xem có thông tin đăng nhập không
        if username is None or password is None:
            return Response({'error': 'Vui lòng cung cấp tên người dùng và mật khẩu'}, status=status.HTTP_400_BAD_REQUEST)

        # Kiểm tra xem có người dùng nào có thông tin đăng nhập như vậy không
        try:
            user = Customer.objects.get(customer_username=username, customer_password=password)
        except Customer.DoesNotExist:
            return Response({'error': 'Thông tin đăng nhập không chính xác'}, status=status.HTTP_401_UNAUTHORIZED)

        # Trả về thông tin người dùng
        return Response({'user_id': user.id, 'username': user.customer_username}, status=status.HTTP_200_OK)