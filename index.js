import express from "express";

const app = express()
const port = 3000
const host = "127.0.0.1";

// DB_HOST=127.0.0.1
// DB_PORT=3306
// DB_USER=user_ex
// DB_PASS=1234

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, host, () => {
  console.log(`app listening on ${host}:${port}...`)
})