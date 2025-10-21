let products = [];
let sales = [];
let productId = 1;

// Add Product
function addProduct() {
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  if (!name || !price) {
    alert("Please enter product name and price.");
    return;
  }

  products.push({ id: productId++, name, price });
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  updateProductList();
  updateProductSelects();
}

// Add Sale
function addSale() {
  const productId = parseInt(document.getElementById("productSelect").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  if (!productId || !quantity) {
    alert("Please select product and enter quantity.");
    return;
  }

  // Check if product already has a sale
  const existingSale = sales.find(s => s.productId === productId);
  if (existingSale) {
    existingSale.quantity += quantity;
  } else {
    sales.push({ productId, quantity });
  }

  document.getElementById("quantity").value = "";
  updateAnalytics();
}

// Update / Edit Sale
function updateSale() {
  const productId = parseInt(document.getElementById("editProductSelect").value);
  const newQty = parseInt(document.getElementById("editQuantity").value);

  if (!productId || !newQty) {
    alert("Please select product and enter new quantity.");
    return;
  }

  const sale = sales.find(s => s.productId === productId);
  if (sale) {
    sale.quantity = newQty;
    alert("Sale updated successfully!");
  } else {
    alert("No sale found for that product.");
  }

  document.getElementById("editQuantity").value = "";
  updateAnalytics();
}

// Delete Product
function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  sales = sales.filter(s => s.productId !== id);
  updateProductList();
  updateProductSelects();
  updateAnalytics();
}

// Update Product List
function updateProductList() {
  const table = document.getElementById("productTable");
  table.innerHTML = "";
  products.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>₱${p.price.toFixed(2)}</td>
        <td>
          <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Update Dropdown Lists (for Add & Edit Sale)
function updateProductSelects() {
  const addSelect = document.getElementById("productSelect");
  const editSelect = document.getElementById("editProductSelect");

  addSelect.innerHTML = "<option value=''>Select Product</option>";
  editSelect.innerHTML = "<option value=''>Select Product to Edit</option>";

  products.forEach(p => {
    addSelect.innerHTML += <option value="${p.id}">${p.name}</option>;
    editSelect.innerHTML += <option value="${p.id}">${p.name}</option>;
  });
}

// Analytics (Simulated SQL Subquery)
function updateAnalytics() {
  const analytics = products.map(p => {
    const totalSold = sales
      .filter(s => s.productId === p.id)
      .reduce((sum, s) => sum + s.quantity, 0);

    const totalRevenue = totalSold * p.price;
    return { name: p.name, totalSold, totalRevenue };
  });

  analytics.sort((a, b) => b.totalSold - a.totalSold);

  const table = document.getElementById("analyticsTable");
  table.innerHTML = "";
  analytics.forEach((a, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${a.name}</td>
        <td>${a.totalSold}</td>
        <td>₱${a.totalRevenue.toFixed(2)}</td>
      </tr>
    `;
  });
}

updateProductList();
updateProductSelects();
updateAnalytics();