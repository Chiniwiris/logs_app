const express = require('express')
const mongoose = require('mongoose')

const port = 3000
const app = express()

const logs = require('./logs_controller')

app.use(express.json())
app.use(express.static('app'))


mongoose.connect('mongodb+srv://chiniwiris:happyboy@shiningstar.yoyx2pm.mongodb.net/logs_app?retryWrites=true&w=majority')

app.post('/logs/', logs.create)
app.get('/logs/list', logs.list)
app.put('/logs/:id', logs.update)
app.delete('/logs/:id', logs.destroy)
app.get('/logs/find/:id', logs.getLog)

app.listen(port, ()=>{
	console.log('Logs_app started!')
})

app.get('/', (req, res)=>{
	res.sendFile(`${__dirname}/index.html`)
})

app.get('*', (req, res)=>{
	res.status(404).send('This page does not exist.  :(')
})
