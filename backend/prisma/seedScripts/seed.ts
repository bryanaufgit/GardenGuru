import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const plants = [
  {
    name: "Bogenhanf",
    latinName: "Sansevieria trifasciata",
    light: "hell bis halbschattig",
    water: "wenig",
    image: ""
  },
  {
    name: "Einblatt",
    latinName: "Spathiphyllum wallisii",
    light: "halbschattig bis schattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Glücksfeder",
    latinName: "Zamioculcas zamiifolia",
    light: "halbschattig bis schattig",
    water: "wenig",
    image: ""
  },
  {
    name: "Monstera",
    latinName: "Monstera deliciosa",
    light: "hell, keine direkte Sonne",
    water: "mäßig",
    image: ""
  },
  {
    name: "Ficus Benjamina",
    latinName: "Ficus benjamina",
    light: "hell, keine direkte Sonne",
    water: "mäßig",
    image: ""
  },
  {
    name: "Gummibaum",
    latinName: "Ficus elastica",
    light: "hell, keine direkte Sonne",
    water: "mäßig",
    image: ""
  },
  {
    name: "Yucca Palme",
    latinName: "Yucca elephantipes",
    light: "hell",
    water: "wenig",
    image: ""
  },
  {
    name: "Efeutute",
    latinName: "Epipremnum aureum",
    light: "hell bis halbschattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Drachenbaum",
    latinName: "Dracaena marginata",
    light: "hell bis halbschattig",
    water: "wenig",
    image: ""
  },
  {
    name: "Grünlilie",
    latinName: "Chlorophytum comosum",
    light: "hell bis halbschattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Kentiapalme",
    latinName: "Howea forsteriana",
    light: "halbschattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Zimmertanne",
    latinName: "Araucaria heterophylla",
    light: "hell, keine direkte Sonne",
    water: "mäßig",
    image: ""
  },
  {
    name: "Schusterpalme",
    latinName: "Aspidistra elatior",
    light: "halbschattig bis schattig",
    water: "wenig",
    image: ""
  },
  {
    name: "Zebra-Kaktus",
    latinName: "Haworthia fasciata",
    light: "hell, keine direkte Sonne",
    water: "wenig",
    image: ""
  },
  {
    name: "Birkenfeige",
    latinName: "Ficus benjamina",
    light: "hell, keine direkte Sonne",
    water: "mäßig",
    image: ""
  },
  {
    name: "Korallenkaktus",
    latinName: "Rhipsalis cassutha",
    light: "hell bis halbschattig",
    water: "wenig",
    image: ""
  },
  {
    name: "Aloe Vera",
    latinName: "Aloe barbadensis",
    light: "hell, viel Sonne",
    water: "wenig",
    image: ""
  },
  {
    name: "Fensterblatt",
    latinName: "Monstera deliciosa",
    light: "hell, keine direkte Sonne",
    water: "mäßig",
    image: ""
  },
  {
    name: "Nestfarn",
    latinName: "Asplenium nidus",
    light: "halbschattig",
    water: "viel",
    image: ""
  },
  {
    name: "Kalanchoe",
    latinName: "Kalanchoe blossfeldiana",
    light: "hell, Sonne möglich",
    water: "wenig",
    image: ""
  },
  {
    name: "Glückskastanie",
    latinName: "Pachira aquatica",
    light: "hell, keine direkte Sonne",
    water: "mäßig",
    image: ""
  },
  {
    name: "Schefflera",
    latinName: "Schefflera arboricola",
    light: "hell bis halbschattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Philodendron",
    latinName: "Philodendron scandens",
    light: "halbschattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Zimmerlinde",
    latinName: "Sparrmannia africana",
    light: "hell, keine direkte Sonne",
    water: "viel",
    image: ""
  },
  {
    name: "Elefantenfuß",
    latinName: "Beaucarnea recurvata",
    light: "hell, Sonne möglich",
    water: "wenig",
    image: ""
  },
  {
    name: "Goldfruchtpalme",
    latinName: "Dypsis lutescens",
    light: "hell bis halbschattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Hibiskus",
    latinName: "Hibiscus rosa-sinensis",
    light: "hell, Sonne möglich",
    water: "viel",
    image: ""
  },
  {
    name: "Flamingoblume",
    latinName: "Anthurium andraeanum",
    light: "hell bis halbschattig",
    water: "mäßig",
    image: ""
  },
  {
    name: "Zyperngras",
    latinName: "Cyperus alternifolius",
    light: "hell bis halbschattig",
    water: "viel",
    image: ""
  },
  {
    name: "Säulenkaktus",
    latinName: "Cereus peruvianus",
    light: "viel Sonne",
    water: "wenig",
    image: ""
  }
];

async function main() {
for (const plant of plants) {
  const exists = await prisma.plant.findFirst({
    where: { latinName: plant.latinName },
  });
  if (!exists) {
    await prisma.plant.create({ data: plant });
  } else {
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


