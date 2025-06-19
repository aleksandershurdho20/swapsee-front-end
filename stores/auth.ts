import { makeAutoObservable } from "mobx";

class Auth {
  email = "";
  password = "";
  name = "";
  errorMessage: { [key: string]: string } = {};
  disableButton = false;

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


}

const authStore = new Auth();

export default authStore;