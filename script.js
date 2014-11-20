window.onload = function(){
    var storage = chrome.storage.local;
    var dobInput = document.getElementById("dob");
    var sqDiv = document.getElementById('squares');  
    var status = false;
    var dreamInput = document.getElementById('dream');

    var start = function(){
        document.getElementById('start').style.display = "static";
    }

    var fillSquare = function(sq){        
        while(sq > 0) {
            sqDiv.appendChild(document.createElement('div'));
            sq--;
        }
    }

    var removeAllSquares = function(){
        while(sqDiv.getElementsByTagName("div").length){
            sqDiv.removeChild(sqDiv.getElementsByTagName("div")[0]);
        }
    }

    var showDream = function(dream){
        document.getElementsByTagName('h1')[0].innerHTML = dream;
        drawDifference();
        document.getElementById('start').style.display = 'none';
    }

    var getDream = function(){
        storage.get('dream', function(result){
            if(result.dream){
                showDream(result.dream);
            } else {
                start();
            }
        });
    }

    var drawDifference = function(){
        removeAllSquares();
        storage.get('dob', function(result){
            console.log(result);
            if(result.dob){
                dobInput.value = result.dob;
                var difference = parseInt((new Date() - new Date(result.dob))/(24*60*60*1000));
                fillSquare(difference);
                document.getElementById('days').innerHTML = difference;
            }
        });        
    }

    dreamInput.addEventListener('input', function(){
        var dream = {'dream': dreamInput.value}

        storage.set(dream, function(){
            showDream();
        });
    });

    dobInput.addEventListener('input', function(){
        var dob = {'dob': dobInput.value}

        storage.set(dob, function(){          
            drawDifference();
        });
    });

    var init = function(){
        getDream();
    }

    init();
}
