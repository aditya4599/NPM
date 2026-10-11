const portfolio = [
  { ticker: "FAKE", shares: 2 },   // first on purpose: proves one failure doesn't kill the rest
  { ticker: "AAPL", shares: 10 },
  { ticker: "MSFT", shares: 5 },
  { ticker: "NVDA", shares: 3 },
  { ticker: "TSLA", shares: 8 },
];
const KNOWN_TICKERS = ["AAPL", "MSFT", "NVDA", "TSLA"];
function fetchPrice(ticker) {
    return new Promise((resolve, reject) => {
        const delay= 300+ Math.random() * 500; // Random delay between 300ms and 800ms
        setTimeout(() => {
            const stock=portfolio.find(item => item.ticker === ticker);
            if (!KNOWN_TICKERS.includes(ticker)) {
                reject(new Error(`Unknown ticker: ${ticker}`));
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

    for (const stock of portfolio){
        try{
            const price=await fetchPrice(stock.ticker);
            console.log(`Price of ${stock.ticker}: $${price.toFixed(2)}`);
            total+=price*stock.shares;
        }
        
        catch (err) {
            console.error(`Error fetching prices:, ${err.message}`);
        }
}

console.log(`Total Portfolio Value(seq): $${total.toFixed(2)}`);
console.timeEnd("seq");
}
fetchpaprices();

async function fetchPricesParallel() {
    console.time("parallel");
    let total=0;
    try {
    const price= await Promise.allSettled(portfolio.map(stock => fetchPrice(stock.ticker)));

    price.forEach((price, index) => {
        if (price.status === "fulfilled") {
        const stock=portfolio[index];
        console.log(`Price of ${stock.ticker}: $${price.value.toFixed(2)}`);
        total+=price.value*stock.shares;
        }
    });
}
    catch (error) {
        console.log("Error fetching prices:", error);

    }
    console.log(`Total Portfolio Value(parallel): $${total.toFixed(2)}`);
    console.timeEnd("parallel");
}
fetchPricesParallel(); 