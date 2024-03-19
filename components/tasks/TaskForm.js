import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateTask, createTask } from '../../utils/data/taskData';
import { getCategories } from '../../utils/data/categoryData';

const difficulties = [1, 2, 3];

const initialState = {
  category: '',
  task: '',
  difficulty: '',
  repeat: false,
  complete: false,
  trio: false,
};

const TaskForm = ({ taskObj = {} }) => {
  const [currentTask, setCurrentTask] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { categoryId } = router.query;

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        if (isMounted) {
          setCategories(fetchedCategories);

          if (categoryId && categoryId !== currentTask.category) {
            setCurrentTask((prevState) => ({
              ...prevState,
              category: categoryId,
            }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();

    if (taskObj && taskObj.id && isMounted) {
      setCurrentTask({
        ...taskObj,
        category: taskObj.category.id || taskObj.category,
      });
    }

    return () => {
      isMounted = false;
    };
  }, [categoryId, taskObj, currentTask.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTask.id) {
        await updateTask(currentTask.id, currentTask, user.id);
        router.push(`/categories/${currentTask.category}`);
      } else {
        const newTask = await createTask(currentTask, user.id);
        router.push(`/categories/${newTask.category.id}`);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="taskCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="category" value={currentTask.category} onChange={handleChange}>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="taskName">
        <Form.Label>Task</Form.Label>
        <Form.Control type="text" name="task" value={currentTask.task} onChange={handleChange} placeholder="Enter task" />
      </Form.Group>

      <Form.Group controlId="taskDifficulty">
        <Form.Label>Difficulty</Form.Label>
        <Form.Control as="select" name="difficulty" value={currentTask.difficulty} onChange={handleChange}>
          <option value="">Select Difficulty</option>
          {difficulties.map((difficulty, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <option key={index} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        {taskObj.id ? 'Update Task' : 'Add Task'}
      </Button>
    </Form>
  );
};

TaskForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  taskObj: PropTypes.object,
};

export default TaskForm;
