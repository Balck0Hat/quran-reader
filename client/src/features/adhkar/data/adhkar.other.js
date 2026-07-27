import { AYAT_ALKURSI, MUAWWIDHAT } from './quranRefs.js';

export const SLEEP_ADHKAR = [
  {
    id: 's-muawwidhat',
    title: 'المعوِّذات (ينفث بهما في كفيه ويمسح جسده)',
    quranRefs: MUAWWIDHAT,
    count: 3,
    source: 'صحيح البخاري',
  },
  {
    id: 's-kursi',
    title: 'آية الكرسي',
    quranRefs: AYAT_ALKURSI,
    count: 1,
    source: 'لن يزال عليك من الله حافظ ولا يقربك شيطان حتى تصبح — البخاري',
  },
  {
    id: 's-bismika',
    text: 'باسمك اللهم أموت وأحيا',
    count: 1,
    source: 'صحيح البخاري',
  },
  {
    id: 's-qini',
    text: 'اللهم قِني عذابك يوم تبعث عبادك',
    count: 3,
    source: 'أبو داود والترمذي',
  },
  {
    id: 's-tasbih',
    text: 'سبحان الله (٣٣) والحمد لله (٣٣) والله أكبر (٣٤)',
    count: 1,
    source: 'خير لكما من خادم — متفق عليه',
  },
];

export const PRAYER_ADHKAR = [
  {
    id: 'p-istighfar',
    text: 'أستغفر الله، أستغفر الله، أستغفر الله، اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام',
    count: 1,
    source: 'صحيح مسلم',
  },
  {
    id: 'p-la-ilah',
    text: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجَدِّ منك الجَد',
    count: 1,
    source: 'متفق عليه',
  },
  {
    id: 'p-tasbih',
    text: 'سبحان الله (٣٣) والحمد لله (٣٣) والله أكبر (٣٣) ثم تمام المئة: لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',
    count: 1,
    source: 'غُفرت خطاياه وإن كانت مثل زبد البحر — صحيح مسلم',
  },
  {
    id: 'p-kursi',
    title: 'آية الكرسي',
    quranRefs: AYAT_ALKURSI,
    count: 1,
    source: 'لم يمنعه من دخول الجنة إلا أن يموت — النسائي',
  },
  {
    id: 'p-muawwidhat',
    title: 'المعوِّذات',
    quranRefs: MUAWWIDHAT,
    count: 1,
    source: 'أبو داود والترمذي والنسائي',
  },
];
