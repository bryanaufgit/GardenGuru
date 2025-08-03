# 🌱 GardenGuru

**Die Web-App für Zimmerpflanzen-Profis & Anfänger**  
> Deine Pflanzen, deine To-dos, dein grüner Daumen – mit Erinnerungen, Katalog, Tipps & Gamification!

---

## 🚀 Projektüberblick

GardenGuru ist eine moderne, cloudbasierte Webanwendung, die Nutzer:innen hilft, ihre Zimmerpflanzen optimal zu pflegen.  
Mit übersichtlichem Dashboard, Pflanzenkatalog, personalisierten Erinnerungen (Gießen, Düngen, Umtopfen), Wunschliste, Tipps und Levelsystem.

---

## ✨ Hauptfunktionen

- **Persönlicher Pflanzenkatalog:** Eigene Pflanzen hinzufügen, Details einsehen, verwalten  
- **Erinnerungen:** Automatische To-dos fürs Gießen, Düngen, Umtopfen  
- **Wunschliste:** Lieblingspflanzen merken  
- **Expertentipps:** Kontextbezogene Pflegehinweise  
- **Gamification:** Levelsystem, Meilensteine, Statistiken  
- **Responsives Design:** Optimal auf Desktop & Mobile  
- **DSGVO-konform:** Keine überflüssige Datenspeicherung

---

## 🛠️ Tech-Stack

- **Frontend:** React (TypeScript), Tailwind CSS, Zustand, Vite  
- **Backend:** Node.js, Express.js, Prisma ORM  
- **Datenbank:** PostgreSQL (gehostet via Neon.tech)  
- **Auth:** Firebase Auth  
- **Hosting:**  
  - Frontend: Vercel  
  - Backend: Render  
  - DB: Neon  
- **Deployment:** GitHub Monorepo, automatische CI/CD

---

## 🔒 Sicherheit & Datenschutz

- Alle Verbindungen sind TLS/SSL-verschlüsselt
- Keine sensiblen Keys im Repo:  
  **Alle Zugangsdaten (.env, serviceAccountKey.json) sind geheim & werden als Secret-Files bei Render/Vercel genutzt**
- Siehe [Impressum & Datenschutzerklärung](https://gardenguru-psi.vercel.app/impressum) in der App
