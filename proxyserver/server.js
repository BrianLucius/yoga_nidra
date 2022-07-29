const express = require('express')
const app = express()
const fetch = require("node-fetch")
// import fetch from 'node-fetch';
const cors = require('cors')

app.use(cors())

app.get("/", async (req, res) => {
    const response = await fetch("https://zenquotes.io/api/random/")
    res.json(await response.json())
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})