import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ProfileUpload from "./ProfileUpload";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("hjs");
  const [loading, setLoading] = useState(false);
  console.log("hnndleSubmit before");
  const handleSubmit = async (e) => {
    console.log("hnndleSubmit started");
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      await register(formData);
      navigate("/login");
      
    } catch (err) {
      console.log(err);
      setError(err.message || "Registration failed");
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
  const showConfirmPassword = () => {};
  // Functions
  const toggleConfirmPassword = () => {};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* <ProfileUpload preview={preview} onChange={handleImageChange} /> */}

      <Input
        label="Full Name"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        leftIcon={<User size={18} />}
        required
      />

      <Input
        label="Username"
        name="username"
        placeholder="Choose a username"
        value={formData.username}
        onChange={handleChange}
        leftIcon={<User size={18} />}
        helperText="Only lowercase letters, numbers and underscore."
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

      {/* <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        leftIcon={<Lock size={18} />}
        rightIcon={
          showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />
        }
        onRightIconClick={toggleConfirmPassword}
        required
      /> */}

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button type="submit" fullWidth loading={loading}>
        Create Account
      </Button>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
