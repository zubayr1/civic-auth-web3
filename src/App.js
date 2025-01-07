import { CivicAuthProvider } from "@civic/auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig";

import TitleBar from "./components/TitleBar";
import User from "./components/User";
import Web3 from "./components/web3";
import { CivicAuthWrapper } from "./config/civicAuthProvider";
import Web3Content from "./components/Web3Content";

const CLIENT_ID = "8722a11d-0e51-4c8b-88d0-600c8b2ae87e";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <CivicAuthProvider clientId={CLIENT_ID}>
        <TitleBar />
        <User />
        <Web3 />
      </CivicAuthProvider>

      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <CivicAuthWrapper>
            <Web3Content />
          </CivicAuthWrapper>
        </WagmiProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
