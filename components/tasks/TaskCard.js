import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function TaskCard({ taskObj }) {
  return (
    <Card className="task-card">
      <Card.Header>{taskObj.task}</Card.Header>
      <Card.Body>
        <Card.Text>{taskObj.difficulty}</Card.Text>
        <Card.Text>{taskObj.category.category_name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    category: PropTypes.shape({
      category_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
