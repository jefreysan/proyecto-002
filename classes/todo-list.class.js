import { Todo } from ".";

export class TodoList {

    constructor(){
       // this.todos = [];
        this.cargarLocalStorage();
    }
   
    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();

    }

    eliminarTodo(id){
        console.log("eliminar",id);
        //console.log("eliminar",todo.id);

      this.todos =  this.todos.filter(todo => todo.id !=id);
      this.guardarLocalStorage();

    }

    marcarCompletado(id){
        for(const todo of this.todos){
             console.log(id,todo.id);
            if(todo.id==id){
                console.log("ANTES",todo.completado);
                todo.completado = !todo.completado;
                console.log("DESPUES",todo.completado);
                this.guardarLocalStorage();
                break;
            }
        }

    }

    eliminarCompletado(){
        //TODOS LOS QUE NO ESTAN COMPLETADOS
        this.todos =  this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos));

    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo'))
         ? this.todos = JSON.parse(localStorage.getItem('todo'))
         : [];
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}