# LinkedIn-Connector
This is a simple script to automate the process of connecting with people on LinkedIn. With this script, you can automatically connect with people on your filtered search and navigate to the next pages to connect with more people.

```javascript
const CONNECT_DELAY = 1000;
const SEND_DELAY = 1000;
const NEXT_BUTTON_DELAY = 5000;

async function connectLoop() {
  const connectButtons = [...document.querySelectorAll('button')]
    .filter(btn => btn.textContent.trim() === 'Connect');

  for (const connectButton of connectButtons) {
    await clickAndWait(connectButton, CONNECT_DELAY);
    await clickAllAndWait('button[aria-label="Send now"]', SEND_DELAY);
  }

  const nextButton = document.querySelector('button[aria-label="Next"]');
  if (nextButton) {
    await clickAndWait(nextButton, NEXT_BUTTON_DELAY);
    connectLoop();
  }
}

async function clickAndWait(element, delay) {
  element.click();
  await wait(delay);
}

async function clickAllAndWait(selector, delay) {
  const buttons = [...document.querySelectorAll(selector)];
  for (const button of buttons) {
    await clickAndWait(button, delay);
  }
}

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

connectLoop();
```
