 //const axios = require("axios");
// axios.get('https://api.vschool.io/shaheed/todo/').then(response => {
//     console.log(response.data)
//   }).catch(error => {
//     console.log(error)
//   });
// const newTodo = {
//     title: "My 1st Todo",
//     description: "This is my 1rd entry",
//     imgUrl: "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
// // }
// axios.get('https://api.vschool.io/shaheed/todo/all', newTodo)
//   .then(res => console.log(res.data))
//   .catch(err => console.log(err))
const fruit2 = ["banana", "orange", "apple", "kiwi", "pear", "peach"]
function everyOtherFruit(arrFruit2){
  var temporaryArray = []
  for (var i = 1; i < arrFruit2.length; i += 2){
    temporaryArray.push(arrFruit2[i])
  }
  return temporaryArray.join(", ")
}
console.log(everyOtherFruit(fruit2))

var todo = document.getElementById("todoList")
var site = "https://api.vschool.io/mustafa/todo/"
const myForm = document.todos
const gID = null;
// Get entries and displays on the webpage
function getData(){
    axios.get("https://api.vschool.io/mustafa/todo")
        .then(res => display(res.data))
        .catch(err => console.log(err))
}
// function getData(show){
//     if(show){
//         getData()
//     }else{   
//         axios.get("https://api.vschool.io/mustafa/todo")
//             .then(res => display(res.data))
//             .catch(err => console.log(err))
//     }
// }

//clear the page
function clear(){
    while(todo.firstChild){
        todo.removeChild(todo.firstChild)
    }
}

// Add an entry to the page
function post(newTodo){
    axios.post("https://api.vschool.io/mustafa/todo", newTodo)
        .then(res => getData())
        .catch(err => console.log(err))
    clear()
}
// Get ID
function getID(title){
    axios.get("https://api.vschool.io/mustafa/todo")
        .then(res => catcher(res.data, title))
        .catch(err => console.log(err))
    
}
// Puter update the data on the list
function puter(update){
    axios.put(siteA, update)
        .then(res => display(res.data))
        .catch(err => console.log())

    
}
// Catcher function searches the object for a specific title
// if title exist it returns the address 
function catcher(data, title){
    var id;
    // In this loop I search for the specific title
    for(let i = 0; i < data.length; i++){
        // if it exist create an address string
        if(title == data[i].title){
            id = data[i]._id;
            var siteA = site + id; // this is the address string
            console.log(siteA) // Test log
        }
    }  
}

// Prints to page
function display(data){
    clear()
    // for each object element
    for(let i = 0; i < data.length; i++){
        // create a new list item
        const li = document.createElement('li')
        // if completed
        if(data[i].completed){
            // create a strik tag
            li.innerHTML += "<s>"
            // add text data for the title
            li.textContent = data[i].title
            li.innerHTML += "<s>"
            li.innerHTML += " <input type = 'checkbox' value = true></input>"
            document.getElementById('todoList').appendChild(li)
        }else{
            li.textContent = data[i].title
            li.innerHTML += " <input type = 'checkbox'></input>"
            document.getElementById('todoList').appendChild(li)
        }
    }
}
function checker(data, newTodo){
    for(let i = 0; i<data.length; i++){
        if(newTodo.title === data[i].title){
             gID = data[i]._id;
             site += gID;
             axios.put(site, newTodo)
                .then(res => display(res.data))
                .catch(err => console.log(err))
        }
        else{
        post(newTodo)
        }
    }   
}
// Begin the program
getData()

myForm.addEventListener("submit", function(event){
    event.preventDefault();
    const newTodo = {
        title: myForm.item.value,
        price: myForm.price.value,
        description: myForm.description.value,
        imgUrl: myForm.image.value,
        completed: myForm.completed.value
    } 
    checker(newTodo)
    myForm.item.value = ""
    myForm.description.value = ""   
})
getID("My 1rd Todo")
