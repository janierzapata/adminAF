import React from "react";
import "./index.css";
import { SingnUp } from "./components/SingnUp";
import { SingnIn } from "./components/SingnIn";
import { OverlayLeft } from "./components/OverlayLeft";
import { OverlayRight } from "./components/OverlayRight";

export const Login = () => {
  const [signIn, toggle] = React.useState(true);

  const changeToggler = (value) => toggle(value);

  return (
    <div className="container">
      <SingnUp signIn={signIn} />
      <SingnIn signIn={signIn} />

      <div
        className={`overlay_container ${!signIn ? "overlay_container__" : ""}`}
      >
        <div className={`overlay ${!signIn ? "overlay__ " : ""}`}>
          <OverlayLeft signIn={signIn} changeToggler={changeToggler} />
          <OverlayRight signIn={signIn} changeToggler={changeToggler} />
        </div>
      </div>
    </div>
  );
};
