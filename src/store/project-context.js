import { createContext, useReducer } from "react";

import { Sidebar } from "../components/sidebar.jsx";
import { HomePage } from "../components/homepage.jsx";
import { NewProject } from "../components/newProject.jsx";
import { SelectedProject } from "../components/selectedProject.jsx";
import { useState } from "react";

export const ProjectContext = createContext({
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
    onDelete: ()=>{},
    onSave: ()=>{}
})


export function ProjectContextProvider(){
    
  // const [projectState, setProjectState] = useState({
  //   projects: [],
  //   tasks: [],
  //   selectedProjectId: undefined,
  // });

  function reducerfn(projectState,action){
    console.log("projectState reducerfn = ",projectState);
    if(action.type === "handleOnClickAddProject"){
        return {
          ...projectState,
          selectedProjectId: null,
        };
    } else if(action.type === "handleonClickCancelbtn"){
        return {
          ...projectState,
          selectedProjectId: undefined,
      };
    } else if(action.type === "handleOnAddingProject"){
      if(action.payload.projectTitle !== '' || action.payload.projectDescription !== ''){
          return {
            ...projectState,
            projects: [
              ...projectState.projects,
              {
                projectId: projectState.projects.length + 1,
                title: action.payload.projectTitle,
                description: action.payload.projectDescription,
                createdAt: new Date().toLocaleString().slice(0, 19),
              },
            ],
            selectedProjectId: projectState.projects.length + 1,
          };
      } else {
        alert("Fill all the above fields ")
        return projectState
      }
      
    } else if(action.type === "handleOnClickingProjects"){
        return {
            ...projectState,
            selectedProjectId : action.payload.clickedProjectId
        }
    } else if(action.type === "handleOnTaskAdd"){ 
      if(action.payload.taskTitle !== '' || action.payload.taskDescription !== ''){
          return {
            ...projectState,
            tasks: [
              ...projectState.tasks,
              {
                taskId: projectState.tasks.length + 1,
                title: action.payload.taskTitle,
                description: action.payload.taskDescription,
                createdAt: new Date().toLocaleString().slice(0, 19),
                projectId: action.payload.projectId
              },
            ],
          };
      } else {
        alert("Fill all the fields above")
        return projectState
      }
    } else if(action.type === "handleOnTaskDelete"){
      return {
            ...projectState,
            tasks: projectState.tasks.filter( (task)=>{
                if((task.projectId !== action.payload.projectId) || (task.taskId !== action.payload.taskId)) return task
            })
        }
    } else if(action.type === "handleOnTaskEdit"){
      return {
          ...projectState,
          tasks: projectState.tasks.map( (item)=>{
              if(item.projectId === action.payload.projectId && item.taskId === action.payload.taskId){
                  const updatedTask={
                      ...item,
                      title: action.payload.newTitle,
                      description: action.payload.newDescription,
                      updatedAt: new Date().toLocaleString().slice(0, 19)
                  }
                  return updatedTask;
              }
              return item
          })
      }
    } else {
      return {
        ...projectState
      }
    }
  }
  const [projectState, dispatch] = useReducer(reducerfn,{
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
  });
  console.log("projectState = ", projectState);


  let content;
  function handleOnClickAddProject() {
    dispatch({
      type: "handleOnClickAddProject",
    })
  }
  function handleonClickCancelbtn() {
    dispatch({
      type: "handleonClickCancelbtn"
    })
  }

  function handleOnAddingProject(projectTitle, projectDescription) {
    dispatch({
      type : "handleOnAddingProject",
      payload : {
        projectTitle,
        projectDescription
      }
    })
  }
  function handleOnClickingProjects(clickedProjectId){
    dispatch({
      type:"handleOnClickingProjects",
      payload: {
        clickedProjectId
      }
    })
  }
  function handleOnTaskAdd(projectId, taskTitle,taskDescription) {
    dispatch({
      type: "handleOnTaskAdd",
      payload : {
        projectId,
        taskTitle,
        taskDescription
      }
    })
  }

  function handleOnTaskDelete(projectId,taskId){
    console.log("projectId = ",projectId);
    console.log("taskId = ",taskId);
      dispatch({
        type : "handleOnTaskDelete",
        payload : {
          projectId,
          taskId
        }
      })
  }
  function handleOnTaskEdit(newTitle,newDescription,projectId,taskId){
    console.log("newTitle = ",newTitle);
    console.log("newDescription = ",newDescription);
    dispatch({
      type : "handleOnTaskEdit",
      payload : {
        newTitle,
        newDescription,
        projectId,
        taskId
      }
    })
        
  }

  if (projectState.selectedProjectId === undefined) {
    content = <HomePage></HomePage>;
  }

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddingProject={handleOnAddingProject}
        onClickCancelbtn={handleonClickCancelbtn}
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
        onTaskEdit={handleOnTaskEdit}
      ></SelectedProject>
    );
  }

  return (
    <>
    <ProjectContext value={{
        projects: projectState.projects,
        tasks: projectState.tasks,
        selectedProjectId: projectState.selectedProjectId,
        onDelete: handleOnTaskDelete,
        onSave: handleOnTaskEdit
    }}>
      <Sidebar
        projects={projectState.projects}
        onClickAddProject={handleOnClickAddProject}
        onClickingProjects={handleOnClickingProjects}
        ></Sidebar>
      {content}
    </ProjectContext>
    </>
  );
}