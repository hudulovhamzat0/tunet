// Set the star rating to 4.6 on page load
function setStarRating(rating) {
  // Ensure rating is between 0 and 5
  rating = Math.max(0, Math.min(5, rating));

  // Calculate the percentage for partial star filling
  const percentage = (rating / 5) * 100;

  // Update the filled stars width
  const starsFilled = document.getElementById("starsFilled");
  if (starsFilled) {
    starsFilled.style.width = percentage + "%";
  }
}

// Initialize with 4.6 rating when page loads
document.addEventListener("DOMContentLoaded", function () {
  setStarRating(4.6);
});

// Form submission
document
  .getElementById("businessForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(this);
    const jsonData = {};

    // Convert FormData to JSON object
    for (let [key, value] of formData.entries()) {
      // Handle file inputs separately
      if (key === "images") {
        if (!jsonData.images) jsonData.images = [];
        jsonData.images.push(value.name);
      } else {
        jsonData[key] = value;
      }
    }

    // Add form field names for easier backend processing
    const inputs = this.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select, textarea'
    );
    inputs.forEach((input, index) => {
      const label = input.parentElement
        .querySelector("label")
        ?.textContent.replace(" *", "")
        .trim();
      if (label && input.value) {
        switch (label) {
          case "Ad":
            jsonData.firstName = input.value;
            break;
          case "Soyad":
            jsonData.lastName = input.value;
            break;
          case "Email":
            jsonData.email = input.value;
            break;
          case "Telefon nömrəsi":
            jsonData.phone = input.value;
            break;
          case "Biznesin adı":
            jsonData.businessName = input.value;
            break;
          case "Slogan":
            jsonData.slogan = input.value;
            break;
          case "Kateqoriya":
            jsonData.category = input.value;
            break;
          case "Min qiymət":
            jsonData.minPrice = parseFloat(input.value) || 0;
            break;
          case "Max qiymət":
            jsonData.maxPrice = parseFloat(input.value) || 0;
            break;
          case "Ölçü haqqında":
            jsonData.description = input.value;
            break;
        }
      }
    });

    // Add timestamp
    jsonData.timestamp = new Date().toISOString();
    jsonData.submissionId = Date.now().toString();

    try {
      // Show loading state
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Göndərilir...";
      submitBtn.disabled = true;

      // Post to backend
      const response = await fetch("/backend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);

        // Show success modal
        document.getElementById("successModal").style.display = "flex";

        // Reset form
        this.reset();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error message
      alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      // Reset button state
      const submitBtn = this.querySelector(".submit-btn");
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

// File upload feedback
document.getElementById("fileInput").addEventListener("change", function (e) {
  const files = e.target.files;
  const uploadArea = document.querySelector(".file-upload");

  if (files.length > 0) {
    uploadArea.innerHTML = `
                    <div class="file-upload-icon">✅</div>
                    <p>${files.length} fayl seçildi</p>
                    <p style="font-size: 12px; color: #999;">Yenidən seçmək üçün klikləyin</p>
                `;
    uploadArea.style.borderColor = "#4CAF50";
    uploadArea.style.background = "#f0fff0";
  }
});

// Smooth animations
document.querySelectorAll("input, textarea, select").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});
