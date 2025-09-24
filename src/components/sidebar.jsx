export function Sidebar({ onClickAddProject, projects , onClickingProjects}) {
  return (
    <>
      <aside
        id="default-sidebar"
        class="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h5 class="text-center text-white">Project Management</h5>
          <hr className="mt-2"/>
          <ul class="space-y-2 font-medium">
            <li onClick={onClickAddProject}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group justify-center"
              >
                <svg
                  class="w-3.5 h-3.5"
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
                <span class="ms-3">Add Project</span>
              </a>
            </li>

            {projects.map((item) => {
              return (
                <li className="border rounded text-xl" onClick={ ()=>{onClickingProjects(item.projectId)}}>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group justify-center"
                  >
                    <span class="ms-3">{item.title}</span>
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
