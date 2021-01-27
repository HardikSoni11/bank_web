import { AppBar, Link, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    padding: "0 10%",
    height: "80px",
    width: "100%",
    background: "#fff",
    position: "relative",
    float: "left",
    color: "#000",
    boxSizing: "border-box",
    borderBottom: "1px solid #dedede",
  },
  title: {
    flexGrow: 1,
    top: "4%",
    position: "relative",
    textDecoration: "none",
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <div className={classes.title}>
            <Link to="/">BankSearch</Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
