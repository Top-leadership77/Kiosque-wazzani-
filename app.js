let cart = {};
let total = 0;

// Scanner setup
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function(content) {
  playBeep();
  addToCart(content);
});

Instascan.Camera.getCameras().then(function(cameras){
  if(cameras.length > 0) { scanner.start(cameras[0]); }
});

// إضافة المنتج للسلع
function addToCart(barcode) {
  db.collection("products").doc(barcode).get().then(doc => {
    if(doc.exists){
      const data = doc.data();
      if(cart[barcode]){
        cart[barcode].qty++;
      } else {
        cart[barcode] = { name:data.name, price:data.price, qty:1 };
      }
      renderCart();
    } else {
      alert("Produit non trouvé !");
    }
  });
}

// تحديث جدول الكاشير
function renderCart() {
  const tbody = document.querySelector("#cart-table tbody");
  tbody.innerHTML = "";
  total = 0;
  for(let key in cart){
    const item = cart[key];
    const row = `<tr>
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.qty}</td>
      <td>${(item.price*item.qty).toFixed(2)}</td>
    </tr>`;
    tbody.innerHTML += row;
    total += item.price*item.qty;
  }
  document.getElementById('total').textContent = total.toFixed(2);
}

// صوت الكاشير
function playBeep() {
  const audio = new Audio('cashier-beep.mp3');
  audio.play();
}
