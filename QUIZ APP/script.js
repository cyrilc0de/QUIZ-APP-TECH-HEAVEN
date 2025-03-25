 const quizData = [
            { question: "Which tag is used to create a line break in HTML?", options: ["<ol>", "<hr>", "<p>", "<br>"], answer: "<br>" },
            { question: "What tag is used to create a <form> in HTML?", options: ["<img>", "<input>", "<form>", "<textarea>"], answer: "<form>" },
            { question: "What tag is used to define a table header?", options: ["<head>", "<th>", "<heading>", "<header>"], answer: "<th>" }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let userAnswers = [];

        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");
        const scoreElement = document.getElementById("score");
        const resultElement = document.getElementById("result");

        function loadQuestion() {
            const currentQuestion = quizData[currentQuestionIndex];
            questionElement.innerText = currentQuestion.question;
            optionsElement.innerHTML = "";
            
            currentQuestion.options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option;
                button.classList.add("option-btn");
                button.onclick = () => selectAnswer(option);
                optionsElement.appendChild(button);
            });
        }

        function selectAnswer(selectedOption) {
            userAnswers[currentQuestionIndex] = selectedOption;
            if (selectedOption === quizData[currentQuestionIndex].answer) {
                score++;
            }
            updateScore();
        }

        function updateScore() {
            scoreElement.innerText = `Score: ${score}`;
        }

        function nextQuestion() {
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults();
            }
        }

        function prevQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                loadQuestion();
            }
        }

        function showResults() {
            resultElement.innerHTML = "<h3>Quiz Results:</h3>";
            quizData.forEach((q, index) => {
                const resultText = document.createElement("p");
                resultText.innerHTML = `${q.question} <br> Your Answer: ${userAnswers[index] || "No answer"} <br> Correct Answer: ${q.answer}`;
                resultElement.appendChild(resultText);
            });
            resultElement.innerHTML += `<h4>Final Score: ${score}/${quizData.length}</h4>`;
        }

        document.getElementById("next-btn").addEventListener("click", nextQuestion);
        document.getElementById("prev-btn").addEventListener("click", prevQuestion);

        loadQuestion();