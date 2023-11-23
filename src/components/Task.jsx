/*
Mark task as completed
Add timestamp (created and due date)
Add categories
Make Task groups/projects
*/
import { useDispatch } from "react-redux";
import { Checkbox, Table, Button } from "flowbite-react";
import TaskModal from "./TaskModal";
import { removeTask, toggleDone } from "../reducers/tasksSlice";

const Task = ({ index, name, category, created, due, isDone }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4">
          <Checkbox
            checked={isDone}
            onChange={() => dispatch(toggleDone(index))}
          />
        </Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{category}</Table.Cell>
        <Table.Cell>{created && new Date(created).toDateString()}</Table.Cell>
        <Table.Cell>{due && new Date(due).toDateString()}</Table.Cell>
        <Table.Cell>
          <div className="flex gap-2">
            <TaskModal index={index} />
            <Button color="warning" onClick={() => dispatch(removeTask(index))}>
              Delete
            </Button>
          </div>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default Task;
