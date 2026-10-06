export type LanguageMode = 'en' | 'hi' | 'hinglish'

export type ReligionKey = 'all' | 'hindu' | 'muslim' | 'sikh' | 'christian' | 'jain'

export type HeaderSymbol =
  | 'ganesh'
  | 'om'
  | 'kalash'
  | 'swastik'
  | 'bismillah'
  | 'crescent'
  | 'khanda'
  | 'ekonkar'
  | 'cross'
  | 'dove'
  | 'navkar'
  | 'ahimsa'
  | 'none'

export type PhotoFrame = 'rectangle' | 'circle' | 'ornate'

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
  nadi?: string
}

export interface ReligionSpecificDetails {
  selectedReligion: ReligionKey
  // Hindu
  gotra?: string
  subcaste?: string
  kula?: string
  kuldevta?: string
  // Muslim (Nikah)
  maslak?: string // e.g. Sunni / Hanafi / Deobandi / Barelvi / Shia
  namazFrequency?: string // e.g. 5 times daily, Regular
  rozaFasting?: string // e.g. Regular during Ramadan
  quranStatus?: string // e.g. Nazira / Hafiz / Fluent
  hijabOrBeard?: string // e.g. Wears Hijab / Sunnah Beard / Modern
  mahrExpectation?: string // e.g. As per Sharia / Modest
  nanihal?: string // Maternal family / Nanihal details
  // Sikh (Anand Karaj)
  amritdhari?: 'yes' | 'no' | 'sehajdhari'
  turbanOrKesh?: string // e.g. Turbaned / Trimmed / Natural Kesh
  pind?: string // Ancestral village / Pind
  nankey?: string // Maternal grandparents village / family
  dhadkey?: string // Paternal grandparents family
  // Christian (Holy Matrimony)
  denomination?: string // Catholic / Protestant / Orthodox / Mar Thoma / Baptist / CSI
  parishOrChurch?: string // Church / Parish name
  baptized?: 'yes' | 'no'
  confirmed?: 'yes' | 'no'
  pastorReference?: string // Parish Priest / Pastor name
  bibleVerse?: string // Favorite Bible verse
  // Jain (Jain Vivah)
  sampradaya?: string // Digambar / Shwetambar
  panth?: string // Terapanthi / Murtipujak / Sthanakvasi / Mandir Margi
  strictVegetarian?: boolean // Pure Vegetarian (No Root Veg / Onion Garlic)
  jainGotra?: string
}

export interface ContactDetails {
  phone: string
  altPhone?: string
  email: string
  address: string
  nativePlace?: string
  referenceContact?: string
}

export interface CustomSectionItem {
  id: string
  title: string
  content: string
}

