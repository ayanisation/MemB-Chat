import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Common from "./Common";
import SendIcon from "@material-ui/icons/Send";
import {
  AppBar,
  Container,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Typography,
} from "@material-ui/core";
import io from "socket.io-client";
import { useHistory, useParams } from "react-router";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import {
  messageSeenAction,
  newMessageAction,
  userChatsAction,
} from "../Actions/chatAction";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import AddImageModal from "./AddImageModal";
import CancelIcon from "@material-ui/icons/Cancel";
import ScrollableFeed from "react-scrollable-feed";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ENDPOINT = "https://memb-chat-server.herokuapp.com";
let chats = [];
let currentChat = {};
let socket;

export default function ChatRoom() {
  const classes = useStyles();
  const chatId = useParams().id;
  const history = useHistory();
  const dispatch = useDispatch();

  chats = useSelector((state) => state.chats);
  currentChat = chats.find((chat) => chat._id === chatId);

  const [message, setMessage] = useState("");
  const [media, setMedia] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("profile"));
  if (!currentUser) history.push("/");

  const reciever =
    currentUser.username === currentChat?.participants[0]
      ? currentChat?.participants[1]
      : currentChat?.participants[0];

  const sender = currentUser.username;

  useEffect(() => {
    if (currentUser) {
      dispatch(userChatsAction(currentUser.username));
    }
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    const newChat = async () => {
      if (currentUser) {
        await dispatch(messageSeenAction(chatId, currentUser.username));
      }
      socket.emit("seen", reciever);
    };
    newChat();
  }, [chatId]);

  useEffect(() => {
    const joinedUser = currentUser.username;
    socket.on("newMessage", async ({ sender, reciever }) => {
      if (currentUser && reciever === joinedUser) {
        if (
          sender === currentChat?.participants[0] ||
          sender === currentChat?.participants[1]
        ) {
          console.log(currentChat?.participants[0]);
          console.log(currentChat?.participants[1]);
          console.log(sender);
          await dispatch(
            messageSeenAction(currentChat._id, currentUser.username)
          );
          socket.emit("seen", sender);
        }
        await dispatch(userChatsAction(joinedUser));
      }
    });
    socket.on("seen", (sender) => {
      if (sender === currentUser.username)
        dispatch(userChatsAction(currentUser.username));
    });
  }, []);

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message === "" && media === "") return;
    const moment = new Date();
    let messageObj = {
      name: currentUser.username,
      message: message,
      media: media,
      date: moment.toLocaleDateString("en-GB"),
      time: moment.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    await dispatch(newMessageAction(chatId, messageObj));
    setMessage("");
    setMedia("");
    socket.emit("newMessage", { sender, reciever });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Container maxWidth="lg" style={{ height: 30 }}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Typography className={classes.heading} variant="h4" align="center">
            {currentChat
              ? currentChat.participants[0] === currentUser.username
                ? currentChat.participants[1]
                : currentChat.participants[0]
              : "Chat Room"}
          </Typography>
        </AppBar>
      </Container>
      <Common parent="chatroom" chats={chats} />
      <Container
        maxWidth="sm"
        style={{
          marginTop: 55,
          marginBottom: 75,
          height: "70vh",
        }}
      >
        {chatId ? (
          <>
            <ScrollableFeed forceScroll="true">
              {currentChat?.messages.map((message, index) => (
                <Message
                  key={message._id}
                  message={message}
                  index={index}
                  currentUsername={currentUser.username}
                  chatId={currentChat._id}
                  socket={socket}
                  reciever={
                    currentChat.participants[0] === currentUser.username
                      ? currentChat.participants[1]
                      : currentChat.participants[0]
                  }
                />
              ))}
            </ScrollableFeed>
          </>
        ) : (
          <Typography variant="h4">Click on a chat to start talking</Typography>
        )}
        {media !== "" ? (
          <AppBar
            position="fixed"
            style={{
              top: "auto",
              bottom: 70,
              background: "black",
              paddingTop: 10,
              height: "30vh",
            }}
          >
            <Container
              maxWidth="sm"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div>
                <IconButton
                  style={{ float: "right", marginBottom: -20 }}
                  onClick={() => {
                    setMedia("");
                  }}
                  size="small"
                >
                  <CancelIcon style={{ color: "#ffffff" }} />
                </IconButton>
                <img
                  style={{ maxHeight: "30vh", maxWidth: "90vw" }}
                  src={media}
                  alt="try again"
                />
              </div>
            </Container>
          </AppBar>
        ) : (
          <></>
        )}
      </Container>
      {chatId ? (
        <AppBar
          style={{
            top: "auto",
            bottom: 0,
            paddingTop: 10,
            paddingBottom: 10,
            height: 70,
            background: "black",
          }}
        >
          <Container
            maxWidth="sm"
            style={{ height: 30, display: "flex", flexDirection: "row" }}
          >
            <IconButton style={{ marginTop: 15 }} onClick={handleClick}>
              <EmojiEmotionsIcon style={{ color: "#ffffff" }} />
            </IconButton>
            <Container>
              <Paper
                style={{
                  background: "#ffffff",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <InputBase
                  name="message"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  placeholder="Type a message"
                  value={message}
                  onKeyPress={(event) => {
                    if (event.code === "Enter" || event.code === "NumpadEnter")
                      sendMessage();
                  }}
                  onChange={updateMessage}
                ></InputBase>
              </Paper>
            </Container>
            <AddImageModal setMedia={setMedia} />
            <IconButton onClick={sendMessage} style={{ marginTop: 15 }}>
              <SendIcon style={{ color: "#ffffff" }} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Picker
                showPreview={false}
                showSkinTones={false}
                onSelect={(emote) => {
                  setMessage((prev) => prev + emote.native);
                }}
              />
            </Popover>
          </Container>
        </AppBar>
      ) : (
        <></>
      )}
    </>
  );
}
