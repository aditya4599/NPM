const portfolio = [

  { ticker: "AAPL", shares: 10 },

  { ticker: "MSFT", shares: 5 },

  { ticker: "NVDA", shares: 3 },

  { ticker: "TSLA", shares: 8 },
  {ticker: "FAKE", shares: 2}
];
function fetchPrice(ticker) {
    return new Promise((resolve, reject) => {
        const delay= 300+ Math.random() * 500; // Random delay between 300ms and 800ms
        setTimeout(() => {
            const stock=portfolio.find(item => item.ticker === ticker);
            if (ticker === "FAKE" || !stock) {
                reject(new Error(`Ticker ${ticker} not found in portfolio`));
            }
            else{
                const price = 100 + Math.random() * 400;// Random price between 0 and 1000
                resolve(price);
            }
        }, delay);
    });
}
async function fetchpaprices(){
    console.time("seq");
    let total=0
    try{
    for (const stock of portfolio){
        const price=await fetchPrice(stock.ticker);
        console.log(`Price of ${stock.ticker}: $${price.toFixed(2)}`);
        total+=price*stock.shares;
    }
}
catch (error) {
    console.log("Error fetching prices:");

}

console.log(`Total Portfolio Value: $${total.toFixed(2)}`);
console.timeEnd("seq");
}
fetchpaprices();

async function fetchPricesParallel() {
    console.time("parallel");
    const price= await Promise.all(portfolio.map(stock => fetchPrice(stock.ticker)));
    let total=0;
    try{
    price.forEach((price, index) => {
        const stock=portfolio[index];
        console.log(`Price of ${stock.ticker}: $${price.toFixed(2)}`);
        total+=price*stock.shares;
    });
}
catch (error) {
    console.log("Error fetching prices:");

}
    console.log(`Total Portfolio Value: $${total.toFixed(2)}`);
    console.timeEnd("parallel");
}
fetchPricesParallel(); 