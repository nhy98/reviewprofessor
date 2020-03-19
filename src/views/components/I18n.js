import i18next from "i18next";
//import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationEn from "../../utils/languages/english.json";
import translationVi from "../../utils/languages/vietnames.json";
import translationJa from "../../utils/languages/japanes.json";

const resources = {
  en: {
    translation: translationEn
  },
  vi: {
    translation: translationVi
  },
  ja: {
    translation: translationJa
  }
};

i18next
  .use(detector)
  //.use(reactI18nextModule)
  .init({
    resources,
    lng: "vi",
    fallbackLng: "vi",
    // keySeparator: false,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18next;
