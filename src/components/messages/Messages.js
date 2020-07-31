import React, { useState, useEffect } from "react";
import "./Messages.css";

import { LOG_OUT } from "./Events";

import io from "socket.io-client";
const socketUrl = "http://192.168.43.171:3231";

const Messages = ({ socket, setSocket, user, setUser, settingUser }) => {
  useEffect(() => {
    initSocket();
  }, []);

  // initSocket and connect
  const initSocket = () => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("Connected ");
    });

    setSocket({ socket });
  };

  // ----- user log-out -----
  const logout = () => {
    socket.emit(LOG_OUT);
    setUser(null);
  };

  return (
    <div className="msg_main_div">
      <div className="msg_friend_container"></div>
      <div className="msg_chat_container"></div>
    </div>
  );
};

export default Messages;
