

import logo from './logo.png'
import logonew from './logonew.png'
import hero from './her.jpg'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about from './19368.jpg'
import payment from './flexiblepay.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import quality from './certifiedpro.png'
import trusted from './customer.png'
import secure from './securepay.png'
import cross_icon from './cross_icon.png'


export const assets = {
    logo,
    hero,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    payment,
    secure,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    quality,
    bin_icon,
    support_img,
    trusted,
    menu_icon,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    logonew,
    about
}
export const products = [
  // Electronics
  {
    _id: "b2b001",
    name: "Wireless Router",
    description: "High-speed dual-band wireless router for office connectivity.",
    price: 4500,
    image: ["router_img1"],
    category: "electronics",
    sizes: [],
    date: 1716700000001,
    bestseller: true
  },
  {
    _id: "b2b002",
    name: "Projector",
    description: "Full HD projector for office presentations and conferences.",
    price: 18000,
    image: ["projector_img1"],
    category: "electronics",
    sizes: [],
    date: 1716700000002,
    bestseller: false
  },
  {
    _id: "b2b003",
    name: "Desktop Computer",
    description: "Business desktop PC with Intel i5, 8GB RAM, and SSD storage.",
    price: 42000,
    image: ["desktop_img1"],
    category: "electronics",
    sizes: [],
    date: 1716700000003,
    bestseller: true
  },

  // Office Supplies
  {
    _id: "b2b004",
    name: "Office Printer",
    description: "Multi-function A4 printer with scan and copy features.",
    price: 12500,
    image: ["printer_img1"],
    category: "office-supplies",
    sizes: [],
    date: 1716700000004,
    bestseller: true
  },
  {
    _id: "b2b005",
    name: "Whiteboard with Stand",
    description: "Magnetic whiteboard with adjustable stand for meetings.",
    price: 3500,
    image: ["whiteboard_img1"],
    category: "office-supplies",
    sizes: [],
    date: 1716700000005,
    bestseller: false
  },

  // Industrial Equipment
  {
    _id: "b2b006",
    name: "Hydraulic Drill Machine",
    description: "Heavy-duty hydraulic drill for factory and industrial use.",
    price: 35000,
    image: ["drill_img1"],
    category: "industrial-equipment",
    sizes: [],
    date: 1716700000006,
    bestseller: true
  },
  {
    _id: "b2b007",
    name: "Welding Machine",
    description: "Portable arc welding machine with safety controls.",
    price: 16000,
    image: ["welding_img1"],
    category: "industrial-equipment",
    sizes: [],
    date: 1716700000007,
    bestseller: false
  },

  // Office Furniture
  {
    _id: "b2b008",
    name: "Ergonomic Office Chair",
    description: "Mesh back chair with adjustable height and lumbar support.",
    price: 8500,
    image: ["chair_img1"],
    category: "office-furniture",
    sizes: [],
    date: 1716700000008,
    bestseller: true
  },
  {
    _id: "b2b009",
    name: "Conference Table",
    description: "Large wooden table suitable for 10–12 people.",
    price: 28000,
    image: ["conference_table_img1"],
    category: "office-furniture",
    sizes: [],
    date: 1716700000009,
    bestseller: false
  },

  // Safety Equipment
  {
    _id: "b2b010",
    name: "Safety Helmet",
    description: "ISI-marked industrial helmet for construction sites.",
    price: 650,
    image: ["helmet_img1"],
    category: "safety-equipment",
    sizes: ["M", "L"],
    date: 1716700000010,
    bestseller: true
  },
  {
    _id: "b2b011",
    name: "Industrial Safety Gloves",
    description: "Cut-resistant gloves for factory and heavy-duty work.",
    price: 300,
    image: ["gloves_img1"],
    category: "safety-equipment",
    sizes: ["M", "L", "XL"],
    date: 1716700000011,
    bestseller: false
  },

  // Electrical Supplies
  {
    _id: "b2b012",
    name: "Copper Electrical Wire (Roll)",
    description: "High-quality insulated copper wire for safe installations.",
    price: 2200,
    image: ["wire_img1"],
    category: "electrical-supplies",
    sizes: [],
    date: 1716700000012,
    bestseller: true
  },
  {
    _id: "b2b013",
    name: "LED Tube Light",
    description: "Energy-efficient 4ft LED tube light for offices.",
    price: 500,
    image: ["led_tube_img1"],
    category: "electrical-supplies",
    sizes: [],
    date: 1716700000013,
    bestseller: false
  },

  // Building Materials
  {
    _id: "b2b014",
    name: "Cement Bag 50kg",
    description: "Premium grade cement for construction projects.",
    price: 450,
    image: ["cement_img1"],
    category: "building-materials",
    sizes: [],
    date: 1716700000014,
    bestseller: true
  },
  {
    _id: "b2b015",
    name: "Steel Rod 12mm",
    description: "High-strength steel rod for structural reinforcement.",
    price: 750,
    image: ["steel_rod_img1"],
    category: "building-materials",
    sizes: [],
    date: 1716700000015,
    bestseller: false
  },

  // Transportation
  {
    _id: "b2b016",
    name: "Hand Pallet Truck",
    description: "Durable hand pallet truck for warehouses.",
    price: 15000,
    image: ["pallet_truck_img1"],
    category: "transportation",
    sizes: [],
    date: 1716700000016,
    bestseller: true
  },
  {
    _id: "b2b017",
    name: "Forklift (3 Ton)",
    description: "Electric forklift suitable for warehouses and factories.",
    price: 550000,
    image: ["forklift_img1"],
    category: "transportation",
    sizes: [],
    date: 1716700000017,
    bestseller: false
  }
];

