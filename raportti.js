
/* SiNG BOX yksityinen talousraportti – selainkoodi.
   Vain Supabasen julkinen publishable-avain täällä; EI salaista avainta.
   Taloustiedot haetaan tunnistautumisen ja ylläpitäjävaltuutuksen vaativasta
   singbox-report-Edge Functionista.
*/
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const SETTINGS = window.SINGBOX_REPORT_CONFIG || {};
  const eur = new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" });
  const whole = new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 0 });
  const HELSINKI_DATE = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Helsinki", year: "numeric", month: "2-digit", day: "2-digit",
  });
  const monthLabel = new Intl.DateTimeFormat("fi-FI", { month: "long", year: "numeric", timeZone: "UTC" });
  let period = "day";
  let anchor = HELSINKI_DATE.format(new Date());
  let reportIsTest = false;
  let client = null;
  let currentData = null;
  let inFlight = false;
  let pendingRefresh = false;

  function errorText(err) {
    if (!err) return "Tuntematon virhe.";
    return err.message || String(err);
  }
  function showError(id, text) { $(id).textContent = text; $(id).hidden = !text; }
  function value(id, text) { $(id).textContent = text; }
  function asAmount(n) { return eur.format(Number(n || 0)); }
  function dateForLabel(date) { return new Date(`${date}T00:00:00.000Z`); }
  function safeDate(year, month, day) {
    return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
  }
  function stepAnchor(direction) {
    const d = dateForLabel(anchor);
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const day = d.getUTCDate();
    if (period === "day") anchor = safeDate(y, m, day + direction);
    if (period === "month") anchor = safeDate(y, m + direction, 1);
    if (period === "year") anchor = safeDate(y + direction, 0, 1);
    updateDateField();
    fetchReport();
  }
  function updateDateField() {
    const field = $("reportDate");
    if (period === "day") { field.type = "date"; field.value = anchor; }
    if (period === "month") { field.type = "month"; field.value = anchor.slice(0, 7); }
    if (period === "year") { field.type = "number"; field.min = "2020"; field.max = "2100"; field.value = anchor.slice(0, 4); }
    document.querySelectorAll("[data-period]").forEach((b) => {
      b.classList.toggle("active", b.dataset.period === period);
      b.setAttribute("aria-pressed", String(b.dataset.period === period));
    });
    const stamp = dateForLabel(anchor);
    const label = period === "day"
      ? new Intl.DateTimeFormat("fi-FI", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(stamp)
      : period === "month" ? monthLabel.format(stamp) : anchor.slice(0, 4);
    value("periodTitle", label.charAt(0).toUpperCase() + label.slice(1));
    value("chartTitle", period === "day" ? "Tuntikohtainen myynti" : period === "month" ? "Päivittäinen myynti" : "Kuukausittainen myynti");
  }
  function drawChart(series) {
    const chart = $("chart");
    chart.replaceChildren();
    const max = Math.max(1, ...series.map((x) => Number(x.revenue) || 0));
    for (const item of series) {
      const cell = document.createElement("div"); cell.className = "bar-cell";
      const track = document.createElement("div"); track.className = "bar-track";
      const bar = document.createElement("span"); bar.className = "bar";
      bar.style.height = `${Math.max(1, Math.min(100, (Number(item.revenue || 0) / max) * 100))}%`;
      bar.title = `${item.label}: ${asAmount(item.revenue)}`;
      track.append(bar);
      const label = document.createElement("span"); label.className = "bar-label";
      label.textContent = item.label;
      cell.append(track, label); chart.append(cell);
    }
  }
  function appendCell(row, text) {
    const td = document.createElement("td"); td.textContent = String(text); row.append(td);
  }
  function renderTable(rows, bodyId, factory) {
    const body = $(bodyId); body.replaceChildren();
    for (const item of rows) {
      const tr = document.createElement("tr");
      for (const text of factory(item)) appendCell(tr, text);
      body.append(tr);
    }
  }
  function render(data) {
    currentData = data;
    const s = data.summary;

     
    // ALV-lisätiedot raportin neljään pääboksiin.

    function setMetricVatDetail(metricId, lines) {
      const metric = $(metricId);

      if (!metric) return;

      const detailId = metricId + "VatDetail";

      let detail = document.getElementById(detailId);

      if (!detail) {
        detail = document.createElement("div");
        detail.id = detailId;

        detail.style.cssText =
          "margin-top:10px;" +
          "padding-top:9px;" +
          "border-top:1px solid rgba(190,160,90,0.25);" +
          "font-size:0.85rem;" +
          "line-height:1.6;";

        metric.insertAdjacentElement("afterend", detail);
      }

      detail.replaceChildren();

      for (const [label, amount] of lines) {
        const line = document.createElement("div");

        line.style.cssText =
          "display:flex;" +
          "justify-content:space-between;" +
          "align-items:center;" +
          "gap:12px;";

        const name = document.createElement("span");
        name.textContent = label;

        const number = document.createElement("strong");
        number.textContent = amount;

        line.append(name, number);
        detail.appendChild(line);
      }
    }

    const vat = data.vat;

    const salesVatReady =
      vat &&
      Number(vat.missingVatRows) === 0 &&
      vat.netSales !== null &&
      Number.isFinite(Number(vat.netSales)) &&
      Number.isFinite(Number(vat.vatTotal));

    // TUOTEMYYNTI

    setMetricVatDetail("revenueMetric", [
      [
        "Ilman ALV",
        salesVatReady ? asAmount(vat.netSales) : "—"
      ],
      [
        "Myynnin ALV",
        salesVatReady ? asAmount(vat.vatTotal) : "—"
      ]
    ]);

    // TUOTEKUSTANNUKSET

    // Tuotekustannus on jo veroton.
// Ei lisätä päällekkäistä ALV-erittelyä.

document.getElementById("costMetricVatDetail")?.remove();

    // MYYNTIKATE

    setMetricVatDetail("marginMetric", [
  [
    "Myynnistä poistettu ALV",
    salesVatReady
      ? asAmount(vat.vatTotal)
      : "—"
  ]
]);

    // KIRJATUT MUUT MENOT

    setMetricVatDetail("expensesMetric", [
  [
    "Kirjatut menot ilman ALV",
    data.expenseVat?.net == null
      ? "—"
      : asAmount(data.expenseVat.net)
  ],
  [
    "Kirjattujen menojen ALV",
    data.expenseVat?.vat == null
      ? "—"
      : asAmount(data.expenseVat.vat)
  ],
  [
    "Muut varastokulut ilman ALV",
    s.unvaluedStockRows > 0
      ? "—"
      : asAmount(s.stockCost)
  ]
]);

     
// ALV-ERITTELY
// Näytetään palvelimen laskemat ALV-tiedot.

const vatPanel = $("vatReportPanel");

if (vatPanel) {
  if (vat && Array.isArray(vat.byRate)) {
        const vat135 = vat.byRate.find(
          (row) => Number(row.rate) === 13.5
        );

        const vat255 = vat.byRate.find(
          (row) => Number(row.rate) === 25.5
        );

        value(
          "vatGross135",
          asAmount(vat135?.gross || 0)
        );

        value(
          "vatAmount135",
          asAmount(vat135?.vat || 0)
        );

        value(
          "vatGross255",
          asAmount(vat255?.gross || 0)
        );

        value(
          "vatAmount255",
          asAmount(vat255?.vat || 0)
        );

        value(
          "vatGrossSales",
          asAmount(vat.grossSales)
        );

        value(
          "vatTotal",
          asAmount(vat.vatTotal)
        );

        value(
          "vatNetSales",
          vat.netSales === null
            ? "Ei laskettavissa"
            : asAmount(vat.netSales)
        );

        const warning = $("vatMissingWarning");

        const missing = Number(vat.missingVatRows || 0);

        const otherRates = vat.byRate.filter(
          (row) =>
            Number(row.rate) !== 13.5 &&
            Number(row.rate) !== 25.5
        );

        const messages = [];

        if (missing > 0) {
          messages.push(
            missing +
            " myyntiriviltä puuttuu ALV-erittely. " +
            "Veroton myynti ei ole luotettavasti laskettavissa."
          );
        }

        if (otherRates.length > 0) {
          messages.push(
            "Raportissa on myös muita ALV-kantoja, " +
            "joita tämä taulukko ei erittele."
          );
        }

        if (warning) {
          warning.textContent = messages.join(" ");
          warning.hidden = messages.length === 0;
        }

        vatPanel.hidden = false;

      } else {
        // Puuttuvaa ALV-dataa ei näytetä nollina.
        vatPanel.hidden = true;
      }
    }

    
    value(
      "revenueMetric",
      data.totalSales?.complete === true &&
      typeof data.totalSales.gross === "number" &&
      Number.isFinite(data.totalSales.gross)
        ? asAmount(data.totalSales.gross)
        : "—"
    );


  
    // TUOTTEIDEN KATE JA TULOS
    // Huonemyynti lisätään näihin vasta,
    // kun kaikkien kustannusten ALV-käsittely on tarkistettu.

    value("costMetric", asAmount(s.productCost));

value(
  "marginMetric",
  s.grossMargin === null
    ? "—"
    : asAmount(s.grossMargin)
);

value(
  "expensesMetric",
  data.expenseVat?.net === null ||
  data.expenseVat?.net === undefined
    ? "—"
    : asAmount(
        Number(data.expenseVat.net) +
        Number(s.stockCost)
      )
);

value("orderMetric", whole.format(s.orderCount));

value(
  "qtyMetric",
  `${whole.format(s.soldQuantity)} kpl`
);

value(
  "resultMetric",
  s.resultAfterCosts === null
    ? "—"
    : asAmount(s.resultAfterCosts)
);
    value("manualExpenseMetric", asAmount(s.manualExpenses));
    value("stockExpenseMetric", asAmount(s.stockCost));

    
    value(
      "bookingValue",
      typeof data.roomSales?.gross === "number" &&
      Number.isFinite(data.roomSales.gross)
        ? asAmount(data.roomSales.gross)
        : "—"
    );

    value(
      "bookingCount",
      Number.isInteger(data.roomSales?.paidBookings)
        ? `${whole.format(data.roomSales.paidBookings)} maksettua varausta`
        : "Varausmäärää ei saatavilla"
    );

     
    // HUONEMYYNNIN ALV-ERITTELY

    const roomSales = data.roomSales;
    const bookingCountElement = $("bookingCount");

    if (bookingCountElement) {

      let roomDetails =
        document.getElementById("roomSalesDetails");

      if (!roomDetails) {

        roomDetails = document.createElement("div");
        roomDetails.id = "roomSalesDetails";

        roomDetails.style.cssText =
          "margin-top:14px;" +
          "padding:12px;" +
          "border:1px solid rgba(150,150,150,0.35);" +
          "border-radius:10px;" +
          "line-height:1.8;" +
          "font-size:0.9rem;";

        bookingCountElement.insertAdjacentElement(
          "afterend",
          roomDetails
        );
      }

      const validRoomSales =
        roomSales &&
        ["gross", "vat", "net", "refundsGross"].every(
          key =>
            typeof roomSales[key] === "number" &&
            Number.isFinite(roomSales[key])
        );

      if (!validRoomSales) {

        roomDetails.textContent =
          "Huonemyynnin ALV-erittely on puutteellinen.";

      } else {



const lines = [
  "ALV 25,5 %: " + asAmount(roomSales.vat),
  "Huonemyynti ilman ALV:tä: " + asAmount(roomSales.net)
];



        roomDetails.replaceChildren();

        lines.forEach((line, index) => {

          const item = document.createElement("div");
          item.textContent = line;

          if (index === 0) {
            item.style.fontWeight = "700";
          }

          roomDetails.appendChild(item);
        });
      }
    }

    // HUONEMYYNNIN ALV-ERITTELY LOPPU

    drawChart(data.series || []);
    renderTable(data.products || [], "productsBody", (p) => [p.name, whole.format(p.quantity), asAmount(p.revenue), asAmount(p.margin)]);
    $("noProducts").hidden = !!(data.products && data.products.length);
    
    // Menojen kumoaminen ja tulostusulkoasu.
    if (!document.getElementById("singbox-expense-void-styles")) {
      const style = document.createElement("style");
      style.id = "singbox-expense-void-styles";
      style.textContent = `
        #expensesBody tr.expense-voided td {
          opacity: 0.55;
          text-decoration: line-through;
        }

        #expensesBody .expense-void-button {
          margin-left: 10px;
          padding: 5px 10px;
          border: 1px solid currentColor;
          border-radius: 6px;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        #expensesBody .expense-void-button:disabled {
          opacity: 0.5;
          cursor: wait;
        }

        @media print {
          #expensesBody tr.expense-voided,
          #expensesBody .expense-void-button {
            display: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const expenseBody = $("expensesBody");
    expenseBody.replaceChildren();

    for (const expense of (data.expenses || [])) {
      const row = document.createElement("tr");

      appendCell(row, expense.date || "");

      const description =
        expense.category +
        (expense.note ? " – " + expense.note : "");

      appendCell(
        row,
        expense.voided_at
          ? description + " – Kumottu" +
            (expense.void_reason
              ? " (" + expense.void_reason + ")"
              : "")
          : description
      );

      const amountCell = document.createElement("td");
      amountCell.textContent = asAmount(expense.amount);

      if (expense.voided_at) {
        row.classList.add("expense-voided");
      } else {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "expense-void-button";
        button.textContent = "Kumoa";

        button.addEventListener("click", async () => {
          const confirmed = window.confirm(
            "Haluatko varmasti kumota tämän menokirjauksen?\n\n" +
            description + "\n" +
            asAmount(expense.amount)
          );

          if (!confirmed) return;

          const reasonInput = window.prompt(
            "Kirjoita kumoamisen syy (vähintään 3 merkkiä):"
          );

          if (reasonInput === null) return;

          const reason = reasonInput.trim();

          if (reason.length < 3 || reason.length > 500) {
            window.alert(
              "Kumoamisen syyn pitää olla 3–500 merkkiä."
            );
            return;
          }

          button.disabled = true;

          try {
            await functionRequest({
              action: "void_expense",
              id: expense.id,
              reason: reason
            });

            await fetchReport();
          } catch (error) {
            button.disabled = false;
            showError(
              "reportError",
              "Kumoaminen epäonnistui: " + errorText(error)
            );
          }
        });

        amountCell.appendChild(button);
      }

      row.appendChild(amountCell);
      expenseBody.appendChild(row);
    }

    const warnings = [];
    if (s.missingCostRows > 0) warnings.push(`${s.missingCostRows} myyntiriviltä puuttuu ostohinta. Kate voi olla liian suuri.`);
    if (s.unvaluedStockRows > 0) warnings.push(`${s.unvaluedStockRows} varastokirjaukselta puuttuu yksikkökustannus. Menot voivat olla puutteellisia.`);
    const warningBox = $("warnings");
    warningBox.textContent = warnings.join(" ");
    warningBox.hidden = warnings.length === 0;
    const updated = "Päivitetty " + new Intl.DateTimeFormat("fi-FI", { timeZone: "Europe/Helsinki", hour: "2-digit", minute: "2-digit", day: "numeric", month: "numeric", year: "numeric" }).format(new Date(data.generated_at));
    value("updatedText", updated);
  }
  // Raportin tiedot näytetään vasta, kun palvelin on varmistanut
  // kirjautumisen, ylläpitäjäoikeuden ja palauttanut oikeat myyntitiedot.
  function enterDashboard(reportData) {
    $("loginPanel").hidden = true;
    $("reportPanel").hidden = false;
    $("logoutButton").hidden = false;
    value("modeFlag", "Ylläpitäjän näkymä");
    updateDateField();
    
    render(reportData);

     
    // OSTOHINTOJEN HALLINTA
    // Alustetaan vain kerran kirjautumisen jälkeen.

    const costPanel = $("costEditorPanel");

    if (costPanel && costPanel.dataset.initialized !== "true") {

      costPanel.dataset.initialized = "true";

      const costForm = $("costEditorForm");
      const productSelect = $("costProductSelect");
      const netField = $("costNetPrice");
      const rateField = $("costVatRate");
      const currentGross = $("costCurrentGross");
      const previewVat = $("costPreviewVat");
      const previewGross = $("costPreviewGross");
      const saveButton = $("costSaveButton");
      const message = $("costSaveMessage");

      let costProducts = [];
      let savingCost = false;

      function costMessage(text, isError = false) {
        message.textContent = text;
        message.hidden = !text;
        message.style.color = isError ? "#ffb4b4" : "";
      }

      function updateCostPreview() {

        const net = Number(netField.value);
        const rate = Number(rateField.value);

        const valid =
          productSelect.value !== "" &&
          netField.value.trim() !== "" &&
          rateField.value !== "" &&
          Number.isFinite(net) &&
          net >= 0 &&
          net <= 1000000 &&
          [0, 13.5, 25.5].includes(rate) &&
          Math.abs(net * 100 - Math.round(net * 100)) < 0.000001;

        if (!valid) {
          previewVat.textContent = "—";
          previewGross.textContent = "—";
          saveButton.disabled = true;
          return null;
        }

        const netCents = Math.round(net * 100);
        const vatCents = Math.round(netCents * rate / 100);

        previewVat.textContent = asAmount(vatCents / 100);

        previewGross.textContent =
          asAmount((netCents + vatCents) / 100);

        saveButton.disabled = savingCost;

        return { netPrice: netCents / 100, vatRate: rate };
      }

      productSelect.addEventListener("change", () => {

        const product = costProducts.find(
          p => String(p.id) === productSelect.value
        );

        costMessage("");

        currentGross.textContent =
          product && product.cost_price !== null
            ? asAmount(product.cost_price)
            : "—";

        // Vanhoista ostohinnoista ei arvata ALV-kantaa.

        if (
          product &&
          product.cost_price !== null &&
          product.cost_vat_amount !== null &&
          product.cost_vat_rate !== null &&
          [0, 13.5, 25.5].includes(Number(product.cost_vat_rate))
        ) {

          netField.value =
    Number(product.cost_price).toFixed(2);

          rateField.value = String(Number(product.cost_vat_rate));

        } else {
          netField.value = "";
          rateField.value = "";
        }

        updateCostPreview();
      });

      netField.addEventListener("input", updateCostPreview);
      rateField.addEventListener("change", updateCostPreview);

      costForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (savingCost) return;

        const values = updateCostPreview();

        if (!values) return;

        const product = costProducts.find(
          p => String(p.id) === productSelect.value
        );

        if (!product) return;

        const confirmed = window.confirm(
          "Tallennetaanko uusi ostohinta?\n\n" +
          product.name + "\n" +
          "Veroton: " + asAmount(values.netPrice) + "\n" +
          "ALV: " + values.vatRate + " %\n" +
          "Verollinen: " + previewGross.textContent
        );

        if (!confirmed) return;

        savingCost = true;
        saveButton.disabled = true;
        costMessage("Tallennetaan ostohintaa...");

        try {

          const result = await functionRequest({
            action: "update_product_cost",
            product_id: Number(product.id),
            net_price: values.netPrice,
            vat_rate: values.vatRate
          });

          if (!result?.ok || !result.product) {
            throw new Error("Palvelin ei vahvistanut tallennusta.");
          }

          Object.assign(product, result.product);

          currentGross.textContent =
            asAmount(product.cost_price);

          costMessage("Ostohinta tallennettu onnistuneesti.");

        } catch (error) {

          costMessage(
            "Tallennus epäonnistui: " + errorText(error),
            true
          );

        } finally {
          savingCost = false;
          updateCostPreview();
        }
      });

      // Haetaan tuotteet suojatulta raporttipalvelimelta.

      costPanel.hidden = false;
      saveButton.disabled = true;
      productSelect.disabled = true;

      costMessage("Haetaan tuoteluetteloa...");

      void (async () => {

        try {

          const result = await functionRequest({
            action: "list_product_costs"
          });

          if (!Array.isArray(result?.products)) {
            throw new Error("Tuoteluetteloa ei saatu.");
          }

          costProducts = result.products;

          productSelect.replaceChildren();

          const placeholder = document.createElement("option");
          placeholder.value = "";
          placeholder.textContent = "Valitse tuote";
          productSelect.appendChild(placeholder);

          for (const product of costProducts) {

            const option = document.createElement("option");

            option.value = String(product.id);
            option.textContent = product.name;

            productSelect.appendChild(option);
          }

          productSelect.disabled = false;
          costMessage("");

          updateCostPreview();

        } catch (error) {

          costMessage(
            "Tuotteiden haku epäonnistui: " + errorText(error),
            true
          );
        }
      })();
    }

    // OSTOHINTOJEN HALLINTA LOPPU


    // TESTIHISTORIA
    // Ei vaikuta virallisiin raporttilaskelmiin.

    const testPanel = $("testHistoryPanel");
    const testBody = $("testExpensesBody");
    const testEmpty = $("noTestExpenses");

    if (testPanel && testBody && testEmpty) {

      // Tulostuksessa testihistoria piilotetaan.
      if (!document.getElementById("testHistoryStyles")) {
        const style = document.createElement("style");
        style.id = "testHistoryStyles";

        style.textContent = `
          #testHistoryPanel[hidden] {
            display: none !important;
          }

          #testExpensesBody tr.test-voided td:nth-child(-n+3) {
            text-decoration: line-through;
            opacity: 0.55;
          }

          #testExpensesBody .test-void-button {
            padding: 6px 12px;
            border: 1px solid currentColor;
            border-radius: 6px;
            background: transparent;
            color: inherit;
            cursor: pointer;
          }

          #testExpensesBody .test-void-button:disabled {
            opacity: 0.5;
            cursor: wait;
          }

          @media print {
            #testHistoryPanel {
              display: none !important;
            }
          }
        `;

        document.head.appendChild(style);
      }

      async function loadTestHistory() {

        testPanel.hidden = false;
        testBody.replaceChildren();

        testEmpty.hidden = false;
        testEmpty.textContent = "Ladataan testihistoriaa...";

        try {

          const result = await functionRequest({
            action: "test_expenses"
          });

          const entries = Array.isArray(result.expenses)
            ? result.expenses
            : [];

          testBody.replaceChildren();

          testEmpty.hidden = entries.length > 0;
          testEmpty.textContent =
            "Ei testimenoja näytettäväksi.";

          for (const expense of entries) {

            const row = document.createElement("tr");

            if (expense.voided_at) {
              row.classList.add("test-voided");
            }

            appendCell(row, expense.date || "");

            const description =
              expense.category +
              (expense.note ? " – " + expense.note : "");

            appendCell(row, description);

            appendCell(row, asAmount(expense.amount));

            appendCell(
              row,
              expense.voided_at ? "Kumottu" : "Testi"
            );

            const actionCell = document.createElement("td");

            if (expense.voided_at) {

              actionCell.textContent =
                expense.void_reason
                  ? "Syy: " + expense.void_reason
                  : "Kumottu";

            } else {

              const button = document.createElement("button");
              button.type = "button";
              button.className = "test-void-button";
              button.textContent = "Kumoa";

              button.addEventListener("click", async () => {

                const confirmed = window.confirm(
                  "Haluatko varmasti kumota testikirjauksen?\n\n" +
                  description + "\n" +
                  asAmount(expense.amount)
                );

                if (!confirmed) return;

                const input = window.prompt(
                  "Kirjoita kumoamisen syy:"
                );

                if (input === null) return;

                const reason = input.trim();

                if (
                  reason.length < 3 ||
                  reason.length > 500
                ) {
                  window.alert(
                    "Kumoamisen syyn tulee olla 3–500 merkkiä."
                  );
                  return;
                }

                button.disabled = true;

                try {

                  await functionRequest({
                    action: "void_expense",
                    id: expense.id,
                    reason: reason
                  });

                  await loadTestHistory();
                  await fetchReport();

                } catch (error) {

                  button.disabled = false;

                  window.alert(
                    "Kumoaminen epäonnistui: " +
                    errorText(error)
                  );

                }
              });

              actionCell.appendChild(button);
            }

            row.appendChild(actionCell);
            testBody.appendChild(row);
          }

        } catch (error) {

          testEmpty.hidden = false;

          testEmpty.textContent =
            "Testihistorian haku epäonnistui: " +
            errorText(error);

        }
      }

      void loadTestHistory();
    }

  }
  function clearReport() {
    currentData = null;
    for (const id of ["revenueMetric", "costMetric", "marginMetric", "expensesMetric",
      "orderMetric", "qtyMetric", "resultMetric", "manualExpenseMetric",
      "stockExpenseMetric", "bookingValue", "bookingCount"]) value(id, "—");
    $("chart").replaceChildren();
    $("productsBody").replaceChildren();
    $("expensesBody").replaceChildren();
    $("noProducts").hidden = true;
    $("warnings").hidden = true;
    $("warnings").textContent = "";
  }
  function exitDashboard() {
    $("reportPanel").hidden = true;
    $("loginPanel").hidden = false;
    $("logoutButton").hidden = true;
    clearReport();
    $("password").value = "";
    showError("reportError", "");
  }
  async function functionRequest(payload) {
    if (!client) throw new Error("Supabase-asetukset puuttuvat.");
    const { data: sessionData } = await client.auth.getSession();
    if (!sessionData?.session?.access_token) throw new Error("Kirjautuminen on vanhentunut. Kirjaudu uudelleen.");
    const { data, error } = await client.functions.invoke(SETTINGS.functionName, { body: payload });
    if (error) {
      let message = errorText(error);
      if (error.context?.json) {
        try { const details = await error.context.json(); message = details.error || details.message || message; } catch { /* fallback */ }
      }
      throw new Error(message);
    }
    if (data?.error) throw new Error(data.error);
    return data;
  }
  async function fetchReport() {
    if (inFlight) { pendingRefresh = true; return; }
    inFlight = true;
    $("refreshButton").disabled = true;
    showError("reportError", "");
    clearReport();
    value("updatedText", "Haetaan ajantasaiset tiedot…");
    try {
      const data = await functionRequest({ action: "report", period, anchor, is_test: reportIsTest });
       console.log("HUONEMYYNNIN TARKISTUS", {
  reportIsTest: reportIsTest,
  serverIsTest: data.is_test,
  start: data.start,
  end: data.end,
  roomSales: data.roomSales
});
      render(data);
    } catch (error) {
      showError("reportError", `Raporttia ei voitu hakea: ${errorText(error)}`);
      value("updatedText", "Tietojen päivitys epäonnistui.");
    } finally {
      inFlight = false;
      $("refreshButton").disabled = false;
      if (pendingRefresh && !$("reportPanel").hidden) {
        pendingRefresh = false;
        void fetchReport();
      }
    }
  }
  async function signIn(event) {
    event.preventDefault();
    const btn = $("loginButton"); btn.disabled = true;
    showError("loginError", "");
    try {
      if (!window.supabase || !SETTINGS.supabaseUrl || !SETTINGS.publishableKey) {
        throw new Error("Supabase-yhteyden asetuksia ei ole määritelty.");
      }
      if (!client) {
        client = window.supabase.createClient(SETTINGS.supabaseUrl, SETTINGS.publishableKey, {
          auth: { persistSession: false, autoRefreshToken: true, detectSessionInUrl: false },
        });
      }
      const { error } = await client.auth.signInWithPassword({
        email: $("email").value.trim(), password: $("password").value,
      });
      if (error) throw error;
      const firstReport = await functionRequest({
  action: "report",
  period,
  anchor,
  is_test: reportIsTest
});
      if (!firstReport?.summary) throw new Error("Raporttipalvelin ei palauttanut raporttitietoja.");
      enterDashboard(firstReport);
    } catch (error) { showError("loginError", errorText(error)); }
    finally { btn.disabled = false; }
  }
  async function addExpense(event) {
    event.preventDefault();
    const button = $("saveExpenseButton"); button.disabled = true;
    showError("expenseMessage", "");
    const amount = Number($("expenseAmount").value);
    try {
      if (!(amount > 0)) throw new Error("Syötä positiivinen summa.");

      const vatField = $("expenseVatRate");

      if (vatField && vatField.value === "") {
        throw new Error("Valitse menon ALV-kanta.");
      }

      await functionRequest({
        action: "add_expense",
        date: $("expenseDate").value,
        category: $("expenseCategory").value,
        amount: amount,
        vat_rate: vatField ? Number(vatField.value) : null,
        note: $("expenseNote").value
      });

      $("expenseAmount").value = ""; $("expenseNote").value = "";
      $("expenseMessage").textContent = "Meno tallennettu onnistuneesti.";
      $("expenseMessage").hidden = false;
      await fetchReport();
    } catch (err) { showError("expenseMessage", `Tallennus epäonnistui: ${errorText(err)}`); }
    finally { button.disabled = false; }
  }
  $("loginForm").addEventListener("submit", signIn);
  $("expenseForm").addEventListener("submit", addExpense);
  $("logoutButton").addEventListener("click", async () => {
    if (client) await client.auth.signOut(); exitDashboard();
  });
   // OIKEA RAPORTTI / TESTIRAPORTTI

const reportModeButtons = document.createElement("div");

reportModeButtons.style.cssText =
  "display:flex;" +
  "flex-wrap:wrap;" +
  "gap:10px;" +
  "margin-bottom:18px;";

const realReportButton = document.createElement("button");
const testReportButton = document.createElement("button");

realReportButton.type = "button";
testReportButton.type = "button";

realReportButton.textContent = "OIKEA RAPORTTI";
testReportButton.textContent = "TESTIRAPORTTI";

function updateReportModeButtons() {
  for (const [button, isTest] of [
    [realReportButton, false],
    [testReportButton, true]
  ]) {
    const selected = reportIsTest === isTest;

    button.style.cssText =
      "padding:12px 18px;" +
      "border-radius:8px;" +
      "cursor:pointer;" +
      "border:1px solid #b39535;" +
      "background:" + (selected ? "#e1b747" : "transparent") + ";" +
      "color:" + (selected ? "#001c12" : "#e1b747") + ";" +
      "font-weight:700;";

    button.setAttribute("aria-pressed", String(selected));
  }
}

realReportButton.addEventListener("click", () => {
  reportIsTest = false;
  updateReportModeButtons();
  fetchReport();
});

testReportButton.addEventListener("click", () => {
  reportIsTest = true;
  updateReportModeButtons();
  fetchReport();
});

reportModeButtons.append(
  realReportButton,
  testReportButton
);

const reportDate = $("reportDate");

if (reportDate?.parentElement) {
  reportDate.parentElement.insertAdjacentElement(
    "beforebegin",
    reportModeButtons
  );
}

updateReportModeButtons();

// RAPORTTITILAN VALINTA LOPPU
  $("previousDate").addEventListener("click", () => stepAnchor(-1));
  $("nextDate").addEventListener("click", () => stepAnchor(1));
  $("refreshButton").addEventListener("click", fetchReport);
  $("reportDate").addEventListener("change", () => {
    const val = $("reportDate").value;
    if (period === "day" && /^20\d\d-\d\d-\d\d$/.test(val)) anchor = val;
    if (period === "month" && /^20\d\d-\d\d$/.test(val)) anchor = val + "-01";
    if (period === "year" && /^20\d\d$/.test(val)) anchor = val + "-01-01";
    updateDateField(); fetchReport();
  });
  document.querySelectorAll("[data-period]").forEach((button) => button.addEventListener("click", () => {
    period = button.dataset.period; updateDateField(); fetchReport();
  }));
   
  // MENOKIRJAUSTEN ALV-ESIKATSELU
  // Ei muuta raportin laskelmia tai tietokantaa.

  {
    const grossField = $("expenseAmount");
    const vatField = $("expenseVatRate");

    if (grossField && vatField) {

      const preview = document.createElement("div");
      preview.className = "expense-total full";

      preview.style.cssText =
        "display:flex;" +
        "flex-direction:column;" +
        "gap:10px;" +
        "margin-top:8px;";

      const netRow = document.createElement("div");
      const vatRow = document.createElement("div");

      for (const row of [netRow, vatRow]) {
        row.style.cssText =
          "display:flex;" +
          "justify-content:space-between;" +
          "gap:12px;" +
          "align-items:center;";
      }

      const netLabel = document.createElement("span");
      netLabel.textContent = "Summa ilman ALV:tä";

      const netValue = document.createElement("strong");
      netValue.textContent = "—";

      netRow.append(netLabel, netValue);

      const vatLabel = document.createElement("span");
      vatLabel.textContent = "ALV:n osuus";

      const vatValue = document.createElement("strong");
      vatValue.textContent = "—";

      vatRow.append(vatLabel, vatValue);

      preview.append(netRow, vatRow);

      vatField.closest("label")
        ?.insertAdjacentElement("afterend", preview);

      function updateExpenseVatPreview() {

        const gross = Number(grossField.value);
        const rate = Number(vatField.value);

        if (
          grossField.value === "" ||
          vatField.value === "" ||
          !Number.isFinite(gross) ||
          gross < 0 ||
          ![0, 10, 13.5, 25.5].includes(rate)
        ) {
          netValue.textContent = "—";
          vatValue.textContent = "—";
          return;
        }

        const grossCents = Math.round(gross * 100);

        const vatCents = Math.round(
          grossCents * rate / (100 + rate)
        );

        const netCents = grossCents - vatCents;

        netValue.textContent =
          asAmount(netCents / 100);

        vatValue.textContent =
          asAmount(vatCents / 100);

        vatLabel.textContent =
          "ALV " + String(rate).replace(".", ",") + " %";
      }

      grossField.addEventListener(
        "input",
        updateExpenseVatPreview
      );

      vatField.addEventListener(
        "change",
        updateExpenseVatPreview
      );

      updateExpenseVatPreview();
    }
  }

  // MENOKIRJAUSTEN ALV-ESIKATSELU LOPPU

  $("expenseDate").value = anchor;
  // Automaattipäivitys vain kirjautuneessa oikeassa näkymässä.
  setInterval(() => {
    if (!$("reportPanel").hidden && document.visibilityState === "visible") fetchReport();
  }, 60000);
})();
