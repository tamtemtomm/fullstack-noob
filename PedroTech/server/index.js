const express = require("express");
const app = express();
const cors = require("cors");
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/posts", commentsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server runnning on port 3001");
  });
});
