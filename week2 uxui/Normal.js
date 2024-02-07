const gobacktoindex = () => {
    window.location.href = "index.html"
}

var randomNumber = generateRandomNumber();
var usedNumbers = [];

function generateRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}

function handleInput(event) {
    var inputElement = document.getElementById("textInput");
    var inputValue = inputElement.value;

    // Enforce length restriction
    if (inputValue.length > 2) {
        inputElement.value = inputValue.slice(0, 2);
    }
}

function handleEnter(event) {
    if (event.key === "Enter") {
        var inputElement = document.getElementById("textInput");
        var inputValue = parseInt(inputElement.value, 10);

        if (isNaN(inputValue)) {
            alert("Please enter a valid number.");
        } else {
            // Check if the entered value is in the usedNumbers array
            if (usedNumbers.includes(inputValue)) {
                alert("You've already guessed " + inputValue + ". Try a different number.");
                return; // Exit the function if the entered value is already used
            }

            if (inputValue === randomNumber) {
                alert("Congratulations! You guessed the correct number: " + inputValue);
                // Reload the current page
                location.reload();

                // Update the content and color of the next available SVG element
                var nextDisplayTextId = getNextDisplayTextId();
                var displayTextElement = document.getElementById(nextDisplayTextId);

                if (displayTextElement) {
                    displayTextElement.textContent = inputValue;

                    // Change fill color to #1CED25 if inputValue === randomNumber
                    var circleElement = displayTextElement.parentNode;
                    var ellipseElement = circleElement.getElementsByTagName("ellipse")[0];
                    ellipseElement.setAttribute("fill", "#1CED25");

                    // Add the used number to the array
                    usedNumbers.push(inputValue);
                }
            } else {
                alert("Sorry, the number was not correct");

                // Update the content of the next available SVG element
                var nextDisplayTextId = getNextDisplayTextId();
                var displayTextElement = document.getElementById(nextDisplayTextId);

                if (displayTextElement) {
                    // Show 'x' for all previous display texts
                    for (var i = 1; i < nextDisplayTextId.slice(-1); i++) {
                        var textElement = document.getElementById("displayText" + i);
                        if (textElement) {
                            textElement.textContent = 'x';
                            var circleElement = textElement.parentNode;
                            var ellipseElement = circleElement.getElementsByTagName("ellipse")[0];
                            ellipseElement.setAttribute("fill", "#FF0000");
                        }
                    }

                    // Show the input value for the last display text
                    displayTextElement.textContent = inputValue;

                    // Change fill color to #FF0000
                    var circleElement = displayTextElement.parentNode;
                    var ellipseElement = circleElement.getElementsByTagName("ellipse")[0];
                    ellipseElement.setAttribute("fill", "#FF0000");

                    // Display warning message based on the relation between inputValue and randomNumber
                    var warningTextElement = document.getElementById("warningtext");
                    console.log("Debug: inputValue =", inputValue, "randomNumber =", randomNumber);

                    if (inputValue < randomNumber) {
                        warningTextElement.textContent = "Your Number is Smaller";
                    } else if (inputValue > randomNumber) {
                        warningTextElement.textContent = "Your Number is Bigger";
                    }

                    // Add the used number to the array
                    usedNumbers.push(inputValue);
                }
            }

            // Reset the input value
            inputElement.value = "";
        }
    }
}

function getNextDisplayTextId() {
    var displayTextIndex = parseInt(document.getElementById("textInput").getAttribute("data-display-index") || 0, 10);
    var nextDisplayTextIndex = (displayTextIndex % 10) + 1;

    // Update the data-display-index attribute
    document.getElementById("textInput").setAttribute("data-display-index", nextDisplayTextIndex);

    // Check if it's the first input value
    if (nextDisplayTextIndex === 10) {
        alert("Nice try! Try again next time."); // Alert when all display texts have been used
        // Reload the current page
        location.reload();
    }
    return "displayText" + nextDisplayTextIndex;
}