export interface BiodataData {
  headerSymbol: HeaderSymbol
  headerTitle: string
  photo: string
  showPhoto: boolean
  photoFrame: PhotoFrame
  language: LanguageMode
  religionKey: ReligionKey
  personal: PersonalDetails
  family: FamilyDetails
  horoscope: HoroscopeDetails
  religionDetails: ReligionSpecificDetails
  customSections: CustomSectionItem[]
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
  | 'islamic-noor'
  | 'mughal-elegance'
  | 'anand-karaj'
  | 'golden-temple-royal'
  | 'holy-matrimony'
  | 'jain-sanskriti'

export interface BiodataTemplateMeta {
  id: BiodataTemplateId
  name: string
  nameHindi: string
  tagline: string
  isPremium: boolean
  primaryColor: string
  accentColor: string
  religion: ReligionKey
  category: 'traditional' | 'royal' | 'modern'
}

export const BIODATA_TEMPLATES: BiodataTemplateMeta[] = [
  // HINDU
  {
    id: 'royal-marigold',
    name: 'Shubh Vivah (Royal Crimson)',
    nameHindi: 'शुभ विवाह (शाही लाल एवं स्वर्ण)',
    tagline: 'Deep crimson red with royal gold borders, corner mandalas & Ganesh crest.',
    isPremium: false,
    primaryColor: '#800020',
    accentColor: '#D4AF37',
    religion: 'hindu',
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
    religion: 'hindu',
    category: 'traditional',
  },
  {
    id: 'rajwada-royal',
    name: 'Rajwada (Royal Palace)',
    nameHindi: 'रजवाड़ा (राजसी वैभव)',
    tagline: 'Regal sapphire navy with metallic gold framing and ornate Mughal Jali motifs.',
    isPremium: true,
    primaryColor: '#0F172A',
    accentColor: '#CA8A04',
    religion: 'hindu',
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
    religion: 'hindu',
    category: 'traditional',
  },

  // MUSLIM (NIKAH)
  {
    id: 'islamic-noor',
    name: 'Noor-e-Nikah (Emerald Gold)',
    nameHindi: 'नूर-ए-निकाह (शाही पन्ना एवं स्वर्ण)',
    tagline: 'Majestic Islamic emerald green with Bismillah calligraphy and Arabesque arch.',
    isPremium: false,
    primaryColor: '#064E3B',
    accentColor: '#D4AF37',
    religion: 'muslim',
    category: 'traditional',
  },
  {
    id: 'mughal-elegance',
    name: 'Mughal Jali (Pearl Teal)',
    nameHindi: 'मुगल जाली (मोती एवं टील)',
    tagline: 'Sophisticated pearl ivory with intricate geometric Jali lattice and gold foil borders.',
    isPremium: true,
    primaryColor: '#0F766E',
    accentColor: '#FBBF24',
    religion: 'muslim',
    category: 'royal',
  },

  // SIKH (ANAND KARAJ)
  {
    id: 'anand-karaj',
    name: 'Anand Karaj (Kesari Blue)',
    nameHindi: 'आनंद कारज (केसरी व रॉयल ब्लू)',
    tagline: 'Vibrant Kesari saffron and deep royal blue with Khanda Sahib crest & Phulkari accents.',
    isPremium: false,
    primaryColor: '#1E3A8A',
    accentColor: '#F59E0B',
    religion: 'sikh',
    category: 'traditional',
  },
  {
    id: 'golden-temple-royal',
    name: 'Darbar Heritage (Indigo Gold)',
    nameHindi: 'दरबार हेरिटेज (इंडिगो व स्वर्ण)',
    tagline: 'Royal gold and deep indigo inspired by holy heritage with Ek Onkar emblem.',
    isPremium: true,
    primaryColor: '#1E1B4B',
    accentColor: '#EAB308',
    religion: 'sikh',
    category: 'royal',
  },

  // CHRISTIAN (HOLY MATRIMONY)
  {
    id: 'holy-matrimony',
    name: 'Sacred Grace (Cathedral Ivory)',
    nameHindi: 'होली मैट्रिमोनी (कैथेड्रल ग्रेस)',
    tagline: 'Serene pearl white & deep navy/burgundy with Holy Cross and delicate lace borders.',
    isPremium: false,
    primaryColor: '#1E293B',
    accentColor: '#831843',
    religion: 'christian',
    category: 'traditional',
  },

  // JAIN (JAIN VIVAH)
  {
    id: 'jain-sanskriti',
    name: 'Ahimsa Grace (Sandalwood)',
    nameHindi: 'अहिंसा ग्रेस (चंदन व स्वर्ण)',
    tagline: 'Pure ivory and warm sandalwood tones with holy Navkar Mantra crest.',
    isPremium: false,
    primaryColor: '#92400E',
    accentColor: '#D97706',
    religion: 'jain',
    category: 'traditional',
  },

  // MODERN UNIVERSAL
  {
    id: 'modern-grace',
    name: 'Ananta (Universal Grace)',
    nameHindi: 'अनंता (सर्वमान्य आधुनिक)',
    tagline: 'Contemporary luxury aesthetic with clean card-based symmetry for all backgrounds.',
    isPremium: true,
    primaryColor: '#0F172A',
    accentColor: '#E0A96D',
    religion: 'all',
    category: 'modern',
  },
]

export const SAMPLE_BIODATA_HINDU: BiodataData = {
  headerSymbol: 'ganesh',
  headerTitle: '|| Shree Ganeshay Namah ||',
  photo: '',
  showPhoto: false,
  photoFrame: 'rectangle',
  language: 'en',
  religionKey: 'hindu',
  personal: {
    fullName: 'Rahul Sharma',
    gender: 'male',
    dob: '1996-08-15',
    age: '29 Yrs',
    height: '5\' 10" (178 cm)',
    weight: '72 kg',
    complexion: 'Wheatish',
    bloodGroup: 'B+',
    maritalStatus: 'Never Married',
    education: 'B.Tech (Computer Science) - IIT Delhi',
    educationDetail: 'First Class with Distinction (2018)',
    occupation: 'Senior Software Engineer',
    company: 'Google India (Bangalore)',
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
    aboutFamily: 'Cultured, well-educated, and respectable family with moderate traditional values.',
  },
  horoscope: {
    enabled: true,
    rashi: 'Leo (सिंह)',
    nakshatra: 'Magha (मघा)',
    manglik: 'no',
    birthTime: '06:45 AM',
    birthPlace: 'Jaipur, Rajasthan',
    gan: 'Deva',
    charan: '1st',
    nadi: 'Antya',
  },
  religionDetails: {
    selectedReligion: 'hindu',
    gotra: 'Kashyap',
    subcaste: 'Gaur Brahmin',
  },
  customSections: [],
  contact: {
    phone: '+91 98765 43210',
    altPhone: '+91 98111 22334',
    email: 'rahul.sharma96@example.com',
    address: 'H-42, Model Town, Phase 2, New Delhi - 110009',
    nativePlace: 'Jaipur, Rajasthan',
    referenceContact: 'Mr. R. K. Sharma (Maternal Uncle, SP Police)',
  },
  aboutMe: 'Calm, family-oriented professional with progressive values. Passionate about reading, traveling, and playing badminton. Believe in mutual respect, companionship, and maintaining balance in life.',
  partnerExpectations: 'Looking for an educated, understanding, and warm life partner who respects family values and believes in growing together as best friends.',
  hobbies: 'Traveling, Classical Music, Badminton, Tech Reading',
}

export const SAMPLE_BIODATA_MUSLIM: BiodataData = {
  headerSymbol: 'bismillah',
  headerTitle: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  photo: '',
  showPhoto: false,
  photoFrame: 'ornate',
  language: 'en',
  religionKey: 'muslim',
  personal: {
    fullName: 'Mohammad Zaid Khan',
    gender: 'male',
    dob: '1995-11-20',
    age: '30 Yrs',
    height: '5\' 11" (180 cm)',
    weight: '75 kg',
    complexion: 'Fair',
    bloodGroup: 'O+',
    maritalStatus: 'Never Married',
    education: 'M.S. in Data Analytics, B.Tech CS',
    educationDetail: 'Jamia Millia Islamia, New Delhi',
    occupation: 'Lead AI Engineer',
    company: 'Microsoft India, Hyderabad',
    income: '₹36 LPA',
    religion: 'Islam',
    caste: 'Pathan',
    subcaste: 'Yusufzai',
  },
  family: {
    fatherName: 'Dr. Tariq Anwar Khan',
    fatherOccupation: 'Professor & HOD, Civil Engineering (AMU Aligarh)',
    motherName: 'Begum Shabana Khan',
    motherOccupation: 'Homemaker (MA Urdu)',
    brothersCount: 1,
    brothersMarried: 0,
    sistersCount: 1,
    sistersMarried: 1,
    siblingsCustom: '1 Younger Brother (Software Engineer at Amazon), 1 Elder Sister (Married, Architect in Dubai)',
    familyType: 'nuclear',
    familyValues: 'moderate',
    nativePlace: 'Lucknow, Uttar Pradesh',
    currentCity: 'Hyderabad',
    aboutFamily: 'A pious, respectable, well-educated family balancing Deen and Dunya.',
  },
  horoscope: {
    enabled: false,
    manglik: 'no',
  },
  religionDetails: {
    selectedReligion: 'muslim',
    maslak: 'Sunni / Hanafi',
    namazFrequency: '5 Times Daily (Punctual)',
    rozaFasting: 'Regular during Ramadan & Voluntary fasts',
    quranStatus: 'Nazira with Tajweed & understanding',
    hijabOrBeard: 'Trimmed Sunnah Beard',
    mahrExpectation: 'As per Islamic Sharia & mutual consensus',
    nanihal: 'Khan family of Aligarh (Educationists & Civil Servants)',
  },
  customSections: [],
  contact: {
    phone: '+91 98234 56789',
    altPhone: '+91 98345 67890',
    email: 'zaid.khan.ai@example.com',
    address: 'B-14, Green Park Avenue, Banjara Hills, Hyderabad - 500034',
    nativePlace: 'Lucknow, UP',
    referenceContact: 'Janab Farooq Ahmad Khan (Maternal Uncle, Retd. Judge)',
  },
  aboutMe: 'Practicing Muslim who strives to live by Islamic ethics with humility and honesty. Passionate about technology, reading, fitness, and family gatherings. Looking forward to building a peaceful home based on love, faith, and mutual respect.',
  partnerExpectations: 'Looking for a pious, educated, and kind-hearted Muslimah who values prayers, family modesty, and mutual growth in Deen and life.',
  hobbies: 'Islamic History, Cycling, Calligraphy, Traveling',
}

export const SAMPLE_BIODATA_SIKH: BiodataData = {
  headerSymbol: 'khanda',
  headerTitle: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ || Anand Karaj',
  photo: '',
  showPhoto: false,
  photoFrame: 'circle',
  language: 'en',
  religionKey: 'sikh',
  personal: {
    fullName: 'Gurpreet Singh Dhillon',
    gender: 'male',
    dob: '1996-04-10',
    age: '29 Yrs',
    height: '6\' 0" (183 cm)',
    weight: '78 kg',
    complexion: 'Very Fair',
    bloodGroup: 'B+',
    maritalStatus: 'Never Married',
    education: 'MBA (Finance), B.Com (Hons)',
    educationDetail: 'Delhi University & Panjab University',
    occupation: 'Senior Financial Consultant',
    company: 'Ernst & Young (EY), Gurgaon',
    income: '₹28 LPA',
    religion: 'Sikh',
    caste: 'Jatt Sikh',
    subcaste: 'Dhillon',
    gotra: 'Dhillon',
  },
  family: {
    fatherName: 'Sardar Manjit Singh Dhillon',
    fatherOccupation: 'Executive Director (Retd.), Punjab Agro Industries',
    motherName: 'Sardarni Harpreet Kaur Dhillon',
    motherOccupation: 'Govt. High School Principal (Retd.)',
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 0,
    sistersMarried: 0,
    siblingsCustom: '1 Elder Brother (Married, Commercial Pilot in Air India)',
    familyType: 'nuclear',
    familyValues: 'moderate',
    nativePlace: 'Ludhiana, Punjab',
    currentCity: 'Chandigarh / Mohali',
    aboutFamily: 'A proud, noble Gursikh family with high moral values, ancestral landholdings, and professional standing.',
  },
  horoscope: {
    enabled: false,
    manglik: 'no',
  },
  religionDetails: {
    selectedReligion: 'sikh',
    amritdhari: 'no',
    turbanOrKesh: 'Turbaned / Keshadhari Sikh (Handsome Turbaned Look)',
    pind: 'Dhillon Kalan, District Ludhiana, Punjab',
    nankey: 'Sandhu family, Village Kotkapura, Faridkot',
    dhadkey: 'Dhillon family, Ludhiana',
  },
  customSections: [
    {
      id: 'c1',
      title: 'Ancestral Land & Property',
      content: '22 Acres fertile agricultural land in Ludhiana + Independent Kothi in Sector 70, Mohali.',
    },
  ],
  contact: {
    phone: '+91 98712 34567',
    altPhone: '+91 98123 45678',
    email: 'gurpreet.dhillon@example.com',
    address: 'House No. 342, Sector 70, SAS Nagar (Mohali), Punjab - 160071',
    nativePlace: 'Ludhiana, Punjab',
    referenceContact: 'Sardar Jaswant Singh Sandhu (Mama Ji, SP Vigilance Punjab)',
  },
  aboutMe: 'Proud Keshadhari Sikh, athletic and outgoing. Believes in Chardi Kala, hard work, and respecting elders. Loves exploring new cuisines, fitness, and playing soccer on weekends.',
  partnerExpectations: 'Looking for a warm, cultured, educated Gursikh girl who values family traditions and open communication.',
  hobbies: 'Bhangra, Gym & Fitness, Travel, Horse Riding',
}

export const SAMPLE_BIODATA_CHRISTIAN: BiodataData = {
  headerSymbol: 'cross',
  headerTitle: '† In God’s Grace · Holy Matrimony †',
  photo: '',
  showPhoto: false,
  photoFrame: 'circle',
  language: 'en',
  religionKey: 'christian',
  personal: {
    fullName: 'Kevin Mathew Thomas',
    gender: 'male',
    dob: '1995-09-12',
    age: '30 Yrs',
    height: '5\' 11" (180 cm)',
    weight: '74 kg',
    complexion: 'Fair',
    bloodGroup: 'A+',
    maritalStatus: 'Never Married',
    education: 'M.Tech in Biomedical Engineering',
    educationDetail: 'Vellore Institute of Technology (VIT)',
    occupation: 'Lead Healthcare Systems Specialist',
    company: 'Siemens Healthineers, Bangalore',
    income: '₹26 LPA',
    religion: 'Christian',
    caste: 'Syrian Christian (Knanaya / Catholic)',
  },
  family: {
    fatherName: 'Mr. Mathew Thomas',
    fatherOccupation: 'Senior Project Consultant (Retd.), KSEB Kerala',
    motherName: 'Mrs. Mary Mathew',
    motherOccupation: 'Nursing Superintendent (Retd.), Apollo Hospital',
    brothersCount: 0,
    brothersMarried: 0,
    sistersCount: 1,
    sistersMarried: 1,
    siblingsCustom: '1 Elder Sister (Married, Pediatrician in London, UK)',
    familyType: 'nuclear',
    familyValues: 'moderate',
    nativePlace: 'Kottayam, Kerala',
    currentCity: 'Bangalore, Karnataka',
    aboutFamily: 'A devout, well-settled family rooted in faith, honesty, and community service.',
  },
  horoscope: {
    enabled: false,
    manglik: 'no',
  },
  religionDetails: {
    selectedReligion: 'christian',
    denomination: 'Roman Catholic (Syro-Malabar)',
    parishOrChurch: 'St. Mary’s Forane Church, Bangalore / Kottayam',
    baptized: 'yes',
    confirmed: 'yes',
    pastorReference: 'Fr. George Varghese, Parish Priest',
    bibleVerse: '"Love is patient, love is kind. It does not envy, it does not boast." — 1 Corinthians 13:4',
  },
  customSections: [],
  contact: {
    phone: '+91 98450 12345',
    altPhone: '+91 98450 67890',
    email: 'kevin.thomas@example.com',
    address: 'Flat 402, St. Thomas Enclave, Koramangala, Bangalore - 560034',
    nativePlace: 'Kottayam, Kerala',
    referenceContact: 'Dr. Philip V. Thomas (Uncle, Cardiologist)',
  },
  aboutMe: 'Christ-centered individual with a warm sense of humor and optimistic outlook on life. Enjoys church choir, playing acoustic guitar, trekking, and volunteering. Strives to build a loving home grounded in Christian stewardship.',
  partnerExpectations: 'Seeking a faithful, educated, family-minded Christian partner with kind temperament and shared spiritual values.',
  hobbies: 'Guitar, Choir Singing, Hiking, Photography',
}

export const SAMPLE_BIODATA_JAIN: BiodataData = {
  headerSymbol: 'navkar',
  headerTitle: '|| Om Arham Namah · Namo Arihantanam ||',
  photo: '',
  showPhoto: false,
  photoFrame: 'ornate',
  language: 'en',
  religionKey: 'jain',
  personal: {
    fullName: 'Amit Kumar Jain',
    gender: 'male',
    dob: '1997-03-25',
    age: '28 Yrs',
    height: '5\' 9" (175 cm)',
    weight: '70 kg',
    complexion: 'Fair',
    bloodGroup: 'AB+',
    maritalStatus: 'Never Married',
    education: 'Chartered Accountant (CA) & B.Com',
    educationDetail: 'ICAI All India Rankholder (AIR 34)',
    occupation: 'Senior Vice President (Wealth Advisory)',
    company: 'HDFC Bank (HQ, Mumbai)',
    income: '₹34 LPA',
    religion: 'Jain',
    caste: 'Shwetambar Oswal',
    gotra: 'Lodha',
  },
  family: {
    fatherName: 'Mr. Shantilal Ji Jain',
    fatherOccupation: 'Renowned Businessman (Jewellery & Exports)',
    motherName: 'Mrs. Vimla Devi Jain',
    motherOccupation: 'Homemaker (Religious & Cultured)',
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 0,
    sistersMarried: 0,
    siblingsCustom: '1 Elder Brother (Married, Business Partner)',
    familyType: 'joint',
    familyValues: 'traditional',
    nativePlace: 'Jodhpur / Udaipur, Rajasthan',
    currentCity: 'Mumbai, Maharashtra',
    aboutFamily: 'Pure vegetarian, highly reputed, God-fearing united joint family with deep spiritual values.',
  },
  horoscope: {
    enabled: true,
    rashi: 'Libra (तुला)',
    nakshatra: 'Swati (स्वाति)',
    manglik: 'no',
    birthTime: '08:15 AM',
    birthPlace: 'Jodhpur, Rajasthan',
  },
  religionDetails: {
    selectedReligion: 'jain',
    sampradaya: 'Shwetambar',
    panth: 'Murtipujak',
    strictVegetarian: true,
    jainGotra: 'Lodha',
  },
  customSections: [
    {
      id: 'j1',
      title: 'Religious Lifestyle',
      content: 'Pure vegetarian (strictly avoids root vegetables & night dining), daily Navkar Mantra recitation.',
    },
  ],
  contact: {
    phone: '+91 98201 23456',
    altPhone: '+91 98202 34567',
    email: 'amit.jain.ca@example.com',
    address: 'Flat 801, Mahavir Towers, Malabar Hill, Mumbai - 400006',
    nativePlace: 'Jodhpur, Rajasthan',
    referenceContact: 'Mr. Uttamchand Ji Jain (President, Mumbai Jain Sangh)',
  },
  aboutMe: 'Cultured, spiritually grounded, and professionally ambitious. Perfect balance of traditional Jain values and modern outlook. Passionate about pilgrimage, reading, and chess.',
  partnerExpectations: 'Looking for a cultured, well-educated, and compassionate life partner from a respected Jain family who values traditions while embracing modern outlook.',
  hobbies: 'Jain Philosophy, Chess, Pilgrimage, Yoga',
}

export const SAMPLE_BIODATA_DATA = SAMPLE_BIODATA_HINDU
export const SAMPLE_BIODATA_DATA_EN = SAMPLE_BIODATA_HINDU
