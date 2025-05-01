let health = 100;
let morale = 100;
let resources = 50;
let enemyHealth = 30;
let enemyAttackDamage = 10;

const healthElem = document.getElementById("health");
const moraleElem = document.getElementById("morale");
const resourcesElem = document.getElementById("resources");
const enemyStatusElem = document.getElementById("enemy-status");
const logElem = document.getElementById("log-message");

// Update stats display
function updateStats() {
    healthElem.innerText = health;
    moraleElem.innerText = morale;
    resourcesElem.innerText = resources;
}

// Log messages to the player
function logMessage(message) {
    logElem.innerText = message;
}

// Gather resources
function gatherResources() {
    if (morale < 20) {
        logMessage("Morale is too low to gather resources. People are too tired.");
        return;
    }
    
    let gathered = Math.floor(Math.random() * 10) + 5; // Random resources between 5 and 15
    resources += gathered;
    morale -= 10; // Gathering depletes morale

    logMessage(`Gathered ${gathered} resources.`);
    updateStats();
}

// Build shelter
function buildShelter() {
    if (resources < 20) {
        logMessage("Not enough resources to build shelter.");
        return;
    }

    let shelterBuilt = Math.floor(Math.random() * 5) + 1; // Random health boost between 1 and 5
    resources -= 20;
    health += shelterBuilt;
    morale += 5; // Building boosts morale

    logMessage(`Built a shelter, increasing health by ${shelterBuilt}.`);
    updateStats();
}

// Rest
function rest() {
    if (morale >= 100) {
        logMessage("Morale is already at its maximum.");
        return;
    }

    morale += 20; // Resting boosts morale
    logMessage("The workers are resting and morale is increasing.");
    updateStats();
}

// Enemy mechanics
function spawnEnemy() {
    // Every 25 seconds, an enemy will spawn and attack the player
    enemyHealth = 30;  // Reset enemy health when they spawn
    enemyStatusElem.innerText = "An enemy has arrived! Health: " + enemyHealth;
    logMessage("An enemy has appeared! Prepare to fight!");

    // Start the enemy's attack loop
    let enemyAttackInterval = setInterval(() => {
        if (enemyHealth <= 0) {
            clearInterval(enemyAttackInterval);
            enemyStatusElem.innerText = "No enemy present";
            logMessage("You have defeated the enemy!");
            return;
        }

        // Enemy attacks, reduce player health
        health -= enemyAttackDamage;
        logMessage(`The enemy attacked you! You lost ${enemyAttackDamage} health.`);
        updateStats();

        if (health <= 0) {
            clearInterval(enemyAttackInterval);
            logMessage("You have been defeated! Game over.");
        }
    }, 3000);  // Enemy attacks every 3 seconds
}

// Fight back
function fightEnemy() {
    if (enemyHealth > 0) {
        let damageDealt = Math.floor(Math.random() * 15) + 10; // Random damage between 10 and 25
        enemyHealth -= damageDealt;

        logMessage(`You attacked the enemy! You dealt ${damageDealt} damage.`);

        if (enemyHealth <= 0) {
            enemyStatusElem.innerText = "No enemy present";
            logMessage("You have defeated the enemy!");
        } else {
            enemyStatusElem.innerText = "Enemy Health: " + enemyHealth;
        }
    } else {
        logMessage("No enemy to fight!");
    }
}

// Initial setup
updateStats();
setInterval(spawnEnemy, 25000); // Spawn an enemy every 25 seconds
