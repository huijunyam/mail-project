/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);

	let routes = {
	  inbox: Inbox
	};

	document.addEventListener("DOMContentLoaded", () => {
	  let contentNode = document.querySelector(".content");
	  new Router(contentNode, routes).start();
	  let navArray = Array.from(document.querySelectorAll(".sidebar-nav li"));
	  navArray.forEach(navEl => {
	    navEl.addEventListener("click", () => {
	      let name = navEl.innerText.toLowerCase();
	      window.location.hash = name;
	    });
	  });

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    this.render();
	    window.addEventListener("hashchange", () => {
	      this.render();
	    });
	  }

	  activeRoute() {
	    let hashFragment = window.location.hash.slice(1);
	    return this.routes[hashFragment];
	  }

	  render () {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    if (component) {
	      this.node.appendChild(component.render());
	    }
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  render() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    container.innerHTML = "An Inbox Message";
	    return container;
	  }
	};


/***/ }
/******/ ]);