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

const updateTask = (payload, uid) => new Promise((resolve, reject) => {
  const updatedPayload = {
    ...payload,
    user: payload.user || uid,
  };

  fetch(`${clientCredentials.databaseURL}/tasks/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(updatedPayload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
      }
      return response.json();
    })
    .then((data) => resolve(data))
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

export {
  getTasks, getSingleTask, createTask, updateTask, deleteTask, getTasksByCategory,
};
