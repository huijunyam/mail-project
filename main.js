document.addEventListener("DOMContentLoaded", () => {
  let navArray = Array.from(document.querySelectorAll(".sidebar-nav li"));
  navArray.forEach(navEl => {
    navEl.addEventListener("click", () => {
      let name = navEl.innerText.toLowerCase();
      window.location.hash = name;
    });
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   let content = document.querySelector(".content");
//   router = new Router(content, routes);
//   router.start();
//   window.location.hash = "#inbox";
