
// localStorage.clear()
let modal = document.querySelector('.modal')
let inputList = document.getElementById('1')
let inputTask = document.getElementById('2')
let inputNew = document.getElementById('3')
let btn = document.querySelector('.btn')
let btnAdd = document.querySelector('.btn-add')
let addList = document.querySelector('.add_list')
// let newParagraph = document.getElementById('new-paragraph')
let card = document.querySelector('.card')
let task = document.querySelector('.task')
let menu = document.querySelectorAll('.menu__item')
let addParagraph = document.getElementById('add-paragraph')


card.addEventListener('click', (e) => {
	e.stopPropagation()
})

let data;
// если хранилище пустое создаем пустой массив
!!JSON.parse(localStorage.getItem('data'))
?
data = JSON.parse(localStorage.getItem('data'))
:
data = []

//Открываем модальное окно 
addList.addEventListener('click', () => {
	modal.style.display = 'block'
})
//Закрываем модалку
modal.addEventListener('click', (e) => {
	e.preventDefault()
	e.stopPropagation()
	modal.style.display = 'none'
})
//создаем новый лист и задачу
btn.addEventListener('click', (e) => {
	e.preventDefault()
	e.stopPropagation()
	if(inputList.style.display !== 'none'){
		if(inputList.value === '' || inputTask.value === '') return

		let list = {
			id: Date.now(),
			title: inputList.value,
			tasks: [
				{
				taskId: Date.now() + 1,
				task: inputTask.value, 
				done: false
				},
			]  	
		}
		console.log(data, 'rrrr');
		data.push(list)
		localStorage.setItem('data', JSON.stringify(data))
		inputList.value = ''
		inputTask.value = ''
	}else{
		if(inputTask.value === '') return
		console.log(data, 'rrrr');
		let tas = {
			taskId: Date.now(),
			task: inputTask.value, 
			done: false
		}
		data = data.map((el, i) => ({
				...el,
				tasks: [...el.tasks, tas]
		}))
		inputList.style.display = 'block'
		localStorage.setItem('data', JSON.stringify(data))
	}
	inputTask.value = ''
	
	modal.style.display = 'none'
	location.reload()
})
console.log(data);

// отрисовываем список
function renderingList(data) {
	if(!data.length) return
	let stringAll = ''
	for(let i = 0; i < data.length; i++){
		let string = ''
		for(let j = 0; j< data[i].tasks.length; j++){
			string += `
			<div class="affairs">
				<div onclick="doneClick(${i}, ${data[i].tasks[j].id}, ${j})" class="check ${data[i].tasks[j].done ? 'check-activ' : ''}"></div>
				<div class="text ${data[i].tasks[j].done ? 'text-activ' : ''}">${data[i].tasks[j].task}</div>
				<img onclick="deleteTask(${data[i].id}, ${data[i].tasks[j].taskId}, ${data[i].tasks.length}, ${i})" src="image/Vector(1).svg" alt="none">
			</div>
			`
		}
		let stringCode = `
			<div class="task__list">
				<div class="list-title">
					<div class="title">${data[i].title}</div>
					<div class="edit-delete">
						<img class='edit' src="image/Vector.svg" alt="none">
						<p class='delete-list' onclick="deleteList(${data[i].id})">Удалить лист</p>
					</div>
				</div>
				${string}
				<div class="new-paragraph" id="new-paragraph">
					<input class="paragraph" type="text" placeholder='Введите задачу' id="3"/>
					<button onclick="addTask(${i})" class='btn-add'>OK</button>
				</div>
				<div onclick="openWind(${i})" class="add-paragraph" id="add-paragraph">
				+ добавить задачу
				</div>
			</div>
			`	
		stringAll += stringCode	
	}
	task.innerHTML = stringAll;
}
renderingList(data)

// Удаление листа
function deleteList(id){
	data = data.filter((el) => el.id !== id)
	localStorage.setItem('data', JSON.stringify(data))
	location.reload()
}
// удаление задачи
function deleteTask(listId, Id, lengthTasks, index){
	if(lengthTasks <= 1){
		deleteList(listId)
	}else{
		data = data.map((el) => ({
			...el,
			tasks: el.tasks.filter((item) => item.taskId !== Id)
		}));
		localStorage.setItem('data', JSON.stringify(data))
		location.reload()
	}
}
// Задача выполнена
function doneClick(i, taskId, index){
	data = data.map((el, inx) => {
		if(i === inx){
			return ({
			...el,
			// tasks: el.tasks,
			done: el.tasks[index].done = true
			})	
		}else {
			return el
		}
	})
	localStorage.setItem('data', JSON.stringify(data))
	location.reload()
}
let newParagraph = document.querySelectorAll('.new-paragraph')
// Открываем модалку для добавления задачи
function openWind(index){
	modal.style.display = 'block'
	inputList.style.display = 'none'
}
	
//меню-сортирока
function menuSort() {
	// let dataList = data
	menu.forEach((el) => {
		el.addEventListener('click', (e) => {
			menu.forEach(item => item.classList.remove('activ'))
			el.classList.add('activ')
			if(e.target.innerHTML === 'Все задачи'){
				renderingList(data)
			}
			if(e.target.innerHTML === 'Активные'){
				let activ = data.map((el) => ({
					...el,
					tasks: el.tasks.filter((i) => i.done === false)
				}))
				console.log('Активные');
				renderingList(activ)
			}
			if(e.target.innerHTML === 'Выполненные'){
				let completed = data.map((el) => ({
					...el,
					tasks: el.tasks.filter((i) => i.done === true)
				}))
				console.log('Выполненные');
				renderingList(completed)
			}
		})
	})
}
 menuSort()
	






	

