// Middleware para validação de dados
const validateGameData = (req, res, next) => {
    const { titulo, genero, plataforma, lancamento } = req.body

    // Lista de erros de validação
    const errors = []

    // Validar título
    if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
        errors.push('Título é obrigatório e deve ser uma string não vazia')
    }

    // Validar gênero
    if (!genero || typeof genero !== 'string' || genero.trim().length === 0) {
        errors.push('Gênero é obrigatório e deve ser uma string não vazia')
    }

    // Validar plataforma
    if (!plataforma || typeof plataforma !== 'string' || plataforma.trim().length === 0) {
        errors.push('Plataforma é obrigatória e deve ser uma string não vazia')
    }

    // Validar lançamento
    if (lancamento === undefined || lancamento === null) {
        errors.push('Lançamento é obrigatório')
    } else if (typeof lancamento !== 'number' || isNaN(lancamento)) {
        errors.push('Lançamento deve ser um número válido')
    }

    // Se há erros, retornar erro 400
    if (errors.length > 0) {
        return res.status(400).json({
            erro: 'Dados inválidos',
            message: 'Os dados fornecidos não passaram na validação',
            detalhes: errors,
            timestamp: new Date().toISOString()
        })
    }

    // Se tudo está ok, continuar para o próximo middleware
    next()
}// Middleware para validação de ID nos parâmetros da URL
const validateObjectId = (req, res, next) => {
    const { id } = req.params

    // Regex para validar ObjectId do MongoDB
    const objectIdRegex = /^[0-9a-fA-F]{24}$/

    if (!objectIdRegex.test(id)) {
        return res.status(400).json({
            erro: 'ID inválido',
            message: 'O ID fornecido não possui o formato correto',
            timestamp: new Date().toISOString()
        })
    }

    next()
}

module.exports = {
    validateGameData,
    validateObjectId
}