<!DOCTYPE html>
<html>
<head>
  <title>Sơ đồ tổ chức - Dữ liệu giả lập</title>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script>
    google.charts.load('current', {packages:["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('string', 'Manager');
      data.addColumn('string', 'ToolTip');

      // Dữ liệu giả lập từ PHP
      const nodes = <?php
        $data = [
          ['id' => 1, 'name' => 'Nguyễn Văn A', 'title' => 'Giám đốc', 'parent' => null],
          ['id' => 2, 'name' => 'Trần Thị B', 'title' => 'Phó giám đốc', 'parent' => 1],
          ['id' => 3, 'name' => 'Lê Văn C', 'title' => 'Trưởng phòng Kinh doanh', 'parent' => 2],
          ['id' => 4, 'name' => 'Phạm Thị D', 'title' => 'Trưởng phòng Nhân sự', 'parent' => 2],
          ['id' => 5, 'name' => 'Ngô Văn E', 'title' => 'Nhân viên Kinh doanh', 'parent' => 3],
          ['id' => 6, 'name' => 'Hoàng Thị F', 'title' => 'Nhân viên Kinh doanh', 'parent' => 3],
          ['id' => 7, 'name' => 'Vũ Văn G', 'title' => 'Nhân viên Nhân sự', 'parent' => 4],
          ['id' => 8, 'name' => 'Đinh Thị H', 'title' => 'Thực tập sinh', 'parent' => 7],
        ];
        echo json_encode($data);
      ?>;

      nodes.forEach(function(row) {
        data.addRow([
          {v: String(row.id), f: row.name + '<div style="color:gray">' + row.title + '</div>'},
          row.parent ? String(row.parent) : null,
          row.title
        ]);
      });

      var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
      chart.draw(data, {allowHtml: true});
    }
  </script>
</head>
<body>
  <h2>Sơ đồ tổ chức (Giả lập không dùng SQL)</h2>
  <div id="chart_div"></div>
</body>
</html>
