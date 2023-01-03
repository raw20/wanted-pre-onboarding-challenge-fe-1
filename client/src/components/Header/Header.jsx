import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    window.localStorage.removeItem("toDos");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          TODO
        </Typography>

        <Button
          onClick={logoutHandler}
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        >
          로그아웃
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
