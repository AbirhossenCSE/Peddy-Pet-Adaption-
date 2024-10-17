const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
}
loadCategories();

// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }

const loasPets = () => {
    alert('Abir')
    // setTimeout(function () {
    //     loadCategoryPets()
    // }, 3000)
    
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) => {
        console.log(item);

        const buttonContainer = document.createElement('button');
        buttonContainer.innerHTML = `
            <button id="category-btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="btn category-btn px-10">
               ${item.category}
            </button>
        `

        // add button at category container
        categoriesContainer.appendChild(buttonContainer);
        
    }); 
    
}

// Active button
const removeActiveClass = ()=> {
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
}

// try to load spinner
// Load categories pets
const loadCategoryPets = (category) => {
    // Show the spinner
    document.getElementById('loading-spinner').classList.remove('hidden');
    document.getElementById('pets').classList.add('hidden');

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            // Delay hiding the spinner and showing the pets
            setTimeout(() => {
                // Hide the spinner after 2 seconds
                document.getElementById('loading-spinner').classList.add('hidden');
                document.getElementById('pets').classList.remove('hidden');

                // Active class remove
                removeActiveClass();

                // Active class add
                const activeBtn = document.getElementById(`category-btn-${category}`);
                activeBtn.classList.add("active");

                // Display pets data
                displayPets(data.data);
            }, 2000); // 2000ms = 2 seconds
        })
        .catch((err) => {
            console.log(err);
            // Hide the spinner if an error occurs after 2 seconds
            setTimeout(() => {
                document.getElementById('loading-spinner').classList.add('hidden');
                document.getElementById('pets').classList.remove('hidden');
            }, 2000);
        });
};



const loadPets = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets?title=${searchText}`)
    .then((res) => res.json())
    // .then((data) => console.log(data.categories))
    .then((data) => displayPets(data.pets))
    .catch((err) => console.log(err));
}




const displayPets = (pets) => {
    const petContainer = document.getElementById('pets')
    petContainer.innerHTML = "";

    // No data
    if (pets.length == 0) {
        petContainer.classList.remove("grid")
        petContainer.innerHTML = `
            <div class=" min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
                <img src="./images/error.webp" />
                <h2 class=" text-center text-xl font-bold">No Information Available</h2>
            </div>
        `;
    }
    else{
        petContainer.classList.add("grid")
    }

    pets.forEach((pet) => {
        console.log(pet);
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="">
                <img
                src= ${pet.image} class="h-full w-full object-cover" alt="Shoes" />

                
                
            </figure>
            <div class="px-0 py-2 w-full">
                
                <div>
                    <h2 class="font-bold">${pet.pet_name}</h2>
                    <div class="items-center gap-2">
                        <p class="text-gray-400">Bread: ${pet.breed}</p>
                        <p class="text-gray-400">Birth Date: ${pet.date_of_birth}</p>
                        <p class="text-gray-400">Gender: ${pet.gender}</p>
                        <p class="text-gray-400">Price: ${pet.price}</p>
                    
                    </div>
                    <div class="flex justify-between items-center w-full p-3">
                        
                        <button class="btn btn-sm btn-error">Details</button>
                        <button onclick="adoptPets()" class="btn btn-sm btn-error mx-auto">Adopt</button>
                        <button onclick="loadDetails(${pet.petId})" class="btn btn-sm btn-error">Details</button>
                    </div>
                </div>
            </div>
        `;
        petContainer.append(card)
        
    })
    
}

const loadDetails = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData);
    adoptPets(data.petData);

    
}

const displayDetails = (petData) => {
    console.log(petData);
    const detailContainer = document.getElementById('modal-content');
    detailContainer.innerHTML = `
        <img class="w-full" src=${petData.image} />
        <div class="px-0 py-2 w-full">
            <div class="text-black ">
                <h2 class="font-bold text-black text-2xl">${petData.pet_name}</h2>
                <div class="items-center gap-2">
                    <p class="text-gray-400">Bread: ${petData.breed}</p>
                    <p class="text-gray-400">Birth Date: ${petData.date_of_birth}</p>
                    <p class="text-gray-400">Gender: ${petData.gender}</p>
                    <p class="text-gray-400">Price: ${petData.price}</p>
                </div>
            </div>
        </div>
        <p><span class="font-bold text-black">Details Information</span> <br> ${petData.pet_details}</p>
    `;
    
    document.getElementById('customModal').showModal();
}

// Adopt pets
const adoptPets = () => {
    const modalCheckbox = document.getElementById('my_modal_6');
    const countdownText = document.getElementById('countdownText');
    let countdown = 3;

    modalCheckbox.checked = true;

    const intervalId = setInterval(() => {
    countdownText.innerText = `${countdown}`;
    countdown--;

    if (countdown < 0) {
        clearInterval(intervalId);
        modalCheckbox.checked = false;
    }
    }, 1000); 
}



loadPets();