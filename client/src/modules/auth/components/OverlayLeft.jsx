import React from "react";

export const OverlayLeft = ({ signIn, changeToggler }) => {
  return (
    <div
      className={`overlay_panel overlay_panel_left ${
        !signIn ? "overlay_panel_left__" : ""
      }`}
    >
      <h1>Welcome Back!</h1>
      <p>To keep connected with us please login with your personal info</p>
      <button className="ghost_button" onClick={() => changeToggler(true)}>
        Sign In
      </button>
    </div>
  );
};
