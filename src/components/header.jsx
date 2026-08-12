// src/components/Header.jsx
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo_choko.png";

export default function ConfectioneryHeader() {
  // Добавили функцию "t" для перевода текстов
  const { lang, setLang, t } = useLanguage(); 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "RU", label: "Русский" },
    { code: "TJ", label: "Тоҷикӣ" },
    { code: "EN", label: "English" }
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative bg-[#FFF9F6] border-b border-[#F7E1DA] z-40">
      {/* Мягкое клубнично-кремовое свечение в центре */}
      <div className="pointer-events-none absolute -top-16 left-1/2 h-36 w-64 -translate-x-1/2 rounded-full bg-[#FF8FAB]/10 blur-2xl" />

      <div className="relative mx-auto flex h-[90px] max-w-md items-center justify-between gap-3 px-5">
        
        {/* LOGO + BRAND */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Изящное оформление логотипа с мягкой розовой каемкой */}
          <div className="h-14 w-14 shrink-0 rounded-full border border-[#FFA3B1]/40 p-[2px] shadow-[0_4px_12px_rgba(225,44,67,0.06)] bg-white">
            <div className="h-full w-full overflow-hidden rounded-full bg-white flex items-center justify-center">
              <img
                src={logo}
                alt="Choko Lokma"
                className="h-full w-full object-cover scale-105"
              />
            </div>
          </div>

          <div className="min-w-0">
            {/* Название бренда из словаря переводов */}
            <h1 className="truncate font-serif text-[20px] font-bold tracking-wide text-[#E12C43]">
              {t("header.title")}
            </h1>
            {/* Тёплый шоколадный цвет для динамического подзаголовка */}
            <p className="mt-0.5 text-[8px] uppercase tracking-[0.3em] font-semibold text-[#5C4033]">
              {t("header.subtitle")}
            </p>
          </div>
        </div>

        {/* SELECT LANGUAGE */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 rounded-full border border-[#E12C43]/20 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#5C4033] transition hover:border-[#E12C43]/50 hover:bg-white active:scale-95 shadow-[0_2px_8px_rgba(225,44,67,0.04)]"
          >
            <span className="text-[#E12C43] text-[11px] font-bold uppercase">{lang}</span>
            <svg
              viewBox="0 0 20 20"
              className={`h-4 w-4 text-[#E12C43] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 7.5L10 12.5L15 7.5" />
            </svg>
          </button>

          {/* DROPDOWN MENU */}
          {isOpen && (
            <div className="absolute right-0 top-11 z-50 w-36 overflow-hidden rounded-2xl border border-[#F7E1DA] bg-white/95 shadow-[0_12px_30px_rgba(92,64,51,0.08)] backdrop-blur-md">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLang(item.code);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-xs text-[#5C4033] transition hover:bg-[#FFF2F0] hover:text-[#E12C43]"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-[10px] font-bold text-[#FFA3B1]">{item.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}