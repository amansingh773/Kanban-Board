const titleBox = document.getElementById("title-box");
const descriptionBox = document.getElementById("description-box");
const addBtn = document.getElementById("Add-btn");

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

let taskCount = 0;
let draggedCard = null;

addBtn.addEventListener("click", () => {
  const inputValue = titleBox.value.trim();
  const descriptionValue = descriptionBox.value.trim();

  if (!inputValue && !descriptionValue) {
    alert("Please add Title or Description");
    return;
  }

  taskCount += 1;

  const div = document.createElement("div");
  div.className = "task-card";
  div.draggable = true;

  const h3 = document.createElement("h3");
  h3.className = "task-title";
  h3.textContent = `Task ${taskCount}: ${inputValue || "Untitled"}`;

  const p = document.createElement("p");
  p.className = "task-description";
  p.textContent = descriptionValue || "No description";

  const date = new Date();
  let currDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;

  const dateContainer = document.createElement("span");
  dateContainer.innerText = currDate;

  div.append(h3, p, dateContainer);
  box1.append(div);

  titleBox.value = "";
  descriptionBox.value = "";

  div.addEventListener("dragstart", () => {
    draggedCard = div;
    div.classList.add("dragging");
  });

  div.addEventListener("dragend", () => {
    draggedCard = null;
    div.classList.remove("dragging");
  });
});

const allBoxes = [box1, box2, box3];

allBoxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedCard) return;
    box.append(draggedCard);
  });
});

titleBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

descriptionBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});