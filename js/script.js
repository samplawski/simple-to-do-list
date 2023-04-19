{
    const form = document.querySelector(".js-form");

    const tasks = [
        {
            content: "test 1",
            done: false,
        },

        {
            content: "test 2",
            done: true,
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

                    <button class="js-remove tasksList__button tasksList__button--remove ">&#xe020;</button>
                </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        document.querySelector(".js-stats").innerHTML = `
        Liczba wszystkich zadań: ${tasks.length}<br>
        Liczba ukończonych zadań: ${tasks.filter(task => task.done).length}
        `;

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


    const init = () => {
        render();

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}