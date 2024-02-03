function addFlashcard() {
    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;

    if (question && answer) {
        var flashcardContainer = document.getElementById("flashcardsContainer");

        var flashcard = document.createElement("div");
        flashcard.className = "flashcard";
        flashcard.innerHTML = "<strong>Question:</strong> " + question + "<br><strong>Answer:</strong> <span class='hidden'>" + answer + "</span>";

        // Add click event to reveal the answer
        flashcard.addEventListener("click", function() {
            var answerSpan = this.querySelector("span");
            answerSpan.classList.toggle("hidden");
        });

        flashcardContainer.appendChild(flashcard);

        // Clear input fields
        document.getElementById("question").value = "";
        document.getElementById("answer").value = "";
    } else {
        alert("Please fill out both question and answer fields.");
    }
}
