const inputField = document.querySelector(".inputField");
const footer = document.querySelector(".footer");
const listBox = document.querySelector(".listBox");
const itemsLeft = document.querySelector(".no__items");

let listItems = [];
let itemsActive = [];
let itemsCompleted = [];
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (inputField.value.replaceAll(" ", "") === "") {
      e.preventDefault();
      console.log("Text not provided");
    } else {
      createListItem(inputField.value);
      inputField.value = "";
    }
  }
  itemsLeftCounter();
});

function itemsLeftCounter() {
  itemsLeft.innerText = itemsActive.length;
}

// create a DOM element
function createListItem(text) {
  let itemContainer = document.createElement("div");
  let checkmark = document.createElement("div");
  let del = document.createElement("div");
  let textVal = document.createElement("h2");

  textVal.innerText = text;
  checkmark.classList.add("checkbox");
  del.classList.add("cross", "delete__inner");
  itemContainer.classList.add("list__item");
  itemContainer.append(checkmark, textVal, del);
  listBox.append(itemContainer);
  listItems.push(itemContainer);
  itemsActive.push(itemContainer);
  itemContainer.onmouseover = () => {
    del.classList.add("visible");
  };
  itemContainer.onmouseout = () => {
    del.classList.remove("visible");
  };
  del.addEventListener("click", () => {
    delItem(itemContainer);
    itemsLeftCounter();
  });
  checkmark.addEventListener("click", () => {
    setAsCompleted(itemContainer, checkmark);
    itemsLeftCounter();
  });
}

function delItem(itemContainer) {
  itemContainer.remove();
  listItems.splice(listItems.indexOf(itemContainer), 1);
  itemsCompleted.splice(itemsCompleted.indexOf(itemContainer), 1);
  if (!itemContainer.classList.contains("list__item__completed")) {
    itemsActive.splice(itemsActive.indexOf(itemContainer), 1);
  }
}

function setAsCompleted(itemContainer, checkmark) {
  if (itemContainer.classList.contains("list__item__completed")) {
    itemsActive.push(itemContainer);
    itemsCompleted.splice(itemsCompleted.indexOf(itemContainer), 1);
    checkmark.classList.remove("checkbox__completed");
    itemContainer.classList.remove("list__item__completed");
  } else {
    itemsCompleted.push(itemContainer);
    itemsActive.splice(itemsActive.indexOf(itemContainer), 1);
    checkmark.classList.add("checkbox__completed");
    itemContainer.classList.add("list__item__completed");
  }
}

const radio = document.querySelectorAll(".display__radio");
const radioLabel = document.querySelectorAll(".radio__label");

radio.forEach((rad) => {
  rad.addEventListener("click", () => {
    radioCheck();
    showSelection();
  });
});

function radioCheck() {
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radioLabel[i].classList.add("radio__label__active");
    } else {
      radioLabel[i].classList.remove("radio__label__active");
    }
  }
}
function showSelection() {
  if (radio[2].checked) {
    // show completed
    listItems.forEach((item) => {
      item.classList.add("hide");
    });
    itemsCompleted.forEach((it) => {
      it.classList.remove("hide");
    });
  } else if (radio[1].checked) {
    // show active
    listItems.forEach((item) => {
      item.classList.add("hide");
    });
    itemsActive.forEach((active) => {
      active.classList.remove("hide");
    });
  } else {
    // show all
    listItems.forEach((item) => {
      item.classList.remove("hide");
    });
  }
}
radioCheck();

const clearCompleted = document.querySelector(".clear__completed");

clearCompleted.addEventListener("click", () => {
  for (let i = 0; i < itemsCompleted.length; i++) {
    let position = listItems.indexOf(itemsCompleted[i]);
    listItems[position].remove();
  }
  listItems = listItems.filter((item) => !item.classList.contains("list__item__completed"));
  itemsCompleted = [];
});

// stores current state of the app
let currentState = {
  allItems: listItems,
  activeItems: itemsActive,
  completedItems: itemsCompleted,
};
let items;

let initState = {};
// allows to store objects in storage
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

function setLocalStorage() {
  localStorage.setObject("currentSession", listItems);
}

function initializeSite() {
  items = localStorage.getObject("currentSession");
}
