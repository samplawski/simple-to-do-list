{
    const form = document.querySelector(".js-form");

    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });



        render();
    };


    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }


    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    }


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
                <li
                    class="tasksList__item${task.done ? " tasksList__item--done" : ""}" >

                    <button class="js-done tasksList__button-done"> &#x2705;</button>
                   
                    ${task.content}
                    <button class="js-remove tasksList__button--remove ">🗑</button>
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

    };


    const init = () => {
        render();

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}