import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from "./routes/todoRoutes.js";
import path from 'path'
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import cors from 'cors';
import methodOverride from 'method-override';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log('연결 잘 됐어 !');
        app.listen(PORT, () => {
            console.log(`연결 잘 됐어요. http://localhost:${PORT}`);
        })
    })
    .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(cors());
app.use(expressLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

app.use("/todos", router);
