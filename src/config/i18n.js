import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "site-name": "Gutenberg Project",
            "site-description": "A social cataloging website that allows you to freely search its database of books, annotations and reviews.",
            "fiction": "fiction",
            "drama": "drama",
            "humor": "humor",
            "politics": "politics",
            "philosophy": "philosophy",
            "history": "history",
            "adventure": "adventure"
        }
    }
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        lng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
