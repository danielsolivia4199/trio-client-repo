import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TaskCard from '../../components/tasks/TaskCard';
import { getSingleGoal, updateGoal, completeGoal } from '../../utils/data/goalData';
import { getTasksByCategory, deleteTask, completeTask } from '../../utils/data/taskData';
import JournalEntryModal from '../../components/journals/JournalModal';

const GoalDetails = () => {
  const [goalDetails, setGoalDetails] = useState(null);
  const [editableGoal, setEditableGoal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      getSingleGoal(id)
        .then((data) => {
          setGoalDetails(data);
          setEditableGoal(data.goal);
          return getTasksByCategory(data.category.id);
        })
        .then((tasksData) => {
          setTasks(tasksData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedDate = new Date().toISOString().split('T')[0];
      const payload = { ...goalDetails, goal: editableGoal, goal_created: updatedDate };
      await updateGoal(payload, payload.id);
      setShowModal(false);
      setGoalDetails(payload);
      console.log('Goal updated successfully');
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  if (loading) {
    return <p>Loading goal details...</p>;
  }

  if (!goalDetails) {
    return <p>Goal details not found.</p>;
  }

  const categoryId = goalDetails.category.id;

  const completeGoalHandler = async (goalId) => {
    try {
      await completeGoal(goalId);
      console.log('Goal completed successfully');
      setShowJournalModal(true);
    } catch (error) {
      console.error('Error completing goal:', error);
    }
  };

  const handleJournalSubmit = async (journalData) => {
    console.log(journalData);
    setShowJournalModal(false);
  };

  const handleEditTask = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      console.log('Task deleted successfully');
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);
      console.log('Task completed successfully');
      setTasks((prevTasks) => prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, complete: true };
        }
        return task;
      }));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <>
      <div>
        <h1 style={{ marginTop: '30px', marginBottom: '10px' }}>{goalDetails.category.category_name}</h1>
        <h2>{goalDetails.goal ? goalDetails.goal : 'Focused on tasks: No specific goal set.'}</h2>
        <div className="home-btn">
          <Button variant="success" onClick={() => completeGoalHandler(goalDetails.id)}>
            Complete and Log Goal
          </Button>
          <JournalEntryModal
            show={showJournalModal}
            onHide={() => setShowJournalModal(false)}
            onSubmit={handleJournalSubmit}
            categoryId={goalDetails.category.id}
          />
          <Button className="changegoalbtn" variant="outline-dark" onClick={toggleModal}>Change Goal</Button>
        </div>
        <Modal className="modal" show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>New {goalDetails.category.category_name} Goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formGoalText">
                <Form.Label>Establish a new goal to concentrate on, or opt to leave this blank and prioritize your tasks for now.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What would you like to focus on?"
                  value={editableGoal}
                  onChange={(e) => setEditableGoal(e.target.value)}
                />
              </Form.Group>
              <Button style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px' }} variant="outline-dark" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <article className="tasks">
          <h2 className="task-header" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>to-do</h2>
          <div className="grid">
            {tasks.filter((task) => !task.complete).map((task) => (
              <section key={`task--${task.id}`} className="task-cards">
                <TaskCard
                  taskObj={task}
                  onUpdate={() => getTasksByCategory(categoryId)}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                />
              </section>
            ))}
          </div>
        </article>
        <div className="home-btn">
          <Link href={`/tasks/new?categoryId=${categoryId}`} passHref>
            <Button variant="outline-dark" type="button" size="lg" className="home-btn" style={{ marginTop: '30px', marginBottom: '20px' }}>Add Task</Button>
          </Link>
        </div>
        <article className="tasks">
          <h2 className="task-header" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>completed tasks</h2>
          <div className="grid">
            {tasks.filter((task) => task.complete).map((task) => (
              <section key={`task--${task.id}`} className="task">
                <TaskCard
                  taskObj={task}
                  onUpdate={() => getTasksByCategory(categoryId)}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                />
              </section>
            ))}
          </div>
        </article>
      </div>
    </>
  );
};

export default GoalDetails;
