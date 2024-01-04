var sName = document.getElementById("sName");
var sUrl = document.getElementById("sUrl");
var allSites = [];
var myIndex;

if (localStorage.getItem("allSites")) {
  allSites = JSON.parse(localStorage.getItem("allSites"));
  displayAllSites();
}
document.getElementById("submit").addEventListener("click", function () {
  if (siteUrlValidation() || sName == "") {
    if (document.getElementById("submit").innerHTML == "Submit") {
      var site = {
        name: sName.value,
        URL: sUrl.value,
      };
      allSites.push(site);
      displayAllSites();
      clearValue();
      localStorage.setItem("allSites", JSON.stringify(allSites));
    } else {
      allSites[myIndex].name = sName.value;
      allSites[myIndex].URL = sUrl.value;

      document.getElementById("submit").innerHTML = "Submit";
      clearValue();
      displayAllSites();
      localStorage.setItem("allSites", JSON.stringify(allSites));
    }
  } else {
    alert(" invalid site or empty name");
  }
});
function clearValue() {
  sName.value = "";
  sUrl.value = "";
}
function displayAllSites() {
  var html = "";
  for (i = 0; i < allSites.length; i++) {
    html += ` <div class="row px-5 my-2 myBackColor rounded ">
            <div class="col-4">
                <h2 class="text-white">${allSites[i].name}</h2>
            </div>
            <div class="col-8 py-2">
                
                <a href="https://${allSites[i].URL}" class="btn btn-info mx-md-3">Visit</a>
                <button onclick="updateElement(${i})" class="btn btn-primary">Update</button>
                <button onclick="deleteElement(${i})" class="btn btn-danger mx-md-3">Delete</button>
                
            </div>
        </div>`;
  }
  document.getElementById("siteRow").innerHTML = html;
}
function deleteElement(index) {
  allSites.splice(index, 1);
  localStorage.setItem("allSites", JSON.stringify(allSites));
  document.getElementById("submit").innerHTML = "Submit";
  displayAllSites();
  clearValue();
}
function updateElement(index) {
  sName.value = allSites[index].name;
  sUrl.value = allSites[index].URL;
  document.getElementById("submit").innerHTML = "UPDATE";
  myIndex = index;
}
function search(term) {
  var html = "";
  // var term=document.getElementById("search").value;
  for (i = 0; i < allSites.length; i++) {
    if (allSites[i].name.toLowerCase().includes(term.toLowerCase())) {
      html += ` <div class="row px-5 my-2 myBackColor rounded ">
                    <div class="col-4">
                        <h2 class="text-white">${allSites[i].name}</h2>
                    </div>
                    <div class="col-8 py-2">
                        <a href="https://${allSites[i].URL}" class="btn btn-info mx-md-3">Visit</a>
                        <button onclick="updateElement(${i})" class="btn btn-primary">Update</button>
                        <button onclick="deleteElement(${i})" class="btn btn-danger mx-md-3">Delete</button>
                    </div>
                </div>`;
    }
    document.getElementById("siteRow").innerHTML = html;
  }
}

function siteUrlValidation() {
  var regex = /^[Ww]{3}[.]{1}[a-zA-Z]{3,15}[.]{1}[com=COM]{3}$/;
  return regex.test(sUrl.value);
}
