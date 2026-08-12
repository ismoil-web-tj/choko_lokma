// src/components/Footer.jsx
import React from "react";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

const branches = {
  1: {
    address: "Хуҷанд, ул.Фирдавси 1(Ориентир Милано)",
    phones: [
      "+992 92 977 80 00"
    ],
    whatsapp: "992929778000"
  },

  2: {
    address: "Гафуров, Кучаи А.Нозиров",
    phones: [
      "+992 92 333 0051",
      "+992 99 700 5555"
    ],
    whatsapp: "992923330051"
  }
};

const Footer = () => {
  const params = new URLSearchParams(window.location.search);
  const branchId = params.get("branch") || "1";
  const branch = branches[branchId] || branches[1];

  return (
    <footer className="relative bg-[#FFF9F6] text-[#5C4033] border-t border-[#FFA3B1]/30 font-sans mt-0 overflow-hidden">
      {/* Тёплое свечение снизу — как в Hero */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-80 -translate-x-1/2 rounded-full bg-[#E12C43]/10 blur-[80px]" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#FF8FAB]/10 blur-[70px] rounded-full" />

      <div className="relative mx-auto max-w-md pt-14 pb-8 px-5">
        {/* Разделитель-ромб в духе заголовка меню */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="h-[1.5px] w-12 bg-[#FFA3B1]/40" />
          <span className="text-[#E12C43] text-[8px]">◆</span>
          <div className="h-[1.5px] w-12 bg-[#FFA3B1]/40" />
        </div>

        <div className="grid grid-cols-2 gap-8 items-start">
          {/* Лого и соцсети */}
          <div className="flex flex-col gap-2 items-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFA3B1]/50 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-[#E12C43] shadow-sm w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E12C43] animate-pulse" />
              Choko Lokma
            </span>

            <p className="text-[#5C4033]/70 text-[10px] font-bold uppercase tracking-widest mt-1">
              Premium Sweets
            </p>

            <div className="flex gap-2.5 mt-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${branch.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#FFA3B1]/50 bg-white rounded-full flex items-center justify-center text-[#E12C43] shadow-sm transition-all duration-300 hover:scale-105 hover:text-white hover:bg-gradient-to-r hover:from-[#FF8FAB] hover:to-[#E12C43] hover:border-transparent"
              >
                <FaWhatsapp size={15} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/chokolokma.khujand?igsh=NjFjbTl3MDA3eDVs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#FFA3B1]/50 bg-white rounded-full flex items-center justify-center text-[#E12C43] shadow-sm transition-all duration-300 hover:scale-105 hover:text-white hover:bg-gradient-to-r hover:from-[#FF8FAB] hover:to-[#E12C43] hover:border-transparent"
              >
                <FaInstagram size={15} />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@chokolokma_khujand?_r=1&_t=ZS-98n4j1aL59E"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#FFA3B1]/50 bg-white rounded-full flex items-center justify-center text-[#E12C43] shadow-sm transition-all duration-300 hover:scale-105 hover:text-white hover:bg-gradient-to-r hover:from-[#FF8FAB] hover:to-[#E12C43] hover:border-transparent"
              >
                <FaTiktok size={14} />
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#E12C43] text-[10px] font-black tracking-[0.25em] uppercase">
              Тамос
            </h3>

            <ul className="space-y-4">
              <li className="flex flex-col gap-1">
                <span className="text-[#E12C43]/70 text-[9px] uppercase tracking-widest font-bold">
                  Суроға
                </span>
                <span className="text-[#5C4033] text-xs font-semibold leading-snug">
                  {branch.address}
                </span>
              </li>

              <li className="flex flex-col gap-1">
                <span className="text-[#E12C43]/70 text-[9px] uppercase tracking-widest font-bold">
                  Телефон
                </span>

                {branch.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="text-[#5C4033] text-xs font-bold hover:text-[#E12C43] transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="relative mt-10 pt-5 border-t border-[#FFA3B1]/25 flex items-center justify-between">
          <span className="text-[9px] text-[#5C4033]/60 font-semibold tracking-wide">
            © 2012 Choko Lokma. Все права защищены.
          </span>

          <span className="text-[8px] text-[#5C4033]/50 font-semibold tracking-wide">
            Разработчик: 92-905-00-35
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;