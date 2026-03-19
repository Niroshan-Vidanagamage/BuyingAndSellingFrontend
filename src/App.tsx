// src/App.tsx
import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home.tsx";
import Category from "./pages/Category.tsx";
import EditListing from "./pages/EditListing.tsx";
import ListingDetail from "./pages/ListingDetail.tsx"; // you’ll need to create this
import NewListing from "./pages/NewListing.tsx";       // you already have this
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import UIKitShowcase from "./pages/UIKitShowcase.tsx";
import { appTheme } from "./design/theme.ts";
import { AppButton } from "./components/ui/index.ts";

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
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(197, 197, 197, 0.8)',
          }}
        >
          <Toolbar sx={{ gap: 1.5, py: 1 }}>
            <Typography
              variant="h3"
              sx={{ flexGrow: 1, cursor: "pointer", color: 'common.black' }}
              onClick={() => (window.location.href = "/")}
            >
              BestBuys
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <AppButton variantStyle="white" href="/ui-kit">UI Kit</AppButton>
              <AppButton variantStyle="slave" href="/sell/new">Sell</AppButton>
              <AppButton variantStyle="white" href="/profile">Profile</AppButton>
              <AppButton variantStyle="master" href="/login">Login</AppButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 3, mb: 6 }} maxWidth="xl">
          <RouterProvider router={router} />
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
