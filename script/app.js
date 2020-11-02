"use strict";


let form = document.querySelector("#main");
let input = form.querySelector(".input_main");
let add = document.querySelector("#sub_add");
let pagination = document.querySelector(".pagination");
let ul = document.querySelector("#pag_list");
let list = document.querySelector(".list");


let arr = ["something1", "something2", "something3", "something4", "something5", "something6"];


let itemOnPage = 5;
let NmP = 1;
let chek;



form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newElem = input.value;
    if(newElem==""){
        alert("Please entry something");
        e.preventDefault();
    } else{
        if(newElem.length>15){
            let a = newElem.slice(0,15);
            arr.push(a+"...");
            makePag();
            createList();
            actv();
        } else{
            arr.push(newElem);
            makePag();
            createList();
            actv();
        }
        
    }
    e.target.reset();
});



function makePag() {
    let page = Math.ceil(arr.length / itemOnPage);
    ul.innerHTML = "";
    for (let i = 0; i < page; i++) {
        let newElem = document.createElement("li");
        newElem.innerText = `${i+1}`;
        ul.append(newElem);
    } if (arr.length==0){
        let newElem = document.createElement("li");
        newElem.innerText = 1;
        ul.append(newElem);
        newElem.classList.add('active');
    }
}
makePag();

function createList() {
    let start = (NmP-1)  * itemOnPage;
    let x = NmP-1;
    let end = start + itemOnPage;
    let note = arr.slice(start, end);
    chek=note.length;
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
pagItems.forEach(() => {
    pagination.addEventListener('click', (e) => {
        NmP = +(e.target.innerText);
        let x = +(e.target.innerText)-1;
        let start = (NmP - 1) * itemOnPage;
        let end = start + itemOnPage;
        let note = arr.slice(start, end);
        chek = note.length;
        actv();
        list.innerHTML = "";
        for (let i = 0; i < note.length; i++) {
            list.innerHTML += `<div class="list_item">
            <p class="list_num">${i+(x*itemOnPage)+1}</p>
            <p>${note[i]}</p>
            <button class="edit_but">Edit</button>
            <button class="delete_but">Delete</button>
        </div>`;
        }
    });
});


    let btns = document.querySelectorAll('.delete_but');

        list.addEventListener('click', (e) => {
            let a = e.target;
            let n = +a.parentElement.firstElementChild.innerText;
            a.parentElement.remove();
            arr.splice(n-1, 1);
            chek=arr.length;
           createList();
            makePag();
            actv();
        });


function actv() {
    let pagItems = document.querySelectorAll("li");
    for (let i = 0; i < pagItems.length; i++) {
        pagItems[i].classList.remove('active');
    } if(arr.length==0){
        makePag();
    } else if(chek==0){
        NmP=NmP-1;
        let a = pagItems.item(NmP-1);
        a.classList.add('active');
         createList();
    } else{
        let a = pagItems.item(NmP-1);
        a.classList.add('active');
    }
}

actv();

function pagSupport (){
    let li = pagination.querySelectorAll('li');
    
}


let li = pagination.querySelectorAll('li');
console.log(li);