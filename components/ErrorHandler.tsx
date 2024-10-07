import React from "react";
// import component not found icon
import IconNotFound from "./Icon/NotFound";

const ErrorHandler = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) return null; // Jika tidak ada error, tidak perlu ditampilkan apa-apa

  return (
    <div style={{ color: "red", marginTop: "20px" }}>
      <IconNotFound />
      <p className="text-center">{errorMessage}</p>
    </div>
  );
};

export default ErrorHandler;
