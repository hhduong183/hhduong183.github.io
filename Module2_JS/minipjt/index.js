import  studentsList  from './data.js'; // Import danh sách sinh viên từ data.js

// Hàm hiển thị danh sách sinh viên
function renderStudents() {
    const tableBody = document.getElementById('studentListBody');
    tableBody.innerHTML = '';

    studentsList.forEach((student, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.mathScore}</td>
                <td>${student.englishScore}</td>
                <td>${student.literatureScore}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="updateStudent(${index})">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
// localStorage.setItem("students", JSON.stringify(studentsList));
renderStudents();