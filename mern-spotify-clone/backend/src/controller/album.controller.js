import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.error("Error in album/getAllAlbums controller : ", error);
    next(error);
  }
};
export const getAlbumById = async (req, res, next) => {
  try {
    //get albumId
    const { albumId } = req.params;

    // get the album
    const album = await Album.findById(albumId).populate("songs");

    // check if the album exists
    if (!album) res.status(400).json({ message: "Album not found" });

    res.status(200).json(album);
  } catch (error) {
    console.error("Error in album/getAlbumId controller : ", error);
    next(error);
  }
};
