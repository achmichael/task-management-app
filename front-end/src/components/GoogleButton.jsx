// Di file GoogleButton.jsx
import { GoogleLogin } from "@react-oauth/google";

export function GoogleLoginButton({ onSuccess, onError, className, text }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      useOneTap
      type="standard"
      theme="filled_blue"
      size="large"
      text={text}
      shape="rectangular"
      logo_alignment="left"
    />
  );
}