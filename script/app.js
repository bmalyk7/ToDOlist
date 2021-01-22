"Use strict";

const form = document.querySelector("#main"),
    input = form.querySelector(".input_main"),
    add = document.querySelector(".add_btn"),
    pagination = document.querySelector(".pagination"),
    ul = document.querySelector("#pag_list"),
    list = document.querySelector(".list");

const btnClr = document.createElement("button");
btnClr.innerText = "Clean Up";
form.append(btnClr);
btnClr.classList.add("clean_but");

let Clr = document.querySelector('.clean_but');

function empty() {
    const element = document.createElement('div');
    list.innerHTML = "";
    pagination.style.display = "none";
    element.innerHTML = `
                <div class="empty">
                    <h2>Please entry something</h2>
                </div>
        `;
    list.append(element);
    element.classList.add('empty_text');
}

form.addEventListener('click', (event) => {
    let b = event.target;

    if (b && b.classList.contains('clean_but')) {
        arr.length = 0;
        createList();
        empty();
    }
});

let arr = [];

const itemOnPage = 5;
let NmP = 1;
let chek;

form.addEventListener('click', (e) => {

    e.preventDefault();
    let newElem = input.value;
    const target = e.target;
    if (target && target.classList.contains('add_btn')) {
        if (newElem == "") {
            alert("Please entry something");
            e.preventDefault();
        } else {
            if (newElem.length > 15) {
                let a = newElem.slice(0, 15);
                arr.push(a + "...");
                makePag();
                createList();
                actv();
                input.value = "";
            } else {
                arr.push(newElem);
                makePag();
                createList();
                actv();
                input.value = "";
            }
        }
    }
});

function makePag() {
    let page = Math.ceil(arr.length / itemOnPage);
    ul.innerHTML = "";
    for (let i = 0; i < page; i++) {
        let newElem = document.createElement("li");
        newElem.innerText = `${i+1}`;
        ul.append(newElem);
        newElem.classList.add('pag_item');
        let pags = document.querySelectorAll('.pag_item');
        if (pags.length > 5) {
            pags[1].innerText = '...';
            pags[pags.length - 4].style.display = "none";
        }
    }
    if (arr.length == 0) {
        empty();
    }
}

function createList() {
    let start = (NmP - 1) * itemOnPage;
    let x = NmP - 1;
    let end = start + itemOnPage;
    let note = arr.slice(start, end);
    chek = note.length;
    pagination.style.display = "flex";
    list.innerHTML = "";
    for (let i = 0; i < note.length; i++) {
        list.innerHTML += `<div class="list_item">
        <p class="list_num">${i+(x*itemOnPage)+1}</p>
        <p>${note[i]}</p>
        <button class="edit_but">Edit</button>
        <button class="delete_but">Delete</button>
    </div>`;
    }
}

createList();

let pagItems = document.querySelectorAll("li");
pagination.addEventListener('click', (e) => {
    let a = e.target;

    if (a.tagName == "LI") {
        NmP = +(e.target.innerText);
        let x = +(e.target.innerText) - 1;
        let start = (NmP - 1) * itemOnPage;
        let end = start + itemOnPage;
        let note = arr.slice(start, end);
        chek = note.length;
        actv();
        maker();
        list.innerHTML = "";
        for (let i = 0; i < note.length; i++) {
            list.innerHTML += `<div class="list_item">
                <p class="list_num">${i+(x*itemOnPage)+1}</p>
                <p>${note[i]}</p>
                <button class="edit_but">Edit</button>
                <button class="delete_but">Delete</button>
            </div>`;
        }
    }
});


let btns = document.querySelectorAll('.delete_but');

list.addEventListener('click', (e) => {
    let a = e.target;
    let n = +a.parentElement.firstElementChild.innerText;
    if (a && a.classList.contains('delete_but')) {
        a.parentElement.remove();
        arr.splice(n - 1, 1);
        chek = arr.length;
        createList();
        makePag();
        actv();
    }

});


function actv() {
    let pagItems = document.querySelectorAll("li");
    for (let i = 0; i < pagItems.length; i++) {
        pagItems[i].classList.remove('active');
    }
    if (arr.length == 0) {
        makePag();
    } else if (chek == 0) {
        NmP = NmP - 1;
        let a = pagItems.item(NmP - 1);
        a.classList.add('active');
        createList();
    } else {
        let a = pagItems.item(NmP - 1);
        a.classList.add('active');
    }
}

actv();


let editNum;


let edits = document.querySelectorAll(".edit_but");
const modal = document.querySelector('.modal');
const cancel = document.querySelector(".cancel");
const modalBtn = document.querySelector('.modal_button');
const modalInput = document.querySelector('.modal_input');

modalBtn.addEventListener('click', () => {
    if (modalInput.value !== "") {
        arr.splice(editNum, 1, modalInput.value);
        createList();
        modal.style.display = "none";
    }
});


cancel.addEventListener('click', () => {
    modal.style.display = "none";
});

list.addEventListener('click', (e) => {
    const target = e.target;
    if (target && e.target.classList.contains("edit_but")) {
        editNum = +(target.parentElement.firstElementChild.innerText) - 1;
        modal.style.display = "block";
        modalInput.value = arr[editNum];
    }
});


function maker() {
    let pags = document.querySelectorAll('.pag_item');
    let per = Array.from(pags);
    let five = per.slice(0, 5);
    let perm = per.slice(0, 2);
    let newPags = per.slice(NmP - 3, NmP + 1);
    if (NmP > 4) {
        pags[1].innerText = '...';
        pags[pags.length - 4].style.display = "none";
        five.forEach(item => item.style.display = 'none');
        per.forEach(item => item.style.display = 'none');
        perm.forEach(item => item.style.display = 'inline');
        newPags.forEach(item => item.style.display = 'inline');
    } else {
        pags[1].innerText = '2';
        pags.forEach(item => item.style.display = 'none');
        five.forEach(item => item.style.display = 'inline');
    }
}