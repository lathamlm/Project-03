const config = {
    type: 'bubble',
    data: data,
    options: {}
};

// Create the data for the bubble chart
const data = {
 datasets: [
    {
      label: 'Chemical Release Breakdown',
      data: [
        { x: regionData[1].SRS_ID, y: regionData[1].Chemical_sums, r: regionData[1].Chemical_sums },
              
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    },
 ],
};

