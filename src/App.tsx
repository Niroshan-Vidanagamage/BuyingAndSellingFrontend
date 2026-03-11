// src/App.tsx
import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import Home from "./pages/Home.tsx";
import Category from "./pages/Category.tsx";
import EditListing from "./pages/EditListing.tsx";
import ListingDetail from "./pages/ListingDetail.tsx"; // you’ll need to create this
import NewListing from "./pages/NewListing.tsx";       // you already have this
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/c/:category", element: <Category /> },
  { path: "/listing/:id", element: <ListingDetail /> },
  { path: "/listing/edit/:id", element: <EditListing /> },
  { path: "/sell/new", element: <NewListing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
]);

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}
          >
            My Marketplace
          </Typography>
          <Button color="inherit" href="/sell/new">Sell</Button>
          <Button color="inherit" href="/profile">Profile</Button>
          <Button color="inherit" href="/login">Login</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <RouterProvider router={router} />
      </Container>
    </React.Fragment>
  );
}
