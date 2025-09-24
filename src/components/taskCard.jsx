import { useRef, useState } from "react";
import "./taskCard.css"

export function TaskCard({item, onDelete, onSave}) {
    const [IsEditing,setIsEditing] = useState(false);
    const titleRef = useRef();
    const descriptionRef = useRef();

  return (
    <>
      <div className="w-full p-3 flex  rounded-lg p-2 mb-2 justify-evenly shadow-2xl cards" key={item.id}>
        <img
          src="to-do-list.png"
          alt=""
          width="40"
          height="32"
          className="rounded-full flex-shrink-0"
        />
        <div className="flex w-full justify-between ps-3">
          <div className="sm:w-1/4 ">
            {IsEditing ? (
              <>
                <input
                  className="border rounded-md px-2 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  placeholder="Edit Title"
                  defaultValue={item.title}
                  ref={titleRef}
                />
                <input
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  placeholder="Edit Description"
                  defaultValue={item.description}
                  ref={descriptionRef}
                />
              </>
            ) : (
              <>
                <h6 className="mb-1 font-semibold text-gray-800">
                  {item.title}
                </h6>
                <hr className="m-0 border-gray-300" />
                <p
                  className="mt-1 text-sm text-gray-600 break-words"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {item.description}
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col text-base text-gray-500 ml-2 mt-1 p-1">
            <small className="whitespace-nowrap ">
              createdAt - {item.createdAt}
            </small>
            <small className="whitespace-nowrap ">
              updatedAt - {item.updatedAt}
            </small>
          </div>

          <div className="flex items-center ms-2 space-x-2 align">
            {IsEditing ? (
              <>
                <button
                  type="button"
                  className="px-3 py-1 text-sm rounded-md border border-yellow-500 text-yellow-600 hover:bg-yellow-50 save"
                  onClick={() => {
                    setIsEditing(false);
                    onSave(titleRef.current.value,descriptionRef.current.value,item.projectId,item.taskId);
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-3 py-1 text-sm rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 cancel"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="px-3 py-1 text-sm rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100 edit"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-3 py-1 text-sm rounded-md border border-red-500 text-red-600 hover:bg-red-50 delete"
                  onClick={() => {
                    setIsEditing(false);
                    onDelete(item.projectId,item.taskId);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
