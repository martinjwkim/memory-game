let startBtn, restartBtn, faceDown, counter, gameCount

const cards=document.querySelectorAll(".card");

function startGame(){
    startBtn = document.getElementById("startBtn")

    if (document.getElementById("easy").checked===true){
        startBtn.style.display ="none"

    }
    if (document.getElementById("medium").checked===true){

    }
    if (document.getElementById("hard").checked===true){

    }
    if (!document.getElementById("easy").checked && 
    !document.getElementById("medium").checked && 
    !document.getElementById("hard").checked){
        alert("Please select a difficulty.")
    }
}

function init(){
    // document.getElementById('game-start-text').classList.remove('visible');

    startBtn=document.getElementById("startBtn")
    restartBtn=document.getElementById("restartBtn")
    faceDown=document.querySelectorAll(".face-down")
    faceUp=document.querySelectorAll(".face-up")
    counter=document.getElementById("flip-count")
    highScore=document.getElementById("high-score")
    overlays=Array.from(document.getElementsByClassName('overlay-text'))
    overlays.forEach(overlay=>{
        overlay.addEventListener('click',()=>{
            overlay.classList.remove('visible')
        })
    })

    cards.forEach(card=>card.classList.remove("flip"))
    cards.forEach(card=>card.removeEventListener('click',flipCard))
    cards.forEach(card=>card.addEventListener('click',flipCard))

    var count=0;
    gameCount=0
    counter.innerHTML=count
    let oneCardFlipped=false;
    let lockBoard=false;
    let firstCard=null
    let secondCard=null

    function flipCard(){
        if(lockBoard){
            return;
        }
        
        if(canFlipCard){
            this.classList.add('flip')

            if(!oneCardFlipped){
                firstCard=this;
                this.removeEventListener('click',flipCard)
                oneCardFlipped=true;
                count++
                counter.innerHTML=count
                return;
            }
            else{
                secondCard=this;
                oneCardFlipped=false;
                this.removeEventListener('click',flipCard)
                count++
                counter.innerHTML=count
                checkForMatch();
            }
        }

        function checkForMatch(){
            if(firstCard.dataset.card===secondCard.dataset.card){
                // firstCard.removeEventListener('click',flipCard)
                // secondCard.removeEventListener('click',flipCard)
                gameCount++
                console.log(gameCount);
            }
            if(!oneCardFlipped && firstCard.dataset.card!=secondCard.dataset.card){
                lockBoard=true;

                setTimeout(
                    ()=>{
                        firstCard.classList.remove("flip")
                        secondCard.classList.remove("flip")
                        firstCard.addEventListener('click',flipCard)
                        secondCard.addEventListener('click',flipCard)

                        lockBoard=false;
                    },1000
                )
            }
            if(gameCount===9){
                var highScoreCount=10000
                if(count<highScoreCount){
                    highScore.innerHTML=count
                    highScoreCount=count
                    count=0;
                }

                document.getElementById('you-win-text').classList.add('visible');
                document.getElementById('you-win-text').addEventListener('click',init);
            }  
        }

        function canFlipCard(){
            return true
        }
    }

    (function shuffle(){
        cards.forEach(card=>{
            let randomPosition=Math.floor(Math.random()*12)
            card.style.order=randomPosition
        })
    })();
}

init();