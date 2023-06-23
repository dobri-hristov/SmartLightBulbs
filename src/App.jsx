import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes, ProtectedRoute } from "./routing/routes";
import ErrorPage from "./pages/ErrorPage";
import { firebaseConfig } from "./firebase";
import { checkAuth } from "./firebase/auth";
import { useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  initializeApp(firebaseConfig);
  const { isAuth, init } = useSelector((state) => state.auth);

  useEffect(() => checkAuth(), [isAuth]);

  return (
    <div>
      {init ? (
        <Router>
          <Navigation />
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                exact
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            {privateRoutes.map((route) => (
              <Route
                exact
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute isAuth={isAuth}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default App;
