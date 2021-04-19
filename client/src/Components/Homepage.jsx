import {
  Container,
  Paper,
  Typography,
  Button,
  AppBar,
} from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Img from "../Images/favicon.ico";

const useStyles = makeStyles(() => ({
  appBar: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  heading: {
    color: "#C2936E",
    fontWeight: "bold",
  },
  paper: {
    borderRadius: 15,
    padding: "100px 0",
    background: "black",
  },
  buttonSignup: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 60,
    background: "#79CDCD",
  },
  buttonLogin: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    background: "#66cd00",
  },
  image: {
    marginLeft: "15px",
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (user) history.push("/chats");
  return (
    <>
      <Container maxWidth="lg" style={{ height: 30 }}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <img src={Img} alt="logo" style={{ height: 40, marginRight: 20 }} />
          <Typography className={classes.heading} variant="h4" align="center">
            MemB Chat
          </Typography>
        </AppBar>
      </Container>
      <Container maxWidth="sm" align="center" style={{ marginTop: 50 }}>
        <Paper className={classes.paper}>
          <Typography
            style={{ fontWeight: "bold", color: "#C2936E" }}
            variant="h5"
            align="center"
          >
            New User ?
          </Typography>
          <NavLink style={{ textDecoration: "none" }} to="/register">
            <Button
              className={classes.buttonSignup}
              variant="contained"
              size="large"
              type="submit"
            >
              Sign Up
            </Button>
          </NavLink>
          <Typography
            style={{ fontWeight: "bold", marginBottom: 60, color: "#C2936E" }}
            variant="h4"
            align="center"
          >
            OR
          </Typography>
          <Typography
            style={{ fontWeight: "bold", color: "#C2936E" }}
            variant="h5"
            align="center"
          >
            Existing User ?
          </Typography>
          <NavLink style={{ textDecoration: "none" }} to="/login">
            <Button
              className={classes.buttonLogin}
              variant="contained"
              size="large"
              type="submit"
            >
              Log In
            </Button>
          </NavLink>
        </Paper>
      </Container>
    </>
  );
};

export default Homepage;
