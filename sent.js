const MessageStore = require("./message_store.js");

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
