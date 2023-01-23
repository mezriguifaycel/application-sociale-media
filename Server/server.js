const express = require('express');
const { ConnectDB } = require('./Config/ConnectDB');
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const UserRouter = require('./Routes/UserRouter')
const fileUpload = require('express-fileupload')
const PostRoutes= require('./Routes/PostRouter')
const path = require('path')
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
}));
app.use('/api/users', UserRouter )
app.use( '/api/posts', PostRoutes )
 // set up deployement 

app.use(express.static(path.join(__dirname,'../','client','build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../','client','build','index.html'));
});
mongoose.set('strictQuery', true)
ConnectDB()


const PORT = process.env.PORT || 7000;
app.listen(PORT, err=> err? console.log(err) : console.log(`Server is running on ${PORT}...`))
