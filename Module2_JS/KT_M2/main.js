// ==== TODO APP ==== //
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function clearTasks() {
  tasks = [];
  saveTasks();
}

function filterTasks(f) {
  filter = f;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    if (
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed)
    ) {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${i})">
        ${task.text}
        <button onclick="deleteTask(${i})"><i class="ion ion-close-circled"></button>
      `;
      list.appendChild(li);
    }
  });
}

renderTasks();


// ==== AUTH & USER FUNCTIONS ==== //
// let currentUsers = [...users]; // clone danh sách users để có thể thêm mới
let currentUsers = JSON.parse(localStorage.getItem('users')) || [...users];

// Lưu lại mặc định nếu localStorage chưa có
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(currentUsers));
}


function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  const result = document.getElementById("loginResult");

  if (!email || !password) {
    result.textContent = "Hãy nhập đầy đủ thông tin";
    return;
  }

  const user = currentUsers.find(u => u.email === email && u.password === password);
  if (user) {
    result.textContent = `Xin chào ${user.first_name} ${user.last_name}`;
  } else {
    result.textContent = "Thông tin tài khoản không chính xác";
  }
}

function register() {
  const first = document.getElementById("regFirst").value.trim();
  const last = document.getElementById("regLast").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const result = document.getElementById("registerResult");

  if (!first || !last || !email || !pass) {
    result.textContent = "Hãy nhập đầy đủ thông tin";
    return;
  }

  const exists = currentUsers.some(u => u.email === email);
  if (exists) {
    result.textContent = "Email này đã có tài khoản";
    return;
  }

  const newUser = {
    id: Math.max(...currentUsers.map(u => u.id)) + 1,
    first_name: first,
    last_name: last,
    email,
    password: pass
  };
//   push(users, newUser); // Thêm người dùng mới vào danh sách
  

  currentUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(currentUsers)); // Lưu danh sách người dùng vào localStorage
  result.textContent = "Đăng ký thành công!";
}


// ==== USER SEARCH ==== //
function searchUsers() {
  const keyword = document.getElementById("userKeyword").value.trim().toLowerCase();
  const list = document.getElementById("userList");
  list.innerHTML = "";

  const filtered = keyword
    ? currentUsers.filter(u =>
        u.first_name.toLowerCase().includes(keyword) ||
        u.last_name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword)
      )
    : currentUsers;

  filtered.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `#${u.id} - ${u.first_name} ${u.last_name} (${u.email})`;
    list.appendChild(li);
  });
}


// ==== POSTS FUNCTIONS ==== //
function getUserName(id) {
  const user = currentUsers.find(u => u.id === id);
  return user ? `${user.first_name} ${user.last_name}` : "Unknown";
}

function listPosts() {
  const list = document.getElementById("postList");
  list.innerHTML = "";
  posts.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `#${p.id} - ${p.title} (${p.created_at}) - Tác giả: ${getUserName(p.user_id)}`;
    list.appendChild(li);
  });
}
function clearListposts() {
  const list = document.getElementById("postList");
  list.innerHTML = "";
}


function showPostDetail() {
    const id = document.getElementById("postIdInput").value.trim();
    const post = posts.find(p => p.id == id);
    const postDetailCard = document.getElementById("postDetail");
  
    if (!post) {
      postDetailCard.classList.add("d-none");
      alert("Không tìm thấy bài viết!");
      return;
    }
  
    document.getElementById("detailId").textContent = post.id;
    document.getElementById("detailTitle").textContent = post.title;
    document.getElementById("detailContent").textContent = post.content;
    document.getElementById("detailImage").src = post.image || `https://picsum.photos/300/200?random=${Math.random()}`;
    document.getElementById("detailUser").textContent = getUserName(post.user_id);
    document.getElementById("detailCreated").textContent = post.created_at;
    document.getElementById("detailUpdated").textContent = post.updated_at;
  
    postDetailCard.classList.remove("d-none");
  }
  
function findPostsByUser() {
  const email = document.getElementById("emailSearch").value.trim().toLowerCase();
  const user = currentUsers.find(u => u.email.toLowerCase() === email);
  const list = document.getElementById("userPosts");
  list.innerHTML = "";

  if (!user) {
    list.innerHTML = "<li>Không tìm thấy user.</li>";
    return;
  }

  const userPosts = posts.filter(p => p.user_id === user.id);
  if (userPosts.length === 0) {
    list.innerHTML = "<li>Không có bài viết nào.</li>";
  } else {
    userPosts.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `#${p.id} - ${p.title}`;
      list.appendChild(li);
    });
  }
}
