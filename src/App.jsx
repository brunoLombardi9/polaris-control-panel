import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ControlPanel from "./components/ControlPanel";
import { Container } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Container flex sx={{ justifyContent: "center", alignItems: "center" }}>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ControlPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
