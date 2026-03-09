const LoadingSpinner = document.getElementById("LoadingSpinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

loadCardDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayCardDetails(details.data);
};

const displayCardDetails = (status) => {
  // console.log(status);
  const detailsBox = document.getElementById("modalContainer");
  const displayBox = document.getElementById("displayBox");
  displayBox.innerHTML = `
               <div id="displayBox" class=" rounded-xl">
          <h1 class="font-bold mb-2">${status.title}</h1>
          <div class="flex gap-3">
          <p class="bg-green-700 rounded-3xl p-1 px-2 text-white">${status.status}</p>
          <p class="text-[#64748B]">.${status.author}</p>
          <p class="text-[#64748B]">.${status.createdAt}</p>
        </div>
        <div class="flex gap-3">
           <button class="border-2 border-red-300 text-red-500 rounded-2xl  p-1 bg-red-100"><i class="fa-solid fa-bug gap-2"></i>${status.type}</button>
           <button class="border-2 border-yellow-300 text-yellow-500 rounded-2xl p-1 bg-yellow-100"><i class="fa-regular fa-life-ring"></i>${status.helpWanted}</button>
        </div>
        <div>
          <p class="text-[#64748B] mt-5">${status.description}</p>
        </div>
        <div class="flex gap-6 mb-3">
          <div >
            <p>Assignee:</p>
            <h3 class="font bold text-2xl">${status.assignee || "Unassigned"}</h3>
          </div>
          <div>
            <p>Priority:</p>
            <h3 class="font bold p-2 bg-amber-400 rounded-2xl">${status.priority}</h3>
          </div>
        </div>
      </h1>
      <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
    </div>
  `;
  detailsBox.showModal();
};

const loadCards = () => {
  const cardsContainer = document.getElementById("card-container");

  cardsContainer.classList.add("hidden");

  LoadingSpinner.classList.remove("hidden");
  LoadingSpinner.classList.add("flex");

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      displayCards(data.data);

      LoadingSpinner.classList.add("hidden");
      cardsContainer.classList.remove("hidden");
    });
};

const displayCards = (cards) => {
  const cardsContainer = document.getElementById("card-container");
  cardsContainer.innerHTML = "";

  for (let card of cards) {
    const cardDiv = document.createElement("div");

    cardDiv.innerHTML = `
           <div onclick="loadCardDetails(${card.id})"  class="shadow-gray-300 shadow-md rounded-box p-3 ">
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

document.getElementById("open-btn").addEventListener("click", () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const openCards = data.data.filter((card) => card.status === "open");
      displayCards(openCards);
    });
});
document.getElementById("closed-btn").addEventListener("click", () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const closedCards = data.data.filter((card) => card.status === "closed");
      displayCards(closedCards);
    });
});

loadCards();

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.toLowerCase().trim().toLowerCase();

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      displayCards(data.data);
    });
});
