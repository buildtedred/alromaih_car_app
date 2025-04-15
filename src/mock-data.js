// Brand logos - Updated with all brand SVGs
const brandLogos = {
  jetour: "./assets/brands/jetour.svg",
  bestune: "./assets/brands/bestune.svg",
  changan: "./assets/brands/changan.svg",
  chery: "./assets/brands/chery.svg",
  chevrolet: "./assets/brands/chevrolet.svg",
  ford: "./assets/brands/ford.svg",
  haval: "./assets/brands/haval.svg",
  honda: "./assets/brands/honda.svg",
  hongqi: "./assets/brands/hongqi.svg",
  hyundai: "./assets/brands/hyundai.svg",
  mg: "./assets/brands/mg.svg",
  nissan: "./assets/brands/nissan.svg",
  suzuki: "./assets/brands/suzuki.svg",
  toyota: "./assets/brands/toyota.svg",
  kia: "./assets/brands/kia.svg",
  bmw: "./assets/brands/bmw.svg",
  mercedes: "./assets/brands/mercedes.svg",
  audi: "./assets/brands/audi.svg",
  lexus: "./assets/brands/lexus.svg",
  mazda: "./assets/brands/mazda.svg",
}

// Model SVGs - Added SVG icons for car models
const modelSVGs = {
  "jetour-t2": "/models/jetour-t2.svg",
  "jetour-t2-plus": "/models/jetour-t2-plus.svg",
  "jetour-t2-sport": "/models/jetour-t2-sport.svg",
  "jetour-x70": "/models/jetour-x70.svg",
  "jetour-x90": "/models/jetour-x90.svg",
  "jetour-dashing": "/models/jetour-dashing.svg",
  "jetour-x95": "/models/jetour-x95.svg",
  "jetour-t1": "/models/jetour-t1.svg",
  "toyota-camry": "/models/toyota-camry.svg",
  "honda-accord": "/models/honda-accord.svg",
  "toyota-corolla": "/models/toyota-corolla.svg",
  "honda-civic": "/models/honda-civic.svg",
  "hyundai-sonata": "/models/hyundai-sonata.svg",
  "hyundai-tucson": "/models/hyundai-tucson.svg",
  "kia-sportage": "/models/kia-sportage.svg",
  "nissan-altima": "/models/nissan-altima.svg",
}

// Icons - updated with the SVG icons from the image
const icons = {
  fuel: "/icons/Fuel.svg",
  seats: "/icons/Horse.svg",
  transmission: "/icons/Transmission.svg",
  year: "/icons/Calendar.svg",
  currency: "/icons/Currency.svg", // Changed to use capital "C"
}

// Body Types with bilingual names and SVG icons
const bodyTypes = {
  suv: {
    en: "SUV",
    ar: "دفع رباعي",
    icon: "/body-types/suv.svg",
  },
  sedan: {
    en: "Sedan",
    ar: "سيدان",
    icon: "/body-types/sedan.svg",
  },
  hatchback: {
    en: "Hatchback",
    ar: "هاتشباك",
    icon: "/body-types/hatchback.svg",
  },
  crossover: {
    en: "Crossover",
    ar: "كروس أوفر",
    icon: "/body-types/crossover.svg",
  },
  coupe: {
    en: "Coupe",
    ar: "كوبيه",
    icon: "/body-types/coupe.svg",
  },
  convertible: {
    en: "Convertible",
    ar: "مكشوفة",
    icon: "/body-types/convertible.svg",
  },
  pickup: {
    en: "Pickup",
    ar: "بيك أب",
    icon: "/body-types/pickup.svg",
  },
  minivan: {
    en: "Minivan",
    ar: "ميني فان",
    icon: "/body-types/minivan.svg",
  },
}

// Categories with bilingual names
const categories = {
  economy: {
    en: "Economy",
    ar: "اقتصادية",
  },
  compact: {
    en: "Compact",
    ar: "مدمجة",
  },
  midsize: {
    en: "Mid-size",
    ar: "متوسطة الحجم",
  },
  fullsize: {
    en: "Full-size",
    ar: "كاملة الحجم",
  },
  luxury: {
    en: "Luxury",
    ar: "فاخرة",
  },
  sport: {
    en: "Sport",
    ar: "رياضية",
  },
  family: {
    en: "Family",
    ar: "عائلية",
  },
  offroad: {
    en: "Off-road",
    ar: "طرق وعرة",
  },
}

