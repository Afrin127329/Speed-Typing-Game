const url = 'http://api.quotable.io/random';

let timer = document.getElementById("timer");
let displayedQuotes = document.getElementById("quote-display");
let textInput = document.getElementById("textarea");

textInput.addEventListener('input', ()=> {
    const arrayQuote = displayedQuotes.querySelectorAll('span');
    const arrayValue = textInput.value.split('');
    let correct = true;

    arrayQuote.forEach((characterSpan, index)=> {
        const character = arrayValue[index]
        if (character == null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }
        else{
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })

    if (correct) getNextQuote();
})

async function getRandomQuote(){
    const response = await fetch(url);
    const data = await response.json();
    return data.content;
}

async function getNextQuote (){
    const quote = await getRandomQuote();
    displayedQuotes.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        displayedQuotes.appendChild(characterSpan);
    });
    textInput.value = null;
    starTimer();

}

let startTime
function starTimer(){
    timer.innerText = 0;
    startTime = new Date();
    setInterval(()=>{
       timer.innerText = getTimerTime();
    }, 1000)

}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000);
}

getNextQuote();


