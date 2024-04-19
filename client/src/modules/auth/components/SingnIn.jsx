import React from "react";
import { AuthService } from "../service";
import { authStore } from "../../../store/auth/authState";

export const SingnIn = ({ signIn }) => {
  const { login } = authStore((state) => state);

  const handleLogin = () => {
    AuthService.login("janier@mail.com", "janier123")
      .then((response) => {
        console.log({ response });
        login(response.user, response.token);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div
      className={`sign_in_container ${!signIn ? "sign_in_container__" : ""}`}
    >
      <div className="form">
        <h1>Iniciar Sesión</h1>
        <input type="email" placeholder="Correo" autoComplete="off" />
        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="new-password"
        />
        <a href="#">¿Olvidaste tu contraseña?</a>
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
};
