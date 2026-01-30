document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbers = document.querySelectorAll('.lotto-number');
    const historyList = document.getElementById('history-list');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const docHtml = document.documentElement;

    const applyTheme = (theme) => {
        docHtml.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeToggleBtn.textContent = '☀️';
        } else {
            themeToggleBtn.textContent = '🌙';
        }
    };

    const toggleTheme = () => {
        const currentTheme = docHtml.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    themeToggleBtn.addEventListener('click', toggleTheme);

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);


    const generateNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const displayNumber = (number, index) => {
        const lottoNumber = lottoNumbers[index];
        lottoNumber.textContent = number;
        // The background color is now handled by CSS variables, 
        // but we can keep the specific color logic for the numbers if we want
        lottoNumber.style.backgroundColor = getNumberColor(number);
    };

    const getNumberColor = (number) => {
        if (number <= 10) return '#f44336'; // Red
        if (number <= 20) return '#ff9800'; // Orange
        if (number <= 30) return '#ffc107'; // Amber
        if (number <= 40) return '#4caf50'; // Green
        return '#2196f3'; // Blue
    };

    const addToHistory = (numbers) => {
        const li = document.createElement('li');
        li.textContent = numbers.join(', ');
        historyList.prepend(li);
    };

    generateBtn.addEventListener('click', () => {
        const newNumbers = generateNumbers();
        newNumbers.forEach((number, index) => {
            setTimeout(() => displayNumber(number, index), index * 100);
        });
        addToHistory(newNumbers);
    });
});
