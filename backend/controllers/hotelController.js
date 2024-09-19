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
 * @route  GET /api/hotels/find/:id
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
  const { limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({ ...others }).limit(limit);
    if (!hotels) {
      return next(createError(404, "No hotels found"));
    }

    res.status(200).json(hotels);
  } catch (error) {
    if (error.name === "CastError") {
      return next(createError(400, "Invalid query parameter"));
    }

    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
