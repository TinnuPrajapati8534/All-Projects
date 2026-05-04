import { useState, useCallback } from 'react';
import { WeddingContext } from './wedding-context';
import { useWedding } from './useWedding';

const THEMES = {
  ivory: {
    name: 'Golden Ivory',
    bg: '#FCF9F2',
    text: '#2D2926',
    accent: '#B38B3F',
    accentLight: '#D4AF37',
    cardBg: 'rgba(255,255,255,0.85)',
    cardBorder: 'rgba(179,139,63,0.3)',
    glow: 'rgba(212,175,55,0.5)',
    muted: '#8B7355',
    gradient: 'linear-gradient(135deg, #FCF9F2 0%, #F5ECD7 50%, #FCF9F2 100%)',
    bgImage: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/931ec439e_3fe58b9a8f907d52415a37faad566f12.jpg',
  },
  emerald: {
    name: 'Emerald Sanctum',
    bg: '#062C21',
    text: '#F3E5AB',
    accent: '#D4AF37',
    accentLight: '#E8C547',
    cardBg: 'rgba(6,44,33,0.85)',
    cardBorder: 'rgba(212,175,55,0.3)',
    glow: 'rgba(212,175,55,0.5)',
    muted: '#7BA68E',
    gradient: 'linear-gradient(135deg, #062C21 0%, #0A4A38 50%, #062C21 100%)',
    bgImage: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/7ce40c1d1_generated_image.png',
  },
  midnight: {
    name: 'Midnight Royal',
    bg: '#0F172A',
    text: '#E2E8F0',
    accent: '#C084FC',
    accentLight: '#D8B4FE',
    cardBg: 'rgba(15,23,42,0.85)',
    cardBorder: 'rgba(192,132,252,0.3)',
    glow: 'rgba(192,132,252,0.5)',
    muted: '#94A3B8',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
    bgImage: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/bf8ff0a38_668e35b28e589c192574c062d6725fdb.jpg',
  },
};


const TRANSLATIONS = {
  en: {
    shriGaneshay: 'Shri Ganeshay Namah',
    shlok1: '"In the presence of sacred fire, with divine blessings, two souls unite as one."',
    shlok2: '"May Lord Ganesha remove all obstacles and bless this sacred union."',
    groomLabel: 'Groom',
    brideLabel: 'Bride',
    fatherLabel: 'Father',
    motherLabel: 'Mother',
    grandparentsLabel: 'With the blessings of our beloved grandparents',
    dadaLabel: 'Grandfather',
    dadiLabel: 'Grandmother',
    weddingEvents: 'Wedding Celebrations',
    haldi: 'Haldi',
    lagan: 'Lagan',
    mehndi: 'Mehndi',
    ladiesSangeet: 'Ladies Sangeet',
    baarat: 'Baarat',
    reception: 'Reception',
    baaratDetails: 'Baarat Details',
    baaratTiming: 'Timing',
    destination: 'Destination',
    venue: 'Venue',
    hostDetails: 'Host Details',
    contact: 'Contact',
    countdown: 'Counting Down to Our Special Day',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    divineGallery: 'Divine Blessings',
    swagatkarta: 'Swagatkarta',
    nanihalPaksh: 'Nanihal Paksh',
    jawaiPaksh: 'Jawai Paksh',
    balManuhaar: 'Bal Manuhaar',
    culturalHonors: 'Cultural Honours',
    footerTitle: 'Venue & Directions',
    homeAddress: 'Home Address',
    receptionVenue: 'Reception Venue',
    baaratDestination: 'Baarat Destination',
    openInMap: 'Open in Maps',
    downloadCard: 'Download Invitation',
    familyOf: 'Family of',
    weds: '&',
    saveTheDate: 'Save the Date',
  },
  hi: {
    shriGaneshay: 'श्री गणेशाय नमः',
    shlok1: '"पवित्र अग्नि की उपस्थिति में, दैवीय आशीर्वाद से, दो आत्माएं एक हो जाती हैं।"',
    shlok2: '"भगवान गणेश सभी बाधाओं को दूर करें और इस पवित्र बंधन को आशीर्वाद दें।"',
    groomLabel: 'वर',
    brideLabel: 'वधू',
    fatherLabel: 'पिता',
    motherLabel: 'माता',
    grandparentsLabel: 'हमारे प्रिय दादा-दादी के आशीर्वाद से',
    dadaLabel: 'दादा जी',
    dadiLabel: 'दादी जी',
    weddingEvents: 'विवाह समारोह',
    haldi: 'हल्दी',
    lagan: 'लगन',
    mehndi: 'मेहंदी',
    ladiesSangeet: 'लेडीज़ संगीत',
    baarat: 'बारात',
    reception: 'रिसेप्शन',
    baaratDetails: 'बारात विवरण',
    baaratTiming: 'समय',
    destination: 'गंतव्य',
    venue: 'स्थल',
    hostDetails: 'मेज़बान विवरण',
    contact: 'संपर्क',
    countdown: 'हमारे विशेष दिन की उलटी गिनती',
    days: 'दिन',
    hours: 'घंटे',
    minutes: 'मिनट',
    seconds: 'सेकंड',
    divineGallery: 'दिव्य आशीर्वाद',
    swagatkarta: 'स्वागतकर्ता',
    nanihalPaksh: 'ननिहाल पक्ष',
    jawaiPaksh: 'जवाई पक्ष',
    balManuhaar: 'बाल मनुहार',
    culturalHonors: 'सांस्कृतिक सम्मान',
    footerTitle: 'स्थल एवं दिशा-निर्देश',
    homeAddress: 'घर का पता',
    receptionVenue: 'रिसेप्शन स्थल',
    baaratDestination: 'बारात गंतव्य',
    openInMap: 'मैप में खोलें',
    downloadCard: 'निमंत्रण डाउनलोड करें',
    familyOf: 'परिवार',
    weds: 'एवं',
    saveTheDate: 'तिथि याद रखें',
  },
};

