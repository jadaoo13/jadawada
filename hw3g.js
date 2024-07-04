 
/*  Name: Jada Oloruntimilehin
    File: hw3.css
    Date Created: 06/09/2024
    Date Updated: 06/27/2024
    Version: 0.1
    Purpose: Homework 3 - validation
*/

 // Slider
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slidervalue");

// Update slider value display
function updateSliderValue() {
    sliderValue.textContent = slider.value;
}

updateSliderValue();

// Add event listener for input event
slider.addEventListener("input", updateSliderValue);

// Function to set the current date in the span element
function setCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    const formattedDate = `${year}-${month}-${day}`;
    document.getElementById('dateField').innerHTML = formattedDate;
}

// Call the function to set the current date when the page loads
window.onload = setCurrentDate;

// Function to validate password complexity
function validatePasswordComplexity(password) {
    const regex = {
        length: /^.{8,}$/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/,
        special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
    };

    // Check each condition
    const isLengthValid = regex.length.test(password);
    const hasUppercase = regex.uppercase.test(password);
    const hasLowercase = regex.lowercase.test(password);
    const hasNumber = regex.number.test(password);
    const hasSpecial = regex.special.test(password);

    return {
        isLengthValid: isLengthValid,
        hasUppercase: hasUppercase,
        hasLowercase: hasLowercase,
        hasNumber: hasNumber,
        hasSpecial: hasSpecial
    };
}

// Function to update password complexity requirement status
function updateRequirementStatus(requirementId, requirementText, isValid) {
    const requirementElement = document.getElementById(requirementId);

    requirementElement.classList.remove('valid', 'invalid');

    if (isValid) {
        requirementElement.classList.add('valid');
    } else {
        requirementElement.classList.add('invalid');
    }

    requirementElement.textContent = requirementText;
}

// Function to check password complexity on input
function checkPasswordComplexity(password) {
    const requirements = validatePasswordComplexity(password);

    // Update each password complexity requirement status
    updateRequirementStatus('length', 'Password must be at least 8 characters long', requirements.isLengthValid);
    updateRequirementStatus('uppercase', 'At least one uppercase letter', requirements.hasUppercase);
    updateRequirementStatus('lowercase', 'At least one lowercase letter', requirements.hasLowercase);
    updateRequirementStatus('number', 'At least one number', requirements.hasNumber);
    updateRequirementStatus('special', 'At least one special character', requirements.hasSpecial);
}

// Validate password match
function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Handle form submission
function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordre').value;

    // Validate password complexity
    const requirements = validatePasswordComplexity(password);

    if (!requirements.isLengthValid || !requirements.hasUppercase || !requirements.hasLowercase || !requirements.hasNumber || !requirements.hasSpecial) {
        alert('Password must be at least 8 characters long and contain:\n' +
            '- At least one uppercase letter\n' +
            '- At least one lowercase letter\n' +
            '- At least one number\n' +
            '- At least one special character');
        document.querySelector('.submitbtn').style.display= 'none';
        return false; // Prevent form submission
    }

    // Validate password match
    if (!validatePasswordMatch(password, confirmPassword)) {
        alert('Passwords do not match. Please re-enter your password.');
        document.querySelector('.submitbtn').style.display = 'none';
        return false; // Prevent form submission
    }

    // If all validations pass, allow form submission
    document.querySelector('.submitbtn').style.display = 'block';
    return true;
}

// Attach event listener to form submission
document.getElementById('patientform').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});
document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('.submitbtn').style.display = 'none';
});

// Display user input at bottom of page
function getdata() {
    const form = document.getElementById('patientform');
    const formData = {};

    // Loop through every element on form
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        const name = element.name;

        if (element.type === 'checkbox') {
            if (!formData[name]) {
                formData[name] = [];
            }
            if (element.checked) {
                formData[name].push(element.value);
            }
        } else if (element.type === 'radio') {
            if (element.checked) {
                formData[name] = element.value;
            }
        } else if (name) {
            formData[name] = element.value;
        }
    }

    // Display output in table
    let output = "<h3>Form Data</h3><table border ='1' cellpadding='5' ><tr><th>Field</th><th>Value</th></tr>";
    for (let key in formData) {
        output += `<tr><td><strong>${key}:</strong></td><td>${Array.isArray(formData[key]) ? formData[key].join(',') : formData[key]}</td></tr>`;
    }
    output += "</table>";
    document.getElementById('outputformdata').innerHTML = output;
}

