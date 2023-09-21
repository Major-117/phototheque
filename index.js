const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const albumRoutes = require("./routes/album.routes");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(flash());

mongoose.connect("mongodb://127.0.0.1:27017/phototheque");

app.get('/', (req, res) =>{
    res.redirect("/albums");
});

app.use("/", albumRoutes);


app.use((req, res,) =>{
    res.status(404);
    res.send("Page non trouvée");
});

app.listen(port, () =>{
    console.log(`Le serveur est lancé sur le port : ${port}`);
});