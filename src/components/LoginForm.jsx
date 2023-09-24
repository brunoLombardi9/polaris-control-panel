import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userMethods = UserAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      await userMethods?.logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        paddingBottom={2}
        component={"form"}
        onSubmit={handleLogin}
        sx={{ backgroundColor: "primary.main", padding: 5, borderRadius: 1 }}
      >
        {error && error}
        <TextField
          placeholder="E-mail"
          type="email"
          sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Contraseña"
          type="password"
          sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          disabled={!email || !password}
          sx={{ padding: 1.1 }}
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