// Function to handle custom validity message for input
function setCustomValidityMessage(element, message) {
    element.setCustomValidity(message);
    element.nextElementSibling.textContent = message;
}

// Function to clear custom validity message for input
function clearCustomValidityMessage(element) {
    element.setCustomValidity('');
    element.nextElementSibling.textContent = '';
}

// Function to validate input based on pattern and title attributes
function validateInput(element) {
    const pattern = new RegExp(element.pattern);
    if (!pattern.test(element.value)) {
        setCustomValidityMessage(element, element.title);
    } else {
        clearCustomValidityMessage(element);
    }
}

// Function to handle input event and validate based on pattern
function handleInput(event) {
    const element = event.target;
    validateInput(element);
}

// Function to format phone number input 
function formatPhoneNumber(input) {
    let phoneNumber = input.value.trim();
    phoneNumber = phoneNumber.replace(/[^\d]/g, '');
    if (phoneNumber.length === 10) {
        phoneNumber = '(' + phoneNumber.substr(0, 3) + ')' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6);
    }
    input.value = phoneNumber;
}

// Function to validate date of birth input
function validateDateOfBirth(input) {
    let today = new Date();
    let selectedDate = new Date(input.value);

    // Validate if the date is not in the future
    if (selectedDate > today) {
        input.setCustomValidity('Date of Birth cannot be in the future.');
        input.nextElementSibling.textContent = 'Date of Birth cannot be in the future.';
        return;
    }

    // Validate if user is not more than 120 years old
    let minDOB = new Date();
    minDOB.setFullYear(minDOB.getFullYear() - 120);
    if (selectedDate < minDOB) {
        input.setCustomValidity('Date of Birth cannot be more than 120 years ago.');
        input.nextElementSibling.textContent = 'Date of Birth cannot be more than 120 years ago.';
        return;
    }

    input.setCustomValidity('');
    input.nextElementSibling.textContent = '';
}
function contactInfo(event){
alert('Contact information will be made available on July 2,2024');
}
/*validate id
function ValidateID(id){
    var pattern = /^[a-zA-Z0-9-_]+$/;
    return pattern.test(id);
}
var id= document.getElementById('userid').value;
if(!ValidateID(id)){
    alert('ID can only contain letters, numbers, dash, and underscore.');
    return false;
}
*/
//show submit button
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form with submit button hidden
    document.getElementById('submitbtn').style.display = 'none';

    // Event listener for validate button
    document.getElementById('validateBtn').addEventListener('click', function() {
        validateAndShowSubmit();
    });
});

// Function to validate and show submit button if validation passes
function validateAndShowSubmit() {
    const form = document.getElementById('patientform');
    let isValid = true;

    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(function(msg) {
        msg.textContent = '';
    });

    // Loop through all elements and validate
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (element.type !== 'submit' && element.type !== 'button') {
            if (element.required || element.value !== '') {
                if (!validateField(element)) {
                    isValid = false;
                }
            }
        }
    }

    // Show submit button if the form is valid
    if (isValid) {
        document.getElementById('submitbtn').style.display = 'block';
        console.log('Form validation successful. Submit button displayed.');
    } else {
        console.log('Form validation failed.');
    }
}

