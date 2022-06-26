//Все варианты ответов
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

//Все наши ответы
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');//сам вопрос

const numberOfQuestion = document.getElementById('number-of-question');//номер вопроса
const numberOfAllQuestions = document.getElementById('number-of-all-questions');//кол-во всех вопросов

let indexOfQuestion,//индекс текущего вопроса
    indexOfPage = 0;//индекс стр

const answersTracker = document.getElementById('answers-tracker');//обертка для трекера
const btnNext = document.getElementById('btn-next');

let score = 0;//итоговый результат векторины
const correctAnswer = document.getElementById('correct-answer'),//кол-во правильных ответов
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),//кол-во всех вопросов в модальном окне
    btnTryAgain = document.getElementById('btn-try-again');//кнопка начать викторину занаво

const questions = [
    {
        question: 'Как в JS вычислить процент от числа?',
        options: [
            'Так в JS нельзя сделать',
            'Оператоор : %',
            'Умножить на количество процентов и  разделить на 100',
            'Вызвать метод findPrecent()'
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error'
        ],
        rightAnswer: 1
    },
    {
        question: 'На JS нельзя писать: ',
        options: [
            'Игры',
            'Скрипты для сайтов',
            'Десктопные приложения',
            'Плохо'
        ],
        rightAnswer: 3
    }
];

numberOfAllQuestions.innerHTML = questions.length;//выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;//отображение вопроса на странице
    //мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;//Установка номера текущей страницы
    indexOfPage++;//увеличения индекса страницы
};

let completedAnswers = [];//массив для уже заданных вопосов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;//якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate == true) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion();
        enableOptions();
    }
};

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click',tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});