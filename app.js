/*
    This program is creates a todo list based on information
    from the API. This work by getting information form the api
    and displaying it on a HTML page. This program is also capable
    of allowing the user to change or upload new data. Once data is
    updated or added user interface update to show the most 
    recent data.

    completeness:
    displays info       y
    post new info       y
    update screen       y 
    put info or update  y
    delete old entries  y
    display images      y
    button for updates  y

*/
// Needed Varibles
var site = "https://api.vschool.io/mustafa/todo/"
const mainSite ="https://api.vschool.io/mustafa/todo"
const myForm = document.todos
var todo = document.getElementById("todoList")
var editing = false;
var id = 'stuff'
// pulls user inputs and returns an object
function mkObj(){
    const rv = {
        title: myForm.title.value,
        description: myForm.description.value, 
        imgUrl: myForm.imgUrl.value, 
        completed: myForm.completed.checked
    }
    myForm.title.value = ""
    myForm.description.value= "" 
    myForm.imgUrl.value = "" 
    myForm.completed.checked = false
    return rv
}
// clear content
function clear(){
    while(todo.firstChild){
        todo.removeChild(todo.firstChild)
    }
}
// get data => array of object
function getData(){  
    axios.get(mainSite)
        .then(res =>display(res.data)) // objects passed passed to display function
        .catch(err => console.log(err))  
}
// Add new data
function post(newTodo){
    axios.post(mainSite, newTodo)
        .then(res => getData())
        .catch(err => console.log(err))   
}
// delete item => array of object
function del(id){
    // find data
    var placeHolder = site + id
    axios.delete(placeHolder)
        .then(response => getData())
        .catch(error => console.log(error))
}
// update item => array of object
function update(siteHolder, updateData){
    axios.put(siteHolder, updateData)
        .then(res => getData())
        .catch(err => console.log(err))
}
// display content 
function display(data){
    clear()
    // for each object element
    for(let i = 0; i < data.length; i++){
        // create a new list item
        const li = document.createElement('li')
        const h1 = document.createElement("h1")
        const img = document.createElement('img')
        const deleteBtn = document.createElement('button')
        const editBtn = document.createElement('button')
        // const checkBox = document.createElement('input')
        // checkBox.type = "checkbox"
        // if completed do
        if(data[i].completed){
            // strike through data
            h1.innerHTML += data[i].title.strike()
        }else{
            // Or just write the data
            h1.textContent += (data[i].title)
        }
        li.appendChild(h1)
        //li.appendChild(checkBox)
        li.appendChild(deleteBtn)
        li.appendChild(editBtn)
        deleteBtn.textContent = 'Delete'
        editBtn.textContent = 'Edit'
        document.getElementById('todoList').appendChild(li)
        // checkBox.addEventListener('click',()=>{
        //     if(checkBox.checked){
        //         h1.innerHTML.strike()
        //     }

        // })
        editBtn.addEventListener("click", () => {
            console.log("its working")
            myForm.title.value = data[i].title                  
            myForm.description.value = data[i].description
            myForm.imgUrl.value = data[i].imgUrl
            myForm.description.value = data[i].checked
            editing = true
            id = data[i]._id
        } )
        deleteBtn.addEventListener("click", () => {
            console.log("its working")
            del(data[i]._id)
            console.log(data[i]._id)
        } )
        if(data[i].imgUrl){
            img.src= data[i].imgUrl
            li.appendChild(img)
        }
    }
}
getData()
// event listener add/update content
myForm.addEventListener("submit", function(event){
    event.preventDefault()
    const newTodo = mkObj()
    if(editing){
        var temp_site = site + id
        update(temp_site, newTodo)
    }else{
        post(newTodo)
    }
    console.log(newTodo.title)
    editing = false
    myForm.title.value = ""
    myForm.description.value = ""
    myForm.completed.value = false

})