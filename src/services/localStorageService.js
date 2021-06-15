const tokenName = "AtmToken";

const setToken = (token) => {
  return localStorage.setItem(tokenName, token);
};

const getToken = (token) => {
  return localStorage.getItem(tokenName);
};

const removeToken = (token) => {
  return localStorage.removeItem(tokenName);
};

export { setToken, getToken, removeToken };
