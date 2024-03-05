import { clientCredentials } from '../client';

const getGoals = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/goals`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGoal = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/goals/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGoal = (goal, userId) => new Promise((resolve, reject) => {
  const payload = {
    ...goal,
    user: userId,
  };
  fetch(`${clientCredentials.databaseURL}/goals`, {
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

const updateGoal = (payload, uid) => new Promise((resolve, reject) => {
  if (!payload.id) {
    console.error('Goal ID is undefined, cannot update goal.');
    return;
  }
  const updatedPayload = {
    ...payload,
    user: payload.user || uid,
  };

  fetch(`${clientCredentials.databaseURL}/goals/${payload.id}`, {
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

const deleteGoal = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/goals/${id}`, {
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

const completeGoal = async (goalId) => {
  const response = await fetch(`${clientCredentials.databaseURL}/goals/${goalId}/complete-goal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to complete goal');
  }

  return response.json();
};

export {
  getGoals, getSingleGoal, createGoal, updateGoal, deleteGoal, completeGoal,
};
