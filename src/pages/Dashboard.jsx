import React from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Link,
  Box,
  Paper,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Chart from "../components/dashboard/Chart";
import Deposits from "../components/dashboard/Deposits";
import Subscriptions from "../components/dashboard/Subscriptions";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  height: 240,
}));

export default function Dashboard() {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={9}>
          <StyledPaper>
            <Chart />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <StyledPaper  sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%', // optional, to take full height
    }}>
            <Deposits />
          </StyledPaper>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Paper>
          <Subscriptions />
        </Paper>
      </Grid>
    </Box>
  );
}
