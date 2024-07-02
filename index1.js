document.addEventListener("DOMContentLoaded", function () {
    let attendanceCount = 0;
    const attendanceCountElement = document.getElementById('attendanceCount');
    const checkInBtn = document.getElementById('checkInBtn');
    const memberList = document.getElementById('memberList');
    const activeMembersList = document.getElementById('activeMembersList');
    let checkedInMembers = new Set(); 
    
    const dashboardLink = document.getElementById('dashboardLink');
    dashboardLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior (if it's a link)
        location.reload(); // Reload the page
    });
    const camIcon = document.getElementById('cam');
    camIcon.addEventListener('click', async () => {
        try {
            console.log("Trigered")
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log('Camera access granted:', stream);
            // Handle the stream (e.g., display video)
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert("Camera access denied");
        }
    });
    const trainerLink = document.getElementById("trainerLink");
    const trainerSection = document.getElementById('trainerSection');
    trainerLink.addEventListener('click', () => {
        trainerSection.scrollIntoView({ behavior: 'smooth' });
        trainerSection.style.display = 'block'; // Ensure the trainer section is visible
    });

      // Add Trainer functionality (assuming this is additional functionality not directly related to adding members)
      document.getElementById("addTrainerBtn").addEventListener("click", () => {
        let name = prompt("Enter Trainer's Name:");
        let email = prompt("Enter Trainer's Email:");
        let id = prompt("Enter Trainer's ID:");
        let status = prompt("Enter Trainer's Status (Active/On Vacation/Absent):");
    
        // Create a new row for the trainer table
        let newRow = `<tr>
                        <td>${name}</td>
                        <td>${email}</td>
                        <td>${id}</td>
                        <td>${status}</td>
                        <td><object data="dotted.svg" width="20" height="20"></object></td>
                      </tr>`;
    
        // Append the new row to the table body
        document.querySelector(".persondetails table tbody").insertAdjacentHTML('beforeend', newRow);
    });
   
    

    // Simulated initial members data
    const members = {
        '1': { id: '1', name: 'John Doe', age: 28, membership: 'Gold', img: 'profile1.png', feesPaid: true },
        '2': { id: '2', name: 'Jane Smith', age: 32, membership: 'Silver', img: 'profile2.png', feesPaid: true },
        '3': { id: '3', name: 'Sam Johnson', age: 45, membership: 'Bronze', img: 'profile3.png', feesPaid: true },
    };

    // Populate initial members in the table
    populateMemberTable();

    // Function to populate member table with initial data
    function populateMemberTable() {
        for (let memberId in members) {
            addMemberToTable(members[memberId]);
        }
    }

    // Function to add a member to the member list table or active members list
    function addMemberToTable(member) {
        // Set feesPaid to false initially (assuming fees are unpaid until added)
        member.feesPaid = false;

        const row = `<tr data-id="${member.id}">
                        <td>${member.id}</td>
                        <td>${member.name}</td>
                        <td>${member.age}</td>
                        <td>${member.membership}</td>
                        <td><button class="remove-member" data-id="${member.id}">Remove</button></td>
                    </tr>`;

        // Add fee of 5000 when member is added
        member.feesPaid = true;

        // Determine where to insert the row based on the context
        if (checkedInMembers.has(member.id)) {
            // Add to active members list
            activeMembersList.insertAdjacentHTML('beforeend', row);
        } else {
            // Add to overall members list
            memberList.insertAdjacentHTML('beforeend', row);
        }

        // Attach event listener to the remove button of this new member
        const removeButton = document.querySelector(`.remove-member[data-id="${member.id}"]`);
        removeButton.addEventListener('click', function () {
            removeMemberFromTable(member.id);
        });

        // Check pending fees after 30 days
        setTimeout(function () {
            checkPendingFees(member.id);
        }, 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
    }

    // Function to remove a member from the member list table
    function removeMemberFromTable(memberId) {
        const rowToRemove = document.querySelector(`tr[data-id="${memberId}"]`);
        if (rowToRemove) {
            rowToRemove.remove();

            // Remove from checked-in members set if applicable
            if (checkedInMembers.has(memberId)) {
                checkedInMembers.delete(memberId);

                // Remove from active members list
                const activeRowToRemove = document.querySelector(`#activeMembersList tr[data-id="${memberId}"]`);
                if (activeRowToRemove) {
                    activeRowToRemove.remove();
                }
            }
        }
    }

    // Function to check pending fees after 30 days
    function checkPendingFees(memberId) {
        const member = members[memberId];
        if (member && !member.feesPaid) {
            // Show pending fees notification or handle as needed
            console.log(`Member ${member.name} has pending fees.`);
            // You can trigger UI notification or take appropriate action here
        }
    }

    // Add Member form submission event
    document.getElementById('addMemberForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        let memberId = document.getElementById('member-id-input').value.trim();
        let name = document.getElementById('member-name').value.trim();
        let age = parseInt(document.getElementById('member-age').value.trim());
        let membership = document.getElementById('member-membership').value.trim();
        let fee = parseInt(document.getElementById('member-fee').value.trim()); // Assuming the fee is always 5000

        // Generate new member object
        const newMember = {
            id: memberId,
            name: name,
            age: age,
            membership: membership,
            img: `profile${memberId}.png`, // Assuming you have profile images named profile1.png, profile2.png, etc.
            feesPaid: true // Assuming the fee is paid at the time of adding
        };

        // Add new member to the members object
        members[memberId] = newMember;

        // Add member to the member list table
        addMemberToTable(newMember);

        // Reset the form after submission
        document.getElementById('addMemberForm').reset();
    });
    

    // Check-In button click event
    checkInBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        let memberId = document.getElementById('member-id').value.trim(); // Get member ID input value

        const member = members[memberId];

        if (member) {
            // Update attendance count (if needed)
            attendanceCount++;
            attendanceCountElement.textContent = attendanceCount;

            // Update attendance chart
            updateAttendanceChart();

            // Check if member is already checked in
            if (!checkedInMembers.has(memberId)) {
                // Add member to the active members list
                checkedInMembers.add(memberId); // Add to checked-in members set
                addMemberToTable(member); // This will add to either memberList or activeMembersList
            } else {
                alert('Member already checked in!');
            }
        } else {
            alert('Member not found!');
        }

        document.getElementById('checkin-form').reset(); // Reset the form after submission
    });

    // Add Member form submission event
    document.getElementById('addMemberForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        let memberId = document.getElementById('member-id-input').value.trim();
        let name = document.getElementById('member-name').value.trim();
        let age = parseInt(document.getElementById('member-age').value.trim());
        let membership = document.getElementById('member-membership').value.trim();

        // Generate new member object
        const newMember = {
            id: memberId,
            name: name,
            age: age,
            membership: membership,
            img: `profile${memberId}.png` // Assuming you have profile images named profile1.png, profile2.png, etc.
        };

        // Add new member to the members object (you may want to add server-side logic here to save data)
        members[memberId] = newMember;

        // Add member to the member list table
        addMemberToTable(newMember);

        // Reset the form after submission
        document.getElementById('addMemberForm').reset();
        let memberCountElement = document.getElementById('memberCount');
        let currentCount = parseInt(memberCountElement.innerText);
        memberCountElement.innerText = currentCount + 1;
    });

    // Chart.js setup for attendance chart
    var ctx = document.getElementById('attendanceChart').getContext('2d');
    var attendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Attendance',
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to update the attendance chart
    function updateAttendanceChart() {
        let currentDay = new Date().getDay();
        attendanceChart.data.datasets[0].data[currentDay]++;
        attendanceChart.update();
    }

    // Chart.js setup for line chart showing member growth
    var ctxLine = document.getElementById('lineChart').getContext('2d');
    var lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Member Growth',
                data: [0, 10, 5, 2, 20, 30, 45],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
        
    });



  
    
    // Navigation: Scroll to Trainer Section
 

    // Reload Dashboard
    // const dashboardLink = document.getElementById('dashboardLink');
    // dashboardLink.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     location.reload();
    // });

    // Access Camera
    
});


