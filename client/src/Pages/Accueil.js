import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavBar from "../Components/NavBar";
import Liste from "../Components/Liste.js";
import PostPage from "./PostPage.js";


const Acceuil = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth");
  const User = useSelector((state) => state.User.user);
  useEffect(() => {
    !isAuth && navigate("/Login");
  }, [isAuth]);
  return (
    <div>
      <NavBar />
      <div className="espace">
        <div className="cardd1">
          <h6> {User?.name} </h6>

          <Card.Img
            className="cardimg13"
            src={
              User && User.Img
                ? User.Img.imgUrl
                : "https://pic.onlinewebfonts.com/svg/img_155117.png"
            }
          />
          <br />
          <br />

          <Liste />
         
        </div>
        <div className="scrollable">
          <PostPage />
        </div>
      </div>
    </div>
  );
};

export default Acceuil;
