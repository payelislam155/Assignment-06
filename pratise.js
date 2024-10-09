const loadCategorys = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then(response => response.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error));
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
        button.innerHTML = `<img class="size-10" src="${item.category_icon}"/> ${item.category}`;
        
        // Add an onclick event with a delay and loading indicator
        button.onclick = () => {
            // Show loading indicator
            const loadingIndicator = document.getElementById("loadingIndicator");
            loadingIndicator.style.display = "block";

            setTimeout(() => {
                loadCategorysCard(item.category)
                    .then(() => {
                        // Hide loading indicator once done
                        loadingIndicator.style.display = "none";
                        console.log("Category loaded");
                    })
                    .catch(err => {
                        console.error("Error loading category:", err);
                        loadingIndicator.style.display = "none"; // Hide on error as well
                    });
            }, 5000); // 5000 milliseconds = 5 seconds
        };

        // Append the button to the card
        card.appendChild(button);
        // Add the card to the category container
        categoryContainer.appendChild(card);
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

// Clear previous content
cardContainer.innerHTML = '';

pets.forEach((pet) => {
  
  // Create a card div
  const card = document.createElement("div");
  card.classList.add("border", "p-4", "m-2","rounded-lg");

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
             <button onclick="loadLike('${pet.petId}')"><img class="border border-gray-300 p-2 rounded-lg" src="images/like.png"></button>
             <button onclick="loadAdopt('${pet.petId}')" class="border border-gray-300 text-green-800 font-semibold p-2 rounded-lg">Adopt</button>
             <button onclick="loadDetailsCard('${pet.petId}')" class="border border-gray-300 text-green-800 font-semibold p-2 rounded-lg">Details</button>
          </div>
      </div>
  `;
  // Add the card to the container
  cardContainer.appendChild(card);
});
};

// {/* <p>${pet.pet_details}</p> */}

loadCategorys();
loadcardsCatagories();


//----------------------------------------------------------------------------------------------------

// const loading = () => {
//     document.getElementById('spinner').classList.add("hidden");
//     document.getElementById('all-pets').classList.remove("hidden");
//     document.getElementById('sort-pet').classList.remove("hidden");
//     document.getElementById('display-all-pet-container').classList.remove("hidden");
//     // document.getElementById("customModalAdopt").classList.add("hidden");
//   };
  
//   let loadAllPetCategories = () => {
//     document.getElementById('spinner').classList.remove("hidden");
//     document.getElementById("display-all-pet-container").classList.add("hidden");
//     document.getElementById('all-pets').classList.add("hidden");
//     setTimeout(function() {
//       loading();
//     }, 2000);
  
//     // Fetch the data
//     fetch("https://openapi.programming-hero.com/api/peddy/categories")
//       .then(res => res.json())
//       .then(data => loadDisplayAllPetCategories(data.categories))
//       .catch(error => console.error(error));
//   };

//   let loadAllPetShows = () => {
//     fetch("https://openapi.programming-hero.com/api/peddy/pets")
//       .then(res => res.json())
//       .then(data => loadDisplayAllPetsshow(data.pets))
//       .catch(error => console.error(error));
//   };
  
//   const displayAdoptsShow = (adopt) => {
//     console.log(adopt);
//     document.getElementById("customModalAdopt").showModal();
//     const modalAdoptContent = document.getElementById('modal-adopt-content');
//     modalAdoptContent.innerHTML = `
//       <img class="w-40 mx-auto" src="https://img.icons8.com/?size=60&id=bj030009m8Sv&format=png" />
//       <p class="text-center text-4xl my-3 font-bold">Congrates</p>
//       <p class="text-lg text-gray-600 my-3 font-semibold">Adoption Process is Start For Your Pet</p>
//       <h1 id="count-btn" class="text-5xl text-center"></h1>
//     `;
//     let count = 4;
//     const counter = setInterval(function() {
//       count--;
//       document.getElementById('count-btn').innerText = count;
//       if(count <= 0) {
//         clearInterval(counter);
//         // document.getElementById("customModalAdopt").close();
//       }
//       console.log(count);
//     }, 1000);
//   };


//   const loadDisplayAdopt = async (id) => {
//     document.getElementById('customModalAdopt').classList.remove("hidden");
//     setTimeout(function() {
//       loading();
//     }, 3000);
  
//     const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displayAdoptsShow(data);
//   };
  
//   const displayAdoptsShow = (adopt) => {
//     console.log(adopt);
//     let count = 4;
//     const counter = setInterval(function() {
//       count--;
//       if (count <= 0) {
//         clearInterval(counter);
//         console.log(count);
//       }
//     }, 1000);
  
//     const modalAdoptContent = document.getElementById('modal-adopt-content');
//     modalAdoptContent.innerHTML = `
//       <img class="w-40 mx-auto" src="https://img.icons8.com/?size=60&id=bj03J0D9m8Sv&format=png" />
//       <p class="text-center text-4xl my-3 font-bold">Congrates</p>
//       <p class="text-center lg:text-xl text-sm text-gray-600 my-3 font-semibold">Adoption Process is Start For Your Pet</p>
//       <h1 class="text-5xl text-center">${count}</h1>
//     `;
//     document.getElementById("customModalAdopt").showModal();
//   };

//   displayAdoptsShow()