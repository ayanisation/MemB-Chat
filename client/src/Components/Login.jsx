import {
  AppBar,
  Button,
  Container,
  Grow,
  IconButton,
  InputAdornment,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { userSignin } from "../Actions/authAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: 10,
    padding: theme.spacing(2),
    borderRadius: 15,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  textField: {
    marginTop: 20,
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    fontWeight: "bold",
    marginTop: 50,
    background: "#79CDCD",
    fontFamily: "Copperplate Papyrus",
  },
  buttonGoogle: {
    fontWeight: "bold",
    marginTop: 50,
    background: "light grey",
    fontFamily: "Copperplate Papyrus",
  },
  buttonSignup: {
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    color: "#000",
    fontFamily: "Copperplate Papyrus",
    textDecoration: "none",
  },
  appBar: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  heading: {
    color: "#C2936E",
    fontWeight: "bold",
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [clicked, setClicked] = useState(false);
  let [visible, setVisible] = useState(false);
  const updateData = (e) => {
    setUser((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const userLogin = async (e) => {
    e.preventDefault();
    setClicked(true);
    console.log(user);
    let verified = await dispatch(userSignin(user));
    if (verified) history.push("/chats");
    else alert("Invalid Login Credentials");
    setClicked(false);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ height: 30 }}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Typography className={classes.heading} variant="h4" align="center">
            User Login
          </Typography>
        </AppBar>
        </Container>
      <Grow in>
        <Container maxWidth="sm" style={{ marginTop: 50 }}>
          <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form}>
              <Typography variant="h6">Enter Login Details</Typography>
              <TextField
                className={classes.textField}
                name="username"
                variant="outlined"
                label="Username"
                fullWidth
                value={user.username}
                onChange={updateData}
              ></TextField>
              <TextField
                className={classes.textField}
                name="password"
                variant="outlined"
                type={visible ? "text" : "password"}
                label="Password"
                fullWidth
                value={user.password}
                onChange={updateData}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setVisible((preVisible) => !preVisible);
                        }}
                      >
                        {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                size="large"
                fullWidth
                onClick={userLogin}
              >
                Login
              </Button>
              <Typography
                variant="body1"
                position="end"
                className={classes.buttonSignup}
                component={Link}
                to="/register"
              >
                New User ? Signup here
              </Typography>
            </form>
            {clicked ? <LinearProgress /> : <></>}
          </Paper>
        </Container>
      </Grow>
    </>
  );
};

export default Login;
