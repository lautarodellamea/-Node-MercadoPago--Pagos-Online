import { Router } from "express";
import { createOrder, recieveWebhook } from "../controllers/payment.controller.js";

const router = Router();

// un usuario va a pagar: genera la cuenta (como si el mozo me la dara)
router.post('/create-order', createOrder)

// escucha por eventos que llegan desde mercado pago, "el usuario esta pagando", "ya pago""
router.post('/webhook', recieveWebhook)

// cuando el usuario ya pago, con exito
router.get('/success', (req, res) => res.send('Success'))

// transaccion fallida
// router.get('/failure', (req, res) => {
//   res.send('Failure')
// })

// transaccion pendiente
// router.get('/pending', (req, res) => {
//   res.send('Pending')
// })



export default router