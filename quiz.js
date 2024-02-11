function startquiz() {
    const quizstart = document.querySelector('.instructions');
    quizstart.style.display = "block";
}

function exitquiz() {
    const quizexit = document.querySelector('.instructions');
    quizexit.style.display = "none";
}


document.querySelector('.continue').addEventListener('click', function () {
    document.querySelector('.instructions').style.display = "none";
    document.querySelector('.quiz-app').style.display = "block";
    showQuestions(0);
});

let qsncount = 0;
document.querySelector('.next').addEventListener('click', () => {

    if(qsncount < questions.length-1) {
        qsncount++;
        showQuestions(qsncount);
    } else {
        document.querySelector('.quiz-app').style.display = "none";
        document.querySelector('.result').style.display = "block";
        resultpage();
    }
    
});

function showQuestions(index) {

    const qsn = document.querySelector('.question');
    let modifiedqsn = '<span>' + (index+1) + '.' + questions[index].question + '</span>';
    qsn.innerHTML = modifiedqsn;


    const optionlist = document.querySelector('.options-list');
    let option = '<div class="options"><span>'+ questions[index].options[0] +'</span></div>'
            + '<div class="options"><span>'+ questions[index].options[1] +'</span></div>'
            + '<div class="options"><span>'+ questions[index].options[2] +'</span></div>'
            + '<div class="options"><span>'+ questions[index].options[3] +'</span></div>'

    optionlist.innerHTML = option;

    const Alloptions = document.querySelectorAll('.options');

    for(let i=0;i<Alloptions.length;i++) {
        Alloptions[i].setAttribute("onclick","selected(this)");
    }

    document.querySelector('.next').style.display = "none ";

}

let tickicon = '<div class="icon-true"><i class="fa fa-check"></i></div>';
let wrongicon = '<div class="icon-false"><i class="fa fa-close"></i></div>';

let userscore = 0;

function selected(answer) {
    let ansselected = answer.textContent;
    let correctans = questions[qsncount].answer;

    if(ansselected == correctans) {
        userscore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickicon);
    } else {
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend",wrongicon);
    }

    let childoptions = document.querySelector('.options-list').children.length;

    for(let i=0;i<childoptions;i++) {
        document.querySelector('.options-list').children[i].style.pointerEvents = "none";
    }

    document.querySelector('.next').style.display = "block";
    if(qsncount == questions.length-1) {
        document.querySelector('.next').textContent = 'Submit';
    }
}

function resultpage() {
    let report = "";
    if(userscore >= 3) {
        report += "Congrats !";
    }
    else {
        report += "Oops !";
        document.querySelector('.result-icon').innerHTML = '<span>&#10071;</span>';
    }

    document.querySelector('.quiz-score').textContent = `${report} You scored ${userscore} off 5`;
}

document.querySelector('.quit').addEventListener('click', () => {
    window.location.reload();
});