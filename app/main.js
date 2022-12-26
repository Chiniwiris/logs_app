const loadInitialTemplate = () =>{
	const template = `
	<form id="logs-form" action="#">
		<h2>New logs</h2>
		<div>
			<label for="title">Title</label>
			<input type="text" name="title" id="title">
		</div>
		<div>
			<select name="state" id="status" required>
				<option required value="">Select a state</option>
				<option value="true">Clear</option>
				<option value="false">unclear</option>
			</select>
		</div>
		<button>Add new</button>
	</form>


	<ul id="logs-list"></ul>	
	`
	const $body = document.getElementsByTagName('body')[0]
	$body.innerHTML = template
}

const changeLog = async (state, id) =>{
	const result = await fetch(`http://localhost:3000/logs/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ state }),
		headers: { 'Content-Type' : 'application/json'},
	})
	return result
}

const render = async () =>{
	console.log('reder():: started')
	const $logsList = document.getElementById('logs-list')
	$logsList.innerHTML = ''
	fetch('http://localhost:3000/logs/list/')
		.then(data => data.json())
		.then(logs =>{

			const documentFragment = document.createDocumentFragment()
			for(let i = 0; i < logs.length; i++){
				console.log(logs[i])

				const li = document.createElement('li')
				const form = document.createElement('form')
				const liTitle = document.createElement('p')
				const select = document.createElement('select')
				const clearOp = document.createElement('option')
				const unclearOp = document.createElement('option')
				const changeBtn = document.createElement('button')
				const deleteBtn = document.createElement('button')

				//setting content
				liTitle.textContent = logs[i].title
				clearOp.textContent = 'Clear'
				clearOp.setAttribute('value', 'true')

				unclearOp.textContent = 'Unclear'
				unclearOp.setAttribute('value', 'false')

				changeBtn.textContent = 'Change'
				deleteBtn.textContent = 'Delete'
				
				if(logs[i].state == 'true'){
					clearOp.setAttribute('selected', '')
				} else if (logs[i].state == 'false'){
					unclearOp.setAttribute('selected', '')
				}

				li.appendChild(form)
				form.appendChild(liTitle)
				form.appendChild(select)
				select.appendChild(clearOp)
				select.appendChild(unclearOp)
				form.appendChild(changeBtn)
				form.appendChild(deleteBtn)

				//event listeners
				//#1: Chage logs states:
				changeBtn.onclick = e =>{
					e.preventDefault()
					if(select.value == 'true'){
						changeLog(true, logs[i]._id)	
					} else if (select.value == 'false'){
						changeLog(false, logs[i]._id)
					} 
				}	

				//#2: Delete logs:
				deleteBtn.onclick = async (e) =>{
					e.preventDefault()
					respose = await fetch(`http://localhost:3000/logs/${logs[i]._id}`, {
						method: 'DELETE'
					})
					li.parentNode.removeChild(li)
				} 

				documentFragment.appendChild(li)
			}
			$logsList.appendChild(documentFragment)
		})

}

const formDynamic = () =>{
	const $logsForm = document.getElementById('logs-form')
	console.log($logsForm)
	$logsForm.onsubmit = async e =>{
		e.preventDefault()
		const formData = new FormData($logsForm)
		const data = JSON.stringify(Object.fromEntries(formData.entries())) 
		const response = await fetch('http://localhost:3000/logs/',{
			method: 'POST',
			body: data,
			headers: { 'Content-Type' : 'application/json' }
		})
		$logsForm.reset()
		render()
	}
}

window.onload = ()=>{
	loadInitialTemplate()
	render()
	formDynamic()
}


