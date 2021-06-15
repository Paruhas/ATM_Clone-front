import React, { createContext, useState } from "react";

const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
  const [isError, setIsError] = useState({});
  const clearError = () => {
    setIsError({});
  };

  return (
    <ErrorContext.Provider value={{ isError, setIsError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorContextProvider };
