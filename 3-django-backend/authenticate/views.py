from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth.models import User
from django.middleware.csrf import get_token


@api_view(['GET'])
def get_csrf(request):
    return Response({'csrfToken': get_token(request)})

@api_view(['POST'])
def login_view(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            response = Response({
                "message": "Login successful",
                "username": user.username,
                "sessionid": request.session.session_key
            })
            
            # Explicitly set cookie
            response.set_cookie(
                key='sessionid',
                value=request.session.session_key,
                max_age=1209600,  # 2 weeks
                domain='localhost',
                secure=False,
                httponly=True,
                samesite='None'
            )
            return response
        return Response({"error": "Invalid credentials"}, status=401)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@csrf_exempt
@api_view(['POST'])
def signup(request):
    data = request.data

    username = data.get("username")
    password = data.get("password")

    if isinstance(username, list):
        username = username[0]
    if isinstance(password, list):
        password = password[0]
    
    if User.objects.filter(username=username).exists():
        return Response({"error": "user already exists"})
    
    try:
       user = User.objects.create_user(username=username,password=password)
       user.save()
       return Response({"message": "User created successfully!"}, status=201)
    except Exception as e :
        return Response({"error": str(e)})
    
@csrf_exempt
@api_view(['get'])
def getCurrUser(request):
    if request.user.is_authenticated:
        print("THe username is:")
        print(request.user.username)
        return Response({"username" : request.user.username})
    else:
        print("No user right now")
        return Response({"error": "No active user"},status=400)
    
    
@ensure_csrf_cookie
@api_view(['POST'])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return Response({"message": "Successfully logged out"}, status=200)
    return Response({"error": "Method not allowed"}, status=405)
    


