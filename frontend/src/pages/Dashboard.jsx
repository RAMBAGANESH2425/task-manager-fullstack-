import { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

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
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  // COUNTS
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-200">
      {/* NAVBAR */}
      <div className="bg-blue-600 flex justify-between items-center p-6">
        <h1 className="text-white text-4xl font-bold">
          Task Manager
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg text-2xl"
        >
          Logout
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="p-14">
        <h1 className="text-7xl font-bold mb-14">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* TOTAL */}
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-blue-600 text-5xl font-bold">
              Total Tasks
            </h2>

            <p className="text-8xl font-bold mt-10">
              {totalTasks}
            </p>
          </div>

          {/* COMPLETED */}
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-green-600 text-5xl font-bold">
              Completed
            </h2>

            <p className="text-8xl font-bold mt-10">
              {completedTasks}
            </p>
          </div>

          {/* PENDING */}
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-red-600 text-5xl font-bold">
              Pending
            </h2>

            <p className="text-8xl font-bold mt-10">
              {pendingTasks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;