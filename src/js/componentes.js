 import { Todo } from "../../classes";
 import { TodoList } from "../../classes";
//REFERENCIAS EN HTML
const divTodoList = document.querySelector('.todo-list');
//console.log(divTodoList);
 const txtInput = document.querySelector('.new-todo');
 const btnBorrar =document.querySelector('.clear-completed');
 const ulFiltros =document.querySelector('.filters');
 const anchoFiltros = document.querySelectorAll('.filtro');
//INTERPOLACION DE STRING
export const crearTodoHtml = (todo) =>{
  const htmlTodo = 
  //SI TODO.COMPLETADO ES TRUE = COMPLETED CASO CONTRARIO VACIO
  `<li class="${(todo.completado)? 'completed':''}" data-id="${(todo.id)}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado)? 'checked':''}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;

   const div = document.createElement('div');
   div.innerHTML = htmlTodo;
   divTodoList.append(div.firstElementChild);
   return div.firstElementChild;
}


export const todoList = new TodoList;

 txtInput.addEventListener('keyup',( event ) => {

  if(event.keyCode===13 && txtInput.value.length>0){
    console.log(txtInput.value)
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
   //  console.log(todoList);
    crearTodoHtml(nuevoTodo);
    txtInput.value = '';
  }
}); 

divTodoList.addEventListener('click',(event)=>{
//console.log('click');
//console.log(event.target.localName); //LABEL O INPUT O BUTTON
const nombreElemento = event.target.localName;
const todoElemento = event.target.parentElement.parentElement;
const todoID =todoElemento.getAttribute('data-id');
console.log(todoID);
// console.log(todoElemento); 
 if(nombreElemento.includes('input')){
   todoList.marcarCompletado(todoID);
    todoElemento.classList.toggle('completed');
  } else if( nombreElemento.includes('button')){
    todoList.eliminarTodo(todoID);
    divTodoList.removeChild(todoElemento);
  }
 //console.log(todoList);
});

btnBorrar.addEventListener('click',(event)=>{

  todoList.eliminarCompletado();

  for(let i=divTodoList.children.length-1;i>=0;i--){
    const elemento = divTodoList.children[i];
    if(elemento.classList.contains('completed')){
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener('click',(event)=>{
 const filtro = event.target.text;
 anchoFiltros.forEach(elem =>elem.classList.remove('selected'));
 event.target.classList.add('selected');
  if(!filtro) {return;}
  for(const elemento of divTodoList.children ){
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
    switch(filtro){
      case 'Pendientes':
        if(completado){
          elemento.classList.add('hidden');
        }
        break;
        case 'Completados':
          if(!completado){ //SI NO ESTA COMPLETADO
            elemento.classList.add('hidden');
          }
          break;
    }
  }

});