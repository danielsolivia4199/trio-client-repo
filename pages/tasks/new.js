import TaskForm from '../../components/tasks/TaskForm';
import { useAuth } from '../../utils/context/authContext';

const NewTask = () => {
  const { user } = useAuth();
  return (
    <div>
      <TaskForm user={user} />
    </div>
  );
};

export default NewTask;
