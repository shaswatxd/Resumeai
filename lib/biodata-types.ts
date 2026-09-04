export type LanguageMode = 'en' | 'hi' | 'hinglish'

export type HeaderSymbol = 'ganesh' | 'om' | 'kalash' | 'swastik' | 'ekonkar' | 'none'

export interface PersonalDetails {
  fullName: string
  gender: 'male' | 'female'
  dob: string
  age: string
  height: string
  weight?: string
  complexion?: string
  bloodGroup?: string
  maritalStatus: string
  education: string
  educationDetail?: string
  occupation: string
  company?: string
  income?: string
  religion: string
  caste: string
  subcaste?: string
  gotra?: string
}

export interface FamilyDetails {
  fatherName: string
  fatherOccupation: string
  motherName: string
  motherOccupation: string
  brothersCount: number
  brothersMarried: number
  sistersCount: number
  sistersMarried: number
  siblingsCustom?: string
  familyType: 'nuclear' | 'joint'
  familyValues: 'traditional' | 'moderate' | 'liberal'
  nativePlace?: string
  currentCity?: string
  aboutFamily?: string
}

export interface HoroscopeDetails {
  enabled: boolean
  rashi?: string
  nakshatra?: string
  manglik: 'no' | 'yes' | 'anshik' | 'dont_know'
  birthTime?: string
  birthPlace?: string
  gan?: string
  charan?: string
}

export interface ContactDetails {
  phone: string
  altPhone?: string
  email: string
  address: string
  nativePlace?: string
  referenceContact?: string
}

export interface BiodataData {
  headerSymbol: HeaderSymbol
  headerTitle: string
  photo: string
  showPhoto: boolean
  language: LanguageMode
  personal: PersonalDetails
  family: FamilyDetails
  horoscope: HoroscopeDetails
  contact: ContactDetails
  aboutMe: string
  partnerExpectations?: string
  hobbies?: string
}

export type BiodataTemplateId =
  | 'royal-marigold'
  | 'vedic-heritage'
  | 'modern-grace'
  | 'rajwada-royal'
  | 'subh-mangalam'

export interface BiodataTemplateMeta {
  id: BiodataTemplateId
  name: string
  nameHindi: string
  tagline: string
  isPremium: boolean
  primaryColor: string
  accentColor: string
  category: 'traditional' | 'royal' | 'modern'
}

export const BIODATA_TEMPLATES: BiodataTemplateMeta[] = [
  {
    id: 'royal-marigold',
    name: 'Shubh Vivah (Royal Crimson)',
    nameHindi: 'शुभ विवाह (शाही लाल एवं स्वर्ण)',
    tagline: 'Deep crimson red with royal gold borders, corner mandalas & auspicious crest.',
    isPremium: false,
    primaryColor: '#800020',
    accentColor: '#D4AF37',
    category: 'traditional',
  },
  {
    id: 'vedic-heritage',
    name: 'Sanskriti (Vedic Heritage)',
    nameHindi: 'संस्कृति (वैदिक विरासत)',
    tagline: 'Warm parchment ivory with rich maroon archways and traditional Kalash motif.',
    isPremium: false,
    primaryColor: '#6B1D2F',
    accentColor: '#C59B27',
    category: 'traditional',
  },
  {
    id: 'modern-grace',
    name: 'Ananta (Modern Grace)',
    nameHindi: 'अनंता (आधुनिक गरिमा)',
    tagline: 'Contemporary emerald and rose gold aesthetics with clean card-based symmetry.',
    isPremium: true,
    primaryColor: '#064E3B',
    accentColor: '#E0A96D',
    category: 'modern',
  },
  {
    id: 'rajwada-royal',
    name: 'Rajwada (Royal Palace)',
    nameHindi: 'रजवाड़ा (राजसी वैभव)',
    tagline: 'Regal sapphire navy with metallic gold framing and ornate Mughal Jali motifs.',
    isPremium: true,
    primaryColor: '#0F172A',
    accentColor: '#CA8A04',
    category: 'royal',
  },
  {
    id: 'subh-mangalam',
    name: 'Subh Mangalam (Floral Lotus)',
    nameHindi: 'शुभ मंगलम (कमल पुष्पमाला)',
    tagline: 'Auspicious vermilion saffron with sacred floral garland accents and ivory backdrop.',
    isPremium: true,
    primaryColor: '#9A3412',
    accentColor: '#F59E0B',
    category: 'traditional',
  },
]

