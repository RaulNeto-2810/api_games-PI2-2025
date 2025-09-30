// Middleware centralizado para tratamento de erros
const errorHandler = (err, req, res, next) => {
    console.error('🔴 Erro capturado:', err)

    // Erro de ID inválido do MongoDB/Mongoose
    if (err.name === 'CastError') {
        return res.status(400).json({
            erro: 'ID inválido',
            message: 'O ID fornecido não possui um formato válido',
            timestamp: new Date().toISOString()
        })
    }

    // Erro de validação do Mongoose
    if (err.name === 'ValidationError') {
        const errors = {}
        Object.keys(err.errors).forEach(key => {
            errors[key] = err.errors[key].message
        })

        return res.status(400).json({
            erro: 'Validação falhou',
            message: 'Os dados fornecidos não passaram na validação',
            detalhes: errors,
            timestamp: new Date().toISOString()
        })
    }

    // Erro de duplicação (ex: email já existe)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0]
        return res.status(409).json({
            erro: 'Recurso duplicado',
            message: `${field} já existe no sistema`,
            field: field,
            timestamp: new Date().toISOString()
        })
    }

    // Erro de JSON malformado
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            erro: 'JSON inválido',
            message: 'O corpo da requisição contém JSON malformado',
            timestamp: new Date().toISOString()
        })
    }

    // Erro interno do servidor (genérico)
    res.status(500).json({
        erro: 'Erro interno do servidor',
        message: 'Algo deu errado no servidor. Tente novamente mais tarde.',
        timestamp: new Date().toISOString()
    })
}

module.exports = errorHandler