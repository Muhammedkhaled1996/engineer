// get Total
// Create product
// save in localstorage
// clear inputs after create
// read
// delete
// update
// count
//search
// clean data

let title = document.getElementById("Title");
let Price = document.getElementById("Price");
let Tax = document.getElementById("Tax");
let Ads = document.getElementById("Ads");
let Discount = document.getElementById("Discount");
let Total = document.getElementById("Total");
let Count = document.getElementById("Count");
let Category = document.getElementById("Category");
let Create = document.getElementById("Create");
let Search = document.getElementById("Search");
let tbody = document.getElementById("tbody");
// console.log(title, Price, Tax, Ads, Discount, Total, Count, Category, Create,Phone);
let mood = "create";
let tmp;
// get Total

function GetTotal() {
  if (Price.value != "") {
    let result = +Price.value + +Tax.value + +Ads.value - +Discount.value;
    Total.innerHTML = result;
    Total.style.backgroundColor = "green";
  } else {
    Total.style.backgroundColor = "red";
    Total.innerHTML = "0";
  }
}

// Create product
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}

// save in localstorage
Create.onclick = function () {
  let newpro = {
    title: title.value,
    Price: Price.value,
    Tax: Tax.value,
    Ads: Ads.value,
    Discount: Discount.value,
    Total: Total.innerHTML,
    Count: Count.value,
    Category: Category.value,
  };

  //count && clean data

  if (title.value != "" && Price.value != "" && Category.value != "") {
    if (mood == "create") {
      if (newpro.Count > 1) {
        for (let i = 0; i < newpro.Count; i++) {
          dataPro.push(newpro);
        }
      } else {
        dataPro.push(newpro);
      }
    } else {
      dataPro[tmp] = newpro;
      mood = "create";
      Create.innerHTML = "Create";
      Count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  showdata();
};
showdata();

// clear inputs after create

function clearData() {
  title.value = null;
  Price.value = null;
  Tax.value = null;
  Ads.value = null;
  Discount.value = null;
  Count.value = null;
  Category.value = null;
  Total.innerHTML = "0";
}

// read

function showdata() {
  GetTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].Price}</td>
                <td>${dataPro[i].Tax}</td> 
                <td>${dataPro[i].Ads}</td>
                <td>${dataPro[i].Discount}</td>
                <td>${dataPro[i].Total}</td>
                <td>${dataPro[i].Category}</td>
                <th><button onclick= "updatedate(${i})" id="UPDATE">UPDATE</button></th>
                <th><button onclick="deletedate(${i})" id="DELETE">DELETE</button></th>
            </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAll()">DELETE ALL (${dataPro.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}

// delete
function deletedate(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showdata();
}

// delete all

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showdata();
}

// update

function updatedate(i) {
  title.value = dataPro[i].title;
  Price.value = dataPro[i].Price;
  Tax.value = dataPro[i].Tax;
  Ads.value = dataPro[i].Ads;
  Discount.value = dataPro[i].Discount;
  Category.value = dataPro[i].Category;
  GetTotal();
  Count.style.display = "none";
  Create.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search

let searchMood = "title";

function getSearchMood(id) {
  if (id == "SearchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  Search.focus();
  Search.value = "";
  Search.placeholder = `Search By ${searchMood.toUpperCase()}`;
  showdata();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].Price}</td>
                <td>${dataPro[i].Tax}</td> 
                <td>${dataPro[i].Ads}</td>
                <td>${dataPro[i].Discount}</td>
                <td>${dataPro[i].Total}</td>
                <td>${dataPro[i].Category}</td>
                <th><button onclick= "updatedate(${i})" id="UPDATE">UPDATE</button></th>
                <th><button onclick="deletedate(${i})" id="DELETE">DELETE</button></th>
            </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].Category.toLowerCase().includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].Price}</td>
                <td>${dataPro[i].Tax}</td> 
                <td>${dataPro[i].Ads}</td>
                <td>${dataPro[i].Discount}</td>
                <td>${dataPro[i].Total}</td>
                <td>${dataPro[i].Category}</td>
                <th><button onclick= "updatedate(${i})" id="UPDATE">UPDATE</button></th>
                <th><button onclick="deletedate(${i})" id="DELETE">DELETE</button></th>
            </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data
