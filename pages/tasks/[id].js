import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTask } from '../../utils/data/taskData';
import TaskForm from '../../components/tasks/TaskForm';

export default function EditTask() {
  const [editTask, setEditTask] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleTask(id).then(setEditTask);
    }
  }, [id]);

  return (
    <>
      <TaskForm taskObj={editTask} />
    </>
  );
}
