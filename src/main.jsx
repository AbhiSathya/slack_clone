import React from "react";
import Index from "./components/Index";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./store/reducers";

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions that have these types
        ignoredActions: ['SET_USER'],
      },
    }),
});



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
      <Provider store={store}>
        <Router>
          <Index />
        </Router>
      </Provider> 
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
