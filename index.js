const express = require("express");
//建立express实例
const app = new express();
//建立http服务
const http = require("http").Server(app);
//对该http服务实施socket封装，即该服务下的接口满足socket协议
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("connect");
    //全局通知
    io.emit("test1", socket.id);

    socket.on("chatMessageToSocketServer", (msg) => {
        console.log(msg);
        //私人通知
        socket.emit("test1", `Dear ${socket.id}, I have received your replay`);
    });
});

io.on("disconnect", () => {
    console.log("disconnect");
});

http.listen(8080, () =>{
    console.log("listening on *:8080");
});
