/* PATPRO Distribution - Catalogue de produits
   Source : Catalogue officiel 2024 (cat.pdf)
   Modifier librement ce fichier pour ajouter/retirer des produits. */

const SITE = {
  name: "GNI",
  company: "GNI",
  full: "Global Négoce International",
  legal: "Global Négoce International",
  tagline: "Global Commodities Trading",
  email: "contact@gni-trading.com",
  website: "https://www.gni-trading.com",
  websiteLabel: "www.gni-trading.com",
  /* URL publique du site (utilisée par le QR code).
     Laisser "" pour utiliser automatiquement l'URL de la page.
     Une fois le site hébergé, collez ici l'adresse, ex : "https://gni-trading.com" */
  publicUrl: "https://aourfiidir.github.io/GNI-TRADING/",
  positioning: "Marchés mondiaux. Matières premières physiques. Relations durables.",
  intro: "GNI — Global Négoce International est une société de négoce international de matières premières physiques. Nous développons des relations durables avec nos partenaires sur les marchés de l'énergie, de l'agriculture, des métaux et de l'élevage.",
  comingSoon: "Notre nouvelle plateforme digitale est en préparation. Nos activités, notre expertise et nos marchés internationaux seront à découvrir très prochainement.",
  sectors: [
    { n: "01", name: "Énergie", desc: "Pétrole & produits pétroliers", icon: "⛽" },
    { n: "02", name: "Agriculture", desc: "Céréales & matières premières agricoles", icon: "🌾" },
    { n: "03", name: "Métaux", desc: "Métaux de base & ressources minérales", icon: "⚙️" },
    { n: "04", name: "Élevage", desc: "Viande & produits d'origine animale", icon: "🐄" }
  ]
};

/* Contact propre à la marque PATPRO (distribution) */
const PATPRO_CONTACT = {
  legal: "SARL PATPRO DISTRIBUTION",
  address: "Coop El Adala, Jolie Vue, Kouba, Alger",
  phones: ["0560 02 99 51", "0560 02 99 53"],
  email: "patpro.distribution@gmail.com",
  facebook: "PatPro Distribution",
  maps: "https://maps.google.com/?q=" + encodeURIComponent("Coop El Adala Jolie Vue Kouba Alger"),
};

