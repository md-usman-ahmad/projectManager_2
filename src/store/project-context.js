import { createContext } from "react";

export const ProjectContext = createContext({
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
    onDelete: ()=>{},
    onSave: ()=>{}
})