import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Chip, Container, Drawer, IconButton } from "@material-ui/core";
import { ExitToApp, SearchOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import { useState } from "react";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
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
  appBar2: {
    top: 50,
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    marginLeft: "15px",
  },
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
}));

export default function Common({ chats }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = JSON.parse(localStorage.getItem("profile"));

  const logout = () => {
    if (window.confirm("Are you sure you wish to Logout")) {
      dispatch({ type: "LOGOUT" });
      history.push("/");
    }
  };
  const [opened, setOpened] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpened(open);
  };

  const list = (anchor) => (
    <div
      key="list-div"
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List key="chat-list" style={{ marginTop: 60, marginBottom: 60 }}>
        {chats.length > 0 ? (
          chats.map((chat, index) => {
            const unseen = chat?.messages.filter(
              (message) =>
                message.name !== currentUser.username && !message.seen
            );
            const unseenNumber = unseen.length;
            return (
              <>
                <Divider key={`divider${chat._id}`} />
                <ListItem
                  button
                  key={chat._id}
                  onClick={() => {
                    history.push(`/chats/${chat._id}`);
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      chat.participants[0] === currentUser.username
                        ? chat.participants[1]
                        : chat.participants[0]
                    }
                  />
                  {unseenNumber > 0 ? <Chip label={unseenNumber} /> : <></>}
                </ListItem>
              </>
            );
          })
        ) : (
          <ListItem key="noChats">
            <ListItemText primary="No chats" />
          </ListItem>
        )}
        <Divider key="last" />
      </List>

      <List
        key="topTextContainer"
        style={{
          position: "fixed",
          top: 0,
          width: 300,
          background: "black",
        }}
      >
        <ListItem key="top">
          <ListItemIcon>
            <AccountCircle style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#ffffff" }}
            primary={currentUser.username}
          />
        </ListItem>
      </List>
      <List
        key="bottomTextContainer"
        style={{
          position: "fixed",
          bottom: 0,
          width: 300,
          background: "black",
        }}
      >
        <ListItem key="btn-logout" button onClick={logout}>
          <ListItemText style={{ color: "#ffffff" }} primary="Logout" />
          <ListItemIcon style={{ color: "#ffffff" }}>
            <ExitToApp />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Container maxWidth="lg" style={{ height: 30 }}>
        <AppBar position="fixed" className={classes.appBar2}>
          <React.Fragment key="left">
            <IconButton onClick={toggleDrawer("left", true)}>
              <ListIcon style={{ color: "#ffffff" }} />
            </IconButton>
            <Drawer
              anchor="left"
              open={opened}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </React.Fragment>
          <IconButton component={Link} to="/search">
            <SearchOutlined style={{ color: "FFFFFF" }} />
          </IconButton>
        </AppBar>
      </Container>
    </>
  );
}
