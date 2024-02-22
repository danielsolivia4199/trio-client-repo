import { clientCredentials } from '../client';

const getJournalTasks = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/journaltasks`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getJournalTasks;
