const Log = require('./logs_model')

const logs = {
	list: async (req, res)=>{
		const logs = await Log.find()
		res.status(200).send(logs)
	},
	getLog : async (req, res)=>{
		const { id } = req.params
		const log = await Log.findOne({ _id: id })
		if(log){
			res.status(200).send(log)
		} else{
			console.log('This element does not exist.')
		}
	},
	update: async (req, res)=>{
		const { id } = req.params
		const log = await Log.findOne({ _id : id })
		if(log){
			console.log(req.body)
			savedLog = Object.assign(log, req.body)
			await savedLog.save()
			res.send(savedLog)		
		}
	},
	destroy: async (req, res)=>{
		const { id } = req.params
		const log = await Log.findOne({ _id: id })
		if(log){
			await log.remove()
			res.sendStatus(204)	
		}
	},
	create: async (req, res)=>{
		const log = new Log(req.body) // { title: Sting (min 3), state: true/false }
		await log.save()
		res.sendStatus(201)
	}
}

module.exports = logs
