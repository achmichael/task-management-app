import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Failure",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonText: "Got it!",
      });
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            id: id,
            newPassword: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.errors === "Expired reset token") {
          Swal.fire({
            title: "Expired Token",
            text: "Token has expired. Please request a new password reset link.",
            icon: "error",
            confirmButtonText: "Got it!",
          });
          return;
        }else{
            console.log(result.errors);
        }
      }

      Swal.fire({
        title: "Success",
        text: result.message,
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
