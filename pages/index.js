import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import TaskCard from '../components/tasks/TaskCard';
import { startNewTrio, getTrioTasks, completeTrioTasks } from '../utils/data/taskData';

const Home = () => {
  const { user } = useAuth();
  const [trioTasks, setTrioTasks] = useState([]);

  useEffect(() => {
    const fetchCurrentTrio = async () => {
      try {
        const tasks = await getTrioTasks();
        setTrioTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch current trio:', error);
      }
    };

    fetchCurrentTrio();
  }, []);

  const handleGenerateTrio = async () => {
    try {
      const tasks = await startNewTrio();
      setTrioTasks(tasks);
    } catch (error) {
      console.error('Failed to generate trio:', error);
    }
  };

  const handleCompleteTrio = async () => {
    try {
      await completeTrioTasks();
      setTrioTasks([]);
      console.log('Trio tasks completed successfully');
      localStorage.removeItem('trioTasks');
    } catch (error) {
      console.error('Failed to complete trio tasks:', error);
    }
  };

  return (
    <div>
      <div className="header-container">
        <h2 className="welcome-message">Welcome, {user.name}!</h2>
      </div>
      <div className="trio-content text-center">
        {trioTasks.length === 0 ? (
          <Button variant="outline-dark" onClick={handleGenerateTrio}>Generate Trio</Button>
        ) : (
          <Button variant="success" onClick={handleCompleteTrio}>Complete Trio Tasks</Button>
        )}
        {trioTasks.length > 0 && (
          <>
            <h1 style={{ marginTop: '30px' }}>Your Current Trio Tasks</h1>
            <div className="tasks-container">
              {trioTasks.map((task) => (
                <div style={{ maxWidth: '500px', margin: '0 auto' }} key={task.id}>
                  <TaskCard taskObj={task} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
