class Router {
  constructor(node) {
    this.node = node;
  }

  start() {
    this.render();
    window.addEventListener("hashchange", () => {
      this.render();
    });
  }

  activeRoute() {
    let hashFragment = window.location.hash;
    return hashFragment.slice(1);
  }

  render () {
    this.node.innerHTML = "";
    let currentRoute = this.activeRoute();
    let newRoute = document.createElement("p");
    newRoute.innerHTML = currentRoute;
    this.node.appendChild(newRoute);
  }
}

module.exports = Router;
