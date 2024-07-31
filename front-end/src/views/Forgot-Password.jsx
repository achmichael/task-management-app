import React, { useEffect, useState } from "react";
import "../styles/forgot-password.css";
import Swal from "sweetalert2";
import forgot_password from "../api/Forgot-Password.js";
import resend_verification_code from "../api/Resend_Verification_Code.js";
const ForgotPassword = ({ isForgot = true }) => {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateEmail(email)) {
      Swal.fire({
        title: "Failure",
        text: "Please enter a valid email",
        confirmButtonText: "Got it!",
        icon: "error",
      });
      setIsLoading(false);
      return;
    }

    let result = null;

    if (isForgot) {
      result = await forgot_password(email);
    } else {
      result = await resend_verification_code(email);
    }
    Swal.fire({
      title: "Success",
      text: result.message,
      icon: "success",
      confirmButtonText: "Okay",
    }).then((response) => {
      if (response.isConfirmed) {
        setIsSubmit(true);
        setIsLoading(false);
      }
    });
  };
  console.log(isLoading)
  return (
    <div className="app">
      <Navbar isForgot={isForgot} />
      <div className="container d-flex flex-column justify-content-center align-items-center py-5">
        <Register
          email={email}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          isSubmit={isSubmit}
          isForgot={isForgot}
          isLoading={isLoading}
        />
      </div>
      <Footer />
    </div>
  );
};

const Navbar = ({ isForgot }) => (
  <nav className="navbar border-bottom">
    <div className="container-fluid py-3">
      <a
        className="navbar-brand text-black ms-3"
        href={isForgot ? "/forgot-password" : "resend-verification-code"}
      >
        {isForgot ? "Forgot Password" : "Verification Code"}
      </a>
    </div>
  </nav>
);

const Register = ({
  email,
  handleEmailChange,
  handleSubmit,
  isSubmit,
  isForgot,
  isLoading,
}) => (
  <div className="container p-4 rounded">
    <div className="row m-auto justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">
              {isForgot ? "Lupa Password" : "Kirim Ulang Kode Verifikasi"}
            </h5>
            <p className="card-text">
              Masukkan email Anda untuk{" "}
              {isForgot
                ? "mengatur ulang password"
                : "Mengirim Ulang Kode Verifikasi"}
              .
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>
              <button
                type="submit"
                className="button-kirim btn-light btn w-100 rounded-pill mt-3"
                disabled={isSubmit}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "Kirim"
                )}
              </button>
            </form>
            <p className="mt-3 text-muted">
              {isForgot ? "Reset password" : "Kode Verifikasi"}{" "}
              {!isSubmit
                ? "akan dikirim di email. Silahkan cek pada email, jika tidak ada lihat pada spam"
                : "Sudah Dikirim pada email anda, Silahkan cek alamat email anda..."}
            </p>
            <p>
              Informasi ini akan disimpan dengan aman sesuai{" "}
              <a href="https://policies.google.com/" className="text-white">
                <b className="text-black">
                  Ketentuan Layanan & Kebijakan Privasi
                </b>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="py-3 text-center border-body">
    <div className="footer-bottom">
      <p>&copy; 2024 Task Management App. All rights reserved.</p>
    </div>
  </footer>
);

export default ForgotPassword;
