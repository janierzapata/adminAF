import React from "react";

export const OverlayRight = ({ signIn, changeToggler }) => {
  return (
    <div
      className={`overlay_panel overlay_panel_right ${
        !signIn ? "overlay_panel_right__" : ""
      }`}
    >
      <h1>¡Hola, visitante!</h1>
      <p className="balance">
        ¡Regístrate para iniciar tu viaje en el mundo de la belleza con
        nosotros! Estamos aquí para guiarte hacia una carrera emocionante y
        llena de oportunidades. ¡Únete y desata tu potencial en la estética y la
        belleza!
      </p>
      <button className="ghost_button" onClick={() => changeToggler(false)}>
        Sign Up
      </button>
    </div>
  );
};
