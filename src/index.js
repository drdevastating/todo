import './style.css';

class Todo {
    constructor(title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
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

            const project = document.createElement("li");
            project.textContent = projectName;

            let projectList = projList.querySelector("ol");
            if(!projectList){
                projectList = document.createElement("ol");
                projList.appendChild(projectList);
            }
            projectList.appendChild(project);

            overlay.remove();
        })

        overlay.addEventListener("click",function(event){
            if(!form.contains(event.target)) overlay.remove();
        });
    })
})


