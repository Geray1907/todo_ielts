const contaBox = document.querySelector(".contaBox");
const searchBox = document.querySelector(".searchBox");
const input = document.querySelector("input");
const button = document.querySelector("button");
const listContainer = document.querySelector(".listContainer");

function addTask() {
    if (input.value === "") {
        alert("You must write something!");
    } else if (!isNaN(input.value)) {
        alert("You must write some letters!");
    } else {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = input.value;

        const iconBox = document.createElement("div");
        iconBox.className = "iconBox";

        const checkedTask = document.createElement("span");
        checkedTask.className = "checkedTask";
        checkedTask.innerHTML = "&#10003;"

        const deleteTask = document.createElement("span");
        deleteTask.className = "deleteTask";
        deleteTask.innerHTML = "&#10005;"

        iconBox.append(checkedTask, deleteTask);
        li.append(taskText, iconBox);
        listContainer.appendChild(li);

        input.value = "";
        saveData();

        deleteTask.addEventListener("click", () => {
            li.remove();
            saveData();
        });

        checkedTask.addEventListener("click", () => {
            taskText.classList.toggle("completed");
            saveData();
        });
    }
}

function saveData() {
    localStorage.setItem("task", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("task");
    const deleteTasks = document.querySelectorAll(".fa-trash");
    deleteTasks.forEach(task => {
        task.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove();
            saveData();
        });
    });
    const checkedTasks = document.querySelectorAll(".fa-check");
    checkedTasks.forEach(task => {
        task.addEventListener("click", (e) => {
            e.target.parentElement.previousElementSibling.classList.toggle("completed");
            saveData();
        });
    });
}

showData();