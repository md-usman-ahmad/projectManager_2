import { Input } from "./input";
import { TaskCard } from "./taskCard";
import { useRef } from "react";

export function SelectedProject({
  selectedProject,
  selectedProjectTasks,
  onTaskAdd,
}) {
  const taskTitleRef = useRef();
  const taskDescriptionRef = useRef();
  return (
    <>
      <div class="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg ">
        <div class="flex flex-col justify-center py-12 items-center">
          <h1 class="text-gray-700 font-medium text-2xl text-center mb-3">
            {selectedProject.title}
          </h1>
          <p class="text-gray-500 text-center mb-6">
            {selectedProject.description}
          </p>
          <p class="text-gray-500 text-center mb-6">
            CreatedAt - {selectedProject.createdAt}
          </p>
        </div>
        <form class="  ">
          <div class=" mb-6 flex gap-2">
            <Input id="TaskTitle" ref={taskTitleRef} type="text" placeholder="Enter Title"></Input>
            <Input id="TaskTitle" ref={taskDescriptionRef} type="text" placeholder="Enter Description"></Input>
            <button
              class="shadow bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-2 rounded"
              type="button"
              onClick={() => {
                onTaskAdd(
                  selectedProject.projectId,
                  taskTitleRef.current.value,
                  taskDescriptionRef.current.value
                );
                taskTitleRef.current.value = ""
                taskDescriptionRef.current.value = ""
              }}
            >
              Add
            </button>
          </div>
        </form>

        {selectedProjectTasks.length === 0 && <h1 className="text-center">Add Tasks for this Project</h1>}
        {selectedProjectTasks.length > 0 && selectedProjectTasks.map((item) => {
          return (
            <>
                <TaskCard key={item.taskId} item={item} ></TaskCard>
            </>
        );
        })}
      </div>
    </>
  );
}
