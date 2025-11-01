document.getElementById("execomDropdown").addEventListener("change", function () {
    let selectedList = this.value;
    document.querySelectorAll(".execom-list").forEach(list => {
        list.style.display = "none"; // Hide all lists
    });
    document.getElementById(selectedList).style.display = "block"; // Show selected list
});



// Function to load the Execom page dynamically
function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
            attachBackButton(); // Attach event to Back to Home button

            // Ensure the page starts from the top
            window.scrollTo(0, 0);
        })
        .catch(error => console.error("Error loading page:", error));
}

// Function to attach the Back to Home button event
function attachBackButton() {
    const backButton = document.getElementById("backToHome");
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "index.html"; // Redirect to home page
        });
    }
}

// Attach event to the "See More" button
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("seeMoreBtn").addEventListener("click", function (event) {
        event.preventDefault();
        loadPage("execom.html"); // Load Execom page
    });
});
