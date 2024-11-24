import "dotenv/config";
import { ObjectId } from "mongodb";
import ConectarBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida pelas variáveis de ambiente
const conection = await ConectarBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export  async function getAllPosts() {
  // Acessa o banco de dados "instabites"
  const db = conection.db("instabites");
  // Acessa a coleção "posts"
  const colecao = db.collection("posts");
  // Retorna todos os documentos da coleção como um array
  return colecao.find().toArray();
}

export async function createPost(newPost) {
  const db = conection.db("instabites");
  const colecao = db.collection("posts");
  return colecao.insertOne(newPost);
}

export async function atualizedPost(id, newPost) {
  const db = conection.db("instabites");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:newPost});
}
