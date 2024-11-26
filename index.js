document.addEventListener("DOMContentLoaded", () => {
    const plusImages = document.querySelectorAll(".player-container .plus, .chang .plus");
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const addPlayerModal = document.querySelector(".add-player-modal");
    const button = document.querySelector(".btn");
    const ajoutButton = document.getElementById("ajout");
    const teamNameInput = document.getElementById("teamName");
    const teamNameDisplay = document.getElementById("teamNameDisplay");
    const closeAddModalButton = document.querySelector(".close-add-modal");
    const playerForm = document.getElementById("playerForm");

    plusImages.forEach(img => {
        img.addEventListener("click", function() {
            const parentClass = this.closest('.player-container') ? 'player-container' : 'chang';
            const position = parentClass === 'player-container' ? this.previousElementSibling.id : null;
            modal.style.display = "flex";
            loadPlayers(position);
        });
    });

    button.addEventListener("click", () => {
        const val = teamNameInput.value;
        teamNameDisplay.textContent = val;
    });

    ajoutButton.addEventListener("click", () => {
        addPlayerModal.style.display = "flex"; 
    });

    closeAddModalButton.addEventListener("click", () => {
        addPlayerModal.style.display = "none"; 
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    addPlayerModal.addEventListener("click", (e) => {
        if (e.target === addPlayerModal) {
            addPlayerModal.style.display = "none";
        }
    });

    playerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const newPlayer = {
            name: document.getElementById("playerName").value,
            photo: document.getElementById("playerPhoto").value,
            position: document.getElementById("playerPosition").value,
            nationality: document.getElementById("playerNationality").value,
            flag: document.getElementById("playerFlag").value,
            club: document.getElementById("playerClub").value,
            logo: document.getElementById("playerLogo").value,
            rating: document.getElementById("playerRating").value,
            pace: document.getElementById("playerPace").value,
            shooting: document.getElementById("playerShooting").value,
            passing: document.getElementById("playerPassing").value,
            dribbling: document.getElementById("playerDribbling").value,
            defending: document.getElementById("playerDefending").value,
            physical: document.getElementById("playerPhysical").value
        };

        fetch("http://localhost:3000/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayer)
        })
        .then(response => response.json())
        .then(data => {
            addPlayerModal.style.display = "none";
            alert("Le joueur a été ajouté avec succès!");
        })
        .catch(error => console.error("Erreur lors de l'ajout du joueur :", error));
    });

    function loadPlayers(position) {
        fetch("http://localhost:3000/players")
            .then(response => response.json())
            .then(data => {
                modalContent.innerHTML = ""; 
                const filteredData = position ? data.filter(player => player.position === position) : data;
                filteredData.forEach(player => {
                    const playerCard = document.createElement("div");
                    playerCard.classList.add("player-card");
                    playerCard.innerHTML = `
                        <img src="${player.photo}" alt="${player.name}">
                        <div>
                            <h3>${player.name}</h3>
                            <p>Position: ${player.position}</p>
                            <p>Score: ${player.rating}</p>

                           
                        </div>
                    `;
                    modalContent.appendChild(playerCard);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des données :", error));
    }
});
