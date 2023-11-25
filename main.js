let title = document.getElementById('title');
let price = document.getElementById('price');
let taxs = document.getElementById('taxs');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById("create");
let search = document.getElementById('search');
let searchbytitle = document.getElementById('bytitle');
let searchbycategory = document.getElementById('bycategory');
let Delete = document.getElementById('delete');
let tbody = document.getElementById('tbody');
let reset = document.getElementById('reset');
create.addEventListener("click", createproduct);
Delete.addEventListener("click", deleteall);
tbody.style.border = 'white 1px solid';
let products = [];
function deleteall() {
    localStorage.removeItem('product');
    tbody.innerHTML = "";
    products = [];
    Delete.textContent = `Delete All (${products.length}) Product`;

}
reset.onclick = showdata;
let mood = 'create' , tmpi=-1;

function gettotal() {
    if (price.value != '') {
        let result = +price.value + +taxs.value + +ads.value
            - +discount.value;
        total.innerHTML = `TOTAL :${result}`;
        total.style.backgroundColor = 'Green'
    }
    else {
        total.innerHTML = 'TOTAL:';
        total.style.backgroundColor = 'rgb(255, 85, 0)'
    }
}
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product);
}
Delete.textContent = `Delete All (${products.length}) Product`;
window.onload = showdata;

function clearinputs() {
    title.value = "";
    price.value = "";
    taxs.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    count.value = "";
    total.innerHTML = 'TOTAL :';
    total.style.backgroundColor = 'rgb(255, 85, 0)';
}
function createproduct() {
    if(mood=='create'){
        for (let i = 0; i < +count.value; i++) {
            let product = {
                TITLE: title.value,
                PRICE: price.value,
                TAXS: taxs.value,
                ADS: ads.value,
                DISCOUNT: discount.value,
                TOTAL: +price.value + +taxs.value + +ads.value
                    - +discount.value,
                Category: category.value
            };
            products.push(product);
            localStorage.setItem("product", JSON.stringify(products));
        }
    }
    else{
        let product = {
            TITLE: title.value,
            PRICE: price.value,
            TAXS: taxs.value,
            ADS: ads.value,
            DISCOUNT: discount.value,
            TOTAL: +price.value + +taxs.value + +ads.value
                - +discount.value,
            Category: category.value
        };
        products[tmpi]=product;
        localStorage.product= JSON.stringify(products);
        mood='create';
        create.innerHTML='Create';
        count.style.display='block';
        showdata();
        
    }

    showdata();
    clearinputs();
    Delete.textContent = `Delete All (${products.length}) Product`;
}
searchbytitle.addEventListener("click", searchByTitle);
function searchByTitle() {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].TITLE.toLowerCase().includes(search.value.toLowerCase()) && search.value != "") {
            console.log(i);
            table += createrow(products[i], i);
        }
    }
    tbody.innerHTML = table;
}
searchbycategory.addEventListener("click", Searchbycategory);
function Searchbycategory() {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].Category.toLowerCase().includes(search.value.toLowerCase()) && search.value != "") {
            table += createrow(products[i], i);
        }
    }
    tbody.innerHTML = table;
}
function createrow(product, i) {
    return `<tr>
    <td class="id">${i+1}</td>
    <td class="font">${product.TITLE}</td>
    <td class="font">${product.PRICE}</td>
    <td class="font">${product.TAXS}</td>
    <td class="font">${product.ADS}</td>
    <td class="font">${product.DISCOUNT}</td>
    <td class="font">${product.TOTAL}</td>
    <td class="font">${product.Category}</td>
    <td ><button id="update" class="button font" onclick="updatedata(${i})">Update</button></td>
    <td ><button id="delete" onclick="deletedata(${i})" class="button font">Delete</button></td>
</tr>
`
}
function updatedata(i){
    title.value=products[i].TITLE;
    price.value=products[i].PRICE;
    taxs.value=products[i].TAXS;
    ads.value=products[i].ADS;
    discount.value=products[i].DISCOUNT;
    gettotal();
    category.value=products[i].Category;
    count.style.display='none';
    create.innerHTML="Update";
    mood='update';
    tmpi=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    console.log(mood);
}
function deletedata(i){
    products.splice(i,1);
    localStorage.product=JSON.stringify(products);
    showdata();
    Delete.textContent = `Delete All (${products.length}) Product`;
}
function showdata() {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        table += createrow(products[i], i);
    }
    tbody.innerHTML = table;
}

