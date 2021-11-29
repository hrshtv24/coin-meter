
$(document).ready(async function(){
    let url = 'https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=410ac1faa58c9dce544c';
    let response1 = await fetch(url);
    let data1 = await response1.json();
    let rate = data1.USD_INR;
    var card = document.querySelector('.array-of-coins');
    fetch('http://127.0.0.1:5000/getcoins?coins=5',{
        method: 'GET',
    }).then(function(response){
        return response.json();
    }).then(async function(data) {
        for(let i=0; i<data.length; i++){
            let element = data[i];
            let coinData = document.createElement('div');
            coinData.setAttribute('class', 'coin-data');
            let coindataHead = document.createElement('div');
            coindataHead.setAttribute('class', 'coin-data-head');
            let coinName = document.createElement('div');
            coinName.setAttribute('class', 'coin-name');
            coinName.innerHTML = element.name +" "+element.symbol;
            let currentSituation = document.createElement('div');
            currentSituation.setAttribute('class', 'current-situation');
            let icon = document.createElement('i');
            if(Number.parseFloat(element.change)<0){
                icon.setAttribute('class', 'fas fa-arrow-down');
                currentSituation.style.color = 'red';
            } else {
                icon.setAttribute('class', 'fas fa-arrow-up');
                currentSituation.style.color = 'green';
            }
            let h3 = document.createElement('h3');
            h3.innerHTML = element.change;
            currentSituation.appendChild(icon);
            currentSituation.appendChild(h3);
            coindataHead.appendChild(coinName);
            coindataHead.appendChild(currentSituation);
            let priceData = document.createElement('div');
            priceData.setAttribute('class', 'price-data');
            priceData.style.color = element.color;
            priceData.innerHTML = "&#8377;" + (Number.parseFloat(element.price) * rate);
            let symbolImg = document.createElement('img');
            symbolImg.setAttribute('class', 'symbol-icon');
            symbolImg.setAttribute('src', element.iconUrl);
            coinData.appendChild(symbolImg);    
            coinData.appendChild(coindataHead);
            coinData.appendChild(priceData);
            card.appendChild(coinData);
            if(i!=data.length-1){
                let divider = document.createElement('div');
                divider.setAttribute('class', 'line-separator');
                card.appendChild(divider);
            }
        }
    });
});