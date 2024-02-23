const { Router } = require('express');

const {
    createMembershipPurchaseHandler, getMembershipPurchasesHandler, getMembershipPurchaseByIdHandler, getMembershipPurchasesByUserIdHandler, updateMembershipPurchaseHandler, deleteMembershipPurchaseHandler
} = require('../handlers/membershipPurchaseHandler');

const { membershipMercadopaymentPreferenceHandler } = require('../handlers/createOrderMercadoPagoHandler')
const { receiveWebhookM } = require('../controllers/buyMembershipController')
const membershipPurchaseRouter = Router();

membershipPurchaseRouter.get('/', getMembershipPurchasesHandler);
membershipPurchaseRouter.get('/:id', getMembershipPurchaseByIdHandler);
membershipPurchaseRouter.get('/user/:user_id', getMembershipPurchasesByUserIdHandler);
membershipPurchaseRouter.post('/', createMembershipPurchaseHandler);
membershipPurchaseRouter.put('/update/:id', updateMembershipPurchaseHandler);
membershipPurchaseRouter.delete('/:id', deleteMembershipPurchaseHandler);

//purchase
membershipPurchaseRouter.post('/checkout', membershipMercadopaymentPreferenceHandler);
membershipPurchaseRouter.get("/go/success", (req, res) => {
    const urlDestino = 'http://localhost:5173/#/services'
    res.redirect(302, urlDestino);
});
membershipPurchaseRouter.get("/go/pending", (req, res) => res.json("pending"));
membershipPurchaseRouter.get("/go/failure", (req, res) => {
    const urlDestino = 'http://localhost:5173/#/services'
    res.redirect(302, urlDestino);
});
membershipPurchaseRouter.post("/webhook", receiveWebhookM)

module.exports = membershipPurchaseRouter;