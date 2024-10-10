const loadCategorys = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
};

const loadCategorysCard = async (Id) => {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${Id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCards(data.data);
};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("catagories");
    categories.forEach((item) => {
        const card = document.createElement("div");
        card.classList = "flex items-center relative border rounded-lg active:rounded-full active:border-2 active:border-green-400 active:bg-green-200 active:duration-200 active:delay-10 ease-out px-4 m-2";

        const button = document.createElement("button");
        button.classList = `flex gap-2 items-center px-16 py-3 font-bold text-2xl`;
        button.innerHTML = `<img class="size-10" src="${item.category_icon}"/>${item.category}`;
        button.onclick = () => {
            document.getElementById("loading-indicator").style.display = "block";
            setTimeout(() => {
                loadCategorysCard(item.category);
                document.getElementById("loading-indicator").style.display = "none";
            }, 3000);
        };
        categoryContainer.appendChild(card);
        card.appendChild(button);
    });
};

const loadcardsCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(response => response.json())
        .then(response => displayCards(response.pets))
        .catch(error => console.log(error));
};

const displayCards = (pets) => {
    const cardContainer = document.getElementById("CardsPets");
    cardContainer.classList.add("w-[836px]");
    cardContainer.innerHTML = '';

    pets.forEach((pet) => {
        const card = document.createElement("div");
        card.classList.add("border", "p-2", "m-2", "rounded-lg");
        card.innerHTML = `
            <div class="px-0 space-y-2">
                <figure class="relative">
                    <img class="w-full h-full object-cover rounded-lg" src="${pet.image}" alt="${pet.pet_name}"/>
                </figure>
                <h2 class="font-bold text-2xl">${pet.pet_name}</h2>
                <p class="text-lg flex items-center gap-2">
                    <span><img src="images/breed.png"/></span>
                    Breed: ${pet?.breed ? pet?.breed :'Normal Breed'}
                </p>
                <p><span><img src="images/birth.png"/></span>Birth: ${pet?.date_of_birth || 'Not Available'}</p>
                <p><span><img src="images/gender.png"/></span>Gender: ${pet?.gender}</p>
                <p><span><img src="images/price.png"/></span>Price: ${pet?.price !== null ? pet?.price : 'Not Mentioned'}</p>
                <p class="border-t border-gray-300"></p>
                <div class="flex items-center justify-between mb-10">
                    <button onclick="loadLike('${pet.image}')">
                        <img class="border border-gray-300 p-2 rounded-lg" src="images/like.png">
                    </button>
                    <button onclick="displayAdoptsShow('${pet.petId}')" class="border border-gray-300 text-green-800 font-semibold p-2 rounded-lg">Adopt</button>
                    <button class="loadDetails border border-gray-300 text-green-800 font-semibold p-2 rounded-lg" 
                            data-pet='${encodeURIComponent(JSON.stringify(pet))}'>Details</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    // Add event listeners for 'Details' buttons after cards are appended
    document.querySelectorAll('.loadDetails').forEach(button => {
        button.addEventListener('click', function() {
            const pet = JSON.parse(decodeURIComponent(this.getAttribute('data-pet')));
            loadDetailsCard(pet); // Show modal with pet info
        });
    });
};

// Function to load details into the modal
const loadDetailsCard = (pet) => {
    const modal = document.getElementById("customModal");
    const modalContent = document.getElementById('modal-content');

    modal.showModal();
    modalContent.innerHTML = `
        <div class="text-center">
            <h2 class="font-bold text-2xl">${pet.pet_name}</h2>
            <figure class="relative">
                <img class="w-full h-full object-cover rounded-lg" src="${pet.image}" alt="${pet.pet_name}"/>
            </figure>
            <p class="text-lg"><strong>Breed:</strong> ${pet.breed ? pet.breed : 'No breed information'}</p>
            <p class="text-lg"><strong>Description:</strong> ${pet.pet_details ? pet.pet_details : 'No details available'}</p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    `;
};

// Initial calls to load data
loadCategorys();
loadcardsCatagories();