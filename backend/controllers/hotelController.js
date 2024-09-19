/**
 * @desc   Create a new hotel
 * @route  POST /api/hotels/
 * @access Private
 */
import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();

    res.status(201).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update an existing hotel
 * @route  PUT /api/hotels/:id
 * @access Private
 */
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Delete a hotel
 * @route  DELETE /api/hotels/:id
 * @access Public
 */
export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return next(createError(404, "Hotel not found"));
    }

    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get a hotel
 * @route  GET /api/hotels/:id
 * @access Public
 */
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return next(createError(404, "Hotel not found"));
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get all hotels
 * @route  GET /api/hotels/
 * @access Public
 */
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
