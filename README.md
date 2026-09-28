# Bistro Pekařky — web

Statický web pro bistro **Pekařky** (tři holky, Litoměřice). Žádný build, čisté
HTML + CSS + JS.

## Struktura

```
bistro-pekarka/
├── index.html        celá stránka (one-page)
├── assets/           styl, skripty, obrázky
└── README.md
```

## Lokální spuštění

```bash
python -m http.server 5194 --directory bistro-pekarka
```

Pak otevřít http://localhost:5194 (v `.claude/launch.json` konfigurace `bistro-pekarka`).

## Poledové menu

Menu se natahuje živě z [menicka.cz](https://www.menicka.cz/4125-bistro-pekarky.html)
(ID provozovny 4125), ne z ručně psaného textu — při změně dodavatele menu
uprav zdroj v příslušném JS souboru.

## Design

Kostkovaný ubrus + modrá barva z loga.

## Nasazení

[Netlify Drop](https://app.netlify.com/drop) — přetáhnout celou složku `bistro-pekarka/`.
