document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');

    function generateCalendar(month, year) {
        // Clear previous calendar days
        calendarDaysElement.innerHTML = '';

        // Set month and year text
        monthYearElement.textContent = `${getMonthName(month)} ${year}`;

        // Get first day of the month and total days in the month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay(); // Day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
        const totalDays = lastDay.getDate(); // Total days in the month

        // Generate empty placeholders for days before the start day
        for (let i = 0; i < startingDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.classList.add('empty');
            calendarDaysElement.appendChild(dayElement);
        }

        // Generate days for the month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('calendar-day');

            // Highlight today's date
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add('today');
            }

            calendarDaysElement.appendChild(dayElement);
        }
    }

    // Generate initial calendar for current month
    generateCalendar(currentMonth, currentYear);

    // Function to get month name from index
    function getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    // Event listener for previous month navigation
    document.querySelector('.prev').addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Event listener for next month navigation
    document.querySelector('.next').addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Event delegation for day click event
    calendarDaysElement.addEventListener('click', function (event) {
        const selectedDay = event.target.textContent;
        if (selectedDay !== '') {
            alert(`You clicked on ${getMonthName(currentMonth)} ${selectedDay}, ${currentYear}`);
            // You can perform other actions based on the selected day
        }
    });
});