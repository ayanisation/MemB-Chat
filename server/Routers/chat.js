const express = require("express");
const ChatModel = require("../models/chatModel");

const router = new express.Router();

router.post("/findChat", async (req, res) => {
  const participant1 = req.body[0];
  const participant2 = req.body[1];
  try {
    const chat = await ChatModel.find({ participants: participant1 }).findOne({
      participants: participant2,
    });
    if (chat) res.status(200).json(chat);
    else {
      const newChat = new ChatModel({
        participants: [participant1, participant2],
        messages: [],
      });
      await newChat.save();
      res.status(200).json(newChat);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/:username/userChats", async (req, res) => {
  try {
    const chats = await ChatModel.find({
      participants: req.params.username,
    }).sort({ $natural: -1 });
    if (chats) res.status(200).json(chats);
    else res.status(200).json([]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.patch("/:id/newMessage", async (req, res) => {
  const { id: _id } = req.params;
  try {
    const chat = await ChatModel.findOne({ _id });
    const msgArr = chat.messages;
    msgArr.push(req.body);
    const updatedChat = await ChatModel.findByIdAndUpdate(
      _id,
      { messages: msgArr },
      { new: true }
    );
    res.status(201).json(updatedChat);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.patch("/:id/deleteMessage", async (req, res) => {
  const { id: _id } = req.params;
  const messageId = req.body.messageId;

  try {
    const chat = await ChatModel.findOne({ _id });
    const msgArr = chat.messages;
    const index = msgArr.findIndex((chat) => chat._id == messageId);
    msgArr.splice(index, 1);
    const updatedChat = await ChatModel.findByIdAndUpdate(
      _id,
      { messages: msgArr },
      { new: true }
    );
    res.status(201).json(updatedChat);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.patch("/:id/deleteForMe", async (req, res) => {
  const { id: _id } = req.params;
  const messageId = req.body.messageId;
  try {
    const chat = await ChatModel.findOne({ _id });
    const msgArr = chat.messages;
    const msg = msgArr.find((chat) => chat._id == messageId);
    msg.deleteForMe = true;
    const index = msgArr.findIndex((chat) => chat._id == messageId);
    msgArr.splice(index, 1, msg);
    const updatedChat = await ChatModel.findByIdAndUpdate(
      _id,
      { messages: msgArr },
      { new: true }
    );
    res.status(201).json(updatedChat);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.patch("/:id/messageSeen", async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body.user;
  try {
    const chat = await ChatModel.findOne({ _id });
    const msgArr = chat.messages;
    const msg = msgArr.map((chat) => {
      if (chat.name != user) chat.seen = true;
      return chat;
    });
    const updatedChat = await ChatModel.findByIdAndUpdate(
      _id,
      { messages: msg },
      { new: true }
    );
    res.status(201).json(updatedChat);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
