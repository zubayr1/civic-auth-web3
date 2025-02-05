import React from "react";
import { userHasWallet } from "@civic/auth-web3";
import { useConnect, useAccount, useBalance, useWriteContract } from "wagmi";

import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const loggedInTheme = createTheme({
  palette: {
    primary: {
      main: "#b3e3b4",
      dark: "#94c495",
    },
  },
  typography: {
    fontWeightBold: 800,
  },
});

const WalletControls = ({ userContext }) => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const balance = useBalance({
    address: userHasWallet(userContext) ? userContext.walletAddress : undefined,
  });

  const { writeContract } = useWriteContract();

  const connectExistingWallet = () => {
    connect({ connector: connectors[0] });
  };

  const createWallet = async () => {
    if (userContext.user && !userHasWallet(userContext)) {
      await userContext.createWallet();
      connectExistingWallet();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeProvider theme={loggedInTheme}>
        <Box
          sx={{
            width: "100%",
            height: 160,
            borderRadius: 1,
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!userHasWallet(userContext) && (
            <p>
              <button onClick={createWallet}>Create Wallet</button>
            </p>
          )}
          {userHasWallet(userContext) && (
            <>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Wallet address: {userContext.walletAddress}
                  </Typography>

                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    Balance:{" "}
                    {balance?.data
                      ? `${balance.data.value} ${balance.data.symbol}`
                      : "Loading..."}
                  </Typography>

                  <Typography variant="body2">
                    {isConnected ? (
                      <p>Wallet is connected</p>
                    ) : (
                      <button onClick={connectExistingWallet}>
                        Connect Wallet
                      </button>
                    )}
                  </Typography>
                </CardContent>
              </Card>

              <p style={{ display: "block" }}></p>
            </>
          )}
        </Box>
      </ThemeProvider>

      <button
        onClick={() =>
          writeContract({
            abi,
            address: "0xaFC0531D740D8B690c02f6bd6c73A95dD0D01942",
            functionName: "transferFrom",
            args: [
              "0xd2135CfB216b74109775236E36d4b433F1DF507B",
              "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
              123n,
            ],
          })
        }
      >
        Transfer
      </button>
    </div>
  );
};

export default WalletControls;
