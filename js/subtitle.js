function getRandomGreeting() {
  var greetings = [
    "67",
    "Sourced locally and all fresh!",
    "Make sure ClassWize isn't open!",
    "#freedress",
  ];
  var randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}

document.getElementById("subtitle").innerText = getRandomGreeting();