/* Chaque catégorie possède : id, nom, bannière (image), description, et une liste de produits */
const PATPRO = [
  {
    id: "patisserie",
    name: "Les ingrédients de pâtisserie",
    banner: "assets/img/banners/patisserie.jpg",
    products: [
      {
        id: "purees",
        name: "Purées de fruits",
        image: "assets/img/products/purees.jpg",
        desc: "La purée de fruit PATPRO est composée de fruits naturels soigneusement sélectionnés. Sans colorants, sans conservateurs, ni arômes artificiels. Le taux de sucre ajouté est entre 0 et 10%.",
        usage: "Idéale pour réaliser les cocktails, smoothies, glaces, sorbets, pâtes de fruits, mousses, confits, confitures, coulis de fruits…",
        tip: "Pour une qualité optimale, décongeler 24h avant utilisation entre 0 et 4°C. Bien agiter avant l'utilisation.",
        flavors: ["Framboise", "Cassis", "Fruits de la passion", "Ananas", "Abricot", "Fraise", "Kiwi", "Cerise", "Mangue", "Citron vert", "Noix de coco"],
        sizes: ["1 KG"],
        dlc: "24 Mois"
      },
      {
        id: "fourrages",
        name: "Fourrages et Toppings",
        image: "assets/img/products/fourrages.jpg",
        desc: "Préparation prête à l'emploi, thermostable (résistante à la cuisson), à haute teneur en fruits entiers ou en morceaux.",
        usage: "À chaud : fourrage de viennoiseries, biscuits… À froid : fourrage d'entremets, biscuits roulés, tartes et tartelettes, garniture de verrines, topping pour glaces et dessert à l'assiette…",
        flavors: ["Fraise", "Fruits Tropicaux", "Cerise amarena", "Framboise", "Mangue", "Fruits Rouges"],
        sizes: ["2 KG", "380 Gr"],
        dlc: "380 Gr : 24 Mois · 2 KG : 12 Mois"
      },
      {
        id: "vanille",
        name: "Pâte de vanille de Madagascar",
        image: "assets/img/products/vanille.jpg",
        desc: "Pâte aromatisante fabriquée à partir de graines de gousse de vanille cueillie au Nord de Madagascar. Elle parfume et apporte un goût très gourmand aux préparations culinaires.",
        usage: "Aromatisation des gâteaux, glaces, confiseries…",
        sizes: ["70 Gr", "300 Gr", "3 Kg"],
        dlc: "24 Mois"
      },
      {
        id: "noisette",
        name: "Pâte de noisette",
        image: "assets/img/products/noisette.jpg",
        desc: "Pâte pure noisette fabriquée à partir de noisettes soigneusement sélectionnées, torréfiées et broyées, sans ajout de sucre ni d'huiles.",
        usage: "Idéale pour la fabrication de gâteaux, biscuits, pâte à tartiner, glaces, crèmes… Bien mélanger avant utilisation.",
        sizes: ["500 Gr", "1 Kg", "3 Kg"],
        dlc: "12 Mois"
      },
      {
        id: "feuilletine",
        name: "Pailleté feuilletine",
        image: "assets/img/products/feuilletine.jpg",
        desc: "Feuilletine pur beurre fabriquée à partir de brisures de crêpes dentelles croustillantes : l'ingrédient incontournable pour apporter une touche croquante à vos préparations.",
        usage: "Idéale pour pâtisseries, pralinés et bonbons.",
        sizes: ["100 Gr", "250 Gr", "2,5 Kg"],
        dlc: "12 Mois"
      },
      {
        id: "praline",
        name: "Praliné amandes noisettes 50%",
        image: "assets/img/products/praline.jpg",
        desc: "Produit 100% naturel fabriqué de façon artisanale à partir de fruits secs de qualité premium, sans arômes artificiels ni conservateurs.",
        usage: "Idéal pour l'aromatisation des crèmes, entremets, gâteaux et pâtisseries, ainsi que pour le fourrage de bonbons chocolats.",
        sizes: ["200 Gr", "2 Kg"],
        dlc: "12 Mois"
      },
      {
        id: "tonka",
        name: "La fève de Tonka",
        image: "assets/img/products/tonka.jpg",
        desc: "Apporte à vos recettes des arômes extraordinaires, à mi-chemin entre les arômes doux de vanille, amande et caramel…",
        usage: "Se marie à merveille avec les mousses au chocolat, les crèmes, les tartes et les cakes. Également utilisée dans les crèmes au beurre, crème anglaise et crèmes à la vanille.",
        tip: "Râper la fève tonka dans la préparation.",
        sizes: ["45 Gr"],
        dlc: "—"
      }
    ]
  },
  {
    id: "boissons",
    name: "Boissons & cocktails",
    banner: "assets/img/banners/boissons.jpg",
    products: [
      {
        id: "sirops",
        name: "Les sirops WATSON SAYS",
        image: "assets/img/products/sirops.jpg",
        desc: "Exclusivement distribués par PATPRO, fabriqués à partir d'arômes premium avec un parfait équilibre de sucre pour offrir la meilleure aromatisation possible à vos cocktails.",
        usage: "Idéal pour la réalisation de cocktails, smoothies et toutes autres boissons chaudes ou froides. Dilution recommandée entre 4% et 5%.",
        flavors: ["Mangue", "Passion", "Fraise", "Caramel", "Framboise", "Grenadine", "Noisette", "Curaçao", "Vanille", "Noix de coco"],
        sizes: ["1 L"],
        dlc: "24 Mois"
      },
      {
        id: "mixfruits",
        name: "Les Mix Fruits WATSON SAYS",
        image: "assets/img/products/mixfruits.jpg",
        desc: "Exclusivement distribués par PATPRO, fabriqués à partir de fruits et d'arômes naturels, pour un maximum de saveurs aux cocktails.",
        usage: "Idéal pour la réalisation de cocktails, smoothies et toutes autres boissons chaudes ou froides. Dilution recommandée entre 4% et 5%.",
        flavors: ["Mangue", "Fruits de la passion", "Fruits tropicaux", "Pêche", "Framboise", "Fraise", "Fruits des bois", "Mojito"],
        sizes: ["1 L"],
        dlc: "24 Mois"
      }
    ]
  },
  {
    id: "colorants",
    name: "Les colorants",
    banner: "assets/img/banners/colorants.jpg",
    products: [
      {
        id: "colorants",
        name: "Colorants hydrosolubles",
        image: "assets/img/products/colorants.jpg",
        desc: "Colorants alimentaires hydrosolubles hautement concentrés en pigments naturels, ce qui assure une belle finition à vos réalisations. Origine : Italie.",
        usage: "Idéal pour colorer les macarons, la pâte à sucre, les crèmes et tout type de préparations sucrées ou salées.",
        tip: "Dosage indicatif : 0,5 g dans 1 Kg de préparation.",
        flavors: ["Vert menthe", "Violet cassis", "Rouge framboise", "Rouge fraise", "Rose", "Orange", "Jaune orange", "Jaune citron", "Brun chocolat", "Bleu azur", "Blanc"],
        sizes: ["5 Gr", "20 Gr"],
        dlc: "24 à 60 Mois selon la couleur"
      }
    ]
  },
  {
    id: "stabilisants",
    name: "Les stabilisants",
    banner: "assets/img/banners/stabilisants.jpg",
    products: [
      {
        id: "gelatine-poudre",
        name: "Gélatine bovine en poudre",
        image: "assets/img/products/gelatine-poudre.jpg",
        desc: "Produit certifié halal, hautement épaississant et gélifiant pour donner la tenue parfaite à vos réalisations.",
        usage: "Mousses, bavarois, crèmes dessert, gelées et tout type de préparations sucrées ou salées.",
        tip: "Utiliser 350 Gr de gélatine dans 1 L d'eau. Température entre 27° et 32° jusqu'à dissolution complète.",
        sizes: ["30 Gr", "300 Gr", "1 Kg"],
        dlc: "48 Mois"
      },
      {
        id: "gelatine-feuilles",
        name: "Gélatine bovine en feuilles 170 BLOOM",
        image: "assets/img/products/gelatine-feuilles.jpg",
        desc: "Produit certifié halal, hautement épaississant et gélifiant pour donner la tenue parfaite à vos réalisations. Origine : France.",
        usage: "Mousses, bavarois, crèmes dessert, gelées, panna cotta et tout type de préparations sucrées ou salées.",
        tip: "Réhydrater ~10 min dans l'eau froide, essorer puis ajouter à une préparation chaude. Utiliser 100 Gr de feuilles dans 600 Gr d'eau.",
        sizes: ["Sac de 8 feuilles"],
        dlc: "36 Mois"
      },
      {
        id: "gelatine-poisson",
        name: "Gélatine de poisson",
        image: "assets/img/products/gelatine-poisson.jpg",
        desc: "Produit gélifiant issu du collagène présent dans la peau, les écailles et les arêtes de poisson. Produit certifié halal.",
        usage: "Utilisée en pâtisserie comme gélifiant et épaississant pour les bavarois, mousses, charlottes, crèmes dessert, crèmes fouettées et gelées sucrées ou salées.",
        tip: "Entre 65° et 75° jusqu'à dissolution complète.",
        sizes: ["30 Gr", "300 Gr"],
        dlc: "60 Mois"
      },
      {
        id: "pectine-jaune",
        name: "La pectine jaune",
        image: "assets/img/products/pectine-jaune.jpg",
        desc: "Gélifiant pour pâtes de fruits, composée exclusivement d'ingrédients d'origine végétale.",
        usage: "Utilisée dans la confection de pâtes de fruits et confiseries gélifiées. Elle se gélifie dans un environnement acide avec un brix d'environ 75, à prise lente.",
        tip: "Entre 10 et 15 Gr de pectine jaune par 1 Kg de masse.",
        sizes: ["30 Gr", "300 Gr", "1 Kg"],
        dlc: "36 Mois"
      },
      {
        id: "pectine-nh",
        name: "La pectine NH nappage",
        image: "assets/img/products/pectine-nh.jpg",
        desc: "Gélifiant pour nappages, composée exclusivement d'ingrédients d'origine végétale.",
        usage: "Idéale pour les nappages et fourrages, notamment les inserts aux fruits. Destinée à la gélification dans un milieu très riche en eau. Inodore et insipide, elle donne un résultat brillant et ferme.",
        tip: "Entre 20 et 30 Gr de pectine NH par 1 Kg de masse.",
        sizes: ["30 Gr", "300 Gr", "1 Kg"],
        dlc: "36 Mois"
      },
      {
        id: "creme-tartre",
        name: "La crème de tartre",
        image: "assets/img/products/creme-tartre.jpg",
        desc: "Additif alimentaire naturel utilisé comme stabilisant et agent levant dans les meringues, macarons et soufflés. Elle empêche la cristallisation du sucre en confiserie.",
        usage: "Stabilisant et agent levant en pâtisserie et confiserie.",
        tip: "10 Gr de crème de tartre dans 1 KG de blancs d'œufs.",
        sizes: ["30 Gr", "300 Gr"],
        dlc: "—"
      },
      {
        id: "gomme-guar",
        name: "La gomme de Guar",
        image: "assets/img/products/gomme-guar.jpg",
        desc: "Additif alimentaire extrait du haricot de Guar, utilisé dans l'agroalimentaire pour alléger certaines préparations.",
        usage: "Excellent stabilisant et épaississant : glaces et sorbets, pâtisserie, sauces, soupes et certaines préparations boulangères.",
        tip: "Entre 1 à 5 Gr par 1 KG de masse.",
        sizes: ["300 Gr", "1 Kg"],
        dlc: "36 Mois"
      },
      {
        id: "blanc-oeuf",
        name: "Le blanc d'œuf en poudre",
        image: "assets/img/products/blanc-oeuf.jpg",
        desc: "Obtenu à partir de blancs d'œufs simplement déshydratés pour éliminer l'eau, réduit en poudre puis conditionné sous atmosphère contrôlée pour éviter toute contamination.",
        usage: "Utilisé comme stabilisant et épaississant pour les meringues, mousses et macarons.",
        tip: "Pâtisserie, biscuiterie, mousses et meringues : 150 Gr par 1 L d'eau. Macarons et petits fours aux amandes : 75 Gr par 1 L d'eau.",
        sizes: ["230 Gr"],
        dlc: "—"
      }
    ]
  },
  {
    id: "sucres",
    name: "Les sucres",
    banner: "assets/img/banners/sucres.jpg",
    products: [
      {
        id: "dextrose",
        name: "Le dextrose monohydraté",
        image: "assets/img/products/dextrose.jpg",
        desc: "Sucre simple en poudre de saveur peu sucrée, utilisé pour baisser le point de congélation et éviter la cristallisation. Obtenu par hydrolyse de l'amidon.",
        usage: "Confection des glaces, biscuits et pâtisseries comme agent texturant et substrat de fermentation.",
        tip: "Entre 2% et 5% par 1 kilo de masse.",
        sizes: ["30 Gr", "300 Gr", "1 Kg"],
        dlc: "24 Mois"
      },
      {
        id: "glucose",
        name: "Le glucose atomisé",
        image: "assets/img/products/glucose.jpg",
        desc: "Sucre en poudre obtenu à partir de l'amidon stocké dans les plantes, au pouvoir sucrant moins élevé que le saccharose.",
        usage: "Utilisé dans les glaces pour stabiliser et améliorer la texture. Également en pâtisserie pour éviter la cristallisation du sucre, ainsi qu'en confiserie.",
        tip: "Délayer le glucose en poudre dans 15% à 20% d'eau avant utilisation.",
        sizes: ["30 Gr", "300 Gr", "1 Kg"],
        dlc: "24 Mois"
      },
      {
        id: "isomalt",
        name: "L'isomalt",
        image: "assets/img/products/isomalt.jpg",
        desc: "Édulcorant dérivé du saccharose au pouvoir sucrant à moitié moins important que le sucre de table.",
        usage: "Souvent utilisé dans les décors en sucre comme le sucre tiré et le sucre filé.",
        tip: "Dissoudre 28 Gr d'Isomalt dans 100 Gr d'eau.",
        sizes: ["300 Gr", "1 Kg"],
        dlc: "24 Mois"
      }
    ]
  },
  {
    id: "sels",
    name: "Les sels",
    banner: "assets/img/banners/sels.jpg",
    products: [
      {
        id: "fleur-sel",
        name: "La fleur de sel de Guérande",
        image: "assets/img/products/fleur-sel.jpg",
        desc: "Sel marin à gros grains, provenant d'une couche mince de cristaux blancs qui se forment et affleurent la surface des marais salants par l'action évaporative du vent. Structure granulaire molle et humide.",
        usage: "Souvent utilisée dans la confection du fameux caramel au beurre salé, ainsi que dans différentes préparations sucrées et salées.",
        sizes: ["45 Gr", "250 Gr"],
        dlc: "48 Mois"
      },
      {
        id: "sel-sodium",
        name: "Le sel -35% de sodium",
        image: "assets/img/products/sel-sodium.jpg",
        desc: "Sel récolté naturellement par évaporation solaire, il contient -35% de sodium et du potassium contrairement au sel ordinaire.",
        usage: "S'utilise de la même manière que le sel de table ordinaire.",
        sizes: ["200 Gr", "250 Gr"],
        dlc: "48 Mois"
      },
      {
        id: "sel-maldon",
        name: "Le sel de Maldon",
        image: "assets/img/products/sel-maldon.jpg",
        desc: "Sel de mer récolté dans la ville anglaise de Maldon depuis l'époque romaine, de forme pyramidale, utilisé comme sel de finition grâce à ses gros flocons croquants.",
        usage: "Assaisonnement de légumes sautés, poissons, viandes et steaks grillés, salades et œufs brouillés. Également dans les sauces caramel, brownies, biscuits…",
        sizes: ["20 Gr"],
        dlc: "72 Mois"
      },
      {
        id: "sel-noir",
        name: "Le sel noir de Chypre",
        image: "assets/img/products/sel-noir.jpg",
        desc: "Sel marin mélangé à du charbon actif qui lui donne une teinte noire. Il vient de la région de Larnaca sur l'île de Chypre, de forme pyramidale, utilisé comme sel de finition grâce à ses gros flocons croquants.",
        usage: "Assaisonnement des légumes sautés, viandes et steaks grillés, poissons, salades et œufs brouillés. Également utilisé en pâtisserie.",
        sizes: ["25 Gr"],
        dlc: "72 Mois"
      }
    ]
  },
  {
    id: "consommables",
    name: "Les produits consommables",
    banner: "assets/img/banners/consommables.jpg",
    products: [
      {
        id: "consommables",
        name: "Emballages & consommables",
        image: "assets/img/products/consommables.jpg",
        desc: "Gamme de consommables pour les métiers de bouche : feuillettes, feuilles guitare, rouleaux et feuilles rhodoïd, papier de cuisson.",
        items: [
          "Feuillettes de mille feuilles — Boîte 500 pièces · 40×60 cm",
          "Feuilles guitare — Boîte 500 pièces · 13,5×10 cm",
          "Rouleaux rhodoïd — Paquet de 50 pièces · 13,5×10 cm",
          "Feuilles rhodoïd — 40×60 cm",
          "Papier de cuisson — Rouleaux de 100 mètres"
        ],
        sizes: ["Divers"],
        dlc: "—"
      }
    ]
  }
];

