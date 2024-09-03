import mercadopago from 'mercadopago';
import Request, { response } from 'express';
import { HOST, MERCADOPAGO_API_KEY } from '../config.js';

export const createOrder = async (req, res) => {

  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY
  })


  try {
    // al moimento de crear la orden podemos modificar las cuotas tbn
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "MacBook Air",
          unit_price: 500,
          currency_id: "ARS",
          quantity: 1
        }
      ],

      // cuando el pago haya terminado
      // notification_url: "http://localhost:3000/webhook", // al enviar  una peticion POST espera un servidor https, usaremos ngrok para probar esto sin desplegar
      // ngrok crea un tunel http, nos da un dominio ssl y este redirecciona a nuestro localhost, tendremos esntonces un https gracias a esta redireccion
      notification_url: "https://2d93-190-245-198-113.ngrok-free.app/webhook", // ver que me da ngrok.exe

      // para decir a donde retornamos la respuesta, cuando es exitosa, cuando esta pendiente y cuando fallo
      back_urls: {
        // success: "http://localhost:3000/success",
        // failure: "http://localhost:3000/failure",
        // pending: "http://localhost:3000/pending"
        success: `${HOST}/success`,
        // failure: `${HOST}/failure`,
        // pending: `${HOST}/pending`
      },



    })

    console.log(result)

    // el "init_point" del body de la respuesta es la url de pago


    // res.send('Creating Order')
    res.send(result.body)

  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}


export const recieveWebhook = async (req = Request, res = response) => {

  console.log(req.query) // veo el body ya que al redireccionar mercado pago manda cosas
  // esto me devuleve el id del pago y un topic, y despues me devuelve data.id y type

  // recibo los datos del webhook

  try {
    const payment = req.query

    // (envia varias peticiones por eso colocamos el condicional)
    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment["data.id"])
      console.log(data)

      // guardar en base de datos
    }

    res.sendStatus(204)

  } catch (error) {

    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });

  }
}