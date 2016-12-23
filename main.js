const Router = require("./router.js");

document.addEventListener("DOMContentLoaded", () => {
  let navArray = Array.from(document.querySelectorAll(".sidebar-nav li"));
  navArray.forEach(navEl => {
    navEl.addEventListener("click", () => {
      let name = navEl.innerText.toLowerCase();
      window.location.hash = name;
    });
  });

  let contentNode = document.querySelector(".content");
  new Router(contentNode).start();
});
