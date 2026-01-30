let data = {};

fetch("data/kamp-data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    buildPlanning();
    buildSpellen();
    buildInfo();
  });

function openTab(id) {
  document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

function buildPlanning() {
  const el = document.getElementById("planning");
  el.innerHTML = "";

  data.dagen.forEach(dag => {
    let html = `<div class="card"><h2>${dag.titel}</h2><table>
      <tr><th>Tijd</th><th>Activiteit</th><th>Locatie</th><th>Begeleiders</th></tr>`;

    dag.planning.forEach(p => {
      html += `<tr>
        <td>${p.tijd}</td>
        <td>${p.activiteit}</td>
        <td>${p.locatie}</td>
        <td>${p.begeleiders}</td>
      </tr>`;
    });

    html += "</table></div>";
    el.innerHTML += html;
  });
}

function buildSpellen() {
  const el = document.getElementById("spellen");
  el.innerHTML = "";

  data.spellen.forEach(spel => {
    el.innerHTML += `
      <div class="card">
        <h3>${spel.naam}</h3>
        <p>${spel.omschrijving}</p>
        <p><strong>Regels:</strong> ${spel.regels}</p>
        <p><strong>Benodigd:</strong> ${spel.benodigdheden}</p>
        <p><strong>Locatie:</strong> ${spel.locatie}</p>
        <p><strong>Verantwoordelijk:</strong> ${spel.verantwoordelijk}</p>
      </div>`;
  });
}

function buildInfo() {
  const el = document.getElementById("info");
  el.innerHTML = "<div class='card'><ul>" +
    data.info.map(i => `<li>${i}</li>`).join("") +
    "</ul></div>";
}
