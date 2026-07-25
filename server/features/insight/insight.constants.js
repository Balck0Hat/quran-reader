// Curated official Arabic tafsirs available on the Quran.com API.
export const TAFSIRS = [
  { id: 16, name: 'التفسير الميسر', author: 'نخبة من العلماء' },
  { id: 14, name: 'تفسير ابن كثير', author: 'ابن كثير' },
  { id: 91, name: 'تفسير السعدي', author: 'عبد الرحمن السعدي' },
  { id: 15, name: 'تفسير الطبري', author: 'ابن جرير الطبري' },
  { id: 90, name: 'تفسير القرطبي', author: 'القرطبي' },
  { id: 94, name: 'تفسير البغوي', author: 'البغوي' },
  { id: 93, name: 'التفسير الوسيط', author: 'محمد سيد طنطاوي' },
];

// Per-ayah linguistic sources on the tafsir CDN (slug → edition path).
export const LINGUISTIC_SOURCES = {
  irab: 'al-i-rab-al-muyassar',
  language: 'i-rab-al-quran-li-al-darwish',
  gharib: 'asseraj-fi-bayan-gharib-alquran',
};
