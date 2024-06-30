const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postid;
  const comments = await Comments.find({ where: { Postid: postId } });
  res.json(comments);
});

module.exports = router;
