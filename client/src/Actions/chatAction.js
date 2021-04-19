import * as api from "../api/index";

export const findChatAction = (participants) => async (dispatch) => {
  try {
    const { data } = await api.findChat(participants);
    dispatch({ type: "FIND_CHAT", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const userChatsAction = (username) => async (dispatch) => {
  try {
    const { data } = await api.userChats(username);
    dispatch({ type: "USER_CHATS", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const newMessageAction = (id, message) => async (dispatch) => {
  try {
    const { data } = await api.newMessage(id, message);
    dispatch({ type: "MESSAGE", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const deleteMessageAction = (id, messageId) => async (dispatch) => {
  try {
    const { data } = await api.deleteMessage(id, messageId);
    dispatch({ type: "MESSAGE", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const deleteForMeAction = (id, messageId) => async (dispatch) => {
  try {
    const { data } = await api.deleteForMe(id, messageId);
    dispatch({ type: "MESSAGE", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const messageSeenAction = (id,user) => async (dispatch) => {
  try {
    const { data } = await api.messageSeen(id,user);
    dispatch({ type: "MESSAGE", payload: data });
  } catch (e) {
    console.log(e);
  }
};
