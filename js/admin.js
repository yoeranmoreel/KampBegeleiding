let kampData = {
  dagen: [],
  spellen: [],
  info: []
};

/* 📅 PLANNING */
function addPlanning() {
  const titel = dagTitel.value.trim();
  if (!titel) return alert("Vul een dagtitel in");

  let dag = kampData.dagen.find(d => d.titel === titel);
  if (!dag) {
    dag = { titel, planning: [] };
    kampData.dagen.push(dag);
  }

  dag.planning.push({
    tijd: tijd.value,
    activiteit: activiteit.value,
    locatie: locatie.value,
    begeleiders: begeleiders.value
  });

  planningStatus.innerText = "Activiteit toegevoegd ✔️";
  tijd.value = activiteit.value = locatie.value = begeleiders.value = "";
}

/* 🎯 SPELLEN */
function addSpel() {
  kampData.spellen.push({
    naam: spelNaam.value,
    omschrijving: spelOmschrijving.value,
    regels: spelRegels.value,
    benodigdheden: spelBenodigdheden.value,
    locatie: spelLocatie.value,
    verantwoordelijk: spelVerantwoordelijk.value
  });

  spelStatus.innerText = "Spel toegevoegd ✔️";
  spelNaam.value = spelOmschrijving.value =
  spelRegels.value = spelBenodigdheden.value =
  spelLocatie.value = spelVerantwoordelijk.value = "";
}

/* ℹ️ INFO */
function addInfo() {
  kampData.info.push(infoTekst.value);
  infoTekst.value = "";
  renderInfo();
}

function renderInfo() {
  infoLijst.innerHTML = kampData.info.map(i => `<li>${i}</li>`).join("");
}

/* 💾 EXPORT */
function exportData() {
  const blob = new Blob(
    [JSON.stringify(kampData, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "kamp-data.json";
  a.click();
}

/* 📥 IMPORT */
function importData(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    kampData = JSON.parse(reader.result);
    renderInfo();
    alert("Data ingeladen ✔️");
  };

  reader.readAsText(file);
}
function renderPlanningOverzicht() {
  const el = document.getElementById("planningOverzicht");
  el.innerHTML = "";

  kampData.dagen.forEach((dag, dagIndex) => {
    el.innerHTML += `<strong>${dag.titel}</strong><ul>` +
      dag.planning.map((p, i) => `
        <li>
          ${p.tijd} – ${p.activiteit}
          <button onclick="deletePlanning(${dagIndex}, ${i})">🗑</button>
        </li>
      `).join("") +
      "</ul>";
  });
}

function deletePlanning(dagIndex, planIndex) {
  kampData.dagen[dagIndex].planning.splice(planIndex, 1);
  renderPlanningOverzicht();
}

function renderSpellenOverzicht() {
  const el = document.getElementById("spellenOverzicht");
  el.innerHTML = "<ul>" +
    kampData.spellen.map((s, i) => `
      <li>
        ${s.naam}
        <button onclick="deleteSpel(${i})">🗑</button>
      </li>
    `).join("") +
    "</ul>";
}

function deleteSpel(index) {
  kampData.spellen.splice(index, 1);
  renderSpellenOverzicht();
}

function openPreview() {
  alert(
    "Let op:\n\n" +
    "1. Exporteer eerst kamp-data.json\n" +
    "2. Upload dit bestand naar GitHub\n" +
    "3. Open daarna de site\n\n" +
    "(Preview werkt met gedeelde data)"
  );
  window.open("index.html", "_blank");
}

