import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

express.request(cors({
    origin: process.env.CORS.ORIGIN,
    credentials: true
}
))

app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({extended}))
app.use(express.static("public"))
app.use(cookieParser())
export {app}