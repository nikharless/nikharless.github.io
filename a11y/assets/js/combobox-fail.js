const searchBox = document.querySelector('.search-box');
const options = document.querySelectorAll('.options li');
const selectedOption = document.querySelector('.selected-option');
const clearButton = document.getElementById('clear-button');

// Check if search country present in menu list
searchBox.addEventListener('input', () => {
    const searchTerm = searchBox.value.toLowerCase();

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
});

// Iterating and printing the selected country name
for (const option of options) {
    option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        selectedOption.textContent = 
            "You have chosen " + option.textContent;
        searchBox.value = '';
        for (const opt of options) {
            opt.style.display = 'block';
        }
    });
}

clearButton.addEventListener('click', function () {
    selectedOption.textContent = 'Select an option';
    searchBox.value = '';
    options.forEach(option => {
        option.style.display = 'block';
    });
});