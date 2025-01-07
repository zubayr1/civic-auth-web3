import React from "react";
import { UserButton, useUser } from "@civic/auth-web3/react";
import WalletControls from "./WalletControls";

const Web3Content = () => {
  const userContext = useUser();

  return (
    <div>
      <UserButton />
      {userContext.user && <WalletControls userContext={userContext} />}
    </div>
  );
};

export default Web3Content;
