chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showPopup") {
    let popup = document.getElementById("hindi-pronounce-popup");
    if (popup) popup.remove();

    popup = document.createElement("div");
    popup.id = "hindi-pronounce-popup";
    popup.innerHTML = `
      <div style="font-weight: bold; color: #4285f4; font-size: 14px; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 8px;">
        Word: ${request.word}
      </div>
      <div style="margin-bottom: 8px;">
        <span style="color: #555; font-size: 12px; display: block;">उच्चारण (Pronunciation):</span>
        <strong style="font-size: 18px; color: #222;">${request.pron}</strong>
      </div>
      <div style="margin-bottom: 5px;">
        <span style="color: #555; font-size: 12px; display: block;">अर्थ (Meaning):</span>
        <strong style="font-size: 18px; color: #d93025;">${request.mean}</strong>
      </div>
      <div style="font-size: 10px; color: #aaa; text-align: right; margin-top: 10px;">Click to close</div>
    `;

    // Styling
    Object.assign(popup.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px",
      backgroundColor: "#fff",
      borderLeft: "5px solid #d93025",
      borderRadius: "8px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      zIndex: "2147483647",
      fontFamily: "Arial, sans-serif",
      minWidth: "220px",
      cursor: "pointer",
      transition: "all 0.3s ease"
    });

    document.documentElement.appendChild(popup);
    popup.onclick = () => popup.remove();
    
    // 8 second baad automatically close
    setTimeout(() => { if(popup) popup.remove(); }, 8000);
  }
});