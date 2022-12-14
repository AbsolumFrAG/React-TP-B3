const BACKEND_URL = "https://api-react-product.herokuapp.com/";

const authFetch = async (url, args) => {
  if (args) {
    let token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      token = "bearer " + token;

      if (args.headers) {
        args.headers.authorization = token;
      } else {
        args.headers = { authorization: token };
      }
    }
  } else {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      token = "bearer " + token;
      args = {
        headers: {
          authorization: token,
        },
      };
    }
  }
  return await fetch(url, args);
};

export { BACKEND_URL, authFetch };
