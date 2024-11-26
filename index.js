document.addEventListener("DOMContentLoaded", () => {
    const plusImages = document.querySelectorAll(".player-container .plus");
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const button = document.querySelector(".btn");
    const teamNameInput = document.getElementById("teamName");
    const teamNameDisplay = document.getElementById("teamNameDisplay");

    plusImages.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "flex";  
            loadPlayers();
        });
    });

    button.addEventListener("click", () => {
        const val = teamNameInput.value;
        teamNameDisplay.textContent = val;
    });

    function loadPlayers() {
        fetch("http://localhost:3000/players")
            .then(response => response.json())
            .then(data => {
                modalContent.innerHTML = ""; // Clear previous content
                data.forEach(player => {
                    const playerCard = document.createElement("div");
                    playerCard.classList.add("player-card");
                    playerCard.innerHTML = `
                        <img src="${player.photo}" alt="${player.name}">
                        <div>
                            <h3>${player.name}</h3>
                            <p>Position: ${player.position}</p>
                            <p>Club: <img src="${player.logo}" alt="${player.club}" style="width: 20px; vertical-align: middle;"> ${player.club}</p>
                            <p>Nationalité: <img src="${player.flag}" alt="${player.nationality}" style="width: 20px; vertical-align: middle;"> ${player.nationality}</p>
                            <p>Note: ${player.rating}</p>
                            <p>Vitesse: ${player.pace}, Tir: ${player.shooting}, Passes: ${player.passing}, Dribbles: ${player.dribbling}, Défense: ${player.defending}, Physique: ${player.physical}</p>
                        </div>
                    `;
                    modalContent.appendChild(playerCard);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des données :", error));
    }
});
