const express = require('express')
const Game = require('../models/Game')
const { validateGameData, validateObjectId } = require('../middlewares/validation')

const router = express.Router();

//POST - Criar um novo game
router.post('/', validateGameData, async (req, res, next) => {
    try {
        const game = await Game.create(req.body)
        return res.status(201).json({
            message: 'Game criado com sucesso',
            data: game,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        next(error)
    }
});

//GET (lista registro)
router.get('/', async (req, res, next) => {
    try {
        const { titulo, genero, plataforma } = req.query
        const filtro = {}

        // Filtros opcionais
        if (titulo) {
            filtro.titulo = new RegExp(titulo, "i") // Busca case-insensitive
        }
        if (genero) {
            filtro.genero = new RegExp(genero, "i")
        }
        if (plataforma) {
            filtro.plataforma = new RegExp(plataforma, "i")
        }

        const games = await Game.find(filtro).sort({ _id: -1 })
        return res.json({
            message: 'Games encontrados',
            count: games.length,
            data: games,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        next(error)
    }
})

//GET (unico registro)
router.get('/:id', validateObjectId, async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id)
        if (!game) {
            return res.status(404).json({
                erro: 'Game não encontrado',
                message: 'Nenhum game foi encontrado com o ID fornecido',
                timestamp: new Date().toISOString()
            })
        }
        return res.json({
            message: 'Game encontrado',
            data: game,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        next(error)
    }
})

//UPDATE
router.put('/:id', validateObjectId, validateGameData, async (req, res, next) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!game) {
            return res.status(404).json({
                erro: 'Game não encontrado',
                message: 'Nenhum game foi encontrado com o ID fornecido para atualização',
                timestamp: new Date().toISOString()
            })
        }
        return res.json({
            message: 'Game atualizado com sucesso',
            data: game,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        next(error)
    }
})

//DELETE
router.delete('/:id', validateObjectId, async (req, res, next) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id)
        if (!game) {
            return res.status(404).json({
                erro: 'Game não encontrado',
                message: 'Nenhum game foi encontrado com o ID fornecido para exclusão',
                timestamp: new Date().toISOString()
            })
        }
        return res.status(200).json({
            message: 'Game excluído com sucesso',
            data: game,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router 