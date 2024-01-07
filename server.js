const PORT= 8000

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())


const OPENAI_API_KEY = "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"

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${OPENAI_API_KEY}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
    }
    
})

app.listen(PORT, () => console.log('YOUR SERVER IS RUNNING ON PORT ' + PORT))
