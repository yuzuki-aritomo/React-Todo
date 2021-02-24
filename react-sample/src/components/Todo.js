import React from 'react'

class Todo extends React.Component{
    render(){
        const {text, completed} = this.props
        return(
            <div>
                <label>
                    <input type="checkbox" checked={completed} onChange={this.handlerChangeCompleted} />
                    { text }
                </label>
                <button onClick={this.handleClickEdit}>編集</button>
                <button onClick={this.handleClickDelete}>削除</button>
            </div>
        )
    }
    handlerChangeCompleted = () =>{
        const {onChange, id, completed} = this.props
        onChange(id, "completed", !completed)
        // console.log(this.props.completed)
    }
    handleClickDelete = () =>{
        const {onDelete, id} = this.props
        onDelete(id)
    }
    handleClickEdit = () =>{
        const {onChange, id, editting} = this.props
        onChange(id, 'editting', !editting)
    }
}

export default Todo;