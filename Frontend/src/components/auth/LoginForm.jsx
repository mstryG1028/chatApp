import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Functions

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(formData);

      navigate("/chat");
    } catch (err) {
      setError(err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showPassword = () => {};
  const togglePassword = () => {};
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Username"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        leftIcon={<User size={18} />}
        required
      />

      <Input
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        leftIcon={<Lock size={18} />}
        rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        onRightIconClick={togglePassword}
        required
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button type="submit" fullWidth loading={loading}>
        Login
      </Button>

      <p className="text-center text-sm text-text-muted">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
