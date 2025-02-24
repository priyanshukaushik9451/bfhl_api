// ✅ Correct API URL with HTTPS
const apiUrl = "https://php-backend.kesug.com/index.php";

// Function to send data to PHP API
function sendData() {
    let inputField = document.getElementById("jsonInput");
    let outputDiv = document.getElementById("output");
    let errorDiv = document.getElementById("errorMessage");

    outputDiv.innerHTML = "";
    errorDiv.innerHTML = "";

    let jsonData;
    
    // ✅ Validate JSON Input
    try {
        jsonData = JSON.parse(inputField.value);
    } catch (error) {
        errorDiv.innerHTML = "Invalid JSON format!";
        console.error("JSON Parse Error:", error);
        return;
    }

    console.log("📤 Sending request to API:", apiUrl);
    console.log("🔹 Request Data:", jsonData);

    // ✅ Fetch request to PHP API
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        console.log("🔹 Raw Response:", response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
    })
    .then(data => {
        console.log("✅ API Response:", data);
        displayResponse(data);
    })
    .catch(error => {
        errorDiv.innerHTML = "Error contacting API.";
        console.error("❌ Fetch Error:", error);
    });
}

// Function to display API response
function displayResponse(data) {
    let outputDiv = document.getElementById("output");

    outputDiv.innerHTML = `
        <p><strong>User ID:</strong> ${data.user_id}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Roll Number:</strong> ${data.roll_number}</p>
        <p><strong>Numbers:</strong> ${JSON.stringify(data.numbers)}</p>
        <p><strong>Alphabets:</strong> ${JSON.stringify(data.alphabets)}</p>
        <p><strong>Highest Alphabet:</strong> ${JSON.stringify(data.highest_alphabet)}</p>
    `;
}
