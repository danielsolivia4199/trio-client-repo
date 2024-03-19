import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function GoalCard({ goalObj }) {
  return (
    <Card className="goal-card">
      <Card.Header>{goalObj.category.category_name}</Card.Header>
      <Card.Body>
        <Card.Title>{goalObj.goal ? goalObj.goal : 'No goal created, focus on tasks'}</Card.Title>
        {goalObj.goal && (
          <Card.Text>Created On: {new Date(goalObj.goal_created).toLocaleDateString()}</Card.Text>
        )}
        <Link href={`/categories/${goalObj.id}`} passHref>
          <Button variant="outline-dark" as="a" style={{ marginRight: '4px' }}>Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

GoalCard.propTypes = {
  goalObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    goal: PropTypes.string,
    goal_created: PropTypes.string,
    category: PropTypes.shape({
      category_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
