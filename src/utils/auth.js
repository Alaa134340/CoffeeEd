export const isAdminLoggedIn = () => {
  return localStorage.getItem("adminToken") === "mysecrettoken";
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
};

export const isUserLoggedIn = () => {
  return !!localStorage.getItem("userId");
};

export const logoutUser = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("adminToken");
};
