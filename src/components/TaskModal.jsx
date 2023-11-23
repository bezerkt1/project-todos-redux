"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Label, Modal, TextInput, Datepicker } from "flowbite-react";
import { setTask } from "../reducers/tasksSlice";

const TaskModal = ({ index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const emptyTask = {
    name: "",
    description: "",
    dueDate: null,
    isDone: false,
  };
  const [taskData, setTaskData] = useState(emptyTask);
  const [isValid, setIsValid] = useState(true);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    if (taskData.name.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [taskData.name]);

  const handleOpen = () => {
    if (index !== undefined) {
      setTaskData(tasks.tasks[index]);
    } else {
      setTaskData(emptyTask);
    }
    setIsOpen(true);
  };

  const handleConfirm = () => {
    dispatch(setTask({ index: index, task: taskData }));
    setIsOpen(false);
  };

  const handleDate = (e) => {
    let data;
    if (e.toDateString() === new Date().toDateString()) {
      const { due, ...rest } = taskData;
      data = rest;
    } else {
      data = {
        ...taskData,
        due: new Date(e).getTime(),
      };
    }
    setTaskData(data);
  };

  return (
    <>
      <Button onClick={() => handleOpen()}>
        {index !== undefined ? `Edit` : `New`}
      </Button>
      <Modal
        dismissible
        show={isOpen}
        size="md"
        onClose={() => setIsOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {index !== undefined ? `Edit task` : `New task`}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taskName" value="Task name" />
              </div>
              <TextInput
                id="taskName"
                value={taskData.name}
                onChange={(event) =>
                  setTaskData({ ...taskData, name: event.target.value })
                }
                required
                color={!isValid && "failure"}
                helperText={!isValid && "Please enter a task name"}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Category" />
              </div>
              <TextInput
                id="category"
                value={taskData.category}
                onChange={(event) =>
                  setTaskData({ ...taskData, category: event.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="due" value="Due date" />
              <Datepicker
                showClearButton
                id="due"
                minDate={new Date()}
                value={
                  taskData.due ? new Date(taskData.due).toDateString() : ""
                }
                onSelectedDateChanged={(event) => handleDate(event)}
              />
            </div>
            <div className="w-full">
              <Button disabled={!isValid} onClick={() => handleConfirm()}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskModal;
