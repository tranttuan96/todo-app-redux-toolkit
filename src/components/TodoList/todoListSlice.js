// const initState = [
//     {
//         id: 1,
//         name: 'Learn Redux',
//         completed: false,
//         priority: 'High'
//     },
//     {
//         id: 2,
//         name: 'Learn Redux Tookit',
//         completed: true,
//         priority: 'Medium'
//     },
//     {
//         id: 3,
//         name: 'Learn Java',
//         completed: false,
//         priority: 'Low'
//     },

// ]

// const todoListReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'todoList/addTodo':
//             return [...state, action.payload]
//         case 'todoList/todoCompletedChange':
//             return state.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
//         default:
//             return state
//     }
// }

// export default todoListReducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {status: 'idle', todos: []},
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        todoCompletedChange: (state, action) => {
            const currentTodo = state.find(todo => todo.id === action.payload)
            if(currentTodo) {
                currentTodo.completed = !currentTodo.completed
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, (state,action) => {
            state.status = 'loading';

        }).addCase(fetchTodos.fulfilled, (state,action) => {
            state.status = 'idle';
            state.todos = action.payload;
        }).addCase(addNewTodo.fulfilled, (state,action) => {
            // state.status = 'idle';
            state.todos.push(action.payload);
        }).addCase(updateTodo.fulfilled, (state,action) => {
            const currentTodo = state.todos.find(todo => todo.id === action.payload)
            if(currentTodo) {
                currentTodo.completed = !currentTodo.completed
            }
        })
    }

});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch('/api/todos');
    const data = await res.json()
    return data.todos;
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
    const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
    });
    const data = await res.json()
    return data.todos;
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
    const res = await fetch('/api/updateTodo', {
        method: 'POST',
        body: JSON.stringify(updatedTodo)
    });
    const data = await res.json()
    return data.todos;
})


export default todoListSlice

// export function addTodos(todo) { // thunk function - thunk action
//     return function addTodosThunk(thunk, getState) {
//         console.log(todo)
//     }
// }