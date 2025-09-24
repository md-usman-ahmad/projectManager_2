import { useRef } from "react";
import {Input} from "./input.jsx"

export function NewProject({onClickCancelbtn, onAddingProject}) {
  const projectTitle = useRef();
  const projectDescription = useRef();

  return (
    <>
      <div class="max-w-4xl mx-auto px-10 py-4 bg-white rounded-xl shadow-2xl my-auto">
      <div class="flex flex-col justify-center py-12 items-center ">
        <form class="w-full max-w-sm">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-700 font-semibold italic md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Project Title
              </label>
            </div>
            <div class="md:w-2/3">
              <Input
                id="ProjectTitle"
                ref={projectTitle}
                type="text"
                class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-700 font-semibold italic md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Project Description
              </label>
            </div>
            <div class="md:w-2/3">
              <Input
                id="ProjectDescription"
                ref={projectDescription}
                type="text"
                class="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button onClick={ ()=>{
                onAddingProject(projectTitle.current.value,projectDescription.current.value)
              }}
                class="shadow bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-2 rounded"
                type="button"
              >
                Create Project
              </button>
              <button onClick={onClickCancelbtn}
                class="shadow bg-red-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
