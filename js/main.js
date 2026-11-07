// Assignment 3: Interactive Blacksmith — The Tiny Forge

// PSEUDOCODE PLAN:
// Add heat button:
//   - read the input value and convert it to a number
//   - if empty, 0, negative, decimal, or not a finite number -> show a message, change nothing
//   - otherwise call heatForge(amount) (which caps heat at 100 and updates the page)
// Make sword button:
//   - call makeSword() (it checks for 30 heat and shows a success or error message)
// Reset forge button:
//   - call resetForge() (heat 20, swords 0, clear input and message, update the page)
// On page load:
//   - call resetForge() so the page starts in the same state every time

// 1. Select the page elements.

const forge = document.getElementById("forge");
const heatValue = document.getElementById("heat-value");
const swordCount = document.getElementById("sword-count");
const forgeStatus = document.getElementById("forge-status");
const forgeImage = document.getElementById("forge-image");
const actionMessage = document.getElementById("action-message");

// New elements for the controls
const heatInput = document.getElementById("heat-input");
const addHeatBtn = document.getElementById("add-heat-btn");
const makeSwordBtn = document.getElementById("make-sword-btn");
const resetBtn = document.getElementById("reset-btn");

// 2. Create the two state variables.

let heat = 20;
let swordsMade = 0;

// 3. Choose the forge status based on heat.

function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return "Too cold";
  } else if (heatValue < 70) {
    return "Ready to forge";
  } else {
    return "Roaring fire";
  }
}

// 4. Update everything displayed on the page.

function updateForge() {
  // Update heat and sword count
  heatValue.textContent = heat;
  swordCount.textContent = swordsMade;

  // Get and display the current status
  const status = getForgeStatus(heat);
  forgeStatus.textContent = status;

  // Remove old status classes
  forge.classList.remove("is-cold", "is-ready", "is-roaring");

  // Update class, image, and alt text
  if (status === "Too cold") {
    forge.classList.add("is-cold");
    forgeImage.src = "assets/forge-cold.svg";
    forgeImage.alt = "A stone forge with dark coals and no flames";
  } else if (status === "Ready to forge") {
    forge.classList.add("is-ready");
    forgeImage.src = "assets/forge-ready.svg";
    forgeImage.alt = "A stone forge with a small orange fire";
  } else {
    forge.classList.add("is-roaring");
    forgeImage.src = "assets/forge-roaring.svg";
    forgeImage.alt = "A stone forge with tall bright flames and sparks";
  }

  // Do NOT change actionMessage here.
  // This keeps the most recent action message visible.
}

// 5. Reset the forge.

function resetForge() {
  heat = 20;
  swordsMade = 0;

  // Assignment 3: clear the input and leave the message empty
  heatInput.value = "";
  actionMessage.textContent = "";

  updateForge();
}

// 6. Add heat to the forge.

function heatForge(amount) {
  heat += amount;

  // Maximum heat is 100
  if (heat > 100) {
    heat = 100;
  }

  actionMessage.textContent = `The forge was heated by ${amount}.`;

  updateForge();
}

// 7. Make one sword.

function makeSword() {
  if (heat >= 30) {
    heat -= 30;
    swordsMade++;

    actionMessage.textContent = "Sword successfully forged!";
  } else {
    actionMessage.textContent = "Not enough heat to make a sword! You need at least 30 heat.";
  }

  updateForge();
}

// 8. Connect the controls with event listeners.

addHeatBtn.addEventListener("click", function () {
  const text = heatInput.value.trim();   // what the player typed
  const amount = Number(text);           // convert text to a number

  // Reject empty, 0, negative, decimal, or non-finite values
  if (text === "" || !Number.isFinite(amount) || !Number.isInteger(amount) || amount <= 0) {
    actionMessage.textContent = "Please enter a positive whole number (1 or more).";
    return; // stop here: heat and swords stay unchanged
  }

  heatForge(amount);
  heatInput.value = "";
});

makeSwordBtn.addEventListener("click", function () {
  makeSword();
});

resetBtn.addEventListener("click", function () {
  resetForge();
});

// 9. Start the game.

resetForge();