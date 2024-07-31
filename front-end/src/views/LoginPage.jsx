import { Form } from "../components/Form.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.errors,
          footer: "Silakan coba lagi nanti.",
        });
        return;
      }

      if (!result.isVerified) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Verifikasi email anda gagal! Coba cek email anda.",
          footer: "Silakan coba lagi nanti.",
        });
        return;
      }
      localStorage.setItem("jwt", result.token);
      // sessionService.save
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat menghubungi server.",
        footer: "Silakan coba lagi nanti.",
      });
    }
  };

  const handleGoogleSuccess = (response) => {
    const accessToken = response.credential;
    localStorage.setItem("oauth_token", accessToken);
    navigate("/dashboard");
  };

  const handleGoogleError = (error) => {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Terjadi kesalahan!",
      footer: "Silakan coba lagi nanti.",
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      formType="login"
      onGoogleSuccess={handleGoogleSuccess}
      onGoogleError={handleGoogleError}
    />
  );
}

export default LoginPage;
