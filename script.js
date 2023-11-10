const menuSession = document.getElementById("initial-Menu");
const questionsSession = document.getElementById("questions");
const btnStart = document.getElementById("btnStart");
const resultsSession = document.getElementById("results");
let rightOption = 0;

fetch('./quiz-api.json')
    .then((response) => response.json())
    .then((data) => renderData(data));


function renderData(data) {
    /*
    A For-Loop to create all the questions with all the answers 
    */
    for (let i = 0; i < 50; i++) {
        let question = document.createElement("p");
        let answers = document.createElement("div");
        question.innerHTML = (i+1) + "-) " + data.results[i].question;
        question.className = "perguntas";
        questionsSession.appendChild(question);
        for (let j = 0; j < 4; j++) {
            let newId = data.results[i].all_answers[j];
            newId = newId.replace(/\s+/g, '');
            newId = newId.replaceAll(",", "");
            answers.innerHTML += "<p class='opcao'><input type='radio' name='resposta' id='" +newId+  "' value='" + data.results[i].all_answers[j] +"'> <label for='" + newId + "'>" + data.results[i].all_answers[j] + "</label></p>";
            answers.className = "respostas";
        }
        questionsSession.appendChild(answers);
    }

    let correct_answers = [];
    for (let i = 0; i < 50; i++) {
        correct_answers.push(data.results[i].correct_answer)
    }
    let perguntas = document.getElementsByClassName("perguntas");
    let respostas = document.getElementsByClassName("respostas");
    let radios = document.getElementsByTagName("input");
    let options = document.getElementsByClassName("opcao");
    
    btnStart.addEventListener("click", function () {
        menuSession.style.display = "none";
        questionsSession.style.display = "block";
        for (let i = 1; i < perguntas.length; i++) {
            perguntas[i].style.display = "none";
            respostas[i].style.display = "none";
        }
    })

    let numQuestion = 1;
    let numQuestionBefore = 0;
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener("click", function() {
            if (correct_answers.includes(radios[i].value)) {
                rightOption++;
                options[i].style.backgroundColor = "#ADEAA9";

            }else{
                options[i].style.backgroundColor = "#EAA9A9";
            }
            setTimeout(function() {
                if (numQuestion <= 49) {
                    console.log(numQuestion)
                    perguntas[numQuestionBefore].style.display = "none";
                    respostas[numQuestionBefore].style.display = "none";
                    perguntas[numQuestion].style.display = "block";
                    respostas[numQuestion].style.display = "block";
                    numQuestion++;
                    numQuestionBefore++;
                }else{
                    const text = document.getElementById('text');
                    const textResult = document.getElementById('numCorrectAnswers');
                    textResult.textContent = rightOption;
                    if (rightOption >= 40) {
                        text.innerHTML = "Congratulations! You did amazing!"
                    }else if (rightOption < 20) {
                        text.innerHTML = "Oh, don't worry! Next luck next time."
                    }else {
                        text.innerHTML = "You were good!"
                    }
                    questionsSession.style.display = "none";
                    resultsSession.style.display = "block";
                }
                
            }
            , 1000)
        })
        
    }

}



