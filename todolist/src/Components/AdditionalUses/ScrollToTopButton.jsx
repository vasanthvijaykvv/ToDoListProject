import React, { useState, useEffect } from "react";
import { Fab, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


const ScrollToTopButton = () => {
  const theme = useTheme();
  let stylesBottom = {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition: "opacity 0.3s ease-in-out",
    "&.visible": {
      opacity: 1,
    },
  };
  let stylesTop = {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition: "opacity 0.3s ease-in-out",
    opacity: 0,
    "&.visible": {
      opacity: 1,
    },
  };
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fab
      color="primary"
      aria-label="scroll back to top"
      sx={isVisible ? stylesBottom : stylesTop}
      onClick={scrollToTop}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollToTopButton;
