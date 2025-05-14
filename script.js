document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // 从本地存储加载任务
    loadTasks();
    
    // 添加新任务
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });
    
    // 添加任务到列表
    function addTask(taskText) {
        const li = document.createElement('li');
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
        
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });
        
        taskList.appendChild(li);
    }
    
    // 保存任务到本地存储
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(li) {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // 从本地存储加载任务
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            const li = addTask(task.text);
            if (task.completed) {
                li.classList.add('completed');
            }
        });
    }
});