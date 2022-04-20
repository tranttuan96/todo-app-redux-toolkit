import { createSelector } from '@reduxjs/toolkit'

// export const todoListSelector = (state) => {
//     const searchText = searchTextSelector(state)

//     const todosRemaining = state.todoList.filter((todo) => {
//         return todo.name.includes(searchText)
//     })
//     return todosRemaining
// };
// export const searchTextSelector = (state) => state.filters.search;

export const searchTextSelector = (state) => state.filters.search;
export const statusFilterSelector = (state) => state.filters.status;
export const prioritiesFilterSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList.todos;

// reselect
export const todosRemainingSelector = createSelector(todoListSelector, searchTextSelector, statusFilterSelector, prioritiesFilterSelector, (todoList, searchText, status, priorities) => {
    // console.log(todoList)
    const todosRemaining = todoList.filter((todo) => {
        if (status === 'All') {
            if (priorities.length === 0) {
                return todo.name.toLowerCase().includes(searchText.toLowerCase())
            }
            return todo.name.toLowerCase().includes(searchText.toLowerCase()) && priorities.includes(todo.priority)
        }
        if (priorities.length === 0) {
            return todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
                (status === 'Completed' ? todo.completed : !todo.completed)
        }
        return todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (status === 'Completed' ? todo.completed : !todo.completed) && priorities.includes(todo.priority)
    })
    return todosRemaining
})
