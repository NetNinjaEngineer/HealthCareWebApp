async function loadAppointments() {
    var tableData = document.querySelector(".appointment-table .table-data tbody");
    try {
        var response = await fetch('https://localhost:7266/api/Features/UpcomingAppointments');
        var data = await response.json();

        for (let i = 0; i < data.length; i++) {
            tableData.innerHTML += `
          <tr>
            <td>${data[i].patientName}</td>
            <td>${data[i].employeeName}</td>
            <td>${data[i].appointmentDate}</td>
            <td>${data[i].appointmentTime}</td>
            <td>${data[i].paid}</td>
          </tr>
        `;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

window.onload = loadAppointments;