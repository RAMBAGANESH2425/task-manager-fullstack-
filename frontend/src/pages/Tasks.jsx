import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: "",
  });

  const [editingTask, setEditingTask] =
    useState(null);

  // DARK MODE

  const [darkMode, setDarkMode] =
    useState(false);

  // SEARCH + FILTER STATES

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  // SORT STATE

  const [sortType, setSortType] =
    useState("Newest");

  useEffect(() => {

    fetchTasks();

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {

      document.documentElement.classList.add("dark");

      setDarkMode(true);

    }

  }, []);

  // TOGGLE DARK MODE

  const toggleDarkMode = () => {

    if (darkMode) {

      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");

    } else {

      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");

    }

    setDarkMode(!darkMode);

  };

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/tasks/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setTasks(data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch tasks");

    }
  };

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ADD OR UPDATE TASK

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      let response;

      // UPDATE TASK

      if (editingTask) {

        response = await fetch(
          `http://127.0.0.1:8000/api/tasks/${editingTask.id}/`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(formData),
          }
        );
      }

      // CREATE TASK

      else {

        response = await fetch(
          "http://127.0.0.1:8000/api/tasks/",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(formData),
          }
        );
      }

      if (response.ok) {

        toast.success(
          editingTask
            ? "Task Updated Successfully"
            : "Task Added Successfully"
        );

        fetchTasks();

        setFormData({
          title: "",
          description: "",
          status: "Pending",
          priority: "Medium",
          due_date: "",
        });

        setEditingTask(null);

      } else {

        toast.error("Operation Failed");

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }
  };

  // DELETE TASK

  const deleteTask = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/tasks/${id}/`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {

        toast.success("Task Deleted");

        fetchTasks();

      }

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }
  };

  // TOGGLE STATUS

  const toggleStatus = async (task) => {

    try {

      const token =
        localStorage.getItem("token");

      const updatedTask = {
        ...task,

        status:
          task.status === "Completed"
            ? "Pending"
            : "Completed",
      };

      const response = await fetch(
        `http://127.0.0.1:8000/api/tasks/${task.id}/`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {

        toast.success("Task Status Updated");

        fetchTasks();

      }

    } catch (error) {

      console.log(error);

      toast.error("Status Update Failed");

    }
  };

  // EDIT TASK

  const editTask = (task) => {

    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-all duration-300">

      {/* TOP */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold text-blue-600 dark:text-white">
          Task Manager
        </h1>

        <button
          onClick={toggleDarkMode}
          className="bg-black text-white px-5 py-3 rounded-xl dark:bg-white dark:text-black"
        >
          {darkMode
            ? "Light Mode ☀️"
            : "Dark Mode 🌙"}
        </button>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-10"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="title"
            placeholder="Enter Task Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
          />

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
          />

        </div>

        <textarea
          name="description"
          placeholder="Enter Task Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-4 rounded-xl w-full mt-4 dark:bg-gray-700 dark:text-white"
          rows="5"
        ></textarea>

        <div className="grid md:grid-cols-2 gap-4 mt-4">

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl mt-5 hover:bg-blue-700"
        >
          {editingTask
            ? "Update Task"
            : "Add Task"}
        </button>

      </form>

      {/* SEARCH FILTER SORT */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
          className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={sortType}
          onChange={(e) =>
            setSortType(e.target.value)
          }
          className="border p-4 rounded-xl dark:bg-gray-700 dark:text-white"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>High Priority</option>
          <option>Completed First</option>
        </select>

      </div>

      {/* TASKS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {tasks

          .filter((task) => {

            const matchesSearch =
              task.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                );

            const matchesStatus =
              statusFilter === "All" ||
              task.status === statusFilter;

            const matchesPriority =
              priorityFilter === "All" ||
              task.priority === priorityFilter;

            return (
              matchesSearch &&
              matchesStatus &&
              matchesPriority
            );

          })

          .sort((a, b) => {

            if (sortType === "Newest") {
              return b.id - a.id;
            }

            if (sortType === "Oldest") {
              return a.id - b.id;
            }

            if (sortType === "High Priority") {

              const priorityOrder = {
                High: 1,
                Medium: 2,
                Low: 3,
              };

              return (
                priorityOrder[a.priority] -
                priorityOrder[b.priority]
              );
            }

            if (
              sortType === "Completed First"
            ) {

              return a.status === "Completed"
                ? -1
                : 1;

            }

            return 0;

          })

          .map((task) => (

            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold dark:text-white">
                  {task.title}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm
                  ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority}
                </span>

              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {task.description}
              </p>

              <div className="mb-4">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm
                  ${
                    task.status === "Completed"
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                >
                  {task.status}
                </span>

              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Due: {task.due_date || "No Date"}
              </p>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    toggleStatus(task)
                  }
                  className={`text-white px-4 py-2 rounded-lg
                  ${
                    task.status === "Completed"
                      ? "bg-gray-500"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {task.status === "Completed"
                    ? "Completed"
                    : "Mark Complete"}
                </button>

                <button
                  onClick={() => editTask(task)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

export default Tasks;