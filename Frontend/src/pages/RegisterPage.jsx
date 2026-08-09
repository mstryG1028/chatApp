import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="ChatFlow"
      subtitle="Connect with your friends instantly."
    >
      <AuthHeader
        heading="Create Account"
        description="Create your account to start chatting."
      />

      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
