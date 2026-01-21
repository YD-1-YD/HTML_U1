// ========== FORM VALIDATION WITH MODERN TECHNIQUES ==========

// Get DOM elements
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const successMessage = document.getElementById("successMessage");
const progressFill = document.getElementById("progressFill");

// Error message elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const ageError = document.getElementById("ageError");

// ========== VALIDATION MESSAGES ==========
const validationMessages = {
    name: {
        valueMissing: "Name is required",
        patternMismatch: "Name must contain only letters (min 3 characters)",
        tooShort: "Name must be at least 3 characters long"
    },
    email: {
        valueMissing: "Email is required",
        typeMismatch: "Please enter a valid email address",
        badInput: "Invalid email format"
    },
    age: {
        valueMissing: "Age is required",
        rangeUnderflow: "You must be at least 18 years old",
        rangeOverflow: "Age cannot exceed 100 years",
        badInput: "Please enter a valid age"
    }
};

// ========== UPDATE PROGRESS BAR ==========
function updateProgress() {
    const fields = [nameInput, emailInput, ageInput];
    const filledFields = fields.filter(field => field.value.trim() !== '').length;
    const progress = (filledFields / fields.length) * 100;
    progressFill.style.width = progress + '%';
}

// ========== REAL-TIME VALIDATION FUNCTION ==========
function validateField(input, errorElement, fieldName) {
    const validity = input.validity;
    let errorMessage = "";

    if (validity.valueMissing) {
        errorMessage = validationMessages[fieldName].valueMissing;
    } else if (validity.patternMismatch) {
        errorMessage = validationMessages[fieldName].patternMismatch;
    } else if (validity.typeMismatch) {
        errorMessage = validationMessages[fieldName].typeMismatch;
    } else if (validity.tooShort) {
        errorMessage = validationMessages[fieldName].tooShort;
    } else if (validity.rangeUnderflow) {
        errorMessage = validationMessages[fieldName].rangeUnderflow;
    } else if (validity.rangeOverflow) {
        errorMessage = validationMessages[fieldName].rangeOverflow;
        errorMessage = validationMessages[fieldName].rangeOverflow;
    } else if (validity.badInput) {
        errorMessage = validationMessages[fieldName].badInput;
    }

    errorElement.textContent = errorMessage;
    return validity.valid;
}

// ========== EVENT LISTENERS FOR REAL-TIME VALIDATION ==========

// Name validation with progress update
nameInput.addEventListener("blur", () => {
    validateField(nameInput, nameError, "name");
    updateProgress();
});

nameInput.addEventListener("input", () => {
    validateField(nameInput, nameError, "name");
    updateProgress();
});

// Email validation with progress update
emailInput.addEventListener("blur", () => {
    validateField(emailInput, emailError, "email");
    updateProgress();
});

emailInput.addEventListener("input", () => {
    validateField(emailInput, emailError, "email");
    updateProgress();
});

// Age validation with progress update
ageInput.addEventListener("blur", () => {
    validateField(ageInput, ageError, "age");
    updateProgress();
});

ageInput.addEventListener("input", () => {
    validateField(ageInput, ageError, "age");
    updateProgress();
});

// ========== FORM SUBMISSION ==========
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Clear previous success message
        successMessage.style.display = "none";

        // Validate all fields
        const isNameValid = validateField(nameInput, nameError, "name");
        const isEmailValid = validateField(emailInput, emailError, "email");
        const isAgeValid = validateField(ageInput, ageError, "age");

        if (isNameValid && isEmailValid && isAgeValid) {
            // Gather form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                age: parseInt(ageInput.value)
            };

            // Simulate API call (in real app, this would send to server)
            try {
                // Show loading state
                const button = form.querySelector('button[type="submit"]');
                const btnText = button.querySelector('.btn-text');
                const btnLoader = button.querySelector('.btn-loader');
                btnText.style.display = 'none';
                btnLoader.style.display = 'flex';
                button.disabled = true;

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Log form data (for development)
                console.log("Form submitted successfully:", formData);

                // Show success message with animation
                successMessage.style.display = "flex";
                successMessage.animate([
                    { transform: 'scale(0.95)', opacity: 0 },
                    { transform: 'scale(1)', opacity: 1 }
                ], { duration: 300 });

                // Reset form
                form.reset();
                nameError.textContent = "";
                emailError.textContent = "";
                ageError.textContent = "";
                progressFill.style.width = '0%';

                // Restore button
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                button.disabled = false;

                // Hide success message after 4 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 4000);

            } catch (error) {
                console.error("Form submission error:", error);
                const button = form.querySelector('button[type="submit"]');
                const btnText = button.querySelector('.btn-text');
                const btnLoader = button.querySelector('.btn-loader');
                emailError.textContent = "An error occurred. Please try again.";
                button.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        }
    });
});

// ========== UTILITY FUNCTIONS ==========

// Focus management for accessibility
function manageFocus() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    form.querySelector('button').focus();
                }
            }
        });
    });
}

// Initialize focus management on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', manageFocus);
} else {
    manageFocus();
}
