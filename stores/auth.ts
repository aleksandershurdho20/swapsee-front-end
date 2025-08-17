import api from "@/config/api";
import { makeAutoObservable } from "mobx";

class Auth {
  email = "";
  password = "";
  name = "";
  errorMessage: { [key: string]: string } = {};
  disableButton = false;

  user: { [key: string]: string } = {};

  constructor() {
    makeAutoObservable(this);
  }

  handleChange = <K extends keyof Auth>(key: K, value: Auth[K]) => {
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as Auth)[key] = value;
    } else {
      console.warn(`Field ${key} does not exist on Auth`);
    }
  };

  handleEmptyValues = <K extends keyof Auth>(key: K, label: string) => {
    if (!(this as Auth)[key]) {
      this.errorMessage[key] = `${label} cannot be empty!`;
      this.disableButton = true;
      return;
    }
    this.errorMessage[key] = "";
    this.disableButton = false;
  };

  fetchUser = async () => {
    try {
      const res = await api.get("/user");
      this.user = res.data;
    } catch (error) {
      console.error("Failed to fetch user", error);
      this.user = {};
    }
  };
  

}

const authStore = new Auth();

export default authStore;