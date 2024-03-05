import { useEffect, useState } from 'react';
import { getGoals } from '../../utils/data/goalData';
import GoalCard from '../../components/goals/GoalCard';

function Goal() {
  const [goals, setGoals] = useState([]);

  const getAllGoals = () => {
    getGoals().then((data) => {
      setGoals(data);
    });
  };

  useEffect(() => {
    getAllGoals();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>categories</h1>
      <article className="goals">
        {goals?.map((goal) => (
          <section key={`goal--${goal.id}`} className="goal">
            <GoalCard goalObj={goal} onUpdate={getAllGoals} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Goal;
