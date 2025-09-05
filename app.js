const taskInput = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const filterAll = document.getElementById('all');
const filterActive = document.getElementById('active');
const filterCompleted = document.getElementById('completed');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    let filteredTasks = tasks;
    if(filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if(filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">✓</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    taskCount.textContent = `Tasks: ${tasks.length}`;
}

function addTask() {
    const text = taskInput.value.trim();
    if(text === '') return;
    tasks.push({text, completed:false});
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => { if(e.key === 'Enter') addTask(); });

filterAll.addEventListener('click', () => renderTasks('all'));
filterActive.addEventListener('click', () => renderTasks('active'));
filterCompleted.addEventListener('click', () => renderTasks('completed'));

renderTasks();
