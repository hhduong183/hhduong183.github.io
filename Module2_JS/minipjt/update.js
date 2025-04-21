import studentsList from './data.js'; // Import danh sách sinh viên từ data.js
// localStorage.setItem("students", JSON.stringify(studentsList));
function avarageScore(mathScore, englishScore, literatureScore) {
    return (parseFloat(mathScore) + parseFloat(englishScore) + parseFloat(literatureScore)) / 3;
}
// Hàm hiển thị danh sách sinh viên
function renderStudents() {
    const tableBody = document.getElementById('studentListBody');
    tableBody.innerHTML = '';
    
    // Lấy dữ liệu từ localStorage
    const studentsList = JSON.parse(localStorage.getItem('students')) || [];

    studentsList.forEach((student, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.mathScore}</td>
                <td>${student.englishScore}</td>
                <td>${student.literatureScore}</td>
                <td>${avarageScore(student.mathScore , student.englishScore , student.literatureScore)}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="updateStudent(${index})">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

renderStudents();

function createStudent(event) {
    event.preventDefault();
    
    // Lấy dữ liệu hiện có từ localStorage
    let studentsList = JSON.parse(localStorage.getItem('students')) || [];
    
    // Lấy giá trị từ form
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const mathScore = parseFloat(document.getElementById('mathScore').value);
    const englishScore = parseFloat(document.getElementById('englishScore').value);
    const literatureScore = parseFloat(document.getElementById('literatureScore').value);

    // Kiểm tra đủ dữ liệu
    if (!name || !gender || isNaN(mathScore) || isNaN(englishScore) || isNaN(literatureScore)) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    const updateIndex = document.getElementById('updateIndex')?.value;

    if (updateIndex !== undefined && updateIndex !== '') {
        // Cập nhật sinh viên
        studentsList[updateIndex] = {
            name,
            gender,
            mathScore,
            englishScore,
            literatureScore
        };
    } else {
        // Thêm sinh viên mới
        studentsList.push({
            name,
            gender,
            mathScore,
            englishScore,
            literatureScore
        });
    }

    // Cập nhật localStorage
    localStorage.setItem('students', JSON.stringify(studentsList));

    // Reset form
    document.getElementById('studentForm').reset();
    document.querySelector('button[type="submit"]').textContent = 'Create Student';
    document.getElementById('updateIndex').value = '';

    // Render lại danh sách
    renderStudents();
}

// Thêm event listener cho form
document.getElementById('studentForm').addEventListener('submit', createStudent);

function deleteStudent(index) {
    // Xác nhận trước khi xóa
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        // Lấy dữ liệu hiện có từ localStorage
        let studentsList = JSON.parse(localStorage.getItem('students')) || [];

        // Xóa sinh viên tại vị trí index
        studentsList.splice(index, 1);

        // Cập nhật lại localStorage
        localStorage.setItem('students', JSON.stringify(studentsList));

        // Render lại danh sách
        renderStudents();
    }
}

function updateStudent(index) {
    // Lấy dữ liệu hiện có từ localStorage
    let studentsList = JSON.parse(localStorage.getItem('students')) || [];
    
    // Lấy sinh viên tại vị trí index
    const student = studentsList[index];

    // Điền dữ liệu vào form
    document.getElementById('name').value = student.name;
    // Sửa lại cách chọn radio button
    document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
    document.getElementById('mathScore').value = student.mathScore;
    document.getElementById('englishScore').value = student.englishScore;
    document.getElementById('literatureScore').value = student.literatureScore;
    
    // Thêm hidden input để lưu index
    if (!document.getElementById('updateIndex')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'updateIndex';
        document.getElementById('studentForm').appendChild(hiddenInput);
    }
    document.getElementById('updateIndex').value = index;

    // Đổi text của nút submit
    document.querySelector('button[type="submit"]').textContent = 'Update Student';
}

// Thêm vào cuối file
window.deleteStudent = deleteStudent;
window.updateStudent = updateStudent;
