import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class TodoStore extends EventEmitter {
  constructor() {
    super();

    this.todos = [
      // {
      //   id: 16561,
      //   text: 'hello'
      // },
      // {
      //   id: 16562,
      //   text: 'another todo'
      // },
    ];
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text
    });

    this.emit('change');
  }

  deleteTodo(id){
    this.todos = this.todos.filter((elm)=>{
      return (elm.id != id);
    });
    this.emit('change');
  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch (action.type) {
      case 'CREATE_TODO': {
        this.createTodo(action.text);
        break;
      }
      case 'DELETE_TODO': {
        this.deleteTodo(action.id);
        break;
      }
    }
  }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
export default todoStore;
