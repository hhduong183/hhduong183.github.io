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
                <td>${(student.mathScore + student.englishScore + student.literatureScore) / 3}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="updateStudent(${index})">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
localStorage.setItem("students", JSON.stringify(studentsList));
renderStudents();

function createStudent(event) {
    event.preventDefault(); // Ngăn form submit mặc định

    // Lấy giá trị từ form
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const mathScore = parseFloat(document.getElementById('mathScore').value);
    const englishScore = parseFloat(document.getElementById('englishScore').value);
    const literatureScore = parseFloat(document.getElementById('literatureScore').value);

    // Validate dữ liệu
    if (!name || !gender || isNaN(mathScore) || isNaN(englishScore) || isNaN(literatureScore)) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Tạo object sinh viên mới
    const newStudent = {
        name,
        gender,
        mathScore,
        englishScore,
        literatureScore
    };

    // Thêm sinh viên mới vào danh sách
    studentsList.push(newStudent);

    // Cập nhật localStorage
    localStorage.setItem('students', JSON.stringify(studentsList));

    // Render lại danh sách
    renderStudents();

    // Reset form
    document.getElementById('studentForm').reset();
}

// Thêm event listener cho form
document.getElementById('studentForm').addEventListener('submit', createStudent);