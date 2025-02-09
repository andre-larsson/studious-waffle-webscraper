import puppeteer from "puppeteer";

export getTopHNArticles = (n=3) =>{
    const browser = await puppeteer.launch({headless:false})

    const page = await browser.newPage();

    // Navigate to Hacker News and scrape top 3 articles
    await page.goto("https://news.ycombinator.com/news", {
	waitUntil: "networkidle0",
    });

    
    const articles = await page.evaluate(() => {
	const items = document.querySelectorAll(".athing");
	return Array.from(items)
            .slice(0, n)
            .map((item) => {
		const titleElement = item.querySelector(".titleline > a");
		const link = titleElement?.getAttribute("href");
		const title = titleElement?.textContent;
		return { title, link };
            });
    });

    console.log("Scraped top 3 articles", { articles });

    await browser.close();
    return articles
}

