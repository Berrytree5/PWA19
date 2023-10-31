const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; 

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt to install the PWA
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show the Install button to the user
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the PWA installation prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Hide the Install button
    butInstall.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed by the user');
  
});
