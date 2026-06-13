import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`px-3 py-1.5 text-sm font-medium transition-all ${
          i18n.language === "en"
            ? "bg-goldenrod text-[#000814]"
            : "text-white hover:text-goldenrod"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => i18n.changeLanguage("mr")}
        className={`px-3 py-1.5 text-sm font-medium transition-all ${
          i18n.language === "mr"
            ? "bg-goldenrod text-[#000814]"
            : "text-white hover:text-goldenrod"
        }`}
      >
        मराठी
      </button>
    </div>
  );
}