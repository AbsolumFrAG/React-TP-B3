import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = async () => {
    await localStorage.clear();
    console.log("Déconnexion...");
    navigate("/login");
  };

  return (
    <div>
      {auth ? (
        <ul className="nav-ui">
          <li>
            <Link to="/">Produits</Link>
          </li>
          <li>
            <Link to="/add">Ajouter un produit</Link>
          </li>
          <li>
            <Link to="/profile">Profil</Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              Se déconnecter
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ui">
          <li>
            <Link to="/signup">S'inscrire</Link>
          </li>
          <li>
            <Link to="/login">Se connecter</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
