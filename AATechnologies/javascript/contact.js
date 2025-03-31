async function Submit() {
    const formData = retrieveData(); // Get form data
    if (!formData) {
        document.getElementById("msg").innerHTML = "<p style='color:red;'>All fields are required. Please fill them out!</p>";
        return;
    }

    const url = "http://localhost:3000/submit-form"; // Your server endpoint
    const method = "POST"; // Since this is form submission, it's always POST

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json(); // Parse response body
        console.log("Server Response:", result); // Log response

        if (response.ok) {
            document.getElementById("msg").innerHTML = "<p style='color:green;'>Form successfully submitted!</p>";
            document.getElementById("contactForm").reset(); // Reset the form
        } 
        else {
            document.getElementById("msg").innerHTML = `<p style='color:red;'>Error: ${result.error || "Something went wrong!"}</p>`;
        }
    } 
    
    catch (error) {
        console.error("Error:", error);
        document.getElementById("msg").innerHTML = "<p style='color:red;'>An error occurred while submitting!</p>";
    }
}

function retrieveData() {
  const name = document.getElementById("formGroupExampleInput").value.trim();
  const email = document.getElementById("formGroupExampleInput2").value.trim();
  const phone = document.getElementById("formGroupExampleInput3").value.trim();
  const service = document.querySelector('input[name="service"]:checked')?.value || "";
  const message = document.querySelector("textarea").value.trim();

  if (!name || !email || !phone || !service || !message) {
      return null; // If any field is empty, return null
  }

  return { name, email, phone, service, message };
}