import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../../store/task-slice";
import Logout from "../../components/Logout";
import { format } from "date-fns"; // Import the date-fns library for date formatting

const TaskBoard = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    assignedTo: null,
  });

  const [editingTask, setEditingTask] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
    fetchUsers();
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users`
      );
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const { tasks, loading, error } = useSelector((state) => state.task);

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      alert("Task title is required");
      return;
    }

    const taskData = {
      ...newTask,
      assignedTo: newTask.assignedTo ? newTask.assignedTo : null,
    };

    dispatch(createTask(taskData))
      .unwrap()
      .then(() => {
        setNewTask({
          title: "",
          description: "",
          status: "To Do",
          assignedTo: null,
        });
      })
      .catch((err) => {
        console.error("Failed to create task:", err);
      });
  };

  const handleUpdateTask = () => {
    if (!newTask.title.trim()) {
      alert("Task title is required");
      return;
    }

    const updatedTask = {
      ...newTask,
      assignedTo: newTask.assignedTo ? newTask.assignedTo : null,
    };

    dispatch(updateTask({ id: editingTask._id, updates: updatedTask }))
      .unwrap()
      .then(() => {
        setEditingTask(null);
        setNewTask({
          title: "",
          description: "",
          status: "To Do",
          assignedTo: null,
        });
      })
      .catch((err) => {
        console.error("Failed to update task:", err);
      });
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id))
      .unwrap()
      .catch((err) => {
        console.error("Failed to delete task:", err);
      });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      assignedTo: task.assignedTo ? task.assignedTo._id : null,
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className="container mx-auto p-4">
      <Logout />
      <h1 className="text-3xl font-bold mb-6 text-center">Task Board</h1>

      {/* Create or Edit Task Form */}
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {editingTask ? "Edit Task" : "Create Task"}
        </h2>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
          className="border p-3 rounded w-full mb-4"
        />
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Description"
          className="border p-3 rounded w-full mb-4 h-24"
        ></textarea>

        <select
          value={newTask.assignedTo || ""}
          onChange={(e) =>
            setNewTask({ ...newTask, assignedTo: e.target.value })
          }
          className="border p-3 rounded w-full mb-4"
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded w-full"
          onClick={editingTask ? handleUpdateTask : handleCreateTask}
        >
          {editingTask ? "Update Task" : "Create Task"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* To Do Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">To Do</h2>
          {todoTasks.map((task) => (
            <div
              key={task._id}
              className="border p-6 rounded-lg shadow-md bg-gray-100 mb-4"
            >
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-gray-500 mb-2">
                Assigned: {task.assignedTo?.username || "Unassigned"}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Created at: {format(new Date(task.createdAt), "PPpp")}
              </p>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={() => handleStatusChange(task._id, "In Progress")}
                >
                  In Progress
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
          {inProgressTasks.map((task) => (
            <div
              key={task._id}
              className="border p-6 rounded-lg shadow-md bg-yellow-100 mb-4"
            >
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-gray-500 mb-2">
                Assigned: {task.assignedTo?.username || "Unassigned"}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Created at: {format(new Date(task.createdAt), "PPpp")}
              </p>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleStatusChange(task._id, "Done")}
                >
                  Done
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Done Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Done</h2>
          {doneTasks.map((task) => (
            <div
              key={task._id}
              className="border p-6 rounded-lg shadow-md bg-green-100 mb-4"
            >
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-gray-500 mb-2">
                Assigned: {task.assignedTo?.username || "Unassigned"}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Created at: {format(new Date(task.createdAt), "PPpp")}
              </p>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
