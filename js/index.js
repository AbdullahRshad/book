var bookmarkName = document.getElementById("siteName");
var bookmarkUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("subBtn");
var deleteBtn;
var visit;
var info = [];

if (JSON.parse(localStorage.getItem("NAME"))) {
  info = JSON.parse(localStorage.getItem("NAME"));
  display(info);
}

function submit() {
  var bookContent = {
    name: bookmarkName.value,
    site: bookmarkUrl.value,
  };
  info.push(bookContent);
  display(info);
  clear();
}
submitBtn.addEventListener("click", function () {
  submit();
});

function display(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += `<tbody id="tableContent">
    <tr>
      <td>${[i + 1]}</td>
      <td>${info[i].name}</td>              
      <td>
        <button class="btn btn-visit bg-success " data-index="0" onClick=" visitSite(this) ">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </button>
      </td>
      <td>
        <button class="btn btn-delete pe-2 bg-danger" data-index="0" onClick="deleted(${i})">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
  </tr>
  </tbody>`;
  }
  document.getElementById("tableContent").innerHTML = cartona;
  localStorage.setItem("NAME", JSON.stringify(info));
}

function clear() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}

function deleted(deletedIndex) {
  info.splice(deletedIndex, 1);
  display(info);
  localStorage.setItem("NAME", JSON.stringify(info));
}

function visitSite(ele) {
  var indexsite = ele.dataset.index;
  var url = info[indexsite].bookmarkUrl;
  var httpsRegex = /^https?:\/\//;

  if (!httpsRegex.test(url)) {
    url = `https://${url}`;
  }

  window.open(url, "_blank");
}

function validate() {
  var validateName = /^.{3,15}$/;
  var inputValue = bookmarkName.value;
  if (validateName.test(inputValue)) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    submitBtn.classList.remove("disabled")

  } else {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");
    submitBtn.classList.add("disabled")
  }
}
function validation() {
  var validateUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  var inputValue = validateUrl.value;
  if (validateUrl.test(inputValue)) {
    validateUrl.classList.add("is-valid");
    validateUrl.classList.remove("is-invalid");
    submitBtn.classList.remove("disabled")

  } else {
    validateUrl.classList.add("is-invalid");
    validateUrl.classList.remove("is-valid");
    submitBtn.classList.add("disabled")
  }
}
