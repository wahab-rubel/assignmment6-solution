// Save/store current fatched pets data

let storedPetsData = [];



const loadingSpinner = (show) => {
 const spinner = document.getElementById('loader');
 if (show){
  spinner.classList.remove('hidden');
  document.getElementById('all-pets').innerHTML = ''
 }
 else {
  spinner.classList.add('hidden');
 }
}

// Remove active buttons styles
const removeActiveClasses = () => {
 const allButtons = document.querySelectorAll('.category-btn');
console.log(allButtons);
 
}


// Add active classes 

const addActiveClass = (category) => {
const activeButtons = document.getElementById(`btn-${category}`);
activeButtons.classList.remove('rounded-xl');
 activeButtons.classList.add('bg-emerald-100', 'rounded-full', 'border-teal-800', 'border-2');
}

// handle like buttons

const like= imgUrl => {
 const imageContainer = document.getElementById('liked-pets')
 const div = document.createElement('div');
 div.innerHTML = `
 <img src="${imgUrl}" class="rounded-lg" alt="images" />
 `;
 imageContainer.appendChild(div);
}

// handle sort data
const sort = () => {
 console.log(storedPetsData);
}