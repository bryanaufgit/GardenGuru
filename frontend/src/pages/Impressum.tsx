// DSGVO-konformes Impressum und Datenschutz für GardenGuru
// Einfaches, modernes Markup, Platzhalter für Kontaktdaten

import React from "react";

export default function Impressum() {
  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 text-sm text-gray-800 overflow-x-auto break-words w-full">
      <h1 className="text-2xl font-bold mb-6 text-primary">Impressum & Datenschutz</h1>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
        <p className="break-words">
          Bryan Pyka<br />
          45475 Mülheim an der Ruhr<br />
          Deutschland<br />
          E-Mail: <a href="mailto:inbox@bryanpyka.de" className="underline break-words">inbox@bryanpyka.de</a><br />
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Haftungsausschluss</h2>
        <p className="break-words">
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Datenschutzerklärung</h2>
        <p className="break-words">
          Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
        </p>
        <p className="mt-2 break-words">
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </p>
        <p className="mt-2 break-words">
          Weitere Hinweise zum Datenschutz finden Sie in der ausführlichen Datenschutzerklärung (auf Anfrage oder per E-Mail erhältlich).
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
        <p className="break-words">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
      <footer className="mt-10 text-xs text-gray-400">Letzte Aktualisierung: September 2025</footer>
    </div>
  );
}