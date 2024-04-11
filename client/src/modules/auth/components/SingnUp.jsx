import React from "react";

export const SingnUp = ({signIn}) => {
  return (
    <div
      className={`sign_up_container ${!signIn ? "sign_up_container__" : ""}`}
    >
      <form>
        <h1>Crear Cuenta</h1>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Crear</button>
      </form>
    </div>
  );
};
