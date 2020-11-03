// Key access
const CACHE_KEY = "calculation_history";

// Check fitur Storage
function checkForStorage() {
  return typeof Storage !== "undefined";
}

// Add to Local Storage
function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) == null) {
      historyData = [];
    } else {
      // String Objek remove to objek Javascript
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));

      // JSON = JavaScript Object Notation. JSON digunakan dalam pertukaran data karena formatnya berbasis teks dan relatif mudah dibaca.
    }

    // Add nilai baru pada array yang ditempatkan pada awal index dan return nilai baru.
    historyData.unshift(data);

    if (historyData.length > 5) {
      // Menghapus nilai terakhir array
      historyData.pop();
    }

    // remove Javascript objek to String Objek
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    // localStorage hanya dapat menyimpan data primitif seperti string
  }
}

// Mengapa harus diubah = karena menjalan fungsi javascript

// Read
function showHistory() {
  if (checkForStorage()) {
    // Return nilai
    return JSON.parse(localStorage.getItem(CACHE_KEY) || []);
  } else {
    return [];
  }
}

// Memperlihatkan history
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";
  // Membuat elemen Wadah nilai = elemen
  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
    // Agar elemen baru tampil pada jendela browser
  }
}
