const header = document.querySelector('.header');
const urlShoes = 'http://localhost:3000/product?category=111'
const urlWear = 'http://localhost:3000/product?category=112'
const urlClother = 'http://localhost:3000/product?category=113'

// onload
window.onload = () => {
    GetDataProduct(urlShoes, renderData);
    GetDataProduct(urlWear, renderDataWear);
    GetDataProduct(urlClother, renderDataClother);


    GetDataCart();
}
// scrolltoTop
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 150) {
        header.classList.add('active');
        scrollTop.classList.add('in_out');
    }
    else {
        header.classList.remove('active');
        scrollTop.classList.remove('in_out');
    }
})
const Menu = document.querySelector('.header__menu');
const headerContent = document.querySelector('.header__content')
Menu.addEventListener('click', () => {
    headerContent.classList.toggle('header--active')
})
// Modal

let modalApp = document.querySelector('.modal__app');
let modal = document.querySelector('.modal');
let cart = document.querySelector('.cart');
let Close = document.querySelector('.close');
let Cancel = document.querySelector('.cancel');
cart.addEventListener('click', () => {
    modalApp.style.display = 'block';
    modal.style.display = 'block';
})
Close.addEventListener('click', () => {
    modalApp.style.display = 'none';
    // modal.style.display = 'none';

})
Cancel.addEventListener('click', () => {
    modalApp.style.display = 'none';
    // modal.style.display = 'none';

})

// scrollTop
const scrollTop = document.querySelector('.scrolltop');
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
})


// Buy fashion
let data = [];


//
const rowShoes = document.querySelector('.SHOES');
const WEAR = document.querySelector('.WEAR');
const CLOTHER = document.querySelector('.CLOTHER');
const tableBody = document.querySelector('#data');
const ElementSearch = document.querySelector('#Element');

// ----Shoes in cart----
function renderData(data) {
    data.forEach((item) => {
        let result = Number(item.money);
        result = result.toLocaleString('vi', { style: 'currency', currency: 'VND' })

        let ITEMshoes = ''
        ITEMshoes = `
        <div class="col-xl-4 col-lg-6 col-12 shoes__content wow animate__bounceIn" data-wow-delay=${1}s>
        <div class="shoes__product">
          <div class="shoes__content--item">
            <img src=${item.img} alt="">
            <div class="Buy">
              <button class="buy--shoes" onclick= PostData(${item.id}) type="submit">Mua</button>
              <button class="view--shoes">Chi tiết</button>
            </div>
          </div>
          <p class="name--fashion">${item.nameproduct}</p>
          <span class="cost--fashion">Giá: ${result} </span>
        </div>
      </div>
      `
        rowShoes.innerHTML += ITEMshoes
    })
}

// ----Wear in cart----

function renderDataWear(data) {
    data.forEach((item) => {
        let result = Number(item.money);
        result = result.toLocaleString('vi', { style: 'currency', currency: 'VND' })

        let ITEMwear = ''
        ITEMwear = `
        <div class=" shoes__content">
            <div class="shoes__product">
              <div class="shoes__content--item">
                <img src=${item.img} alt="">
                <div class="Buy">
                  <button class="buy--shoes" onclick= PostData(${item.id}) type="submit">Mua</button>
                  <button class="view--shoes">Chi tiết</button>
                </div>
              </div>
              <p class="name--fashion">${item.nameproduct}</p>
              <span class="cost--fashion">Giá: ${result}</span>
            </div>
          </div>
        `
        WEAR.innerHTML += ITEMwear
    })
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
}

// ----Clother in cart----

function renderDataClother(data) {
    data.forEach((items) => {
        let result = Number(items.money);
        result = result.toLocaleString('vi', { style: 'currency', currency: 'VND' })

        let ITEMclothor = ''
        ITEMclothor = `
        <div class="col-xl-3 col-lg-6 col-12 shoes__content wow animate__bounceIn" data-wow-delay=${1}s>
        <div class="shoes__product">
          <div class="shoes__content--item">
            <img src=${items.img} alt="">
            <div class="Buy">
              <button class="buy--shoes" onclick = PostData(${items.id}) type="submit">Mua</button>
              <button class="view--shoes">Chi tiết</button>
            </div>
          </div>
          <p class="name--fashion">${items.nameproduct}</p>
          <span class="cost--fashion">${result}</span>
        </div>
      </div>
        `
        CLOTHER.innerHTML += ITEMclothor
    })
}

//------ Push All in table-----

