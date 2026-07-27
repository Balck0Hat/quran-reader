import { useEffect, useState } from 'react';
import { fetchVerseText } from '../../progress/services/quranRefs.service.js';

// يجلب نصوص مقاطع قرآنية [{chapter, from, to}] ويعيدها مجموعة لكل مقطع
export const useQuranRefsText = (quranRefs) => {
  const [passages, setPassages] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!quranRefs) return;
    let cancelled = false;
    Promise.all(
      quranRefs.map(async (ref) => {
        const numbers = [];
        for (let verse = ref.from; verse <= ref.to; verse += 1) numbers.push(verse);
        const texts = await Promise.all(
          numbers.map((verse) => fetchVerseText(ref.chapter, verse))
        );
        return texts.join(' ۝ ');
      })
    )
      .then((result) => !cancelled && setPassages(result))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [quranRefs]);

  return { passages, failed };
};
