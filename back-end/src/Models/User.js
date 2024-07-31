class User {

  constructor(email, password, verification_code = null, is_verified = false) {
    this.email = email;
    this.password = password;
    this.verification_code = verification_code;
    this.is_verified = is_verified;
  }

  data() {
    return {
      email: this.email,
      password: this.password,
      verification_code: this.verification_code
    };
  }
}
export default User;
