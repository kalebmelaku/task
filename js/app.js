const taskInput = document.querySelector('#task'); //input field
const taskForm = document.querySelector('.form'); //the form element
const ul = document.querySelector('.collection'); //ul for result
const clearTask = document.querySelector('.btn-dark');
const filterTask = document.querySelector('#filter');

document.addEventListener('DOMContentLoaded', function (e) { 
    let tasks = JSON.parse(localStorage.getItem('task'))
    console.log(tasks);
    tasks.forEach(function (task) { 
        const li = document.createElement('li');
        const link = document.createElement('a');

        li.classList.add('collection-item');
        link.classList.add('delete-item');

        li.appendChild(document.createTextNode(task));
        link.innerHTML = '<i class="fa fa-angle-right"></i>';

        li.appendChild(link);
        ul.appendChild(li);

    })
})


// loadEventListeners();
// function loadEventListeners(){
taskForm.addEventListener('submit', addTask);
ul.addEventListener('click', removeTask);
clearTask.addEventListener('click', clearTasks);
// filterTask.addEventListener('keyup', filterTasks);
// }
function addTask(e) {
    if (taskInput.value != '') {
        const li = document.createElement('li');
        const link = document.createElement('a');

        li.classList.add('collection-item');
        link.classList.add('delete-item');

        li.appendChild(document.createTextNode(taskInput.value));
        link.innerHTML = '<i class="fa fa-angle-right"></i>';

        li.appendChild(link);
        ul.appendChild(li);

        // localStorage.setItem('task', taskInput.value);
        let tasks;
        if (localStorage.getItem('task') === null) {
            tasks = []
        } else {
            tasks = JSON.parse(localStorage.getItem('task'))
        }

        tasks.push(taskInput.value);

        localStorage.setItem('task', JSON.stringify(tasks))



        taskInput.value = '';

    }

    e.preventDefault();
}
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        let tasks;
        if (localStorage.getItem('task') === null) {
            tasks = []
        } else {
            tasks = JSON.parse(localStorage.getItem('task'))
        }
        
        
        tasks.forEach(function (task, index) {
            console.log(e.target.parentElement.parentElement.textContent)
            if (e.target.parentElement.parentElement.textContent === task) {
                tasks.splice(index, 1);
            }
        })
        localStorage.setItem('task', JSON.stringify(tasks))

        e.target.parentElement.parentElement.remove();
    } 
}
function clearTasks(e) {
    ul.innerHTML = '';
    localStorage.clear()
}
