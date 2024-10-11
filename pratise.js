const loadCategorys = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
};
const loadCategorysCard = async (Id) => {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${Id}`;
    console.log(Id);
    const res = await fetch(url);
    const data = await res.json();
    displayCards(data.data);
};

// Display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("catagories");
    let lastClickedButton = null; 

    categories.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("flex", "items-center", "relative", "border", "rounded-lg", "px-4", "m-2");

        const button = document.createElement("button");
        button.classList.add("flex", "gap-2", "items-center", "px-16", "py-3", "font-bold", "text-2xl");
        button.innerHTML = `<img class="size-10" src="${item.category_icon}"/>${item.category}`;
        
        const btn = document.getElementById("loading-indicator");
        btn.classList.add('hidden');
        button.onclick = () => {
            if (lastClickedButton) {
                lastClickedButton.classList.remove('border-2','border-green-400','bg-green-100','rounded-full',); 
                const lastCard = lastClickedButton.parentElement;
                lastCard.classList.remove('border-none'); 
                lastCard.classList.add('border'); 
            }

            button.classList.add('border-2','border-green-400','bg-green-100','rounded-full',); 
            const currentCard = button.parentElement; 
            currentCard.classList.remove('border'); 
            currentCard.classList.add('border-none'); 

            const cardContainer = document.getElementById("allCardArea"); 
            cardContainer.classList.add('hidden'); 
            document.getElementById("loading-indicator").style.display = "block";
            setTimeout(() => {
                loadCategorysCard(item.category); 
                document.getElementById("loading-indicator").style.display = "none"; 
                cardContainer.classList.remove('hidden'); 
            }, 2000);
            lastClickedButton = button;
        };

        categoryContainer.appendChild(card);
        card.appendChild(button);
    });
};;

// Load all pet cards
const loadcardsCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(response => response.json())
    .then(response => displayCards(response.pets))
    .catch(error => console.log(error));
};

// Display pet cards
const displayCards = (pets) => {
    const cardContainer = document.getElementById("CardsPets");
    cardContainer.classList.add("w-[836px]")
        cardContainer.innerHTML = '';
        pets?.forEach((pet) => {
                    // Create All card section
            const card = document.createElement("div");
            card.classList.add("border", "p-2", "m-2","rounded-lg",);
            card.innerHTML = `
                <div class="px-0 space-y-2">
                    <figure class="relative">
                        <img class="w-full h-full object-cover rounded-lg" src="${pet.image}" alt="${pet.pet_name}"/>
                    </figure>
                    <h2 class="font-bold text-2xl">${pet.pet_name}</h2>
                    <p class="text-lg flex items-center gap-2"><span><img src="images/breed.png"/></span>Breed:${pet?.breed ? pet?.breed :'Normal Breed'}</p>
                    <p class="text-lg flex items-center gap-2"><span><img src="images/birth.png"/></span>Birth:${pet?.date_of_birth ? pet?.date_of_birth : 'Not Available'}</p>
                    <p class="text-lg flex items-center gap-2"><span><img src="images/gender.png"/></span>Gender:${pet?.gender == "Male" || pet?.gender == "Female" ? pet?.gender : 'Not Gender'}</p>
                    <p class="text-lg flex items-center gap-2"><span><img src="images/price.png"/></span>Price:${pet?.price !== null ? pet?.price : 'Not Mentioned'}</p>
                    <p class="border-t border-gray-300"></p>
                    <div class="flex items-center justify-between mb-10">
                       <button onclick="loadLike('${pet.image}')"><img class="border border-gray-300 p-2 rounded-lg" src="images/like.png"></button>
                       <button onclick="displayAdoptsShow('${pet.petId}')" class="border border-gray-300 text-green-800 font-semibold p-2 rounded-lg">Adopt</button>
                       <button onclick="loadDetailsCard('${pet.petId}')" class="border border-gray-300 text-green-800 font-semibold p-2 rounded-lg">Details</button>
                    </div>
                </div>
            `;
            cardContainer.appendChild(card);
        }); 
        const birdsCard = document.createElement('div');
        birdsCard.classList.add('flex', 'flex-wrap', 'justify-center', 'gap-8');
        birdsCard.innerHTML = `
        <div class="border border-gray-300 p-2 rounded-lg">
            <img class="w-full h-full object-cover" src="https://images.dog.ceo/breeds/parrot/n02115913_103.jpg" alt="Parrot">
        </div>
        <div class="border border-gray-300 p-2
        `;
        cardContainer.appendChild(birdsCard);
};

                    //details modal
const loadDetailsCard = (petId) => {
    console.log(petId)
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const pet = data.petData; 
            
            const modalContent = document.getElementById('modal-content');
            
            modalContent.innerHTML = `
            <div class="flex flex-col items-center">
                <img class="w-40 rounded-lg" src="${pet.image}" alt="${pet.pet_name}" />
                <h2 class="text-2xl font-bold mt-3">${pet.pet_name}</h2>
                <p class="text-lg">Breed: ${pet.breed ? pet.breed : 'Not Available'}</p>
                <p class="text-lg">Vaccinated: ${pet.vaccinated ? 'Yes' : 'No'}</p>
                <p class="text-lg">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'}</p>
                <p class="text-lg">Price: ${pet.price !== null ? pet.price : 'Not Mentioned'}</p>
            </div>
           `;
             document.getElementById("customModal").showModal();
        })
        .catch(error => console.error('Error fetching data:', error));
};
// Display Image like button
const loadLike = (imgItem) => {
    const likeButton = document.getElementById('likeButton');
    const like = document.createElement('div');
    like.classList.add('w-full', 'p-1');
    like.innerHTML = `<img class="w-full rounded-lg" src="${imgItem}"/>`;
    likeButton.appendChild(like);
};

// Display adoption modal
const displayAdoptsShow = (adopt) => {
    document.getElementById("customModalAdopt").showModal(); 
    const modalAdoptContent = document.getElementById('modal-adopt-content'); 
    modalAdoptContent.innerHTML = `
      <div class="h-40">
            <p class="text-center text-4xl my-3 font-bold">Congrats</p> 
            <p class="text-lg text-center text-gray-600 my-3 font-semibold">Adoption process is starting for your pet.</p>
            <h1 id="count-btn" class="text-5xl text-center"></h1>
      </div>
    `;
    let count = 4;
    const counter = setInterval(function() {
        count--;
        document.getElementById('count-btn').innerText = count;
        if(count <= 0) {
            clearInterval(counter);
            document.getElementById("customModalAdopt").close(); 
        }
    }, 1000);
};

// Sort pets by price (high to low)
const sortByPrice = async () => {
    const url3 = "https://openapi.programming-hero.com/api/peddy/pets";
    
    try {
        const res = await fetch(url3);
        const data = await res.json();
        const sortedPets = data.pets.sort((a, b) => b.price - a.price);
        displayCards(sortedPets);
    } catch (error) {
        console.error('Error sorting pets:', error);
    }
};
// Attach event listener to sort button
document.getElementById('sort-button').addEventListener('click', sortByPrice);
loadCategorys();
loadcardsCatagories();