import express from "express";
import mysql from "mysql"

const app = express()
const port = 3000
const host = "127.0.0.1";

app.use(express.json())

// DB_HOST=127.0.0.1
// DB_PORT=3306
// DB_USER=user_ex
// DB_PASS=1234


app.get('/boards', (req, res) => {
  console.log("글 목록 출력중");
  res.send('글목록 출력')
})

app.get('/boards/:id', (req, res) => {
  const id = req.params.id;
  console.log("글 상세 조회", id);
  res.send(`${id} 글 상세 조회`);
})

app.post('/boards' , (req, res) => {
  const {title, contents, writer, passwd} = req.body;
  console.log("글 작성", req.body);
  res.send(`${title} 글 작성중`);
})

app.put('/boards/:id' , (req, res) => {
  const id = req.params.id;
  const {contents, passwd} = req.body;
  console.log("글 수정 중", req.body);
  res.send(`${id} 글 수정중`);
})

app.patch('/boards/:id' , (req, res) => {
  const id = req.params.id;
  console.log("글 조회수 증가");
  res.send(`${id} 글 조회수 증가`);
})

app.delete('/boards/:id' , (req, res) => {
  const id = req.params.id;
  console.log("글 수정 중", id);
  res.send(`${id} 글 삭제중`);
})

app.listen(port, host, () => {
  console.log(`app listening on ${host}:${port}...`)
})