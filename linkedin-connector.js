async function connectLoop() {
  const connectButtons = Array.from(document.querySelectorAll('button'))
    .filter(btn => btn.textContent.trim() === 'Connect');

  if (connectButtons.length > 1) {
    for (const connectButton of connectButtons) {
      await clickAndWait(connectButton, 1000);

      const sendButtons = document.querySelectorAll('button[aria-label="Send now"]');
      for (const sendButton of sendButtons) {
        await clickAndWait(sendButton, 1000);
      }
      await wait(1000);
    }

    setTimeout(connectLoop, 1000);
  } else {
    const nextButton = document.querySelector('button[aria-label="Next"]');
    if (nextButton) {
      await clickAndWait(nextButton, 4000);
      setTimeout(connectLoop, 5000);
    }
  }
}

async function clickAndWait(element, delay) {
  element.click();
  await wait(delay);
}

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

connectLoop();