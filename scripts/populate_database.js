const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const manifestPath = path.join(__dirname, 'image_manifest.json');

const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const realHorses = [
  {
    id: "horse_yente",
    slug: "yente",
    name: "Yente",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: true,
    birthDate: "2023-05-18",
    ageYears: 3,
    ageMonths: 4,
    height: 1.66,
    ownAwards: ["🥇 1er premio", "⭐ Categoría Ster", "Full Paper"],
    sire: "Teun 505 Sport AAA",
    grandsire: "Norbert 444 Sport Pref AAA",
    dam: "Mila fan Stal Bellefleur (Kroon AA)",
    showDam: false,
    lineageTranslation: {
      es: "Papá y abuelo triple A: lo más alto del registro holandés. Lo trae en la sangre.",
      en: "Sire and grandsire triple A: the highest tier of the Dutch registry. It runs in his blood."
    },
    description: {
      es: "Ejemplar macho entero de extraordinaria presencia y porte. Calificado con 1er premio y categoría Ster por los jueces de la KFPS en los Países Bajos. Sus papeles avalan la más selecta sangre holandesa tanto por línea paterna (Teun 505) como materna. Excelente temperamento, nobleza absoluta y gran proyección para baile y alta escuela.",
      en: "Exceptional Friesian stallion with commanding presence and nobility. Awarded 1st prize and Ster status by official KFPS judges in the Netherlands. True Full Paper pedigree with Triple A bloodlines."
    },
    hasMovementVideo: true,
    priceMxn: 920000,
    priceUsd: 49000,
    showPrice: false,
    images: manifest.yente.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Yente caballo frisón entero KFPS 1er premio Ster Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Yente Friesian stallion KFPS 1st prize Ster photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_y1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_y2", name: "Certificado Genealógico KFPS (Full Paper)", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true },
      { id: "doc_y3", name: "Certificado Médico Veterinario y Placas Radiológicas", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "veterinaria", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: true,
    order: 1,
    chip: "0493",
    registrationNumber: "202302602",
    vetSummary: {
      es: "Apto para deporte, paseo y cabalgata. Flexiones negativas en cuatro miembros. Placas radiológicas limpias sin hallazgos clínicos.",
      en: "Sound for exhibition and sport. Clean clinical examination, negative flexions."
    },
    seo: {
      titleEs: "Yente · Caballo Frisón Macho Entero Ster Full Paper · Cuadra Imperial Loy",
      titleEn: "Yente · Friesian Stallion Ster Full Paper · Cuadra Imperial Loy",
      descriptionEs: "Hijo de Teun 505 Sport AAA y nieto de Norbert 444 Sport Pref AAA. 1er premio y Ster KFPS. Cita privada en Zapotlanejo, Jalisco.",
      descriptionEn: "Son of Teun 505 Sport AAA. 1st prize and Ster KFPS. Private visit in Zapotlanejo, Jalisco."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_wilco",
    slug: "wilco",
    name: "Wilco WT fan de Boerdam",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: true,
    birthDate: "2023-04-16",
    ageYears: 3,
    ageMonths: 5,
    height: 1.65,
    ownAwards: ["⭐ Categoría Ster", "Full Paper"],
    sire: "Tiede 501 Sport AAA",
    grandsire: "Alwin 469 Sport Pref AAA",
    dam: "Ziba M (Ster)",
    showDam: false,
    lineageTranslation: {
      es: "Papá y abuelo triple A: lo más alto del registro holandés. Lo trae en la sangre.",
      en: "Sire and grandsire triple A: the highest tier of the Dutch registry. It runs in his blood."
    },
    description: {
      es: "Macho entero categoría Ster y Full Paper. Hijo directo del legendario Tiede 501 y nieto de Alwin 469 Preferente. Un caballo con una estampa imponente, crin abundante y movimientos armónicos de gran elevación. Ideal para lucir en cabalgatas y eventos de prestigio.",
      en: "Friesian stallion Ster predicate and Full Paper. Direct son of Tiede 501 Sport AAA and grandson of Alwin 469 Sport Pref AAA."
    },
    hasMovementVideo: true,
    priceMxn: 890000,
    priceUsd: 47000,
    showPrice: false,
    images: manifest.wilco.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Wilco WT fan de Boerdam caballo frisón Ster Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Wilco WT fan de Boerdam Friesian stallion Ster photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_w1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_w2", name: "Certificado Genealógico KFPS (Full Paper)", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true },
      { id: "doc_w3", name: "Dictamen Veterinario Oficial", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "veterinaria", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: true,
    order: 2,
    chip: "6284",
    registrationNumber: "202301998",
    vetSummary: {
      es: "Excelente condición física. Aparato locomotor sano, radiografías aprobadas sin lesiones ni signos degenerativos.",
      en: "Excellent physical condition. Clean veterinary vetting."
    },
    seo: {
      titleEs: "Wilco WT fan de Boerdam · Caballo Frisón Ster Full Paper · Cuadra Imperial Loy",
      titleEn: "Wilco WT fan de Boerdam · Friesian Stallion Ster · Cuadra Imperial Loy",
      descriptionEs: "Hijo de Tiede 501 Sport AAA y nieto de Alwin 469 Sport Pref AAA. Full Paper. Cita privada en Zapotlanejo, Jalisco.",
      descriptionEn: "Son of Tiede 501 Sport AAA. Ster Full Paper. Private appointment in Jalisco."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_yde",
    slug: "yde",
    name: "Yde fan de Kamp",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: true,
    birthDate: "2023-03-31",
    ageYears: 3,
    ageMonths: 6,
    height: 1.72,
    ownAwards: ["🥈 Premiado de potro", "Full Paper"],
    sire: "Wolter 513 AA",
    grandsire: "Eise 489 Sport-Elite AAA",
    dam: "Fopkje fan de Lege Geaën (Ster)",
    showDam: false,
    lineageTranslation: {
      es: "Su abuelo Sport-Elite triple A. Con 1.72 m a la cruz, una alzada que impone donde se pare.",
      en: "Grandsire Sport-Elite triple A. Standing at 1.72 m with imposing stature and reach."
    },
    description: {
      es: "Caballo con una alzada fuera de serie: 1.72 m a la cruz con apenas 3 años y medio. Premiado por el jurado holandés de la KFPS. Hijo de Wolter 513 y nieto del célebre Eise 489 Sport-Elite AAA. Un ejemplar mayúsculo para quien busca un caballo alto, con fuerza, presencia arrolladora y trote poderoso.",
      en: "Majestic Friesian stallion with extraordinary 1.72 m height. Full Paper with grandson bloodline to Eise 489 Sport-Elite AAA."
    },
    hasMovementVideo: true,
    priceMxn: 940000,
    priceUsd: 50000,
    showPrice: false,
    images: manifest.yde.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Yde fan de Kamp caballo frisón alzada 1.72 m Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Yde fan de Kamp Friesian stallion 1.72m photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_yde1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_yde2", name: "Certificado Genealógico KFPS (Full Paper)", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true },
      { id: "doc_yde3", name: "Dictamen Veterinario y Placas Radiológicas", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "veterinaria", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: true,
    order: 3,
    chip: "0814",
    registrationNumber: "202301054",
    vetSummary: {
      es: "Apto para deporte y monta. Gran solidez ósea y aplomos correctos.",
      en: "Sound for riding and sport. Strong bone structure and clean flexions."
    },
    seo: {
      titleEs: "Yde fan de Kamp · Caballo Frisón 1.72 m KFPS Full Paper · Cuadra Imperial Loy",
      titleEn: "Yde fan de Kamp · Friesian Stallion 1.72m KFPS · Cuadra Imperial Loy",
      descriptionEs: "Alzada imponente de 1.72 m a la cruz. Nieto de Eise 489 Sport-Elite AAA. Cita privada en Jalisco.",
      descriptionEn: "Imposing 1.72 m height at withers. Grandson of Eise 489 Sport-Elite AAA."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_xavi",
    slug: "xavi",
    name: "Xavi fan Veldzicht",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: true,
    birthDate: "2023-03-16",
    ageYears: 3,
    ageMonths: 6,
    height: 1.66,
    ownAwards: ["Full Paper"],
    sire: "Wolter 513 AA",
    grandsire: "Fabe 348 Sport Pref",
    dam: "Tanja fan de Mayhoeve (Kroon Pref AA *5)",
    showDam: false,
    lineageTranslation: {
      es: "Su abuelo Preferente: sus hijos salen buenos. Sangre de campeones en sus papeles.",
      en: "Grandsire Preferent: renowned for passing exceptional quality. Champion blood in his papers."
    },
    description: {
      es: "Macho entero con linaje de campeones en su genealogía. Nieto del legendario Fabe 348 Sport Pref e hijo de Wolter 513. Proviene de una madre Kroon Preferente 5 estrellas, lo que certifica una consistencia genética impecable en la raza.",
      en: "Select Friesian stallion carrying premier Dutch lines. Grandson of Fabe 348 Sport Pref and out of a 5-star Kroon dam."
    },
    hasMovementVideo: true,
    priceMxn: 880000,
    priceUsd: 46500,
    showPrice: false,
    images: manifest.xavi.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Xavi fan Veldzicht caballo frisón Full Paper Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Xavi fan Veldzicht Friesian stallion photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_x1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_x2", name: "Certificado Genealógico KFPS (Full Paper)", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: true,
    order: 4,
    chip: "5141",
    registrationNumber: "202300717",
    vetSummary: {
      es: "Revisión veterinaria completa aprobada. Sin problemas de aplomos ni vicios de cuadra.",
      en: "Full veterinary inspection approved. Sound and healthy."
    },
    seo: {
      titleEs: "Xavi fan Veldzicht · Caballo Frisón Full Paper · Cuadra Imperial Loy",
      titleEn: "Xavi fan Veldzicht · Friesian Stallion Full Paper · Cuadra Imperial Loy",
      descriptionEs: "Nieto de Fabe 348 Sport Pref. Full Paper oficial KFPS. Conozca a Xavi en cita privada en Zapotlanejo.",
      descriptionEn: "Grandson of Fabe 348 Sport Pref. Official KFPS Full Paper."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_aylan",
    slug: "aylan",
    name: "Aylan",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: false,
    birthDate: "2024-02-15",
    ageYears: 2,
    ageMonths: 7,
    height: 1.65,
    ownAwards: ["🥈 Premiado de potro"],
    sire: "Hilbrand 525 Sport AAA",
    grandsire: "Hette 481 Sport AAA",
    dam: "Madelief van Schafer",
    showDam: false,
    lineageTranslation: {
      es: "Papá y abuelo triple A: lo más alto del registro holandés. Apenas 2 años y medio y ya 1.65 m a la cruz. Y le falta crecer.",
      en: "Sire and grandsire triple A: the peak of Dutch scoring. Just 2.5 years old and already 1.65 m at withers."
    },
    description: {
      es: "Un potro extraordinario con un desarrollo físico asombroso. Con 2 años y 7 meses ya alcanza 1.65 m a la cruz con gran caja torácica y movimientos amplios. Hijo de Hilbrand 525 triple A y nieto de Hette 481 triple A. Premiado de potro por los inspectores de la KFPS.",
      en: "Spectacular young Friesian colt. Already 1.65 m at 2.5 years with exceptional bone and movement."
    },
    hasMovementVideo: true,
    priceMxn: 820000,
    priceUsd: 43000,
    showPrice: false,
    images: manifest.aylan.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Aylan potro frisón premiado KFPS Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Aylan young Friesian colt photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_a1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_a2", name: "Certificado de Registro KFPS", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: true,
    order: 5,
    chip: "4959",
    registrationNumber: "202400235",
    vetSummary: {
      es: "Potro sano en pleno crecimiento. Óptimo desarrollo músculo-esquelético.",
      en: "Healthy growing colt in optimal physical development."
    },
    seo: {
      titleEs: "Aylan · Potro Frisón Premiado KFPS · Cuadra Imperial Loy",
      titleEn: "Aylan · Young Friesian Colt KFPS · Cuadra Imperial Loy",
      descriptionEs: "Hijo de Hilbrand 525 Sport AAA y nieto de Hette 481 Sport AAA. Cita privada en Jalisco.",
      descriptionEn: "Son of Hilbrand 525 Sport AAA and grandson of Hette 481 Sport AAA."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_ykpe",
    slug: "ykpe",
    name: "Ypke G.",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: false,
    birthDate: "2023-05-19",
    ageYears: 3,
    ageMonths: 4,
    height: 1.67,
    ownAwards: [],
    sire: "Pier 448 Sport AA",
    grandsire: "Beart 411 Sport Pref",
    dam: "Xante",
    showDam: false,
    lineageTranslation: {
      es: "Hijo de Pier 448 y nieto de Beart 411 Preferente. Porte, nobleza y cadencia natural.",
      en: "Son of Pier 448 and grandson of Beart 411 Preferent. Pure nobility and natural rhythm."
    },
    description: {
      es: "Caballo con porte clásico, gran abundancia de pelo y temperamento sumamente noble. Nieto de Beart 411 Preferente, uno de los sementales más influyentes en la historia del frisón moderno por transmitir belleza y mansedumbre.",
      en: "Classic Friesian stallion with dense mane and feathering, grandson of historic Beart 411 Preferent."
    },
    hasMovementVideo: true,
    priceMxn: 840000,
    priceUsd: 44000,
    showPrice: false,
    images: manifest.ykpe.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Ypke G. caballo frisón nobleza y porte Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Ypke G. Friesian stallion photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_yk1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_yk2", name: "Certificado de Registro KFPS", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: true,
    order: 6,
    chip: "0525",
    registrationNumber: "202302638",
    vetSummary: {
      es: "Apto para silla y cabalgatas. Muy manso y dócil al manejo.",
      en: "Sound for saddle and pleasure. Very docile and gentle temperament."
    },
    seo: {
      titleEs: "Ypke G. · Caballo Frisón KFPS · Cuadra Imperial Loy",
      titleEn: "Ypke G. · Friesian Stallion KFPS · Cuadra Imperial Loy",
      descriptionEs: "Nieto de Beart 411 Sport Pref. Nobleza y porte en Zapotlanejo, Jalisco.",
      descriptionEn: "Grandson of Beart 411 Sport Pref. Nobility and presence."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_theo",
    slug: "theo",
    name: "Theo",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: false,
    birthDate: "2022-05-24",
    ageYears: 4,
    ageMonths: 4,
    height: 1.67,
    ownAwards: ["3e premie"],
    sire: "Fonger 478 Sport AAA",
    grandsire: "Olgert 445 Sport-Elite AAA",
    dam: "Wieteke",
    showDam: false,
    lineageTranslation: {
      es: "Papá y abuelo triple A y Sport-Elite. Caballo en toda su madurez y porte.",
      en: "Sire and grandsire triple A and Sport-Elite. Mature horse with commanding carriage."
    },
    description: {
      es: "Macho entero de 4 años, asentado y con gran madurez física y mental. Hijo de Fonger 478 Sport AAA y nieto de Olgert 445 Sport-Elite AAA. Un caballo confiable, de rienda suave y paso seguro, ideal tanto para exhibición como para disfrutar en familia.",
      en: "4-year-old mature Friesian stallion by Fonger 478 Sport AAA and grandson of Olgert 445 Sport-Elite AAA."
    },
    hasMovementVideo: true,
    priceMxn: 870000,
    priceUsd: 46000,
    showPrice: false,
    images: manifest.theo.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Theo caballo frisón entero 4 años Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Theo Friesian stallion 4yo photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_th1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_th2", name: "Certificado KFPS", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: false,
    order: 7,
    chip: "9303",
    registrationNumber: "202202641",
    vetSummary: {
      es: "Caballo adulto en plena fuerza. Dictamen clínico satisfactorio.",
      en: "Mature stallion in full strength. Sound clinical evaluation."
    },
    seo: {
      titleEs: "Theo · Caballo Frisón Macho Entero KFPS · Cuadra Imperial Loy",
      titleEn: "Theo · Friesian Stallion KFPS · Cuadra Imperial Loy",
      descriptionEs: "Hijo de Fonger 478 Sport AAA. Caballo de 4 años en Zapotlanejo, Jalisco.",
      descriptionEn: "Son of Fonger 478 Sport AAA. 4-year-old Friesian stallion."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_tebbe",
    slug: "tebbe",
    name: "Tebbe",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: false,
    birthDate: "2022-05-08",
    ageYears: 4,
    ageMonths: 4,
    height: 1.66,
    ownAwards: [],
    sire: "Gerben 479 Sport AAA",
    grandsire: "Wytse 462 Sport-Elite AAA",
    dam: "Anne Anne S",
    showDam: false,
    lineageTranslation: {
      es: "Hijo de Gerben 479 triple A y nieto de Wytse 462 Sport-Elite. Lo trae en la sangre.",
      en: "Son of Gerben 479 triple A and grandson of Wytse 462 Sport-Elite. In his blood."
    },
    description: {
      es: "Caballo con una presencia imponente y excelente conformación morfológica. Hijo de Gerben 479 Sport AAA, reconocido semental por transmitir fuerza y cadencia, y nieto de Wytse 462. Listo para trabajar en baile o montar en cabalgatas.",
      en: "Stunning Friesian stallion by Gerben 479 Sport AAA and grandson of Wytse 462 Sport-Elite AAA."
    },
    hasMovementVideo: true,
    priceMxn: 860000,
    priceUsd: 45000,
    showPrice: false,
    images: manifest.tebbe.slice(0, 8).map((url, i) => ({
      url,
      altEs: `Tebbe caballo frisón KFPS Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Tebbe Friesian horse photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_tb1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_tb2", name: "Certificado de Registro KFPS", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: false,
    order: 8,
    chip: "2320",
    registrationNumber: "202203577",
    vetSummary: {
      es: "Revisión general favorable. Dentición, cascos y aplomos en orden.",
      en: "Favorable veterinary report. Sound hooves and joints."
    },
    seo: {
      titleEs: "Tebbe · Caballo Frisón KFPS · Cuadra Imperial Loy",
      titleEn: "Tebbe · Friesian Horse KFPS · Cuadra Imperial Loy",
      descriptionEs: "Hijo de Gerben 479 Sport AAA. Cita privada en Zapotlanejo, Jalisco.",
      descriptionEn: "Son of Gerben 479 Sport AAA. Private visit in Jalisco."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "horse_ulke",
    slug: "ulke",
    name: "Ulke van 't Heidehoefke",
    gender: "macho_entero",
    type: "venta",
    status: "disponible",
    fullPaper: false,
    birthDate: "2022-04-16",
    ageYears: 4,
    ageMonths: 5,
    height: 1.64,
    ownAwards: [],
    sire: "Gerben 479 Sport AAA",
    grandsire: "Doaitsen 420 Sport",
    dam: "Teuntje van 't Heidehoefke",
    showDam: false,
    lineageTranslation: {
      es: "Hijo de Gerben 479 Sport AAA. Caballo noble, ideal para baile y paseo familiar.",
      en: "Son of Gerben 479 Sport AAA. Pure nobility, ideal for dance and family trail."
    },
    description: {
      es: "Macho entero de 4 años con un carácter ejemplar, dócil y noble. Línea directa de Gerben 479 Sport AAA y Doaitsen 420 Sport. Un caballo con una morfología compacta, crines onduladas y una disposición extraordinaria al aprendizaje de rienda y pasos de baile.",
      en: "4-year-old Friesian stallion with extraordinary sweet temperament, by Gerben 479 Sport AAA."
    },
    hasMovementVideo: true,
    priceMxn: 850000,
    priceUsd: 44500,
    showPrice: false,
    images: manifest.ulke.slice(0, 7).map((url, i) => ({
      url,
      altEs: `Ulke van 't Heidehoefke caballo frisón noble Cuadra Imperial Loy foto ${i + 1}`,
      altEn: `Ulke van 't Heidehoefke Friesian stallion photo ${i + 1}`,
      isPrimary: i === 0
    })),
    videoUrl: "",
    privateDocs: [
      { id: "doc_ul1", name: "Pasaporte Oficial KFPS - Países Bajos", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "pasaporte", includeInFullPdf: true },
      { id: "doc_ul2", name: "Certificado KFPS", url: "/brand/cuadra-imperial-loy-dorado.svg", type: "kfps", includeInFullPdf: true }
    ],
    fieldVisibility: { fullGenealogyInBasic: false, vetCheckInBasic: false, chipInBasic: false },
    featured: false,
    order: 9,
    chip: "3634",
    registrationNumber: "202201735",
    vetSummary: {
      es: "Salud impecable. Manso al trato con veterinario y herrador.",
      en: "Impeccable health. Gentle with vet and farrier."
    },
    seo: {
      titleEs: "Ulke van 't Heidehoefke · Caballo Frisón KFPS · Cuadra Imperial Loy",
      titleEn: "Ulke van 't Heidehoefke · Friesian Horse · Cuadra Imperial Loy",
      descriptionEs: "Hijo de Gerben 479 Sport AAA. Conozca a Ulke en Zapotlanejo, Jalisco.",
      descriptionEn: "Son of Gerben 479 Sport AAA. Private visit in Jalisco."
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

currentDb.horses = realHorses;

// Update globals: turn off intro blocking overlay, use clean hero.jpg without video
currentDb.globals.intro.enabled = false;
currentDb.globals.intro.videoUrl = "";
currentDb.globals.intro.posterUrl = "/images/hero.jpg";

currentDb.globals.hero.videoUrl = "";
currentDb.globals.hero.posterUrl = "/images/hero.jpg";

fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 2));
console.log('Database updated with all 9 REAL horses and clean hero configuration!');
