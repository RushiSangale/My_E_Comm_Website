document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    try {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        let errors = [];

        // Name validation
        if (name.length < 2) {
            errors.push("Name must be at least 2 characters");
        }

        // Email validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
        if (!email.match(emailPattern)) {
            errors.push("Invalid email format");
        }

        // Message validation
        if (message.length < 5) {
            errors.push("Message must be at least 5 characters");
        }

        const msgBox = document.getElementById("formMessage");

        // Show errors
        if (errors.length > 0) {
            msgBox.innerHTML = `
                <div class="alert alert-danger">
                    ${errors.join("<br>")}
                </div>
            `;
            return;
        }

        // Success
        msgBox.innerHTML = `
            <div class="alert alert-success">
                Message sent successfully! 🎉
            </div>
        `;

        // Reset form
        document.getElementById("contactForm").reset();

    } catch (error) {
        console.error(error);

        document.getElementById("formMessage").innerHTML = `
            <div class="alert alert-danger">
                Something went wrong!
            </div>
        `;
    }
});