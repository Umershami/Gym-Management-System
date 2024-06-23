


console.log("Gym Management");

document.getElementById("addTrainerBtn").addEventListener("click", () => {
    console.log("Add Name in this list");
    let name = prompt("Add name");
    let email = prompt("Add Email");
    let id = prompt("Enter Id");
    let status = prompt("Add Status");
    
    // Create a new row for the trainer table
    let newRow = `<tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${id}</td>
                    <td>${status}</td>
                    <td><object data="dotted.svg" width="20" height="20"></object></td>
                  </tr>`;

    // Append the new row to the table body
    document.querySelector("table tbody").insertAdjacentHTML('beforeend', newRow);

    // Increment member count in summary section
    let memberCountElement = document.getElementById('memberCount');
    let currentCount = parseInt(memberCountElement.innerText);
    memberCountElement.innerText = currentCount + 1;
});

// Get reference to the trainer link element
const trainerLink = document.getElementById("trainerLink");

// Get reference to the <div> section to scroll to
const trainerSection = document.getElementById('trainerSection');

// Add click event listener to the trainer link element
trainerLink.addEventListener('click', () => {
    // Scroll to the trainer section
    trainerSection.scrollIntoView({
        behavior: 'smooth'  // Optional: Smooth scrolling behavior
    });
    trainerSection.style.display = 'block'; // Ensure the trainer section is visible
});

// Function to increment member number (not used directly in this version, as we handle it in the click event listener above)
let memberNumber = 0;

function incrementNumber() {
    memberNumber++;
    document.getElementById('addTrainerBtn').innerText = memberNumber;
}

// Refresh the page when clicking on the dashboard link
// Get reference to the dashboard link element
const dashboardLink = document.getElementById('dashboardLink');

// Add click event listener to the dashboard link
dashboardLink.addEventListener('click', (event) => {
    // Prevent default action of the link (e.g., navigating to a new page)
    event.preventDefault();
    
    // Reload the page
    location.reload();
});

// Camera access
const camIcon = document.getElementById('cam');
camIcon.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('Camera access granted:', stream);
        // Handle the stream (e.g., display video)
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert("Access denied");
    }
});

// Active persons
document.addEventListener("DOMContentLoaded", function () {
    let attendanceCount = 0;
    const attendanceCountElement = document.getElementById('attendanceCount');
    const checkInBtn = document.getElementById('checkInBtn');
    let checkedInMembers = new Set(); // Set to keep track of checked-in members

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

    // Check-In button click event
    checkInBtn.addEventListener('click', function () {
        let memberId = prompt("Enter your member ID:");

        // Check if memberId has already checked in today
        if (checkedInMembers.has(memberId)) {
            alert("Member has already checked in today.");
            return;
        }

        // Check if memberId exists in the table
        let memberFound = false;
        document.querySelectorAll("table tbody tr").forEach(row => {
            let idCell = row.children[2].innerText; // 2 gets the id for check
            if (idCell === memberId) {
                memberFound = true;
            }
        });

        if (memberFound) {
            // Member is valid, record attendance
            attendanceCount++;
            attendanceCountElement.textContent = attendanceCount;
            alert(`Attendance recorded for member ID: ${memberId}`);
            checkedInMembers.add(memberId); // Add memberId to checked-in members set
            updateAttendanceChart();
        } else {
            // Member ID not found
            alert("Member ID not recognized. Please try again.");
        }
    });

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
});
