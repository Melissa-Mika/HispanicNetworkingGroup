document.addEventListener('DOMContentLoaded', function () {
    const table = document.createElement('table');
    table.setAttribute('id', 'participant-table')

    // Event listener for login submission form
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Test login information
        if (username === 'admin' && password === 'admin') {
            document.getElementById('login-error').textContent = '';

            // Hide login container after successful login
            document.getElementById('login-container').style.display = 'none';

            // Test participant data
            const participants = [
                { id: 1, firstName: 'John', lastName: 'Doe', phone: '123-456-7890', email: 'john@example.com', joinDate: '2024-01-01', attendanceCount: 0, payingMember: getRandomYesNo() },
                { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '456-789-0123', email: 'jane@example.com', joinDate: '2023-12-15', attendanceCount: 0, payingMember: getRandomYesNo() },
            ];

            function getRandomYesNo() {
                return Math.random() < 0.5 ? 'Yes' : 'No';
            }

            displayParticipantTable(participants);

            // Add "Add Member" button after successful login
            if (!document.getElementById('add-member-container').querySelector('.add-member-button')) {
                const addButton = document.createElement('button');
                addButton.textContent = 'Add Member';
                addButton.classList.add('add-member-button');

                addButton.addEventListener('click', function () {
                    const addMemberForm = document.getElementById('add-member-form');
                    addMemberForm.innerHTML = ''; // Clear any existing content


                    // Create the form elements
                    const form = document.createElement('form');
                    const firstNameLabel = document.createElement('label');
                    firstNameLabel.textContent = 'First Name:';
                    const firstNameInput = document.createElement('input');
                    firstNameInput.setAttribute('type', 'text');
                    firstNameInput.setAttribute('id', 'new-member-first-name');
                    firstNameInput.setAttribute('placeholder', 'Enter first name');

                    const lastNameLabel = document.createElement('label');
                    lastNameLabel.textContent = 'Last Name';
                    const lastNameInput = document.createElement('input');
                    lastNameInput.setAttribute('type', 'text');
                    lastNameInput.setAttribute('id', 'new-member-last-name');
                    lastNameInput.setAttribute('placeholder', 'Enter last name');

                    const phoneLabel = document.createElement('label');
                    phoneLabel.textContent = 'Phone:';
                    const phoneInput = document.createElement('input');
                    phoneInput.setAttribute('type', 'text');
                    phoneInput.setAttribute('id', 'new-member-phone');
                    phoneInput.setAttribute('placeholder', 'Enter phone number');

                    const emailLabel = document.createElement('label');
                    emailLabel.textContent = 'Email:';
                    const emailInput = document.createElement('input');
                    emailInput.setAttribute('type', 'text');
                    emailInput.setAttribute('id', 'new-member-email');
                    emailInput.setAttribute('placeholder', 'Enter email address');

                    const joinDateLabel = document.createElement('label');
                    joinDateLabel.textContent = 'Join Date:';
                    const joinDateInput = document.createElement('input');
                    joinDateInput.setAttribute('type', 'date');
                    joinDateInput.setAttribute('id', 'new-member-join-date');

                    const attendanceLabel = document.createElement('label');
                    attendanceLabel.textContent = 'Attendance Count:';
                    const attendanceInput = document.createElement('input');
                    attendanceInput.setAttribute('type', 'number');
                    attendanceInput.setAttribute('id', 'new-member-attendance');
                    attendanceInput.setAttribute('value', '0'); // Initialize attendance count to 0


                    // Paying member option (Yes/No)
                    const payingMemberLabel = document.createElement('label');
                    payingMemberLabel.textContent = 'Paying Member:';
                    const payingMemberSelect = document.createElement('select');
                    payingMemberSelect.setAttribute('id', 'new-member-paying');
                    const yesOption = document.createElement('option');
                    yesOption.textContent = 'Yes';
                    yesOption.setAttribute('value', 'Yes');
                    const noOption = document.createElement('option');
                    noOption.textContent = 'No';
                    noOption.setAttribute('value', 'No');
                    payingMemberSelect.appendChild(yesOption);
                    payingMemberSelect.appendChild(noOption);


                    // Add submit button
                    const submitButton = document.createElement('button');
                    submitButton.textContent = 'Submit';
                    submitButton.addEventListener('click', function (event) {
                        event.preventDefault();

                        console.log("Submit button clicked");

                        // Get the form element
                        const form = document.getElementById('add-member-form');

                        // Get the form input values
                        const firstName = document.getElementById('new-member-first-name').value;
                        const lastName = document.getElementById('new-member-last-name').value;
                        const phone = document.getElementById('new-member-phone').value;
                        const email = document.getElementById('new-member-email').value;
                        const joinDate = document.getElementById('new-member-join-date').value;
                        const attendanceCount = document.getElementById('new-member-attendance').value;
                        const payingMember = document.getElementById('new-member-paying').value;

                        console.log("Form values:", firstName, lastName, phone, email, joinDate, attendanceCount, payingMember);

                        // Create a new row in the table
                        const newRow = table.insertRow();

                        // Populate the row with cell data
                        const firstNameCell = newRow.insertCell();
                        firstNameCell.textContent = firstName;

                        const lastNameCell = newRow.insertCell();
                        lastNameCell.textContent = lastName;

                        const phoneCell = newRow.insertCell();
                        phoneCell.textContent = phone;

                        const emailCell = newRow.insertCell();
                        emailCell.textContent = email;

                        const joinDateCell = newRow.insertCell();
                        joinDateCell.textContent = joinDate;

                        const attendanceCountCell = newRow.insertCell();
                        attendanceCountCell.textContent = attendanceCount;

                        const payingMemberCell = newRow.insertCell();
                        payingMemberCell.textContent = payingMember;


                        // Add edit and delete buttons to the new row
                        const editButtonCell = newRow.insertCell();
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
                        editButton.classList.add('edit-button');
                        editButton.addEventListener('click', function () {
                            // Handle edit button click (replace with your logic)
                            alert(`Editing ${firstName} ${lastName}`);
                        });
                        editButtonCell.appendChild(editButton);

                        const deleteButtonCell = newRow.insertCell();
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.classList.add('delete-button');
                        deleteButton.addEventListener('click', function () {
                            // Handle delete button click
                            const confirmDelete = confirm('Are you sure you want to delete this?');
                            if (confirmDelete) {
                                // Delete the participant 
                                newRow.remove();
                            }
                        });
                        deleteButtonCell.appendChild(deleteButton);

                        

                        // Clear the form content
                        addMemberForm.innerHTML = '';

                    });

                    // Create the cancel button
                    const cancelButton = document.createElement('button');
                    cancelButton.textContent = 'Cancel';
                    cancelButton.addEventListener('click', function (event) {
                        event.preventDefault();
                        // Clear the form and hide the add member form
                        addMemberForm.innerHTML = '';
                        addMemberForm.style.display = 'none';
                    });

                    // Append cancel button to the form
                    form.appendChild(cancelButton);

                    // Append form elements to the form
                    form.appendChild(firstNameLabel);
                    form.appendChild(firstNameInput);
                    form.appendChild(lastNameLabel);
                    form.appendChild(lastNameInput);
                    form.appendChild(phoneLabel);
                    form.appendChild(phoneInput);
                    form.appendChild(emailLabel);
                    form.appendChild(emailInput);
                    form.appendChild(joinDateLabel);
                    form.appendChild(joinDateInput);
                    form.appendChild(attendanceLabel);
                    form.appendChild(attendanceInput);
                    form.appendChild(payingMemberLabel);
                    form.appendChild(payingMemberSelect);
                    form.appendChild(submitButton);

                    // Append form to the add member form container
                    addMemberForm.appendChild(form);

                    // Display the add member form
                    addMemberForm.style.display = 'block';
                });

                // Append the "Add Member" button to the appropriate container 
                document.getElementById('add-member-container').appendChild(addButton);
            }

        } else {
            document.getElementById('login-error').textContent = 'Invalid username or password';
        }
    });

    function displayParticipantTable(participants) {
        const tableContainer = document.getElementById('table-container');

        // Dynamically create table
        tableContainer.innerHTML = ''; // Clear any existing content

        // Table headers
        const headers = ['First Name', 'Last Name', 'Phone', 'Email', 'Join Date', 'Attendance Count', 'Paying Member', 'Actions'];
        const headerRow = table.insertRow();
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        // Table rows
        participants.forEach(participant => {
            const row = table.insertRow();
            Object.entries(participant).forEach(([key, value], index) => {
                const cell = row.insertCell();
                cell.textContent = value;
                if (key === 'firstName' || key === 'lastName') {
                    cell.classList.add('participant-name');
                    cell.setAttribute('data-name', value); // Store participant name as data attribute
                }
            });

            // Add edit and delete buttons to the row
            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', function () {
                // Handle edit button click (replace with your logic)
                alert(`Editing ${participant.firstName} ${participant.lastName}`);
            });
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function () {
                // Handle delete button click
                const confirmDelete = confirm('Are you sure you want to delete this?');
                if (confirmDelete) {
                    // Delete the participant (replace with your logic)
                    row.remove();
                }
            });
            actionsCell.appendChild(deleteButton);

            // Add Attendance Update button
            const actionsCell = row.insertCell();
            const updateAttendanceButton = document.createElement('button');
            updateAttendanceButton.textContent = 'Update Attendance';
            updateAttendanceButton.addEventListener('click', () => {
                updateAttendance(participant.id, participants);
            });
            actionsCell.appendChild(updateAttendanceButton);
        
        });

        tableContainer.appendChild(table);
        tableContainer.style.display = 'block';

        // Show the "Add Member" form
        document.getElementById('add-member-form').style.display = 'block';
    }
});
