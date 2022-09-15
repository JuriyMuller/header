async function universityAPI() {
  let list = await fetch("../db/un.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((e) => {
        let searchList = document.querySelector(".search__block_list"),
          searchInput = document.querySelector(".search__input"),
          block = document.querySelector(".search__prompt"),
          item = document.createElement("li"),
          type = document.createElement("span");

        item.classList.toggle("search__block_list-item");
        item.textContent = e.title;

        type.classList.toggle("search__block_list-type");
        type.textContent = e.type;
        searchInput.addEventListener("click", () => {
          item.appendChild(type);
          searchList.appendChild(item);
          block.classList.toggle("search__block");
          searchInput.addEventListener("keyup", () => {
            if (searchInput.value != " ") {
              if (e.title.toLowerCase().search(searchInput.value) == -1) {
                item.classList.add("search__hide");
              } else {
                item.classList.remove("search__hide");
              }
            }
          });
        });
        item.addEventListener("click", () => {
          searchInput.value = item.innerText;
        });
      });
    });
}
universityAPI();
