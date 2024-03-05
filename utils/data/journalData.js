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

const createJournal = (journal, user) => new Promise((resolve, reject) => {
  const payload = {
    ...journal,
    user,
  };
  console.log('Final payload being sent:', JSON.stringify(payload));
  fetch(`${clientCredentials.databaseURL}/journals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('Final payload being sent:', JSON.stringify(payload));
        console.error('Server responded with an error status:', response.status);
        return response.json().then((errorData) => reject(errorData));
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Fetch error:', error);
      reject(error);
    });
});

export {
  getJournals, getSingleJournal, createJournal,
};
