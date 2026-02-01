const employeeList = document.getElementById("employeeList");
const todayDate = document.getElementById("todayDate");

todayDate.textContent = "Date: " + new Date().toLocaleDateString();

let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveData() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function renderEmployees() {
  employeeList.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.name}</td>
      <td class="${emp.status === 'Present' ? 'present' : 'absent'}">
        ${emp.status}
      </td>
      <td>
        <button class="action present-btn" onclick="markAttendance(${index}, 'Present')">P</button>
        <button class="action absent-btn" onclick="markAttendance(${index}, 'Absent')">A</button>
      </td>
    `;

    employeeList.appendChild(row);
  });
}

function addEmployee() {
  const nameInput = document.getElementById("employeeName");
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Enter employee name");
    return;
  }

  employees.push({ name, status: "Absent" });
  nameInput.value = "";
  saveData();
  renderEmployees();
}

function markAttendance(index, status) {
  employees[index].status = status;
  saveData();
  renderEmployees();
}

renderEmployees();
