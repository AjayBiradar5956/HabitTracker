const sDate = document.querySelectorAll('.sDate');
const eDate = document.querySelectorAll('.eDate');

for (let i = 0; i < sDate.length; i++) {
    const date = new Date(sDate[i].innerText);
    const date1 = new Date(eDate[i].innerText);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedDate1 = date1.toLocaleDateString('en-US', options);
    sDate[i].innerText = formattedDate;
    eDate[i].innerText = formattedDate1;
}

async function showCalendar(habitId) {
    const calendarContainer = document.getElementById(`calendar-${habitId}`);
    calendarContainer.classList.toggle('hidden');

    // Fetch habit details from the server
    try {
        const response = await fetch(`/habit/${habitId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch habit details');
        }
        const habit = await response.json();

        // Retrieve the start and end dates of the habit
        const startDate = new Date(habit.startDate);
        const endDate = new Date(habit.endDate);

        // Generate the calendar HTML using the start and end dates
        const calendarHTML = generateCalendarHTML(startDate, endDate);

        // Display the calendar HTML in the calendarContainer
        calendarContainer.innerHTML = calendarHTML;
    } catch (error) {
        console.error(error);
    }
}

function generateCalendarHTML(startDate, endDate) {
    // Generate the calendar HTML based on the start and end dates

    let calendarHTML = '<div class="calendar-container">';
    const currentDate = new Date(startDate);
    const endDateCopy = new Date(endDate);
    const calendarMonths = [];

    // Create an array of calendar months
    while (currentDate <= endDateCopy) {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const startDateOfMonth = new Date(currentYear, currentMonth, 1);
        const endDateOfMonth = new Date(currentYear, currentMonth + 1, 0);

        calendarMonths.push({ startDate: startDateOfMonth, endDate: endDateOfMonth });

        currentDate.setMonth(currentDate.getMonth() + 1);
    }



    // Generate the calendar HTML for each month
    for (let i = 0; i < calendarMonths.length; i++) {
        const { startDate, endDate } = calendarMonths[i];
        const monthName = startDate.toLocaleString('default', { month: 'long' });
        const year = startDate.getFullYear();

        calendarHTML += '<div class="month-container';
        if (i === 0) {
            calendarHTML += ' current-month'; // Add class to the first month to make it visible initially
        }
        calendarHTML += '">';
        calendarHTML += `<h2 class="month-heading">${monthName} ${year}</h2>`;
        calendarHTML += '<table class="calTable">';
        calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

        const startDay = startDate.getDay();
        const totalDays = endDate.getDate();

        let currentDay = 1;

        // Loop through the rows of the calendar
        while (currentDay <= totalDays) {
            calendarHTML += '<tr>';

            // Loop through the days of the week
            for (let day = 0; day < 7; day++) {
                if ((currentDay === 1 && day < startDay) || currentDay > totalDays) {
                    calendarHTML += '<td></td>'; // Empty cell for days outside the current month
                } else {
                    calendarHTML += `<td data-day="${currentDay}" class="calendar-cell">${currentDay}</td>`;
                    currentDay++;
                }
            }

            calendarHTML += '</tr>';
        }

        calendarHTML += '</table>';
        calendarHTML += '</div>';
    }

    calendarHTML += '</div>';
    return calendarHTML;
}

// Add event listeners to calendar cells
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('calendar-cell')) {
        const cell = event.target;
        const currentColor = cell.dataset.color || '';
        let newColor = '';

        if (currentColor === 'green') {
            newColor = 'red';
        } else if (currentColor === 'red') {
            newColor = '';
        } else {
            newColor = 'green';
        }

        cell.dataset.color = newColor;
        cell.style.backgroundColor = newColor;
    }
});




