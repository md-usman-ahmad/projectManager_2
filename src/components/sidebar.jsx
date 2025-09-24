export function Sidebar({projects,onClickingProjects,onClickAddProject}) {
  return (
    <>
      <aside
        id="default-sidebar"
        className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h5 className="text-center text-white">Project Management</h5>
          <hr className="mt-2"/>
          <ul className="space-y-2 font-medium">
            <li onClick={onClickAddProject}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group justify-center"
              >
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  ></path>
                </svg>
                <span className="ms-3">Add Project</span>
              </a>
            </li>

            {projects.length === 0 && <h1 className="text-center text-white">Zero project added</h1>}
            {projects.length > 0 && projects.map((item) => {
              return (
                <li className="border rounded text-xl" key={item.projectId} onClick={ ()=>{onClickingProjects(item.projectId)}}>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group justify-center"
                  >
                    <span className="ms-3">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
