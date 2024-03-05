import { clientCredentials } from '../client';

const getTasks = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTask = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createTask = (task, userId) => new Promise((resolve, reject) => {
  const payload = {
    ...task,
    user: userId,
  };
  fetch(`${clientCredentials.databaseURL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTask = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.status === 204 || response.headers.get('content-length') === '0' ? null : response.json();
    })
    .then(resolve)
    .catch(reject);
});

const deleteTask = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network Response Error');
      }
      resolve();
    })
    .catch(reject);
});

const getTasksByCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks?category=${categoryId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCompletedTasksByCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks?category=${categoryId}&complete=1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const completeTask = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${id}/mark-complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify({ complete: 1 }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const startNewTrio = async () => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/tasks/start-trio`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error('Failed to generate trio:', error);
    throw error;
  }
};

const getTrioTasks = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/trio_tasks`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const completeTrioTasks = async () => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/tasks/complete-trio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error('Failed to complete trio tasks');
    }
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error completing trio tasks:', error);
    throw error;
  }
};

export {
  getTasks, getSingleTask, createTask, updateTask, deleteTask, getTasksByCategory, getCompletedTasksByCategory, completeTask, startNewTrio, getTrioTasks, completeTrioTasks,
};
