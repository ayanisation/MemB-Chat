import {
  AppBar,
  Button,
  Container,
  Grow,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { AccountCircle, SearchOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Actions/authAction";
import { useHistory } from "react-router-dom";
import { findChat } from "../api";

const useStyles = makeStyles((theme) => ({
  icons: {
    padding: theme.spacing(0, 2),
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
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

const Searcher = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const currentUser = JSON.parse(localStorage.getItem("profile"));
  if (!currentUser) history.push("/");
  const currentUsername = currentUser.username;
  let [query, setQuery] = useState("");
  let users = [];
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  users = useSelector((state) => state.auth);
  if (users.length > 0) {
    users = users.filter(
      (user) =>
        user.username &&
        user.name &&
        (user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.name.toLowerCase().includes(query.toLowerCase()))
    );
  }

  const searchUsers = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <Container maxWidth="lg" style={{ height: 30 }}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Typography className={classes.heading} variant="h4" align="center">
            Search Users
          </Typography>
        </AppBar>
      </Container>
      <Grow in>
        <AppBar
          style={{
            position: "fixed",
            top: 50,
            alignItems: "center",
            background: "black",
            padding: 20,
          }}
        >
          <Paper style={{ padding: 10, display: "flex" }}>
            <div className={classes.icons}>
              <SearchOutlined />
            </div>
            <InputBase
              autoComplete="off"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
              }}
              name="query"
              value={query}
              onChange={searchUsers}
              inputProps={{ "aria-label": "search" }}
            />
          </Paper>
        </AppBar>
      </Grow>
      <Container maxWidth="sm" style={{ marginTop: 135, marginBottom: 65 }}>
        {query ? (
          users.length === 0 ? (
            <Typography variant="h5" align="center">
              No Matches
            </Typography>
          ) : (
            users.map((user) => (
              <Paper
                id={user._id}
                style={{
                  background: "black",
                  marginTop: 10,
                  borderRadius: 50,
                  display: "flex",
                  padding: 10,
                }}
              >
                <Button
                  style={{ textTransform: "lowercase" }}
                  onClick={async () => {
                    console.log(currentUsername, user.username);
                    try {
                      const { data } = await findChat([
                        currentUsername,
                        user.username,
                      ]);
                      history.push(`/chats/${data._id}`);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <div className={classes.icons}>
                    <AccountCircle style={{ color: "#ffffff" }} />
                  </div>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{ color: "#ffffff", marginRight: 10 }}
                  >
                    {user.username}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{ color: "#ffffff" }}
                  >
                    ({user.name})
                  </Typography>
                </Button>
              </Paper>
            ))
          )
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Searcher;
