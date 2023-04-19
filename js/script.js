{
    const form = document.querySelector(".js-form");

    const tasks = [
        {
            content: "Create a to-do list.",
            done: true,
        },

        {
            content: "Have fun writing the code.",
            done: true,
        },

        {
            content: "Go for a walk.",
            done: false,
        },
    ];


    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };


    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasksList__item">
                                                              
                    <button class="js-done tasksList__button tasksList__button--done"> 
                    ${task.done ? "✔" : ""}</button>
                    <p class="${task.done ? "tasksList__item--done" : ""}">${task.content} </p>

                    <button class="js-remove tasksList__button tasksList__button--remove ">
                    <img
                        class="tasksList__button--trash"
                        src="./images/red-bin.jpg"
                        alt="trash-bin-icon"🗑️
                    </button>
                </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        form.reset();
        document.querySelector(".js-newTask").focus();
    };

    const onAddTaskButtonClick = () => {
        document.querySelector(".js-newTask").focus();
    };

    const init = () => {
        render();

        form.addEventListener("submit", onFormSubmit);

        const onAddTaskButtonClickFocus = document.querySelector(".form__button");
        onAddTaskButtonClickFocus.addEventListener("click", onAddTaskButtonClick);
    };

    init();
}