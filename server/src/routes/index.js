const express = require("express");
const usersRouter = require("./usersRouter");
const instructorRouter = require("./instructorsRouter");
const feedBackRouter = require("./feedBackRouter");
const productsRouter = require("./productsRouter");
const categoryRouter = require("./categoryRoute");
const gymRoute = require("./gymRoute");
const purchaseRoute = require("./purchasesRoute");
const ShoppingCartRouter = require("./shoppingCartRouter");
const paymentRouter = require('./paymentRoute');
const clientInfoRouter = require("./clientInfoRouter");
const membershipsRouter = require("./membershipsRouter");
const router = express.Router();

// Definir rutas aquí:

router.use("/api/users", usersRouter);

router.use("/api/instructors", instructorRouter);

router.use("/api/feedbacks", feedBackRouter);

router.use("/api/products", productsRouter);

router.use("/api/categories", categoryRouter);

router.use("/api/purchases", purchaseRoute);

router.use("/api/gym", gymRoute);

router.use("/api/shoppingCart", ShoppingCartRouter);

router.use('/api/createorder', paymentRouter);

router.use('/api/clientInfo', clientInfoRouter);

router.use("/api/memberships", membershipsRouter);

module.exports = router;
