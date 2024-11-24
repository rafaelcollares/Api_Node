import {getAllPosts, createPost, atualizedPost} from "../models/postsModel.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/gemini.js"
export async function listAllPosts(req, res) {
  // Chama a função `getAllPosts` para buscar todos os posts do banco de dados.
  const posts = await getAllPosts();
  // Retorna os posts como uma resposta JSON com o status HTTP 200 (indica sucesso).
  res.status(200).json(posts);
  };
  
export async function newPost(req,res) {
  const postNew = req.body;
  try{
    const postCreated = await createPost(postNew);
    res.status(200).json(postCreated)
  } catch(erro){
    console.error(erro.message)
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function uploadImage(req,res) {
  const postNew = {
    descricao:"",
    imgUrl: req.file.originalname,
    alt:""
  };
  try{
    const postCreated = await createPost(postNew);
    const atualizedImage = `uploads/${postCreated.insertedId}.png`
    fs.renameSync(req.file.path, atualizedImage)
    res.status(200).json(postCreated)
  } catch(erro){
    console.error(erro.message)
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function atualizedNewPost(req,res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;
  
  try{
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini (imgBuffer)
    const post = {
      imgUrl: urlImage,
      descricao: descricao,
      alt: req.body.alt
    }
    const postCreated = await atualizedPost(id, post);
    res.status(200).json(postCreated)
    
  } catch(erro){
    console.error(erro.message)
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}