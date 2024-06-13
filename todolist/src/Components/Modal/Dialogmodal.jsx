import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import { Tooltip } from "@mui/material";
import { AllDataProvider } from "../DataProvider/DataProvider";
const Dialogmodal = ({ children }) => {
  const { openDialogModal, setopenDialogModal } = AllDataProvider();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const DialogModal = () => {
    setopenDialogModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openDialogModal}
        maxWidth="md"
        fullWidth
        scroll={"paper"}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Tooltip title="Back" arrow>
            <Fab
              size="small"
              color="primary"
              variant="extended"
              aria-label="add"
              onClick={DialogModal}
            >
              <ArrowBackIcon />
            </Fab>
          </Tooltip>
        </DialogTitle>

        <DialogContent sx={{padding:"2rem" }}>
          {children}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Dialogmodal;
