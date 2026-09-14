import type { Review, ReviewPeriod } from "@/lib/types";

export const REVIEWS: Record<ReviewPeriod, Review> = {
  month: {
    period: "month",
    periodLabel: "September 2026",
    numbers: [
      { value: "4.650 €", label: "Umsatz" },
      { value: "5", label: "Kunden betreut" },
      { value: "2", label: "Projekte abgeschlossen" },
      { value: "9", label: "Beiträge veröffentlicht" },
      { value: "780 €", label: "Produktumsatz (Grundrauschen)" },
    ],
    moved: [
      "<b>Website Content Planner</b> vom losen Konzept zu einer klaren Struktur mit Preisidee weiterentwickelt.",
      "<b>Kickstart your Website</b> Kurs-Skript für 3 weitere Module fertiggestellt.",
      "<b>RemindFuel</b> von unregelmäßigem zu wöchentlichem Rhythmus zurückgefunden.",
    ],
    whereFrom:
      "3 von 5 Kundenprojekten kamen über <b>Empfehlungen</b> — allen voran über Peter, der dich inzwischen zweimal weiterempfohlen hat. Instagram brachte diesen Monat vor allem <b>Sichtbarkeit</b>, noch keine direkten Anfragen.",
    created: [
      "9 veröffentlichte Beiträge über feelweb, Lodora und RemindFuel",
      "2 abgeschlossene Kundenwebsites",
      "1 neues Konzept: 0€ Website Planer",
    ],
    decisions: [
      {
        date: "4. Sep",
        text: "Business OS Konzept gestartet — als internes Tool statt weiterer Zettelwirtschaft.",
      },
      {
        date: "11. Sep",
        text: "Entscheidung: Lodora bekommt einen ruhigeren, selteneren Content-Rhythmus statt festem Wochenplan.",
      },
      {
        date: "16. Sep",
        text: "0€ Website Planer als Vorprodukt vor den Kurs gesetzt, statt ihn direkt zu verkaufen.",
      },
    ],
    changed:
      "Du triffst Entscheidungen inzwischen schneller — bei Lodora hast du dich bewusst gegen einen starren Rhythmus entschieden, statt wie früher lange abzuwägen. Und du lässt Ideen öfter erstmal <b>liegen und reifen</b>, statt sie sofort umzusetzen oder zu verwerfen.",
  },
  quarter: {
    period: "quarter",
    periodLabel: "Q3 2026",
    numbers: [
      { value: "12.400 €", label: "Umsatz" },
      { value: "9", label: "Kunden betreut" },
      { value: "5", label: "Projekte abgeschlossen" },
      { value: "24", label: "Beiträge veröffentlicht" },
      { value: "2.100 €", label: "Produktumsatz (Grundrauschen)" },
    ],
    moved: [
      "<b>Kickstart your Website</b> vom groben Konzept zu einem Kurs mit fertigem Modulplan.",
      "<b>Business OS</b> als eigenes internes Tool angestoßen und zum klickbaren Prototyp gebracht.",
      "<b>RemindFuel</b> von sporadischem Posten zu einem festen wöchentlichen Rhythmus.",
    ],
    whereFrom:
      "Über das Quartal kamen 6 von 9 Kundenprojekten über <b>Empfehlungen</b> — dein stärkster Kanal, ganz ohne Ads. Instagram hat vor allem <b>Sichtbarkeit</b> aufgebaut, noch nicht direkt in Anfragen übersetzt.",
    created: [
      "24 veröffentlichte Beiträge über feelweb, Lodora und RemindFuel",
      "5 abgeschlossene Kundenprojekte",
      "2 neue Konzepte: 0€ Website Planer, Business OS",
    ],
    decisions: [
      {
        date: "Jul",
        text: "Entscheidung: Kickstart your Website wird als eigenständiger Kurs statt als 1:1-Angebot aufgebaut.",
      },
      {
        date: "Aug",
        text: "Lodora bekommt bewusst weniger, dafür ruhigeren Content statt festem Plan.",
      },
      {
        date: "Sep",
        text: "0€ Website Planer als Vorprodukt vor den Kurs gesetzt, statt ihn direkt zu verkaufen.",
      },
    ],
    changed:
      "Du planst inzwischen in Zeiträumen statt in einzelnen Tagen — Projekte wie der Kurs oder das Business OS sind über Wochen gewachsen, statt in einem Rutsch entstehen zu müssen. Und du lässt dich seltener von dringend wirkenden, aber unwichtigen Dingen ablenken.",
  },
  year: {
    period: "year",
    periodLabel: "2026",
    numbers: [
      { value: "38.900 €", label: "Umsatz" },
      { value: "22", label: "Kunden betreut" },
      { value: "14", label: "Projekte abgeschlossen" },
      { value: "96", label: "Beiträge veröffentlicht" },
      { value: "6.400 €", label: "Produktumsatz (Grundrauschen)" },
    ],
    moved: [
      "<b>feelweb</b> von reiner Auftragsarbeit zu einem Studio mit eigenen Produkten (Kurs, Planer, Business OS) weiterentwickelt.",
      "<b>RemindFuel</b> von einer Idee zu einer Marke mit eigener Stimme und treuer kleiner Audience aufgebaut.",
      "<b>Lodora</b> bewusst langsam und mit Substanz statt überstürzt positioniert.",
    ],
    whereFrom:
      "Über das Jahr kamen die meisten Kundenprojekte über <b>Empfehlungen</b> aus deinem bestehenden Netzwerk — Instagram hat vor allem Sichtbarkeit und Vertrauen aufgebaut, das sich erst langfristig auszahlt.",
    created: [
      "96 veröffentlichte Beiträge über feelweb, Lodora und RemindFuel",
      "14 abgeschlossene Kundenprojekte",
      "3 neue eigene Produkte: Kickstart your Website, 0€ Website Planer, Business OS",
    ],
    decisions: [
      {
        date: "Frühjahr",
        text: "Entscheidung, weniger Kundenprojekte gleichzeitig anzunehmen — dafür mit mehr Tiefe.",
      },
      {
        date: "Sommer",
        text: "Kickstart your Website als eigenständiges Produkt statt 1:1-Begleitung aufgesetzt.",
      },
      {
        date: "Winter",
        text: "Business OS als internes Tool gestartet, um Kopf und Kalender zu entlasten.",
      },
    ],
    changed:
      "Du triffst Entscheidungen heute schneller und aus einer ruhigeren Position heraus — mit klareren Grenzen dafür, was du annimmst, und einem wachsenden Vertrauen darin, Dinge auch mal liegen und reifen zu lassen, statt sie sofort zu erzwingen.",
  },
};
