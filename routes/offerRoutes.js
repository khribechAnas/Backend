const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/offerController')

const offerController = new OfferController();

router.post('/add', offerController.createOffer);

router.get('/', offerController.getOffers);

router.get('/get/:offerId', offerController.getOfferById);

router.put('/update/:offerId', offerController.updateOffer);

router.delete('/delete/:offerId', offerController.deleteOffer);


module.exports = router;