let chart;
let refreshTimer;
const ctx = document.getElementById('gpuChart').getContext('2d');
const intervalInput = document.getElementById('interval');

function createChart(labels, data) {
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'GPU Utilization %',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updateGpus(gpuData) {
    const container = document.getElementById('gpuCards');
    container.innerHTML = '';
    gpuData.forEach(gpu => {
        const card = document.createElement('div');
        card.className = 'gpu-card';
        card.innerHTML = `<strong>${gpu.name}</strong><br>
            Utilization: ${gpu.utilization}%<br>
            Memory: ${gpu.memory_used}/${gpu.memory_total} MB<br>
            Temp: ${gpu.temperature}&deg;C`;
        container.appendChild(card);
    });
}

async function fetchGpuData() {
    try {
        const response = await fetch('/api/gpus');
        const result = await response.json();
        const labels = result.timestamps;
        const data = result.utilization;
        createChart(labels, data);
        updateGpus(result.gpus);
    } catch (error) {
        console.error('Failed to fetch GPU data:', error);
    }
}

function startAutoRefresh() {
    clearInterval(refreshTimer);
    fetchGpuData();
    const interval = parseInt(intervalInput.value, 10) * 1000;
    refreshTimer = setInterval(fetchGpuData, interval);
}

intervalInput.addEventListener('change', startAutoRefresh);
document.addEventListener('DOMContentLoaded', startAutoRefresh);
