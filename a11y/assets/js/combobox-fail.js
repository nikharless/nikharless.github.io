// Variables
const dropdown = document.querySelector('.dropdown');
const input = document.querySelector('input');
const listOfOptions = document.querySelectorAll('.option');
const body = document.body;

// Functions
const toggleDropdown = (event) => {
  //event.stopPropagation();
  dropdown.classList.toggle('opened');
};

const selectOption = (event) => {
  input.value = event.currentTarget.textContent;
};

const closeDropdownFromOutside = () => {
  if (dropdown.classList.contains('opened')) {
    dropdown.classList.remove('opened');
  }
};
// Event Listeners

body.addEventListener('click', closeDropdownFromOutside);

listOfOptions.forEach((option) => {
  option.addEventListener('click', selectOption);
});

dropdown.addEventListener('click', toggleDropdown);
dropdown.addEventListener('keydown', onButtonKeyDown)

function onButtonKeyDown(event) {
    if (event.key === ' ') {
      toggleDropdown();
      event.preventDefault();
    }
  }