console.log('welcome to the project');
shownotes();// whwn the page get refreshed it will show the saved notes
//if user add notes then add it to local storage

let addbtn = document.getElementById('addBtn');

addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById('addText');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let state = localStorage.getItem("state");
    let stateobj;
    if (state == null) {
        stateobj = [];
    }
    else {
        stateobj = JSON.parse(state);
    }
    notesobj.push(addtxt.value);
    stateobj.push(1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    localStorage.setItem("state", JSON.stringify(stateobj));
    addtxt.value = "";//needs to clear the text area
    shownotes();

});

// function to show the added notes 
function shownotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let state = localStorage.getItem("state");
    if (state == null) {
        stateobj = [];
    }
    else {
        stateobj = JSON.parse(state);
    }
    let html = "";
    notesobj.forEach(function (element, id) {

        if (stateobj[id] == 1) {
            html += `
        <div class="notecard  mx-2 my-2 card" style="width: 21rem;">

                <div class="card-body markclass" >
                    <h5 class="card-title">Note ${id + 1}</h5>
                    <p class="card-text">${element}</p>
                    
                    <button id="ugt" onclick="markugt(${id})" class="btn btn-warning my-3">Mark Important</button>
                    <button id="${id}" onclick="deletenotes(this.id)" class="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        `}
        else {
            html += `
        <div class="notecard  mx-2 my-2 card" style="width: 21rem;">

                <div class="card-body markclass" >
                    <h5 class="card-title">Note ${id + 1}</h5>
                    <p class="card-text">${element}</p>
                    
                    <button id="ugt" onclick="markugt(${id})" class="btn btn-success my-3">Not Important</button>
                    <button id="${id}" onclick="deletenotes(this.id)" class="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        `
        }

        // localStorage.setItem("state",JSON.stringify(arrobj));
    });

    let noteselem = document.getElementById("notes");
    if (notesobj.length != 0) {
        noteselem.innerHTML = html;

    }
    else {
        noteselem.innerHTML = `No Notes! click on +Add Note to add a new note`;
    }
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element, idd) {
        // let cardTxt = element.getElementsByTagName("button")[1];
        if (stateobj[idd] == 1) {
            //cardTxt.innerText =
            // "𝙉𝙤𝙩 𝙄𝙢𝙥𝙤𝙧𝙩𝙖𝙣𝙩";
            element.style.background = "#e2effa";
            element.style.color = "black";
            //val.innerText="𝙉𝙤𝙩 𝙄𝙢𝙥𝙤𝙧𝙩𝙖𝙣𝙩";
        }
        else {
            // cardTxt.innerText = "𝙄𝙢𝙥𝙤𝙧𝙩𝙖𝙣𝙩";
            element.style.background = "#fdf1cf";
            element.style.color = "black";
        }
    });
};
// function to 𝘿𝙚𝙡𝙚𝙩𝙚 the notes
function deletenotes(id) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(id, 1);//𝘿𝙚𝙡𝙚𝙩𝙚 element from index id to length 1
    localStorage.setItem("notes", JSON.stringify(notesobj));
    let state = localStorage.getItem("state");
    if (state == null) {
        stateobj = [];
    }
    else {
        stateobj = JSON.parse(state);
    }
    stateobj.splice(id, 1);//𝘿𝙚𝙡𝙚𝙩𝙚  element from index id to length 1
    localStorage.setItem("state", JSON.stringify(stateobj));
    shownotes();

};
function markugt(id) {

    console.log(id);
    // let val=document.getElementById("ugt");
    //let el=document.getElementById("flip");

    // let obj=val.getElementById("ugt")[id];
    // console.log(val);
    let noteCards = document.getElementsByClassName('notecard');
    let arr = localStorage.getItem("state");
    if (arr == null) { arrobj = []; }
    else {
        arrobj = JSON.parse(arr);
    }
    Array.from(noteCards).forEach(function (element, idd) {
        let cardTxt = element.getElementsByTagName("button")[1];
        if (idd == id) {

            if (arrobj[id] == 1) {
                cardTxt.innerText =
                    "Mark Important";
                element.style.background = "#e2effa";
                element.style.color = "black";
                arrobj[id] = 0;
            }
            else {

                cardTxt.innerText = "Not Important";
                element.style.background = "#fdf1cf";
                element.style.color = "black";
                arrobj[id] = 1;
            }

        }
        // localStorage.setItem("state",JSON.stringify(arrobj));
    });
    localStorage.setItem("state", JSON.stringify(arrobj));
    shownotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
            // element.style.background="red";
            // element.style.background="white";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

