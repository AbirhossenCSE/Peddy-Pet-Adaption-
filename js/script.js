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
              <img class=" w-6" src="${item.category_icon}" alt="">  ${item.category}
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
            }, 2000);
        })
        .catch((err) => {
            console.log(err);
            setTimeout(() => {
                document.getElementById('loading-spinner').classList.add('hidden');
                document.getElementById('pets').classList.remove('hidden');
            }, 2000);
        });
};





let allPets = [];

// Fetch and load pets from API
const loadPets = () => {
    document.getElementById('loading-spinner').classList.remove('hidden');
    document.getElementById('pets').classList.add('hidden');

    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())

    .then((data) => {
        setTimeout(() => {
            // Hide the spinner after 2 seconds
            document.getElementById('loading-spinner').classList.add('hidden');
            document.getElementById('pets').classList.remove('hidden');

            // Display pets data
            allPets = data.pets;
            displayPets(allPets);

        }, 2000);
    })
    .catch((err) => console.log(err));
};

// // Display pets
const displayPets = (pets, sortByPrice = false) => {
    const petContainer = document.getElementById('pets');
    petContainer.innerHTML = "";

    // Sort pets by price
    if (sortByPrice) {
        pets.sort((a, b) => b.price - a.price);
    }

    // No data
    if (pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
            <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
                <img src="./images/error.webp" />
                <h2 class="text-center text-xl font-bold">No Information Available</h2>
            </div>
        `;
    } else {
        petContainer.classList.add("grid");
    }

    pets.forEach((pet) => {
        // Use conditional check for null values
        const breed = pet.breed ? pet.breed : "Unavailable";
        const birthDate = pet.date_of_birth ? pet.date_of_birth : "Unavailable";
        const gender = pet.gender ? pet.gender : "Unavailable";
        const price = pet.price ? pet.price : "Unavailable";
        
        const card = document.createElement('div');
        card.classList = "card card-compact p-2";
        card.innerHTML = `
            <figure class="">
                <img src=${pet.image} class="h-full w-full object-cover " alt="Pet" />
            </figure>
            <div class="px-0 py-2 w-full">
                <div>
                    <h2 class="font-bold text-xl pl-2">${pet.pet_name}</h2>
                    <div class="items-center gap-2">
                        <p class="text-gray-500 pl-2">Breed: ${breed}</p>
                        <p class="text-gray-500 pl-2">Birth Date: ${birthDate}</p>
                        <p class="text-gray-500 pl-2">Gender: ${gender}</p>
                        <p class="text-gray-500 pl-2">Price: ${price}</p>
                    </div>
                    <div class="flex justify-between items-center w-full p-3">
                        <button onclick="like('${pet.image}')" class="btn btn-sm text-[#0E7A81]">
                            <img src="https://img.icons8.com/?size=40&id=82788&format=png&color=000000" class="h-full w-full p-1 object-cover" alt="Like">
                        </button>
                        <button onclick="adoptPets()" class="btn btn-sm text-[#0E7A81] mx-auto">Adopt</button>
                        <button onclick="loadDetails(${pet.petId})" class="btn btn-sm text-[#0E7A81]">Details</button>
                    </div>
                </div>
            </div>
        `;
        petContainer.append(card);
    });
};


// Event listener for sorting by price
document.getElementById('sort-btn').addEventListener('click', () => {
    displayPets(allPets, true);
});


loadPets();



// // Liked pet


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
                <div class="items-center lg:flex lg:gap-8 ">
                    <div>
                        <p class="text-gray-400"><i class="fa-solid fa-passport h-1 pr-1 pt-2"></i> Bread: ${petData.breed}</p>
                        <p class="text-gray-400 flex space-x-1"><i class="fa-solid fa-venus h-1 pr-1 pt-2"></i> Gender: ${petData.gender}</p>
                        <p class="text-gray-400"><i class="fa-solid fa-virus h-1 pr-1 pt-2"></i> vaccinated_status: ${petData.vaccinated_status}</p>
                    </div>
                    <div>
                        <p class="text-gray-400"><i class="fa-regular fa-calendar"></i h-1 pr-1 pt-2> Birth: ${petData.date_of_birth}</p>
                        <p class="text-gray-400">$ Price: ${petData.price}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex w-full flex-col">
            <div class="divider"></div>
        </div>
        <p class="text-justify "><span class="font-extrabold text-black">Details Information</span> <br> ${petData.pet_details}</p>
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

// handle like pet
const like = imgUrl => {
    const imageContainer = document.getElementById('liked-button');
    const div = document.createElement('div');
    div.innerHTML = `<img src="${imgUrl}"/>`;
    imageContainer.appendChild(div);
    
}