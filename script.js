let tableContainer;
let table;
let participants = []; // Array to store participant details
let originalJoinDate;


// Initialize select dropdown, submit button, and cancel button
const editPayingMemberSelect = document.createElement('select');
editPayingMemberSelect.id = 'edit-paying-member';
const optionYes = document.createElement('option');
optionYes.value = 'Yes';
optionYes.textContent = 'Yes';
editPayingMemberSelect.appendChild(optionYes);
const optionNo = document.createElement('option');
optionNo.value = 'No';
optionNo.textContent = 'No';
editPayingMemberSelect.appendChild(optionNo);

const submitButton = document.createElement('button');
submitButton.textContent = 'Save Changes';
submitButton.type = 'submit';
submitButton.classList.add('submit-button');

const cancelButton = document.createElement('button');
cancelButton.textContent = 'Cancel';
cancelButton.type = 'button';
cancelButton.classList.add('cancel-button');
cancelButton.addEventListener('click', function () {
    document.getElementById('edit-modal').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function () {
    // Load hardcoded participants
    participants = getParticipants(); //initialize the array with predefined participants

    // Create paying member select dropdown
    const editPayingMemberSelect = document.createElement('select');
    editPayingMemberSelect.id = 'edit-paying-member';
    const optionYes = document.createElement('option');
    optionYes.value = 'Yes';
    optionYes.textContent = 'Yes';
    editPayingMemberSelect.appendChild(optionYes);
    const optionNo = document.createElement('option');
    optionNo.value = 'No';
    optionNo.textContent = 'No';
    editPayingMemberSelect.appendChild(optionNo);

    table = document.createElement('table');
    table.setAttribute('id', 'participant-table');
    tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(table); // Append the table to its container 

    displayParticipantTable(participants);

    // Handling the edit modal and form submit just once on load:
    document.getElementById('edit-participant-form').addEventListener('submit', handleEditFormSubmit);
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('edit-modal').style.display = 'none';
    });

    // Login submission event listener
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'admin') {
            document.getElementById('login-error').textContent = '';
            document.getElementById('login-container').style.display = 'none';
            displayParticipantTable(getParticipants());
            appendAddMemberButton();
            document.getElementById('table-container').style.display = 'block';
        } else {
            document.getElementById('login-error').textContent = 'Invalid username or password';
        }
    });

    // Add event listener for edit buttons outside of displayParticipantTable function
    document.getElementById('participant-table').addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('edit-button')) {
            const participantId = parseInt(target.getAttribute('data-id'));
            editParticipant(participantId);
        }
    });

});

function showAddMemberForm() {
    const addMemberForm = document.getElementById('add-member-form');
    addMemberForm.style.display = 'block';

    // Clear previous form if any
    addMemberForm.innerHTML = '';

    // Create the form elements dynamically
    const form = document.createElement('form');

    addInputField(form, 'First Name:', 'text', 'new-member-first-name', 'Enter first name');
    addInputField(form, 'Last Name:', 'text', 'new-member-last-name', 'Enter last name');
    addInputField(form, 'Phone:', 'text', 'new-member-phone', 'Enter phone number');
    addInputField(form, 'Email:', 'text', 'new-member-email', 'Enter email address');
    addInputField(form, 'Join Date:', 'date', 'new-member-join-date');
    addInputField(form, 'Attendance Count:', 'number', 'new-member-attendance', '', '0');

    // Paying member select
    const selectLabel = document.createElement('label');
    selectLabel.textContent = 'Paying Member:';
    form.appendChild(selectLabel);
    const select = document.createElement('select');
    select.id = 'edit-paying-member';
    const optionYes = document.createElement('option');
    optionYes.value = 'Yes';
    optionYes.textContent = 'Yes';
    select.appendChild(optionYes);
    const optionNo = document.createElement('option');
    optionNo.value = 'No';
    optionNo.textContent = 'No';
    select.appendChild(optionNo);
    form.appendChild(select);

     
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.type = 'submit';
    submitButton.classList.add('submit-button');
    form.appendChild(submitButton)


    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.type = 'button';
    cancelButton.classList.add('cancel-button');
    cancelButton.addEventListener('click', function () {
        addMemberForm.style.display = 'none';
        addMemberForm.innerHTML = '';
    });
    form.appendChild(cancelButton);

    // Append the form to the container and display it
    addMemberForm.appendChild(form);
    
    // Handle form submission
    form.onsubmit = function(event) {
        event.preventDefault();
        const newParticipant = {
            id: participants.length + 1, // Assign a unique ID
            firstName: document.getElementById('new-member-first-name').value,
            lastName: document.getElementById('new-member-last-name').value,
            phone: document.getElementById('new-member-phone').value,
            email: document.getElementById('new-member-email').value,
            joinDate: document.getElementById('new-member-join-date').value,
            attendanceCount: 0,
            payingMember: 'No' // Initially set to 'No'
        };

        participants.push(newParticipant);
        displayParticipantTable(participants);

        // Hide and clear the form after submission
        addMemberForm.style.display = 'none';
        addMemberForm.innerHTML = '';
    };
}


