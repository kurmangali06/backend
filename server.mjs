import express from "express"

import multer from "multer"
import cors from "cors"

import  mongoose  from "mongoose";
import { getMe, login, register } from "./contrilles/UserController.mjs";
import {  create, getAll, getOne, remove, update } from "./contrilles/PostController.mjs";

import  checkAuth  from "./utlis/checkAuth.mjs"
import { registerValidator, loginValidator, postCreateValidator } from "./validations.mjs";
import handleValidationErrors from "./utlis/handleValidationErrors.mjs";
// process.env.MONGODB_URL

mongoose.connect('mongodb+srv://admin:admin@cluster0.c2web.mongodb.net/?retryWrites=true&w=majority').then(()=> {
  console.log("mongodb ok!")
}).catch((err)=> console.log("mongodb error", err))

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename:(req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage})

const app = express();

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login',  loginValidator, handleValidationErrors, login )
app.post('/auth/register',  registerValidator, handleValidationErrors, register );
app.get('/auth/me', checkAuth, getMe )

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  });
});

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidator, handleValidationErrors,  create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id',checkAuth, postCreateValidator, handleValidationErrors, update);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log("err", err);
  }

  console.log("Server ok!");
})