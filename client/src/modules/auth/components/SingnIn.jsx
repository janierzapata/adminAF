import React from 'react'

export const SingnIn = ({signIn}) => {
  return (
    <div
        className={`sign_in_container ${
          !signIn ? "sign_in_container__" : ""
        }`}
      >
        <form className="form">
          <h1>Iniciar Sesión</h1>
          <input type="email" placeholder="Correo"  autoComplete='off'/>
          <input type="password" placeholder="Contraseña" autoComplete="new-password" />
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button>Ingresar</button>
        </form>
      </div>
  )
}
