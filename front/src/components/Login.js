import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupClicked = () => {
    navigate("/signup");
  };
  const loginUser = async () => {
    //console.log("Email:", email, "Mot de passe :", password);
    const url = BACKEND_URL + "login";
    let result = await fetch(url, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Veuillez entrer des informations d'identification valides");
    }
  };
  return (
    <div>
      <form className="form-base">
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="Entrer un email"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Entrer un mot de passe"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-button-container">
          <button type="button" className="btn-solid" onClick={loginUser}>
            Se connecter
          </button>
          <button type="button" className="btn-no-fill" onClick={signupClicked}>
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
