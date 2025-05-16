const {GoogleGenerativeAI} = require('@google/generative-ai')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
    apiVersion: 'v1'
})

app.get('/frase-xiangling', async (req, res) => {
    const prompt = "Fale como se fosse a personagem Xiangling do jogo Genshin Impact atendendo a um restaurante. Use até 30 palavras."
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" })
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text().trim()
        res.json({frase: text})
    } catch (error){
        console.error(error)
        res.status(500).json({ erro: 'Erro ao gerar frase.'})
    }
})

const server = app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})

module.exports = server;