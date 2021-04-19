const chatReducer = (chats = [], action) => {
  switch (action.type) {
    case "USER_CHATS":
      return action.payload;
    case "FIND_CHAT":
      const index = chats.findIndex((chat) => chat._id === action?.payload._id);
      if (index === -1) return [...chats, action?.payload];
      return chats.splice(index, 1).push(action?.payload);
    case "MESSAGE":
      return chats.map((chat) =>
        chat._id === action?.payload._id ? action.payload : chat
      );
    default:
      return chats;
  }
};
export default chatReducer;
