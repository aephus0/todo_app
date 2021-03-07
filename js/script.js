console.log("Nu flyger vi!")

let totos = [];
let listroot = document.querySelector("#list-root");
let listform = document.querySelector("[data-list-form]");
let listinput = document.querySelector("[data-list-input]");

listform.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (listinput.value.trim() === "") {
        return;
    }
    totos.push(listinput.value.trim());
    updatelist();
    listinput.value("");
    
});

function totolist(item) {
    let list = document.createElement("ul");
    item.forEach((item) => {
        let todolistitem = document.createElement("li");
        todolistitem.innerText = item;
        todolistitem.classList.add("todo-list-item");
        todolistitem.addEventListener("click", removeitem);
        list.append(todolistitem);
    });
    return list;
}

function removeitem(event) {
    let itemtoremove = event.target.innerText;
    totos = totos.filter((item) => item !== itemtoremove);
    updatelist();
}

function updatelist() {
    
    listroot.innerHTML = "";
    listroot.append(totolist(totos));
}

updatelist();

fetch("https://dawapi.herokuapp.com/todo/list/wiggo")
        .then(function (response) {
        return response.json();
        })
        .then(function(myjson) {
            console.log(myjson.data.items);
            toto = myjson.data.items;
            
        })