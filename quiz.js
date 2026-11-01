const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    {
        question: "Which language is used to structure web pages?",
        options: ["CSS", "HTML", "Python", "Java"],
        correctAnswer: 2
    },
    {
        question: "Which keyword is used to declare a variable that can change?",
        options: ["const", "let", "static", "final"],
        correctAnswer: 2
    },
    {
        question: "Which array method adds an item to the end of an array?",
        options: ["pop()", "shift()", "push()", "slice()"],
        correctAnswer: 3
    },
    {
        question: "Which operator checks both value and data type?",
        options: ["=", "==", "===", "!="],
        correctAnswer: 3
    },
    {
        question: "Which array method creates a new array from existing elements?",
        options: ["filter()", "map()", "push()", "pop()"],
        correctAnswer: 2
    }
];

let score = 0;
const timeLimit = 15;

function getAnswer(message) {
    return new Promise((resolve) => {
        rl.question(message, (answer) => {
            resolve(answer.trim());
        });
    });
}

function displayWelcome() {
    console.log("\n=================================");
    console.log("       WELCOME TO TRIVIA!");
    console.log("=================================");
    console.log("Test your JavaScript knowledge.");
    console.log("You have 15 seconds for each question.");
    console.log("Choose your answer by entering 1, 2, 3 or 4.");
    console.log("=================================\n");
}

async function askQuestion(question, questionNumber) {
    console.log(`\nQuestion ${questionNumber}:`);
    console.log(question.question);

    const options = question.options.map((option, index) => {
    return `${index + 1}. ${option}`;
    });

options.forEach((option) => console.log(option));

    return new Promise((resolve) => {
        let answered = false;

        const timer = setTimeout(() => {
            if (!answered) {
                answered = true;
                console.log("\nTime is up!");
                resolve(null);
            }
        }, timeLimit * 1000);

        rl.question("Your answer: ", (answer) => {
            if (!answered) {
                answered = true;
                clearTimeout(timer);
                resolve(answer.trim());
            }
        });
    });
}

async function startQuiz() {
    score = 0;
    const startTime = Date.now();

    console.log("\nLet's begin!\n");

    for (let i = 0; i < questions.length; i++) {
        const answer = await askQuestion(questions[i], i + 1);

        if (answer === null) {
            console.log("You missed this question.");
        } else if (!["1", "2", "3", "4"].includes(answer)) {
            console.log("Invalid answer. This question will be marked incorrect.");
        } else if (Number(answer) === questions[i].correctAnswer) {
            console.log("Correct! Well done.");
            score++;
        } else {
            console.log("Wrong answer!");
            console.log(`The correct answer was ${questions[i].options[questions[i].correctAnswer - 1]}.`);
        }

        console.log(`Your score: ${score}/${i + 1}`);
    }

    const endTime = Date.now();
    const totalTime = Math.floor((endTime - startTime) / 1000);
    const percentage = Math.round((score / questions.length) * 100);

    console.log("\n=================================");
    console.log("             RESULTS");
    console.log("=================================");
    console.log(`Your final score: ${score}/${questions.length}`);
    console.log(`Your percentage: ${percentage}%`);
    console.log(`Time taken: ${totalTime} seconds`);

    if (percentage >= 80) {
        console.log("Excellent work!");
    } else if (percentage >= 50) {
        console.log("Good effort! Keep practising.");
    } else {
        console.log("Keep practising. You will improve!");
    }

    console.log("=================================\n");

    const choice = await getAnswer("Would you like to play again? (yes/no): ");

    if (choice.toLowerCase() === "yes" || choice.toLowerCase() === "y") {
        await startQuiz();
    } else {
        console.log("\nThank you for playing. Goodbye!");
        rl.close();
    }
}

async function main() {
    displayWelcome();

    const choice = await getAnswer("Type START to play or EXIT to quit: ");

    if (choice.toLowerCase() === "start") {
        await startQuiz();
    } else {
        console.log("Goodbye!");
        rl.close();
    }
}

main();