window.addEventListener("load", () => {
  list = JSON.parse(localStorage.getItem("list")) || [];
  let inputName = document.querySelector("#input-name");
  let inputNote = document.querySelector("#input-note");
  let formAdd = document.querySelector("#form-add");

  let username = localStorage.getItem("username") || "";
  inputName.value = username;

  inputName.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  formAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputNote.value == "") {
      alert("El campo está vacío");
    } else {
      const item = {
        note: e.target.elements.note.value,
        done: false,
        date: new Date().getTime(),
      };

      list.push(item);

      localStorage.setItem("list", JSON.stringify(list));

      e.target.reset();

      render();
    }
  });

  render();
});

function render() {
  const divList = document.querySelector(".div-list");
  divList.innerHTML = "";

  list.forEach((element) => {
    const divItem = document.createElement("div");
    divItem.classList.add("div-item");

    const check = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = element.done;

    check.classList.add("div-check");
    content.classList.add("div-note");
    actions.classList.add("div-actions");
    edit.classList.add("button-edit");
    deleteButton.classList.add("button-delete");

    content.innerHTML = `<input type="text" value="${element.note}" readonly>`;
    edit.innerHTML = "Editar";
    deleteButton.innerHTML = "x";

    label.appendChild(input);
    check.appendChild(label);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    divItem.appendChild(check);
    divItem.appendChild(content);
    divItem.appendChild(actions);

    divList.appendChild(divItem);

    if (element.done) {
      divItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      element.done = e.target.checked;
      localStorage.setItem("list", JSON.stringify(list));

      if (element.done) {
        divItem.classList.add("done");
      } else {
        divItem.classList.remove("done");
      }
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();

      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        element.note = e.target.value;
        localStorage.setItem("list", JSON.stringify(list));
        render();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      list = list.filter((t) => t != element);
      console.log(list);
      localStorage.setItem("list", JSON.stringify(list));
      render();
    });
  });

  if (list == "") {
    console.log("No hay notas por mostrar");
  }
}
