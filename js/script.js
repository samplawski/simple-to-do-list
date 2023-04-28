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


    let hideDoneTasks = false; //ukryj ukończone zadania; kliknięcie w przycisk będzie przełązało true/false


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
        // tasks = [
        //     ...tasks.slice(0, taskIndex),
        //     { ...tasks[taskIndex], done: !tasks[taskIndex].done },
        //     ...tasks.slice(taskIndex + 1),
        // ];

        //lub

        // tasks = tasks.map((task, index) => {
        //     if (index === taskIndex) {
        //         return { ...task, done: !task.done };
        //     } else {
        //         return task;
        //     }
        // });

        // lub

        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task
        );
        render();
    };


    const toggleAllTasksDone = (taskIndex) => { //do zaznaczania wszystkich jako ukończone
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


    const renderTasks = () => { //renderuje zadania
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasksList__item">
                                                              
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


    const renderButtons = () => { //renderuje przyciski

    };


    const bindButtonsEvents = () => { //event listenery dodane do przycisków,
        //tak jak renderTasks(); powinna zrobić HTML na podstawie np. let htmlString = ""; i
        // let hideDoneTasks = false; , któtego wrzuci do elementu, w którym te przyciski mają się znaleźć
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
}