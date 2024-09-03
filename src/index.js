import express from 'express';
import morgan from 'morgan';
import path from 'path'; // para indicar donde esta la carpeta public

import { PORT } from "./config.js"
import paymentRoutes from "./routes/payment.routes.js"

const app = express();

app.use(morgan('dev'));

app.use(paymentRoutes)

// el path.resolve, se ubica en la raiz del proyecto (fuera de la carpeta src)
// app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve("src/public")));

app.listen(PORT, () => console.log(`Server running on port 3000 "http://localhost:${PORT}"`));