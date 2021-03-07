"use strict";
console.log("Nu flyger vi!")



let totos = [{"id": "wiggo", "header": "Mysa", "description": "none", "finished": "false"}];
let listroot = document.querySelector("#list-root");
let listform = document.querySelector("[data-list-form]");
let listinput = document.querySelector("[data-list-header]");
let listdesc = document.querySelector("[data-list-description]");
const xhr = new XMLHttpRequest();
const posturl = "https://dawapi.herokuapp.com/todo/item"

function push(head) {
    
    xhr.open("POST", posturl, true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(head))

    
}

function unpush(header) {
    xhr.open("DELETE", posturl, true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        "id": "wiggo",
        "header": header
    }))
}

function createtoto(header) {
    return {
        "id": "wiggo",
        "header": header,
        "description": Date.now().toString(),
        "finished": "false"
    }
}


listform.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (listinput.value.trim() === "") { 
        return;
    }
    totos.push(createtoto(listinput.value.trim()));
    console.log(totos)
    
    push(createtoto(listinput.value.trim()));
    
    updatelist();
    listinput.value = "";
    
});

function totolist(item) {
    let list = document.createElement("ul");
    item.forEach((item) => {
        let todolistitem = document.createElement("li");
        todolistitem.innerText = item.header;
        todolistitem.setAttribute("data-name", item.header)
        todolistitem.setAttribute("data-id", item.description)
        todolistitem.classList.add("todo-list-item");
        todolistitem.addEventListener("click", removeitem);
        list.append(todolistitem);
    });
    return list;
}

function removeitem(event) {
    let itemtoremove = event.target.getAttribute("data-id");
    let itemtounpush = event.target.getAttribute("data-name")
    totos = totos.filter((item) => item.description !== itemtoremove);
    unpush(itemtounpush)
    updatelist();
}

function updatelist() {

    listroot.innerHTML = "";
    listroot.append(totolist(totos));

    fetch("https://dawapi.herokuapp.com/todo/list/wiggo")
        .then(function (response) {
        return response.json();
        })
        .then(function(myjson) {
            console.log(myjson.data.items);
        })

}

updatelist();

