const offerModel = require("../models/offerModel");

class OfferController {
  async createOffer(req, res) {
    try {
      const newOffer = await offerModel.create(req.body);
      res.status(201).json(newOffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOffers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 3;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 2;
      const totalItems = pageSize * itemsPerPage;
      const skip = (page - 1) * totalItems;
      //Filters
      const filters = {};
      if (req.query.code) {
        filters.code = req.query.code;
      }
      const offers = await offerModel.find(filters)
        .skip(skip)
        .limit(totalItems);
      //pagination
      const paginatedOffers = [];
      for (let i = 0; i < totalItems; i += itemsPerPage) {
        paginatedOffers.push(offers.slice(i, i + itemsPerPage));
        return res.status(200).json({ paginatedOffers });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOfferById(req, res) {
    try {
      const { offerId } = req.params;
      const offer = await offerModel.findById(offerId);

      if (!offer) {
        return res
          .status(404)
          .json({ message: "No offer found with provided ID." });
      }
      res.status(200).json(offer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }

  async updateOffer(req, res) {
    try {
      const { offerId } = req.params;
      const updatedOffer = await offerModel.findByIdAndUpdate(
        offerId,
        req.body,
        { new: true }
      );

      if (!updatedOffer) {
        return res.status(404).json({ error: "Offer emty!" });
      }
      res
        .status(200)
        .json({ message: "Offer updated successfully", updatedOffer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteOffer(req, res) {
    try {
      const { offerId } = req.params;
      const deletedOffer = await offerModel.findByIdAndDelete(offerId);

      if (!deletedOffer) {
        return res.status(404).json({ error: "Offer emty!" });
      }
      res
        .status(200)
        .json({ message: "Offer removed successfully", deletedOffer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = OfferController;
