chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "speakAndHindi",
    title: "Pronounce & Hindi Meaning",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "speakAndHindi") {
    const selectedText = info.selectionText.trim();

    // 1. Audio sunane ke liye
    chrome.tts.speak(selectedText, { lang: 'en-US', rate: 0.8 });

    // 2. Pronunciation (Ucharan) API
    const pronUrl = `https://inputtools.google.com/request?text=${selectedText}&itc=hi-t-i0-und&num=1`;
    
    // 3. Meaning (Arth) API
    const meanUrl = `https://api.mymemory.translated.net/get?q=${selectedText}&langpair=en|hi`;

    try {
      const [pronRes, meanRes] = await Promise.all([
        fetch(pronUrl).then(r => r.json()),
        fetch(meanUrl).then(r => r.json())
      ]);

      const pronunciation = pronRes[1][0][1][0];
      const meaning = meanRes.responseData.translatedText;

      chrome.tabs.sendMessage(tab.id, {
        action: "showPopup",
        word: selectedText,
        pron: pronunciation,
        mean: meaning
      });
    } catch (err) {
      console.error("Error:", err);
    }
  }
});