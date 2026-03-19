// src/App.tsx
import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home.tsx";
import Category from "./pages/Category.tsx";
import EditListing from "./pages/EditListing.tsx";
import ListingDetail from "./pages/ListingDetail.tsx"; // you'll need to create this
import NewListing from "./pages/NewListing.tsx";       // you already have this
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import UIKitShowcase from "./pages/UIKitShowcase.tsx";
import { appTheme } from "./design/theme.ts";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/c/:category", element: <Category /> },
  { path: "/listing/:id", element: <ListingDetail /> },
  { path: "/listing/edit/:id", element: <EditListing /> },
  { path: "/sell/new", element: <NewListing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/ui-kit", element: <UIKitShowcase /> },
]);

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <React.Fragment>
        <CssBaseline />
        <Navbar />
        <Container sx={{ mt: 3, mb: 6 }} maxWidth="xl">
          <RouterProvider router={router} />
        </Container>
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
}
