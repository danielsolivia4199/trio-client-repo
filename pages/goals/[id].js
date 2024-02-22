import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TaskCard from '../../components/tasks/TaskCard';
import { getSingleGoal } from '../../utils/data/goalData';
import { getTasksByCategory } from '../../utils/data/taskData';

const GoalDetails = () => {
  const [goalDetails, setGoalDetails] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleGoal(id)
        .then((data) => {
          setGoalDetails(data);
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
  }, [id]);

  if (loading) {
    return <p>Loading goal details...</p>;
  }

  if (!goalDetails) {
    return <p>Goal details not found.</p>;
  }

  return (
    <div>
      <h1>{goalDetails.goal}</h1>
      <p>Created On: {new Date(goalDetails.goal_created).toLocaleDateString()}</p>
      <h2>Category: {goalDetails.category.category_name}</h2>
      <article className="goals">
        {tasks?.map((task) => (
          <section key={`task--${task.id}`} className="task">
            <TaskCard taskObj={task} onUpdate={getTasksByCategory} />
          </section>
        ))}
      </article>
    </div>
  );
};

export default GoalDetails;
