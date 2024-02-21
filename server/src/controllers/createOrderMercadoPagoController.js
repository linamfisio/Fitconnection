
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: 'TEST-1859931302050422-020618-3e65e9f762aa1817900eed462e03d36b-1666488094' });
const preference = new Preference(client);
const { postPurchasesFunction } = require('../controllers/purchasesController')
const mercadoPaymentPreferences = async (shoppingCard, userId) => {
    try {
        const itemsArray = shoppingCard.map((producto, index) => {
            return {
                id: index + 1, 
                title: producto.name,
                quantity: producto.quantity,
                category_id: producto.category_id,
                description: producto.description,
                picture_url: producto.image_url,
                unit_price: Math.round(producto.price)
            };
        });
        const createPayment = await preference.create({
            body: {
                //auto_return: "approved",
                items: itemsArray,
                back_urls: {
                    failure: "http://localhost:3001/api/createorder/failure", //hay que modificar dicha ruta
                    pending: "http://localhost:3001/api/createorder/pending",
                    success: "http://localhost:3001/api/createorder/success",
                },
                metadata: {
                    clientId:userId
                },
                //CAMBIAR EL "https://28f4-201-188-190-30.ngrok-free.app" POR EL URL DE LA API 
                //USAR LOS USERS DE PRUEBA 
                //Para pruebas en mi pc Use NGROK para dar a la local https!! y generar dicho enlace de abajo!! 
                notification_url: "https://b9fb-201-188-178-81.ngrok-free.app/api/createorder/webhook"
            },
            requestOptions: { idempotencyKey: 'eac7b2f362c87d105f7333c43787aad175783fd37b57632aa90cdb425e6b5856' }
            // Elimina la línea user_id y pasa userId directamente como parte de las opciones del cuerpo
        });
        return createPayment;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};

const receiveWebhook = async (req, res) => {
    const { data, type } = req.body
    try {
        if(type === "payment"){
            const payment = await new Payment(client).get({id:data.id})
            const { status, payment_type_id, date_approved, metadata } = payment
            const {client_id} = metadata
            const response = postPurchasesFunction(payment_type_id, date_approved, status, client_id)
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
}
module.exports = {
    mercadoPaymentPreferences,
    receiveWebhook

}