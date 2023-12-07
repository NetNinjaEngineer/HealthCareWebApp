const closeBtn = document.getElementById("closeBtn"),
  openBtn = document.getElementById("openBtn"),
  sidebar = document.querySelector(".sidebar"),
  content = document.querySelector(".content"),
  mainInfo = document.querySelector("main .SEC .sec1 .info");

// const video = document.getElementById('vid');
// const playButton = document.querySelector('playbtn');


closeBtn.addEventListener("click", (e) => {
  mainInfo.style.marginTop = "100px";
  sidebar.style.display = "none";
  sidebar.style.width = "0px"
  content.style.marginLeft = "0px"
  openBtn.style.display = "block";
})

openBtn.addEventListener("click", () => {
  mainInfo.style.margin = '35px auto'
  sidebar.style.display = "block";
  sidebar.style.width = "250px"
  content.style.marginLeft = "250px"
  openBtn.style.display = "none";
})

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.querySelector('body');
  body.classList.toggle('dark-mode');

  // Save user preference in localStorage
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Check if dark mode preference exists in localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  const body = document.querySelector('body');

  if (isDarkMode) {
    body.classList.add('dark-mode');
  }
});


async function loadAppointments() {
  var tableData = document.querySelector(".patientappointments .data .tableAppointment tbody");
  try {
    var response = await fetch('https://localhost:7266/api/Features/UpcomingAppointments');

    if (response.ok) {
      var data = await response.json();

      for (let i = 0; i < data.length; i++) {
        tableData.innerHTML += `
            <tr>
              <td>${data[i].patientName}</td>
              <td>${data[i].employeeName}</td>
              <td>${new Date(data[i].appointmentDate).toDateString()}</td>
              <td>${data[i].appointmentTime}</td>
              <td>${data[i].paid}</td>
            </tr>
      `;
      }
    }

  } catch (error) {
    console.log(error)
  }
}

loadAppointments();


var appointmentsDropDown = document.querySelector(".list #appointments");
var options = appointmentsDropDown.getElementsByTagName('option');

async function toggleAppointments() {
  appointmentsDropDown.onchange = async function () {
    var selectedValue = appointmentsDropDown.options[appointmentsDropDown.selectedIndex].value;
    var title = document.querySelector(".patientappointments .title");
    var tableData = document.querySelector(".patientappointments .data .tableAppointment tbody");

    if (selectedValue === "Upcomming Appointments") {
      title.innerHTML = "Upcomming Appointments"
      tableData.innerHTML = "";

      try {
        var response = await fetch('https://localhost:7266/api/Features/UpcomingAppointments');
        var data = await response.json();

        for (let i = 0; i < data.length; i++) {
          tableData.innerHTML += `
              <tr>
                <td>${data[i].patientName}</td>
                <td>${data[i].employeeName}</td>
                <td>${new Date(data[i].appointmentDate).toDateString()}</td>
                <td>${data[i].appointmentTime}</td>
                <td>${data[i].paid}</td>
              </tr>
        `;
        }
      }
      catch (error) {
        console.log(error)
      }
    } else if (selectedValue === "Current Appointments") {
      title.innerHTML = "Current Appointments";
      tableData.innerHTML = "";

      try {
        var response = await fetch('https://localhost:7266/api/Features/GetCurrentAppointments');
        var data = await response.json();

        for (let i = 0; i < data.length; i++) {
          tableData.innerHTML += `
              <tr>
                <td>${data[i].patientName}</td>
                <td>${data[i].employeeName}</td>
                <td>${new Date(data[i].appointmentDate).toDateString()}</td>
                <td>${data[i].appointmentTime}</td>
                <td>${data[i].paid}</td>
              </tr>
        `;
        }
      }
      catch (error) {
        console.log(error)
      }


    } else {
      title.innerHTML = "Paid Appointments";
      tableData.innerHTML = "";

      try {
        var response = await fetch('https://localhost:7266/api/Features/GetPaidAppointments');
        if (response.ok) {
          var data = await response.json();

          for (let i = 0; i < data.length; i++) {
            tableData.innerHTML += `
            <tr>
              <td>${data[i].patient}</td>
              <td>${data[i].doctor}</td>
              <td>${new Date(data[i].appointmentDate).toDateString()}</td>
              <td>${data[i].appointmentTime}</td>
              <td>${data[i].paid}</td>
            </tr>
        `;
          }
        } else {
          console.error("Response not ok", response.status)
        }
      }
      catch (error) {
        console.log(error)
      }


    }
  }
}