// export const products = [
//     {
//         _id: "aaaaa",
//         name: "Women Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 100,
//         image: [p_img1],
//         category: "women",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L"],
//         date: 1716634345448,
//         bestseller: true
//     },
//     {
//         _id: "aaaab",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 200,
//         image: [p_img2_1,p_img2_2,p_img2_3,p_img2_4],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["M", "L", "XL"],
//         date: 1716621345448,
//         bestseller: true
//     },
//     {
//         _id: "aaaac",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 220,
//         image: [p_img3],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "L", "XL"],
//         date: 1716234545448,
//         bestseller: true
//     },
//     {
//         _id: "aaaad",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 110,
//         image: [p_img4],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "XXL"],
//         date: 1716621345448,
//         bestseller: true
//     },
//     {
//         _id: "aaaae",
//         name: "Women Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 130,
//         image: [p_img5],
//         category: "women",
//         subCategory: "topwear",
//         sizes: ["M", "L", "XL"],
//         date: 1716622345448,
//         bestseller: true
//     },
//     {
//         _id: "aaaaf",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 140,
//         image: [p_img6],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "L", "XL"],
//         date: 1716623423448,
//         bestseller: true
//     },
//     {
//         _id: "aaaag",
//         name: "Men Tapered Fit Flat-Front Trousers",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 190,
//         image: [p_img7],
//         category: "men",
//         subCategory: "bottomwear",
//         sizes: ["S", "L", "XL"],
//         date: 1716621542448,
//         bestseller: false
//     },
//     {
//         _id: "aaaah",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 140,
//         image: [p_img8],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716622345448,
//         bestseller: false
//     },
//     {
//         _id: "aaaai",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 100,
//         image: [p_img9],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["M", "L", "XL"],
//         date: 1716621235448,
//         bestseller: false
//     },
//     {
//         _id: "aaaaj",
//         name: "Men Tapered Fit Flat-Front Trousers",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 110,
//         image: [p_img10],
//         category: "men",
//         subCategory: "bottomwear",
//         sizes: ["S", "L", "XL"],
//         date: 1716622235448,
//         bestseller: false
//     },
//     {
//         _id: "aaaak",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 120,
//         image: [p_img11],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L"],
//         date: 1716623345448,
//         bestseller: false
//     },
//     {
//         _id: "aaaal",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 150,
//         image: [p_img12],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716624445448,
//         bestseller: false
//     },
//     {
//         _id: "aaaam",
//         name: "Women Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 130,
//         image: [p_img13],
//         category: "women",
//         subCategory: "Topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716625545448,
//         bestseller: false
//     },
//     {
//         _id: "aaaan",
//         name: "Boy Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 160,
//         image: [p_img14],
//         category: "Kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716626645448,
//         bestseller: false
//     },
//     {
//         _id: "aaaao",
//         name: "Men Tapered Fit Flat-Front Trousers",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 140,
//         image: [p_img15],
//         category: "men",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716627745448,
//         bestseller: false
//     },
//     {
//         _id: "aaaap",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 170,
//         image: [p_img16],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716628845448,
//         bestseller: false
//     },
//     {
//         _id: "aaaaq",
//         name: "Men Tapered Fit Flat-Front Trousers",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 150,
//         image: [p_img17],
//         category: "men",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716629945448,
//         bestseller: false
//     },
//     {
//         _id: "aaaar",
//         name: "Boy Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 180,
//         image: [p_img18],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716631045448,
//         bestseller: false
//     },
//     {
//         _id: "aaaas",
//         name: "Boy Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 160,
//         image: [p_img19],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716632145448,
//         bestseller: false
//     },
//     {
//         _id: "aaaat",
//         name: "Women Palazzo Pants with Waist Belt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 190,
//         image: [p_img20],
//         category: "women",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716633245448,
//         bestseller: false
//     },
//     {
//         _id: "aaaau",
//         name: "Women Zip-Front Relaxed Fit Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 170,
//         image: [p_img21],
//         category: "women",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716634345448,
//         bestseller: false
//     },
//     {
//         _id: "aaaav",
//         name: "Women Palazzo Pants with Waist Belt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 200,
//         image: [p_img22],
//         category: "women",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716635445448,
//         bestseller: false
//     },
//     {
//         _id: "aaaaw",
//         name: "Boy Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 180,
//         image: [p_img23],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716636545448,
//         bestseller: false
//     },
//     {
//         _id: "aaaax",
//         name: "Boy Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 210,
//         image: [p_img24],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716637645448,
//         bestseller: false
//     },
//     {
//         _id: "aaaay",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 190,
//         image: [p_img25],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716638745448,
//         bestseller: false
//     },
//     {
//         _id: "aaaaz",
//         name: "Women Zip-Front Relaxed Fit Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 220,
//         image: [p_img26],
//         category: "women",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716639845448,
//         bestseller: false
//     },
//     {
//         _id: "aaaba",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 200,
//         image: [p_img27],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716640945448,
//         bestseller: false
//     },
//     {
//         _id: "aaabb",
//         name: "Men Slim Fit Relaxed Denim Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 230,
//         image: [p_img28],
//         category: "men",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716642045448,
//         bestseller: false
//     },
//     {
//         _id: "aaabc",
//         name: "Women Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 210,
//         image: [p_img29],
//         category: "women",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716643145448,
//         bestseller: false
//     },
//     {
//         _id: "aaabd",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 240,
//         image: [p_img30],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716644245448,
//         bestseller: false
//     },
//     {
//         _id: "aaabe",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 220,
//         image: [p_img31],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716645345448,
//         bestseller: false
//     },
//     {
//         _id: "aaabf",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 250,
//         image: [p_img32],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716646445448,
//         bestseller: false
//     },
//     {
//         _id: "aaabg",
//         name: "Girls Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 230,
//         image: [p_img33],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716647545448,
//         bestseller: false
//     },
//     {
//         _id: "aaabh",
//         name: "Women Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 260,
//         image: [p_img34],
//         category: "women",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716648645448,
//         bestseller: false
//     },
//     {
//         _id: "aaabi",
//         name: "Women Zip-Front Relaxed Fit Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 240,
//         image: [p_img35],
//         category: "women",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716649745448,
//         bestseller: false
//     },
//     {
//         _id: "aaabj",
//         name: "Women Zip-Front Relaxed Fit Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 270,
//         image: [p_img36],
//         category: "women",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716650845448,
//         bestseller: false
//     },
//     {
//         _id: "aaabk",
//         name: "Women Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 250,
//         image: [p_img37],
//         category: "women",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716651945448,
//         bestseller: false
//     },
//     {
//         _id: "aaabl",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 280,
//         image: [p_img38],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716653045448,
//         bestseller: false
//     },
//     {
//         _id: "aaabm",
//         name: "Men Printed Plain Cotton Shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 260,
//         image: [p_img39],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716654145448,
//         bestseller: false
//     },
//     {
//         _id: "aaabn",
//         name: "Men Slim Fit Relaxed Denim Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 290,
//         image: [p_img40],
//         category: "men",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716655245448,
//         bestseller: false
//     },
//     {
//         _id: "aaabo",
//         name: "Men Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 270,
//         image: [p_img41],
//         category: "men",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716656345448,
//         bestseller: false
//     },
//     {
//         _id: "aaabp",
//         name: "Boy Round Neck Pure Cotton T-shirt",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 300,
//         image: [p_img42],
//         category: "kids",
//         subCategory: "topwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716657445448,
//         bestseller: false
//     },
//     {
//         _id: "aaabq",
//         name: "Kid Tapered Slim Fit Trouser",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 280,
//         image: [p_img43],
//         category: "kids",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716658545448,
//         bestseller: false
//     },
//     {
//         _id: "aaabr",
//         name: "Women Zip-Front Relaxed Fit Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 310,
//         image: [p_img44],
//         category: "women",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716659645448,
//         bestseller: false
//     },
//     {
//         _id: "aaabs",
//         name: "Men Slim Fit Relaxed Denim Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 290,
//         image: [p_img45],
//         category: "men",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716660745448,
//         bestseller: false
//     },
//     {
//         _id: "aaabt",
//         name: "Men Slim Fit Relaxed Denim Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 320,
//         image: [p_img46],
//         category: "men",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716661845448,
//         bestseller: false
//     },
//     {
//         _id: "aaabu",
//         name: "Kid Tapered Slim Fit Trouser",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 300,
//         image: [p_img47],
//         category: "kids",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716662945448,
//         bestseller: false
//     },
//     {
//         _id: "aaabv",
//         name: "Men Slim Fit Relaxed Denim Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 330,
//         image: [p_img48],
//         category: "men",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716664045448,
//         bestseller: false
//     },
//     {
//         _id: "aaabw",
//         name: "Kid Tapered Slim Fit Trouser",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 310,
//         image: [p_img49],
//         category: "kids",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716665145448,
//         bestseller: false
//     },
//     {
//         _id: "aaabx",
//         name: "Kid Tapered Slim Fit Trouser",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 340,
//         image: [p_img50],
//         category: "kids",
//         subCategory: "bottomwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716666245448, bestseller: false
//     },
//     {
//         _id: "aaaby",
//         name: "Women Zip-Front Relaxed Fit Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 320,
//         image: [p_img51],
//         category: "women",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716667345448,
//         bestseller: false
//     },
//     {
//         _id: "aaabz",
//         name: "Men Slim Fit Relaxed Denim Jacket",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 350,
//         image: [p_img52],
//         category: "men",
//         subCategory: "winterwear",
//         sizes: ["S", "M", "L", "XL"],
//         date: 1716668445448,
//         bestseller: false
//     }

// ]