// Wedding Data - easily customizable
const WEDDING_DATA = {
  groom: { name: 'Arjun', nameHi: 'अर्जुन' },
  bride: { name: 'Diya', nameHi: 'दिया' },
  groomFather: { name: 'Shri Rajesh Kumar', nameHi: 'श्री राजेश कुमार' },
  groomMother: { name: 'Smt. Sunita Devi', nameHi: 'श्रीमती सुनीता देवी' },
  brideFather: { name: 'Shri Mahesh Sharma', nameHi: 'श्री महेश शर्मा' },
  brideMother: { name: 'Smt. Kavita Sharma', nameHi: 'श्रीमती कविता शर्मा' },
  dada: { name: 'Shri Rameshwar Prasad', nameHi: 'श्री रामेश्वर प्रसाद' },
  dadi: { name: 'Smt. Kamla Devi', nameHi: 'श्रीमती कमला देवी' },
  weddingDate: '2026-06-15T10:00:00',
  events: [
    { key: 'haldi', date: '13 June 2026', dateHi: '13 जून 2026', time: '10:00 AM', venue: 'Home', venueHi: 'घर' },
    { key: 'mehndi', date: '13 June 2026', dateHi: '13 जून 2026', time: '4:00 PM', venue: 'Home', venueHi: 'घर' },
    { key: 'ladiesSangeet', date: '14 June 2026', dateHi: '14 जून 2026', time: '7:00 PM', venue: 'Community Hall', venueHi: 'सामुदायिक हॉल' },
    { key: 'lagan', date: '15 June 2026', dateHi: '15 जून 2026', time: '10:00 AM', venue: 'Marriage Garden', venueHi: 'विवाह वाटिका' },
    { key: 'baarat', date: '15 June 2026', dateHi: '15 जून 2026', time: '6:00 PM', venue: 'From Groom House', venueHi: 'वर के घर से' },
    { key: 'reception', date: '16 June 2026', dateHi: '16 जून 2026', time: '7:00 PM', venue: 'Royal Garden', venueHi: 'रॉयल गार्डन' },
  ],
  baarat: {
    timing: '6:00 PM, 15 June 2026',
    timingHi: 'सायं 6:00 बजे, 15 जून 2026',
    destination: 'Shri Mahesh Sharma Residence',
    destinationHi: 'श्री महेश शर्मा निवास',
    venue: 'Near City Temple, Main Road, Jaipur',
    venueHi: 'सिटी मंदिर के पास, मुख्य सड़क, जयपुर',
  },
  host: {
    name: 'Shri Rajesh Kumar',
    nameHi: 'श्री राजेश कुमार',
    phone: '+91 98765 43210',
  },
  culturalCards: [
    { key: 'swagatkarta', names: ['Shri Vikram Singh', 'Shri Anil Kumar'], namesHi: ['श्री विक्रम सिंह', 'श्री अनिल कुमार'] },
    { key: 'nanihalPaksh', names: ['Shri Mohan Lal', 'Smt. Pushpa Devi'], namesHi: ['श्री मोहन लाल', 'श्रीमती पुष्पा देवी'] },
    { key: 'jawaiPaksh', names: ['Shri Suresh Chandra', 'Shri Dinesh Patel'], namesHi: ['श्री सुरेश चंद्र', 'श्री दिनेश पटेल'] },
    { key: 'balManuhaar', names: ['Rohit, Priya, Ankit'], namesHi: ['रोहित, प्रिया, अंकित'] },
  ],
  venues: [
    { key: 'homeAddress', address: '123, Rajput Colony, Jaipur, Rajasthan', addressHi: '123, राजपूत कॉलोनी, जयपुर, राजस्थान', mapUrl: 'https://maps.google.com/?q=26.9124,75.7873' },
    { key: 'receptionVenue', address: 'Royal Garden, NH-8, Jaipur', addressHi: 'रॉयल गार्डन, NH-8, जयपुर', mapUrl: 'https://maps.google.com/?q=26.9124,75.7873' },
    { key: 'baaratDestination', address: 'Near City Temple, Main Road, Jaipur', addressHi: 'सिटी मंदिर के पास, मुख्य सड़क, जयपुर', mapUrl: 'https://maps.google.com/?q=26.9124,75.7873' },
  ],
};

export function WeddingProvider({ children }) {
  const [theme, setTheme] = useState('ivory');
  const [lang, setLang] = useState('en');
  const [musicPlaying, setMusicPlaying] = useState(false);

  const t = useCallback((key) => TRANSLATIONS[lang]?.[key] || key, [lang]);
  const d = useCallback((enVal, hiVal) => lang === 'hi' ? hiVal : enVal, [lang]);
  const currentTheme = THEMES[theme];

  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en');
  const cycleTheme = () => {
    const keys = Object.keys(THEMES);
    const idx = keys.indexOf(theme);
    setTheme(keys[(idx + 1) % keys.length]);
  };

  return (
    <WeddingContext.Provider value={{
      theme, setTheme, cycleTheme, currentTheme, THEMES,
      lang, setLang, toggleLang,
      t, d,
      data: WEDDING_DATA,
      musicPlaying, setMusicPlaying,
    }}>
      {children}
    </WeddingContext.Provider>
  );
}

export { useWedding };
