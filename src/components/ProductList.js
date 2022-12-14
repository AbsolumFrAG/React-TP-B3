import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, authFetch } from "../helper";

const ProductList = () => {
  const url = BACKEND_URL + "products";
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let results = await authFetch(url);
    results = await results.json();
    setProducts(results);
  };

  const deleteProduct = async (id) => {
    const url = BACKEND_URL + "product/" + id;
    let result = await authFetch(url, {
      method: "delete",
    });

    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;

    if (!key) {
      getProducts();
      return;
    }
    const url = BACKEND_URL + "search/" + String(key);
    let result = await authFetch(url);
    result = await result.json();
    if (result) {
      setProducts(result);
    }
  };

  const updateProduct = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="product-list">
      <h1>Liste des produits</h1>

      <input
        type="text"
        placeholder="Rechercher ici"
        className="search-box"
        onChange={searchHandle}
      ></input>

      <table className="product-list-table">
        <tbody>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Société</th>
            <th>Opération</th>
          </tr>

          {products.length > 0 ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}€</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="btn-solid-operation"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => updateProduct(item._id)}
                    className="btn-solid-operation"
                  >
                    Mettre à jour
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
