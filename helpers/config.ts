export const apiDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://v-fri-backend.onrender.com";

export const appDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://v-fri.vercel.app";
