import './style.css';

class Todo {
    constructor(title, desc, dueDate) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.completed = false; // Default to not completed
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

class Project {
    constructor(name,dueDate) {
        this.name = name;
        this.dueDate=dueDate;
        this.todos = []; // array of todos
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(ind) {
        this.todos.splice(ind, 1);
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const addProjBtn = document.querySelector(".add-project");
    const projList = document.querySelector(".project-list");
    const projects = [];

    addProjBtn.addEventListener("click",()=>{

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const form = document.createElement("form");
        form.classList.add("project-form");

        const projNameLabel = document.createElement("label");
        projNameLabel.innerHTML = "Enter project name: ";
        const projName = document.createElement("input");
        projName.type= "text";
        projName.name="projectName";
        projName.required=true;

        const dueDateLabel = document.createElement("label");
        dueDateLabel.innerHTML = "Enter due date: ";
        const dueDate = document.createElement("input");
        dueDate.type="date";
        dueDate.name="dueDate";

        const submitbtn = document.createElement("button");
        submitbtn.type = "submit";
        submitbtn.textContent = "Add project";

        form.appendChild(projNameLabel);
        form.appendChild(projName);
        form.appendChild(dueDateLabel);
        form.appendChild(dueDate);
        form.appendChild(submitbtn);

        overlay.appendChild(form);
        document.body.appendChild(overlay);

        form.addEventListener("submit",(event)=>{

            event.preventDefault();

            const projectName = projName.value.trim();
            const projectDueDate = dueDate.value || "No due date";

            const newProject = new Project(projectName,projectDueDate);
            projects.push(newProject);

            const projectButton = document.createElement("button");
            const project = document.createElement("li");
            project.textContent = projectName;

            let projectList = projList.querySelector("ol");
            if(!projectList){
                projectList = document.createElement("ol");
                projList.appendChild(projectList);
            }

            projectButton.addEventListener('click', () => {
                displayProjectDetails(newProject);
            });

            projectButton.classList.add("project-btn");
            projectButton.appendChild(project)
            projectList.appendChild(projectButton);
            overlay.remove();
        })

        function displayProjectDetails(project){
            const mainContent = document.querySelector(".main");
            mainContent.innerHTML ="";
            
            const projectHeader = document.createElement("h2");
            projectHeader.textContent = project.name;
            projectHeader.classList.add("proj-header");

            const projectDueDate = document.createElement("p");
            projectDueDate.textContent = `Due Date: ${project.dueDate || "No due date"}`;
            projectDueDate.classList.add("proj-dueDate");

            const todoList = document.createElement("ol");

            // Check if there are any todos
            if (project.todos.length === 0) {
                const noTodosMessage = document.createElement("p");
                noTodosMessage.textContent = "No to-dos added yet.";
                todoList.appendChild(noTodosMessage); // Add the message to the content
            }
            else{
                project.todos.forEach((todo, index) => {
                    const todoItem = document.createElement("li");
                    todoItem.classList.add("todos")
                    todoItem.innerHTML = `<u>${todo.title}</u> : ${todo.dueDate || "No due date"}`;
        
                    // Optional: Add a "Remove" button for each todo
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Done!";
                    removeButton.classList.add("todo-done");
                    removeButton.addEventListener("click", () => {
                        project.removeTodo(index);
                        displayProjectDetails(project); // Refresh the list
                    });
        
                    todoItem.appendChild(removeButton);
                    todoList.appendChild(todoItem);
                });
            }

            const addTodoButton = document.createElement("button");
            addTodoButton.textContent = "+Add Todo";
            addTodoButton.classList.add("add-todo");
            addTodoButton.addEventListener("click", () => {
                showAddTodoForm(project);
            });
        
            // Append everything to mainContent
            mainContent.appendChild(projectHeader);
            mainContent.appendChild(projectDueDate);
            mainContent.appendChild(todoList);
            mainContent.appendChild(addTodoButton);
        }

        function showAddTodoForm(project) {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
        
            const form = document.createElement("form");
            form.classList.add("project-form");
        
            const titleLabel = document.createElement("label");
            titleLabel.textContent = "Title: ";
            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.required = true;
        
            const descLabel = document.createElement("label");
            descLabel.textContent = "Description: ";
            const descInput = document.createElement("textarea");
        
            const dueDateLabel = document.createElement("label");
            dueDateLabel.textContent = "Due Date: ";
            const dueDateInput = document.createElement("input");
            dueDateInput.type = "date";
        
        
            const submitButton = document.createElement("button");
            submitButton.type = "submit";
            submitButton.textContent = "Add Todo";
        
            form.append(titleLabel, titleInput, descLabel, descInput, dueDateLabel, dueDateInput,submitButton);
            overlay.appendChild(form);
            document.body.appendChild(overlay);
        
            form.addEventListener("submit", (e) => {
                e.preventDefault();
        
                const todo = new Todo(
                    titleInput.value.trim(),
                    descInput.value.trim(),
                    dueDateInput.value || "No due date"
                );
                project.addTodo(todo);
        
                overlay.remove();
                displayProjectDetails(project); // Refresh project details
            });
        
            overlay.addEventListener("click", (e) => {
                if (!form.contains(e.target)) overlay.remove();
            });
        }
        

        overlay.addEventListener("click",function(event){
            if(!form.contains(event.target)) overlay.remove();
        });
    });
    
});


