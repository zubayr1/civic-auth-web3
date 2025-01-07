import { CivicAuthProvider } from "@civic/auth-web3/react";

export const CivicAuthWrapper = ({ children }) => (
  <CivicAuthProvider clientId="8722a11d-0e51-4c8b-88d0-600c8b2ae87e">
    {children}
  </CivicAuthProvider>
);
