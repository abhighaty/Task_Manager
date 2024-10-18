const BASE_URL = 'http://127.0.0.1:8000/api/tasks/';

export async function createTask(taskData) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

export async function getTasks() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}


export async function getTask(taskId) {
  try {
    const response = await fetch(`${BASE_URL}${taskId}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
  }
}

export async function updateTask(task) {
    try {
      const response = await fetch(`${BASE_URL}${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error; 
    }
  }

export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${BASE_URL}${taskId}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
  }
}