// Brands with bilingual names
const brands = {
  jetour: {
    en: "Jetour",
    ar: "جيتور",
    logo: brandLogos.jetour,
    models: ["t1", "t2", "t2-plus", "t2-sport", "x70", "x90", "x95", "dashing"],
  },
  toyota: {
    en: "Toyota",
    ar: "تويوتا",
    logo: brandLogos.toyota,
    models: ["camry", "corolla", "rav4", "land-cruiser", "highlander"],
  },
  honda: {
    en: "Honda",
    ar: "هوندا",
    logo: brandLogos.honda,
    models: ["accord", "civic", "cr-v", "pilot", "odyssey"],
  },
  hyundai: {
    en: "Hyundai",
    ar: "هيونداي",
    logo: brandLogos.hyundai,
    models: ["sonata", "elantra", "tucson", "santa-fe", "palisade"],
  },
  nissan: {
    en: "Nissan",
    ar: "نيسان",
    logo: brandLogos.nissan,
    models: ["altima", "maxima", "rogue", "pathfinder", "murano"],
  },
  kia: {
    en: "Kia",
    ar: "كيا",
    logo: brandLogos.kia,
    models: ["k5", "forte", "sportage", "sorento", "telluride"],
  },
  ford: {
    en: "Ford",
    ar: "فورد",
    logo: brandLogos.ford,
    models: ["fusion", "mustang", "escape", "explorer", "f-150"],
  },
  chevrolet: {
    en: "Chevrolet",
    ar: "شيفروليه",
    logo: brandLogos.chevrolet,
    models: ["malibu", "camaro", "equinox", "traverse", "tahoe"],
  },
  mg: {
    en: "MG",
    ar: "إم جي",
    logo: brandLogos.mg,
    models: ["5", "6", "zs", "hs", "rx8"],
  },
  chery: {
    en: "Chery",
    ar: "شيري",
    logo: brandLogos.chery,
    models: ["tiggo 2", "tiggo 4", "tiggo 7", "tiggo 8", "arrizo 6"],
  },
}

// Specification property names in both languages
const specNames = {
  // Engine & Performance Group
  fuelType: {
    en: "Fuel Type",
    ar: "نوع الوقود",
  },
  engine: {
    en: "Engine",
    ar: "المحرك",
  },
  power: {
    en: "Power",
    ar: "القوة",
  },
  torque: {
    en: "Torque",
    ar: "عزم الدوران",
  },
  acceleration: {
    en: "Acceleration",
    ar: "التسارع",
  },

  // Dimensions Group
  length: {
    en: "Length",
    ar: "الطول",
  },
  width: {
    en: "Width",
    ar: "العرض",
  },
  height: {
    en: "Height",
    ar: "الارتفاع",
  },
  wheelbase: {
    en: "Wheelbase",
    ar: "قاعدة العجلات",
  },

  // Interior & Capacity Group
  seats: {
    en: "Seats",
    ar: "المقاعد",
  },
  fuelTank: {
    en: "Fuel Tank",
    ar: "خزان الوقود",
  },
  cargoCapacity: {
    en: "Cargo Capacity",
    ar: "سعة الحمولة",
  },

  // Drivetrain Group
  transmission: {
    en: "Transmission",
    ar: "ناقل الحركة",
  },
  driveType: {
    en: "Drive Type",
    ar: "نوع الدفع",
  },
  drivingMode: {
    en: "Driving Mode",
    ar: "وضع القيادة",
  },

  // Safety Group
  airbags: {
    en: "Airbags",
    ar: "الوسائد الهوائية",
  },
  brakes: {
    en: "Brakes",
    ar: "الفرامل",
  },
  parkingSensors: {
    en: "Parking Sensors",
    ar: "حساسات الركن",
  },
  camera: {
    en: "Camera",
    ar: "الكاميرا",
  },

  // Other
  year: {
    en: "Year",
    ar: "السنة",
  },
}

