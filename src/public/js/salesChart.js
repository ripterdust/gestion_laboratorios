const ctx = document.querySelector('#salesChart').getContext('2d')

const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'],
        datasets: [
            {
                label: 'Ventas',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                // borderColor: "rgb(121, 40, 202)",
                borderColor: 'rgb(255, 0, 128)',
                tension: 0.3,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
})
