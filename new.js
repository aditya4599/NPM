const portfolio = [
    {ticker: 'AAPL', shares: 50, price: 150},
    {ticker: 'GOOGL', shares: 10, price: 2800},
    {ticker: 'AMZN', shares: 5, price: 3400},
    {ticker: 'TSLA', shares: 20, price: 700},
]
const positions = portfolio.map(stock => stock.shares * stock.price);
const portfoliovalue= positions.reduce((acc, curr) => acc + curr, 0);
const filtered=portfolio.filter(stock => stock.shares * stock.price > 1000);
console.log('Positions:', positions);
console.log('Portfolio Value:', portfoliovalue);
console.log('Filtered Stocks:', filtered);