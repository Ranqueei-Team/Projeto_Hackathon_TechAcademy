"use strict"

/* Sidebar */

/* Onload of your page this will get called */
function checkStorage() {
    /* Check if there is any value in localStorage */
    if (localStorage.getItem("listId") != null) {
        let value = localStorage.getItem("listId");
        setActive(value);
    }
}

function active(id) {
    /* Clear previous data */
    localStorage.removeItem("listId");
    /* Add data to storage */
    localStorage.setItem("listId", id);
}

function setActive(value) {
    document.getElementById(value).classList.value = "nav-link active";
}