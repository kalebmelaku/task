const inputValue = document.getElementById('task');
const taskForm = document.querySelector('.form');
const ul = document.querySelector('.collection');
const clearBtn = document.querySelector('.btn-dark');

taskForm.addEventListener('submit', addTask);
ul.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
document.addEventListener('DOMContentLoaded', showTask);

function addTask(e) {
    if (inputValue.value !== '') {
        const li = document.createElement('li');
        const link = document.createElement('a');

        li.classList.add('collection-item');
        link.classList.add('delete-item');

        li.appendChild(document.createTextNode(inputValue.value));
        link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        li.appendChild(link);

        ul.appendChild(li);

        let tasks;
        if (localStorage.getItem('task') == null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('task'));
        }
        tasks.push(inputValue.value);
        localStorage.setItem('task', JSON.stringify(tasks));

        inputValue.value = '';
    } else {
        alert('Please enter a value');
    }

    e.preventDefault();
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        let tasks;
        if (localStorage.getItem('task') == null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('task'));
        }
        tasks.forEach(function (task, index) {
            console.log(task);
            if (e.target.parentElement.parentElement.textContent === task) {
                tasks.splice(index, 1)
            }
            localStorage.setItem('task', JSON.stringify(tasks))
        })

        e.target.parentElement.parentElement.remove();
    }
}

function clearTask() {
    ul.innerHTML = '';
    localStorage.clear()
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem('task'))
    tasks.forEach(function (task) { 
        const li = document.createElement('li');
        const link = document.createElement('a');

        li.classList.add('collection-item');
        link.classList.add('delete-item');

        li.appendChild(document.createTextNode(task));
        link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        li.appendChild(link);

        ul.appendChild(li);
    })
}