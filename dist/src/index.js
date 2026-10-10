/**
 * Lesson 1: Bridging Java to TypeScript & Node.js
 *
 * In this file, we take the stock portfolio example from your `new.js`
 * and write it with full TypeScript type safety and Node.js async mechanics.
 */
// ============================================================================
// 2. Classes & Parameter Properties
// ============================================================================
// In Java:
// public class PortfolioService {
//     private final String owner;
//     public PortfolioService(String owner) { this.owner = owner; }
// }
//
// In TypeScript, you can declare and initialize fields directly in constructor arguments:
export class PortfolioService {
    owner;
    constructor(owner) {
        this.owner = owner;
    }
    getOwner() {
        return this.owner;
    }
    /**
     * Java Streams vs TS Array methods
     *
     * Java:
     * stocks.stream().mapToDouble(s -> s.shares() * s.price()).sum();
     */
    calculateTotalValue(stocks) {
        return stocks
            .map((stock) => stock.shares * stock.price)
            .reduce((total, positionValue) => total + positionValue, 0);
    }
    // ============================================================================
    // 3. Asynchronous Programming (Java CompletableFuture vs Node.js Promise)
    // ============================================================================
    // In Java:
    // public CompletableFuture<PortfolioSummary> analyzeAsync(List<Stock> stocks)
    //
    // In Node.js:
    // `async` functions always return a `Promise<T>`.
    // Under the hood, Node doesn't block an OS thread. It schedules work on the Event Loop!
    async analyzePortfolio(stocks) {
        // Simulating an asynchronous network call / database fetch (e.g. fetching market trend)
        const trend = await this.fetchMarketTrend();
        const totalValue = this.calculateTotalValue(stocks);
        return {
            totalValue,
            holdingsCount: stocks.length,
            trend,
        };
    }
    fetchMarketTrend() {
        return new Promise((resolve) => {
            // setTimeout is Node's non-blocking timer (like ScheduledExecutorService in Java)
            setTimeout(() => {
                resolve("BULLISH");
            }, 500); // 500ms delay
        });
    }
}
// ============================================================================
// 4. Main Execution (Java `public static void main(String[] args)`)
// ============================================================================
// In Node.js / ES Modules, code runs top-to-bottom. We can use top-level await!
async function main() {
    console.log("🚀 Starting Node.js + TypeScript Demo...\n");
    const portfolio = [
        { ticker: "AAPL", shares: 50, price: 150 },
        { ticker: "GOOGL", shares: 10, price: 2800 },
        { ticker: "AMZN", shares: 5, price: 3400 },
        { ticker: "TSLA", shares: 20, price: 700 },
    ];
    const service = new PortfolioService("Aditya");
    console.log(`Portfolio Owner: ${service.getOwner()}`);
    console.log("Fetching market analysis asynchronously (non-blocking)...");
    const summary = await service.analyzePortfolio(portfolio);
    console.log("\n📊 Analysis Results:");
    console.log(`- Total Value:     $${summary.totalValue.toLocaleString()}`);
    console.log(`- Total Holdings:  ${summary.holdingsCount}`);
    console.log(`- Market Trend:    ${summary.trend}`);
}
main().catch((err) => {
    console.error("Error executing portfolio analysis:", err);
});
