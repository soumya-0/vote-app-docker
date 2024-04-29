let voteData = {
    dog: 0,
    cat: 0,
    goldfish: 0
};

const voteBtns = document.querySelectorAll('button[id$="-btn"]');
const voteCount = document.getElementById('vote-count');

function vote(animal) {
    voteData[animal]++;
    updateChart();
    displayVoteCount();
}

function updateChart() {
    const ctx = document.getElementById('vote-chart').getContext('2d');
    const labels = Object.keys(voteData);
    const data = Object.values(voteData);

    if (window.chart) {
        window.chart.destroy();
    }

    window.chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Votes',
                data: data,
                backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384'],
            }]
        },
    });
}

function displayVoteCount() {
    let countText = '';
    Object.keys(voteData).forEach(animal => {
        countText += `${animal}: ${voteData[animal]} `;
    });
    voteCount.innerText = countText;
}

function calculateGrade() {
    const totalVotes = Object.values(voteData).reduce((a, b) => a + b, 0);
    const percentage = totalVotes > 0 ? voteData.dog / totalVotes * 100 : 0;
    
    let grade;
    if (percentage >= 90) {
        grade = 'A';
    } else if (percentage >= 80) {
        grade = 'B';
    } else if (percentage >= 70) {
        grade = 'C';
    } else if (percentage >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }
    
    gradeDisplay.innerText = `Grade: ${grade}`;
}


updateChart();
displayVoteCount();

