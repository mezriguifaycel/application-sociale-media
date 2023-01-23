import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Components/NavBar.js";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { DeleteUsers, getAllUsers } from "../Redux/UserSlice.js";

export default function UserListe() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const Users = useSelector((state) => state.User.users);
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <br />
      <div className="divcard">
        <Row xs={1} md={3}>
          {Users?.map((User, i) => (
            <Col>
              <Card className="coluser">
                <Card.Img variant="top" />
                <Card.Body>
                  <Avatar src={User?.Img?.imgUrl} />
                  <Card.Title>Nom/Prenom:{User?.name}</Card.Title>
                  <Card.Text>Email:{User?.email} </Card.Text>
                </Card.Body>
                <Button
                  onClick={() => dispatch(DeleteUsers(User._id))}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <br />
      <br />
      <br />

      <Button className="btn1" onClick={() => navigate("/Profile")}>
        Aller Au Profile
      </Button>
    </div>
  );
}
