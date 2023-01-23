import  React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import NavBar from "../Components/NavBar.js";

import { useNavigate } from "react-router-dom";

export default function ImgMediaCard ()
{
  const User = useSelector( ( state ) => state.User.user );
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <br />

      <Card className="infocard" sx={{ maxWidth: 1500 }}>
        <CardMedia
          className="img"
          sx={{ height: 100, width: 100 }}
          title="green iguana"
          image={
            User && User.Img
              ? User.Img.imgUrl
              : "https://pic.onlinewebfonts.com/svg/img_155117.png"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Apropos de :
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <h6>Nom et Prenom: {User?.name}</h6>
            <h6>adresse Email:{User?.email} </h6>
            <h6>Nationalité:{User?.nationalite} </h6>
          </Typography>
        </CardContent>
        <CardActions>
          <Button className="btn1" onClick={() => navigate("/Profile")}>
            Aller Au Profile
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
