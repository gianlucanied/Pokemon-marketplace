const API_URL = "https://api.pokemontcg.io/v2/cards";
const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", () => {
    fetchCards(searchInput.value);
});



async function fetchCards(query = "") {
    let url = API_URL;
    if (query) {
        url += `?q=name:${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    displayCards(data.data);
}


function displayCards(cards) {
    cardContainer.innerHTML = "";
    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        let price = "N/A";
        if (card.tcgplayer && card.tcgplayer.prices) {
            const prices = card.tcgplayer.prices;
            price =
                prices.market ??
                prices.normal?.market ??
                prices.holofoil?.market ??
                prices.reverseHolofoil?.market ??
                "N/A";

            if (price !== "N/A") {
                price = `$${price.toFixed(2)}`;
            }
        }

        const expansion = card.set ? card.set.name : "Sconosciuta";

        cardElement.innerHTML = `
            <img src="${card.images.small}" alt="${card.name}" class="card-img">
            <h3>${card.name}</h3>
            <p><strong>Prezzo di mercato:</strong> ${price}</p>
            <p><strong>Espansione:</strong> ${expansion}</p> <!-- Mostra l'espansione -->
        `;

        cardContainer.appendChild(cardElement);
    });

    document.querySelectorAll(".card-img").forEach(img => {
        img.addEventListener("click", function () {
            document.getElementById("modal-img").src = this.src;
            document.getElementById("image-modal").style.display = "flex";
        });
    });

    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("image-modal").style.display = "none";
    });


    document.getElementById("image-modal").addEventListener("click", function (event) {
        if (event.target === this) {
            this.style.display = "none";
        }
    });
}



// searchInput.addEventListener("input", () => {
//     fetchCards(searchInput.value);
// });


fetchCards();
