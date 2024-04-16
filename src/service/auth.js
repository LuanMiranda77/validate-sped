
export let TOKEN_KEY = '@userData';


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const isAuthenticated = () => true;


export const getToken = () => localStorage.getItem(TOKEN_KEY);


export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};


export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};