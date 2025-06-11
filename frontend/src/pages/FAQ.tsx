// FAQ-Seite mit Accordion für GardenGuru
// 7 häufige Fragen + Antworten, optisch im App-Stil
// Nutzt rein React/Tailwind (ohne externe Libs)

import React, { useState } from "react";

const faqData = [
  {
    question: "Wie oft sollte ich meine Zimmerpflanzen gießen?",
    answer:
      "Das hängt von Pflanze, Topfgröße, Standort und Jahreszeit ab. Die meisten Zimmerpflanzen werden gegossen, wenn die oberste Erdschicht trocken ist. Im Winter brauchen sie meist weniger Wasser. Prüfe regelmäßig mit dem Finger und vermeide Staunässe!"
  },
  {
    question: "Woran erkenne ich, dass meine Pflanze zu viel oder zu wenig Wasser bekommt?",
    answer:
      "Typische Anzeichen für zu viel Wasser sind gelbe, matschige Blätter und modrig riechende Erde. Bei Wassermangel werden die Blätter schlaff oder trocken und rollen sich eventuell ein. Die App erinnert dich an das ideale Gießintervall deiner Pflanzen."
  },
  {
    question: "Wie finde ich den richtigen Standort für meine Zimmerpflanze?",
    answer:
      "Achte auf die Lichtbedürfnisse (hell, halbschattig, schattig). Südseiten bieten viel Licht, Nordseiten sind schattig. Blätter mit Sonnenbrand (braune Flecken) deuten auf zu viel Licht hin, vergeilte (langgezogene) Pflanzen auf zu wenig."
  },
  {
    question: "Wann und wie dünge ich meine Pflanzen am besten?",
    answer:
      "In der Wachstumszeit (Frühjahr/Sommer) alle 2-4 Wochen düngen, im Winter meist gar nicht. Flüssigdünger ist am einfachsten. Beachte die Hinweise in der App, die Düngen-Erinnerungen entsprechend dem Pflanzenprofil vorschlägt."
  },
  {
    question: "Wie oft muss ich umtopfen und warum ist das wichtig?",
    answer:
      "Umtopfen ist ca. alle 1-2 Jahre sinnvoll, meist im Frühjahr. Es fördert das Wurzelwachstum und sorgt für frische Erde. Die App gibt dir eine Erinnerung, wenn es wieder Zeit ist, deine Pflanze umzutopfen."
  },
  {
    question: "Welche Erde eignet sich für meine Zimmerpflanze?",
    answer:
      "Nicht jede Pflanze mag Universalblumenerde! Für Sukkulenten und Kakteen gibt es spezielle Mischungen. Palmen, Orchideen oder Farne profitieren oft von ihren eigenen Substraten. Hinweise findest du im Pflanzenprofil."
  },
  {
    question: "Was kann ich gegen Schädlinge tun?",
    answer:
      "Kontrolliere regelmäßig die Blätter (auch Blattunterseiten). Bei Schädlingsbefall helfen meist sanfte Hausmittel wie Seifenlauge oder das Abduschen. Im Zweifel Pflanzen isolieren und professionelle Tipps einholen."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-2xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Häufige Fragen zur Pflanzenpflege</h1>
      <div className="flex flex-col gap-4">
        {faqData.map((faq, idx) => (
          <div key={idx} className="rounded-2xl shadow bg-white border border-primary/10">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left px-6 py-4 text-lg font-semibold flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
              aria-expanded={openIndex === idx}
              type="button"
            >
              <span>{faq.question}</span>
              <span className={`ml-4 transition-transform ${openIndex === idx ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-gray-700 text-base animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}