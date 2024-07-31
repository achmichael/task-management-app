import { GoogleOAuthProvider } from "@react-oauth/google";

export function GoogleProvider({ clientId, children }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}


