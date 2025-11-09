// Selcet DOM Element
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')


// try to load saved todos from local storage (id any) 
const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse (saved) : [];


function SaveTodos (){
//    Save cuurent todos arry to localstorang 
     localStorage.setItem('todos', JSON.stringify(todos));
}


// Create a dom node for a tod obejct and append it to the list 
function CreateTodoNode(todo, index){
     const li = document.createElement('li');

    //  checkbox to toggle complection 
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked= !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        // TODO visual feedback: stricke-throgh when complted 
        SaveTodos();


    })

    // Text of the todo 
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px' ;
    if(todo.completed) {
        textSpan.style.textDecoration = todo.completed? 'line-through':  "";
        SaveTodos

    }
    
        // Add double-click event listener to edit todo 
        textSpan.addEventListener("dblclick", () =>{
            const newText = prompt("Edit todo", todo.text);
            if(newText !== null) {
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                SaveTodos();
            }
        })
        // Delete todo button 
       const delBtn = document.createElement('button');
       delBtn.textContent = 'Delete';
       delBtn.addEventListener('click', () =>{
        todos.splice(index, 1 );
        render();
        SaveTodos();
       }) 

       li.appendChild(checkbox);
       li.appendChild(textSpan);
       li.appendChild(delBtn);
       return li
    
    
}    



// Render the whole todo list from todos array 
function render(){
        list.innerHTML = '';

        // Recreate each item 
        todos.forEach((todo, index) => {
            const node = CreateTodoNode(todo, index);
            list.append(node)
        });
} 


function addTodo(){
    const text = input.value.trim();
    if(!text) {
        return
    }


// push a new todo object 
todos.push({text, completed: false});
input.value = '';
SaveTodos();
render();

}

addBtn.addEventListener("click", addTodo);
input.addEventListener('keydown', (e) => {
    if(e.key == 'Enter')
        addTodo();
})
render();