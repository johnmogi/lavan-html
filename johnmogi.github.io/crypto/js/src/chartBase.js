// call api and get data
var lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First dataset',
        borderColor: window.chartColors.red,
        backgroundColor: window.chartColors.red,
        fill: false,
        data: [
            10, 3,
            // randomScalingFactor(),

            randomScalingFactor()
        ],
        yAxisID: 'y-axis-1',
    }, {
        label: 'My Second dataset',
        borderColor: window.chartColors.blue,
        backgroundColor: window.chartColors.blue,
        fill: false,
        data: [
            10, 5, 10
            // randomScalingFactor(),

        ],
        yAxisID: 'y-axis-2'
    }]
};