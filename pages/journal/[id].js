import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleJournal } from '../../utils/data/journalData';

const JournalDetails = () => {
  const [journalDetails, setJournalDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleJournal(id)
        .then((data) => {
          setJournalDetails(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading journal details...</p>;
  }

  if (!journalDetails) {
    return <p>Journal details not found.</p>;
  }

  return (
    <div>
      <h1>entry #{journalDetails.id}</h1>
      <h2>Goal: {journalDetails.goal.goal}</h2>
      <p>My initial thoughts: {journalDetails.initial_thoughts}</p>
      {journalDetails.hardest_tasks && (
        <>
          <h3>Hardest Tasks:</h3>
          <ul>
            {journalDetails.hardest_tasks.map((task, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{task.task}</li>
            ))}
          </ul>
        </>
      )}
      <p>Task Reflection: {journalDetails.task_reflection}</p>
      <p>What I learned: {journalDetails.learned}</p>
      <p>What I would do differently: {journalDetails.do_differently}</p>
      <p>My biggest take away: {journalDetails.take_away}</p>
    </div>
  );
};

export default JournalDetails;
