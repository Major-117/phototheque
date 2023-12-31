const express = require("express");
const router = express.Router();
const albumController = require("../controllers/album.controller");

router.get("/albums", albumController.albums);
router.get("/albums/create", albumController.creatAlbumForm);
router.post("/albums/create", albumController.createAlbum);
router.get("/albums/:id", albumController.album);
router.post("/albums/:id", albumController.addImage);




module.exports = router;