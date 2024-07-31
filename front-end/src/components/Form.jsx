import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import { GoogleProvider } from "./GoogleProvider.jsx";
import { GoogleLoginButton } from "./GoogleButton.jsx";
import Header from "./Header.jsx";
import Swal from "sweetalert2";
export function Form({
  onSubmit,
  formType = "login",
  onGoogleSuccess,
  onGoogleError,
}) {
  useEffect(() => {
    feather.replace();
  }, []);

  const isLogin = formType === "login";
  const googleButtonText = isLogin ? "signin_with" : "continue_with";

  const navigate = useNavigate();

  //menginisialisasi state form data untuk menyimpan input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    verification_code: "",
  });
  //menginisialisasi erorrs untuk menyimpan error validasi dari setiap input
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    rePassword: "",
    verification_code: "",
  });

  const handleInputChange = (name, value) => {
    //{...formData} spreadOperator digunakan untuk membuat salinan baru dari properti-properti objek formData dan untuk memastikan tidak mengubah objek formData secara langsung, jadi bisa dikatakan membuat objek baru dengan properti yang sama
    //[name]: value ini akan menggantikan properti dalam objek jika name nya sesuai dengan properti yang sudah ada, jika tidak ada maka properti tersebut akan ditambahkan
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value.trim())) {
          error = "Format email tidak valid";
        }
        break;
      case "password":
        if (
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
            value.trim()
          )
        ) {
          error =
            "Password harus minimal 8 karakter, mengandung huruf besar, angka, dan karakter khusus";
        }
        break;
      case "rePassword":
        if (value.trim() !== formData.password) {
          error = "Password tidak cocok";
        }
        break;
      case "verification_code":
        if (!/^[a-zA-Z0-9]{6}$/.test(value.trim())) {
          error = "Kode verifikasi harus 6 karakter (angka atau huruf)";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = Object.values(errors).filter((error) => error !== "");
    if (formErrors.length === 0) {
      let submittedData;
      if (isLogin) {
        submittedData = {
          email: formData.email.trim(),
          password: formData.password.trim(),
          verification_code: formData.verification_code.trim(),
        };
      } else {
        submittedData = {
          email: formData.email.trim(),
          password: formData.password.trim(),
          rePassword: formData.rePassword.trim(),
        };
      }
      //mengirim data yang sudah difilter ke dalam fungsi onSubmit (props)
      onSubmit(submittedData);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oopss😢😢😢",
        //join menggabungkan elemen array menjadi string dan dipisahkan dengan <br> atau enter
        html: formErrors.join("<br>"),
        footer: "Silakan coba lagi...",
      });
    }
  };

  return (
    <GoogleProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="form-container">
        <div className="form-inner-container">
          <Header
            className={"form-header"}
            title={isLogin ? "Selamat Datang Kembali!" : "Daftar Akun Baru"}
            content={
              isLogin
                ? "Silakan Masuk ke Akun Anda"
                : "Silakan Isi Data Diri Anda"
            }
          />
          <form onSubmit={handleSubmit} className="auth-form">
            <InputGroup
              icon={"mail"}
              name={"email"}
              placeholder={"Email"}
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputGroup
              icon={"key"}
              name={"password"}
              placeholder={"Password"}
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {!isLogin && (
              <InputGroup
                icon={"key"}
                name={"rePassword"}
                placeholder={"Konfirmasi Password"}
                type="password"
                value={formData.rePassword}
                onChange={handleInputChange}
              />
            )}
            {isLogin && (
              <InputGroup
                icon={"mail"}
                name={"verification_code"}
                placeholder={"Kode Verifikasi"}
                value={formData.verification_code}
                onChange={handleInputChange}
              />
            )}
            {isLogin && (
              <div className="forgot-action">
                <p className="forgot-password text-center text-danger my-1" onClick={() => navigate('/forgot-password')}>
                  Forgot password?
                </p>
                <p className="resend-verification-code text-center text-danger my-3" onClick={() => navigate('/resend-verification-code')}>
                  Belum Menerima Kode Verifikasi?
                </p>
              </div>
            )}
            <Button
              className={"submit-button"}
              label={isLogin ? "Masuk" : "Daftar"}
            />
          </form>
          <div className="google-auth">
            <GoogleLoginButton
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
              className="google-auth-button"
              text={googleButtonText}
            />
          </div>
        </div>
        <div className="form-footer">
          <p>
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <a href={isLogin ? "/register" : "/auth/login"}>
              {isLogin ? "Daftar di sini" : "Masuk di sini"}
            </a>
          </p>
          <p className="text-center mt-2">
            Informasi ini akan disimpan dengan aman sesuai{" "}
            <a
              href="https://policies.google.com/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <b>Ketentuan Layanan & Kebijakan Privasi</b>
            </a>
          </p>
        </div>
      </div>
    </GoogleProvider>
  );
}

function InputGroup({
  icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className="input-group">
      <i className="icon" data-feather={icon}></i>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
}

export function Button({ className, label }) {
  return <button className={className}>{label}</button>;
}
