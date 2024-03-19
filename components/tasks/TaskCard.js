/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const TaskCard = ({
  taskObj, onEdit, onDelete, onComplete,
}) => {
  const handleEdit = () => onEdit(taskObj.id);
  const handleDelete = () => onDelete(taskObj.id);
  const handleComplete = () => onComplete(taskObj.id);

  return (
    <Card className="task-card text-light bg-dark">
      <Card.Header>{taskObj.task}</Card.Header>
      <Card.Body>
        <Card.Text>Difficulty: {taskObj.difficulty}</Card.Text>
        <Card.Text>{taskObj.category.category_name}</Card.Text>
        {!taskObj.complete && !taskObj.trio && (
          <div>
            <div>
              <Button variant="outline-dark" onClick={handleEdit}>Edit</Button>
              <Button variant="outline-dark" onClick={handleDelete}>Delete</Button>
            </div>
            <Button className="completebtn" variant="success" onClick={handleComplete}>Complete</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    category: PropTypes.shape({
      category_name: PropTypes.string.isRequired,
    }).isRequired,
    trio: PropTypes.bool.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
};

export default TaskCard;
