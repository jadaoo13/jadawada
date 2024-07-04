/* 
   Name: Jada Oloruntimilehin
   File: hw4.js
   Date Created: 06/09/2024
   Date Updated: 07/03/2024
   Version: 0.3
   Purpose: Homework 4 - validation and cookie management
*/

console.log("Testing console log");

document.addEventListener('DOMContentLoaded', function () {
    // Check if cookie exists and retrieve first name
    let firstname = getCookie('firstname');

    // Display greeting message based on cookie presence
    if (firstname) {
        document.getElementById('greetingMessage').textContent = `Welcome back, ${firstname}!`;
    } else {
        document.getElementById('greetingMessage').textContent = 'Welcome, New User!';
    }

    // Attach event listeners
    document.getElementById('patientform').addEventListener('submit', handleSubmit);
    document.getElementById('newUserCheckbox').addEventListener('change', handleNewUserCheckbox);
    document.getElementById('rememberMeCheckbox').addEventListener('change', saveFormData); // Added event listener for Remember Me checkbox

    // Function to handle form submission
    function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    let firstnameInput = document.getElementById('firstname');
    let firstnameValue = firstnameInput.value.trim();
    let rememberMe = document.getElementById('rememberMeCheckbox').checked;

    // Save first name if "Remember Me" is checked
    if (rememberMe) {
        saveFirstname(firstnameValue);
    }

    // Update greeting message
    document.getElementById('greetingMessage').textContent = `Welcome, ${firstnameValue}!`;

    // Manually submit the form
    document.getElementById('patientform').submit();
}

    // Function to handle "New User" checkbox
    function handleNewUserCheckbox() {
        let checkbox = document.getElementById('newUserCheckbox');
        if (checkbox.checked) {
            // Expire the cookie and clear form data
            deleteCookie('firstname');
            document.getElementById("patientform").reset();
            document.getElementById('greetingMessage').textContent = 'Welcome, New User!';
            console.log("New user checkbox checked!");
        } else {
            // Restore greeting message for returning user
            if (firstname) {
                document.getElementById('greetingMessage').textContent = `Welcome back, ${firstname}!`;
            }
            console.log("New user checkbox unchecked!");
        }
    }

 // Function to save form data when "Remember Me" is checked
function saveFormData() {
    // Retrieve the value of the firstname input field
    let firstnameValue = document.getElementById('firstname').value.trim();
    
    // Check if the Remember Me checkbox is checked
    let rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
    
    if (rememberMeCheckbox.checked) {
        // Save firstname in a cookie with an expiry date (e.g., 30 days)
        setCookie('firstname', firstnameValue, 30);
    } else {
        // Clear the firstname cookie if Remember Me is unchecked
        deleteCookie('firstname');
    }
}


    // Function to save first name to cookie (for "Remember Me")
    function saveFirstname(firstname) {
        let expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days expiry
        document.cookie = `firstname=${firstname}; expires=${expiryDate.toUTCString()}; path=/;`;
        console.log(`Cookie 'firstname' set with value: ${firstname}`);
    }

    // Function to clear form data and update greeting
    function clearFormData() {
        // Clear form fields
        document.getElementById("patientform").reset();
        
        // Expire the cookie and update greeting message
        deleteCookie('firstname');
        document.getElementById('greetingMessage').textContent = 'Welcome, New User!';
    }

    // Function to retrieve cookie value by name
    function getCookie(name) {
        let cookieName = name + "=";
        let cookieArray = document.cookie.split(';');
        
        for (let cookie of cookieArray) {
            cookie = cookie.trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

    // Function to delete a cookie by name
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

});
// Function to set a cookie
function setCookie(name, value, daysToLive) {
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/;`;
    console.log(`Cookie '${name}' set with value: ${value}`);
}
