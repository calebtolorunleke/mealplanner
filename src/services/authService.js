export const getCurrentUser = async () => {
  return fetch("/api/auth/me", {
    credentials: "include",
  });
};
