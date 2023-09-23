const Album = require("../models/Album");
const path = require("path");
const fs = require("fs");

const albums = async (req,res) =>{
    const albums = await Album.find();
    console.log(albums)

    res.render("albums", {
        title:"Mes albums",
        albums,
    });
};

const creatAlbumForm = (req , res) =>{
    res.render("new-album",{
        title: "Nouvel album",
        errors: req.flash("error"),
    })
};

const createAlbum = async (req, res) =>{
    try {
        if(!req.body.albumTitle){
            req.flash("error", "Le titre ne doit pas être vide");
            res.redirect("/albums/create");
            return;
        }
        await Album.create({
            title: req.body.albumTitle,
        });
        res.redirect("/albums");
    }catch (err){
        req.flash("error", "Erreur lors de la création de l'album");
        res.redirect("/albums/create");
    }
};

const album = async (req, res) =>{
    try {
        const idAlbum = req.params.id;
        const album = await Album.findById(idAlbum);

        // console.log(album);
        req.params.id;
        res.render("album",{
            title: `Mon album ${album.title}`,
            album,
            errors: req.flash("error"),
        });
    }catch (err){
        console.log(err);
        res.redirect("/404");
    }
};

const addImage = async (req, res) =>{
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    console.log(req.files);
    if(!req?.files?.image){
        req.flash("error", "Aucun fichier mis en ligne");
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    const image = req.files.image;

    if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png'){
        req.flash("error", "Uniquement les formats png et jpeg sont accepter ");
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    const folderPath = path.join(__dirname,"../public/uploads", idAlbum);
    fs.mkdirSync(folderPath, {recursive: true});
    const imageName = image.name;
    const localpath = path.join(folderPath, imageName);
    await req.files.image.mv(localpath);
    album.images.push(imageName);
    await album.save();



    res.redirect(`/albums/${idAlbum}`);
};



module.exports = {
    creatAlbumForm,
    createAlbum,
    albums,
    album,
    addImage,
};