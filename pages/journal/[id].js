/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
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
    <div className="my-4">
      <Card className="mb-3">
        <Card.Header as="h1">Entry #{journalDetails.id}</Card.Header>
        <Card.Body>
          <Card.Title as="h2">Goal: {journalDetails.goal.goal}</Card.Title>
          <Card.Text>My initial thoughts: {journalDetails.initial_thoughts}</Card.Text>
        </Card.Body>
      </Card>
      {journalDetails.hardest_tasks && (
        <Card className="mb-3">
          <Card.Header as="h3">Hardest Tasks</Card.Header>
          <ListGroup variant="flush">
            {journalDetails.hardest_tasks.map((task, index) => (
              <ListGroup.Item key={index}>{task.task}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
      <Card className="mb-3">
        <Card.Body>
          <Card.Text>Task Reflection: {journalDetails.task_reflection}</Card.Text>
          <Card.Text>Learned: {journalDetails.learned}</Card.Text>
          <Card.Text><strong>What I would do differently:</strong> {journalDetails.do_differently}
          </Card.Text>
          <Card.Text>Biggest take away: {journalDetails.take_away}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JournalDetails;
