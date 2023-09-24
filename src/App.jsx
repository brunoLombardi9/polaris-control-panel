import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadTattooForm from "./components/UploadTattooForm";
import ThemeContext from "./components/ThemeContext";
import { Container } from "@mui/material";
import UploadGalleryForm from "./components/UploadGalleryForm";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContext>
          <Container
            maxWidth={false}
            sx={{
              backgroundColor: "black",
              height: "100vh",
            }}
          >
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {/* <UploadTattooForm /> */}
                    <UploadGalleryForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </ThemeContext>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
