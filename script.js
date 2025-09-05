const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const filterBtns = document.querySelectorAll('.filter-btn');
const toggleThemeBtn = document.getElementById('toggle-theme');

let tasks = [];
let currentFilter = 'all';

// Add task
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) return;
    const task = { id: Date.now(), text, completed: false };
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    const filtered = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
    });

    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) li.classList.add('completed');
        li.dataset.id = task.id;

        const span = document.createElement('span');
        span.textContent = task.text;

        const btns = document.createElement('div');
        btns.className = 'task-buttons';

        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn';
        checkBtn.textContent = '✓';
        checkBtn.onclick = () => { task.completed = !task.completed; renderTasks(); };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = () => { tasks = tasks.filter(t => t.id !== task.id); renderTasks(); };

        btns.appendChild(checkBtn);
        btns.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(btns);
        taskList.appendChild(li);
    });

    taskCount.textContent = `Tasks: ${tasks.length}`;
}

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Drag & Drop
new Sortable(taskList, {
    animation: 150,
    onEnd: function(evt) {
        const item = tasks.splice(evt.oldIndex, 1)[0];
        tasks.splice(evt.newIndex, 0, item);
        renderTasks();
    }
});

// Dark/Light toggle
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

renderTasks();
