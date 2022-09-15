function regionsMenu() {
  let region = document.querySelector(".region__txt");
  (menu = document.querySelector(".region__pop_up_window")),
    (listOfCities = document.querySelector(".region__list__items")),
    (regionLever = document.querySelector(".region_inner"));

  //открытие/закрытие блока
  regionLever.addEventListener("click", openTheWindow);
  function openTheWindow() {
    menu.classList.toggle("region_remove");
  }
}
regionsMenu();

async function regionAPI() {
  let list = document.querySelector(".region__list__items");

  let rest = await fetch("./db/db.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((e) => {
        let title = document.createElement("li");
        title.classList.add("region__list__title");
        title.innerText = e.city;

        let region = document.createElement("span");
        region.classList.add("region__list__subtitle");
        region.innerText = e.region;
        list.appendChild(title);
        title.appendChild(region);

        let input = document.querySelector(".region__input");
        input.addEventListener("keyup", () => {
          if (input.value != "") {
            if (e.city.search(input.value) == -1) {
              title.classList.add("hide");
            } else {
              title.classList.remove("hide");
            }
          } else {
            title.classList.remove("hide");
          }
        });

        title.addEventListener("click", () => {
          let btn = document.querySelector(".region__pop_up_window__btn"),
            noties = document.querySelector(".region__noties"),
            note = document.createElement("span");
          note.classList.toggle("note");

          note.textContent = title.innerText;
          let del = document.createElement("span");
          del.classList.toggle("delete_note");
          if (noties.innerHTML == "") {
            noties.appendChild(note);
            noties.appendChild(del);
          } else {
            note.remove();
            del.remove();
          }

          if (note.innerHTML != "") {
            btn.style.background = "#0656b4";
            btn.style.color = " #ffffff";
            btn.style.cursor = "pointer";
          }

          btn.addEventListener("click", () => {
            let result = document.querySelector(".region__txt");
            result.textContent = note.innerText;
            result.style.overflow = "hidden";
          });

          del.addEventListener("click", () => {
            note.remove();
            del.remove();
          });
        });
      });
    });
}
regionAPI();
