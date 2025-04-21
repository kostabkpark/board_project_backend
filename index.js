import express from "express";
//import negotiate from "express-negotiate";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 5000;
const host = "127.0.0.1";

app.use(express.json());
app.use(cors({
  origin : "http://localhost:3000",
  credentials : true,
  }
))
dotenv.config({path:'.env'});

const db = mysql.createConnection({
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : "backend"
})

db.connect((err) => {
  console.log("데이터베이스 연결 성공");
  if(err) console.log(err);
});

// 콘텐츠 협상 관련 코드
// app.get("/hello", (req, res) => {
//   req.negotiate({
//     "application/json;q=1.1": () => {
//       res.send('{message : "hello world"');
//     },
//     html: () => {
//       res.send("<h1>hello world</h1>");
//     },
//     xml: () => {
//       res.send("<Message>hello<name>hongkildong</name></Message>");
//     },
//     default: () => {
//       res.send("<h1>hello world</h1>");
//     },
//   });
// });

app.get("/api/boards", (req, res) => {
  console.log("글 목록 출력중");
  const sql = "select * from board_table";
  db.query(sql, (err, results) => {
      if(err) console.log(err);
      else {
        res.statusCode = 200;
        res.setHeader('type', 'json');
        res.send(results);
      }
  })
});

app.get("/api/boards/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from board_table where id = ?";
  db.query(sql, [id], (err, results) => {
      if(err) console.log(err);
      else {
        if(results[0]) {
          res.statusCode = 200;
          res.setHeader('type', 'json');
          res.send(results[0]);
        } else {
          let errorClass = {
            status : 404, 
            error : "Not Found",
            message : "게시판자료를 찾을 수 없습니다."
          }
          res.statusCode = 404;
          res.send(errorClass);
        } 
      }
    });
});

app.post("/api/boards", (req, res) => {
  const { title, contents, writer, passwd } = req.body;
  const sql = "insert into board_table (title, writer, passwd, contents) values (?,?,?,?)";
  db.query(sql, [title, writer, passwd, contents], (err, results) => {
    if(err) console.log(err);
    else { 
      const sql1 = "select * from board_table where id = ?";
      db.query(sql1, [results.insertId], (err1, results1) => {
        if(err1) console.log(err1);
        else {
          res.statusCode = 201;
          res.send(results1[0]);
        }
      });
    }
  })
});

app.put("/api/boards/:id", (req, res) => {
  const id = req.params.id;
  const { contents, passwd } = req.body;
  console.log("글 수정 중", req.body);
  res.send(`${id} 글 수정중`);
});

// 개인숙제 : 완성
app.patch("/api/boards/:id", (req, res) => {
  const id = req.params.id;
  console.log("글 조회수 증가");
  res.send(`${id} 글 조회수 증가`);
});

app.delete("/api/boards/:id", (req, res) => {
  const id = req.params.id;
  console.log("글 수정 중", id);
  res.send(`${id} 글 삭제중`);
});

app.listen(port, host, () => {
  console.log(`app listening on ${host}:${port}...`);
});
