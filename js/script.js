const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
}

// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) => {
        console.log(item);

        const buttonContainer = document.createElement('button');
        buttonContainer.innerHTML = `
            <button id="category-btn-${item.id}" onclick="loadCategoryPets(${item.id})" class="btn category-btn">
               ${item.category}
            </button>
        `

        // add button at category container
        categoriesContainer.appendChild(buttonContainer);
        
    }); 
    
}



// Load categories pets
const loadCategoryPets = (category) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/cat`)
    .then((res) => res.json())
    .then((data1) => displayPets(data1.data))
    .catch((err) => console.log(err));
}


loadCategories();

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
                <img src="./assets/icon.png"/>
                <h2 class=" text-center text-xl font-bold">No Content Here</h2>
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
            <figure class="h-[200px] relative">
                <img
                src= ${pet.image} class="h-full w-full object-cover" alt="Shoes" />

                
                
            </figure>
            <div class="px-0 py-2 flex gap-2">
                
                <div>
                    <h2 class="font-bold">${pet.breed}</h2>
                    <div class="items-center gap-2">
                        <p class="text-gray-400">${'Birth Date', pet.date_of_birth}</p>
                        <p class="text-gray-400">${pet.gender}</p>
                        <p class="text-gray-400">${pet.price}</p>
                    
                    </div>
                    <p><button onclick="loadDetails('${pet.price}')" class=" btn btn-sm btn-error">Details</button></p>
                </div>
            </div>
        `;
        petContainer.append(card)
        
    })
    
}

loadPets();