import { Route, Routes } from "react-router-dom";
import { authStore } from "../store/auth/authState";

export const Dashboard = () => {

    const {logout} = authStore(state =>state)
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Nigga home</h1>
          </>
        }
      />
      <Route
        path="/r1"
        element={
          <>
            <h1>Ruta 1</h1>
            <button onClick={()=>{
                logout()
            }}> close</button>
          </>
        }
      />
      <Route
        path="/r2"
        element={
          <>
            <h1>Ruta 2</h1>
          </>
        }
      />
      <Route
        path="/r3"
        element={
          <>
            <h1>Ruta 3</h1>
          </>
        }
      />
    </Routes>
  );
};
