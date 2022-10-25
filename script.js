const reference = `
  <div hidden>
    <div class="backdrop"></div>
    <div class="dialog">
      <p>Are you sure you want to continue?</p>
      <button onclick="doConfirm(true)">Yes</button>
      <button onclick="doConfirm(false)">Cancel</button>
    </div>
  </div>
  <button onclick="setDialogOpen(true)">Click me</button>
  <p class="answer"></p>
`;

function Dialog({
  containerId,
  content = "Are you sure you want to continue?",
  onConfirm = () => {
    alert("confirmed");
  },
} = {}) {
  const containerEl = document.getElementById(containerId);

  if (!containerEl) return;

  const setDialogOpen = (open) => {
    dialogContainerEl.style.visibility = open ? "visible" : "hidden";
    dialogContainerEl.style.opacity = open ? 1 : 0;
  };

  const doConfirm = (yes) => {
    yes && onConfirm();
    answerEl.innerText = `You just clicked "${yes ? "Yes" : "Cancel"}"`;
    setDialogOpen(false);
  };

  const dialogContainerEl = document.createElement("div");
  dialogContainerEl.classList.add("dialog-container");
  dialogContainerEl.style.visibility = "hidden";
  dialogContainerEl.style.opacity = 0;

  const backdropEl = document.createElement("div");
  backdropEl.classList.add("backdrop");

  const dialogEl = document.createElement("div");
  dialogEl.classList.add("dialog");

  const dialogContentEl = document.createElement("p");
  dialogContentEl.innerText = content;

  const dialogYesButton = document.createElement("button");
  dialogYesButton.innerText = "Yes";
  dialogYesButton.onclick = () => doConfirm(true);

  const dialogCancelButton = document.createElement("button");
  dialogCancelButton.innerText = "Cancel";
  dialogCancelButton.onclick = () => doConfirm(false);

  dialogEl.append(dialogContentEl, dialogYesButton, dialogCancelButton);
  dialogContainerEl.append(backdropEl, dialogEl);

  const clickMeEl = document.createElement("button");
  clickMeEl.innerText = "Click me";
  clickMeEl.onclick = () => setDialogOpen(true);

  const answerEl = document.createElement("p");

  containerEl.append(dialogContainerEl, clickMeEl, answerEl);
}

new Dialog({ containerId: "dialog-1" });
new Dialog({
  containerId: "dialog-2",
  content: "Are you sure you want to update?",
  onConfirm: () => {
    alert("updated");
  },
});
new Dialog({
  containerId: "dialog-3",
  content: "Are you sure you want to delete?",
  onConfirm: () => {
    alert("deleted");
  },
});
new Dialog({ containerId: "dialog-4" });
