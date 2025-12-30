from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User

class AuthTests(APITestCase):

    def test_user_signup(self):
        data = {
            "email": "user1@test.com",
            "full_name": "User One",
            "password": "password123"
        }

        response = self.client.post("/api/auth/signup/", data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("tokens", response.data)

    def test_user_login(self):
        User.objects.create_user(
            email="user2@test.com",
            full_name="User Two",
            password="password123"
        )

        data = {
            "email": "user2@test.com",
            "password": "password123"
        }

        response = self.client.post("/api/auth/login/", data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tokens", response.data)

    def test_profile_requires_authentication(self):
        response = self.client.get("/api/users/profile/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_cannot_access_admin_endpoint(self):
        user = User.objects.create_user(
            email="user3@test.com",
            full_name="User Three",
            password="password123"
        )

        login_response = self.client.post("/api/auth/login/", {
            "email": "user3@test.com",
            "password": "password123"
        })

        token = login_response.data["tokens"]["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.get("/api/admin/users/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_access_admin_endpoint(self):
        admin = User.objects.create_superuser(
            email="admin@test.com",
            password="adminpass123",
            full_name="Admin"
        )

        login_response = self.client.post("/api/auth/login/", {
            "email": "admin@test.com",
            "password": "adminpass123"
        })

        token = login_response.data["tokens"]["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.get("/api/admin/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

