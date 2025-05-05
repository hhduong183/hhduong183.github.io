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
                <td>${avarageScore(student.mathScore, student.englishScore, student.literatureScore)}</td>
                <td>
                    <button class="btn btn-success btn-sm"  onclick="updateStudent(${index})">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}


function createStudent(event) {
    event.preventDefault();

    // Lấy dữ liệu hiện có từ localStorage
    let studentsList = JSON.parse(localStorage.getItem('students')) || [];

    // Lấy giá trị từ form
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value; // Added optional chaining for safety
    const mathScore = parseFloat(document.getElementById('mathScore').value);
    const englishScore = parseFloat(document.getElementById('englishScore').value);
    const literatureScore = parseFloat(document.getElementById('literatureScore').value);

    // kiểm tra đủ dữ liệu
    if (!name || !gender || isNaN(mathScore) || isNaN(englishScore) || isNaN(literatureScore)) {
        alert('Vui lòng điền đầy đủ thông tin và chọn giới tính!');
        return;
    }

    // Check if updateIndex input exists and get its value
    const updateIndexInput = document.getElementById('updateIndex');
    const updateIndex = updateIndexInput ? updateIndexInput.value : ''; // Get value if input exists

    const studentData = {
        name,
        gender,
        mathScore, // Use the parsed float values
        englishScore,
        literatureScore
    };

    if (updateIndex !== undefined && updateIndex !== '') {
        // Cập nhật sinh viên
        const indexToUpdate = parseInt(updateIndex, 10);
        if (!isNaN(indexToUpdate) && indexToUpdate >= 0 && indexToUpdate < studentsList.length) {
            studentsList[indexToUpdate] = studentData; // Update the student at the correct index
        } else {
            console.error("Invalid index for update:", updateIndex);
            alert("Lỗi cập nhật sinh viên: Index không hợp lệ.");
            // Optionally reset form state here if needed
            document.getElementById('studentForm').reset();
            document.querySelector('button[type="submit"]').textContent = 'Create Student';
            if (updateIndexInput) updateIndexInput.value = ''; // Clear the hidden index
            return; // Stop execution if index is invalid
        }
    } else {
        // Thêm sinh viên mới vào đầu danh sách
        studentsList.unshift(studentData);
    }

    // Cập nhật lại localStorage
    localStorage.setItem('students', JSON.stringify(studentsList));

    // Render lại danh sách
    renderStudents();

    // Reset form and button text, clear hidden index
    document.getElementById('studentForm').reset();
    document.querySelector('button[type="submit"]').textContent = 'Create Student';
    if (updateIndexInput) updateIndexInput.value = ''; // Clear the hidden index after successful operation
}

function updateStudent(index) {
    // Lấy dữ liệu hiện có từ localStorage
    let studentsList = JSON.parse(localStorage.getItem('students')) || [];

    // Kiểm tra index hợp lệ
    if (index < 0 || index >= studentsList.length) {
        console.error("Invalid index for update:", index);
        alert("Không tìm thấy sinh viên để cập nhật.");
        return;
    }

    // Lấy sinh viên tại vị trí index
    const student = studentsList[index];

    // Điền dữ liệu vào form
    document.getElementById('name').value = student.name;
    // Ensure radio button exists before trying to check it
    const genderRadio = document.querySelector(`input[name="gender"][value="${student.gender}"]`);
    if (genderRadio) {
        genderRadio.checked = true;
    } else {
        console.warn(`Gender radio button not found for value: ${student.gender}`);
        // Optionally clear other radio buttons if needed
        document.querySelectorAll('input[name="gender"]').forEach(radio => radio.checked = false);
    }
    document.getElementById('mathScore').value = student.mathScore;
    document.getElementById('englishScore').value = student.englishScore;
    document.getElementById('literatureScore').value = student.literatureScore;

    // Thêm hoặc cập nhật hidden input để lưu index
    let hiddenInput = document.getElementById('updateIndex');
    if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'updateIndex';
        document.getElementById('studentForm').appendChild(hiddenInput);
    }
    hiddenInput.value = index; // Set the index value

    // Đổi text của nút submit
    document.querySelector('button[type="submit"]').textContent = 'Update Student';

    // Optional: Scroll form into view or focus the first field
    document.getElementById('name').focus();
}

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

function searchStudent() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const tableBody = document.getElementById('studentListBody');
    tableBody.innerHTML = '';

    // Lấy dữ liệu từ localStorage
    const studentsList = JSON.parse(localStorage.getItem('students')) || [];

    // Lọc danh sách sinh viên theo tên
    const filteredStudents = studentsList.filter(student => student.name.toLowerCase().includes(searchValue));

    // Hiển thị danh sách đã lọc
    filteredStudents.forEach((student, index) => {
        // Tìm index gốc của sinh viên trong danh sách đầy đủ để đảm bảo update/delete hoạt động đúng
        const originalIndex = studentsList.findIndex(s => s === student);
        const row = `
            <tr>
                <td>${index + 1}</td> 
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.mathScore}</td>
                <td>${student.englishScore}</td>
                <td>${student.literatureScore}</td>
                <td>${avarageScore(student.mathScore, student.englishScore, student.literatureScore)}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="updateStudent(${originalIndex})">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${originalIndex})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Nếu không có kết quả tìm kiếm
    if (filteredStudents.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center">Không tìm thấy sinh viên nào.</td></tr>';
    }
}

// Thêm event listener cho input tìm kiếm
document.getElementById('searchInput').addEventListener('input', searchStudent);

// Thêm event listener cho form để cập nhật chức năng tạo sinh viên
document.getElementById('studentForm').addEventListener('submit', createStudent);

//Đẩy dữ liệu vào bảng khi tải trang
renderStudents();


// Thêm vào cuối file để các hàm onclick hoạt động
window.deleteStudent = deleteStudent;
window.updateStudent = updateStudent;
