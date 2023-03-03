import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import RegisterPage from "./components/pages/RegisterPage";
import Header from "./components/layouts/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, grey, pink } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

type Props = {};

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    background: {
      default: grey[100],
    },
  },
});

export default function App({}: Props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

const PageNotFound = () => {
  <div>
    <h1>404 - Page not found</h1>
    <Link to="/">Go to home page</Link>
  </div>;
};