/* Puroilia - Huile d'olive */
const PUROILIA = {
  name: "PUROILIA",
  tagline: "Huile d'olive de qualité supérieure",
  intro: "PUROILIA sélectionne des huiles d'olive de qualité supérieure pour les professionnels et les particuliers exigeants. Disponible en plusieurs formats pour répondre à tous les besoins.",
  cover: "assets/img/puroilia-front.jpeg",
  products: [
    {
      id: "puroilia-1l",
      name: "Huile d'olive PUROILIA",
      format: "1 Litre",
      image: "assets/img/puroilia-1l.jpeg",
      desc: "Format idéal pour un usage quotidien en cuisine et en table."
    },
    {
      id: "puroilia-5l",
      name: "Huile d'olive PUROILIA",
      format: "5 Litres",
      image: "assets/img/puroilia-5l.jpeg",
      desc: "Format familial et petites cuisines professionnelles."
    },
    {
      id: "puroilia-10l",
      name: "Huile d'olive PUROILIA",
      format: "10 Litres",
      image: "assets/img/puroilia-10l.jpeg",
      desc: "Format professionnel pour restaurants et collectivités."
    }
  ]
};

/* Réseaux / liens externes */
const LINKS = {
  facebook: "https://www.facebook.com/search/top?q=patpro%20distribution",
  maps: PATPRO_CONTACT.maps
};
