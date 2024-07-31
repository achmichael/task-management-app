import { Form } from "../components/Form.jsx";
import register from "../api/Register.js";
import resend_verification_code from "../api/Resend_Verification_Code.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function RegisterPage() {
  const navigate = useNavigate();
  //menerima form data dari props yang dikirim dari properti onSubmit form
  const handleSubmit = async (formData) => {
    try {
      const result = await register(formData);

      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: result.message,
        footer: "Klik tombol dibawah ini.",
        confirmButtonText: "Login",
        confirmButtonColor: "#4caf50",
      }).then((result) => {
        if (result.isConfirmed) {
        //   Swal.fire({
        //     icon: "info",
        //     title: "Token Verifikasi",
        //     text: "Kami telah mengirimkan token verifikasi ke email Anda. Memastikan token masuk dalam 10 detik.",
        //     timer: 10000,
        //     timerProgressBar: true,
        //     showConfirmButton: false,
        //     didOpen: () => {
        //       Swal.showLoading();
        //     },
        //     willClose: () => {
        //       Swal.fire({
        //         icon: "warning",
        //         title: "Verifikasi",
        //         text: "Apakah Anda telah menerima token verifikasi?",
        //         showCancelButton: true,
        //         confirmButtonText: "Ya",
        //         cancelButtonText: "Belum",
        //         confirmButtonColor: "#4caf50",
        //       }).then(async (verificationResult) => {
        //         if (verificationResult.isConfirmed) {
        //           Swal.fire({
        //             icon: "success",
        //             title: "Verifikasi Berhasil",
        //             text: "Anda telah berhasil memverifikasi token Anda.",
        //             confirmButtonText: "Login",
        //             confirmButtonColor: "#4caf50",
        //           }).then(() => {
        //             navigate("/auth/login");
        //           });
        //         } else {
        //           const response = await resend_verification_code(formData);
        //           Swal.fire({
        //             icon: "info",
        //             title: "Token Verifikasi Dikirim Ulang",
        //             text: response.message,
        //             confirmButtonText: "OK",
        //             confirmButtonColor: "#4caf50",
        //           });
        //         }
        //       });
        //     },
        //   });
        navigate('/auth/login');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSuccess = (response) => {
    const accessToken = response.credential;
    localStorage.setItem("oauth_token", accessToken);
    navigate("/auth/login");
  };

  const handleGoogleError = (error) => {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Terjadi kesalahan saat login dengan Google.",
      footer: "Silakan coba lagi nanti.",
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onGoogleError={handleGoogleError}
      onGoogleSuccess={handleGoogleSuccess}
      formType="register"
    />
  );
}

export default RegisterPage;
