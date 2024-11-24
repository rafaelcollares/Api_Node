import express from "express";
import multer from "multer";
import cors from "cors";
import { listAllPosts, newPost, uploadImage, atualizedNewPost } from "../controller/postController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
};
const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage})
const routes = (app) => {
    // Middleware que permite o Express processar requisições com corpo no formato JSON.
    app.use(express.json());
    app.use(cors(corsOptions))
    // Define uma rota GET para "/posts" que será responsável por retornar todos os posts.
    app.get("/posts", listAllPosts);
    // Rota para criar um post
    app.post("/posts", newPost);
    app.post("/upload", upload.single("imagem"), uploadImage);
    app.put("/upload/:id", atualizedNewPost)
}

export default routes;
