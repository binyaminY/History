export const LEVEL_COLORS = { beginner: "#52b070" };
export const LEVEL_ORDER = { beginner: 0, intermediate: 0, advanced: 0 };

const EVENTS = {
  he: [
    { id:"egypt", name:"מצרים העתיקה", year:'3100–30 לפנה"ס', era:"עולם עתיק", tags:["civilization","africa"], level:"beginner",
      desc:'אחת הציביליזציות הגדולות בהיסטוריה, שנשלטה על ידי פרעונים לאורך 3,000 שנה. המצרים בנו פירמידות, פיתחו כתב היפרוגליפי ויצרו מערכת ממשל מורכבת.',
      quick:['נשלטה על ידי פרעונים לאורך 3,000 שנה','בנו פירמידות ופיתחו כתב היפרוגליפי','נכבשה על ידי רומא ב-30 לפנה"ס'],
      deep:'מצרים העתיקה הייתה אחת הציביליזציות המתמשכות ביותר בהיסטוריה האנושית — שלושת אלפים שנה של שלטון פרעוני רצוף. הפירמידות של גיזה, שנבנו כקברות לפרעוני שושלת ה-4, הן עדיין מהמבנים המרשימים ביותר שנבנו אי פעם. מעבר לאדריכלות, המצרים פיתחו לוח שנה שנתי, שיטות רפואה מתקדמות, ומערכת כתב שאיפשרה תיעוד מפורט של חייהם. דת מצרים העתיקה הייתה רבת-אלים — עם אוסיריס, איזיס, רע ועוד מאות אלים. אמונה בחיי נצח הובילה למנהג החניטה ולבניית קברות מפוארים. הנהר נילוס היה עורק החיים של הציביליזציה — שטפוניו השנתיות הביאו אדמה פורייה שאיפשרה חקלאות ועושר. שינוי ענק בא עם פלישות של עמי הים, האשורים, הפרסים, היוונים, ולבסוף הרומאים שסיפחו את מצרים ב-30 לפנה"ס.' },

    { id:"mesopotamia", name:"מסופוטמיה — בין שני נהרות", year:'3500–539 לפנה"ס', era:"עולם עתיק", tags:["civilization","middle east"], level:"beginner",
      desc:'ציביליזציה קדומה בין נהרות חידקל ופרת. שומר, אכד ובבל חיו כאן. כאן הומצא הכתב הראשון, גלגל, חוקי חמורבי ועוד.',
      quick:['כתב הראשון בעולם — כתב יתדות','חוקי חמורבי — קוד משפטי קדום','בית לאגדת גן העדן'],
      deep:'מסופוטמיה, "הארץ שבין שני הנהרות", היא אחת מעריסות הציביליזציה הראשונות בעולם. כבר ב-3500 לפנה"ס פיתחו הסומרים כתב יתדות — הכתב הראשון בהיסטוריה האנושית — לתיעוד עסקאות מסחריות. ממלכת אכד תחת סרגון הגדול (2334 לפנה"ס) הייתה כנראה האימפריה הראשונה בעולם, שאיחדה אדמות גדולות תחת שלטון מרכזי. חוקי חמורבי (1754 לפנה"ס) הם אחד הקודים המשפטיים הכתובים הקדומים ביותר, ועקרון "עין תחת עין" מקורו שם. בבל הגדולה, בשיאה, הייתה אחת הערים הגדולות בעולם הקדום — גני בבל התלויים נחשבו לאחד משבעת פלאי העולם. הציביליזציה המסופוטמית הניחה תשתיות לאסטרונומיה, מתמטיקה, ספרות (אפוס גילגמש) ומשפט — שהשפיעו על כל ציביליזציות המזרח התיכון לאחריה.' },

    { id:"greece", name:"יוון הקלאסית", year:'500–323 לפנה"ס', era:"עולם עתיק", tags:["civilization","europe"], level:"beginner",
      desc:"תקופת הזוהר של אתונה. כאן נולדה הדמוקרטיה, הפילוסופיה, הדרמה והאולימפיאדה.",
      quick:["כאן נולדה הדמוקרטיה","סוקרטס, אפלטון, אריסטו","השפיעה על כל תרבות מערבית"],
      deep:'יוון הקלאסית הייתה אחד הרגעים המכוננים של התרבות המערבית. אתונה של פריקלס (494–429 לפנה"ס) ייסדה את הדמוקרטיה הישירה הראשונה בהיסטוריה — אזרחים הצביעו ישירות על חוקים ומדיניות. הפילוסופים הגדולים שינו את האופן שבו האנושות חושבת: סוקרטס פיתח שיטת דיאלוג, אפלטון ייסד את האקדמיה הראשונה, ואריסטו התווה את הלוגיקה, הפוליטיקה, הביולוגיה, המחזאות ועוד. מלחמות הפרסים (490–479 לפנה"ס) — כולל קרב מרתון וגשר תרמופילי — הפכו לסמל ההתנגדות לעריצות. האולימפיאדה הראשונה נערכה ב-776 לפנה"ס כטקס דתי לכבוד זאוס. המורשת היוונית ניכרת עד היום — מאדריכלות הקולוסיאום הרומי ועד לחוקות דמוקרטיות מודרניות.' },

    { id:"persia", name:"האימפריה הפרסית", year:'550–330 לפנה"ס', era:"עולם עתיק", tags:["civilization","middle east","politics"], level:"beginner",
      desc:'כורש הגדול ייסד את האימפריה האכמנית — הגדולה ביותר בעולם בזמנה. ידועה בסובלנות דתית ומנהל מרכזי יעיל.',
      quick:['כורש שחרר את היהודים מבבל','דרכי מלך מרשת את האימפריה','נוצחה על ידי אלכסנדר הגדול'],
      deep:'האימפריה האכמנית בשיאה משלה על כ-44% מאוכלוסיית העולם — היחס הגבוה ביותר בהיסטוריה. כורש הגדול (559–530 לפנה"ס) היה מהשליטים הנאורים ביותר בעולם הקדום: הוא שחרר את היהודים מגלות בבל, הרשה לעמים כבושים לשמור על דתם ותרבותם, ויצר מגילת זכויות אנוש שנחשבת לראשונה בהיסטוריה. רשת דרכי המלך אפשרה תקשורת ומסחר מהירים בין קצוות האימפריה. הפרסים פיתחו מערכת שלטון מחוזית עם סאטרפים (מושלים) שאיפשרה ניהול יעיל של שטחים עצומים. האימפריה נפלה בסופו של דבר לידי אלכסנדר המוקדוני (330 לפנה"ס), אך מורשת פרס הפוליטית, התרבותית והאדריכלית המשיכה לשגשג.' },

    { id:"alexander", name:"אלכסנדר הגדול", year:'336–323 לפנה"ס', era:"עולם עתיק", tags:["war","politics"], level:"beginner",
      desc:"מלך מוקדוניה שכבש אימפריה מיוון ועד הודו בתוך 13 שנה. מסעותיו הפיצו תרבות יוונית.",
      quick:['כבש ממוקדוניה ועד הודו','הפיץ תרבות יוונית','מת בגיל 32'],
      deep:'אלכסנדר, שהיה תלמידו של אריסטו, עלה לשלטון בגיל 20 ועד מותו בגיל 32 כבש את האימפריה הגדולה ביותר שנוצרה בתוך חיי אדם אחד. הוא ניצח בכל קרב שניהל — מגרניקוס, איסוס ועד גאוגמלה — ולא הפסיד אפילו קרב אחד. אלכסנדר ייסד עשרות ערים הנושאות את שמו, הבולטת שבהן אלכסנדריה שבמצרים, שהפכה למרכז תרבות ומדע העולם הקדום. תהליך ה"הלניזציה" — הפצת התרבות, השפה והמדע היווני — שינה לעד את פני המזרח התיכון, פרס ואסיה. עד היום חוקרים דנים בסיבת מותו הפתאומי בבבל: הרעלה? מחלה? שתיינות יתר? מורשתו השפיעה על יוליוס קיסר, נפוליאון ומנהיגים רבים אחרים שחיקו את שיטותיו.' },

    { id:"rome", name:"האימפריה הרומית", year:'27 לפנה"ס – 476', era:"עולם עתיק", tags:["civilization","europe"], level:"beginner",
      desc:'אחת האימפריות הגדולות בהיסטוריה. בשיאה שלטה על 70 מיליון איש מבריטניה ועד מסופוטמיה.',
      quick:["שלטה על רוב העולם הידוע","הניחה יסודות למשפט ושפה מערבית","נפלה ב-476 לספירה"],
      deep:'רומא עברה טרנספורמציה מרפובליקה לאימפריה עם עלייתו של אוגוסטוס קיסר (27 לפנה"ס). בשיאה, האימפריה שלטה על שטח של 5 מיליון קמ"ר ו-70 מיליון אנשים מצפון אנגליה ועד הפרת. הרומאים בנו רשת כבישים של 400,000 ק"מ (האמרה "כל הדרכים מובילות לרומא" מעוגנת במציאות), מערכות אקוודוקט מתוחכמות, ובנייה שתכלול פנתיאון וקולוסיאום. המשפט הרומי — עקרונות כמו חזקת חפות ועדות בפני שופט — הם יסוד המשפט המערבי עד היום. נפילת רומא המערבית (476 לספירה) הייתה תהליך הדרגתי: פלישות של עמי גרמניה, שחיתות, קשיים כלכליים ופירוק הצבא. רומא המזרחית (ביזנטיון) המשיכה לשגשג עד 1453.' },

    { id:"china_han", name:"שושלת האן — סין", year:'206 לפנה"ס – 220', era:"עולם עתיק", tags:["civilization","science"], level:"beginner",
      desc:'שושלת האן שלטה על סין מעל 400 שנה. דרך המשי הפכה לנתיב מסחר עולמי. נייר ואמצעים אחרים הומצאו בתקופה זו.',
      quick:['דרך המשי חיברה מזרח ומערב','הומצא הנייר ב-105 לספירה','ביססה את הזהות הסינית לדורות'],
      deep:'שושלת האן (206 לפנה"ס – 220 לספירה) היא אחת התקופות המכוננות בהיסטוריה הסינית — כה מכוננת שהסינים קוראים לעצמם עד היום "עם האן". קיסר האן הגדול ווי-דה ביסס מערכת בירוקרטיה המבוססת על בחינות כישורים — רעיון מהפכני שהפך את השכלה לדרך לקריירה ממשלתית. דרך המשי, שנפתחה בתקופת האן, חיברה לראשונה את אסיה, המזרח התיכון ואירופה ברשת מסחר שהזרימה משי, תבלינים, רעיונות ומחלות. המצאות תקופת האן כוללות את הנייר (105 לספירה), עוגן בטן, הפנדולום ועוד. האסטרונומים של האן תיעדו כוכבי שביט ויצרו מפות כוכבים מדויקות. נפילת האן הובילה ל-400 שנות פיצול, אבל הנורמות המנהליות, התרבותיות והפילוסופיות שביסס נשארו בסין לאלפי שנים.' },

    { id:"islam", name:"עלייתה של האסלאם", year:"610–750", era:"ימי הביניים", tags:["religion","middle east"], level:"beginner",
      desc:"מוחמד ייסד את הדת האסלאמית בשנת 610. תוך מאה שנה פשטה מספרד ועד פרס.",
      quick:["ייסוד האסלאם ב-610","התפשטות מספרד ועד פרס","שמרה על ידע מדעי קדום"],
      deep:'מוחמד, סוחר מעיר מכה, קיבל את ההתגלות הראשונה ב-610 לספירה ופתח מהפכה דתית, פוליטית וחברתית. תוך 100 שנה ממותו (632 לספירה), האסלאם הפך לאחת הכוחות הגדולים בעולם — מחצי האי איבריה (ספרד) ועד הודוס בפקיסטן. בגדד, שנוסדה ב-762, הפכה לעיר הגדולה בעולם ולמרכז של "תור הזהב האסלאמי" — תקופה שבה מדענים מוסלמים תרמו מהותית למתמטיקה (אלגברה), אסטרונומיה, רפואה ופילוסופיה, ושמרו ותרגמו כתבים יווניים קלאסיים שאבדו לאירופה. חלוקת האסלאם לסוני ושיעי נבעה ממחלוקת על הירושה הדתית-פוליטית לאחר מות מוחמד — ניגוד שנמשך עד ימינו.' },

    { id:"vikings", name:"תקופת הוויקינגים", year:"793–1066", era:"ימי הביניים", tags:["war","europe"], level:"beginner",
      desc:'לוחמי ים נורדים שפשטו על אירופה, גילו את אמריקה לפני קולומבוס והקימו נתיבי מסחר מרוסיה ועד ביזנטיון.',
      quick:['גילו את אמריקה ב-1000 לספירה','נתיבי מסחר מסקנדינביה לבגדד','שינו את מפת אירופה'],
      deep:'הוויקינגים לא היו רק שודדי ים — הם היו גם סוחרים, מגלי ארצות ומייסדי ממלכות. לייף אריקסון הגיע לצפון אמריקה ב-1000 לספירה — כ-500 שנה לפני קולומבוס. ויקינגים מסקנדינביה הקימו נתיבי מסחר שחיברו את בריטניה ועד לבגדד דרך נהרות רוסיה. נורמנים (ויקינגים שהתיישבו בצרפת) כבשו את אנגליה ב-1066 תחת ויליאם הכובש — אחד האירועים המעצבים ביותר בהיסטוריה הבריטית. הוויקינגים ייסדו את דבלין, קייב, נורמנדי ועוד. ספינות ה-Longship שלהם היו גאון הנדסי — עמוקות מספיק לניווט בים, שטוחות מספיק לניווט בנהרות. הדת הנורדית עם אודין, ת'ור ומיתוס ראגנרוק הותירה עקבות בשפה האנגלית (Thursday = Thor\'s day).' },

    { id:"crusades", name:"מסעי הצלב", year:"1096–1291", era:"ימי הביניים", tags:["war","religion","middle east"], level:"beginner",
      desc:"מסעות צבאיים לכיבוש ארץ הקודש. הותירו צלקות ביחסים בין דתות.",
      quick:["8 מסעות עיקריים","ירושלים נכבשה ואבדה","עיצבו יחסים נוצרים-מוסלמים לדורות"],
      deep:'מסעות הצלב החלו ב-1096 לאחר שאפיפיור אורבנוס השני קרא לשחרור ירושלים מהמוסלמים. מסע הצלב הראשון (1099) כבש את ירושלים בטבח נורא — עדויות מתארות רחובות מכוסים דם. מסע הצלב השלישי (1189–1192) — הידוע ביותר — הביא לעימות בין ריצ\'רד לב-הארי (אנגליה) וצלאח אלדין (האסלאם) שהפך לאחד הסכסוכים האגדיים בהיסטוריה. מסעות הצלב שינו את אירופה עמוקות: הם פתחו ערוצי מסחר עם המזרח, הביאו ידע, תבלינים ורעיונות שהניעו את הרנסאנס. הם גם הותירו צלקות ביחסי נוצרים-מוסלמים-יהודים שנמשכות עד היום. מסעות הצלב נגמרו ב-1291 עם נפילת עכו — הנקודה האחרונה שנותרה בידי הצלבנים בארץ ישראל.' },

    { id:"mongols", name:"האימפריה המונגולית", year:"1206–1368", era:"ימי הביניים", tags:["war","global"], level:"beginner",
      desc:"ג'ינגיס חאן ייסד את האימפריה היבשתית הגדולה ביותר בהיסטוריה. שלטה מסין ועד מזרח אירופה.",
      quick:["האימפריה היבשתית הגדולה אי פעם","ג'ינגיס חאן איחד את השבטים","הביאה דרכי מסחר ומגפות"],
      deep:"ג'ינגיס חאן (1162–1227) איחד את השבטים הנוודים של מונגוליה ב-1206 ובנה מה שהפך לאימפריה היבשתית הגדולה בהיסטוריה — 24 מיליון קמ\"ר. הסוד להצלחה המונגולית היה שילוב של מהירות (פרשים), טקטיקה מתוחכמת ואינטליגנציה צבאית מעולה. הם השמידו ערים שהתנגדו (בגדד ב-1258 — ספריות ואוצרות אבדו לנצח), אבל שמרו על ערים שנכנעו והפיצו מסחר ותרבות. ה'Pax Mongolica' — תקופת השלום המונגולית — אפשרה למסחר לנוע בבטחה מסין ועד אירופה, ואיפשרה למרקו פולו לנסוע למזרח. אחד מהמורשות המסתתרות של המונגולים: הם סייעו בהפצת מגיפת המוות השחור שהרגה שליש מאירופה." },

    { id:"blackdeath", name:"המוות השחור", year:"1347–1351", era:"ימי הביניים", tags:["science","europe"], level:"beginner",
      desc:"מגיפת הדבר הקשה ביותר בהיסטוריה — הרגה שליש מאוכלוסיית אירופה.",
      quick:["הרגה שליש מאירופה","שינתה כלכלה וחברה","האיצה את סוף ימי הביניים"],
      deep:'המוות השחור — מגיפת הבועות (Bubonic Plague) — הגיעה לאירופה מאסיה ב-1347 דרך נמלים בסיציליה. תוך חמש שנים מתה כ-25–50 מיליון איש — כשליש עד מחצית מאוכלוסיית אירופה. הבקטריה Yersinia pestis הועברה על ידי פרעושים שעל חולדות, אך אנשי התקופה לא ידעו זאת — הם האשימו יהודים, אוויר רע, ועונש אלוהי. ההשפעה החברתית הייתה עצומה: מחסור בפועלים שיפר את מעמד האיכרים ותרם לפירוק מערכת האצולה הפיאודלית. הכנסייה, שלא הצליחה לעצור את המגיפה, איבדה חלק ממעמדה. אמנות "מחול המוות" (Danse Macabre) פרחה כביטוי לאובססיה עם המוות. המגיפה חזרה בגלים נוספים עד המאה ה-18.' },

    { id:"renaissance", name:"הרנסאנס", year:"1300–1600", era:'המאה ה-15–16', tags:["science","civilization","europe"], level:"beginner",
      desc:'תחייה תרבותית באיטליה שהפיחה רוח חדשה באמנות, מדע וספרות. לאונרדו דה וינצ\'י, מיכלאנג\'לו ועוד שינו את העולם.',
      quick:['לאונרדו, מיכלאנג\'לו, רפאל','תחייה של ידע יווני-רומי','פריחת האמנות והמדע'],
      deep:"הרנסאנס ('התחייה') החל בפירנצה של המאה ה-14, שם משפחות עשירות כמו מדיצ'י מימנו אמנות ומדע. לראשונה מאז יוון העתיקה, האדם עצמו — ולא האל בלבד — הפך למרכז העניין. לאונרדו דה וינצ'י (1452–1519) היה גאון אוניברסלי: ציור, פסל, הנדסה, אנטומיה, מוזיקה — בכולם הושג. מיכלאנג'לו צייר את תקרת הכנסייה הסיסטינית (1508–1512) ופסל את הדוד. גוטנברג והדפוס (1440) הפצת ידע ורעיונות בקנה מידה שלא נראה מעולם. הרנסאנס לא היה רק אמנות — הוא כלל מהפכה מדעית: קופרניקוס (כדור הארץ סובב את השמש), גלילאו, קפלר — כולם חלק מהתמורה שהרנסאנס הניע." },

    { id:"columbus", name:"גילוי אמריקה", year:"1492", era:'המאה ה-15–16', tags:["science","global"], level:"beginner",
      desc:"כריסטופר קולומבוס הפליג מספרד וגילה את אמריקה ב-1492, פותח עידן של חקר ועידן ההתנחלויות האירופאיות.",
      quick:["1492 — קולומבוס מגיע לאמריקה","שינה לחלוטין את ההיסטוריה העולמית","הוביל לכיבוש ואוכלוסין אירופאיים"],
      deep:'ב-3 באוגוסט 1492 יצא קולומבוס עם 3 ספינות ו-90 איש מפאלוס, ספרד. ב-12 באוקטובר הגיע לאיי הבהאמה — ופתח את "החלפה הקולומביאנית": זרם עצום של צמחים, בעלי חיים, מחלות, בני אדם ורעיונות בין שני העולמות. לאמריקה הגיעו: חיטה, סוסים, חזירים, גפנים — ומחלות כגדעון האבעבועות שהרגו עד 90% מהאוכלוסייה הילידית שלא הייתה לה חסינות. מאירופה הגיעו: תפוחי אדמה, עגבניות, תירס, קקאו, טבק — שינו לחלוטין את התזונה האירופית ואוכלוסיות העולם. הכיבוש הספרדי של אימפריות האצטקים (1521) והאינקה (1533) השמיד ציביליזציות עתיקות ועשירות.' },

    { id:"ottoman", name:"האימפריה העות'מאנית", year:"1299–1922", era:'המאה ה-15–16', tags:["civilization","politics","middle east"], level:"beginner",
      desc:"אחת האימפריות הגדולות בהיסטוריה, ששלטה על המזרח התיכון, צפון אפריקה ומזרח אירופה במשך 600 שנה.",
      quick:["600 שנות שלטון","שלטה על ירושלים 400 שנה","התפרקה אחרי מלחמת העולם הראשונה"],
      deep:'האימפריה העות\'מאנית נוסדה ב-1299 על ידי עות\'מאן הראשון ונמשכה עד 1922 — 623 שנה מרשימות. הרגע המכריע היה 1453 — כיבוש קונסטנטינופול על ידי סולימאן המפואר שסיים את האימפריה הביזנטית ופתח שער לאירופה. בשיאה, האימפריה שלטה על 5.2 מיליון קמ"ר — מבודפשט (הונגריה) ועד עדן (תימן). המילט סיסטם איפשר לקהילות דתיות שונות (נוצרים, יהודים, מוסלמים) לחיות תחת שלטון עות\'מאני עם אוטונומיה פנימית — דגם של רב-תרבותיות יחסית. ירידת האימפריה ("חולה אירופה") בא עם כיבושים צבאיים, חולשה מנהלית ולחץ לאומני של עמים בשלטונה. קריסתה אחרי מלחמת העולם הראשונה יצרה את מפת המזרח התיכון המודרנית — גבולות שעדיין שנויים במחלוקת.' },

    { id:"french_rev", name:"המהפכה הצרפתית", year:"1789–1799", era:"המאה ה-18", tags:["revolution","europe","politics"], level:"beginner",
      desc:"תקופה שהפילה את המלוכה, כוננה רפובליקה, והסתיימה בעלייתו של נפוליאון.",
      quick:["הפילה את המלוכה","הפיצה חירות, שוויון ואחווה","הובילה לנפוליאון"],
      deep:'המהפכה הצרפתית פרצה ב-1789 על רקע משבר כלכלי חמור, רעב, ואי-שוויון קיצוני — 98% מהאוכלוסייה ("הצד השלישי") שילמו מסים בזמן שהאצולה והכמורה פטורים. נפילת הבסטיליה (14 ביולי 1789) הפכה לסמל המהפכה. "הטרור" (1793–1794) תחת רובספייר ראה 17,000 הוצאות להורג רשמיות ואולי 40,000 נוספות. לואי ה-16 ומארי אנטואנט הוצאו להורג בגיליוטינה. הרעיונות שהפיצה המהפכה — ריבונות העם, זכויות האדם, הפרדת כנסייה ומדינה — שינו את הפוליטיקה העולמית לצמיתות. עיקרון "חירות, שוויון, אחווה" הוא עדיין הסמל של הרפובליקה הצרפתית.' },

    { id:"napoleon", name:"נפוליאון ואירופה", year:"1799–1815", era:"המאה ה-19", tags:["war","europe","politics"], level:"beginner",
      desc:"נפוליאון בונפרטה כבש את רוב אירופה והפיץ את ערכי המהפכה.",
      quick:["כבש את רוב אירופה","הפיץ קוד משפטי","הובס בוואטרלו ב-1815"],
      deep:'נפוליאון בונפרטה, קצין קורסיקאי בן 30, עלה לשלטון בהפיכה ב-1799 ותוך שנים ספורות כבש את רוב אירופה. גאונותו הצבאית — תרגיל ה"corps d\'armée", קרב אוסטרליץ, ועוד — הפכו אותו לאחד הגנרלים הגדולים בהיסטוריה. הקוד הנפוליאוני (1804) — מערכת חוק המבוססת על שוויון בפני החוק, קניין פרטי, וחופש דת — עדיין בשימוש ב-40+ מדינות היום. הטעות הגדולה: פלישה לרוסיה ב-1812 שמיגה המרחק ו"הנשק הרוסי" (קור חורף) הרסו את הגראנד ארמה. לאחר גלות באלבה, חזר לקצר ("מאה הימים") ונפטר בוואטרלו ב-1815.' },

    { id:"industrial", name:"המהפכה התעשייתית", year:"1760–1840", era:"המאה ה-19", tags:["science","global"], level:"beginner",
      desc:"המעבר מייצור ידני לממוכן. הקיטור, הרכבת, בתי החרושת שינו את אופן החיים.",
      quick:["החלה בבריטניה","מנוע הקיטור שינה הכל","יצרה את המעמד הפועל"],
      deep:"המהפכה התעשייתית שינתה את אופן חיי האנושות יותר מכל אירוע מאז המהפכה החקלאית הניאוליתית. בריטניה הובילה בזכות: פחם ופלדה בשפע, מערכת פטנטים שעודדה חדשנות, ואימפריה קולוניאלית שסיפקה חומרי גלם. ג'יימס ווט (1769) שיפר את מנוע הקיטור ופתח מהפכה: מפעלים, רכבות, ספינות קיטור, מכרות. ערים צמחו במהירות מסחררת — לונדון מ-1 מיליון (1800) ל-6.5 מיליון (1900). מחיר כבד: ילדים עבדו 12 שעות ביום במפעלים, תנאי עבודה נוראיים הובילו לתנועות הפועלים, לאיגודים מקצועיים ולאחר מכן למרקסיזם. עד 1850, בריטניה ייצרה מחצית מהפלדה, הפחם והברזל בעולם." },

    { id:"american_rev", name:"המהפכה האמריקאית", year:"1775–1783", era:"המאה ה-18", tags:["revolution","politics"], level:"beginner",
      desc:"13 המושבות האמריקאיות הכריזו עצמאות מבריטניה ב-1776 וייסדו את ארצות הברית.",
      quick:["הכרזת העצמאות 1776","המלחמה ב-1783 הסתיימה","השפיעה על מהפכות ברחבי העולם"],
      deep:'המהפכה האמריקאית לא הייתה רק מרד על מיסוי — היא הייתה מהפכה רעיונית. "ייצוג ללא מיסוי" היה הסיסמה, אבל הרעיון העמוק יותר היה: לאנשים יש זכויות טבעיות שאף ממשלה אינה יכולה לשלול. הכרזת העצמאות (4 ביולי 1776), שכתב תומס ג\'פרסון, היא אחד המסמכים המשפיעים ביותר בהיסטוריה. ג\'ורג\' וושינגטון ניהל מלחמת גרילה מתוחכמת נגד הצבא הבריטי — אחד הצבאות החזקים בעולם. ניצחון בית-הנבחרים של יורקטאון (1781) עם סיוע צרפתי הכריע את המלחמה. החוקה האמריקאית (1787) והמגילת הזכויות (1791) יצרו מסגרת דמוקרטית שהשפיעה על עשרות חוקות בעולם — כולל המהפכה הצרפתית.' },

    { id:"ww1", name:"מלחמת העולם הראשונה", year:"1914–1918", era:"המאה ה-20", tags:["war","europe","global"], level:"beginner",
      desc:"המלחמה הגדולה — סיימה ארבע אימפריות ושתלה זרעים למלחמת העולם השנייה.",
      quick:['הופעלה ע"י רצח פרדיננד','ארבע אימפריות קרסו','הסכם ורסאי שתל זרעים למלה"ע 2'],
      deep:'רצח הארכידוכס פרנץ פרדיננד בסרייבו (28 ביוני 1914) היה הניצוץ שהצית חבית אבק שרוף של ברית-מחויבויות, לאומנות ומרוץ חימוש. תוך 6 שבועות, רוב אירופה במלחמה. מלחמת החפירות בגזרה המערבית יצרה מציאות חדשה ונוראה: חיילים חיו בחפירות עם עכברים, בוץ, גז חרדל, ופצצות — ולא זזו קילומטרים במשך שנים. הקרב על הסום (1916) — 57,000 בריטים נפלו ביום הראשון בלבד. קריסת 4 אימפריות: עות\'מאנית, אוסטרו-הונגרית, גרמנית, רוסית. הסכם ורסאי השפיל את גרמניה ובא בחשבון ישיר לעלייתו של היטלר.' },

    { id:"holocaust", name:"השואה", year:"1941–1945", era:"המאה ה-20", tags:["war","europe","genocide"], level:"beginner",
      desc:"הרצח השיטתי של שישה מיליון יהודים על ידי המשטר הנאצי.",
      quick:["שישה מיליון יהודים נרצחו","מחנות ריכוז ומוות",'הובילה לאו"ם ולזכויות אדם'],
      deep:'השואה הייתה ניסיון שיטתי, בירוקרטי ומתועד לחסל את העם היהודי — וכמעט שהצליח: שני שלישים מיהודי אירופה נרצחו. "הפתרון הסופי" הופעל רשמית בינואר 1942 בוועידת ואנסה, שם תכנן הנהגת SS את הרצח ההמוני בצורה פקידותית. 6 מחנות מוות פעלו בעיקר בפולין — אושוויץ לבדו גרם למות 1.1 מיליון. הרוב — למעלה ממיליון ילדים — נרצחו בגז. השואה לא נפלה מהשמיים: היא היתה תוצאה של אידיאולוגיה, ביורוקרטיה ואדישות המונים. ייסוד מדינת ישראל (1948) ואמנת האו"ם לזכויות אדם (1948) היו חלקית תגובה ישירה לשואה.' },

    { id:"ww2", name:"מלחמת העולם השנייה", year:"1939–1945", era:"המאה ה-20", tags:["war","europe","global"], level:"beginner",
      desc:"הסכסוך הקטלני ביותר בהיסטוריה — 70–85 מיליון הרוגים.",
      quick:["70–85 מיליון הרוגים","גרמניה הנאצית נגד בעלות-הברית","הסתיים ב-1945"],
      deep:'מלחמת העולם השנייה הייתה הסכסוך הגדול ביותר בהיסטוריה: 30 מדינות, 100 מיליון חיילים, 70–85 מיליון הרוגים (מחציתם אזרחים). גרמניה הנאצית של היטלר פתחה במהלומה בפולין (ספטמבר 1939). "הבזק" (Blitzkrieg) — שילוב מטוסים, טנקים ורגלים — כבש את צרפת תוך 6 שבועות. נקודות מפנה: קרב בריטניה (1940, ה-RAF הציל את בריטניה), פלישה לרוסיה (1941), פרל הארבור (1941 — ארה"ב נכנסת), סטלינגרד (1942–43 — קבר הצבא הגרמני), ונורמנדי (1944). הפצצות האטום על הירושימה ונגסאקי (אוגוסט 1945) סיימו את המלחמה באסיה. העולם שאחרי: האו"ם, המלחמה הקרה, חלוקת גרמניה, ומדינת ישראל.' },

    { id:"dday", name:'מבצע נורמנדי (D-Day)', year:"6 ביוני 1944", era:"המאה ה-20", tags:["war","europe"], level:"beginner",
      desc:"156,000 חיילים פלשו לחופי נורמנדי — הפלישה הגדולה ביותר בהיסטוריה.",
      quick:['156,000 חיילים ב-5 חופים','פתח חזית מערבית','נחשב לנקודת המפנה של מלה"ע 2'],
      deep:'מבצע אוברלורד (D-Day) היה המבצע הצבאי הגדול ביותר בהיסטוריה: 156,000 חיילים, 5,000 ספינות, 11,000 מטוסים — כל זה בפתח אחד של 5 חופים בנורמנדי. ההכנה ארכה שנתיים וכללה מסע הטעייה מבריק ("מבצע פורטיטיוד") שגרם להיטלר להאמין שהפלישה תבוא בקאלה. חוף אומהה היה הקשה מכולם — חיילים אמריקאים נחתו תחת אש כבדה, רבים נפלו לפני שדרכו על החוף. עד הלילה: 10,000 קורבנות. אבל הפלישה הצליחה: עד ספטמבר 1944 שוחררה רוב צרפת. D-Day ייצג את נקודת האל-חזור של הניצחון על גרמניה הנאצית.' },

    { id:"israel", name:"הקמת מדינת ישראל", year:"1948", era:"המאה ה-20", tags:["politics","middle east"], level:"beginner",
      desc:"ב-14 במאי 1948 הכריז דוד בן-גוריון על הקמת מדינת ישראל.",
      quick:["הוכרזה ב-14 במאי 1948","קשורה לשואה ולציונות","גררה מלחמת עצמאות"],
      deep:'הקמת ישראל היא אחד האירועים המורכבים ביותר בהיסטוריה המודרנית. הציונות — תנועת לאומנות יהודית שייסד תאודור הרצל ב-1896 — שאפה למדינה יהודית בארץ ישראל. העלייה לארץ ישראל גברה בין המלחמות, ולאחר השואה, הלחץ הבינלאומי הוביל להחלטת האו"ם על חלוקה (נובמבר 1947). בן-גוריון הכריז על העצמאות ב-14 במאי 1948, ושעות לאחר מכן פלשו 5 מדינות ערב. מלחמת העצמאות (1948–1949) הסתיימה בישראל עם שטח גדול מהתכנון המקורי, אבל עם בעיית הפליטים הפלסטיניים ("נכבה") שנמשכת עד היום. ישראל הפכה לדמוקרטיה פרלמנטרית עם אוכלוסייה ממדינות רבות.' },

    { id:"coldwar", name:"המלחמה הקרה", year:"1947–1991", era:"המאה ה-20", tags:["politics","war","global"], level:"beginner",
      desc:'מאבק גיאופוליטי בין ארה"ב לברה"מ — מרוץ גרעיני, מרוץ חלל, מלחמות פרוקסי.',
      quick:['ארה"ב נגד ברה"מ','מלחמות פרוקסי בקוריאה ווייטנאם','הסתיים עם פירוק ברה"מ'],
      deep:'המלחמה הקרה הייתה מאבק אידיאולוגי בין שני מודלים: קפיטליזם דמוקרטי (ארה"ב) מול קומוניזם סובייטי (ברה"מ). "קרה" כי אף פעם לא היה עימות ישיר — אבל "חמה" במלחמות פרוקסי: קוריאה (50,000 חיילים אמריקאים נהרגו), וייטנאם (58,000), אנגולה, אפגניסטן. המשבר הגרעיני הקובני (1962) הביא את העולם קרוב ביותר לחורבן גרעיני — 13 ימים שבהם קנדי וח\'רושצ\'וב ניהלו משחק עצבים. מרוץ החלל — ספוטניק (1957), יורי גגרין (1961), ירח (1969) — היה חלק מהמאבק. ברזל בולגרי, ריגול, הצד השני מאחורי מסך הברזל — עולם של מתח תמידי שהסתיים עם נפילת ברלין (1989) וקריסת ברה"מ (1991).' },

    { id:"moonlanding", name:"נחיתה על הירח", year:"1969", era:"המאה ה-20", tags:["science","global"], level:"beginner",
      desc:"ב-20 ביולי 1969 ניל ארמסטרונג הפך לאדם הראשון על הירח.",
      quick:["ניל ארמסטרונג — ראשון על הירח",'ניצחון ארה"ב במרוץ החלל',"600 מיליון צפו בשידור חי"],
      deep:'תוכנית אפולו הייתה אחד ההישגים ההנדסיים הגדולים ביותר בהיסטוריה האנושית. נשיא קנדי הכריז ב-1961 "נגיע לירח לפני סוף העשור" — הצהרה אמיצה כשאמריקה אפילו לא שגרה אדם לחלל עדיין. 400,000 מהנדסים ומדענים עבדו על המשימה. אפולו 11 שוגרה ב-16 ביולי 1969. ב-20 ביולי, ניל ארמסטרונג דרך על הירח ואמר: "צעד קטן לאדם, קפיצה ענקית לאנושות." 600 מיליון אנשים — חמישית מאוכלוסיית העולם — צפו בשידור חי. נחיתת הירח הביאה תוצאות טכנולוגיות מרחיקות: מיכשור רפואי, סוליות נעליים, טפלון, ועוד — שנרשמו מהתוכנית.' },

    { id:"berlin_wall", name:"נפילת חומת ברלין", year:"1989", era:"המאה ה-20", tags:["revolution","politics","europe"], level:"beginner",
      desc:"ב-9 בנובמבר 1989 נפלה חומת ברלין — סמל לקץ המלחמה הקרה.",
      quick:["עמדה 28 שנה","סמל לקץ המלחמה הקרה","הובילה לאיחוד גרמניה"],
      deep:'חומת ברלין נבנתה ב-13 באוגוסט 1961 בלילה אחד — מזרח גרמניה הפסיקה את בריחת אזרחיה מערבה (3 מיליון ברחו בשנים קודמות). החומה הפכה לסמל המוחשי ביותר של המלחמה הקרה ומסך הברזל. ב-9 בנובמבר 1989, בעקבות לחץ עממי עצום ושורה של טעויות ביורוקרטיות, כריז דובר המפלגה הקומוניסטית של מזרח גרמניה שהמעבר פתוח — מיד. אלפים נהרו לחומה וגדשו אותה. הנפת הפטיש על החומה הפכה לאחד התמונות הסמליות ביותר במאה ה-20. ב-3 באוקטובר 1990 — פחות משנה לאחר מכן — גרמניה אוחדה מחדש.' },

    { id:"ussr_collapse", name:"קריסת ברית המועצות", year:"1991", era:"המאה ה-20", tags:["revolution","politics","global"], level:"beginner",
      desc:'פירוק ברה"מ ב-25 בדצמבר 1991 — 15 מדינות עצמאיות וקץ המלחמה הקרה.',
      quick:["15 מדינות חדשות קמו","סיים את עידן המלחמה הקרה","משבר כלכלי ורפורמות גורבצ'וב"],
      deep('ברית המועצות, שבשיאה הייתה מעצמת-על עם 300 מיליון איש, התפרקה ב-25 בדצמבר 1991 — ב-Christmas, פרט אירוני. גורבצ\'וב, שניסה להציל את הברית עם "גלסנוסט" (פתיחות) ו"פרסטרויקה" (שחזור), למעשה ניהל תהליך שאיבד שליטה עליו. הכלכלה הסובייטית הייתה עייפה — מחיר נפט נמוך, מלחמת אפגניסטן (1979–1989), ולחץ תחרות עם הצבא האמריקאי הרסו אותה. נפילת מסך הברזל ב-1989 האיצה את הדרישות לעצמאות ברפובליקות. ב-25 בדצמבר 1991, גורבצ\'וב התפטר, הדגל הסובייטי ירד מהקרמלין, ו-15 מדינות עצמאיות נולדו. המשמעות: ארה"ב נשארה המעצמה היחידה בעולם — "הרגע חד-קוטבי".' },

    { id:"nelson_mandela", name:"נלסון מנדלה וסיום האפרטהייד", year:"1990–1994", era:"המאה ה-20", tags:["politics","revolution","africa"], level:"beginner",
      desc:"לאחר 27 שנות כלא, מנדלה הוביל את דרום אפריקה לדמוקרטיה ב-1994.",
      quick:["27 שנות כלא","הוביל מעבר לדמוקרטיה","נבחר לנשיא ב-1994"],
      deep:'נלסון מנדלה נאסר ב-1964 בגין פעילות נגד האפרטהייד — שיטת אפליה גזעית קשה שהפרידה לבנים ושחורים בדרום אפריקה. בכלא רובן איילנד ישב 27 שנה — סירב להשתחרר בתנאים שהציעה הממשלה. מנדלה הפך לסמל בינלאומי של התנגדות לגזענות. שחרורו ב-11 בפברואר 1990 היה אחד מהרגעים הגדולים של המאה. הפלא האמיתי: מנדלה לא יצא מהכלא מלא שנאה — הוא הנהיג מדיניות של פיוס ורב-גזעיות. "ועדת האמת והפיוס" שייסד אפשרה לפושעי האפרטהייד להתוודות בגמול על חנינה. הוא זכה בפרס נובל לשלום (1993) ונבחר לנשיא ב-1994 בבחירות הראשונות שאפשרו הצבעת שחורים.' },

    { id:"internet", name:"מהפכת האינטרנט", year:"1991–2000", era:"המאה ה-20", tags:["science","global"], level:"beginner",
      desc:"הרשת הפכה ציבורית ב-1991 ושינתה לחלוטין את אופן התקשורת, המסחר והחיים.",
      quick:["הרשת נפתחה לציבור 1991","שינתה תקשורת ומסחר","הולדת עידן המידע"],
      deep:'האינטרנט החל כרשת צבאית אמריקאית (ARPANET, 1969). טים ברנרס-לי המציא את ה-World Wide Web ב-1989 בשביל לשתף מידע מחקרי — ושחרר אותו חינם לציבור ב-1991. הדפדפן הראשון (Mosaic, 1993) הפך את האינטרנט לנגיש. "בועת הדוטקום" (1995–2000) ראתה השקעות ענק בחברות אינטרנט — רבות קרסו ב-2000, אבל Amazon, Google ו-eBay שרדו. המהפכה שהאינטרנט הביא: כל ידע האנושות זמין מכל מקום, מסחר עולמי, רשתות חברתיות, עיתונות אזרחית — ובמקביל: פרטיות נשחקת, דיסאינפורמציה, ממכרות טכנולוגית. שינוי שבחלקו עוד מתרחש לנגד עינינו.' },

    { id:"nine_eleven", name:"אירועי 11 בספטמבר", year:"2001", era:"המאה ה-21", tags:["war","politics","global"], level:"beginner",
      desc:"פיגועי הטרור הגדולים ביותר בהיסטוריה האמריקאית — שינו את מדיניות הביטחון העולמית.",
      quick:["3,000 הרוגים","מגדלי התאומים קרסו","הוביל למלחמה בטרור"],
      deep:'19 חוטפים מארגון אל-קאעידה חטפו 4 מטוסים ב-11 בספטמבר 2001. שניים התנגשו במגדלי התאומים בניו-יורק, אחד בפנטגון, ואחד (שנוסעיו התנגדו) נפל בפנסילבניה. 2,977 נהרגו — המתקפה הגדולה ביותר על אדמת ארה"ב מאז פרל הארבור. התגובה שינתה את העולם: ארה"ב פלשה לאפגניסטן (2001) ועיראק (2003) — מלחמות שעלו טריליוני דולרים. ה-"Patriot Act" שחק זכויות אזרח. TSA ובדיקות ביטחון בשדות תעופה הפכו לנורמה. הסכסוך עם האסלאם הקיצוני השאיר ה'שלום עולמי' פגוע. אסאמה בן לאדן נהרג ב-2011 על ידי כוח מיוחד אמריקאי בפקיסטן.' },
  ],
  en: [
    { id:"egypt", name:"Ancient Egypt", year:"3100–30 BC", era:"Ancient World", tags:["civilization","africa"], level:"beginner",
      desc:"One of the greatest civilizations in history, ruled by pharaohs for over 3,000 years. Egyptians built the pyramids and developed hieroglyphic writing.",
      quick:["Ruled by pharaohs for 3,000 years","Built pyramids and hieroglyphic writing","Conquered by Rome in 30 BC"],
      deep:"Ancient Egypt was one of the most enduring civilizations in human history — three thousand years of continuous pharaonic rule. The Pyramids of Giza, built as tombs for 4th Dynasty pharaohs, remain among the most impressive structures ever constructed. Beyond architecture, Egyptians developed an annual calendar, advanced medical practices, and a writing system that allowed detailed documentation of their lives. Egyptian religion was polytheistic — with Osiris, Isis, Ra, and hundreds of other gods. The belief in eternal life drove mummification and the construction of elaborate tombs. The Nile was the civilization's lifeline — its annual floods brought fertile soil enabling agriculture and wealth. Major changes came with invasions by Sea Peoples, Assyrians, Persians, Greeks, and finally Rome, which annexed Egypt in 30 BC." },

    { id:"mesopotamia", name:"Mesopotamia — Between Two Rivers", year:"3500–539 BC", era:"Ancient World", tags:["civilization","middle east"], level:"beginner",
      desc:"Ancient civilization between the Tigris and Euphrates rivers. Home to Sumer, Akkad and Babylon. Writing, the wheel, and the Code of Hammurabi were born here.",
      quick:["First writing system — cuneiform","Code of Hammurabi — early legal system","Birthplace of the Garden of Eden legend"],
      deep:"Mesopotamia, 'the land between two rivers,' is one of humanity's first cradles of civilization. By 3500 BC, the Sumerians developed cuneiform writing — the first writing system in human history — to record commercial transactions. The Akkadian Empire under Sargon the Great (2334 BC) was probably the world's first empire, uniting vast lands under central rule. Hammurabi's Code (1754 BC) is one of the oldest written legal codes, and the principle of 'an eye for an eye' originates there. Ancient Babylon, at its peak, was one of the largest cities in the ancient world — the Hanging Gardens counted among the Seven Wonders. Mesopotamian civilization laid foundations for astronomy, mathematics, literature (Epic of Gilgamesh), and law — influencing all Middle Eastern civilizations that followed." },

    { id:"greece", name:"Classical Greece", year:"500–323 BC", era:"Ancient World", tags:["civilization","europe"], level:"beginner",
      desc:"The golden age of Athens. Democracy, philosophy, drama and the Olympics were born here.",
      quick:["Birthplace of democracy","Socrates, Plato, Aristotle","Immeasurable influence on Western civilization"],
      deep:"Classical Greece was one of the defining moments of Western culture. Pericles' Athens (494–429 BC) established the first direct democracy in history — citizens voted directly on laws and policies. The great philosophers changed how humanity thinks: Socrates developed the dialectic method, Plato founded the first Academy, and Aristotle mapped out logic, politics, biology, drama, and more. The Persian Wars (490–479 BC) — including Marathon and Thermopylae — became symbols of resistance to tyranny. The first Olympics were held in 776 BC as a religious ceremony honoring Zeus. The Greek legacy is visible to this day — from the architecture of the Roman Colosseum to modern democratic constitutions." },

    { id:"persia", name:"The Persian Empire", year:"550–330 BC", era:"Ancient World", tags:["civilization","middle east","politics"], level:"beginner",
      desc:"Cyrus the Great founded the Achaemenid Empire — the largest of its time. Known for religious tolerance and an efficient central administration.",
      quick:["Cyrus freed the Jews from Babylon","Royal roads networked the empire","Defeated by Alexander the Great"],
      deep:"The Achaemenid Empire at its peak ruled over about 44% of the world's population — the highest proportion in history. Cyrus the Great (559–530 BC) was among the most enlightened rulers of the ancient world: he freed the Jews from Babylonian captivity, allowed conquered peoples to keep their religion and culture, and created what is considered the first charter of human rights. The Royal Road network enabled rapid communication and commerce across the empire. The Persians developed a provincial governance system with satraps (governors) allowing efficient management of vast territories. The empire eventually fell to Alexander of Macedon (330 BC), but Persia's political, cultural, and architectural legacy continued to flourish." },

    { id:"alexander", name:"Alexander the Great", year:"336–323 BC", era:"Ancient World", tags:["war","politics"], level:"beginner",
      desc:"King of Macedon who conquered an empire from Greece to India in just 13 years, spreading Hellenistic culture.",
      quick:["Conquered from Macedonia to India","Spread Greek culture","Died at 32"],
      deep:"Alexander, a student of Aristotle, came to power at 20 and by his death at 32 had conquered the largest empire ever built within a single human lifetime. He won every battle he fought — from the Granicus, Issus, to Gaugamela — and never lost a single engagement. Alexander founded dozens of cities bearing his name, most notably Alexandria in Egypt, which became the cultural and scientific center of the ancient world. The 'Hellenization' process — spreading Greek culture, language, and science — permanently transformed the Middle East, Persia, and Asia. To this day, scholars debate the cause of his sudden death in Babylon: poisoning? illness? excessive drinking? His legacy influenced Julius Caesar, Napoleon, and many other leaders who imitated his methods." },

    { id:"rome", name:"The Roman Empire", year:"27 BC – 476 AD", era:"Ancient World", tags:["civilization","europe"], level:"beginner",
      desc:"One of history's greatest empires, ruling 70 million people from Britain to Mesopotamia at its peak.",
      quick:["Ruled most of the known world","Laid foundations for law and Western culture","Fell in 476 AD"],
      deep:"Rome transformed from a republic to an empire with Augustus Caesar's rise (27 BC). At its peak, the empire controlled 5 million km² and 70 million people from northern England to the Euphrates. The Romans built a road network of 400,000 km ('All roads lead to Rome' is grounded in reality), sophisticated aqueduct systems, and structures including the Pantheon and Colosseum. Roman law — principles like presumption of innocence and appearing before a judge — are the foundation of Western legal systems today. The fall of Western Rome (476 AD) was a gradual process: Germanic invasions, corruption, economic difficulties, and military dissolution. Eastern Rome (Byzantium) continued to flourish until 1453." },

    { id:"china_han", name:"Han Dynasty — China", year:"206 BC – 220 AD", era:"Ancient World", tags:["civilization","science"], level:"beginner",
      desc:"The Han Dynasty ruled China for over 400 years. The Silk Road became a global trade route. Paper and other inventions emerged in this era.",
      quick:["Silk Road connected East and West","Paper invented in 105 AD","Established Chinese identity for generations"],
      deep:"The Han Dynasty (206 BC – 220 AD) is one of the most formative periods in Chinese history — so formative that the Chinese still call themselves 'Han people' today. Emperor Han Wudi established a merit-based bureaucracy using competitive examinations — a revolutionary idea making education the path to government careers. The Silk Road, opened during the Han era, first connected Asia, the Middle East, and Europe in a trade network flowing with silk, spices, ideas, and diseases. Han inventions include paper (105 AD), the stern rudder, the pendulum, and more. Han astronomers documented comets and created accurate star maps. The Han's fall led to 400 years of fragmentation, but the administrative, cultural, and philosophical norms it established remained in China for millennia." },

    { id:"islam", name:"Rise of Islam", year:"610–750 AD", era:"Middle Ages", tags:["religion","middle east"], level:"beginner",
      desc:"Muhammad founded Islam in 610 AD. Within a century the faith spread from Spain to Persia.",
      quick:["Islam founded in 610 AD","Spread from Spain to Persia","Preserved ancient scientific knowledge"],
      deep:"Muhammad, a merchant from Mecca, received his first revelation in 610 AD and launched a religious, political, and social revolution. Within 100 years of his death (632 AD), Islam became one of the world's great powers — from the Iberian Peninsula (Spain) to the Indus in Pakistan. Baghdad, founded in 762, became the world's largest city and center of the 'Islamic Golden Age' — a period when Muslim scholars made essential contributions to mathematics (algebra), astronomy, medicine, and philosophy, while preserving and translating Greek classical texts lost to Europe. Islam's division into Sunni and Shia stemmed from a dispute over the religious-political succession after Muhammad's death — a tension that continues to this day." },

    { id:"vikings", name:"The Viking Age", year:"793–1066", era:"Middle Ages", tags:["war","europe"], level:"beginner",
      desc:"Norse seafarers who raided Europe, discovered America before Columbus, and established trade routes from Russia to Byzantium.",
      quick:["Discovered America in 1000 AD","Trade routes from Scandinavia to Baghdad","Reshaped the map of Europe"],
      deep:"Vikings were not just sea raiders — they were also traders, explorers, and kingdom founders. Leif Eriksson reached North America in 1000 AD — about 500 years before Columbus. Vikings from Scandinavia established trade routes connecting Britain to Baghdad via Russian rivers. Normans (Vikings who settled in France) conquered England in 1066 under William the Conqueror — one of the most defining events in British history. The Vikings founded Dublin, Kyiv, Normandy, and more. Their Longships were engineering genius — deep enough for ocean navigation, shallow enough for river travel. Norse religion with Odin, Thor, and the Ragnarok myth left traces in the English language (Thursday = Thor's day)." },

    { id:"crusades", name:"The Crusades", year:"1096–1291", era:"Middle Ages", tags:["war","religion","middle east"], level:"beginner",
      desc:"Military expeditions to recapture the Holy Land. Left deep scars on religious relations.",
      quick:["8 major Crusades","Jerusalem captured and lost multiple times","Shaped Christian-Muslim relations for centuries"],
      deep:"The Crusades began in 1096 after Pope Urban II called for the liberation of Jerusalem from Muslims. The First Crusade (1099) captured Jerusalem in a terrible massacre — accounts describe streets covered in blood. The Third Crusade (1189–1192) — the most famous — brought a confrontation between Richard the Lionheart (England) and Saladin (Islam) that became one of history's most legendary conflicts. The Crusades profoundly changed Europe: they opened trade channels with the East, brought knowledge, spices, and ideas that fueled the Renaissance. They also left scars in Christian-Muslim-Jewish relations that continue to this day. The Crusades ended in 1291 with the fall of Acre — the last Crusader stronghold in the Holy Land." },

    { id:"mongols", name:"The Mongol Empire", year:"1206–1368", era:"Middle Ages", tags:["war","global"], level:"beginner",
      desc:"Genghis Khan founded the largest contiguous empire in history, stretching from China to Eastern Europe.",
      quick:["Largest land empire ever","Genghis Khan united the tribes","Brought trade routes and plagues"],
      deep:"Genghis Khan (1162–1227) united Mongolia's nomadic tribes in 1206 and built what became the largest contiguous empire in history — 24 million km². The Mongol secret: combining speed (cavalry), sophisticated tactics, and superior military intelligence. They destroyed cities that resisted (Baghdad 1258 — libraries and treasures lost forever), but preserved cities that surrendered and spread commerce and culture. The 'Pax Mongolica' — the Mongol Peace — allowed trade to move safely from China to Europe, enabling Marco Polo's travels east. One of the Mongols' hidden legacies: they helped spread the Black Death plague that killed a third of Europe." },

    { id:"blackdeath", name:"The Black Death", year:"1347–1351", era:"Middle Ages", tags:["science","europe"], level:"beginner",
      desc:"The deadliest pandemic in history, killing a third of Europe — about 25 million people.",
      quick:["Killed a third of Europe","Transformed economics and society","Accelerated the end of the Middle Ages"],
      deep:"The Black Death — bubonic plague — arrived in Europe from Asia in 1347 through ports in Sicily. Within five years, about 25–50 million people died — roughly a third to a half of Europe's population. The bacterium Yersinia pestis was transmitted by fleas on rats, but people of the time didn't know this — they blamed Jews, bad air, and divine punishment. The social impact was enormous: a labor shortage improved peasants' status and contributed to the dissolution of the feudal nobility system. The Church, unable to stop the plague, lost some of its authority. The 'Dance of Death' (Danse Macabre) art flourished as an expression of obsession with death. The plague returned in further waves until the 18th century." },

    { id:"renaissance", name:"The Renaissance", year:"1300–1600", era:"15th–16th Century", tags:["science","civilization","europe"], level:"beginner",
      desc:"A cultural rebirth in Italy that breathed new life into art, science and literature. Leonardo da Vinci, Michelangelo and others changed the world.",
      quick:["Leonardo, Michelangelo, Raphael","Revival of Greco-Roman knowledge","Flourishing of art and science"],
      deep:"The Renaissance ('Rebirth') began in 14th-century Florence, where wealthy families like the Medici funded art and science. For the first time since ancient Greece, the human being — not just God — became the center of interest. Leonardo da Vinci (1452–1519) was a universal genius: painting, sculpture, engineering, anatomy, music — excelling in all. Michelangelo painted the Sistine Chapel ceiling (1508–1512) and sculpted David. Gutenberg's printing press (1440) spread knowledge and ideas at an unprecedented scale. The Renaissance wasn't just art — it included a scientific revolution: Copernicus (Earth orbits the Sun), Galileo, Kepler — all part of the transformation the Renaissance drove." },

    { id:"columbus", name:"Discovery of America", year:"1492", era:"15th–16th Century", tags:["science","global"], level:"beginner",
      desc:"Christopher Columbus sailed from Spain and discovered America in 1492, opening an era of exploration and European colonization.",
      quick:["1492 — Columbus reaches America","Completely changed world history","Led to European conquest and settlement"],
      deep:"On August 3, 1492, Columbus departed Palos, Spain with 3 ships and 90 men. On October 12 he reached the Bahamas — and opened the 'Columbian Exchange': an enormous flow of plants, animals, diseases, people, and ideas between two worlds. To the Americas came: wheat, horses, pigs, grapevines — and diseases like smallpox that killed up to 90% of the indigenous population which had no immunity. From the Americas came: potatoes, tomatoes, corn, cocoa, tobacco — completely transforming European nutrition and world populations. The Spanish conquest of the Aztec Empire (1521) and Inca Empire (1533) destroyed ancient and rich civilizations." },

    { id:"ottoman", name:"The Ottoman Empire", year:"1299–1922", era:"15th–16th Century", tags:["civilization","politics","middle east"], level:"beginner",
      desc:"One of the greatest empires in history, ruling the Middle East, North Africa and Eastern Europe for 600 years.",
      quick:["600 years of rule","Controlled Jerusalem for 400 years","Dissolved after World War I"],
      deep:"The Ottoman Empire was founded in 1299 by Osman I and lasted until 1922 — an impressive 623 years. The pivotal moment was 1453 — the conquest of Constantinople by Suleiman the Magnificent, ending the Byzantine Empire and opening a gateway to Europe. At its peak, the empire controlled 5.2 million km² — from Budapest (Hungary) to Aden (Yemen). The Millet system allowed different religious communities (Christians, Jews, Muslims) to live under Ottoman rule with internal autonomy — a model of relative multiculturalism. The empire's decline ('sick man of Europe') came with military conquests, administrative weakness, and nationalist pressure from subject peoples. Its collapse after WWI created the modern Middle East map — borders still disputed today." },

    { id:"french_rev", name:"French Revolution", year:"1789–1799", era:"18th Century", tags:["revolution","europe","politics"], level:"beginner",
      desc:"Radical transformation that overthrew the monarchy, established a republic, and ended with Napoleon's rise.",
      quick:["Overthrew the monarchy","Spread liberty, equality, fraternity","Led to Napoleon"],
      deep:"The French Revolution erupted in 1789 against a backdrop of severe economic crisis, famine, and extreme inequality — 98% of the population ('Third Estate') paid taxes while nobility and clergy were exempt. The storming of the Bastille (July 14, 1789) became the revolution's symbol. The 'Terror' (1793–1794) under Robespierre saw 17,000 official executions and perhaps 40,000 more. Louis XVI and Marie Antoinette were guillotined. The revolution's ideas — popular sovereignty, human rights, separation of church and state — permanently changed world politics. The principle 'liberty, equality, fraternity' remains France's motto today." },

    { id:"american_rev", name:"American Revolution", year:"1775–1783", era:"18th Century", tags:["revolution","politics"], level:"beginner",
      desc:"The 13 American colonies declared independence from Britain in 1776 and founded the United States.",
      quick:["Declaration of Independence 1776","War ended in 1783","Influenced revolutions worldwide"],
      deep:"The American Revolution was not merely a tax revolt — it was an ideological revolution. 'No taxation without representation' was the slogan, but the deeper idea was: people have natural rights that no government can take away. The Declaration of Independence (July 4, 1776), written by Thomas Jefferson, is one of the most influential documents in history. George Washington waged a sophisticated guerrilla war against the British army — one of the world's strongest forces. The Yorktown victory (1781) with French assistance decided the war. The US Constitution (1787) and Bill of Rights (1791) created a democratic framework that influenced dozens of constitutions worldwide — including the French Revolution." },

    { id:"napoleon", name:"Napoleon and Europe", year:"1799–1815", era:"19th Century", tags:["war","europe","politics"], level:"beginner",
      desc:"Napoleon Bonaparte conquered most of Europe and spread the values of the French Revolution.",
      quick:["Conquered most of Europe","Spread legal code still in use","Defeated at Waterloo 1815"],
      deep:"Napoleon Bonaparte, a 30-year-old Corsican officer, came to power in a coup in 1799 and within years conquered most of Europe. His military genius — the corps d'armée system, the Battle of Austerlitz, and more — made him one of history's greatest generals. The Napoleonic Code (1804) — a legal system based on equality before the law, private property, and religious freedom — is still used in 40+ countries today. The great mistake: the 1812 invasion of Russia, where distance and the 'Russian weapon' (winter cold) destroyed the Grande Armée. After exile on Elba, he returned briefly ('Hundred Days') and was defeated at Waterloo in 1815." },

    { id:"industrial", name:"Industrial Revolution", year:"1760–1840", era:"19th Century", tags:["science","global"], level:"beginner",
      desc:"The shift from manual to mechanized production. Steam, railways, factories changed everything.",
      quick:["Began in Britain","Steam engines transformed production","Created the working class"],
      deep:"The Industrial Revolution changed humanity's way of life more than any event since the Neolithic agricultural revolution. Britain led due to: abundant coal and steel, a patent system encouraging innovation, and a colonial empire supplying raw materials. James Watt (1769) improved the steam engine and launched a revolution: factories, railways, steamships, mines. Cities grew at dizzying speed — London from 1 million (1800) to 6.5 million (1900). The heavy price: children worked 12-hour days in factories, terrible working conditions led to labor movements, trade unions, and later Marxism. By 1850, Britain produced half the world's steel, coal, and iron." },

    { id:"ww1", name:"World War I", year:"1914–1918", era:"20th Century", tags:["war","europe","global"], level:"beginner",
      desc:"The Great War ended four empires and planted seeds for WWII through the Treaty of Versailles.",
      quick:["Triggered by Franz Ferdinand's assassination","Four empires collapsed","Treaty of Versailles planted WWII seeds"],
      deep:"The assassination of Archduke Franz Ferdinand in Sarajevo (June 28, 1914) was the spark igniting a powder keg of alliance obligations, nationalism, and arms races. Within 6 weeks, most of Europe was at war. Trench warfare on the Western Front created a horrific new reality: soldiers lived in trenches with rats, mud, mustard gas, and shells — without advancing kilometers for years. The Battle of the Somme (1916) — 57,000 British casualties on the first day alone. The collapse of 4 empires: Ottoman, Austro-Hungarian, German, Russian. The Treaty of Versailles humiliated Germany and directly contributed to Hitler's rise." },

    { id:"holocaust", name:"The Holocaust", year:"1941–1945", era:"20th Century", tags:["war","europe","genocide"], level:"beginner",
      desc:"The systematic murder of six million Jews by the Nazi regime.",
      quick:["Six million Jews murdered","Concentration and death camps","Led to the UN and human rights framework"],
      deep:"The Holocaust was a systematic, bureaucratic, and documented attempt to eliminate the Jewish people — and nearly succeeded: two thirds of European Jews were murdered. The 'Final Solution' was formally enacted in January 1942 at the Wannsee Conference, where SS leadership planned mass murder in a clerical fashion. Six death camps operated mainly in Poland — Auschwitz alone caused the deaths of 1.1 million. The majority — over a million children — were gassed. The Holocaust didn't fall from the sky: it was the result of ideology, bureaucracy, and mass indifference. The founding of Israel (1948) and the UN Declaration of Human Rights (1948) were partly a direct response to the Holocaust." },

    { id:"ww2", name:"World War II", year:"1939–1945", era:"20th Century", tags:["war","europe","global"], level:"beginner",
      desc:"The deadliest conflict in history — 70–85 million deaths. Nazi Germany vs the Allied powers.",
      quick:["70–85 million deaths","Nazi Germany vs Allied powers","Ended in 1945"],
      deep:"World War II was the largest conflict in history: 30 nations, 100 million soldiers, 70–85 million deaths (half of them civilians). Nazi Germany under Hitler struck Poland (September 1939). Blitzkrieg — combining aircraft, tanks, and infantry — conquered France in 6 weeks. Turning points: Battle of Britain (1940, RAF saved Britain), invasion of Russia (1941), Pearl Harbor (1941 — US enters), Stalingrad (1942–43 — graveyard of the German army), and Normandy (1944). The atomic bombs on Hiroshima and Nagasaki (August 1945) ended the war in Asia. The post-war world: the UN, Cold War, divided Germany, and the State of Israel." },

    { id:"dday", name:"D-Day: Normandy Invasion", year:"June 6, 1944", era:"20th Century", tags:["war","europe"], level:"beginner",
      desc:"The largest seaborne invasion: 156,000 Allied troops stormed Normandy beaches, opening the Western Front.",
      quick:["156,000 troops on 5 beaches","Opened the Western Front","Turning point of WWII in Europe"],
      deep:"Operation Overlord (D-Day) was the largest military operation in history: 156,000 troops, 5,000 ships, 11,000 aircraft — all landing on 5 beaches in Normandy. Preparation took two years and included a brilliant deception campaign ('Operation Fortitude') that led Hitler to believe the invasion would come at Calais. Omaha Beach was the hardest — American soldiers landed under heavy fire, many falling before reaching the shore. By nightfall: 10,000 casualties. But the invasion succeeded: by September 1944, most of France was liberated. D-Day represented the point of no return for victory over Nazi Germany." },

    { id:"israel", name:"Establishment of Israel", year:"1948", era:"20th Century", tags:["politics","middle east"], level:"beginner",
      desc:"On May 14, 1948, David Ben-Gurion proclaimed the State of Israel.",
      quick:["Declared May 14, 1948","Connected to Holocaust and Zionism","Immediately triggered war"],
      deep:"Israel's establishment is one of the most complex events in modern history. Zionism — a Jewish nationalist movement founded by Theodor Herzl in 1896 — aspired to a Jewish state in the Land of Israel. Immigration to Israel grew between the wars, and after the Holocaust, international pressure led to the UN partition decision (November 1947). Ben-Gurion declared independence on May 14, 1948, and hours later 5 Arab nations invaded. The War of Independence (1948–1949) ended with Israel controlling more territory than originally planned, but with the Palestinian refugee problem ('Nakba') that continues to this day. Israel became a parliamentary democracy with a population from many countries." },

    { id:"coldwar", name:"The Cold War", year:"1947–1991", era:"20th Century", tags:["politics","war","global"], level:"beginner",
      desc:"Geopolitical struggle between USA and USSR — nuclear arms race, space race, proxy wars.",
      quick:["USA vs. USSR","Proxy wars in Korea and Vietnam","Ended with Soviet collapse"],
      deep:"The Cold War was an ideological battle between two models: democratic capitalism (USA) vs. Soviet communism (USSR). 'Cold' because there was never direct confrontation — but 'hot' in proxy wars: Korea (50,000 American soldiers killed), Vietnam (58,000), Angola, Afghanistan. The Cuban Missile Crisis (1962) brought the world closest ever to nuclear destruction — 13 days when Kennedy and Khrushchev played a nerve game. The Space Race — Sputnik (1957), Yuri Gagarin (1961), Moon (1969) — was part of the competition. Iron Curtain, spying, the other side behind the Iron Curtain — a world of constant tension that ended with the fall of Berlin (1989) and Soviet collapse (1991)." },

    { id:"moonlanding", name:"Moon Landing", year:"1969", era:"20th Century", tags:["science","global"], level:"beginner",
      desc:"On July 20, 1969, Neil Armstrong became the first human to walk on the Moon.",
      quick:["Neil Armstrong — first on the Moon","US victory in the Space Race","600 million watched live"],
      deep:"The Apollo program was one of the greatest engineering achievements in human history. President Kennedy declared in 1961 'We will go to the Moon before the end of the decade' — a bold statement when America hadn't yet sent a man to space. 400,000 engineers and scientists worked on the mission. Apollo 11 launched July 16, 1969. On July 20, Neil Armstrong stepped onto the Moon and said: 'One small step for man, one giant leap for mankind.' 600 million people — a fifth of the world's population — watched live. The Moon landing produced lasting technological benefits: medical instruments, shoe soles, Teflon, and more — all derived from the program." },

    { id:"berlin_wall", name:"Fall of the Berlin Wall", year:"1989", era:"20th Century", tags:["revolution","politics","europe"], level:"beginner",
      desc:"On November 9, 1989, the Berlin Wall fell after 28 years — symbol of the Cold War's end.",
      quick:["Stood for 28 years","Symbol of Cold War's end","Led to German reunification"],
      deep:"The Berlin Wall was built on August 13, 1961 overnight — East Germany stopped its citizens from fleeing west (3 million had fled in prior years). The Wall became the most tangible symbol of the Cold War and the Iron Curtain. On November 9, 1989, following enormous popular pressure and a series of bureaucratic mistakes, the East German Communist Party spokesman announced the border was immediately open. Thousands rushed to the Wall. The hammering of the Wall became one of the most iconic images of the 20th century. On October 3, 1990 — less than a year later — Germany was reunified." },

    { id:"ussr_collapse", name:"Collapse of Soviet Union", year:"1991", era:"20th Century", tags:["revolution","politics","global"], level:"beginner",
      desc:"The USSR dissolved on December 25, 1991 — 15 independent republics and end of the Cold War.",
      quick:["15 new nations emerged","Ended the Cold War era","Economic crisis and Gorbachev's reforms"],
      deep:"The Soviet Union, at its peak a superpower with 300 million people, dissolved on December 25, 1991 — on Christmas, an ironic detail. Gorbachev, who tried to save the Union with 'glasnost' (openness) and 'perestroika' (restructuring), effectively managed a process that spun out of his control. The Soviet economy was exhausted — low oil prices, the Afghan war (1979–1989), and the cost of competing with the American military destroyed it. The fall of the Iron Curtain in 1989 accelerated independence demands in the republics. On December 25, 1991, Gorbachev resigned, the Soviet flag was lowered from the Kremlin, and 15 independent states were born. The significance: America remained the world's only superpower — the 'unipolar moment.'" },

    { id:"nelson_mandela", name:"Nelson Mandela & End of Apartheid", year:"1990–1994", era:"20th Century", tags:["politics","revolution","africa"], level:"beginner",
      desc:"After 27 years in prison, Mandela led South Africa to multiracial democracy in 1994.",
      quick:["27 years in prison","Led transition to democracy","Elected President in 1994"],
      deep:"Nelson Mandela was imprisoned in 1964 for activities against apartheid — a harsh racial segregation system separating whites and blacks in South Africa. On Robben Island he spent 27 years — refusing release under conditions offered by the government. Mandela became an international symbol of resistance to racism. His release on February 11, 1990 was one of the great moments of the century. The real miracle: Mandela didn't leave prison filled with hatred — he led a policy of reconciliation and multiracialism. The 'Truth and Reconciliation Commission' he established allowed apartheid perpetrators to confess in exchange for amnesty. He won the Nobel Peace Prize (1993) and was elected President in 1994 in the first elections allowing Black South Africans to vote." },

    { id:"internet", name:"The Internet Revolution", year:"1991–2000", era:"20th Century", tags:["science","global"], level:"beginner",
      desc:"The web went public in 1991 and completely changed communication, commerce and daily life.",
      quick:["Web opened to public 1991","Transformed communication and commerce","Birth of the information age"],
      deep:"The internet began as an American military network (ARPANET, 1969). Tim Berners-Lee invented the World Wide Web in 1989 to share research — and released it free to the public in 1991. The first browser (Mosaic, 1993) made the internet accessible. The 'Dot-com bubble' (1995–2000) saw massive investment in internet companies — many collapsed in 2000, but Amazon, Google, and eBay survived. The revolution the internet brought: all human knowledge available anywhere, global commerce, social networks, citizen journalism — and simultaneously: eroded privacy, disinformation, technological addiction. A change still unfolding before our eyes." },

    { id:"nine_eleven", name:"September 11 Attacks", year:"2001", era:"21st Century", tags:["war","politics","global"], level:"beginner",
      desc:"The largest terrorist attack in American history — reshaped global security policy.",
      quick:["3,000 killed","Twin Towers collapsed","Led to the War on Terror"],
      deep:"19 hijackers from al-Qaeda seized 4 planes on September 11, 2001. Two struck the Twin Towers in New York, one hit the Pentagon, and one (where passengers fought back) crashed in Pennsylvania. 2,977 were killed — the largest attack on American soil since Pearl Harbor. The response changed the world: the US invaded Afghanistan (2001) and Iraq (2003) — wars costing trillions of dollars. The Patriot Act eroded civil liberties. TSA and airport security checks became the norm. The conflict with radical Islam left the 'global peace' permanently damaged. Osama bin Laden was killed in 2011 by an American special forces team in Pakistan." },
  ]
};

export default EVENTS;
