import menu from "./menu-data.js"

console.log(menu)

const navBtn = document.querySelector(".menu-btn")
const book = document.querySelector(".book")
const navBar = document.querySelector(".nav-bar")

let navOpen = false

navBtn.addEventListener("click", () => {
    if(!navOpen) {
        navBar.classList.remove("hide")
        navBar.classList.add("show")
        navOpen = true
    }
    else {
        navBar.classList.remove("show")
        navBar.classList.add("hide")
        navOpen = false
    }
  
    navBtn.classList.toggle("open")
    book.classList.toggle("hide")
})

const btnContainer = document.querySelector(".options")
const content = document.querySelector(".food-content")

window.addEventListener("DOMContentLoaded", function() {
    displayMenuItems(menu)
    displayMenuButtons()
})

function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
        // console.log(item);
    
        return `<article class="menu-item">
              <div class="item-info">
                <header>
                  <h3>${item.title}</h3>
                </header>
                <p class="item-text">
                  ${item.desc}
                </p>
              </div>
            </article>`;
      });
    displayMenu = displayMenu.join("");
    content.innerHTML = displayMenu;
}

function displayMenuButtons() {
    const categories = menu.reduce(
      function (values, item) {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["All"]
    );
    const categoryBtns = categories
      .map(function (category) {
        return `<button type="select" class="filter-btn" data-id=${category}>
            ${category}
          </button>`;
      })
      .join("");
  
    btnContainer.innerHTML = categoryBtns;
    const filterBtns = btnContainer.querySelectorAll(".filter-btn");
    console.log(filterBtns);
  
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        // console.log(e.currentTarget.dataset);
        const category = e.currentTarget.dataset.id;
        const menuCategory = menu.filter(function (menuItem) {
          // console.log(menuItem.category);
          if (menuItem.category === category) {
            return menuItem;
          }
        });
        if (category === "All") {
          displayMenuItems(menu);
        } else {
          displayMenuItems(menuCategory);
        }
      });
    });
}