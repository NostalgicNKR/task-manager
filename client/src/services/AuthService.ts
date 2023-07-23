import { User } from "../hooks/useSignup";

class AuthService {
  currentUser: User;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  }

  get isLogged() {
    return this.currentUser.email ? true : false;
  }
}
const authService = () => new AuthService();

export default authService;
