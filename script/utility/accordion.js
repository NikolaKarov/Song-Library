export default function accordionEvent(e) {
  var panel = e.target.nextElementSibling;
  const deleteBtn = document.getElementById("deleteBtn");

  if (deleteBtn.style.backgroundColor != "rgb(238, 179, 179)") {
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }
}
