import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // get all the songs in descending or by createdAt time
    const songs = await Song.find().sort({ createdAt: -1 });

    // return the songs
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error in song/getAllSongs controller : ", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // return the songs
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error in song/getFeaturedSongs controller : ", error);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // return the songs
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error in song/getMadeForYouSongs controller : ", error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    // return the songs
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error in song/getTrendingSongs controller : ", error);
    next(error);
  }
};

export const getSongById = async (req, res, next) => {};
