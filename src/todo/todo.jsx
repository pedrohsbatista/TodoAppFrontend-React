import React, { Component } from "react"
import Axios from "axios"
import PageHeader from "../template/pageHeader"
import TodoForm from "./todoForm"
import TodoList from "./todoList"

const url = "http://localhost:3003/api/todos"

export default class Todo extends Component {
    constructor(props) {
        super(props)
        
        this.state = { description: '', list: [] }
        
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)   
        this.handleRemove = this.handleRemove.bind(this)  
        
        this.refresh()
    }

    handleAdd(){
        const description = this.state.description;
        Axios.post(url, { description })
                  .then(resp => this.refresh());

    }

    handleChange(e){
        this.setState({...this.setState, description: e.target.value})
    }

    handleRemove(todo) {
        Axios.delete(`${url}/${todo._id}`)
                    .then(resp => this.refresh())
    }

    refresh() {
        Axios.get(`${url}?sort=createdAt`)
                  .then(resp => this.setState({...this.state, description: '', list: resp.data}))
    }

    render() {
        return(
            <div>
                <PageHeader name="Tarefas" small="Cadastros" />
                <TodoForm description={this.state.description} handleAdd={this.handleAdd} handleChange={this.handleChange} />
                <TodoList list={this.state.list} handleRemove={this.handleRemove}/>
            </div>
        )
    }
}