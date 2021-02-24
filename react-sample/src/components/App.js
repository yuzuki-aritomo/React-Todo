import React from 'react'

import Form from './Form'
import Todo from './Todo'
import CheckAll from './CheckAll'
import EditTodo from './EditTodo'

let currentId = 0

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            todos: []
        }
    }
    render(){
        const {todos} = this.state
        return (
            <div>
                <Form onSubmit={this.handleSubmit} />
                <CheckAll allCompleted={
                    todos.length > 0 && todos.every(({completed}) => completed)
                    }
                    onChange={this.handleChangeAllCompleted} />
                <ul>
                    { this.state.todos.map(todo => 
                        <li key={todo.id} >
                            {todo.editting ?(
                                <EditTodo 
                                    text={todo.text} 
                                    id={todo.id} 
                                    onCancel={this.handleChangeTodoAttribute}
                                    onSubmit={this.handleUpdateTodoText}    
                                />
                            ) : (
                                <Todo 
                                    text={todo.text} 
                                    completed={todo.completed} 
                                    id={todo.id} 
                                    onChange={this.handleChangeTodoAttribute} 
                                    onDelete={this.handleClickDelete}
                                />
                            )}
                        </li>) 
                    }
                </ul>
            </div>
        )
    }

    handleSubmit = text => {
        const newTodo = {
            id: currentId,
            text,
            completed: false,
            editting: false,
        };
        const newTodos = [...this.state.todos, newTodo];
        this.setState({ todos: newTodos });
        currentId++;
    };

    handleChangeAllCompleted = completed =>{
        const newTodos = this.state.todos.map(todo=>{
            return{
                ...todo,
                completed,
            }
        })
        this.setState({ todos: newTodos });
    }

    handleClickDelete = id =>{
        const newTodos = this.state.todos.filter(todo => todo.id !== id)
        this.setState({ todos: newTodos })
    }

    handleUpdateTodoText = (id, text) =>{
        const newTodo = this.state.todos.map(todo => {
            if(todo.id === id){
                return{
                    ...todo,
                    text,
                    editting: false,
                }
            }
            return todo;
        });
        this.setState({ todos: newTodo })
    }

    handleChangeTodoAttribute = (id, key, value) =>{
        const newTodos = this.state.todos.map(todo => {
            if( todo.id === id){
                return{
                    ...todo,
                    [key]: value
                }
            }
            return todo;
        })
        this.setState({todos: newTodos})
        // console.log(id, completed);
    }
}

// const App = () => <div>hoge</div>

export default App;