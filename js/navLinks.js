const currentLocation = document.location.href.split("/").pop().split(".")[0];

const linksMapping = {
  index: "home",
  todos: "todos",
  contacts: "contacts",
};

const links = document.querySelectorAll(".nav__link");
links.forEach((link) => {
  if (link.innerHTML.toLowerCase() === linksMapping[currentLocation]) {
    link.classList.add("nav__link_active");
  }
});
