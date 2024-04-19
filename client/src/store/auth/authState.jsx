import { create } from "zustand";

export const authStore = create((set) => ({
  session: JSON.parse(localStorage.getItem("authCredentials")) || {
    user: null,
    token: null,
    isLoggedIn: false,
  },

  login: (user, token) => {
    const credentials = { user, token, isLoggedIn: true }
    localStorage.setItem("authCredentials", JSON.stringify(credentials));
    set({ session: credentials })
  },
  logout: () =>{
    localStorage.removeItem("authCredentials");
    set({ session: { user: null, token: null, isLoggedIn: false } })
  }
}));