function editParticipant(participantId) {
    console.log("Editing participant ID:", participantId);
    const participant = getParticipantById(participantId);
    if (participant) {
        const form = document.getElementById('edit-participant-form');
        

        document.getElementById('edit-participant-id').value = participantId // Set the participant ID
        document.getElementById('edit-first-name').value = participant.firstName;
        document.getElementById('edit-last-name').value = participant.lastName;
        document.getElementById('edit-phone').value = participant.phone; // Populate phone
        document.getElementById('edit-email').value = participant.email; // Populate email
        document.getElementById('edit-join-date').value = participant.joinDate;
        document.getElementById('attendance-count').value = participant.attendanceCount;

        
        
        // Check if the select and label already exist in the form, if not create them
        let selectLabel = form.querySelector('label[for="edit-paying-member"]');
        let select = document.getElementById('edit-paying-member');
        
        if (!select) {
            // Create label for select if it doesn't exist
            selectLabel = document.createElement('label');
            selectLabel.textContent = 'Paying Member:';
            selectLabel.setAttribute('for', 'edit-paying-member');

            // Create select element
            select = document.createElement('select');
            select.id = 'edit-paying-member';
            const optionYes = document.createElement('option');
            optionYes.value = 'Yes';
            optionYes.textContent = 'Yes';
            select.appendChild(optionYes);
            const optionNo = document.createElement('option');
            optionNo.value = 'No';
            optionNo.textContent = 'No';
            select.appendChild(optionNo);

            // Append the new elements to the form
            form.appendChild(selectLabel);
            form.appendChild(select);
        } else {
            // If select exists, ensure label exists too
            if (!selectLabel) {
                selectLabel = document.createElement('label');
                selectLabel.textContent = 'Paying Member:';
                selectLabel.setAttribute('for', 'edit-paying-member');
                form.insertBefore(selectLabel, select);
            }
        }

        // Set the selected value to match the current participant's data
        select.value = participant.payingMember;


        // Store the original join date
        const originalJoinDate = participant.joinDate;

        // Populate join date and attendance count
        document.getElementById('edit-join-date').value = originalJoinDate;  // Populate join date
        document.getElementById('attendance-count').value = participant.attendanceCount; // Populate attendance count

        // Handle the Paying Member dropdown
        const existingSelect = document.getElementById('edit-paying-member');
        if (!existingSelect) {
            const selectLabel = document.createElement('label');
            selectLabel.textContent = 'Paying Member:';
            const select = document.createElement('select');
            select.id = 'edit-paying-member';
            const optionYes = document.createElement('option');
            optionYes.value = 'Yes';
            optionYes.textContent = 'Yes';
            const optionNo = document.createElement('option');
            optionNo.value = 'No';
            optionNo.textContent = 'No';
            select.appendChild(optionYes);
            select.appendChild(optionNo);
            document.getElementById('edit-participant-form').appendChild(selectLabel);
            document.getElementById('edit-participant-form').appendChild(select);
        }

         // Set the selected value to match the current participant's data
        document.getElementById('edit-paying-member').value = participant.payingMember;

         // Append the select dropdown and buttons to the form
        
        form.appendChild(selectLabel);
        form.appendChild(select);
        
        form.appendChild(submitButton);
        form.appendChild(cancelButton);
        
        document.getElementById('edit-modal').style.display = 'block';
    }

    // handle form submission for editing participant
    document.getElementById('edit-participant-form').onsubmit = function (event) {
        event.preventDefault();
        handleEditFormSubmit(event); // Call the handleEditFormSubmit function

        // Implement logic to update participant details based on form input
        // Hide the modal after saving changes
        document.getElementById('edit-modal').style.display = 'none';
    };

    // close the modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('edit-modal').style.display = 'none';
    });

    // Saving changes and updating array
    document.getElementById('edit-participant-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve the ID from the hidden input
        const participantId = parseInt(document.getElementById('edit-participant-id').value, 10); // Retrieving from hidden input
        const participant = getParticipantById(participantId);
        
        if (participant) {
            // Update the participant data with values from the form
            participant.firstName = document.getElementById('edit-first-name').value;
            participant.lastName = document.getElementById('edit-last-name').value;
            participant.phone = document.getElementById('edit-phone').value;
            participant.email = document.getElementById('edit-email').value;
            participant.joinDate = document.getElementById('edit-join-date').value;
            participant.attendanceCount = parseInt(document.getElementById('attendance-count').value, 10);
            
            console.log("Updated Participants:", participant);

            // Refresh the participant table to reflect changes
            displayParticipantTable(participants); 
            document.getElementById('edit-modal').style.display = 'none'; // Hide the modal
        }
    });


    // Function to append form submission buttons
function appendFormButtons(form) {
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Save Changes';
    submitButton.type = 'submit';
    submitButton.classList.add('submit-button');
    form.appendChild(submitButton);

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.type = 'button';
    cancelButton.classList.add('cancel-button');
    cancelButton.addEventListener('click', function () {
        document.getElementById('edit-modal').style.display = 'none';
    });
    form.appendChild(cancelButton);
}
    
}

