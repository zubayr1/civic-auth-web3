import React, { useState } from "react";

import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useUser } from "@civic/auth/react";

const loggedOutTheme = createTheme({
  palette: {
    primary: {
      main: "#cac5de",
      dark: "#aaa3c7",
    },
  },
  typography: {
    fontWeightBold: 800,
  },
});

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const User = () => {
  const { user } = useUser();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarOpen(true);
  };

  if (!user)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}
      >
        <ThemeProvider theme={loggedOutTheme}>
          <Box
            sx={{
              width: "50%",
              height: 40,
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
            User not logged in!
          </Box>
        </ThemeProvider>
      </div>
    );

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
      <ThemeProvider theme={loggedInTheme}>
        <Box
          sx={{
            width: "100%",
            height: 120,
            borderRadius: 1,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p>Hello {user.name}</p>
          <Button
            variant="outlined"
            onClick={handleOpen}
            sx={{
              marginTop: 2,
              borderColor: "darkgreen",
              color: "darkgreen",
              "&:hover": {
                borderColor: "green",
                backgroundColor: "rgba(0, 128, 0, 0.1)",
              },
            }}
          >
            Show full user information
          </Button>
        </Box>

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              Profile Information
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Updated at:</strong>{" "}
              {user.updated_at === undefined ? "NA" : user.updated_at}
            </Typography>

            <hr />

            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
              Token Information
            </Typography>
            <Typography sx={{ mt: 1, display: "flex", alignItems: "center" }}>
              <strong>Id Token: </strong>{" "}
              {user.idToken
                ? `${user.idToken.slice(0, 4)}...${user.idToken.slice(-4)}`
                : "NA"}
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => copyToClipboard(user.idToken)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <strong>Access Token: </strong>{" "}
              {user.forwardedTokens?.["google"]?.accessToken
                ? `${user.forwardedTokens["google"].accessToken.slice(
                    0,
                    4
                  )}...${user.forwardedTokens["google"].accessToken.slice(-4)}`
                : "NA"}
              <IconButton
                sx={{ ml: 1 }}
                onClick={() =>
                  copyToClipboard(user.forwardedTokens["google"].accessToken)
                }
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Typography>
          </Box>
        </Modal>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Token copied to clipboard"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default User;
