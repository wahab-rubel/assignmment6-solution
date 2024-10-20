const loadCategories = async () => {
 const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
 const data = await res.json();
 displayCategories(data.categories);
}


const loadAllPets = async () => {
 loadingSpinner(true);
 const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
 const data = await res.json();
 setTimeout(() => {
  displayPets(data.pets)
  storedPetsData = data.pets
  loadingSpinner(false)
 }, 2000)
}

const loadPetsByCategory = async category => {
 // Remove active class if exist
 removeActiveClasses()
 // show active class 
 addActiveClass(category)
 loadingSpinner(true)
 const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
 const data = await res.json();
 
 setTimeout(() => {
  displayPets(data.data);
  storedPetsData = data.data
  loadingSpinner(false)
 }, 2000)
}
const loadPetsDetails = async id => {
 
 const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
 const data = await res.json();
 
 displayPetDetails(data.petData)
}

const displayPetDetails = data =>{
 console.log(data)
const modalBody = document.getElementById('details-container')
modalBody.innerHTML = `
<img class="h-60 rounded-xl object-cover w-full" src="${data.image}" />
<h3 class="text-xl font-bold my-2">${data.pet_name}</h3>
`
my_modal_5.showModal()
}


const displayCategories = data => {
 const categoryContainer = document.getElementById('pet-categories')
 data.forEach(category => {
  const div = document.createElement('div');
  div.innerHTML = `
  <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex items-center gap-4 rounded-lg border px-14 py-4 cursor-pointer h-full"
  <img src="${category.category_icon}" class="w-10" alt="images" />
  <p class="text-xl font-bold">${category.category}</p>
  </button>
  `
  categoryContainer.appendChild(div)
 })
}


const displayPets = data => {
 const petContainers = document.getElementById('all-pets');

 if(data.length === 0){
petContainers.classList.remove('grid')
petContainers.innerHTML = `
<div class="bg-gray-400 p-20 rounded-lg text-center space-y-4">
<img class="mx-auto" src="./images/error.webp"/>
<h3 class="text-white text-3xl font-semibold">No Information Available!</h3>
<p class="text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
its layout. The point of using Lorem Ipsum is that it has a.</p>
</div>

`

  return
 } else(
  petContainers.classList.add('grid')
 )
 
 data.forEach(pet => {
  const div = document.createElement('div')
  div.classList.add(
   'flex', 
   'flex-col', 
   'gap-2', 
   'p-4', 
   'border', 
   'rounded-xl', 
   'font-bold'
  )
  div.innerHTML = `
  <img src="${pet.image}" class="h-36 w-full rounded-lg object-cover" alt="images" />
  <h1 class="text-black">Name: ${pet.pet_name}</h1>
  <h2 class="text-sm">Breed: ${pet.breed ? pet.breed: 'Not Available'}</h2>
  <h2 class="text-sm">Birth: ${pet.date_of_birth ? pet.date_of_birth: 'Not Available'}</h2>
  <h2 class="text-sm">Gender: ${pet.gender ? pet.gender: 'Not Available'}</h2>
  <h2 class="text-sm">Price: ${pet.price ? '$' + pet.price: 'Not Available'}</h2>
  

  <hr class="my-2"/>


  <div class="flex justify-between items-center px-2">
   <button onclick="like ('${pet.image}')" class="btn bg-white text-gray-700 px-4 py-2 rounded-lg shadow-2xl"><i class="fa-regular fa-thumbs-up"></i></button>
   <button onclick="adoptModal(this)" class="btn bg-white text-[#0E7A81] px-4 py-2 rounded-lg">Adopt</button>
   <button onclick="loadPetsDetails('${pet.petId}')" class="btn bg-white text-[#0E7A81] px-4 py-2 rounded-lg">Details</button>
  </div>
  `



  petContainers.appendChild(div);
 })
}


// adopt button functionality
const adoptModal= event =>{
 let count = 3
 const countContainer = document.getElementById('countdown-container')
 countContainer.innerText = count
 my_modal_4.showModal ()
 const interval = setInterval (() => {
  count--
  if(count !== 0) countContainer.innerText = count
  if(count<1){
   clearInterval(interval)
   my_modal_4.close ()
   event.textContent = 'Adopted'
   event.disabled = true
  }
 }, 1000)
}

loadCategories();
loadAllPets();
