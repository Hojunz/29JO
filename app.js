const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const { readSync } = require("fs");
const { sequelize } = require("./models");
const fs = require("fs");

const routes = require("./routes");

//process.env.COOKIE_SECRET없음
dotenv.config(); // process.env
//process.env.COOKIE_SECRET있음

const app = express();

const {Server} = require('http') // 소켓소켓
const socketIo = require('socket.io')
const http = Server(app)
const io = socketIo(http)

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { httpOnly: true, secure: false },
  })
);

//라우터 연결
app.use("/api", routes);

// 페이지 없을 시 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 405;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.log(res.locals.message)
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; //에러로그 서비스에 넘김
  res.status(err.status || 501).json({message:'1111'});
  // res.render("error");
});

// 소켓 연결 
io.on("connection", (sock) => {
  console.log("새로운 소켓이 연결됐어요!");

  sock.on("BUY", (data) => {
    const emitData = {
      nickname: data.nickname,
      goodsId: data.goodsId,
      goodsName: data.goodsName,
      date: new Date().toISOString(),
    };

    io.emit("BUY_GOODS", emitData);
  });

  sock.on("disconnect", () => {
    console.log(sock.id, "연결이 끊어졌어요!");
  });
});


http.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
