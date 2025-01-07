import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import { UserButton } from "@civic/auth/react";

const TitleBar = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              size={16}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h1>Civic Auth App: Beta</h1>
            </Grid>
            <Grid size={8}></Grid>
            <Grid size={4}>
              <UserButton />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default TitleBar;