function handleEditFormSubmit(event, originalJoinDate) {
    event.preventDefault();

    const participantId = parseInt(document.getElementById('edit-participant-id').value, 10);
    const participant = getParticipantById(participantId);
    
    if (participant) {
        const originalJoinDate = participant.joinDate; // Retrieve the original join date
        participant.firstName = document.getElementById('edit-first-name').value;
        participant.lastName = document.getElementById('edit-last-name').value;
        participant.phone = document.getElementById('edit-phone').value;
        participant.email = document.getElementById('edit-email').value;
        participant.joinDate = document.getElementById('edit-join-date').value !== formatDate(originalJoinDate) ? document.getElementById('edit-join-date').value : originalJoinDate; // Use new join date if changed, otherwise use original
        participant.attendanceCount = parseInt(document.getElementById('attendance-count').value, 10);

        displayParticipantTable(participants);
        document.getElementById('edit-modal').style.display = 'none';
    } else {
        console.error("Participant not found with ID:", participantId);
    }
}


function deleteParticipant(participantId) {
    // Filter out the participant to delete
    participants = participants.filter(participant => participant.id !== participantId);

    // Redisplay the table after deletion
    displayParticipantTable(participants);
}


function getParticipants() {
    return [
        { id: 1, firstName: 'John', lastName: 'Doe', phone: '123-456-7890', email: 'john@example.com', joinDate: '2024-01-01', attendanceCount: 0, payingMember: getRandomYesNo() },
        { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '456-789-0123', email: 'jane@example.com', joinDate: '2023-12-15', attendanceCount: 0, payingMember: getRandomYesNo() },
    ];
}

function getRandomYesNo() {
    return Math.random() < 0.5 ? 'Yes' : 'No';
}

function displayParticipantTable(participants) {
    table.innerHTML = ''; // Clear previous content

    // Create table headers
    table.createTHead();
    const headerRow = table.createTHead().insertRow();
    const headers = ['','First Name', 'Last Name', 'Phone', 'Email', 'Join Date', 'Attendance Count', 'Paying Member', 'Actions'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Create table body and populate with participant data
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    participants.forEach(participant => {
        const row = tbody.insertRow();
        Object.keys(participant).forEach(key => {
            const cell = row.insertCell();
            cell.textContent = key === 'joinDate' ? formatDate(participant[key]) : participant[key];
            cell.setAttribute('data-id', participant.id); // Set data-id attribute
            cell.setAttribute('data-key', key); // Set data-key attribute
        });

        const actionsCell = row.insertCell();
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('actions');
        
        // Append action buttons to the actions container
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update Attendance';
        updateButton.addEventListener('click', () => updateAttendance(participant.id, participants));
        actionsContainer.appendChild(updateButton);

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editParticipant(participant.id));
        actionsContainer.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteParticipant(participant.id));
        actionsContainer.appendChild(deleteButton);

        actionsCell.appendChild(actionsContainer);
        
    });
}

// Function to format 'join-date'
function formatDate(inputDate) {
    const dateParts = inputDate.split('-'); // Split the input date by hyphens
    const year = dateParts[0].slice(-2); // Get the last two digits of the year
    const month = dateParts[1];
    const day = dateParts[2];
    return `${month}/${day}/${year}`; // Format the date as MM/DD/YY
}

function updateAttendance(memberId, participants) {
    // Update logic for participant
    const participant = participants.find(p => p.id === memberId);
    if (participant) {
        participant.attendanceCount++;
        if (participant.attendanceCount >= 3) {
            participant.payingMember = 'Yes';
            // Highlight first and last name
            highlightName(memberId);
        }
        displayParticipantTable(participants); // Redisplay the table with updated data
    }
}

function highlightName(memberId) {
    const firstNameCell = document.querySelector(`[data-id="${memberId}"][data-key="firstName"]`);
    const lastNameCell = document.querySelector(`[data-id="${memberId}"][data-key="lastName"]`);
    if (firstNameCell && lastNameCell) {
        firstNameCell.classList.add('highlight');
        lastNameCell.classList.add('highlight');
    }
}

function appendAddMemberButton() {
    if (!document.getElementById('add-member-container').querySelector('.add-member-button')) {
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Member';
        addButton.classList.add('add-member-button');
        addButton.addEventListener('click', showAddMemberForm);
        document.getElementById('add-member-container').appendChild(addButton);
    }
}

// Helper function to add input fields to the form
function addInputField(form, labelContent, inputType, inputId, placeholder, value = '') {
    const label = document.createElement('label');
    label.textContent = labelContent;
    form.appendChild(label);
    const input = document.createElement('input');
    input.type = inputType;
    input.id = inputId;
    input.placeholder = placeholder;
    input.value = value;
    form.appendChild(input);
}

function getParticipantById(id) {
    return participants.find(participant => participant.id === id);
}