(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Otevírací doba: den (0 = neděle) -> [od, do] v minutách
  const HOURS = { 1: [600, 840], 2: [600, 840], 3: [600, 840], 4: [600, 840], 5: [600, 840] };
  const DAYS = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];

  /* navigace se stínem po odscrollování */
  function Navbar() {
    const nav = $("#nav");
    const on = () => nav.classList.toggle("is-scrolled", scrollY > 10);
    addEventListener("scroll", on, { passive: true });
    on();
  }

  /* živý stav Otevřeno / Zavřeno + zvýraznění dnešního dne */
  function Status() {
    const now = new Date();
    const day = now.getDay();
    const min = now.getHours() * 60 + now.getMinutes();
    const el = $("#status");
    const fmt = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
    let text, open = false;
    const h = HOURS[day];
    if (h && min >= h[0] && min < h[1]) {
      open = true;
      text = `Teď máme otevřeno, vaříme do ${fmt(h[1])}`;
    } else if (h && min < h[0]) {
      text = `Dnes otevíráme v ${fmt(h[0])}`;
    } else {
      let d = day, i = 0;
      do { d = (d + 1) % 7; i++; } while (!HOURS[d]);
      const KDY = ["v neděli", "v pondělí", "v úterý", "ve středu", "ve čtvrtek", "v pátek", "v sobotu"];
      text = `Teď zavřeno · otevíráme ${i === 1 ? "zítra" : KDY[d]} v ${fmt(HOURS[d][0])}`;
    }
    el.classList.toggle("is-open", open);
    $("span", el).textContent = text;
    const row = $(`#hours [data-day="${day}"]`);
    if (row) row.classList.add("is-today");
    $("#today").textContent = `${DAYS[day][0].toUpperCase() + DAYS[day].slice(1)} ${now.getDate()}. ${now.getMonth() + 1}.`;
    $("#year").textContent = now.getFullYear();
  }

  /* týdenní menu živě z menicka.cz */
  function Lunch() {
    const box = $("#lunchFrame");
    let frame;
    const load = range => {
      const params = new URLSearchParams({ id: "4125", size: "16", color: "2a2522", bg: "fffdf8", font: "Verdana" });
      if (range === "dnes") params.set("datum", "dnes");
      box.classList.toggle("is-week", range !== "dnes");
      if (!frame) {
        frame = document.createElement("iframe");
        frame.title = "Týdenní menu Bistro Pekařka — menicka.cz";
        frame.addEventListener("load", () => $(".sheet__loading", box)?.remove());
        box.appendChild(frame);
      }
      frame.src = `https://www.menicka.cz/api/iframe/?${params}`;
    };
    $$("[data-range]").forEach(b => b.addEventListener("click", () => {
      $$("[data-range]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      load(b.dataset.range);
    }));
    new IntersectionObserver(([en], obs) => {
      if (en.isIntersecting) { load("dnes"); obs.disconnect(); }
    }, { rootMargin: "600px 0px" }).observe(box);
  }

  /* mapa až na kliknutí (bez cookies Googlu předem) */
  function Map() {
    $("#mapLoad").addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = "https://maps.google.com/maps?q=Bistro%20Peka%C5%99ka%2C%20Peka%C5%99sk%C3%A1%202236%2C%20Litom%C4%9B%C5%99ice&z=16&output=embed";
      f.title = "Mapa — Bistro Pekařka, Pekařská 2236, Litoměřice";
      f.loading = "lazy";
      $("#mapFrame").replaceChildren(f);
    });
  }

  /* jemné objevování sekcí */
  function Reveal() {
    const els = $$(".menu__side, .sheet, .delivery__grid > *, .girls__copy, .polaroid, .plates__grid figure, .note, .contact__card, .contact__visual");
    els.forEach(e => e.classList.add("reveal"));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { threshold: .12 });
    els.forEach(e => io.observe(e));
  }

  Navbar();
  Status();
  Lunch();
  Map();
  Reveal();
})();
