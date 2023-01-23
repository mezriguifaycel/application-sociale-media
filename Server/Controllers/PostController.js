const Post = require("../Models/PostModel");
const cloudinary = require("../Config/cloudinairy");

//add post.......................
const AddPost = async (req, res) => {
  try {
    const { title, Des } = req.body;
    const savedImage = await cloudinary.uploader.upload(
      req.files.Img.tempFilePath
    );
    //save the post in the DB
    const newPost = await Post.create({
      owner: req.userId,
      title,
      Des,
      Img: { public_id: savedImage.public_id, imgUrl: savedImage.url },
    });
    res.json({ newPost, msg: "Post has been added successfully!" });
  } catch (error) {
    res.status(504).json({ message: error });
  }
};
//get all post.......................
const getAllPosts = async (req, res) => {
  try {
    const AllPosts = await Post.find({}).populate({
      path: "owner",
      select: "-password -__v",
    });
    res.json(AllPosts);
  } catch (error) {
    res.status(504).json({ message: error });
  }
};
// getMyPosts .......................

const getMyPosts = async (req, res) => {
  try
  {
    const MyPosts = await Post.find({ owner: req.userId }).populate({
      path: "owner",
      select: "-password -__v",
    });
    res.json(MyPosts);
  } catch (error) {
    res.status(504).json({ message: error });
  }
};

//update post
//@PUT
const UpdatePosts = async (req, res) => {
  try {
    const UpdatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(UpdatedPost);
  } catch (error) {
    console.log(error);
  }
};

//Delete post
//@delete
const DeletePosts = async (req, res) => {
  try {
    const DeletedPosts = await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: "The post is deleted", DeletedPosts });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { AddPost, getAllPosts, UpdatePosts, DeletePosts, getMyPosts };
