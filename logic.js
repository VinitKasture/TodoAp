const userData = document.querySelector("#userInput");
const submitbtn = document.querySelector("#submit");
const deleteBtn = document.querySelector(".actions .delete");
const editBtn = document.querySelector(".actions .edit");
let Tasks = document.getElementById("tasks")

showTasks();

//when user click on submit button
submitbtn.onclick = (event) => {
    event.preventDefault();
    LoadData();
    let userEnteredValue = userData.value; //getting input field value
    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("Task", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks();
};


function showTasks() {
    Tasks.innerHTML = ""
    LoadData();
    listArray.forEach((value, index) => {
        let newTask = `
                        <div class="task">
                            <div class="content">
                                <input type="text" class="tasklist" id="${value}" value="${value}" readonly />
                            </div>
                            <div class="actions">
                                <button class="edit" onclick="UpdateValue(this,${index})">Edit</button>
                                <button class="delete" onclick="deleteTask(${index})">Delete</button>
                            </div>
                        </div> `;
        Tasks.innerHTML += newTask
    });
    userData.value = ""; //once task added leave the input field blank
}


function UpdateValue(value, index) {
    let inputField = value.parentNode.parentNode.children[0].children[0]
    if (value.innerHTML == "Edit") {
        inputField.removeAttribute('readonly')
        value.innerHTML = "Update"
    } else {
        value.innerHTML = "Edit"
        listArray[index] = inputField.value
        inputField.setAttribute('readonly', true)
        localStorage.setItem("Task", JSON.stringify(listArray)); //transforming js object into a json string
    }
}

function deleteTask(index) {
    listArray.splice(index, 1);
    localStorage.setItem("Task", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks();
}

function LoadData() {
    let getLocalStorageData = localStorage.getItem("Task"); //getting localstorage
    if (getLocalStorageData == null) {
        //if localstorage has no data
        listArray = []; //create a blank array
    } else {
        listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    }
}