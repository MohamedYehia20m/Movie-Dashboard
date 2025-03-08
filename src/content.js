chrome.runtime.sendMessage({ action: 'fetchData' }, response => {
  if (response.error) {
    console.error('Error:', response.error);
  } else {
    console.log('Data:', response.data);
  }
});
