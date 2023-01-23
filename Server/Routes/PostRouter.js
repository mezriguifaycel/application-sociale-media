const express = require("express");
const { AuthMiddleWares } = require("../MiddleWares/AuthMiddleWare");
const router = express.Router();
const PostController = require("../Controllers/PostController");

//Add a Post
router.post("/", AuthMiddleWares, PostController.AddPost);
router.get("/", PostController.getAllPosts);
router.get("/myPosts", AuthMiddleWares, PostController.getMyPosts);

//delete post
router.delete("/:id", AuthMiddleWares, PostController.DeletePosts);

router.put("/:id", AuthMiddleWares, PostController.UpdatePosts);
module.exports = router;
