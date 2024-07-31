import Swal from "sweetalert2";
const resend_verification_code = async ( email ) => {
  const response = await fetch(
    "http://localhost:3000/api/user/resend-verification-code",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.errors,
        footer: "Silakan coba lagi nanti.",
    })
    return;
  }

  return result;
};

export default resend_verification_code;
