import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isAuthenticated, isLoading, error } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    // TODO: Add a better error handling
    return <div>Oops... {error.message}</div>;
  }

  return <nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</nav>;
};

export default NavBar;
