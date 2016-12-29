const Router = require("./router.js");
const Inbox = require("./inbox.js");

let routes = {
  inbox: Inbox
};

document.addEventListener("DOMContentLoaded", () => {
  let contentNode = document.querySelector(".content");
  new Router(contentNode, routes).start();
  window.location.hash = "#inbox";
  
  let navArray = Array.from(document.querySelectorAll(".sidebar-nav li"));
  navArray.forEach(navEl => {
    navEl.addEventListener("click", () => {
      let name = navEl.innerText.toLowerCase();
      window.location.hash = name;
    });
  });

});
