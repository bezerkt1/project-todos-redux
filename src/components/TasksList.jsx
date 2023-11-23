/*
List all todos (maybe separate done and todo?)
Add and remove tasks (edit also?)
Show count of tasks (todo/done/total?)
Complete all button
Add filters
*/
"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Table, Button } from "flowbite-react";
import Task from "./Task";
import TaskModal from "./TaskModal";
import { completeAll, clearTasks } from "../reducers/tasksSlice";

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
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            <Checkbox
              checked={allDone}
              onChange={() => {
                dispatch(completeAll());
              }}
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
        <Button color="warning" onClick={() => dispatch(clearTasks())}>
          Delete all
        </Button>
      </div>
    </>
  );
};

export default TaskList;
