import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Slide, Typography } from "@mui/material";
import { AllDataProvider } from "../DataProvider/DataProvider";

export function AdditionalUses() {
  let { Notifi, setNotifi, message } = AllDataProvider();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotifi(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={Notifi}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={Slide}
        message={<Typography color="inherit">{message}</Typography>}
        action={action}
      />
    </div>
  );
}