const SumCost = document.querySelector('.Sum--cost');
function renderDataGet(shop) {
    let sum = 0;
    shop.forEach((items) => {
        const tr = document.createElement('tr');
        const thID = document.createElement('th');
        const thProduct = document.createElement('th');
        const thMoney = document.createElement('th');
        const thNumber = document.createElement('th');
        let DIV = ''
        DIV = `<img src=${items.img} alt="">`

        let result = Number(items.money) * Number(items.number);
        result = result.toLocaleString('vi', { style: 'currency', currency: 'VND' })

        thID.innerText = items.id
        thProduct.innerHTML = items.nameproduct + DIV
        thMoney.innerText = result

        const idRemove = items.id
        thNumber.innerHTML =
            `<div class="number__product">
                  <button class="increase" onclick = Increase(${items.id})>+</button>
                  <input type="text" max="15" min="1" class="number__product--item" value="${items.number}">
                  <button class="reduce" onclick =   Decrease(${items.id})>-</button>
       </div>` +
            `<span onclick = DeleteData(${idRemove})>Hủy</span>`

        tr.appendChild(thID)
        tr.appendChild(thProduct)
        tr.appendChild(thMoney)
        tr.appendChild(thNumber)

        tableBody.appendChild(tr);

        sum += Number(items.money) * Number(items.number)
        SumCost.innerHTML = sum.toLocaleString('vi', { style: 'currency', currency: 'VND' })
    })
}

// -----PostData Cart---- 

function PostData(id) {
    let flag = false;
    const result = data.find((item) => {
        return item.id === id
    })
    for (const value of CheckIDcart) {
        if (result.id !== value) {
            flag = true
        }
        else {
            flag = false
            break;
        }
    }
    if (flag == false) {
        alert("Hàng đã được thêm vào giỏ")
    }
    else {
        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result)
        })
            .then(res => res.json())
            .then((item) => {
                console.log('Successlly');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}


// ------GetData Cart----
let shop = [];
let CheckIDcart = []
const numberIcon = document.querySelector('.number__cart--icon');

function GetDataCart() {
    fetch('http://localhost:3000/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(items => {
            shop = items
            const length = shop.length
            numberIcon.innerHTML = length
            renderDataGet(items)
            for (let index = 0; index < length; index++) {
                CheckIDcart.push(items[index].id)
            }
            console.log(CheckIDcart);

        })
}
// -----Get product---
function GetDataProduct(url, renderData) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(item => {

            //  "đưa về 1 mảng"
            item.forEach((product) => {
                data.push(product)
            })
            renderData(item)
        })
}

//----- DeleteData-----
function DeleteData(id) {
    fetch(`http://localhost:3000/cart/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => console.log('delete success'))
}

// ---Increase and reduce---
// ----PUTDATA---
function Putdata(item, id) {
    fetch(`http://localhost:3000/cart/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

function Increase(id) {
    const result = shop.find(item => {
        if (item.id === id) {
            return item
        }
    })
    result.number += 1
    Putdata(result, id)
}

function Decrease(id) {
    const result = shop.find(item => {
        if (item.id === id) {
            return item
        }
    })
    if (result.number > 1) {
        result.number -= 1
    }
    Putdata(result, id)
}
// Search Data
function renderDataSearch(data) {
    ElementSearch.innerHTML = ''
    data.forEach((item) => {
        let result = Number(item.money);
        result = result.toLocaleString('vi', { style: 'currency', currency: 'VND' })

        let ITEMshoes = ''
        ITEMshoes = `
        <div class="col-xl-4 col-lg-6 col-12 shoes__content">
        <div class="shoes__product">
          <div class="shoes__content--item">
            <img src=${item.img} alt="">
            <div class="Buy">
              <button class="buy--shoes" onclick= PostData(${item.id}) type="submit">Mua</button>
              <button class="view--shoes">Chi tiết</button>
            </div>
          </div>
          <p class="name--fashion">${item.nameproduct}</p>
          <span class="cost--fashion">Giá: ${result} </span>
        </div>
      </div>
      `
        ElementSearch.innerHTML += ITEMshoes
    })
}

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");

    return str;
}

const ContentSearch = document.querySelector('.content--search');
const Search = document.querySelector('.search--icon');

Search.addEventListener('click', () => {
    const check = ContentSearch.value;
    let DATA = data.filter((item) => {
        if (check == '') {
            return null;
        }
        else {
            return removeAscent(item.nameproduct).toLocaleLowerCase().includes(removeAscent(check).trim().toLocaleLowerCase())
        }
    })
    renderDataSearch(DATA)

})