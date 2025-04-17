<?php
require 'vendor/autoload.php';

use PhpOffice\PhpWord\TemplateProcessor;

// Kiểm tra nếu có dữ liệu gửi từ form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contractData = [
        'contract_number' => $_POST['contract_number'],
        'customer_name'   => $_POST['customer_name'],
        'start_date'      => $_POST['start_date'],
        'end_date'        => $_POST['end_date'],
        'total_amount'    => $_POST['total_amount'],
    ];

    try {
        // Load template Word
        $templatePath = 'templates/contract_template.docx';
        $templateProcessor = new TemplateProcessor($templatePath);

        // Thay thế dữ liệu trong template
        foreach ($contractData as $key => $value) {
            $templateProcessor->setValue($key, $value);
        }

        // Lưu file hợp đồng đã tạo
        $outputPath = 'contracts/contract_' . $contractData['contract_number'] . '.docx';
        $templateProcessor->saveAs($outputPath);

        // Trả về đường dẫn để hiển thị trong iframe
        echo json_encode(['success' => true, 'file_url' => $outputPath]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chỉnh sửa hợp đồng</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { width: 80%; margin: auto; }
        form { margin-bottom: 20px; }
        label { font-weight: bold; display: block; margin-top: 10px; }
        input { width: 100%; padding: 8px; margin-top: 5px; }
        button { margin-top: 10px; padding: 10px 15px; background: blue; color: white; border: none; }
        iframe { width: 100%; height: 500px; border: 1px solid #ccc; margin-top: 20px; }
    </style>
</head>
<body>

<div class="container">
    <h2>Nhập thông tin hợp đồng</h2>
    <form id="contractForm">
        <label>Số hợp đồng:</label>
        <input type="text" name="contract_number" required>

        <label>Tên khách hàng:</label>
        <input type="text" name="customer_name" required>

        <label>Ngày bắt đầu:</label>
        <input type="date" name="start_date" required>

        <label>Ngày kết thúc:</label>
        <input type="date" name="end_date" required>

        <label>Tổng tiền:</label>
        <input type="number" name="total_amount" required>

        <button type="submit">Tạo Hợp Đồng</button>
    </form>

    <h2>Xem trước hợp đồng</h2>
    <iframe id="contractPreview" src="" style="display: none;"></iframe>
</div>

<script>
$(document).ready(function() {
    $("#contractForm").submit(function(event) {
        event.preventDefault();

        var formData = $(this).serialize();

        $.post("generate_contract.php", formData, function(response) {
            var data = JSON.parse(response);
            if (data.success) {
                $("#contractPreview").attr("src", "https://docs.google.com/gview?url=" + window.location.origin + "/" + data.file_url + "&embedded=true");
                $("#contractPreview").show();
            } else {
                alert("Lỗi: " + data.message);
            }
        });
    });
});
</script>

</body>
</html>
