async function calculateTax(income, deductions) {
    const response = await fetch("calculate_tax.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ income, deductions })
    });
    const data = await response.json();
    console.log(data);
}

// // Gọi hàm với dữ liệu mẫu
// calculateTax(20000000, 11000000);
<script>
function editLoaiHopDong(id, ten_hop_dong, thoi_han, mo_ta) {
    $('#edit_id').val(id);
    $('#edit_ten_hop_dong').val(ten_hop_dong);
    $('#edit_thoi_han').val(thoi_han || '');
    $('#edit_mo_ta').val(mo_ta);
    $('#editModal').modal('show');
}

function deleteLoaiHopDong(id) {
    Swal.fire({
        title: 'Xác nhận xóa?',
        text: "Bạn có chắc muốn xóa loại hợp đồng này?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `?delete=${id}&p=system&a=hopdong-type`;
        }
    });
}

$(document).ready(function() {
    $('#dataTable').DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print"]
    });

    // Handle success messages
    <?php if (isset($_GET['add']) || isset($_GET['update']) || isset($_GET['del'])): ?>
    Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: {'<?php 
            if (isset($_GET['add'])) echo 'Thêm loại hợp đồng thành công';
            elseif (isset($_GET['update'])) echo 'Cập nhật loại hợp đồng thành công';
            elseif (isset($_GET['del'])) echo 'Xóa loại hợp đồng thành công'; ?>
        showCloseButton: true},ko
        timer: 2000,
        showConfirmButton: false,
    });
}
);
</script>