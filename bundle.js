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
	  window.location.hash = "#inbox";
	  
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
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderMessage(message) {
	    let list = document.createElement("li");
	    list.className = "message";
	    list.innerHTML = `
	    <span class="from">${message.from}</span>
	    <span class="subject">${message.subject}</span>
	    <span class="body">${message.body}</span>
	    `;
	    return list;
	  },
	  render() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getInboxMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	const MessageStore = {
	  getInboxMessages() {
	    return messages.inbox;
	  },

	  getSentMessages() {
	    return messages.sent;
	  }
	};

	module.exports = MessageStore;


/***/ }
/******/ ]);