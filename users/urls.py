from django.urls import path
from .views import SignupView, LoginView, MeView
from .views import AdminUserListView, AdminUserStatusView
from .views import UserProfileView, ChangePasswordView



urlpatterns = [
    path('auth/signup/', SignupView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/me/', MeView.as_view()),
]

urlpatterns += [
    path('admin/users/', AdminUserListView.as_view()),
    path('admin/users/<int:user_id>/status/', AdminUserStatusView.as_view()),
]

urlpatterns += [
    path('users/profile/', UserProfileView.as_view()),
    path('users/change-password/', ChangePasswordView.as_view()),
]

