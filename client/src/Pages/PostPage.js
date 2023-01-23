import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { AddPost, DeletePosts, getAllPosts } from "../Redux/PostSlice";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "../Components/BasicModal.js";
import { useNavigate } from "react-router-dom";
import ChildModal from "../Components/ChildModal";
const PostPage = () => {
  const [newPost, setNewPost] = useState({});
  const [image, setImage] = useState("");
  const HandleChangePost = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  const HandleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const User = useSelector((state) => state.User.user);
  const posts = useSelector((state) => state.Post.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  const navigate = useNavigate();
  const AddingPost = (e) => {
    e.preventDefault();
    const formDataPost = new FormData();
    formDataPost.append("title", newPost.title);
    formDataPost.append("Des", newPost.Des);
    formDataPost.append("Img", image);
    dispatch(AddPost(formDataPost));
    handleClose();
  };

  return (
    <div>
      {/*...................modal  Add Post */}

      {/* {user?.Role == "admin" && ( */}
      <>
        <Button className="btnn" onClick={handleShow}>
          Ajouter Votre Media
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Votre Media</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              onChange={HandleChangePost}
              name="title"
              type="text"
              placeholder="Enter title"
            />{" "}
            <br />
            <Form.Control
              onChange={HandleChangePost}
              name="Des"
              type="text"
              placeholder="Enter Description"
            />
            <br />
            <input
              onChange={HandleChangeImage}
              name="Img"
              type="file"
              accept="image/*"
            />
          </Modal.Body>
          <br />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Sortie
            </Button>
            <Button variant="primary" onClick={AddingPost}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* .................................................................................. */}
      {/* getAll Posts */}
      <Row xs={1} md={2} className="g-4">
        {posts?.map((el, i) => (
          <Col key={i}>
            <Card className="cardimg2">
              <Card.Img className="cardimg" src={el.Img.imgUrl} />
              <Card.Body>
                <div className="k1">
                  <Card.Title>{el.title}</Card.Title>{" "}
                </div>
                <div className="k1">
                  <Card.Text>{el.Des}</Card.Text>
                  {User?._id == el?.owner?._id && <BasicModal el={el} />}
                </div>
              </Card.Body>
              <div className="divbtn">
                {" "}
                <Stack direction="row" spacing={1}>
                  {
                    <Avatar
                      src={
                        el?.owner?.Img
                          ? el.owner.Img?.imgUrl
                          : "https://pic.onlinewebfonts.com/svg/img_155117.png"
                      }
                    />
                  }
                </Stack>
                
                <Stack direction="row" spacing={1}>
                  {User?._id == el?.owner?._id && (
                    <>
                      <Button
                        onClick={() => dispatch(DeletePosts(el._id))}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </>
                  )}

                  {/* icon send mail . () => navigate("/Message") */}
                  <Stack direction="row" spacing={2}>
                    {User?._id !== el?.owner?._id && <ChildModal el={el} />}
                  </Stack>
                </Stack>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostPage;
