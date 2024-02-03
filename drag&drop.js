const todos = document.querySelectorAll(".task");
let draggableTodo = null;
let isInsideContainer = false;

todos.forEach((todo) => {
    todo.addEventListener("mousedown", dragStart);
});

function dragStart(event) {
    const draggedElement = event.target.closest('.task');

    if (draggedElement) {
        draggedElement.style.cursor = 'grabbing';
        draggedElement.style.zIndex = '1000';  // Set a high z-index
        document.body.appendChild(draggedElement); // Move the element out of its parent to avoid z-index issues

        const initialX = event.clientX;
        const initialY = event.clientY;

        const dragHandler = (e) => {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;

            draggedElement.style.position = 'fixed';
            draggedElement.style.top = `${e.clientY - draggedElement.clientHeight / 2}px`;
            draggedElement.style.left = `${e.clientX - draggedElement.clientWidth / 2}px`;
        };

        const releaseHandler = () => {
            document.removeEventListener("mousemove", dragHandler);
            document.removeEventListener("mouseup", releaseHandler);

            draggedElement.style.cursor = 'grab';
            draggedElement.style.position = 'static';  // Reset position
            draggedElement.style.transform = 'translate(0, 0)';
            draggedElement.style.zIndex = '';  // Reset the z-index

            // Append the dragged element back to its original container
            if (draggableTodo) {
                draggableTodo.removeEventListener("dragstart", dragStart);
                draggableTodo.removeEventListener("dragend", dragEnd);
                draggedElement.parentElement.removeChild(draggedElement);
                draggableTodo = null;
            }
        };

        document.addEventListener("mousemove", dragHandler);
        document.addEventListener("mouseup", releaseHandler);

        draggableTodo = draggedElement;
    }
}




const dropContainers = document.querySelectorAll("#left, #leftcenter, #rightcenter, #right, #topmid");

dropContainers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", dragDrop);
});

function dragOver(event) {
    event.preventDefault();
    console.log("dragOver");
    isInsideContainer = true;
}

function dragEnter(event) {
    event.preventDefault();
    console.log("dragEnter");
    isInsideContainer = true;
}

function dragLeave(event) {
    event.preventDefault();
    console.log("dragLeave");
    isInsideContainer = false;
}

function dragDrop(event) {
    event.preventDefault();

    const dropContainer = event.target;

    if (dropContainer.tagName === "H1" && dropContainer.parentElement.classList.contains("#left, #leftcenter, #rightcenter, #right, #topmid")) {

        // Find the closest drop zone (container with an h1)
        const closestDropZone = dropContainer.closest("#left h1, #leftcenter h1, #rightcenter h1, #right h1, #topmid h1");

        if (closestDropZone) {
            // Append the dragged element to the closest drop zone
            closestDropZone.parentElement.appendChild(draggableTodo);
            console.log("Dropped into container");
        }
    }

    // Remove the dragged element from its original position
    draggableTodo.parentElement.removeChild(draggableTodo);
}




/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active");
    });
});

close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

window.onclick = (event) => {
    if (event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => modal.classList.remove("active"));
        overlay.classList.remove("active");
    }
};

/* create todo  */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click", () => {
    createTodo();
});


function createTodo() {
    const todo_div = document.createElement("div");
    const input_val = document.getElementById("todo_input").value;
    
    if (!input_val) {
        alert("Please enter a task before adding.");
        return;
    }

    const txt = document.createTextNode(input_val);

    todo_div.appendChild(txt);
    todo_div.classList.add("task");
    todo_div.setAttribute("draggable", "true");

    /* create span */
    const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_txt);
    todo_div.appendChild(span);

    const task_cont = document.querySelector("#topmid");

    task_cont.appendChild(todo_div);

    span.addEventListener("click", () => {
        span.parentElement.style.display = "none";
    });

    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);

    document.getElementById("todo_input").value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.parentElement.style.display = "none";
    });
});
