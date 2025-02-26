let express = require('express');
let router = express.Router();

const controller = require('../../../controllers/payment/transaction.controller');
const authorization = require('../../../../middleware/user.middleware');


router.post('/createTransaction', authorization.Authorization, controller.createTransaction);
router.get('/getTranByUID', authorization.Authorization, controller.getTransactionsByUserID);
router.get('/getTranByID/:id', authorization.Authorization, controller.getTransactionById);

module.exports = router;