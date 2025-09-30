const fs = require('fs')
const path = require('path')

// Middleware para registrar (log) cada requisição
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString()
    const method = req.method
    const url = req.url
    const ip = req.ip || req.connection.remoteAddress
    const userAgent = req.get('User-Agent') || 'Unknown'

    // Criar a mensagem de log
    const logMessage = `[${timestamp}] ${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}\n`

    // Salvar no console
    console.log(`📝 ${logMessage.trim()}`)

    // Salvar em arquivo (opcional)
    const logDir = path.join(__dirname, '../logs')
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true })
    }

    const logFile = path.join(logDir, 'requests.log')
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) {
            console.error('Erro ao salvar log:', err)
        }
    })

    next()
}

module.exports = loggerMiddleware