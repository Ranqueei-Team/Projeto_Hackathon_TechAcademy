"use strict"

/* Sidebar */

const sidebarItems = document.getElementById("sidebarItems");
const sidebarLinks = sidebarItems.getElementsByClassName("sidebarLinks");

for (let i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active");
        this.className += " active";
    })
}