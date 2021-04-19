import { Chip, Divider, IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteForMeAction, deleteMessageAction } from "../Actions/chatAction";
import DoneAllIcon from "@material-ui/icons/DoneAll";

export default function Message({
  message,
  index,
  currentUsername,
  chatId,
  socket,
  reciever,
}) {
  const dispatch = useDispatch();
  const day = message.date?.slice(0, 2);
  const newDay = day === message.date?.slice(0, 2) ? false : true;
  const jc = message.name === currentUsername ? "flex-end" : "flex-start";
  const bg = message.name === currentUsername ? "#C2936E" : "#F3F3F3";
  const [anchorEl, setAnchorEl] = useState(null);
  const sender = currentUsername;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-menu" : undefined;

  return (
    <>
      {message?.deleteForMe ? (
        <></>
      ) : (
        <>
          <div
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {newDay ? (
              <Chip
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  fontWeight: "bold",
                }}
                label={message.date}
              ></Chip>
            ) : (
              <></>
            )}
          </div>
          <div
            key={message._id}
            style={{ display: "flex", justifyContent: jc }}
          >
            <div
              style={{
                background: bg,
                margin: 10,
                borderRadius: "20px",
                padding: "1px 20px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                maxWidth: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: ".7em",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {message.name}
                </p>
                {message.name === currentUsername ? (
                  <>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      style={{ color: "black", marginRight: -15 }}
                      size="small"
                      onClick={handleClick}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                    <Menu
                      id={id}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        style={{
                          background: "grey",
                          color: "black",
                          marginTop: -8,
                        }}
                        onClick={() => {
                          dispatch(deleteForMeAction(chatId, message._id));
                          handleClose();
                        }}
                      >
                        Delete for me
                      </MenuItem>
                      <Divider style={{ background: "black" }} />
                      <MenuItem
                        style={{
                          background: "grey",
                          color: "black",
                          marginBottom: -8,
                        }}
                        onClick={async () => {
                          await dispatch(
                            deleteMessageAction(chatId, message._id)
                          );
                          handleClose();
                          socket.emit("newMessage", { sender, reciever });
                        }}
                      >
                        Delete for everyone
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {message.media && message.media !== "" ? (
                <img
                  style={{ maxHeight: "30vh", maxWidth: "70vw" }}
                  src={message.media}
                  alt="Broken"
                />
              ) : (
                <></>
              )}
              <p
                style={{
                  // width: "100%",
                  color: "black",
                  fontSize: "1em",
                  fontWeight: "bold",
                  wordWrap: "break-word",
                }}
              >
                {message.message}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <p
                  style={{
                    color: "black",
                    letterSpacing: 0,
                    fontSize: ".6em",
                    fontWeight: "bold",
                    wordWrap: "break-word",
                  }}
                >
                  {message.time}
                </p>
                {message.name === currentUsername ? (
                  message.seen ? (
                    <DoneAllIcon
                      fontSize="small"
                      style={{ marginLeft: 5, marginTop: 5, color: "#008080" }}
                    />
                  ) : (
                    <DoneAllIcon
                      fontSize="small"
                      style={{ marginLeft: 5, marginTop: 5, color: "grey" }}
                    />
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
