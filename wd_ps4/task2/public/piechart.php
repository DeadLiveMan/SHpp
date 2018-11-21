<?php
require '..'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'readStatistics.php';

function getJsonString() {
//    $result = "[['Graphic','Plants']";
//    foreach (getStatistics() as $key => $value) {
//        $result .= ",['$key',$value]";
//    }
//    $result .= "]";

    return json_decode(getStatistics());
}
?>

<!doctype html>
<html lang="en">
<head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            const data = google.visualization.arrayToDataTable(<?php echo getJsonString(); ?>);
            const options = {
                title: 'Your loved Plants'
            };
            let chart = new google.visualization.PieChart(document.getElementById('#piechart'));
            chart.draw(data, options);
        }
    </script>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PieChart</title>
</head>
<body>
    <div id="#piechart" style="width: 900px; height: 500px;"></div>
</body>
</html>
