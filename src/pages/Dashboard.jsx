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
      variant="contained"
              className="!w-full !py-2"
              startIcon={
                submitting && <CircularProgress color="inherit" size={16} />
              }
            >
              {template._id ? "Update template" : "Add template"}
            </Button>
          </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={9}>
          <StyledPaper>
          <Chart />
          variant="contained"
              className="!w-full !py-2"
              startIcon={
                submitting && <CircularProgress color="inherit" size={16} />
              }
            >
              {template._id ? "Update template" : "Add template"}
            </Button>
          </div>variant="contained"
              className="!w-full !py-2"
              startIcon={
                submitting && <CircularProgress color="inherit" size={16} />
              }
            >
              {template._id ? "Update template" : "Add template"}
            </Button>
          </div>variant="contained"
              className="!w-full !py-2"
              startIcon={
                submitting && <CircularProgress color="inherit" size={16} />
              }
            >
              {template._id ? "Update template" : "Add template"}
            </Button>
          </div>
    </Box>
  );
}
