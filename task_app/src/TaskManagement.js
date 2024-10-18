import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { createTask, getTasks, updateTask, deleteTask } from './TaskManagementServices';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    color: 'white',
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',

  },

  buttontd:
  {
    display: 'flex',
    gap: 5
  },

  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },

};



const TaskManagementApp = () => {
 
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });

  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
  };
  
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.title.trim() === '') return;
    await createTask(newTask);
    fetchTasks();
    setNewTask({ title: '', description: '', completed: false });
  };

  const handleUpdateTask = async () => {
    await updateTask(currentTask.id, currentTask);
    setIsDialogOpen(false);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Task Management</h1>
      <div style={styles.card}>
        <h2>Add New Task</h2>
        <form style={styles.form} onSubmit={handleAddTask}>
          <input
            style={styles.input}
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="new-task-completed"
              checked={newTask.completed}
              onChange={(e) => setNewTask({ ...newTask, completed: e.target.checked })}
            />
            <label htmlFor="new-task-completed">Completed</label>
          </div>
          <button type="submit" style={{...styles.button, ...styles.primaryButton}}>
            <Plus size={16} /> Add Task
          </button>
        </form>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Completed</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr key={task.id}>
                <td style={styles.td}>{task.title}</td>
                <td style={styles.td}>{task.description}</td>
                <td style={styles.td}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={async (e) => {
                      const updatedTask = { ...task, completed: e.target.checked };
                      setTasks(tasks?.map((t) => (t.id === task.id ? updatedTask : t)));

                    
                      try {
                        await updateTask(updatedTask);
                      } catch (error) {
                        console.error('Failed to update task:', error);
                        setTasks(tasks.map((t) => (t.id === task.id ? task : t))); 
                      }
                    }}
                  />
                </td>
                <td  style={styles.td}>
                  <div style={styles.buttontd}>
                  <button style={{...styles.button, ...styles.secondaryButton}} onClick={() => handleEditTask(task)}>
                    <Pencil size={16} />
                  </button>
                  <button style={{...styles.button, ...styles.dangerButton}} onClick={() => handleDeleteTask(task.id)}>
                    <Trash2 size={16} />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDialogOpen && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialog}>
            <h2>Edit Task</h2>
            <form style={styles.form}>
              <input
                style={styles.input}
                type="text"
                placeholder="Task title"
                value={currentTask?.title || ''}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              />
              <input
                style={styles.input}
                type="text"
                placeholder="Task description"
                value={currentTask?.description || ''}
                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              />
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="edit-task-completed"
                  checked={currentTask?.completed || false}
                  onChange={(e) => setCurrentTask({ ...currentTask, completed: e.target.checked })}
                />
                <label htmlFor="edit-task-completed">Completed</label>
              </div>
              <div style={styles.dialogActions}>
                <button style={{...styles.button, ...styles.primaryButton}} onClick={handleUpdateTask}>Save changes</button>
                <button style={{...styles.button, ...styles.secondaryButton}} onClick={() => setIsDialogOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagementApp;