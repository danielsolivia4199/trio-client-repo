import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function GoalCard({ goalObj }) {
  return (
    <Card className="goal-card">
      <Card.Header>{goalObj.category.category_name}</Card.Header>
      <Card.Body>
        <Card.Title>{goalObj.goal}</Card.Title>
        <Card.Text>{goalObj.goal_created}</Card.Text>
        <Link href={`/goals/${goalObj.id}`} passHref>
          <Button variant="danger" as="a" style={{ marginRight: '4px' }}>Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

GoalCard.propTypes = {
  goalObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    goal: PropTypes.string.isRequired,
    goal_created: PropTypes.string.isRequired,
    category: PropTypes.shape({
      category_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
