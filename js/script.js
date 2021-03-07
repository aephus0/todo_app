console.log("Nu flyger vi!")



let totos = [];
let listroot = document.querySelector("#list-root");
let listform = document.querySelector("[data-list-form]");
let listinput = document.querySelector("[data-list-header]");
let listdesc = document.querySelector("[data-list-description]");
const xhr = new XMLHttpRequest();
const posturl = "https://dawapi.herokuapp.com/todo/item"

function push(head, desc) {
    totoadd = {
        "id": "wiggo",
        "header": head,
        "description": desc,
        "finished": "false"
    }
    xhr.open("POST", posturl, true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(totoadd))

    fetch("https://dawapi.herokuapp.com/todo/list/wiggo")
        .then(function (response) {
        return response.json();
        })
        .then(function(myjson) {
            console.log(myjson.data.items);
            toto = myjson.data.items;
            
        })
}
    


listform.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (listinput.value.trim() === "") {
        return;
    }
    
    totos.push({
        "id": "wiggo",
        "header": listinput.value.trim(),
        "description": listdesc.value.trim(),
        "finished": "false"
    });
    console.log(totos)
    
    push(listinput.value.trim(), listdesc.value.trim());
    
    
    updatelist();
    listinput.value = "";
    listdesc.value = "";
    
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

