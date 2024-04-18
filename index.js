import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import env from "dotenv";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
env.config();


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//   });
const privateKey = process.env.PRIVATE_KEY;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/authenticate", async (req, res) => {
  const user = req.body.username;
  console.log(user);
  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        {username: user , secret : user , first_name : user},
        {headers : {"private-key" : privateKey}}
    );
    console.log(r.data);
    return res.status(r.status).json(r.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})