const apiUrl = "https://php-backend.kesug.com/index.php";
// Change this to your API URL after deployment

// Function to send data to PHP API
function sendData() {
    let inputField = document.getElementById("jsonInput");
    let outputDiv = document.getElementById("output");
    let errorDiv = document.getElementById("errorMessage");

    outputDiv.innerHTML = "";
    errorDiv.innerHTML = "";

    let jsonData;
    try {
        jsonData = JSON.parse(inputField.value);
    } catch (error) {
        errorDiv.innerHTML = "Invalid JSON format!";
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        displayResponse(data);
    })
    .catch(error => {
        errorDiv.innerHTML = "Error contacting API.";
    });
}

// Function to display response data
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

// Function to filter displayed response
function filterResponse() {
    let filterValue = document.getElementById("filterDropdown").value;
    let responseDiv = document.getElementById("output");
    
    let responseData = JSON.parse(sessionStorage.getItem("lastResponse"));
    
    if (!responseData) return;

    let filteredOutput = `<p><strong>User ID:</strong> ${responseData.user_id}</p>`;
    
    if (filterValue === "all" || filterValue === "numbers") {
        filteredOutput += `<p><strong>Numbers:</strong> ${JSON.stringify(responseData.numbers)}</p>`;
    }
    
    if (filterValue === "all" || filterValue === "alphabets") {
        filteredOutput += `<p><strong>Alphabets:</strong> ${JSON.stringify(responseData.alphabets)}</p>`;
    }
    
    if (filterValue === "all" || filterValue === "highest_alphabet") {
        filteredOutput += `<p><strong>Highest Alphabet:</strong> ${JSON.stringify(responseData.highest_alphabet)}</p>`;
    }

    responseDiv.innerHTML = filteredOutput;
}
