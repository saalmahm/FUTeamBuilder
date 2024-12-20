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
    const formationSelect = document.getElementById("select");
    let selectedPosition = null;
    const selectedPlayers = new Set();

    formationSelect.addEventListener("change", (event) => {
        updateFormation(event.target.value);
    });

    plusImages.forEach(img => {
        img.addEventListener("click", function () {
            const parentContainer = this.closest('.player-container, .card-container');
            selectedPosition = parentContainer ? parentContainer.id : null;
            modal.style.display = "flex";
            loadPlayers(selectedPosition);
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

    playerForm.addEventListener("submit", function (e) {
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

                const availablePlayers = data.filter(player => !selectedPlayers.has(player.name));

                const filteredData = position.includes("container") ? availablePlayers.filter(player => player.position === position.split('-')[0]) : availablePlayers;
                filteredData.forEach(player => {
                    const playerCard = document.createElement("div");
                    playerCard.classList.add("player-card");
                    playerCard.innerHTML = `
                        <img src="${player.photo}" alt="${player.name}">
                        <div>
                            <h3>${player.name}</h3>
                            <p><strong>Position:</strong> ${player.position}</p>
                            <p><strong>Score:</strong> ${player.rating}</p>
                            <p><strong>Pace:</strong> ${player.pace}</p>
                            <p><strong>Shooting:</strong> ${player.shooting}</p>
                            <p><strong>Passing:</strong> ${player.passing}</p>
                            <p><strong>Dribbling:</strong> ${player.dribbling}</p>
                            <p><strong>Defending:</strong> ${player.defending}</p>
                            <p><strong>Physical:</strong> ${player.physical}</p>
                        </div>
                    `;
                    playerCard.addEventListener("click", function () {
                        selectPlayer(player);
                        modal.style.display = "none";
                    });
                    modalContent.appendChild(playerCard);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des données :", error));
    }

    function selectPlayer(player) {
        if (selectedPosition) {
            const container = document.getElementById(selectedPosition);
            const plusImage = container.querySelector('.plus');
            if (plusImage) {
                plusImage.src = player.photo;
                plusImage.classList.toggle("player-image");

                let deleteButton = container.querySelector(".delete-player-button");
                if (!deleteButton) {
                    deleteButton = document.createElement("button");
                    deleteButton.innerText = "X";
                    deleteButton.classList.add("delete-player-button");
                    deleteButton.addEventListener("click", function () {
                        plusImage.src = "images/plus.png";
                        plusImage.classList.remove("player-image");
                        container.removeChild(deleteButton);
                        selectedPlayers.delete(player.name);
                    });
                    container.appendChild(deleteButton);
                }
                selectedPlayers.add(player.name);
            }
        }
    }

    function updateFormation(formation) {
        const positions = {
            "442": {
                "GK-container": { top: "470px", left: "45%" },
                "CB1-container": { top: "380px", left: "29%" },
                "CB2-container": { top: "380px", left: "60%" },
                "LB-container": { top: "380px", left: "8%" },
                "RB-container": { top: "380px", left: "80%" },
                "CM1-container": { top: "190px", left: "29%" },
                "CM2-container": { top: "190px", left: "60%" },
                "CM3-container": { top: "190px", left: "80%" },
                "LW-container": { top: "190px", left: "7%" },
                "RW-container": { top: "0px", left: "60%" },
                "ST-container": { top: "0px", left: "29%" }
            },
            "433": {
                "GK-container": { top: "470px", left: "45%" },
                "CB1-container": { top: "380px", left: "29%" },
                "CB2-container": { top: "380px", left: "60%" },
                "LB-container": { top: "380px", left: "8%" },
                "RB-container": { top: "380px", left: "80%" },
                "CM1-container": { top: "220px", left: "45%" },
                "CM2-container": { top: "220px", left: "20%" },
                "CM3-container": { top: "220px", left: "70%" },
                "LW-container": { top: "35px", left: "20%" },
                "RW-container": { top: "35px", left: "70%" },
                "ST-container": { top: "35px", left: "45%" }
            }
        };

        const formationPositions = positions[formation];
        if (formationPositions) {
            for (const [id, pos] of Object.entries(formationPositions)) {
                const container = document.getElementById(id);
                if (container) {
                    container.style.top = pos.top;
                    container.style.left = pos.left;
                }
            }
        }
    }
    // initialiser la formation 4-4-2 par defaut
    updateFormation("442");
});
