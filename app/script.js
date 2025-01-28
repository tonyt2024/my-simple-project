function displayGreeting() {
    const name = document.getElementById('name').value;
    const greeting = document.getElementById('greeting');

    if (name) {
        greeting.textContent = `Hello, ${name}! Welcome to my simple web app!`;
    } else {
        greeting.textContent = 'Please enter your name.';
    }
}
