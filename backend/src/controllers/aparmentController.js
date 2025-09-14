const Apartment = require('../models/Apartment')

exports.getAllApartments = async (req, res) => {
    try {
        const apartment = await Apartment.find();
        res.json(apartment)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
}