export const SAMPLE_BIODATA_DATA: BiodataData = {
  headerSymbol: 'ganesh',
  headerTitle: '|| श्री गणेशाय नमः ||',
  photo: '',
  showPhoto: false,
  language: 'hi',
  personal: {
    fullName: 'राहुल शर्मा',
    gender: 'male',
    dob: '1996-08-15',
    age: '29 वर्ष',
    height: '5\' 10" (178 सेमी)',
    weight: '72 किग्रा',
    complexion: 'गेहुंआ',
    bloodGroup: 'B+',
    maritalStatus: 'अविवाहित (Never Married)',
    education: 'बी.टेक (कंप्यूटर साइंस) - आईआईटी दिल्ली',
    educationDetail: 'प्रथम श्रेणी में उत्तीर्ण (2018)',
    occupation: 'सीनियर सॉफ्टवेयर इंजीनियर (Senior Software Engineer)',
    company: 'गूगल इंडिया (Google India, Bangalore)',
    income: '₹32 लाख प्रति वर्ष',
    religion: 'हिंदू (Hindu)',
    caste: 'ब्राह्मण (Brahmin)',
    subcaste: 'गौड़ (Gaur)',
    gotra: 'कश्यप (Kashyap)',
  },
  family: {
    fatherName: 'श्री दिनेश कुमार शर्मा',
    fatherOccupation: 'वरिष्ठ प्रबंधक (सेवानिवृत्त), भारतीय स्टेट बैंक',
    motherName: 'श्रीमती सुनीता शर्मा',
    motherOccupation: 'गृहणी (Homemaker)',
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 1,
    sistersMarried: 0,
    siblingsCustom: '1 बड़ा भाई (विवाहित, डॉक्टर), 1 छोटी बहन (अध्ययनरत - MBA)',
    familyType: 'nuclear',
    familyValues: 'moderate',
    nativePlace: 'जयपुर, राजस्थान',
    currentCity: 'नई दिल्ली',
    aboutFamily: 'संस्कारी, उच्च शिक्षित एवं सम्मानित मध्यमवर्गीय परिवार।',
  },
  horoscope: {
    enabled: true,
    rashi: 'सिंह (Leo)',
    nakshatra: 'मघा (Magha)',
    manglik: 'no',
    birthTime: '06:45 AM',
    birthPlace: 'जयपुर, राजस्थान',
    gan: 'देव (Deva)',
    charan: 'प्रथम (1st)',
  },
  contact: {
    phone: '+91 98765 43210',
    altPhone: '+91 98111 22334',
    email: 'rahul.sharma96@example.com',
    address: 'एच-42, मॉडल टाउन, फेज 2, नई दिल्ली - 110009',
    nativePlace: 'जयपुर, राजस्थान',
    referenceContact: 'श्री आर. के. शर्मा (मामा जी, पुलिस अधीक्षक)',
  },
  aboutMe: 'शांत स्वभाव, पारिवारिक मूल्यों में विश्वास रखने वाला, एवं प्रगतिशील विचारों से युक्त। पढ़ने, यात्रा करने और बैडमिंटन खेलने का शौक है। जीवन में संतुलन, आपसी सम्मान और समझ को प्राथमिकता देता हूँ।',
  partnerExpectations: 'सुशिक्षित, समझदार एवं पारिवारिक संस्कारों का सम्मान करने वाली जीवनसंगिनी की तलाश है जो जीवन के हर मोड़ पर मित्र बनकर साथ निभाए।',
  hobbies: 'यात्रा, शास्त्रीय संगीत, बैडमिंटन, तकनीकी पठन',
}

export const SAMPLE_BIODATA_DATA_EN: BiodataData = {
  headerSymbol: 'ganesh',
  headerTitle: '|| Shree Ganeshaya Namah ||',
  photo: '',
  showPhoto: false,
  language: 'en',
  personal: {
    fullName: 'Rahul Sharma',
    gender: 'male',
    dob: '1996-08-15',
    age: '29 Yrs',
    height: '5\' 10" (178 cm)',
    weight: '72 kg',
    complexion: 'Fair',
    bloodGroup: 'B+',
    maritalStatus: 'Never Married',
    education: 'B.Tech in Computer Science, IIT Delhi',
    educationDetail: 'Graduated with First Class Distinction (2018)',
    occupation: 'Senior Software Engineer',
    company: 'Google India, Bangalore',
    income: '₹32 LPA',
    religion: 'Hindu',
    caste: 'Brahmin',
    subcaste: 'Gaur',
    gotra: 'Kashyap',
  },
  family: {
    fatherName: 'Mr. Dinesh Kumar Sharma',
    fatherOccupation: 'Senior Manager (Retd.), State Bank of India',
    motherName: 'Mrs. Sunita Sharma',
    motherOccupation: 'Homemaker',
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 1,
    sistersMarried: 0,
    siblingsCustom: '1 Elder Brother (Married, Doctor), 1 Younger Sister (Pursuing MBA)',
    familyType: 'nuclear',
    familyValues: 'moderate',
    nativePlace: 'Jaipur, Rajasthan',
    currentCity: 'New Delhi',
    aboutFamily: 'A close-knit, well-educated, cultured upper middle class family.',
  },
  horoscope: {
    enabled: true,
    rashi: 'Leo (Singh)',
    nakshatra: 'Magha',
    manglik: 'no',
    birthTime: '06:45 AM',
    birthPlace: 'Jaipur, Rajasthan',
    gan: 'Deva',
    charan: '1st',
  },
  contact: {
    phone: '+91 98765 43210',
    altPhone: '+91 98111 22334',
    email: 'rahul.sharma96@example.com',
    address: 'H-42, Model Town, Phase 2, New Delhi - 110009',
    nativePlace: 'Jaipur, Rajasthan',
    referenceContact: 'Mr. R. K. Sharma (Maternal Uncle, SP Police)',
  },
  aboutMe: 'Calm-tempered, ambitious yet deeply rooted in family values. Enjoys travel, fitness, and reading. Looking for a compassionate partner with mutual respect, shared humor, and positive outlook towards life.',
  partnerExpectations: 'Looking for an educated, understanding, and family-oriented companion who values open communication and shared life growth.',
  hobbies: 'Traveling, Reading, Badminton, Classical Music',
}
