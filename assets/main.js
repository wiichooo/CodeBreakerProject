let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(attempt.value == '' || answer.value == ''){
        setHiddenFields();
    }

    if(!validateInput(input.value)){
        return false;
    }else{
        attempt.value++;
    }
    if(getResults(input.value.toString())){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }else if(attempt.value >=10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }else{
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields(){
    answer.value = (Math.floor(Math.random() * (9999 - 0)) + 0).toString();
    let a = 0;
    
    while(answer.value.length < 4){
        answer.value = '0' + answer.value;
    }
    attempt.value = 0;
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function validateInput(input){
    if(input.length == 4){
        return true;
    }else{
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input){
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    let correct = 0;
    for(let i = 0; i < input.length; i++){
        if(input.charAt(i) == answer.value.charAt(i)){
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        }else if(answer.value.includes(input.charAt(i))){
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        }else{
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</di>';
    document.getElementById('results').innerHTML += html;

    if(correct == 4)
        return true;
    else
        return false;
}

function showAnswer(result){
    document.getElementById('code').innerHTML = answer.value;
    if(result){
        document.getElementById('code').classList.add('success');
        
    }else{
        document.getElementById('code').classList.add('failure');
    }
}

function showReplay(){
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}