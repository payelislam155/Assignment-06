    const loadCategorys = () => {
        fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
        };
        const loadCategorysCard = async (Id) => {
             const url= `https://openapi.programming-hero.com/api/peddy/category/${Id}`
             const res = await fetch(url);
             const data = await res.json();
             displayCards(data.data);
        };

        const displayCategories = (categories) => {
        const categoryContainer = document.getElementById("catagories");
        categories.forEach((item) => {
        // Create a card div for each category
        const card = document.createElement("div");
        card.classList = "flex items-center relative border rounded-lg active:rounded-full active:border-2 active:border-green-400 active:bg-green-200 active:duration-200 active:delay-10 ease-out px-4 m-2";

        // Create a button 
        const button = document.createElement("button");
        button.classList = `flex gap-2 items-center px-16 py-3 font-bold text-2xl`;
        button.innerHTML = `<img class="size-10" src="${item.category_icon}"/>${item.category}`;
        button.onclick = ()=> {
             lodingButton(categories)
             setTimeout(() => {
                loadCategorysCard(item.category);
             }, 5000); 
        };

        // Add the card
        categoryContainer.appendChild(card);
        card.appendChild(button);
    });
};

const lodingButton = (categories) => {
    console.log(categories);
     
};

const loadcardsCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(response => response.json())
        .then(response => displayCards(response.pets))
        .catch(error => console.log(error));
};

    const displayCards = (pets) => {
    const cardContainer = document.getElementById("CardsPets");
    cardContainer.classList.add("w-[836px]")
        
        // Clear previous content
        cardContainer.innerHTML = '';
    
        pets.forEach((pet) => {
            // Create a card div
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
                       <button onclick="displayAdoptsShows('${pet.petId}')" class="border border-gray-300 text-green-800 font-semibold p-2 rounded-lg">Adopt</button>
                       <button onclick="loadDetailsCard('${pet.petId}')" class="border border-gray-300 text-green-800 font-semibold p-2 rounded-lg">Details</button>
                    </div>
                </div>
            `;
            // Add the card to the container
            cardContainer.appendChild(card);
        });
    };
            //  like button works
    const loadLike = ((imgItem) => {
        const likeButton = document.getElementById('likeButton');
        const like = document.createElement('div');
        like.classList.add('w-full','p-1',)
        like.innerHTML = `
              <img class="w-full rounded-lg" src="${imgItem}"}"/>
        `;
        likeButton.appendChild(like);
    });
    
                    //   adobt moldal timer
    // const displayAdoptsShows= (pets) => {
    //     console.log(pets);
    //     // document.getElementById("customModalAdopt").showModal();
    
    //     const modalAdoptContent = document.getElementById("modal-adopt-content");
    //     modalAdoptContent.innerHTML = `
    //         <img class="w-40 mx-auto" src="https://img.icons8.com/?size=60&id=bj0330D9m8Sv&format=png" />
    //         <p class="text-center text-4xl my-3 font-bold">Congratulations</p>
    //         <p class="text-center lg:text-xl text-sm text-gray-600 my-3 font-semibold">Adoption Process is Started For Your Pet</p>
    //         <h1 id="count-btn" class="text-5xl text-center"></h1>
    //     `;
    //     document.getElementById("customModalAdopt").close();
    //     let count = 4; // Set the countdown timer
    //     const counter = setInterval(function() {
    //         count--;
    //         document.getElementById('count-btn').innerText = count;
    //         if (count <= 0) {
    //             clearInterval(counter);
    //          // Close the modal when countdown reaches zero
    //             console.log(count);
    //         }
    //     }, 1000); // Count down every second
    // };

loadCategorys();
loadcardsCatagories();


