from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin
from .models import User

from .serializers import SignupSerializer, LoginSerializer
from .serializers import ProfileUpdateSerializer, ChangePasswordSerializer


from .serializers import SignupSerializer, LoginSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)

            return Response({
                "message": "User registered successfully",
                "tokens": tokens
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)

            return Response({
                "message": "Login successful",
                "tokens": tokens
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role
        })

class AdminUserListView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        users = User.objects.all().values(
            'id', 'email', 'full_name', 'role', 'is_active'
        )
        return Response(users)

class AdminUserStatusView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.is_active = request.data.get('is_active', user.is_active)
            user.save()
            return Response({"message": "User status updated"})
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=404
            )

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "is_active": user.is_active
        })

    def put(self, request):
        serializer = ProfileUpdateSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully"})

        return Response(serializer.errors, status=400)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"message": "Password changed successfully"})

        return Response(serializer.errors, status=400)