// Function to validate individual fields
function validateField(element) {
    const value = element.value;
    const errorElement = document.getElementById(`${element.id}-error`);

    switch (element.id) {
        case 'firstname':
        case 'lastname':
            if (!validateName(value)) {
                errorElement.textContent = 'Name must be 2 or more characters long, and can only contain letters, apostrophes, and dashes.';
                return false;
            }
            break;
        case 'middleinit':
            if (value !== '' && !validateMiddleInitial(value)) {
                errorElement.textContent = 'Middle Initial must be 1 character long and can only contain letters.';
                return false;
            }
            break;
        case 'birthdate':
            if (!validateDateOfBirth2(element)) {
                errorElement.textContent = 'Please enter a valid date.';
                return false;
            }
            break;
        case 'social':
            if (!validateSSN(value)) {
                errorElement.textContent = 'Social Security Number must be in the format 000-00-0000.';
                return false;
            }
            break;
        case 'insuranceholder':
        case 'insurance_lastname':
            if (!validateName(value)) {
                errorElement.textContent = 'Name must be 2 or more characters long, and can only contain letters, apostrophes, and dashes.';
                return false;
            }
            break;
        case 'insurance_middleinit':
            if (value !== '' && !validateMiddleInitial(value)) {
                errorElement.textContent = 'Middle Initial must be 1 character long and can only contain letters.';
                return false;
            }
            break;
        case 'insurance_birthdate':
            if (!validateDateOfBirth2(element)) {
                errorElement.textContent = 'Please enter a valid date.';
                return false;
            }
            break;
        case 'insurance_social':
            if (!validateSSN(value)) {
                errorElement.textContent = 'Social Security Number must be in the format 000-00-0000.';
                return false;
            }
            break;
        case 'address':
        case 'address2':
        case 'city':
            if (!validateText(value, 2, 30)) {
                errorElement.textContent = 'Field must be between 2 and 30 characters long.';
                return false;
            }
            break;
        case 'state':
            if (value === '') {
                errorElement.textContent = 'Please select a State from the dropdown.';
                return false;
            }
            break;
        case 'zip':
            if (!validateZipCode(value)) {
                errorElement.textContent = 'Zip Code must be 5 digits.';
                return false;
            }
            break;
        case 'phone':
            if (!validatePhone(value)) {
                errorElement.textContent = 'Please enter phone number.';
                return false;
            }
            break;
        case 'email':
            if (!validateEmail(value)) {
                errorElement.textContent = 'Please enter email.';
                return false;
            }
            break;
        case 'userid':
            if (!validateUserID(value)) {
                errorElement.textContent = 'User ID must start with a letter, be 5 to 20 characters long, and contain only letters, numbers, dashes, and underscores.';
                return false;
            }
            break;
        case 'password':
            if (!validatePassword(value)) {
                errorElement.textContent = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and must not equal User ID.';
                return false;
            }
            break;
        case 'passwordre':
            const passwordElement = document.getElementById('password');
            if (!passwordElement) {
                console.error('Password element not found.');
                return false;
            }
            break;
    }
    return true;
}

// Validation functions for specific fields
function validateName(name) {
    const regex = /^[a-zA-Z'-]{2,}$/;
    return regex.test(name);
}

function validateMiddleInitial(initial) {
    const regex = /^[a-zA-Z]$/;
    return regex.test(initial);
}

function validateDateOfBirth2(input) {
    if (input.value === '') {
        input.nextElementSibling.textContent = 'Date of Birth cannot be left blank.';
        return false;
    }
    
    input.nextElementSibling.textContent = '';
    return true;
}

function validateSSN(ssn) {
    return ssn!== '';
}

function validateText(text, min, max) {
    return text.length >= min && text.length <= max;
}

function validateZipCode(zip) {
    const regex = /^\d{5}$/;
    return regex.test(zip);
}

function validatePhone(phone) {
    return phone !== '';
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validateUserID(userid) {
    const regex = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;
    return regex.test(userid);
}

function validatePassword(password) {
    const regex = {
        length: /^.{8,}$/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/
    };

    const isLengthValid = regex.length.test(password);
    const hasUppercase = regex.uppercase.test(password);
    const hasLowercase = regex.lowercase.test(password);
    const hasNumber = regex.number.test(password);
    const notEqualUserID = (password.toLowerCase() !== document.getElementById('userid').value.toLowerCase());

    return isLengthValid && hasUppercase && hasLowercase && hasNumber && notEqualUserID;
}
