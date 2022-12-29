const express = require("express")
const config = require("config")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)

const PORT = config.get("port") || 5000

app.use(express.json({ extended: true }))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/t", require("./routes/redirect.routes"))

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const start = async () => {
    try {
        const mongoUri = config.get("mongoUri")
        await mongoose.connect(mongoUri)
        app.listen(PORT, () => {
            console.log(`App has been started at port ${PORT}`)
        })
    } catch (e) {
        console.log("Error: ", e)
    }
}

start()

