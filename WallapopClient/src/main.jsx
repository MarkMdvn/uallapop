// Modified main.jsx
import App from "./App.jsx";
import ReactDOM from "react-dom/client"; // For React 18 and above
import React from "react";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
