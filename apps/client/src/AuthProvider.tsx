import React from "react";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";

interface Props extends Auth0ProviderOptions {
  children: React.ReactNode;
  domain: string;
  clientId: string;
}

function AuthProvider({
  children,
  domain,
  cacheLocation = "localstorage",
  clientId,
  authorizationParams,
}: Props) {
  const params = {
    redirect_uri: window.location.origin,
    ...authorizationParams,
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      cacheLocation={cacheLocation}
      authorizationParams={params}
    >
      {children}
    </Auth0Provider>
  );
}
export default AuthProvider;
