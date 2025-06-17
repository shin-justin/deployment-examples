const publicApi = (() => {
  const END_POINT = 'https://api.chucknorris.io/jokes/random';
  const jokeBtn = document.querySelector('.joke-btn');
  const jokeText = document.querySelector('.jokes-area');

  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  async function fetchJoke() {
    if (!jokeText) return;
    jokeText.textContent = 'Loading...';
    try {
      const response = await fetch(END_POINT);
      const data = await response.json();
      const newString = data.value.replace(/Chuck Norris/g, 'Giorgio');
      jokeText.textContent = newString;
    } catch (err) {
      jokeText.textContent = 'Oops, no joke! Try again.';
      console.error('Fetch error:', err);
    }
  }

  function getJoke() {
    if (!jokeBtn || !jokeText) {
      console.error('DOM elements missing');
      console.log(process.env.AUTH_PASSWORD);

      return;
    }
    const debouncedFetch = debounce(fetchJoke, 500);
    jokeBtn.addEventListener('click', debouncedFetch);
  }

  return {
    getJoke
  };
})();
publicApi.getJoke();
