import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, type MouseEvent } from "react";

export default function Navbar() {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSearchClick = () => {
    handleMenuClose();
    window.location.href = "/";
  };

  const handlePostAdClick = () => {
    handleMenuClose();
    window.location.href = "/sell/new";
  };

  const handleUserClick = () => {
    window.location.href = "/profile";
  };

  const handleUserMenuClick = (event: MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLoginClick = () => {
    handleUserMenuClose();
    window.location.href = "/login";
  };

  const handleRegisterClick = () => {
    handleUserMenuClose();
    window.location.href = "/register";
  };

  const handleProfileClick = () => {
    handleUserMenuClose();
    handleUserClick();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("access_token");
    handleUserMenuClose();
    window.location.href = "/";
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(197, 197, 197, 0.8)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1, px: 1.5 }}>
        {/* Left: Hamburger Menu */}
        <IconButton
          onClick={handleMenuClick}
          sx={{ p: 0.5 }}
          aria-label="open menu"
          aria-controls={menuOpen ? "navbar-mobile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : undefined}
        >
          <img
            src="/hamburger_Menu.png"
            alt="menu"
            style={{ width: 28, height: 28, cursor: 'pointer' }}
          />
        </IconButton>

        <Menu
          id="navbar-mobile-menu"
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={handleSearchClick}>
            <Typography component="p" variant="body1">Search item</Typography>
          </MenuItem>
          <MenuItem onClick={handlePostAdClick}>
            <Typography component="p" variant="body1">Post AD</Typography>
          </MenuItem>
        </Menu>

        {/* Center: Website Name */}
        <Typography
          variant="h3"
          sx={{ cursor: "pointer", color: 'common.black', flex: 1, textAlign: 'center' }}
          onClick={() => (window.location.href = "/")}
        >
          Best Buys
        </Typography>

        {/* Right: Post Ad & User Icons */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton
            onClick={handlePostAdClick}
            sx={{ p: 0.5 }}
          >
            <img
              src="/Post_AD.png"
              alt="post ad"
              style={{  height: 28, cursor: 'pointer' }}
            />
          </IconButton>
          <IconButton
            onClick={handleUserMenuClick}
            sx={{ p: 0.5 }}
            aria-label="open user menu"
            aria-controls={userMenuOpen ? "navbar-user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={userMenuOpen ? "true" : undefined}
          >
            <img
              src="/User_icon.png"
              alt="user"
              style={{ width: 28, height: 28, cursor: 'pointer' }}
            />
          </IconButton>
          <Menu
            id="navbar-user-menu"
            anchorEl={userMenuAnchorEl}
            open={userMenuOpen}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {!isLoggedIn && (
              <MenuItem onClick={handleLoginClick}>
                <Typography component="p" variant="body1">Log in</Typography>
              </MenuItem>
            )}
            {!isLoggedIn && (
              <MenuItem onClick={handleRegisterClick}>
                <Typography component="p" variant="body1">Register</Typography>
              </MenuItem>
            )}
            {isLoggedIn && (
              <MenuItem onClick={handleProfileClick}>
                <Typography component="p" variant="body1">Profile</Typography>
              </MenuItem>
            )}
            {isLoggedIn && (
              <MenuItem
                onClick={handleLogoutClick}
                sx={{ backgroundColor: "#d32f2f", color: "common.white", '&:hover': { backgroundColor: "#b71c1c" } }}
              >
                <Typography component="p" variant="body1" sx={{ color: "common.white" }}>
                  Log out
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
