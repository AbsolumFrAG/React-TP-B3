import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, authFetch } from "../helper";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const url = BACKEND_URL + "add-product";

    // On valide le formulaire
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    // Appel API
    let result = await authFetch(url, {
      method: "post",
      body: JSON.stringify({ name, price, userId, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    // Ajout de la notification comme quoi le produit a été ajouté
    navigate("/");
  };

  return (
    <div className="product">
      <form className="form-base">
        <h1>Ajouter un nouveau produit</h1>
        <input
          type="text"
          placeholder="Entrer le nom"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <div className="form-error">Veuillez entrer un nom valide</div>
        )}
        <input
          type="text"
          placeholder="Entrer le prix"
          className="input-box"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <div className="form-error">Veuillez entrer un prix valide</div>
        )}

        <input
          type="text"
          placeholder="Entrer la catégorie"
          className="input-box"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && (
          <div className="form-error">Veuillez entrer une catégorie valide</div>
        )}

        <input
          type="text"
          placeholder="Entrer la société"
          className="input-box"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && (
          <div className="form-error">Veuillez entrer une société valide</div>
        )}
        <div className="form-button-container">
          <button type="button" className="btn-solid" onClick={addProduct}>
            Ajouter un produit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
