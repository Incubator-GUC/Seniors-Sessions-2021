const express = require('express')
const app = express()

app.use(express.json())

app.get('/', function (req, res) {
    return res.send("Hello World12345")
})
app.get('/posts', (req, res) => {
    res.json({ user: "mohamed", date: Date.now() })
})
app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username === "mm") {
        //check password
        res.status(200).json({ message: 'Login successfully' })
    } else {
        res.status(401).json({ error: 'Invalid username' })

    }
})
app.put('/', (req, res) => {

})
app.delete('/', (req, res) => {

})

app.listen(4000, () => {
    console.log('Running on port 4000')
})