const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const favoriteForm = document.getElementById('favoriteForm');
const favoriteName = document.getElementById('favoriteName');
const favoritesContainer = document.getElementById('favorites');

// Current quote
let currentQuote;

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    quoteText.textContent = `"${currentQuote.text}"`;
    quoteAuthor.textContent = `- ${currentQuote.author}`;
}

// Event listener for new quote button
newQuoteBtn.addEventListener('click', getRandomQuote);

// Event listener for favorite form submission
favoriteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (currentQuote && favoriteName.value.trim() !== '') {
        addToFavorites(favoriteName.value.trim(), currentQuote);
        favoriteName.value = '';
    }
});

// Function to add a quote to favorites
function addToFavorites(name, quote) {
    const favoriteItem = document.createElement('div');
    favoriteItem.className = 'favorite-item';
    favoriteItem.innerHTML = `
        <h4>${name}</h4>
        <p>"${quote.text}"</p>
        <p>- ${quote.author}</p>
    `;
    favoritesContainer.appendChild(favoriteItem);

    // BOM usage: Store in localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push({ name, quote });
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to load favorites from localStorage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.forEach(fav => addToFavorites(fav.name, fav.quote));
}

// Initial setup
getRandomQuote();
loadFavorites();

// BOM usage: Handle beforeunload event
window.addEventListener('beforeunload', function(event) {
    event.preventDefault(); // Cancel the event
    event.returnValue = ''; // Display a generic message in some browsers
});
