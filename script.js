class Todo {
    constructor(title, description, dueDate, priority, num) {
            this.title = title
            this.description = description
            this.dueDate = dueDate
            this.priority = priority
            this.num = num
    }
    createTodoBox() {
        let todoBox = document.createElement('div')
        todoBox.classList.add('todoBox')
        let titleText = document.createElement('p')
        titleText.classList.add('title')
        titleText.textContent = this.title
        let descText = document.createElement('p')
        descText.textContent = this.description



        let delBtn = document.createElement('button')
        delBtn.addEventListener('click', () => {
            todoBox.remove()
        })
        delBtn.textContent = 'remove'

        todoBox.append(titleText, descText, delBtn)

        let container = document.getElementById('project')
        container.append(todoBox)
    }
}

todoList = []
num = 0
num = (JSON.parse(localStorage.getItem(num)))

if (localStorage.length !== 0) {
    createTodo(JSON.parse(localStorage.getItem('todo')))
}

createTodo()

function populateStorage(todo) {
    localStorage.setItem('todos', todo.outerHTML)
}

function createTodo() {
    let createButton = document.getElementById('createTodo')
    let project = document.getElementById('project')

    createButton.addEventListener('click', () => {
        createButton.disabled = true
        let detailForm = document.createElement('form')
        detailForm.setAttribute('method', 'post')
        detailForm.setAttribute('action', '/script.js')

        let labelTitle = document.createElement('label')
        labelTitle.htmlFor = 'title'
        labelTitle.textContent = 'Title'

        let inputTitle = document.createElement('input')
        inputTitle.type = 'text'
        inputTitle.name = 'todo_title'
        inputTitle.id = 'title'

        let labelDesc = document.createElement('label')
        labelDesc.htmlFor = 'description'
        labelDesc.textContent= 'description'

        let inputDesc = document.createElement('input')
        inputDesc.type = 'text'
        inputDesc.name = 'todo_description'
        inputDesc.id = 'description'

        let labelDate = document.createElement('label')
        labelDate.htmlFor = 'date'
        labelDate.textContent = 'date'

        let inputDate = document.createElement('input')
        inputDate.type = 'date'
        inputDate.name = 'todo_date'
        inputDate.id = 'date'

        let inputPriority = document.createElement('select')
        lowPrio = document.createElement('option')
        lowPrio.value = 'Low'
        inputPriority.append(lowPrio)
        lowPrio.innerHTML = 'Low'
        MedPrio = document.createElement('option')
        MedPrio.value = 'Medium'
        MedPrio.innerHTML = 'Medium'
        inputPriority.append(MedPrio)
        highPrio = document.createElement('option')
        highPrio.value = 'High'
        highPrio.innerHTML = 'High'
        inputPriority.append(highPrio)

        let submitBtn = document.createElement('button')
        submitBtn.type = 'submit'
        submitBtn.textContent = 'submit'
        
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault()

            let todo = new Todo(inputTitle.value, inputDesc.value, inputDate.value, inputPriority.value, num)
            localStorage.setItem('todo'+ num, JSON.stringify(todo));
            localStorage.setItem(num, num)
            todo.createTodoBox()
            num++

            todoList.push(todo)
            console.log(todoList)
            detailForm.remove()
            createButton.disabled = false
        })

        detailForm.append(labelTitle, inputTitle, labelDesc, inputDesc, labelDate, inputDate, inputPriority, submitBtn)
        project.append(detailForm)
    })
}
