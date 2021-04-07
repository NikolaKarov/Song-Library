export default function toggleAdd() {
  const addBtn = document.getElementById("addBtn");
  const addElements = document.querySelectorAll(".add");

  if (addBtn.style.backgroundColor != "rgb(238, 238, 238)") {
    addBtn.style.backgroundColor = "rgb(238, 238, 238)";
    addElements.forEach((a) => (a.style.display = "none"));
  } else {
    addBtn.style.backgroundColor = "rgb(203, 245, 198)";
    addElements.forEach((a) => (a.style.display = "block"));
  }
}
