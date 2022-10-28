const express = require('express')
const app = express()

const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

app.use(cors({ origin: '*' }))
app.use(express.json())

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: 1,
        },
    },
    { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

app.get('/messages', async (req, res) => {
    const messages = await Message.find()
    res.send(messages)
})

app.post('/message', async (req, res) => {
    console.log(req.body)
    const message = await Message.create(req.body)
    res.send(message)
})

app.listen(3000, async () => {
    console.log('listening on port 3000')
    await mongoose.connect(process.env.MONGODB_URL)
})
