"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Table, Button } from "flowbite-react";
import Task from "./Task";
import TaskModal from "./TaskModal";
import { setAll, clearTasks } from "../reducers/tasksSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    if (
      tasks.tasks.some((task) => {
        return !task.isDone;
      })
    ) {
      setAllDone(false);
    } else {
      setAllDone(true);
    }
  }, [tasks]);

  return (
    <>
      <h1 className="text-xl font-bold text-center my-8">Task List</h1>
      <h3 className="text-l my-2">
        {tasks.tasks.length > 0 &&
          `${tasks.tasks.filter(({ isDone }) => isDone === true).length} / ${
            tasks.tasks.length
          }`}
      </h3>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            <Checkbox
              aria-label="toggleAllDone"
              checked={allDone}
              onChange={() => dispatch(setAll(!allDone))}
            />
          </Table.HeadCell>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>Due</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tasks.tasks.map((task, index) => (
            <Task key={index} index={index} {...task} />
          ))}
        </Table.Body>
      </Table>
      {tasks.tasks.length <= 0 && (
        <h2 className="text-center my-2">
          No tasks currently, start making some!
        </h2>
      )}
      <div className="flex my-8 gap-5 justify-center">
        <TaskModal />
        <Button color="failure" onClick={() => dispatch(clearTasks())}>
          Delete all
        </Button>
      </div>
    </>
  );
};

export default TaskList;
