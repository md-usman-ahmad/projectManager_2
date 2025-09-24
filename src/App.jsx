import { Sidebar } from "./components/sidebar.jsx";
import { HomePage } from "./components/homepage.jsx";
import { NewProject } from "./components/newProject.jsx";
import { SelectedProject } from "./components/selectedProject.jsx";
import { useState } from "react";

export function App() {
  const [projectState, setProjectState] = useState({
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
  });
  console.log("projectState = ", projectState);
  let content;

  function handleOnClickAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleonClickCancelbtn() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleOnAddingProject(projectTitle, projectDescription) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: [
          ...prevState.projects,
          {
            projectId: prevState.projects.length + 1,
            title: projectTitle,
            description: projectDescription,
            createdAt: new Date().toLocaleString().slice(0, 19),
          },
        ],
        selectedProjectId: prevState.projects.length + 1,
      };
    });
  }
  function handleOnClickingProjects(clickedProjectId){
    setProjectState((prevState)=>{
        return {
            ...prevState,
            selectedProjectId : clickedProjectId
        }
    })
  }
  function handleOnTaskAdd(projectId, taskTitle,taskDescription) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: [
          ...prevState.tasks,
          {
            taskId: prevState.tasks.length + 1,
            title: taskTitle,
            description: taskDescription,
            createdAt: new Date().toLocaleString().slice(0, 19),
            projectId,
          },
        ],
      };
    });
  }
  function handleOnTaskDelete(projectId,taskId){
    console.log("projectId = ",projectId);
    console.log("taskId = ",taskId);
    setProjectState( (prevState)=>{
        return {
            ...prevState,
            tasks: prevState.tasks.filter( (task)=>{
                if((task.projectId !== projectId) || (task.taskId !== taskId)) return task
            })
        }
    })
  }
  function handleOnTaskEdit(newTitle,newDescription,projectId,taskId){
    console.log("newTitle = ",newTitle);
    console.log("newDescription = ",newDescription);
    setProjectState((prevState)=>{
        return {
            ...prevState,
            tasks: prevState.tasks.map( (item)=>{
                if(item.projectId === projectId && item.taskId === taskId){
                    const updatedTask={
                        ...item,
                        title: newTitle,
                        description: newDescription,
                        updatedAt: new Date().toLocaleString().slice(0, 19)
                    }
                    return updatedTask;
                }
                return item
            })
        }
    })
  }

  if (projectState.selectedProjectId === undefined) {
    content = <HomePage></HomePage>;
  }

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onClickCancelbtn={handleonClickCancelbtn}
        onAddingProject={handleOnAddingProject}
      ></NewProject>
    );
  }

  if (projectState.selectedProjectId) {
    const selectedProject = projectState.projects.find((item) => {
      if (item.projectId === projectState.selectedProjectId) return item;
    });
    console.log("selectedProject = ", selectedProject);
    const selectedProjectTasks = projectState.tasks.filter((item) => {
      if (item.projectId === projectState.selectedProjectId) return true;
    });
    console.log("selectedProjectTasks = ", selectedProjectTasks);

    content = (
      <SelectedProject
        selectedProject={selectedProject}
        selectedProjectTasks={selectedProjectTasks}
        onTaskAdd={handleOnTaskAdd}
        onTaskDelete={handleOnTaskDelete}
        onTaskEdit={handleOnTaskEdit}
      ></SelectedProject>
    );
  }

  return (
    <>
      <Sidebar
        onClickAddProject={handleOnClickAddProject}
        projects={projectState.projects}
        onClickingProjects={handleOnClickingProjects}
      ></Sidebar>
      {content}
    </>
  );
}
