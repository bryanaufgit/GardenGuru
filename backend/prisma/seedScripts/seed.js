"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const plants = [
    {
        name: "Bogenhanf",
        latinName: "Sansevieria trifasciata",
        light: "hell bis halbschattig",
        water: "wenig",
        image: "/public/images/bogenhanf.png",
        wateringInterval: 21, // alle 2–3 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Einblatt",
        latinName: "Spathiphyllum wallisii",
        light: "halbschattig bis schattig",
        water: "mäßig",
        image: "/public/images/einblatt.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Glücksfeder",
        latinName: "Zamioculcas zamiifolia",
        light: "halbschattig bis schattig",
        water: "wenig",
        image: "/public/images/glücksfeder.png",
        wateringInterval: 21, // alle 2–3 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Gummibaum",
        latinName: "Ficus elastica",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/gummibaum.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Yucca Palme",
        latinName: "Yucca elephantipes",
        light: "hell",
        water: "wenig",
        image: "/public/images/yuccapalme.png",
        wateringInterval: 21, // alle 2–3 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Efeutute",
        latinName: "Epipremnum aureum",
        light: "hell bis halbschattig",
        water: "mäßig",
        image: "/public/images/efeutute.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Drachenbaum",
        latinName: "Dracaena marginata",
        light: "hell bis halbschattig",
        water: "wenig",
        image: "/public/images/drachenbaum.png",
        wateringInterval: 10, // alle 10 Tage
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Grünlilie",
        latinName: "Chlorophytum comosum",
        light: "hell bis halbschattig",
        water: "mäßig",
        image: "/public/images/grünlilie.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Kentiapalme",
        latinName: "Howea forsteriana",
        light: "halbschattig",
        water: "mäßig",
        image: "/public/images/kentiapalme.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Zimmertanne",
        latinName: "Araucaria heterophylla",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/zimmertanne.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Schusterpalme",
        latinName: "Aspidistra elatior",
        light: "halbschattig bis schattig",
        water: "wenig",
        image: "/public/images/schusterpalme.png",
        wateringInterval: 14, // alle 2 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Zebra-Kaktus",
        latinName: "Haworthia fasciata",
        light: "hell, keine direkte Sonne",
        water: "wenig",
        image: "/public/images/zebrakaktus.png",
        wateringInterval: 21, // alle 3 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Birkenfeige",
        latinName: "Ficus benjamina",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/birkenfeige.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Korallenkaktus",
        latinName: "Rhipsalis cassutha",
        light: "hell bis halbschattig",
        water: "wenig",
        image: "/public/images/korallenkaktus.png",
        wateringInterval: 10, // alle 10 Tage
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Aloe Vera",
        latinName: "Aloe barbadensis",
        light: "hell, viel Sonne",
        water: "wenig",
        image: "/public/images/aloevera.png",
        wateringInterval: 21, // alle 3 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Fensterblatt",
        latinName: "Monstera deliciosa",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/fensterblatt.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Nestfarn",
        latinName: "Asplenium nidus",
        light: "halbschattig",
        water: "viel",
        image: "/public/images/nestfarn.png",
        wateringInterval: 4, // alle 4 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Kalanchoe",
        latinName: "Kalanchoe blossfeldiana",
        light: "hell, Sonne möglich",
        water: "wenig",
        image: "/public/images/kalanchoe.png",
        wateringInterval: 14, // alle 2 Wochen
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Glückskastanie",
        latinName: "Pachira aquatica",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/glückskastanie.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Schefflera",
        latinName: "Schefflera arboricola",
        light: "hell bis halbschattig",
        water: "mäßig",
        image: "/public/images/schefflera.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Philodendron",
        latinName: "Philodendron scandens",
        light: "halbschattig",
        water: "mäßig",
        image: "/public/images/philodendron.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Zimmerlinde",
        latinName: "Sparrmannia africana",
        light: "hell, keine direkte Sonne",
        water: "viel",
        image: "/public/images/zimmerlinde.png",
        wateringInterval: 4, // alle 4 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Elefantenfuß",
        latinName: "Beaucarnea recurvata",
        light: "hell, Sonne möglich",
        water: "wenig",
        image: "/public/images/elefantenfuß.png",
        wateringInterval: 21, // alle 3 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Goldfruchtpalme",
        latinName: "Dypsis lutescens",
        light: "hell bis halbschattig",
        water: "mäßig",
        image: "/public/images/goldfruchtpalme.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Hibiskus",
        latinName: "Hibiscus rosa-sinensis",
        light: "hell, Sonne möglich",
        water: "viel",
        image: "/public/images/hibiskus.png",
        wateringInterval: 4, // alle 4 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Flamingoblume",
        latinName: "Anthurium andraeanum",
        light: "hell bis halbschattig",
        water: "mäßig",
        image: "/public/images/flamingoblume.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Zyperngras",
        latinName: "Cyperus alternifolius",
        light: "hell bis halbschattig",
        water: "viel",
        image: "/public/images/zyperngras.png",
        wateringInterval: 2, // alle 2 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Säulenkaktus",
        latinName: "Cereus peruvianus",
        light: "viel Sonne",
        water: "wenig",
        image: "/public/images/säulenkaktus.png",
        wateringInterval: 21, // alle 3 Wochen
        fertilizingInterval: 90, // alle 3 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Zwergdattelpalme",
        latinName: "Phoenix roebelenii",
        light: "hell bis halbschattig",
        water: "mäßig",
        image: "/public/images/zwergdattelpalme.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich (Frühjahr/Sommer)
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Ginseng-Feige",
        latinName: "Ficus microcarpa",
        light: "hell bis halbschattig",
        water: "mäßig",
        image: "/public/images/ginseng.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 60, // alle 2 Monate
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Lilie",
        latinName: "Lilium",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/lilie.png",
        wateringInterval: 4, // alle 4 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich (nach Saison)
    },
    {
        name: "Venusfliegenfalle",
        latinName: "Dionaea muscipula",
        light: "hell, direkte Sonne",
        water: "viel, kalkfreies Wasser",
        image: "/public/images/venusfliegenfalle.png",
        wateringInterval: 2, // alle 2 Tage (Substrat stets feucht)
        fertilizingInterval: 90, // alle 3 Monate (sehr sparsam, nur Spezialdünger)
        repottingInterval: 365 // jährlich
    },
    {
        name: "Usambaraveilchen",
        latinName: "Saintpaulia ionantha",
        light: "hell, keine direkte Sonne",
        water: "mäßig, lauwarm, nicht auf die Blätter",
        image: "/public/images/usambaraveilchen.png",
        wateringInterval: 5, // alle 5 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    },
    {
        name: "Tulpe",
        latinName: "Tulipa",
        light: "hell, Sonne möglich",
        water: "mäßig",
        image: "/public/images/tulpe.png",
        wateringInterval: 5, // alle 5 Tage während Vegetation
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich (Zwiebeln ausgraben)
    },
    {
        name: "Sonnenblume",
        latinName: "Helianthus annuus",
        light: "vollsonnig",
        water: "viel",
        image: "/public/images/sonnenblume.png",
        wateringInterval: 2, // alle 2 Tage (v.a. im Sommer)
        fertilizingInterval: 14, // alle 2 Wochen (schneller Wuchs)
        repottingInterval: 365 // jährlich (einjährig, neu säen)
    },
    {
        name: "Rose",
        latinName: "Rosa",
        light: "sonnig",
        water: "mäßig bis viel",
        image: "/public/images/rose.png",
        wateringInterval: 5, // alle 5 Tage
        fertilizingInterval: 30, // monatlich (Frühjahr/Sommer)
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Orchidee",
        latinName: "Phalaenopsis",
        light: "hell, keine direkte Sonne",
        water: "mäßig, nicht zu nass",
        image: "/public/images/orchidee.png",
        wateringInterval: 7, // wöchentlich (bzw. tauchen)
        fertilizingInterval: 21, // alle 3 Wochen (nur Spezialdünger)
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Margerite",
        latinName: "Leucanthemum vulgare",
        light: "sonnig",
        water: "mäßig",
        image: "/public/images/margerite.png",
        wateringInterval: 4, // alle 4 Tage
        fertilizingInterval: 21, // alle 3 Wochen
        repottingInterval: 365 // jährlich
    },
    {
        name: "Lupine",
        latinName: "Lupinus",
        light: "sonnig",
        water: "mäßig",
        image: "/public/images/lupine.png",
        wateringInterval: 5, // alle 5 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich (zweijährig, meist neu säen)
    },
    {
        name: "Lavendel",
        latinName: "Lavandula angustifolia",
        light: "vollsonnig",
        water: "wenig",
        image: "/public/images/lavendel.png",
        wateringInterval: 10, // alle 10 Tage
        fertilizingInterval: 90, // alle 3 Monate (wenig Bedarf)
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Kroton",
        latinName: "Codiaeum variegatum",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/kroton.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Geranie",
        latinName: "Pelargonium",
        light: "sonnig",
        water: "mäßig",
        image: "/public/images/geranie.png",
        wateringInterval: 4, // alle 4 Tage
        fertilizingInterval: 21, // alle 3 Wochen
        repottingInterval: 365 // jährlich (meist neu topfen)
    },
    {
        name: "Geigenfeige",
        latinName: "Ficus lyrata",
        light: "hell, keine direkte Sonne",
        water: "mäßig",
        image: "/public/images/geigenfeige.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Flieder",
        latinName: "Syringa vulgaris",
        light: "sonnig",
        water: "mäßig",
        image: "/public/images/flieder.png",
        wateringInterval: 7, // wöchentlich
        fertilizingInterval: 30, // monatlich (Frühjahr/Sommer)
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Fleißiges Lieschen",
        latinName: "Impatiens walleriana",
        light: "halbschattig",
        water: "viel",
        image: "/public/images/fleißigeslieschen.png",
        wateringInterval: 3, // alle 3 Tage
        fertilizingInterval: 14, // alle 2 Wochen
        repottingInterval: 365 // jährlich (einjährig, meist neu aussäen)
    },
    {
        name: "Feigenkaktus",
        latinName: "Opuntia ficus-indica",
        light: "vollsonnig",
        water: "wenig",
        image: "/public/images/feigenkaktus.png",
        wateringInterval: 21, // alle 3 Wochen
        fertilizingInterval: 90, // alle 3 Monate (Kakteen-Dünger)
        repottingInterval: 730 // alle 2 Jahre
    },
    {
        name: "Dahlie",
        latinName: "Dahlia",
        light: "sonnig",
        water: "mäßig",
        image: "/public/images/dahlie.png",
        wateringInterval: 5, // alle 5 Tage
        fertilizingInterval: 14, // alle 2 Wochen
        repottingInterval: 365 // jährlich (Kübelpflanze, Knollen überwintern)
    },
    {
        name: "Pfeilblatt",
        latinName: "Alocasia",
        light: "hell, keine direkte Sonne",
        water: "viel",
        image: "/public/images/pfeilblatt.png",
        wateringInterval: 5, // alle 5 Tage
        fertilizingInterval: 30, // monatlich
        repottingInterval: 365 // jährlich
    }
];
async function main() {
    for (const plant of plants) {
        const exists = await prisma.plant.findFirst({
            where: { latinName: plant.latinName },
        });
        if (!exists) {
            await prisma.plant.create({ data: plant });
        }
        else {
            await prisma.plant.update({
                where: { id: exists.id },
                data: plant, // aktualisiert alle Felder, auch Bildpfad!
            });
        }
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
