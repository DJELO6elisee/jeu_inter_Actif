// Définition des questions du quiz sous forme d'un tableau d'objets
let questions = [
    { question: "Quelle est la capitale de la France?", reponses: ["Paris", "Londres", "Abidjan"], correcte: 0 },
    { question: "Combien font 2 + 2?", reponses: ["3", "4"], correcte: 1 },
    { question: "Quelle est la couleur du ciel par temps clair?", reponses: ["Bleu", "Vert", "rouge"], correcte: 0 },
    { question: "Elle est jolie?", reponses: ["Oui", "Pas du tout", "un peu"], correcte: 0 },
    { question: "Quel est le plus grand océan du monde?", reponses: ["Océan Atlantique", "Océan Pacifique"], correcte: 1 },
    { question: "Quel est le symbole chimique de l'eau?", reponses: ["H2O", "CO2"], correcte: 0 },
    { question: "Combien de continents y a-t-il sur Terre?", reponses: ["5", "7", "21"], correcte: 1 },
];

// Indice de la question actuelle et nombre de bonnes réponses
let questionActuelle = 0;
let reponsesCorrectes = 0;

// Définition des variables pour le minuteur
let tempsRestant = 30; // Temps alloué pour répondre aux questions
let interval; // Variable pour stocker l'intervalle du minuteur
const minuteurElement = document.getElementById("temps-restant"); // Élément HTML affichant le temps restant
const messageElement = document.getElementById("message"); // Élément HTML affichant un message à l'utilisateur
const bodyElement = document.body; // Élément <body> pour changer la couleur de fond

// Fonction pour démarrer le minuteur
function demarrerMinuteur() {
    interval = setInterval(() => {
        tempsRestant--; // Décrémente le temps restant
        minuteurElement.textContent = tempsRestant; // Met à jour l'affichage du minuteur

        // Changement de couleur du fond selon le temps restant
        if (tempsRestant > 15) {
            bodyElement.style.backgroundColor = "green";
        } else if (tempsRestant > 5) {
            bodyElement.style.backgroundColor = "yellow";
        } else if (tempsRestant > 0) {
            bodyElement.style.backgroundColor = "red";
        } else {
            clearInterval(interval); // Arrête le minuteur lorsque le temps est écoulé
            bodyElement.style.backgroundColor = "darkred";
            messageElement.textContent = "Game Over"; // Affiche "Game Over" à l'utilisateur
            messageElement.style.color = "white";
            // Désactive les boutons de réponse
            document.querySelectorAll(".answers button").forEach(btn => btn.disabled = true);
            afficherResultats(); // Affiche les résultats du quiz
        }
    }, 1000); // Exécute la fonction toutes les secondes
}

// Fonction pour arrêter le minuteur
function arreterMinuteur() {
    clearInterval(interval); // Arrête le minuteur
}

// Fonction pour charger une nouvelle question
function chargerQuestion() {
    if (questionActuelle < questions.length) { // Vérifie s'il reste des questions
        document.getElementById("question").textContent = questions[questionActuelle].question; // Affiche la question
        const divReponses = document.getElementById("reponses");
        divReponses.innerHTML = ""; // Vide la zone des réponses précédentes

        // Génère les boutons de réponse dynamiquement
        questions[questionActuelle].reponses.forEach((reponse, index) => {
            const bouton = document.createElement("button"); // Crée un bouton pour chaque réponse
            bouton.textContent = reponse; // Définit le texte du bouton
            bouton.onclick = () => verifierReponse(index, bouton); // Ajoute un événement onclick pour vérifier la réponse
            divReponses.appendChild(bouton); // Ajoute le bouton à la zone des réponses
        });
    } else {
        arreterMinuteur(); // Arrête le minuteur si toutes les questions sont répondues
        afficherResultats(); // Affiche les résultats finaux
    }
}

// Fonction pour vérifier si la réponse est correcte
function verifierReponse(index, bouton) {
    const indexCorrect = questions[questionActuelle].correcte; // Récupère l'index de la réponse correcte
    document.querySelectorAll(".answers button").forEach(btn => btn.disabled = true); // Désactive tous les boutons

    if (index === indexCorrect) {
        bouton.classList.add("correct"); // Ajoute une classe pour marquer la bonne réponse
        reponsesCorrectes++; // Incrémente le nombre de réponses correctes
    } else {
        bouton.classList.add("wrong"); // Marque la réponse comme incorrecte
    }

    setTimeout(() => {
        questionActuelle++; // Passe à la question suivante
        chargerQuestion(); // Charge la question suivante
    }, 1000); // Attend une seconde avant de changer la question
}

// Fonction pour afficher les résultats à la fin du quiz
function afficherResultats() {
    const total = questions.length; // Nombre total de questions
    const tauxReussite = (reponsesCorrectes / total) * 100; // Calcul du pourcentage de réussite
    document.getElementById("conteneur-quiz").style.display = "none"; // Cache l'interface du quiz

    if (tauxReussite >= 50) {
        bodyElement.style.backgroundColor = "blue";
        document.getElementById("resultat").textContent = `Gagné ! ✅ (${tauxReussite.toFixed(1)}% correct)`;
        document.getElementById("message").textContent = "Félicitations, vous avez réussi !";
        document.getElementById("message").style.color = "white";
        bodyElement.classList.add("victoire");
    } else {
        bodyElement.style.backgroundColor = "darkred";
        document.getElementById("resultat").textContent = `Perdu ! ❌ (${tauxReussite.toFixed(1)}% correct)`;
        document.getElementById("message").textContent = "Dommage, essayez encore !";
        document.getElementById("message").style.color = "white";
        bodyElement.classList.add("defaite");
    }
}

// Démarrer le quiz en chargeant la première question et en lançant le minuteur
chargerQuestion();
demarrerMinuteur();
