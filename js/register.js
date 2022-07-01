// Check a service worker registration status
async function checkRegistration() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      showResult("Service worker was registered on page load");
    } else {
      showResult("No service worker is currently registered");
    }
  } else {
    showResult("Service workers API not available");
  }
}

// Registers a service worker
async function register() {
  if ("serviceWorker" in navigator) {
    try {
      // Change the service worker URL to see what happens when the SW doesn't exist
      const registration = await navigator.serviceWorker.register("sw.js");
      showResult("Service worker registered");
    } catch (error) {
      showResult("Error while registering: " + error.message);
    }
  } else {
    showResult("Service workers API not available");
  }
}
