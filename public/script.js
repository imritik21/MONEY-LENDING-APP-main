document.getElementById('signup').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Gather user input from the signup form
    const data = {
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        monthlySalary: document.getElementById('monthlySalary').value,
        password: document.getElementById('password').value,
    };

    try {
        // Send POST request to the /api/signup endpoint
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok) {
            alert(result.message); // Display success message
            document.getElementById('signup').reset(); // Clear form fields
        } else {
            alert(`Signup failed: ${result.message}`); // Display error message
        }
    } catch (error) {
        alert(`Error during signup: ${error.message}`);
    }
});

document.getElementById('login').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Gather user input from the login form
    const data = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value,
    };

    try {
        // Send POST request to the /api/login endpoint
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok && result.token) {
            localStorage.setItem('token', result.token);
            alert('Login successful');
            // Redirect or show user-specific information if needed
        } else {
            alert(`Login failed: ${result.message}`); // Display error message
        }
    } catch (error) {
        alert(`Error during login: ${error.message}`);
    }
});

document.getElementById('fetchUser').addEventListener('click', async function () {
    const token = localStorage.getItem('token');

    try {
        // Send GET request to the /api/user endpoint
        const res = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await res.json();
        if (res.ok) {
            document.getElementById('userInfo').innerHTML = `
                <p>Purchase Power: ${result.purchasePower}</p>
                <p>Phone Number: ${result.phoneNumber}</p>
                <p>Email: ${result.email}</p>
                <p>Date of Registration: ${result.dateOfRegistration}</p>
                <p>Date of Birth: ${result.dob}</p>
                <p>Monthly Salary: ${result.monthlySalary}</p>
                <h4>Loans:</h4>
                <ul>
                  ${result.loans.map(loan => `
                    <li>Amount: ${loan.amount}, Tenure: ${loan.tenure} months, Monthly Repayment: ${loan.monthlyRepayment}</li>
                  `).join('')}
                </ul>
            `;
        } else {
            alert(`Error fetching user data: ${result.message}`); // Display error message
        }
    } catch (error) {
        alert(`Error fetching user data: ${error.message}`);
    }
});

document.getElementById('borrow').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Gather loan details from the borrow form
    const data = {
        amount: document.getElementById('amount').value,
        tenure: document.getElementById('tenure').value,
    };

    const token = localStorage.getItem('token');

    try {
        // Send POST request to the /api/borrow endpoint
        const res = await fetch('/api/borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok) {
            document.getElementById('borrowResult').innerHTML = `
                <p>Purchase Power: ${result.purchasePower}</p>
                <p>Monthly Repayment: ${result.monthlyRepayment}</p>
            `;
        } else {
            alert(`Error borrowing money: ${result.message}`); // Display error message
        }
    } catch (error) {
        alert(`Error borrowing money: ${error.message}`);
    }
});
