// ===== Elements =====
const scanBtn = document.getElementById('scanBtn');
const productList = document.getElementById('productList');
const totalDisplay = document.getElementById('total');
const beepSound = new Audio('cashier-beep.mp3');

let cart = [];
let total = 0;

// ===== Barcode Scanner =====
scanBtn.addEventListener('click', () => {
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#scanner')
    },
    decoder: { readers: ["code_128_reader","ean_reader","ean_8_reader"] },
  }, function(err) {
    if (err) { console.log(err); return; }
    Quagga.start();
  });

  Quagga.onDetected((data) => {
    const code = data.codeResult.code;
    Quagga.stop();
    beepSound.play();
    addProductByBarcode(code);
  });
});

// ===== Add Product =====
function addProductByBarcode(barcode) {
  db.collection('products').doc(barcode).get()
    .then(doc => {
      if (doc.exists) {
        const product = doc.data();
        cart.push(product);
        updateCartUI();
        saveSale(product);
      } else {
        alert('Produit non trouvé !');
      }
    });
}

// ===== Update UI =====
function updateCartUI() {
  productList.innerHTML = '';
  total = 0;
  cart.forEach(p => {
    productList.innerHTML += `<li>${p.name} - ${p.price} TND</li>`;
    total += p.price;
  });
  totalDisplay.textContent = `Total: ${total.toFixed(2)} TND`;
}

// ===== Save Sale =====
function saveSale(product) {
  db.collection('sales').add({
    product: product.name,
    price: product.price,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
}
