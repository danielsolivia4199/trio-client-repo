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
    <div className="text-center">
      <p>Welcome, {user.name}!</p>
      <Button onClick={handleGenerateTrio}>Generate Trio</Button>
      {trioTasks.length > 0 && (
        <>
          <div>
            <h2>Your Trio Tasks</h2>
            {trioTasks.map((task) => (
              <TaskCard key={task.id} taskObj={task} />
            ))}
          </div>
          <Button variant="success" onClick={handleCompleteTrio}>Complete Trio Tasks</Button>
        </>
      )}
    </div>
  );
};

export default Home;
