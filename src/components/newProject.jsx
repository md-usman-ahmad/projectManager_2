import { useRef} from "react";
import {Input} from "./input.jsx"

export function NewProject({onClickCancelbtn,onAddingProject}) {
  const projectTitle = useRef();
  const projectDescription = useRef();

  return (
    <>
      <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-xl shadow-2xl my-auto">
      <div className="flex flex-col justify-center py-12 items-center ">
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-semibold italic md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Project Title
              </label>
            </div>
            <div className="md:w-2/3">
              <Input
                id="ProjectTitle"
                ref={projectTitle}
                type="text"
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-semibold italic md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Project Description
              </label>
            </div>
            <div className="md:w-2/3">
              <Input
                id="ProjectDescription"
                ref={projectDescription}
                type="text"
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button onClick={ ()=>{
                onAddingProject(projectTitle.current.value,projectDescription.current.value)
              }}
                className="shadow bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mx-2 rounded"
                type="button"
              >
                Create Project
              </button>
              <button onClick={onClickCancelbtn}
                className="shadow bg-red-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
