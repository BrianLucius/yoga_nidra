var userForm = document.getElementById('userRegistrationForm');

userRegistrationForm.onsubmit = function(e) {
    e.preventDefault();
    var formData = new FormData(userRegistrationForm);
    fetch('http://localhost:5001/user/registration', {method:'POST', body : formData })
        .then(response => response.json())
        .then(function(data) {
            if (data['message'] == "success") { 
                window.location.assign("http://localhost:5001/dashboard");
            }
            else {
                // Clear any previous form validation messages
                divs = document.getElementsByClassName('registration_error');
                [].slice.call( divs ).forEach(function ( div ) {
                    div.innerHTML = ""
                })
                // Alert for any form validation issues
                for (category in data['message']) {
                    let div = document.getElementById(category);
                    div.innerHTML = `<p class="alert alert-danger p-1">${data['message'][category]}</p>`;
                }}
        }
        )
    }