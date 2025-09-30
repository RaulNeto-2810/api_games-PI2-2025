const mongoose = require('mongoose')

async function connectDB() {
    const uri = process.env.MONGODB_URI
    if (!uri){
        console.error('MONGODB_URI não está definido.')
        process.exit(1)
    }

    mongoose.set('strictQuery', true)

    try{
        await mongoose.connect(uri)
        console.log('Conexão com o MongoDB estabelecida com sucesso!')
    } catch (error) {
        console.error(`Erro ao conectar ao MongoDB: ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB