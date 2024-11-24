// Importa o framework Express para criar o servidor e gerenciar rotas
import express from "express"; 
import routes from "./src/config/routes/postRoutes.js";
// Cria uma aplicação Express para gerenciar o servidor
const app = express(); 
app.use(express.static("uploads"))
routes(app);
// Inicializa o servidor na porta 3000 e exibe uma mensagem de confirmação no console
app.listen(3000, () => {
  console.log("servidor rodando");
});
