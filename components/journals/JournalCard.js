import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function JournalCard({ journalObj }) {
  return (
    <Card className="journal-card">
      <Card.Header>entry #{journalObj.id}</Card.Header>
      <Card.Text>{journalObj.goal.goal}</Card.Text>
      <Card.Text>{new Date(journalObj.goal.goal_created).toLocaleDateString()}-{new Date(journalObj.goal.completed_on).toLocaleDateString()}</Card.Text>
      <Link href={`/journal/${journalObj.id}`} passHref>
        <Button variant="danger" as="a" style={{ marginRight: '4px' }}>Details</Button>
      </Link>
    </Card>
  );
}

JournalCard.propTypes = {
  journalObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    goal: PropTypes.shape({
      goal: PropTypes.string,
      goal_created: PropTypes.string,
      completed_on: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
