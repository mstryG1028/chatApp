import AuthHeader from "../components/auth/AuthHeader";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      title="ChatFlow"
      subtitle="Connect with your friends instantly."
    >
      <AuthHeader
        heading="Welcome Back"
        description="Login to continue chatting."
      />

      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
