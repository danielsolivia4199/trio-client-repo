import { clientCredentials } from '../client';

const getJournals = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/journals`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleJournal = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/journals/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createJournal = (journal, userId) => new Promise((resolve, reject) => {
  const payload = {
    ...journal,
    user: userId,
  };
  fetch(`${clientCredentials.databaseURL}/journals`, {
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

export {
  getJournals, getSingleJournal, createJournal,
};
