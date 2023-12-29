const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/offerController');
const verifyRoles = require('../middleware/verifyRoles');

const offerController = new OfferController();

router.post('/add',verifyRoles(["admin"]), offerController.createOffer);

router.get('/', offerController.getOffers);

router.get('/get/:offerId', offerController.getOfferById);

router.put('/update/:offerId',verifyRoles(["admin", "moderator"]), offerController.updateOffer);

router.delete('/delete/:offerId',verifyRoles(["admin"]), offerController.deleteOffer);


module.exports = router;