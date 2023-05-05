{
    let tasks = [
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


    let hideDoneTasks = false;


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];

        render();
    };


    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };


    const toggleTaskDone = (taskIndex) => {

        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task
        );
        render();
    };


    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));
        render();
    };


    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };


    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };


    const checkAllTasksDone = () => {
        const allTasksDoneButton = document.querySelector(".js-allTasksDoneButton");
        if (tasks.every(({ done }) => done === true)) {
            allTasksDoneButton.disabled = true;
        } else {
            allTasksDoneButton.disabled = false;
        }
    };


    const renderButtons = () => {
        if (!tasks.length) {
            document.querySelector(".js-buttons").innerHTML = "";
            return;
        };

        let allTasksDoneButtonDisabled = "";
        if (tasks.every(({ done }) => done === true)) {
            allTasksDoneButtonDisabled = "disabled";
        }

        document.querySelector(".js-buttons").innerHTML = `
        <button class="js-buttons js-toggleHideTasksDoneButton section__headingButton">
            ${hideDoneTasks === false ? "Ukryj" : "Pokaż"} ukończone
        </button>
        
        <button class="js-buttons js-allTasksDoneButton section__headingButton" ${allTasksDoneButtonDisabled}>
            Ukończ wszystkie
        </button>
    `;
        checkAllTasksDone();
    };



    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasksList__item ${task.done && hideDoneTasks ? "tasksList__item--hidden" : ""} ">
                                                              
                    <button class="js-done tasksList__button tasksList__button--toggleDone"> 
                    ${task.done ? "✔" : ""}
                    </button>
                    
                    <span class="${task.done ? "tasksList__item--done" : ""}">${task.content}
                    </span>

                    <button class="js-remove tasksList__button tasksList__button--remove">
                    <img
                        class="tasksList__button--trash"
                        src="./images/red-bin.jpg"
                        alt="trash-bin-icon"🗑️
                    </button>
                </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };


    const bindButtonsEvents = () => {
        const toggleHideTasksDoneButton = document.querySelector(".js-toggleHideTasksDoneButton");
        const allTasksDoneButton = document.querySelector(".js-allTasksDoneButton");

        if (allTasksDoneButton) {
            allTasksDoneButton.addEventListener("click", () => {
                markAllTasksDone();
            });
        }

        toggleHideTasksDoneButton.addEventListener("click", () => {
            hideDoneTasks = !hideDoneTasks;


            render();
        });
    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-newTask");
        const newTaskContent = inputElement.value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        inputElement.value = "";
        inputElement.focus();
    };


    const onAddTaskButtonClick = () => {
        document.querySelector(".js-newTask").focus();
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

        const onAddTaskButtonClickFocus = document.querySelector(".form__button");
        onAddTaskButtonClickFocus.addEventListener("click", onAddTaskButtonClick);
    };

    init();
};