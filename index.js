const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()


app.use(morgan("dev"))
//Tell express we want to use the cors library
app.use(cors())

app.get("/", (req, res) => {
    console.log("got request!")
    const random = Math.ceil(Math.random()*100)
    if (random > 50) res.send("Hello!");
    else res.json({msg: 'hello!'})
   })

//Start up our server
const port = 3030
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}/`)
})

let counters = {}

app.get("/:type/counter", (req, res) => {
    if (!counters.hasOwnProperty(req.params.type)) counters[req.params.type] = 0
    res.send(`${counters[req.params.type] }`)
    })

app.post("/:type/counter/increment", (req, res) => {
    counters[req.params.type]++
    res.send(`${counters[req.params.type]}`)
    })

app.post("/:type/counter/decrement", (req, res) => {
    counters[req.params.type]--
    res.send(`${counters[req.params.type]}`)
    })

app.post("/:type/counter/double", (req, res) => {
    counters[req.params.type]*=2
    res.send(`${counters[req.params.type]}`)
    })
    

app.delete("/:type/counter", (req, res) => {
    counters[req.params.type] = 0
    res.send(`${counters[req.params.type]}`)
    })

app.put("/:type/counter", (req, res) => {
    if (req.query.value) counters[req.params.type] = req.query.value;
    res.send(`${counters[req.params.type]}`)
    })