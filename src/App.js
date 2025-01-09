import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig";

import { CivicAuthWrapper } from "./config/civicAuthProvider";
import Web3Content from "./components/Web3Content";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
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
