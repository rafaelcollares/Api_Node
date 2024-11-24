import { MongoClient } from 'mongodb';

export default async function ConectarBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao cluster do banco de dados...");
        await mongoClient.connect();
        console.log("Conectado ao Mongo DB com sucesso!");

        return mongoClient;
    } catch (erro) {
        console.error("Falha na conexão com o banco:", erro);
        process.exit(1); // Indica erro ao encerrar o processo
    }
}