// Specification groups for better organization
const specGroups = {
  engine: {
    en: "Engine & Performance",
    ar: "المحرك والأداء",
    specs: ["fuelType", "engine", "power", "torque", "acceleration"],
  },
  dimensions: {
    en: "Dimensions",
    ar: "الأبعاد",
    specs: ["length", "width", "height", "wheelbase"],
  },
  interior: {
    en: "Interior & Capacity",
    ar: "المقصورة والسعة",
    specs: ["seats", "fuelTank", "cargoCapacity"],
  },
  drivetrain: {
    en: "Drivetrain",
    ar: "نظام الدفع",
    specs: ["transmission", "driveType", "drivingMode"],
  },
  safety: {
    en: "Safety",
    ar: "السلامة",
    specs: ["airbags", "brakes", "parkingSensors", "camera"],
  },
}

// Mock car data with bilingual content - Updated specifications
const carsData = [
  {
    id: 1,
    name: {
      en: "Jetour T2",
      ar: "جيتور T2",
    },
    brand: "jetour",
    model: "t2",
    modelSVG: modelSVGs["jetour-t2"],
    bodyType: "suv",
    category: "midsize",
    brandLogo: brandLogos.jetour,
    // Main image (thumbnail)
    image: require("./assets/images/car1.png"),
    // Additional images using existing car images
    additionalImages: [
      require("./assets/images/car2.png"),
      require("./assets/images/car3.png"),
      require("./assets/images/car3.png"),
    ],
    status: "new",
    modelYear: {
      en: "Full Model 2023",
      ar: "الطراز الكامل 2023",
    },
    cashPrice: 146000,
    installmentPrice: 1940,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2023,
      engine: {
        en: "1.6L Turbo",
        ar: "1.6 لتر توربو",
      },
      power: {
        en: "197 HP",
        ar: "197 حصان",
      },
      torque: {
        en: "290 Nm",
        ar: "290 نيوتن متر",
      },
      acceleration: {
        en: "8.5 seconds",
        ar: "8.5 ثانية",
      },
      length: {
        en: "4,555 mm",
        ar: "4,555 ملم",
      },
      width: {
        en: "1,855 mm",
        ar: "1,855 ملم",
      },
      height: {
        en: "1,719 mm",
        ar: "1,719 ملم",
      },
      wheelbase: {
        en: "2,720 mm",
        ar: "2,720 ملم",
      },
      fuelTank: {
        en: "60 Liters",
        ar: "60 لتر",
      },
      cargoCapacity: {
        en: "600 Liters",
        ar: "600 لتر",
      },
      airbags: {
        en: "6 Airbags",
        ar: "6 وسائد هوائية",
      },
      brakes: {
        en: "Disc Brakes (F/R)",
        ar: "فرامل قرصية (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "360° Camera",
        ar: "كاميرا 360 درجة",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 2,
    name: {
      en: "Jetour T2 Plus",
      ar: "جيتور T2 بلس",
    },
    brand: "jetour",
    model: "t2-plus",
    modelSVG: modelSVGs["jetour-t2-plus"],
    bodyType: "suv",
    category: "midsize",
    brandLogo: brandLogos.jetour,
    image: require("./assets/images/car2.png"),
    additionalImages: [require("./assets/images/car3.png"), require("./assets/images/car1.png")],
    status: "unavailable",
    modelYear: {
      en: "Full Model 2023",
      ar: "الطراز الكامل 2023",
    },
    cashPrice: 156000,
    installmentPrice: 2070,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2023,
      engine: {
        en: "1.6L Turbo",
        ar: "1.6 لتر توربو",
      },
      power: {
        en: "197 HP",
        ar: "197 حصان",
      },
      torque: {
        en: "290 Nm",
        ar: "290 نيوتن متر",
      },
      acceleration: {
        en: "8.2 seconds",
        ar: "8.2 ثانية",
      },
      length: {
        en: "4,555 mm",
        ar: "4,555 ملم",
      },
      width: {
        en: "1,855 mm",
        ar: "1,855 ملم",
      },
      height: {
        en: "1,719 mm",
        ar: "1,719 ملم",
      },
      wheelbase: {
        en: "2,720 mm",
        ar: "2,720 ملم",
      },
      fuelTank: {
        en: "60 Liters",
        ar: "60 لتر",
      },
      cargoCapacity: {
        en: "600 Liters",
        ar: "600 لتر",
      },
      airbags: {
        en: "6 Airbags",
        ar: "6 وسائد هوائية",
      },
      brakes: {
        en: "Ventilated Disc Brakes (F/R)",
        ar: "فرامل قرصية مهواة (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "360° Camera",
        ar: "كاميرا 360 درجة",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 3,
    name: {
      en: "Jetour T2 Sport",
      ar: "جيتور T2 سبورت",
    },
    brand: "jetour",
    model: "t2-sport",
    modelSVG: modelSVGs["jetour-t2-sport"],
    bodyType: "suv",
    category: "sport",
    brandLogo: brandLogos.jetour,
    image: require("./assets/images/car3.png"),
    additionalImages: [require("./assets/images/car2.png"), require("./assets/images/car6.png")],
    status: "discount",
    modelYear: {
      en: "Full Model 2023",
      ar: "الطراز الكامل 2023",
    },
    cashPrice: 165000,
    installmentPrice: 2200,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2023,
      engine: {
        en: "2.0L Turbo",
        ar: "2.0 لتر توربو",
      },
      power: {
        en: "254 HP",
        ar: "254 حصان",
      },
      torque: {
        en: "390 Nm",
        ar: "390 نيوتن متر",
      },
      acceleration: {
        en: "6.9 seconds",
        ar: "6.9 ثانية",
      },
      length: {
        en: "4,560 mm",
        ar: "4,560 ملم",
      },
      width: {
        en: "1,860 mm",
        ar: "1,860 ملم",
      },
      height: {
        en: "1,710 mm",
        ar: "1,710 ملم",
      },
      wheelbase: {
        en: "2,720 mm",
        ar: "2,720 mلم",
      },
      fuelTank: {
        en: "65 Liters",
        ar: "65 لتر",
      },
      cargoCapacity: {
        en: "580 Liters",
        ar: "580 لتر",
      },
      airbags: {
        en: "8 Airbags",
        ar: "8 وسائد هوائية",
      },
      brakes: {
        en: "Ventilated Disc Brakes (F/R)",
        ar: "فرامل قرصية مهواة (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "360° Camera",
        ar: "كاميرا 360 درجة",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  // Continuing with the rest of the cars...
  {
    id: 4,
    name: {
      en: "Jetour X70",
      ar: "جيتور X70",
    },
    brand: "jetour",
    model: "x70",
    modelSVG: modelSVGs["jetour-x70"],
    bodyType: "suv",
    category: "family",
    brandLogo: brandLogos.jetour,
    image: require("./assets/images/car4.png"),
    additionalImages: [require("./assets/images/car5.png"), require("./assets/images/car3.png")],
    status: "new",
    modelYear: {
      en: "Full Model 2024",
      ar: "الطراز الكامل 2024",
    },
    cashPrice: 168000,
    installmentPrice: 2240,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      seats: {
        en: "7 Seats",
        ar: "7 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2024,
      engine: {
        en: "1.5L Turbo",
        ar: "1.5 لتر توربو",
      },
      power: {
        en: "156 HP",
        ar: "156 حصان",
      },
      torque: {
        en: "230 Nm",
        ar: "230 نيوتن متر",
      },
      acceleration: {
        en: "9.5 seconds",
        ar: "9.5 ثانية",
      },
      length: {
        en: "4,720 mm",
        ar: "4,720 ملم",
      },
      width: {
        en: "1,900 mm",
        ar: "1,900 ملم",
      },
      height: {
        en: "1,780 mm",
        ar: "1,780 ملم",
      },
      wheelbase: {
        en: "2,750 mm",
        ar: "2,750 ملم",
      },
      fuelTank: {
        en: "55 Liters",
        ar: "55 لتر",
      },
      cargoCapacity: {
        en: "950 Liters (3rd row folded)",
        ar: "950 لتر (الصف الثالث مطوي)",
      },
      airbags: {
        en: "6 Airbags",
        ar: "6 وسائد هوائية",
      },
      brakes: {
        en: "Disc Brakes (F/R)",
        ar: "فرامل قرصية (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "Rear Camera",
        ar: "كاميرا خلفية",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 5,
    name: {
      en: "Jetour X90",
      ar: "جيتور X90",
    },
    brand: "jetour",
    model: "x90",
    modelSVG: modelSVGs["jetour-x90"],
    bodyType: "suv",
    category: "fullsize",
    brandLogo: brandLogos.jetour,
    image: require("./assets/images/car5.png"),
    additionalImages: [require("./assets/images/car2.png"), require("./assets/images/car3.png")],
    status: "discount",
    modelYear: {
      en: "Full Model 2024",
      ar: "الطراز الكامل 2024",
    },
    cashPrice: 195000,
    installmentPrice: 2590,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      seats: {
        en: "7 Seats",
        ar: "7 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2024,
      engine: {
        en: "1.8L Turbo",
        ar: "1.8 لتر توربو",
      },
      power: {
        en: "177 HP",
        ar: "177 حصان",
      },
      torque: {
        en: "300 Nm",
        ar: "300 نيوتن متر",
      },
      acceleration: {
        en: "9.0 seconds",
        ar: "9.0 ثانية",
      },
      length: {
        en: "4,840 mm",
        ar: "4,840 ملم",
      },
      width: {
        en: "1,925 mm",
        ar: "1,925 ملم",
      },
      height: {
        en: "1,780 mm",
        ar: "1,780 ملم",
      },
      wheelbase: {
        en: "2,850 mm",
        ar: "2,850 ملم",
      },
      fuelTank: {
        en: "65 Liters",
        ar: "65 لتر",
      },
      cargoCapacity: {
        en: "1,100 Liters (3rd row folded)",
        ar: "1,100 لتر (الصف الثالث مطوي)",
      },
      airbags: {
        en: "8 Airbags",
        ar: "8 وسائد هوائية",
      },
      brakes: {
        en: "Ventilated Disc Brakes (F/R)",
        ar: "فرامل قرصية مهواة (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "360° Camera",
        ar: "كاميرا 360 درجة",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 6,
    name: {
      en: "Jetour Dashing",
      ar: "جيتور داشينج",
    },
    brand: "jetour",
    model: "dashing",
    modelSVG: modelSVGs["jetour-dashing"],
    bodyType: "crossover",
    category: "midsize",
    brandLogo: brandLogos.jetour,
    image: require("./assets/images/car6.png"),
    additionalImages: [require("./assets/images/car5.png"), require("./assets/images/car4.png")],
    status: "new",
    modelYear: {
      en: "Full Model 2024",
      ar: "الطراز الكامل 2024",
    },
    cashPrice: 178000,
    installmentPrice: 2370,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2024,
      engine: {
        en: "1.5L Turbo",
        ar: "1.5 لتر توربو",
      },
      power: {
        en: "156 HP",
        ar: "156 حصان",
      },
      torque: {
        en: "230 Nm",
        ar: "230 نيوتن متر",
      },
      acceleration: {
        en: "9.8 seconds",
        ar: "9.8 ثانية",
      },
      length: {
        en: "4,615 mm",
        ar: "4,615 ملم",
      },
      width: {
        en: "1,865 mm",
        ar: "1,865 ملم",
      },
      height: {
        en: "1,700 mm",
        ar: "1,700 ملم",
      },
      wheelbase: {
        en: "2,720 mm",
        ar: "2,720 ملم",
      },
      fuelTank: {
        en: "55 Liters",
        ar: "55 لتر",
      },
      cargoCapacity: {
        en: "540 Liters",
        ar: "540 لتر",
      },
      airbags: {
        en: "6 Airbags",
        ar: "6 وسائد هوائية",
      },
      brakes: {
        en: "Disc Brakes (F/R)",
        ar: "فرامل قرصية (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "Rear Camera",
        ar: "كاميرا خلفية",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 7,
    name: {
      en: "Jetour X95",
      ar: "جيتور X95",
    },
    brand: "jetour",
    model: "x95",
    modelSVG: modelSVGs["jetour-x95"],
    bodyType: "suv",
    category: "luxury",
    brandLogo: brandLogos.jetour,
    image: require("./assets/images/car7.png"),
    additionalImages: [require("./assets/images/car6.png"), require("./assets/images/car5.png")],
    status: "unavailable",
    modelYear: {
      en: "Full Model 2023",
      ar: "الطراز الكامل 2023",
    },
    cashPrice: 210000,
    installmentPrice: 2790,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      seats: {
        en: "7 Seats",
        ar: "7 مقاعد",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2023,
      engine: {
        en: "2.0L Turbo",
        ar: "2.0 لتر توربو",
      },
      power: {
        en: "197 HP",
        ar: "197 حصان",
      },
      torque: {
        en: "340 Nm",
        ar: "340 نيوتن متر",
      },
      acceleration: {
        en: "8.0 seconds",
        ar: "8.0 ثانية",
      },
      length: {
        en: "4,860 mm",
        ar: "4,860 ملم",
      },
      width: {
        en: "1,925 mm",
        ar: "1,925 ملم",
      },
      height: {
        en: "1,785 mm",
        ar: "1,785 ملم",
      },
      wheelbase: {
        en: "2,850 mm",
        ar: "2,850 ملم",
      },
      fuelTank: {
        en: "65 Liters",
        ar: "65 لتر",
      },
      cargoCapacity: {
        en: "1,200 Liters (3rd row folded)",
        ar: "1,200 لتر (الصف الثالث مطوي)",
      },
      airbags: {
        en: "8 Airbags",
        ar: "8 وسائد هوائية",
      },
      brakes: {
        en: "Ventilated Disc Brakes (F/R)",
        ar: "فرامل قرصية مهواة (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "360° Camera",
        ar: "كاميرا 360 درجة",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 8,
    name: {
      en: "Jetour T1",
      ar: "جيتور T1",
    },
    brand: "jetour",
    model: "t1",
    modelSVG: modelSVGs["jetour-t1"],
    bodyType: "suv",
    category: "compact",
    brandLogo: brandLogos.jetour,
    image: require("./assets/images/car8.png"),
    additionalImages: [require("./assets/images/car2.png"), require("./assets/images/car3.png")],
    status: "discount",
    modelYear: {
      en: "Full Model 2023",
      ar: "الطراز الكامل 2023",
    },
    cashPrice: 135000,
    installmentPrice: 1790,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "All-wheel Drive",
        ar: "دفع رباعي",
      },
      drivingMode: {
        en: "Normal, Sport, Sand, Mud",
        ar: "عادي رياضي الرمال الطين",
      },
      year: 2023,
      engine: {
        en: "1.5L Turbo",
        ar: "1.5 لتر توربو",
      },
      power: {
        en: "156 HP",
        ar: "156 حصان",
      },
      torque: {
        en: "230 Nm",
        ar: "230 نيوتن متر",
      },
      acceleration: {
        en: "9.9 seconds",
        ar: "9.9 ثانية",
      },
      length: {
        en: "4,495 mm",
        ar: "4,495 ملم",
      },
      width: {
        en: "1,841 mm",
        ar: "1,841 ملم",
      },
      height: {
        en: "1,670 mm",
        ar: "1,670 ملم",
      },
      wheelbase: {
        en: "2,700 mm",
        ar: "2,700 ملم",
      },
      fuelTank: {
        en: "50 Liters",
        ar: "50 لتر",
      },
      cargoCapacity: {
        en: "450 Liters",
        ar: "450 لتر",
      },
      airbags: {
        en: "6 Airbags",
        ar: "6 وسائد هوائية",
      },
      brakes: {
        en: "Disc Brakes (F/R)",
        ar: "فرامل قرصية (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Rear Only",
        ar: "خلفية فقط",
      },
      camera: {
        en: "Rear Camera",
        ar: "كاميرا خلفية",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 9,
    name: {
      en: "Toyota Camry",
      ar: "تويوتا كامري",
    },
    brand: "toyota",
    model: "camry",
    modelSVG: modelSVGs["toyota-camry"],
    bodyType: "sedan",
    category: "midsize",
    brandLogo: brandLogos.toyota,
    image: require("./assets/images/car9.png"),
    additionalImages: [require("./assets/images/car1.png"), require("./assets/images/car8.png")],
    status: "new",
    modelYear: {
      en: "Full Model 2024",
      ar: "الطراز الكامل 2024",
    },
    cashPrice: 120000,
    installmentPrice: 1600,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "Front-wheel Drive",
        ar: "دفع أمامي",
      },
      year: 2024,
      engine: {
        en: "2.5L",
        ar: "2.5 لتر",
      },
      power: {
        en: "203 HP",
        ar: "203 حصان",
      },
      torque: {
        en: "250 Nm",
        ar: "250 نيوتن متر",
      },
      acceleration: {
        en: "8.3 seconds",
        ar: "8.3 ثانية",
      },
      length: {
        en: "4,880 mm",
        ar: "4,880 ملم",
      },
      width: {
        en: "1,840 mm",
        ar: "1,840 ملم",
      },
      height: {
        en: "1,445 mm",
        ar: "1,445 ملم",
      },
      wheelbase: {
        en: "2,825 mm",
        ar: "2,825 ملم",
      },
      fuelTank: {
        en: "60 Liters",
        ar: "60 لتر",
      },
      cargoCapacity: {
        en: "428 Liters",
        ar: "428 لتر",
      },
      airbags: {
        en: "7 Airbags",
        ar: "7 وسائد هوائية",
      },
      brakes: {
        en: "Disc Brakes (F/R)",
        ar: "فرامل قرصية (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "360° Camera",
        ar: "كاميرا 360 درجة",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
  {
    id: 10,
    name: {
      en: "Honda Accord",
      ar: "هوندا أكورد",
    },
    brand: "honda",
    model: "accord",
    modelSVG: modelSVGs["honda-accord"],
    bodyType: "sedan",
    category: "midsize",
    brandLogo: brandLogos.honda,
    image: require("./assets/images/car10.png"),
    additionalImages: [require("./assets/images/car7.png"), require("./assets/images/car3.png")],
    status: "new",
    modelYear: {
      en: "Full Model 2024",
      ar: "الطراز الكامل 2024",
    },
    cashPrice: 125000,
    installmentPrice: 1650,
    specs: {
      fuelType: {
        en: "Gasoline",
        ar: "بنزين",
      },
      mileage: "43,000 km", // ← Add this field
      location: "Riyadh",   // ← Add this field
      
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد",
      },
      transmission: {
        en: "Automatic",
        ar: "أوتوماتيك",
      },
      driveType: {
        en: "Front-wheel Drive",
        ar: "دفع أمامي",
      },
      year: 2024,
      engine: {
        en: "1.5L Turbo",
        ar: "1.5 لتر توربو",
      },
      power: {
        en: "192 HP",
        ar: "192 حصان",
      },
      torque: {
        en: "260 Nm",
        ar: "260 نيوتن متر",
      },
      acceleration: {
        en: "7.2 seconds",
        ar: "7.2 ثانية",
      },
      length: {
        en: "4,890 mm",
        ar: "4,890 ملم",
      },
      width: {
        en: "1,860 mm",
        ar: "1,860 ملم",
      },
      height: {
        en: "1,450 mm",
        ar: "1,450 ملم",
      },
      wheelbase: {
        en: "2,830 mm",
        ar: "2,830 ملم",
      },
      fuelTank: {
        en: "56 Liters",
        ar: "56 لتر",
      },
      cargoCapacity: {
        en: "473 Liters",
        ar: "473 لتر",
      },
      airbags: {
        en: "8 Airbags",
        ar: "8 وسائد هوائية",
      },
      brakes: {
        en: "Disc Brakes (F/R)",
        ar: "فرامل قرصية (أمامية/خلفية)",
      },
      parkingSensors: {
        en: "Front & Rear",
        ar: "أمامية وخلفية",
      },
      camera: {
        en: "Rear Camera",
        ar: "كاميرا خلفية",
      },
    },
    features: {
      exterior: true,
      interior: true,
      engine: true,
      exteriorFeatures: true,
      safety: true,
      technology: true,
      entertainment: true,
      comfort: true,
    },
    icons: {
      fuel: icons.fuel,
      seats: icons.seats,
      transmission: icons.transmission,
      year: icons.year,
      currency: icons.currency,
    },
  },
]

// Helper function to get specs by group
export const getSpecsByGroup = (car, groupKey, language = "en") => {
  const group = specGroups[groupKey]
  if (!group) return []

  return group.specs
    .map((specKey) => {
      if (!car.specs[specKey]) return null

      return {
        key: specKey,
        name: specNames[specKey] ? specNames[specKey][language] : specKey,
        value: typeof car.specs[specKey] === "object" ? car.specs[specKey][language] : car.specs[specKey].toString(),
      }
    })
    .filter(Boolean)
}

// Function to get all spec groups for a car
export const getAllSpecGroups = (car, language = "en") => {
  return Object.keys(specGroups).map((groupKey) => {
    return {
      groupKey,
      groupName: specGroups[groupKey][language],
      specs: getSpecsByGroup(car, groupKey, language),
    }
  })
}

// Function to get all additional images for a car
export const getAdditionalImages = (car) => {
  return car.additionalImages || []
}

// Function to get all body types
export const getBodyTypes = (language = "en") => {
  return Object.keys(bodyTypes).map((key) => ({
    key,
    name: bodyTypes[key][language],
    icon: bodyTypes[key].icon,
  }))
}

// Function to get all categories
export const getCategories = (language = "en") => {
  return Object.keys(categories).map((key) => ({
    key,
    name: categories[key][language],
  }))
}

// Function to get all brands
export const getBrands = (language = "en") => {
  return Object.keys(brands).map((key) => ({
    key,
    name: brands[key][language],
    logo: brands[key].logo,
    models: brands[key].models,
  }))
}

// Function to get models for a specific brand
export const getModelsByBrand = (brandKey, language = "en") => {
  const brand = brands[brandKey]
  if (!brand) return []

  return brand.models.map((modelKey) => {
    const fullModelKey = `${brandKey}-${modelKey}`
    return {
      key: modelKey,
      name: modelKey, // You might want to add model names in different languages
      svg: modelSVGs[fullModelKey] || null,
    }
  })
}

// Function to filter cars by body type
export const filterCarsByBodyType = (bodyType) => {
  return carsData.filter((car) => car.bodyType === bodyType)
}

// Function to filter cars by category
export const filterCarsByCategory = (category) => {
  return carsData.filter((car) => car.category === category)
}

// Function to filter cars by brand
export const filterCarsByBrand = (brand) => {
  return carsData.filter((car) => car.brand === brand)
}

// Function to filter cars by model
export const filterCarsByModel = (model) => {
  return carsData.filter((car) => car.model === model)
}

// Function to simulate API call with a delay
export const fetchCars = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(carsData)
    }, 500) // 500ms delay to simulate network request
  })
}

// Function to get gallery images with labels
export const getGalleryWithLabels = (car, language = "en") => {
  const galleryLabels = {
    front: {
      en: "Front",
      ar: "أمامي",
    },
    side: {
      en: "Side",
      ar: "جانبي",
    },
    rear: {
      en: "Rear",
      ar: "خلفي",
    },
    interior: {
      en: "Interior",
      ar: "داخلي",
    },
  }

  return Object.keys(car.gallery || {}).map((key) => ({
    key: key,
    image: car.gallery[key],
    label: galleryLabels[key] ? galleryLabels[key][language] : key,
  }))
}

export { bodyTypes, categories, brands, modelSVGs, specGroups, specNames }

export default carsData
