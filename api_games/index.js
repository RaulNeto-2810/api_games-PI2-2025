const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./db')
const gameRouters = require('./routes/game.routes')
const loggerMiddleware = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

const port = 3000

// Configurar dotenv antes de usar as variáveis de ambiente
dotenv.config()

// Middlewares globais
app.use(cors()) // Permitir requisições de diferentes origens
app.use(express.json({ limit: '10mb' })) // Parse JSON com limite
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded
app.use(loggerMiddleware) // Log de todas as requisições

// Conectar ao banco de dados
connectDB()

app.get('/', (req, res) => {
    res.send('Bem Vindo ao Game')
})

//Rotas
app.use('/games', gameRouters)

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        message: `A rota ${req.method} ${req.originalUrl} não existe`,
        timestamp: new Date().toISOString()
    })
})

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
