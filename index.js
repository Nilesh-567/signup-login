// Function to open the modal
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Tab functionality
function openTab(tabName) {
    const forms = document.querySelectorAll(".form");
    const tabLinks = document.querySelectorAll(".tab-link");

    forms.forEach(form => form.classList.remove("active"));
    tabLinks.forEach(tab => tab.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add("active");
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal();
    }
}


let result = document.getElementById("result"); 


document.getElementById("signup").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect data from form fields
    const signupData = {
        email: document.getElementById("signup-email").value,
        password: document.getElementById("signup-password").value,
        institute: document.getElementById("institute").value
    };

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        });

        if (response.ok) {
            alert("Signup successful!");
            result.text = "Signup Successful";
            result.innerHTML = "Signup Successful";
           result.innerText = "Signup Successful";

            document.getElementById("signup-form").reset(); 
        } else {
            alert("Signup failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});






// for signin form 



document.getElementById("signin").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect data from form fields
    const signinData = {
        email: document.getElementById("signin-email").value,
        password: document.getElementById("signin-password").value
    };

    try {
        const response = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signinData)
        });

        if (response.ok) {
            const message = await response.text();
            alert(message);
           result.text = "Signin Successful";
           result.innerHTML = "Signin Successful";
           result.innerText = "Signin Successful";

        } else {
            alert("Authentication failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

