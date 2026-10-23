/*
  SiNG BOX - asiakassivujen huoltotilakytkin.
  Lisaa tahan tiedostoon viittaava script-tagi asiakassivujen <head>-osan ALKUUN.
  Huoltotila on nakymakytkin, EI palvelintason paasyesto.
  Ala lisaa tata yllapidon tai henkilokunnan sivuille.
*/
(function () {
  "use strict";

  var currentScript = document.currentScript;
  var scriptAddress = currentScript && currentScript.src ? currentScript.src : document.baseURI;
  var base = new URL(".", scriptAddress);
  var config = new URL("maintenance-config.json", base);
  var maintenancePage = new URL("maintenance.html", base);
  var root = document.documentElement;

  // Piilota sivu lyhyeksi ajaksi kunnes huoltotilan asetus on tarkistettu.
  var style = document.createElement("style");
  style.textContent = "html.singbox-maintenance-checking body{visibility:hidden!important}";
  document.head.appendChild(style);
  root.classList.add("singbox-maintenance-checking");

  var settled = false;
  var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  var timer;

  function showNormalSite() {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    root.classList.remove("singbox-maintenance-checking");
  }

  function goToMaintenance() {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    if (window.location.pathname !== maintenancePage.pathname) {
      window.location.replace(maintenancePage.href);
    } else {
      root.classList.remove("singbox-maintenance-checking");
    }
  }

  // Jos asetuksen haku epaonnistuu, normaali sivu avautuu.
  // Sivuston oikea sulkeminen vaatisi palvelintason ratkaisun.
  timer = setTimeout(function () {
    if (controller) controller.abort();
    showNormalSite();
  }, 3500);

  // Vahemman selaimen valimuistion ongelmia huoltotilaa paalle/pois vaihtaessa.
  config.searchParams.set("t", String(Date.now()));
  fetch(config.href, {
    cache: "no-store",
    credentials: "same-origin",
    signal: controller ? controller.signal : undefined
  })
    .then(function (response) {
      if (!response.ok) throw new Error("Maintenance config: " + response.status);
      return response.json();
    })
    .then(function (settings) {
      if (settings && settings.maintenance === true) {
        goToMaintenance();
      } else {
        showNormalSite();
      }
    })
    .catch(function () {
      showNormalSite();
    });
}());
