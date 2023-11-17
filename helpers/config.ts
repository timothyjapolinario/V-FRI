export const apiDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://v-fri-backend.onrender.com";
