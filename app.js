//drfine the currency selectors
const amount = document.querySelector('#amount');
const to_currency = document.querySelector('#destination');
const from_currency = document.querySelector('#base');
const convert_btn = document.querySelector('#convert');
const answer = document.querySelector('#answer');


//check for service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => 'SW registration failed'));
} 



window.addEventListener('load', async function(){
    //populate the select with currencies
    currency();
})

convert_btn.addEventListener('click', async function(){
    //alert(amount.value)
   convertCurrency(amount.value, from_currency.value, to_currency.value)
})

async function currency() {
    const request = await fetch(`https://free.currencyconverterapi.com/api/v5/currencies`);
    let response = await request.json();
   // console.log(request.results);
   //lop through the returned json, and inject it in the select 
    for (key in response.results) {
        from_currency.innerHTML = from_currency.innerHTML + (`<option value="${response.results[key].id}">${response.results[key].currencyName}</option>`);
        to_currency.innerHTML = to_currency.innerHTML + (`<option value="${response.results[key].id}">${response.results[key].currencyName}</option>`);
        // console.log(apps.results[key].currencyName)

    }

}


async function convertCurrency(amount, fromCurrency, toCurrency) {

    
  
        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        let query = fromCurrency + '_' + toCurrency;
        let value= "";

        const request = await fetch('https://free.currencyconverterapi.com/api/v5/convert?q=' + query + '&compact=ultra');
        let response = await request.json();
        for(key in response){
            
             value = response[key]
        }
       
        let total = value * amount;
        total = (Math.round(total * 100) / 100);
        //console.log(total);
        answer.value = total;
                  
}
