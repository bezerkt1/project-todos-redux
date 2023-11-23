import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      name: "Shopping",
      isDone: false,
      created: Date.now(),
    },
    {
      name: "Meowing",
      category: "daily",
      isDone: true,
      created: Date.now(),
    },
  ]
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = []
    },
    setTask: (state, action) => {
      if (action.payload.index !== undefined && action.payload.index !== null) {
        state.tasks[action.payload.index] = action.payload.task;
      } else {
        state.tasks.push({...action.payload.task, created: Date.now()});
      }
      
    },
    removeTask: (state, action) => {
      state.tasks.pop(action.payload);
    },
    toggleDone: (state, action) => {
      state.tasks[action.payload].isDone = !state.tasks[action.payload].isDone;
    },
    completeAll: (state) => {
      state.tasks.forEach((task) => {task.isDone = true;});
    }
  },
});

export const { clearTasks, setTask, removeTask, toggleDone, completeAll } = tasksSlice.actions;

export default tasksSlice.reducer;