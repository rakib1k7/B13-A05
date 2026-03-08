const LoadingSpinner = document.getElementById("LoadingSpinner");

const loadCards = () => {
  LoadingSpinner.classList.remove("hidden");
  LoadingSpinner.classList.add("flex");
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayCards(data.data));
    LoadingSpinner.classList.add("hidden");
};

const displayCards = (cards) => {
  const cardsContainer = document.getElementById("card-container");
  cardsContainer.innerHTML = "";

  for (let card of cards) {
    const cardDiv = document.createElement("div");

    cardDiv.innerHTML = `
           <div  class="shadow-gray-300 shadow-md rounded-box p-3">
          <!-- Issues will be dynamically added here -->
           <div class="flex h-full justify-between items-center">
            <img src="./assets/Open-Status.png" alt="">
            <button class="border-2 border-red-300 text-red-500 rounded-2xl  p-1 bg-red-100" >${card.priority}</button>
           </div>
          <h1>${card.title}</h1>
          <p>
            ${card.description}
          </p>
          <div>
            <button class="border-2 border-red-300 text-red-500 rounded-2xl  p-1 bg-red-100"><i class="fa-solid fa-bug gap-2"></i>Bug</button>
            <button class="border-2 border-yellow-300 text-yellow-500 rounded-2xl p-1 bg-yellow-100"><i class="fa-regular fa-life-ring"></i>help wanted</button>
          </div>
          <hr width="100%" class="my-3">
          <p>#${card.id} by ${card.author}</p>
          <p>${card.createdAt}</p>
        </div>
    `;

    cardsContainer.appendChild(cardDiv);
  }
};

loadCards();