toggleAppointments();

async function loadEmployeeScedules() {
  var tableData = document.querySelector(".employeeSchedual tbody");
  try {
    var response = await fetch('https://localhost:7266/api/Features/GetEmployeeSchedules');
    if (response.ok) {
      var data = await response.json();

      for (let i = 0; i < data.length; i++) {
        tableData.innerHTML += `
          <tr>
            <td>${data[i].employeeName}</td>
            <td>${data[i].days}</td>
            <td>${data[i].schedule}</td>
            <td>${data[i].jobTitle}</td>
          </tr>
        `;
      }
    } else {
      console.error("Response not ok: ", response.status)
    }
  } catch (error) {
    console.log(error)
  }
}

loadEmployeeScedules();

var pageInput = document.getElementById("page");
pageInput.addEventListener('input', function (event) {
  var value = parseInt(event.target.value.trim());

  if (value != ' ') {
    searchSchedule(value);
  }
  else if (value === '') {
    window.onload = loadEmployeeScedules;
  }

})

function searchSchedule(searchQuery) {
  const api = "https://localhost:7266/api/Features/PaginateGetEmployeeSchedules";
  const resquestData = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'page': searchQuery
    }
  }

  fetch(api, resquestData)
    .then(response => {

      if (!response.ok)
        return new Error("Response not ok");
      else
        return response.json();
    })
    .then(data => {
      displayData(data);
    })
    .catch(err => console.log(err))
}

const scheduales = document.querySelector(".employeeSchedual tbody");

function displayData(data) {
  scheduales.innerHTML = "";

  if (data.length > 0) {
    data.forEach(schedule => {
      scheduales.innerHTML += `
        <tr>
          <td>${schedule.employeeName}</td>
          <td>${schedule.days}</td>
          <td>${schedule.schedule}</td>
          <td>${schedule.jobTitle}</td>
        </tr>
      `;
    });
  }
}

function clearResults() {
  scheduales.innerHTML = ' ';
}

async function getDoctors(api) {
  const doctorsContainer = document.querySelector(".content main .sec2 .doctors");
  try {
    const response = await fetch(api);

    if (!response.ok)
      throw new Error("Response not ok: ", response.status);
    else {
      const data = await response.json();
      const length = data.length - 2;

      for (let i = 0; i < length; i++) {
        doctorsContainer.innerHTML += `
        <div class="doctor">
          <div class="image">
            <img src= ${data[i].imageUrl}>
          </div>
          <div class="info">
            <div class="name">DR. ${data[i].firstName} ${data[i].lastName}</div>
            <div class="dept">${data[i].department}</div>
          </div>
        </div>
      `;

      }
    }

  } catch (error) {
    console.log(error);
  }
}

getDoctors("https://localhost:7266/api/Features/GetDoctors");

function loadAllDoctorsPage() {
  const btn = document.querySelector(".sec2 .head button");
  btn.addEventListener("click", function () {
    window.location.href = "../views/doctors.html"
  })

}

loadAllDoctorsPage();

window.onload = function () {
  const labVideo = document.querySelector(".labVideo");
  fetch("https://localhost:7266/api/MedicalVideos/GetMedicalVideos", {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => {
    if (!response.ok)
      return new Error("Response not ok");
    return response.json();
  }).then(data => {
    var firstVideo = data[0];
    console.log(firstVideo);
    labVideo.innerHTML = `
    <div class="info">
      <div class="title">See What Makes Us Different</div>
      <div class="description">${firstVideo.description}</div>
    </div>
    <div class="video">
      <video id="vid" class=".custom-video" controls poster="./images/1600px_COLOURBOX9567762.jpg">
        <source src= ${firstVideo.path} type="video/mp4">
        your browser does not support video tag
      </video>
    </div>
  `;
  })
}

// playButton.addEventListener('click', function () {
//   if (video.paused) {
//     video.play();
//     playButton.style.display = 'none'; 
//   } else {
//     video.pause();
//   }
// });

// video.addEventListener('ended', function () {
//   playButton.style.display = 'block'; 
// });

// console.log(video)
// console.log(playButton)