let codes = JSON.parse(localStorage.getItem("codes")) || [];
let editIndex = -1;

// ➕ Save from Add Page
function saveAndRedirect() {
    let title = document.getElementById("title").value.trim();
    let category = document.getElementById("category").value;
    let code = document.getElementById("code").value.trim();
    let desc = document.getElementById("desc").value.trim();

    if (title === "" || code === "") {
        alert("Title and Code required!");
        return;
    }

    codes.push({ title, category, code, desc });
    localStorage.setItem("codes", JSON.stringify(codes));

    window.location.href = "index.html";
}

// 📂 Display Codes
function displayCodes() {
    let list = document.getElementById("codeList");
    if (!list) return;

    let search = document.getElementById("search").value.toLowerCase();
    list.innerHTML = "";

    codes.forEach((c, index) => {
        if (c.title.toLowerCase().includes(search)) {
            list.innerHTML += `
            <div class="card">
                <h4>${c.title}</h4>
                <small>📂 ${c.category}</small>

                <pre>${c.code}</pre>

                <p>${c.desc}</p>

                <div style="margin-top:10px;">
                    <button onclick="viewCode(${index})">👁️ View</button>
                    <button class="edit-btn" onclick="editCode(${index})">✏️ Edit</button>
                    <button class="delete-btn" onclick="deleteCode(${index})">🗑️ Delete</button>
                    <button onclick="copyCode(\`${c.code}\`)">📋 Copy</button>
                </div>
            </div>
            `;
        }
    });
}

// 👁️ View
function viewCode(index) {
    localStorage.setItem("viewCode", JSON.stringify(codes[index]));
    window.location.href = "view.html";
}

// ✏️ Edit
function editCode(index) {
    let c = codes[index];

    localStorage.setItem("editCode", JSON.stringify({ ...c, index }));
    window.location.href = "add.html";
}

// 🗑️ Delete
function deleteCode(index) {
    if (confirm("Delete this code?")) {
        codes.splice(index, 1);
        localStorage.setItem("codes", JSON.stringify(codes));
        displayCodes();
    }
}

// 📋 Copy
function copyCode(text) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
}

// 🌙 Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark");
}

// 🔁 Load Edit Data
window.onload = function () {
    let editData = JSON.parse(localStorage.getItem("editCode"));

    if (editData) {
        document.getElementById("title").value = editData.title;
        document.getElementById("category").value = editData.category;
        document.getElementById("code").value = editData.code;
        document.getElementById("desc").value = editData.desc;

        codes[editData.index] = editData;
        localStorage.removeItem("editCode");
        localStorage.setItem("codes", JSON.stringify(codes));
    }

    displayCodes();
};