import { createServer, Model } from "miragejs"

export const setupServer = () => {
    let server = createServer({
        models: {
            todos: Model
        },
        routes() {
            this.get("/api/todos", (schema) => {
                return schema.todos.all();
            })
            this.post("/api/todos", (schema, request) => {
                const payload = JSON.parse(request.requestBody)
                const newTodo = schema.todos.create(payload)
                console.log(schema.todos.all())
                return newTodo;
            })
            this.post("/api/updateTodo", (schema, request) => {
                const id = JSON.parse(request.requestBody)
                const currentTodo = schema.todos.find(id)
                currentTodo.update({completed : !currentTodo.completed})
                return currentTodo
            })
        }
    })
}
