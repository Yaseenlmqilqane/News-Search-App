const apiKey = "1410d409342f429aa3b7be22ab119fcc";
const cardsContent = document.getElementById("cards-wrapper");

const searchInput = document.querySelector(".nav__search-bar");
const inputBtn = document.querySelector(".nav__search-submit");





async function fetchRandomNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize20&apiKey=${apiKey}`);
        const myData = await response.json()
        return await myData.articles;
    } catch(error) {
        console.error("error fetching random news", error);
        return [];
    }
}


(async () => {
    try {
        const articles = await fetchRandomNews();
        displayArticles(articles);
    } catch(error) {
        console.error("error fetching random news", error);
    }
})();

inputBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();

    if(query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayArticles(articles);
        } catch(error) {
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query) {
    try {
        const response = await fetch(`
        https://newsapi.org/v2/everything?q=${query}&pageSize20&apiKey=${apiKey}`);
        const myData = await response.json()
        return await myData.articles;
    } catch(error) {
        console.error("error fetching random news", error);
        return [];
    }
}

function displayArticles(articles) {
    cardsContent.innerHTML = '';
    articles.forEach((articles) => {
        cardsContent.innerHTML += 
            `<div class="card-wrap">
                <div class="card__img"><a href="${articles.url}" target="_blank"><img src="${articles.urlToImage}" alt=""></a></div>
                <div class="card__info">
                <a href="${articles.url}" target="_blank"><h4 class="card__title">${articles.title.length > 30 ? articles.title.slice(0, 30) + " ..." : articles.title}</h4></a>
                <p class="card__text">${articles.description}</p>
                </div>
            </div>`
    })
}











