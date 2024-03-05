import { clientCredentials } from '../client';

const getSingleJournalTasks = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/journaltasks/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getSingleJournalTasks;
