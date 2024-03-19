/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getCompletedTasksByCategory } from '../../utils/data/taskData';
import { getSingleGoal } from '../../utils/data/goalData';
import { createJournal } from '../../utils/data/journalData';

const JournalEntryForm = ({ show, onHide, categoryId }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [options, setOptions] = useState([]);
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const [entry, setEntry] = useState({
    initialThoughts: '',
    taskReflection: '',
    learned: '',
    doDifferently: '',
    takeAway: '',
  });

  useEffect(() => {
    if (categoryId) {
      setIsLoading(true);
      getCompletedTasksByCategory(categoryId)
        .then((tasks) => {
          const taskOptions = tasks.map((task) => ({
            value: task.id,
            label: task.task,
          }));
          setOptions(taskOptions);
          return getSingleGoal(categoryId);
        })
        .then((goalData) => {
          console.log('Fetched goal data:', goalData);
          setGoal(goalData.id);
        })
        .catch((error) => {
          console.error('Failed to fetch data:', error);
          setError('Failed to fetch data');
        })
        .finally(() => setIsLoading(false));
    }
  }, [categoryId]);

  const handleInputChange = (fieldName, value) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal) {
      console.error('Goal is not defined at the time of submission.');
      return;
    }
    const submissionData = {
      ...entry,
      hardestTasks: selectedTasks.map((option) => option.value),
      user: user.id,
      goal,
    };

    createJournal(submissionData, user.id)
      .then(() => {
        console.log('Journal entry created successfully');
        onHide();
        router.push(`/categories/${categoryId}`);
      })
      .catch((error) => console.error('Failed to create journal entry:', error));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Congratulations on achieving your goal! Let&apos;s reflect on your journey.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Initial Thoughts</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={entry.initialThoughts}
              onChange={(e) => handleInputChange('initialThoughts', e.target.value)}
              placeholder="Describe your initial feelings upon completing this goal. What emotions are you experiencing right now?"
            />
          </Form.Group>
          <Form.Label>What were the harderst tasks to accomplish when achieving this goal?</Form.Label>
          <Select
            isMulti
            name="hardestTasks"
            options={options}
            value={selectedTasks}
            onChange={setSelectedTasks}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <Form.Group>
            <Form.Label>Thoughts on Selected Tasks</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={entry.taskReflection}
              onChange={(e) => handleInputChange('taskReflection', e.target.value)}
              placeholder="For each of the tasks you've selected, please share why it was challenging and how you addressed these challenges."
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>What I Learned</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={entry.learned}
              onChange={(e) => handleInputChange('learned', e.target.value)}
              placeholder="Reflecting on these challenges, what valuable lessons have you learned?"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>What I Would Have Done Differently</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={entry.doDifferently}
              onChange={(e) => handleInputChange('doDifferently', e.target.value)}
              placeholder="Knowing what you know now, what would you have done differently in approaching these tasks?"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Biggest Takeaway</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={entry.takeAway}
              onChange={(e) => handleInputChange('takeAway', e.target.value)}
              placeholder="Considering your entire journey towards this goal, what is your biggest takeaway?"
            />
          </Form.Group>
          <Button style={{ marginTop: '20px', marginBottom: '10px' }} variant="outline-dark" type="submit">
            Submit Entry
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JournalEntryForm;
