if (window.process && process.platform === "darwin") {
  let titleBar = document.getElementById("titlebar");
  titleBar.style.backgroundColor = "ghostwhite";

  let windowControl = document.getElementById("window-controls");
  windowControl.classList.add("mac-controls");

  document.querySelectorAll(".button").forEach((el) => {
    el.style.height = "16px";
    el.style.width = "16px";
    el.classList.add("mac-button");
    el.classList.remove("window-hover");
    el.classList.remove("window-hover-close");
  });

  document.querySelectorAll(".icon").forEach((el) => {
    el.classList.add("mac-hover");
    el.style.margin = "auto";
  });

  windowControl.style.alignItems = "center";
  windowControl.style.right = "unset";
  windowControl.style.gridTemplateColumns = "repeat(3, 24px)";
  let windowTitle = document.getElementById("window-title");
  windowTitle.style.justifyContent = "center";
  document.getElementById("logo").src = "assets/icons/logo-black.svg";

  let minimizeImg = document.getElementById("min");
  minimizeImg.style.height = "8px";
  minimizeImg.style.width = "8px";
  minimizeImg.srcset = "assets/icons/mac/minimize-icon-mac.svg";
  let minBtn = document.getElementById("min-button");
  minBtn.style.gridColumn = 2;
  minBtn.style.backgroundColor = "#FFB32C";
  minBtn.style.borderRadius = "3rem";

  let restoreImg = document.getElementById("restore");
  restoreImg.style.height = "8px";
  restoreImg.style.width = "8px";
  restoreImg.srcset = "assets/icons/mac/restore-icon-mac.svg";
  let restoreBtn = document.getElementById("restore-button");
  restoreBtn.style.gridColumn = 3;
  restoreBtn.style.backgroundColor = "#40C057";
  restoreBtn.style.borderRadius = "3rem";

  let maximizeImg = document.getElementById("max");
  maximizeImg.style.height = "8px";
  maximizeImg.style.width = "8px";
  maximizeImg.srcset = "assets/icons/mac/maximize-icon-mac.svg";
  let maxBtn = document.getElementById("max-button");
  maxBtn.style.gridColumn = 3;
  maxBtn.style.backgroundColor = "#40C057";
  maxBtn.style.borderRadius = "3rem";

  let closeImg = document.getElementById("close");
  closeImg.style.height = "6px";
  closeImg.style.width = "6px";
  closeImg.srcset = "assets/icons/mac/close-icon-mac.svg";
  let closeBtn = document.getElementById("close-button");
  closeBtn.style.gridColumn = 1;
  closeBtn.style.backgroundColor = "#FA5252";
  closeBtn.style.borderRadius = "3rem";
}
