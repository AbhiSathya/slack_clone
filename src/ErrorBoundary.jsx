import React, { useState, useEffect } from "react";

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      setHasError(true);
      // You can log the error to an external service here
      console.error("Error in component:", error);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    // Render a fallback UI when there's an error
    return <h1>Something went wrong.</h1>;
  }

  return props.children;
}

export default ErrorBoundary;