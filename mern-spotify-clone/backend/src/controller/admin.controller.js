import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempfilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error in uploadToCLoudinary : ", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const getAdmin = async (req, res) => {
  try {
    // get all the params
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if user already exists
    const user = await User.findOne({ clerkId: id });

    // make an user
    if (!user) {
      //signup
      await User.create({
        clerkId: id,
        fullName: `${firstName}, ${lastName}`,
        imageUrl,
      });
    }

    // return the responds
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error in auth callback : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSong = async (req, res, next) => {
  try {
    // check if the user has the files
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }

    // get the song metadata
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFIle;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // save the song
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    // Insert the song into album
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: {
          songs: song._id,
        },
      });
    }

    // send the responds
    res.status(201).json(song);
  } catch (error) {
    console.error("Error in admin/createSong controller : ", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    // get the song params
    const { id } = req.params;

    // get the song
    const song = await Song.findById(id);

    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    // delete the song
    await Song.findByIdAndDelete(id);

    res.status(200).json({ messsage: "Song deleted successfully" });
  } catch (error) {
    console.error("Error in admin/deleteSong controller : ", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    // get the album data fieds
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    // upload the image to the cloud
    const imageUrl = await uploadToCloudinary(imageFile);

    // create new album
    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.error("Error in admin/createAlbum controller : ", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    // get the album id
    const { id } = req.params;

    //delete all the song in that album
    await Song.deleteMany({ albumId: id });

    // delete the album
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error in admin/deleteAlbum controller : ", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
