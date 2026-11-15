// Grafik foydalanuvchi interfeysli dasturlash — 10 ta nazorat savoli
// To'g'ri javob har doim o[0] da yoziladi, ilova variantlarni aralashtiradi.
const TOPICS = [
  "Foydalanuvchi interfeysi",
  "GUI va CLI",
  "WIMP tamoyili",
  "GUI tarixi",
  "Yaxshi interfeys talablari",
  "Freymvork",
  "Mahalliy va kross-platforma",
  "Qt afzalliklari",
  "Qt Creator",
  "app.exec()"
];

const QUESTIONS = [
  { t: 0, q: "Foydalanuvchi interfeysi deganda nima tushuniladi va u qanday vazifalarni bajaradi?",
    o: ["Inson va dastur o'rtasidagi muloqot vositalari majmui; foydalanuvchidan ma'lumot qabul qiladi, natijani ko'rsatadi va teskari aloqa beradi",
        "Dasturning manba kodi; u faqat kompilyatsiya vazifasini bajaradi",
        "Kompyuterning ichki xotirasi; u ma'lumotlarni saqlash vazifasini bajaradi",
        "Tarmoq protokoli; u faqat ma'lumot uzatish vazifasini bajaradi"],
    e: "UI — foydalanuvchi dastur bilan muloqot qiladigan barcha vositalar. Asosiy vazifalari: kiritishni qabul qilish, natijani ko'rsatish va har bir harakatga javob (feedback) berish." },

  { t: 1, q: "GUI ning CLI dan asosiy farqlari va afzalliklari nimalardan iborat?",
    o: ["GUI oyna, tugma, ikonka kabi grafik elementlar orqali boshqariladi; o'rganish oson, ko'rgazmali va buyruqlarni yodlash talab qilinmaydi",
        "GUI matnli buyruqlar orqali boshqariladi; kam resurs sarflaydi",
        "GUI faqat serverlarda ishlaydi; skript yozish oson",
        "GUI va CLI o'rtasida farq yo'q, ikkalasi ham faqat klaviatura bilan boshqariladi"],
    e: "CLI — matnli buyruqlar interfeysi. GUI esa grafik elementlar va sichqoncha orqali ishlaydi, shuning uchun yangi foydalanuvchilar uchun intuitiv va qulay." },

  { t: 2, q: "WIMP tamoyilining tarkibiy qismlarini izohlang.",
    o: ["Windows (oynalar), Icons (ikonkalar), Menus (menyular), Pointer (ko'rsatkich)",
        "Widgets (vidjetlar), Images (rasmlar), Mouse (sichqoncha), Programs (dasturlar)",
        "Web (veb), Internet, Media (media), Protocol (protokol)",
        "Windows (oynalar), Interface (interfeys), Monitor (monitor), Panel (panel)"],
    e: "Oyna — alohida ish sohasi; ikonka — obyekt yoki amalning kichik rasmi; menyu — buyruqlar ro'yxati; ko'rsatkich — sichqoncha bilan boshqariladigan kursor." },

  { t: 3, q: "Grafik interfeyslar tarixidagi asosiy bosqichlarni sanab bering.",
    o: ["Sketchpad (1963) → Engelbart sichqonchasi (1968) → Xerox Alto (1973) → Apple Macintosh (1984) → Windows (1985, 1995)",
        "Windows 95 → Apple Macintosh → Xerox Alto → Sketchpad",
        "Linux (1991) → Android (2008) → Windows 1.0 → Sketchpad",
        "Xerox Alto → Windows 95 → Sketchpad → Engelbart sichqonchasi"],
    e: "Ivan Sutherland Sketchpad'ni yaratdi, Douglas Engelbart sichqonchani namoyish qildi, Xerox PARC'da WIMP'li Alto yaratildi, so'ng Apple va Microsoft GUI'ni ommalashtirdi." },

  { t: 4, q: "Yaxshi interfeysga qanday talablar qo'yiladi?",
    o: ["Soddalik, izchillik, tezkor teskari aloqa, xatolarga chidamlilik (Undo) va hamma uchun qulaylik",
        "Iloji boricha ko'p rang, animatsiya va tugmalar bo'lishi",
        "Faqat tajribali dasturchilar tushuna olishi",
        "Har bir oynada tugmalarning joyi turlicha bo'lishi"],
    e: "Yaxshi interfeys tushunarli, bir xil qoidalarga amal qiluvchi, har bir harakatga javob beruvchi va xatoni tuzatishga imkon beruvchi bo'lishi kerak." },

  { t: 5, q: "Freymvork nima va u GUI yaratishni qanday soddalashtiradi?",
    o: ["Tayyor komponentlar va tuzilmadan iborat dasturiy asos; tayyor vidjetlar, joylashuv menejerlari va hodisalarni qayta ishlash mexanizmini beradi",
        "Operatsion tizimning bir turi; kompyuterni tezlashtiradi",
        "Kompyuterning apparat qismi; ekranni yaxshilaydi",
        "Ma'lumotlar bazasi; kod yozishni butunlay keraksiz qiladi"],
    e: "Freymvork bilan dasturchi tugma yoki oynani noldan chizmaydi — tayyor komponentlardan foydalanib, faqat dastur mantiqiga e'tibor beradi." },

  { t: 6, q: "Mahalliy va kross-platforma freymvorklar qanday farqlanadi?",
    o: ["Mahalliy freymvork bitta OT uchun (masalan, WPF — Windows), kross-platforma esa bitta kod bilan bir nechta OT da ishlaydi (masalan, Qt)",
        "Mahalliy freymvork barcha OT da ishlaydi, kross-platforma esa faqat bittasida",
        "Mahalliy freymvork faqat brauzerda, kross-platforma faqat telefonda ishlaydi",
        "Ular o'rtasida hech qanday farq yo'q"],
    e: "Mahalliy (native): WinForms/WPF, Cocoa/SwiftUI — OT ga to'liq moslashgan. Kross-platforma: Qt, GTK, Flutter — bir marta yozilib, ko'p joyda ishlaydi." },

  { t: 7, q: "Qt freymvorkining asosiy afzalliklarini izohlang.",
    o: ["Kross-platformalik, signallar va slotlar mexanizmi, boy modullar to'plami, QML va batafsil hujjatlar",
        "Faqat Windows'da ishlashi va faqat Java tilini qo'llashi",
        "Grafik interfeys yarata olmasligi, faqat konsol dasturlar uchunligi",
        "Hech qanday hujjat va hamjamiyatga ega emasligi"],
    e: "Qt C++ da yozilgan, Windows, Linux, macOS, Android, iOS'da ishlaydi; obyektlar signal-slot orqali bog'lanadi; tarmoq, ma'lumotlar bazasi, multimedia modullari bor." },

  { t: 8, q: "Qt Creator tarkibiga qanday vositalar kiradi?",
    o: ["Kod muharriri, Qt Designer (vizual forma muharriri), debugger, yig'ish tizimi (qmake/CMake) va hujjatlar",
        "Adobe Photoshop, Microsoft Word va Excel",
        "Faqat brauzer va pochta dasturi",
        "Faqat antivirus va arxivlovchi"],
    e: "Qt Creator — Qt ilovalari uchun IDE: kod yozish, interfeysni vizual loyihalash, yig'ish va xatolarni tuzatish bir joyda." },

  { t: 9, q: "Eng sodda Qt dasturida app.exec() chaqiruvining vazifasi nima?",
    o: ["Hodisalar tsiklini (event loop) ishga tushiradi va dastur yopilguncha uni ishlab turadi",
        "Dasturni darhol yopadi",
        "Yangi oyna yaratadi",
        "Kodni kompilyatsiya qiladi"],
    e: "app.exec() bo'lmasa, oyna bir lahza ko'rinib dastur tugaydi. U sichqoncha va klaviatura hodisalarini qayta ishlaydi va dastur yopilganda chiqish kodini qaytaradi." }
];
