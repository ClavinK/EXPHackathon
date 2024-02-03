let taskIdCounter = 0;

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const draggedTask = document.getElementById(taskId);
    const dropZone = event.target;

    // Check if the drop target is a valid drop zone
    if (dropZone && dropZone.classList.contains("drop-box")) {
        // Append the dragged task to the drop zone
        dropZone.appendChild(draggedTask);
    }
}

function addNewTask() {
    const newTaskInput = document.getElementById("new-task");
    const taskText = newTaskInput.value.trim();

    if (taskText !== "") {
        const taskId = "task" + (++taskIdCounter);

        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.draggable = true;
        newTask.id = taskId;
        newTask.textContent = taskText;

        // Apply the drag-and-drop event listeners directly to the new task
        newTask.addEventListener("dragstart", drag);

        // Append the new task to the todo list
        const todoList = document.getElementById("todo-list");
        todoList.appendChild(newTask);

        // Clear the input field
        newTaskInput.value = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");

    container.addEventListener("dragover", allowDrop);
    container.addEventListener("drop", drop);
});