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
	const Sent = __webpack_require__(4);
	const Compose = __webpack_require__(5);

	let routes = {
	  inbox: Inbox,
	  sent: Sent,
	  compose: Compose
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

	class Message {
	  constructor(from, to = "", subject = "", body = "") {
	    this.from = from;
	    this.to = to;
	    this.subject = subject;
	    this.body = body;
	  }
	}

	let messageDraft = new Message();
	let messages = JSON.parse(localStorage.getItem('messages'));

	//use this to test if the storage has no messages at all
	if(!messages) {
	  messages = {
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
	}

	const MessageStore = {
	  getInboxMessages() {
	    return messages.inbox;
	  },

	  getSentMessages() {
	    return messages.sent;
	  },

	  getMessageDraft() {
	    return messageDraft;
	  },

	  updateDraftField(field, value) {
	    messageDraft[field] = value;
	  },

	  sendDraft() {
	    messages.sent.push(messageDraft);
	    messageDraft = new Message();
	    localStorage.setItem('messages', JSON.stringify(messages));
	  }
	};

	module.exports = MessageStore;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderMessage(message) {
	    let list = document.createElement("li");
	    list.className = "message";
	    list.innerHTML = `
	    <span class="to">${message.to}</span>
	    <span class="subject">${message.subject}</span>
	    <span class="body">${message.body}</span>
	    `;
	    return list;
	  },
	  render() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getSentMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderForm() {
	    let currentMessage = MessageStore.getMessageDraft();
	    let content = `
	      <p class="new-message-header">New Message</p>
	      <form class="compose-form">
	      <input placeholder="Recipient" name="to" type="text" value="${currentMessage.to}">
	      <input placeholder="Subject" name="subject" type="text" value="${currentMessage.subject}">
	      <textarea name="body" rows="20">${currentMessage.body}</textarea>
	      <button type="submit" class="btn btn-primary submit-message">Send</button>
	      </form>
	    `;
	    return content;
	  },
	  render() {
	    let container = document.createElement("div");
	    container.className = "new-message";
	    container.innerHTML = this.renderForm();
	    container.addEventListener("change", e => {
	      let target = e.target;
	      MessageStore.updateDraftField(target.name, target.value);
	    });
	    container.addEventListener("submit", e => {
	      e.preventDefault();
	      MessageStore.sendDraft();
	      location.hash = "inbox";
	    });
	    return container;
	  }
	};


/***/ }
/******/ ]);