import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  TJ: {
    header: {
      title: "Choko Lokma",
      subtitle: "Қаннодии ширин",
    },
    hero: {
      title: "Шириниҳое, ки шодӣ меоранд!",
      subtitle: "Лоқмаҳои гарму тоза бо шоколад ва дигар шириниҳои лазиз, ки бо муҳаббат омода шудаанд.",
      button: "Дидани меню",
    },
    categories: {
      all: "Ҳама",
      lokma: "Лоқма",
      chocolate: "Шоколадӣ",
      drinks: "Нӯшокиҳо",
      desserts: "Шедеврҳо",
    },
    dish: {
      addToCart: "Ба сабад",
      price: "Нарх",
      currency: "сом.",
      ingredients: "Таркиб",
    },
    modal: {
      close: "Пӯшидан",
      order: "Фармоиш додан",
      address: "Суроға",
      phone: "Телефон",
    },
    footer: {
      rights: "Ҳамаи ҳуқуқҳо ҳифз шудаанд",
      address: "ш. Хуҷанд, Тоҷикистон",
      madeBy: "Бо муҳаббат омода шудааст",
    }
  },
  RU: {
    header: {
      title: "Choko Lokma",
      subtitle: "Сладкая кондитерская",
    },
    hero: {
      title: "Сладости, несущие радость!",
      subtitle: "Свежие и горячие локма в шоколаде и другие нежные десерты, приготовленные с любовью.",
      button: "Посмотреть меню",
    },
    categories: {
      all: "Все меню",
      lokma: "Локма",
      chocolate: "Шоколадные",
      drinks: "Напитки",
      desserts: "Десерты",
    },
    dish: {
      addToCart: "В корзину",
      price: "Цена",
      currency: "сом.",
      ingredients: "Состав",
    },
    modal: {
      close: "Закрыть",
      order: "Заказать",
      address: "Адрес",
      phone: "Телефон",
    },
    footer: {
      rights: "Все права защищены",
      address: "г. Худжанд, Таджикистан",
      madeBy: "Приготовлено с любовью",
    }
  },
  EN: {
    header: {
      title: "Choko Lokma",
      subtitle: "Sweet Confectionery",
    },
    hero: {
      title: "Sweets that bring joy!",
      subtitle: "Fresh and hot chocolate-covered lokma and other delicious desserts, made with love.",
      button: "View Menu",
    },
    categories: {
      all: "Full Menu",
      lokma: "Lokma",
      chocolate: "Chocolate",
      drinks: "Drinks",
      desserts: "Desserts",
    },
    dish: {
      addToCart: "Add to cart",
      price: "Price",
      currency: "TJS",
      ingredients: "Ingredients",
    },
    modal: {
      close: "Close",
      order: "Order Now",
      address: "Address",
      phone: "Phone",
    },
    footer: {
      rights: "All rights reserved",
      address: "Khujand, Tajikistan",
      madeBy: "Made with love",
    }
  }
};

export function LanguageProvider({ children }) {
  // По умолчанию устанавливаем таджикский или русский язык
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("app_lang");
    return saved || "TJ"; 
  });

  useEffect(() => {
    localStorage.setItem("app_lang", lang);
  }, [lang]);

  // Функция для удобного получения вложенных строк перевода (например, t("hero.title"))
  const t = (path) => {
    const keys = path.split(".");
    let result = translations[lang];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path; // Возвращает путь как фоллбек, если перевод не найден
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}