let dataSource = regionData

let chemList = []
for(let t=0;t<dataSource[0].SRS_ID.length; t++) {  
    let chemDict = {}
    chemDict["x"] = dataSource[0].SRS_ID[t]
    chemDict["y"] = dataSource[0].Chemical_sums[t]
    chemDict["r"] = (dataSource[0].Chemical_sums[t]/1000)
    chemList.push(chemDict)
};

console.log("Chemical List-bubble", chemList)

let bubbleData = {
    datasets: [{
        label: "Tons",
        data: chemList,
        backgroundColor: "rgb(171, 253, 145)",
        borderColor: "rgb(0, 0, 2)",
        borderWidth: 1
    }]
};

let bubbleChart = new Chart(
    document.getElementById("chart-chem-bubble").getContext('2d'),
    {
        type: 'bubble',
        data: bubbleData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Toxic Releases by Chemicals'
            }
          }
        }, 
    }
)

/*let combo1 = dataSource[0].State.concat(dataSource[1].State)
let combo2 = dataSource[2].State.concat(dataSource[3].State)
let combo3 = combo1.concat(combo2)
let combo4 = combo3.concat(dataSource[5].State)

let combo1a = dataSource[0].State_sum.concat(dataSource[1].State_sum)
let combo2a = dataSource[2].State_sum.concat(dataSource[3].State_sum)
let combo3a = combo1a.concat(combo2a)
let combo4a = combo3a.concat(dataSource[5].State_sum)
console.log(combo4a)

let data3 = {
    labels: combo4,
    datasets: [{
        label: "Tons",
        data: combo4a,
        backgroundColor: [
            "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", "rgb(238, 93, 108)", 
            "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", "rgb(171, 253, 145)", 
            "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", "rgb(0, 134, 173)", 
            "rgb(238, 175, 97)", "rgb(238, 175, 97)", "rgb(238, 175, 97)", "rgb(238, 175, 97)", 
            'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)', 'rgb(59, 214, 198)'
        ]
    }]
};

let barChart = new Chart(
    document.getElementById("chart-bar").getContext('2d'),
    {
        type: "bar",
        data: data3,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: "Toxic Releases (by State)",
                    fontSize: 20,
                }
            }
        }
    }
)
*/
let data3 = {
    labels: dataSource[0].State,
    datasets: [{
        label: "Tons",
        data: dataSource[0].State_sum,
        backgroundColor: "rgb(0, 134, 173)",
        borderColor: "rgb(0, 0, 2)",
        borderWidth: 1
    }]
};

let barChart = new Chart(
    document.getElementById("chart-bar").getContext('2d'),
    {
        type: "bar",
        data: data3,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: "Toxic Releases (by State)",
                    fontSize: 20,
                }
            }
        }
    }
)

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData)
    });
    chart.update();
}