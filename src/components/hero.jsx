// import { supabase } from "../lib/supabase"; 
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import defaultHeroBg from "../assets/logo_lokma.jpeg"; // Используем ваше фоновое изображение
import {
  Star,
  Clock,
  Utensils,
  Heart,
  ArrowLeft,
  X,
  ArrowDown
} from "lucide-react";

const UI_TRANSLATIONS = {
  TJ: {
    badge: "ШИРИНИҲОИ ОЛИҶАНОБ",
    title: "Choko Lokma",
    openMenu: " МЕНЮ",
    rating: "Рейтинг",
    hoursLabel: "Соатҳо",
    sweetsLabel: "Шириниҳо",
    hours: "7:00 - 00:00",
    sweetsValue: "100+",
    adminPanel: "Режими администратор",
    adminDesc: "Тағйиротро дар вақти воқеӣ ворид кунед",
    exit: "Баромад",
    addDish: "➕ Иловаи таом / десерт",
    adminButton: "Мудир",
    adminTitle: "Панели дастрасӣ",
    adminChoiceDesc: "Режими намоишро интихоб кунед",
    enterPassword: "Рамзро ворид кунед (Пароль)",
    cancel: "Қатъ",
    login: "Вход",
    emptyFav: "Рӯйхати дӯстдоштаҳо ҳоло холӣ аст...",
    loading: "Боргузорӣ...",
    editBtn: "Правка",
    delBtn: "Нест кардан",
    saveBtn: "Хифз кардан",
    savingBtn: "Дар ҳоли илова...",
    updatingBtn: "Дар ҳоли тағйир...",
    deletingBtn: "Дар ҳоли нест кардан...",
    formImageLabel: "Акси таом",
    formSelectImage: "Аксро интихоб кунед",
    formPriceLabel: "Нарх",
    formCategoryLabel: "Категория",
    formBestsellerLabel: "Хити фурӯш",
    formNewLabel: "Навтарин",
    confirmDeleteTitle: "Оё ҳақиқатдан мехоҳед нест кунед?",
    confirmDeleteDesc: "бо таври ҳамешагӣ нест карда мешавад.",
    confirmDeleteBtn: "Нест кардан"
  },
  RU: {
    badge: "НЕЖНЫЕ ДЕСЕРТЫ",
    title: "Choko Lokma",
    openMenu: "ОТКРЫТЬ МЕНЮ",
    rating: "Рейтинг",
    hoursLabel: "Часы работы",
    sweetsLabel: "Сладости",
    hours: "7:00 - 00:00",
    sweetsValue: "100+",
    adminPanel: "Режим администратора",
    adminDesc: "Вносите изменения в режиме реального времени",
    exit: "Выйти",
    addDish: "➕ Добавить блюдо / десерт",
    adminButton: "Админ",
    adminTitle: "Панель доступа",
    adminChoiceDesc: "Выберите необходимый режим просмотра",
    enterPassword: "Введите пароль для входа",
    cancel: "Отмена",
    login: "Войти",
    emptyFav: "Список избранного пока пуст...",
    loading: "Загрузка...",
    editBtn: "Правка",
    delBtn: "Удалить",
    saveBtn: "Сохранить",
    savingBtn: "Добавляется...",
    updatingBtn: "Изменяется...",
    deletingBtn: "Удаляется...",
    formImageLabel: "Фото блюда",
    formSelectImage: "Выберите изображение",
    formPriceLabel: "Цена",
    formCategoryLabel: "Категория",
    formBestsellerLabel: "Хит продаж",
    formNewLabel: "Новинка",
    confirmDeleteTitle: "Вы действительно хотите удалить?",
    confirmDeleteDesc: "будет удалено навсегда.",
    confirmDeleteBtn: "Удалить"
  },
  EN: {
    badge: "PREMIUM SWEETS",
    title: "Choko Lokma",
    openMenu: "OPEN MENU",
    rating: "Rating",
    hoursLabel: "Hours",
    sweetsLabel: "Sweets",
    hours: "7:00 - 00:00",
    sweetsValue: "100+",
    adminPanel: "Admin Mode",
    adminDesc: "Make changes in real-time",
    exit: "Exit",
    addDish: "➕ Add Dish / Dessert",
    adminButton: "Admin",
    adminTitle: "Access Panel",
    adminChoiceDesc: "Select the viewing mode",
    enterPassword: "Enter administrator password",
    cancel: "Cancel",
    login: "Login",
    emptyFav: "Your favorites list is currently empty...",
    loading: "Loading...",
    editBtn: "Edit",
    delBtn: "Delete",
    saveBtn: "Save",
    savingBtn: "Adding...",
    updatingBtn: "Updating...",
    deletingBtn: "Deleting...",
    formImageLabel: "Dish photo",
    formSelectImage: "Select image",
    formPriceLabel: "Price",
    formCategoryLabel: "Category",
    formBestsellerLabel: "Bestseller",
    formNewLabel: "New Arrival",
    confirmDeleteTitle: "Are you sure you want to delete?",
    confirmDeleteDesc: "will be permanently deleted.",
    confirmDeleteBtn: "Delete"
  }
};

const MENU_UI = {
  TJ: {
    backToCategories: "← Бозгашт ба категорияҳо",
    emptyCategory: "Ин бахш ҳоло холӣ аст...",
    emptyFavorites: "Рӯйхати дӯстдоштаҳо ҳоло холӣ аст...",
    compositionLabel: "Таркиби таом:",
    closeLabel: "Пӯшидан",
    ingredientsArrow: "Таркиб",
    menuHeaderTitle: "Менюи мо",
    bestsellerLabel: "Хитҳои фурӯш",
    newArrivalsLabel: "Навтаринҳо",
    favoritesLabel: "Дӯстдоштаҳо",
    allPastriesLabel: "Ҳама",
    pastrySubcategoryLabel: "Зербахш",
    pastrySubcategories: {
      art: "Арт-десертҳо",
      desserts: "Десертҳо",
      slice: "Пирожниҳои порчагӣ"
    },
    categories: [
      { id: "burgers", name: "Бургерҳо", icon: "🍔" },
      { id: "waffles", name: "Вафлиҳо", icon: "🧇" },
      { id: "lokma", name: "Локма", icon: "🍩" },
      //   { id: "vaili", name: "Вайлӣ", icon: "🍯" },
      { id: "drinks", name: "Нӯшокиҳо", icon: "🍹" },
      { id: "tea", name: "Чой", icon: "🍵" },
      { id: "pastries", name: "Пирожниҳо", icon: "🧁" },
    ]
  },
  RU: {
    backToCategories: "← Назад к категориям",
    emptyCategory: "Раздел наполняется вкусными новинками...",
    emptyFavorites: "Список избранного пока пуст...",
    compositionLabel: "Состав блюда:",
    closeLabel: "Закрыть",
    ingredientsArrow: "Состав",
    menuHeaderTitle: "Наше Меню",
    bestsellerLabel: "Хиты продаж",
    newArrivalsLabel: "Новинки",
    favoritesLabel: "Избранное",
    allPastriesLabel: "Все",
    pastrySubcategoryLabel: "Подкатегория",
    pastrySubcategories: {
      art: "Арт-десерты",
      desserts: "Десерты",
      slice: "Кусковые пирожные"
    },
    categories: [
      { id: "burgers", name: "Бургеры", icon: "🍔" },
      { id: "waffles", name: "Вафли", icon: "🧇" },
      { id: "lokma", name: "Локма", icon: "🍩" },
      //   { id: "vaili", name: "Вайли", icon: "🍯" },
      { id: "drinks", name: "Напитки", icon: "🍹" },
      { id: "tea", name: "Чай", icon: "🍵" },
      { id: "pastries", name: "Пирожные", icon: "🧁" },
    ]
  },
  EN: {
    backToCategories: "← Back to categories",
    emptyCategory: "This section is being filled with yummy food...",
    emptyFavorites: "Your favorites list is currently empty...",
    compositionLabel: "Ingredients:",
    closeLabel: "Close",
    ingredientsArrow: "Ingredients",
    menuHeaderTitle: "Our Menu",
    bestsellerLabel: "Bestsellers",
    newArrivalsLabel: "New Arrivals",
    favoritesLabel: "Favorites",
    allPastriesLabel: "All",
    pastrySubcategoryLabel: "Subcategory",
    pastrySubcategories: {
      art: "Art Desserts",
      desserts: "Desserts",
      slice: "Slice Pastries"
    },
    categories: [
      { id: "burgers", name: "Burgers", icon: "🍔" },
      { id: "waffles", name: "Waffles", icon: "🧇" },
      { id: "lokma", name: "Lokma", icon: "🍩" },
      //   { id: "vaili", name: "Vaili", icon: "🍯" },
      { id: "drinks", name: "Drinks", icon: "🍹" },
      { id: "tea", name: "Tea", icon: "🍵" },
      { id: "pastries", name: "Pastries", icon: "🧁" },
    ]
  }
};

const DEFAULT_SUBCATEGORY_BY_CATEGORY = {
  pastries: "art",
};

const VALID_SUBCATEGORIES_BY_CATEGORY = {
  pastries: ["art", "desserts", "slice"],
};

const resolveSubCategory = (category, storedSubCategory) => {
  const validOptions = VALID_SUBCATEGORIES_BY_CATEGORY[category];
  if (!validOptions) return "";
  if (validOptions.includes(storedSubCategory)) return storedSubCategory;
  return DEFAULT_SUBCATEGORY_BY_CATEGORY[category] || "";
};

const formatCurrency = (currency) => {
  if (!currency) return currency;
  const normalized = String(currency).trim().toUpperCase();
  if (normalized === "SMN" || normalized === "СМН") return "СМН";
  return currency;
};

export default function Hero({
  backgroundImage = defaultHeroBg, // Установлено ваше фоновое изображение hero.png
  onOpenMenu,
}) {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedPastrySubcategory, setSelectedPastrySubcategory] = useState("all");

  const [activeDish, setActiveDish] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [formNameTJ, setFormNameTJ] = useState("");
  const [formNameRU, setFormNameRU] = useState("");
  const [formNameEN, setFormNameEN] = useState("");

  const [formDescriptionTJ, setFormDescriptionTJ] = useState("");
  const [formDescriptionRU, setFormDescriptionRU] = useState("");
  const [formDescriptionEN, setFormDescriptionEN] = useState("");

  const [formCompositionTJ, setFormCompositionTJ] = useState("");
  const [formCompositionRU, setFormCompositionRU] = useState("");
  const [formCompositionEN, setFormCompositionEN] = useState("");

  const [formPrice, setFormPrice] = useState("");
  const [formCurrency, setFormCurrency] = useState("СМН");
  const [formCategory, setFormCategory] = useState("pastries");
  const [formSubCategory, setFormSubCategory] = useState("art");
  const [formBestseller, setFormBestseller] = useState(false);
  const [formIsNew, setFormNew] = useState(false);
  const [formImage, setFormImage] = useState("");

  const ui = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS["TJ"];
  const menuUiData = MENU_UI[lang] || MENU_UI["TJ"];

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("qrmenu")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setDishes(data);
    } catch (err) {
      console.error("Ошибка загрузки данных из Supabase:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    const handleHeaderMenuClick = () => {
      setAuthModalOpen(true);
    };
    window.addEventListener("open-menu-auth", handleHeaderMenuClick);
    return () => {
      window.removeEventListener("open-menu-auth", handleHeaderMenuClick);
    };
  }, []);

  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("menu_favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const menuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("menu_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const fade = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const fadeCls = () => `transition-all duration-700 ease-out ${fade}`;
  const delayStyle = (ms) => ({ transitionDelay: `${ms}ms` });

  const handleOpenMenuClick = () => {
    setShowMenu(true);
    if (onOpenMenu) onOpenMenu();
    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleAuthChoice = (choice) => {
    setAuthModalOpen(false);
    if (choice === "menu") {
      handleOpenMenuClick();
    } else if (choice === "admin") {
      setPasswordModalOpen(true);
      setPasswordInput("");
      setAuthError("");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "lokma") {
      setIsAdmin(true);
      setPasswordModalOpen(false);
      setShowMenu(true);
      setTimeout(() => {
        menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      setAuthError(lang === "TJ" ? "Рамз нодуруст!" : lang === "RU" ? "Неверный пароль!" : "Incorrect password!");
    }
  };

  const resetForm = () => {
    setFormNameTJ("");
    setFormNameRU("");
    setFormNameEN("");
    setFormDescriptionTJ("");
    setFormDescriptionRU("");
    setFormDescriptionEN("");
    setFormCompositionTJ("");
    setFormCompositionRU("");
    setFormCompositionEN("");
    setFormPrice("");
    setFormCurrency("СМН");
    setFormCategory("pastries");
    setFormSubCategory("art");
    setFormBestseller(false);
    setFormNew(false);
    setFormImage("");
    setIsImageUploading(false);
  };

  const handleFormCategoryChange = (newCategory) => {
    setFormCategory(newCategory);
    setFormSubCategory(DEFAULT_SUBCATEGORY_BY_CATEGORY[newCategory] || "");
  };

  const uploadImageToStorage = async (blob) => {
    if (!blob) return null;
    const fileName = `${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from("qrmenu-images")
      .upload(fileName, blob, { contentType: "image/jpeg" });

    if (error) throw error;

    const { data } = supabase.storage
      .from("qrmenu-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsImageUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (!blob) {
            console.error("Не удалось создать Blob");
            setIsImageUploading(false);
            return;
          }

          const previewUrl = URL.createObjectURL(blob);
          setFormImage(previewUrl);

          try {
            const publicUrl = await uploadImageToStorage(blob);
            if (publicUrl) {
              setFormImage(publicUrl);
            } else {
              alert("Не удалось сохранить изображение.");
              setFormImage("");
            }
          } catch (uploadError) {
            console.error("Ошибка при фоновой загрузке:", uploadError);
            alert("Ошибка сохранения: " + uploadError.message);
            setFormImage("");
          } finally {
            setIsImageUploading(false);
          }
        }, "image/jpeg", 0.7);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    resetForm();
    setEditingDish(null);
    setDishModalOpen(true);
  };

  const openEditModal = (dish, e) => {
    e.stopPropagation();
    setEditingDish(dish);
    setFormNameTJ(dish.name_tj || "");
    setFormNameRU(dish.name_ru || "");
    setFormNameEN(dish.name_en || "");
    setFormDescriptionTJ(dish.description_tj || "");
    setFormDescriptionRU(dish.description_ru || "");
    setFormDescriptionEN(dish.description_en || "");
    setFormCompositionTJ(dish.composition_tj || "");
    setFormCompositionRU(dish.composition_ru || "");
    setFormCompositionEN(dish.composition_en || "");
    setFormPrice(dish.price || "");
    setFormCurrency(formatCurrency(dish.currency) || "СМН");

    const dishCategory = dish.category || "pastries";
    setFormCategory(dishCategory);
    setFormSubCategory(resolveSubCategory(dishCategory, dish.sub_category));
    setFormBestseller(dish.bestseller || false);
    setFormNew(dish.is_new || false);
    setFormImage(dish.image || "");
    setDishModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    if (isImageUploading) {
      alert(lang === "TJ"
        ? "Лутфан мунтазир шавед, то акс боргузорӣ шавад..."
        : lang === "RU"
          ? "Пожалуйста, подождите завершения загрузки изображения..."
          : "Please wait until the image upload completes..."
      );
      return;
    }

    setIsSaving(true);
    const payload = {
      name_tj: formNameTJ,
      name_ru: formNameRU,
      name_en: formNameEN,
      description_tj: formDescriptionTJ,
      description_ru: formDescriptionRU,
      description_en: formDescriptionEN,
      composition_tj: formCompositionTJ,
      composition_ru: formCompositionRU,
      composition_en: formCompositionEN,
      price: Number(formPrice),
      currency: formCurrency,
      category: formCategory,
      sub_category: formSubCategory,
      bestseller: formBestseller,
      is_new: formIsNew,
      image: formImage || null,
    };

    try {
      let error;
      if (editingDish) {
        const { error: updateError } = await supabase
          .from("qrmenu")
          .update(payload)
          .eq("id", editingDish.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("qrmenu")
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;
      await fetchDishes();
      setDishModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Ошибка сохранения блюда:", err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteModal = (dish, e) => {
    e.stopPropagation();
    setDishToDelete(dish);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!dishToDelete || isDeleting) return;
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("qrmenu")
        .delete()
        .eq("id", dishToDelete.id);

      if (error) throw error;
      await fetchDishes();
      setDeleteConfirmOpen(false);
      setDishToDelete(null);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const stats = [
    {
      icon: <Star className="h-4.5 w-4.5 text-[#E12C43]" />, // Клубничный оттенок для иконки
      value: "4.9",
      label: ui.rating,
    },
    {
      icon: <Clock className="h-4.5 w-4.5 text-[#E12C43]" />,
      value: ui.hours,
      label: ui.hoursLabel,
    },
    {
      icon: <Utensils className="h-4.5 w-4.5 text-[#E12C43]" />,
      value: ui.sweetsValue,
      label: ui.sweetsLabel,
    },
  ];

  let filteredDishes = [];
  if (selectedCategory === "bestsellers") {
    filteredDishes = dishes.filter((dish) => dish.bestseller);
  } else if (selectedCategory === "new") {
    filteredDishes = dishes.filter((dish) => dish.is_new);
  } else if (selectedCategory === "favorites") {
    filteredDishes = dishes.filter((dish) =>
      favorites.some((favId) => String(favId) === String(dish.id))
    );
  } else if (selectedCategory === "pastries") {
    filteredDishes = dishes.filter((dish) => {
      const matchCat = dish.category === "pastries";
      if (!matchCat) return false;
      if (selectedPastrySubcategory === "all") return true;
      return dish.sub_category === selectedPastrySubcategory;
    });
  } else {
    filteredDishes = dishes.filter(
      (dish) => dish.category === selectedCategory
    );
  }

  const getSelectedCategoryName = () => {
    if (selectedCategory === "bestsellers") return menuUiData.bestsellerLabel;
    if (selectedCategory === "new") return menuUiData.newArrivalsLabel;
    if (selectedCategory === "favorites") return menuUiData.favoritesLabel;
    return menuUiData.categories.find((c) => c.id === selectedCategory)?.name;
  };

  return (
    <section className="w-full pb-6 bg-[#FFF9F6] text-[#5C4033] min-h-screen relative">
      {/* ПРЕМИАЛЬНЫЙ БАННЕР */}
      <div className="relative h-[70vh] w-full overflow-hidden rounded-b-[40px] shadow-[0_12px_40px_rgba(225,44,67,0.06)] border-b border-[#FFA3B1]/20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F6] via-black/45 to-black/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-[#E12C43]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative flex h-full flex-col justify-end px-5 sm:px-8 pb-16 z-10 w-full">
          <div className={fadeCls()} style={delayStyle(80)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FFA3B1]/50 bg-black/40 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-[#FF8FAB] backdrop-blur-md shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E12C43] animate-pulse" />
              {ui.badge}
            </span>
          </div>

          <h1 className={`mt-4 font-serif text-[38px] sm:text-[46px] font-bold leading-[1.1] tracking-tight text-white ${fadeCls()}`} style={delayStyle(180)}>
            {ui.title}
          </h1>

          <div className={`mt-4 h-[1px] w-16 bg-[#FFA3B1]/60 rounded-full ${fadeCls()}`} style={delayStyle(260)} />
        </div>
      </div>

      {/* КНОПКА «ОТКРЫТЬ МЕНЮ» */}
      <div className="relative z-30 w-full px-5 sm:px-8 h-0">
        <div className="absolute left-5 sm:left-8 -top-21 flex items-center gap-3">
          <button
            onClick={handleOpenMenuClick}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#FFF9F6] bg-gradient-to-r from-[#FF8FAB] to-[#E12C43] shadow-md transition-transform duration-300 hover:scale-[1.02] active:scale-95 text-white font-extrabold uppercase tracking-wider text-[11px]"
          >
            <span>{ui.openMenu}</span>
            <ArrowDown className="h-4 w-4 text-white" />
          </button>

          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center justify-center h-11 w-37 rounded-full border-2 border-[#fff9f600] bg-[#fff9f600] text-shadow-neutral-500 transition-transform duration-300 hover:scale-105 active:scale-95 text-[#fff9f600]"
            aria-label="Администратор"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-transparent">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Оптимизированный блок Статистики */}
      <div className={`relative z-10 -mt-6 max-w-md mx-auto px-5 w-full ${fadeCls()}`} style={delayStyle(500)}>
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-[#FFA3B1]/45 bg-white/95 p-3 shadow-[0_10px_25px_rgba(225,44,67,0.04)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.03]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF9F6] text-[#E12C43]">{s.icon}</div>
              <span className="text-sm sm:text-base font-black text-[#5C4033] tracking-tight">{s.value}</span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[#E12C43] text-center leading-none">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Блок меню */}
      {showMenu && (
        <div ref={menuRef} className="mt-6 mx-auto max-w-md px-5 w-full scroll-mt-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="font-serif text-[26px] sm:text-[32px] text-[#5C4033] font-semibold tracking-tight">{menuUiData.menuHeaderTitle}</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-[1.5px] w-12 bg-[#FFA3B1]/40" />
              <span className="text-[#E12C43] text-[8px]">◆</span>
              <div className="h-[1.5px] w-12 bg-[#FFA3B1]/40" />
            </div>
          </div>

          {/* Панель администратора */}
          {isAdmin && (
            <div className="mb-8 rounded-3xl border border-[#FFA3B1]/50 bg-white p-5 shadow-[0_8px_25px_rgba(225,44,67,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#E12C43] flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    {ui.adminPanel}
                  </h3>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{ui.adminDesc}</p>
                </div>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="rounded-xl bg-red-500/10 border border-red-500/30 px-3.5 py-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider transition hover:bg-red-500/20"
                >
                  {ui.exit}
                </button>
              </div>

              <button
                onClick={openAddModal}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF8FAB] to-[#E12C43] py-3.5 text-xs font-bold uppercase tracking-widest text-white border border-[#FFA3B1]/45 shadow-[0_4px_15px_rgba(225,44,67,0.08)] transition hover:brightness-105"
              >
                {ui.addDish}
              </button>
            </div>
          )}

          {loading ? (
            <p className="text-center py-12 text-xs text-[#E12C43] font-medium">{ui.loading}</p>
          ) : !selectedCategory ? (
            <>
              {/* Промо-карточки */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-4">
                <button onClick={() => setSelectedCategory("bestsellers")} className="relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl border border-[#FFA3B1]/30 bg-white shadow-sm hover:border-[#E12C43]/60 hover:-translate-y-0.5 transition-all group overflow-hidden">
                  <span className="text-2xl mb-1">🔥</span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#5C4033] tracking-tight text-center">{menuUiData.bestsellerLabel}</span>
                </button>
                <button onClick={() => setSelectedCategory("new")} className="relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl border border-[#FFA3B1]/30 bg-white shadow-sm hover:border-[#E12C43]/60 hover:-translate-y-0.5 transition-all group overflow-hidden">
                  <span className="text-2xl mb-1">✨</span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#5C4033] tracking-tight text-center">{menuUiData.newArrivalsLabel}</span>
                </button>
                <button onClick={() => setSelectedCategory("favorites")} className="relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl border border-[#FFA3B1]/30 bg-white shadow-sm hover:border-[#E12C43]/60 hover:-translate-y-0.5 transition-all group overflow-hidden">
                  <span className="text-2xl mb-1">❤️</span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#5C4033] tracking-tight text-center">{menuUiData.favoritesLabel}</span>
                </button>
              </div>

              {/* Категории */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {menuUiData.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl border border-[#FFA3B1]/30 bg-white hover:bg-[#FFF9F6] transition-all duration-300 hover:border-[#E12C43] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(225,44,67,0.04)] group"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF9F6] text-xl mb-3 group-hover:scale-105 transition-transform">{cat.icon}</span>
                    <span className="text-[12px] sm:text-sm font-bold text-[#5C4033] group-hover:text-[#E12C43] transition-colors">{cat.name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Блюда выбранной категории */
            <div className="animate-fade-in">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => { setSelectedCategory(null); setSelectedPastrySubcategory("all"); }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFEBE9] text-[#E12C43] rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#FFD1D6] transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {menuUiData.backToCategories}
                  </button>
                  <span className="text-[10px] font-extrabold text-[#E12C43] uppercase tracking-wider bg-[#E12C43]/10 border border-[#E12C43]/20 px-3.5 py-1.5 rounded-full">{getSelectedCategoryName()}</span>
                </div>

                {/* Подкатегории пирожных */}
                {selectedCategory === "pastries" && (
                  <div className="flex flex-wrap justify-center gap-2 bg-[#FFF9F6] p-2 rounded-xl border border-[#FFA3B1]/20">
                    <button
                      onClick={() => setSelectedPastrySubcategory("all")}
                      className={`w-[140px] px-2 py-2.5 text-center text-xs sm:text-sm font-bold rounded-lg transition break-words whitespace-normal ${selectedPastrySubcategory === "all"
                          ? "bg-[#E12C43] text-white shadow-sm"
                          : "text-[#5C4033] hover:bg-[#E12C43]/10"
                        }`}
                    >
                      {menuUiData.allPastriesLabel}
                    </button>

                    {Object.entries(menuUiData.pastrySubcategories).map(([subId, subName]) => (
                      <button
                        key={subId}
                        onClick={() => setSelectedPastrySubcategory(subId)}
                        className={`w-[140px] px-2 py-2.5 text-center text-xs sm:text-sm font-bold rounded-lg transition break-words whitespace-normal ${selectedPastrySubcategory === subId
                            ? "bg-[#E12C43] text-white shadow-sm"
                            : "text-[#5C4033] hover:bg-[#E12C43]/10"
                          }`}
                      >
                        {subName}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {filteredDishes.length === 0 ? (
                <p className="text-center py-12 text-xs text-[#E12C43] font-medium">{selectedCategory === "favorites" ? ui.emptyFav : menuUiData.emptyCategory}</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {filteredDishes.map((dish) => {
                    const categoryIcon = menuUiData.categories.find(c => c.id === dish.category)?.icon || "🧁";

                    const translation = {
                      TJ: {
                        name: dish.name_tj,
                        description: dish.description_tj,
                        composition: dish.composition_tj
                      },
                      RU: {
                        name: dish.name_ru,
                        description: dish.description_ru,
                        composition: dish.composition_ru
                      },
                      EN: {
                        name: dish.name_en,
                        description: dish.description_en,
                        composition: dish.composition_en
                      }
                    }[lang];
                    const dishName = translation.name || "";
                    const dishDesc = translation.description || "";
                    const isFavorite = favorites.some((favId) => String(favId) === String(dish.id));

                    return (
                      <div key={dish.id} onClick={() => setActiveDish(dish)} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#FFA3B1]/20 bg-white p-3 pb-4 shadow-[0_4px_15px_rgba(225,44,67,0.02)] cursor-pointer hover:border-[#E12C43] hover:-translate-y-0.5 transition-all min-h-[250px]">
                        {isAdmin && (
                          <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
                            <button
                              onClick={(e) => openEditModal(dish, e)}
                              className="flex-1 flex items-center justify-center rounded-lg bg-[#E12C43] text-white py-1 text-[9px] font-bold uppercase transition hover:brightness-110 shadow-sm"
                            >
                              ✏ {ui.editBtn}
                            </button>
                            <button
                              onClick={(e) => openDeleteModal(dish, e)}
                              className="flex-1 flex items-center justify-center rounded-lg bg-red-600 text-white py-1 text-[9px] font-bold uppercase transition hover:bg-red-700 shadow-sm"
                            >
                              🗑 {ui.delBtn}
                            </button>
                          </div>
                        )}

                        <div className="relative w-full h-28 rounded-xl bg-[#FFF9F6] flex items-center justify-center overflow-hidden mb-3 shrink-0 border border-[#FFA3B1]/25">
                          {dish.image ? (
                            <img src={dish.image} alt={dishName} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                          ) : (
                            <span className="relative text-3xl transform group-hover:scale-105 transition-transform duration-300">{categoryIcon}</span>
                          )}

                          <div className="absolute left-2 bottom-2 flex flex-col gap-1 z-10 pointer-events-none">
                            {dish.bestseller && (
                              <span className="bg-[#E12C43] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm">HIT</span>
                            )}
                            {dish.is_new && (
                              <span className="bg-emerald-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                                NEW
                              </span>
                            )}
                          </div>

                          <button onClick={(e) => toggleFavorite(dish.id, e)} className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#E12C43] border border-[#FFA3B1]/30 backdrop-blur-xs transition hover:scale-105">
                            <Heart className={`h-4 w-4 transition-colors ${isFavorite ? "fill-[#E12C43] text-[#E12C43]" : "text-[#E12C43]/50"}`} />
                          </button>
                        </div>

                        <div className="flex flex-1 flex-col px-1">
                          <h3 className="text-sm sm:text-base font-bold leading-tight text-[#5C4033] line-clamp-2 group-hover:text-[#E12C43] transition-colors">{dishName}</h3>
                          <p className="mt-1 text-[10px] sm:text-xs leading-relaxed text-neutral-500 line-clamp-2">{dishDesc || "—"}</p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-neutral-100 flex flex-col gap-1.5 px-1">
                          <span className="text-sm sm:text-base font-black text-[#E12C43]">{dish.price} {formatCurrency(dish.currency)}</span>
                          {translation.composition && <span className="inline-flex items-center self-start rounded-md bg-[#FFF9F6] border border-[#FFA3B1]/30 px-1.5 py-0.5 text-[8px] font-bold text-[#E12C43] uppercase tracking-wider">{menuUiData.ingredientsArrow}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* МОДАЛКА ВЫБОРА: ОТКРЫТЬ ИЛИ ВОЙТИ */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(225,44,67,0.08)] border border-[#FFA3B1]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#5C4033]">{ui.adminTitle}</h3>
              <button onClick={() => setAuthModalOpen(false)} className="rounded-full bg-neutral-100 p-1.5 text-neutral-500 hover:text-[#5C4033]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-500 text-center">{ui.adminChoiceDesc}</p>
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => handleAuthChoice("menu")}
                className="w-full py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold uppercase tracking-wider text-[#5C4033] transition hover:bg-neutral-100"
              >
                🍽 {ui.openMenu}
              </button>
              <button
                onClick={() => handleAuthChoice("admin")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8FAB] to-[#E12C43] border border-[#E12C43]/20 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-105"
              >
                🔒 {ui.adminButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛКА ВВОДА ПАРОЛЯ */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handlePasswordSubmit} className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(225,44,67,0.08)] border border-[#FFA3B1]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#5C4033]">{ui.adminButton}</h3>
              <button type="button" onClick={() => setPasswordModalOpen(false)} className="rounded-full bg-neutral-100 p-1.5 text-neutral-500 hover:text-[#5C4033]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#E12C43]">{ui.enterPassword}</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-[#FFF9F6] px-4 py-3 text-sm text-[#5C4033] focus:border-[#E12C43] focus:outline-none transition-colors"
                placeholder="••••••"
              />
            </div>

            {authError && (
              <div className="rounded-xl border border-red-500/10 bg-red-50 p-2 text-center">
                <p className="text-[11px] font-semibold text-red-500">{authError}</p>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-neutral-100 text-xs font-bold uppercase tracking-wider text-[#5C4033]"
              >
                {ui.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF8FAB] to-[#E12C43] text-xs font-bold uppercase tracking-wider text-white border border-[#E12C43]/20 shadow-sm"
              >
                {ui.login}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* МОДАЛКА CRUD: ДОБАВЛЕНИЕ / РЕДАКТИРОВАНИЕ */}
      {dishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <form onSubmit={handleFormSubmit} className="relative w-full max-w-sm rounded-3xl bg-white p-5 my-8 shadow-[0_20px_50px_rgba(225,44,67,0.08)] border border-[#FFA3B1]/30 flex flex-col gap-3 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#E12C43]">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 shrink-0">
              <h3 className="font-serif text-lg font-bold text-[#5C4033]">
                {editingDish ? `✏ ${ui.editBtn}` : "➕ Добавление"}
              </h3>
              <button type="button" onClick={() => setDishModalOpen(false)} className="rounded-full bg-neutral-100 p-1.5 text-neutral-500 hover:text-[#5C4033]">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Изображение */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#E12C43]">{ui.formImageLabel}</label>
              <div className="relative w-full h-32 rounded-xl bg-[#FFF9F6] border border-neutral-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer">
                {formImage ? (
                  <>
                    <img src={formImage} alt="Preview" className="w-full h-full object-cover" />

                    {isImageUploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                        <span className="h-6 w-6 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      </div>
                    )}

                    {!isImageUploading && (
                      <button
                        type="button"
                        onClick={() => setFormImage("")}
                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 z-20"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    {isImageUploading ? (
                      <div className="flex flex-col items-center justify-center">
                        <span className="h-6 w-6 rounded-full border-2 border-[#E12C43]/40 border-t-[#E12C43] animate-spin" />
                        <p className="text-[10px] text-neutral-500 mt-2 font-bold">Загрузка...</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-2xl">📸</span>
                        <p className="text-[10px] text-neutral-500 mt-1 font-bold">{ui.formSelectImage}</p>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </>
                    )}
                  </label>
                )}
              </div>
            </div>

            {/* Общие непереводимые поля */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#E12C43]">{ui.formPriceLabel}</label>
                <div className="flex gap-1.5">
                  <input type="text" required value={formPrice} onChange={(e) => setFormPrice(e.target.value)} className="w-full rounded-xl border border-neutral-200 bg-[#FFF9F6] px-3.5 py-2 text-xs text-[#5C4033] focus:border-[#E12C43] focus:outline-none" placeholder="15" />
                  <input type="text" required value={formCurrency} onChange={(e) => setFormCurrency(e.target.value)} className="w-20 rounded-xl border border-neutral-200 bg-[#FFF9F6] px-2 py-2 text-xs text-[#5C4033] focus:border-[#E12C43] focus:outline-none" placeholder="СМН" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#E12C43]">{ui.formCategoryLabel}</label>
                <select
                  value={formCategory}
                  onChange={(e) => handleFormCategoryChange(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-[#FFF9F6] px-3 py-2 text-xs text-[#5C4033] focus:border-[#E12C43] focus:outline-none"
                >
                  {menuUiData.categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="text-[#5C4033]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Вложенные подкатегории в CRUD */}
            {formCategory === "pastries" && (
              <div className="flex flex-col gap-1 animate-fade-in">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#E12C43]">
                  {menuUiData.pastrySubcategoryLabel}
                </label>

                <select
                  value={formSubCategory}
                  onChange={(e) => setFormSubCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#FFA3B1]/50 bg-[#FFF9F6] px-3 py-2 text-xs text-[#5C4033] focus:border-[#E12C43] focus:outline-none"
                >
                  {Object.entries(menuUiData.pastrySubcategories).map(([subId, subName]) => (
                    <option key={subId} value={subId}>
                      {subName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* БЛОК ЯЗЫКОВЫХ ПЕРЕВОДОВ */}
            <div className="border border-[#FFA3B1]/20 p-3 rounded-2xl bg-[#FFF9F6]/50 space-y-3">
              {/* TJ */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#E12C43] tracking-widest block border-b border-[#FFA3B1]/10 pb-0.5">TJ (Таджикский)</span>
                <input type="text" required placeholder="Ном..." value={formNameTJ} onChange={(e) => setFormNameTJ(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs" />
                <textarea rows={1} placeholder="Тафсилот..." value={formDescriptionTJ} onChange={(e) => setFormDescriptionTJ(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs resize-none" />
                <input type="text" placeholder="Таркиб..." value={formCompositionTJ} onChange={(e) => setFormCompositionTJ(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs" />
              </div>

              {/* RU */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#E12C43] tracking-widest block border-b border-[#FFA3B1]/10 pb-0.5">RU (Русский)</span>
                <input type="text" required placeholder="Название..." value={formNameRU} onChange={(e) => setFormNameRU(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs" />
                <textarea rows={1} placeholder="Описание..." value={formDescriptionRU} onChange={(e) => setFormDescriptionRU(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs resize-none" />
                <input type="text" placeholder="Состав..." value={formCompositionRU} onChange={(e) => setFormCompositionRU(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs" />
              </div>

              {/* EN */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#E12C43] tracking-widest block border-b border-[#FFA3B1]/10 pb-0.5">EN (English)</span>
                <input type="text" required placeholder="Name..." value={formNameEN} onChange={(e) => setFormNameEN(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs" />
                <textarea rows={1} placeholder="Description..." value={formDescriptionEN} onChange={(e) => setFormDescriptionEN(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs resize-none" />
                <input type="text" placeholder="Ingredients..." value={formCompositionEN} onChange={(e) => setFormCompositionEN(e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs" />
              </div>
            </div>

            {/* Чекбоксы: новинка и бестселлер */}
            <div className="flex items-center gap-4 mt-1 border-t border-neutral-100 pt-2">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-[#5C4033] font-bold">
                <input type="checkbox" checked={formBestseller} onChange={(e) => setFormBestseller(e.target.checked)} className="rounded border-neutral-300 accent-[#E12C43] h-4 w-4" />
                {ui.formBestsellerLabel}
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-[#5C4033] font-bold">
                <input type="checkbox" checked={formIsNew} onChange={(e) => setFormNew(e.target.checked)} className="rounded border-neutral-300 accent-[#E12C43] h-4 w-4" />
                {ui.formNewLabel}
              </label>
            </div>

            <div className="flex gap-2 mt-2 shrink-0">
              <button type="button" onClick={() => setDishModalOpen(false)} disabled={isSaving} className="flex-1 py-3 rounded-xl bg-neutral-100 text-xs font-bold uppercase tracking-wider text-[#5C4033] disabled:opacity-50 disabled:cursor-not-allowed" >
                {ui.cancel}
              </button>
              <button type="submit" disabled={isSaving || isImageUploading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF8FAB] to-[#E12C43] text-xs font-bold uppercase tracking-wider text-white border border-[#E12C43]/20 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" >
                {isSaving && (
                  <span className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                )}
                {isSaving ? (editingDish ? ui.updatingBtn : ui.savingBtn) : ui.saveBtn}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ДИАЛОГ УДАЛЕНИЯ */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(225,44,67,0.08)] border border-red-200 flex flex-col gap-4">
            <h3 className="font-serif text-lg font-bold text-[#5C4033] text-center">{ui.confirmDeleteTitle}</h3>
            <p className="text-xs text-neutral-500 text-center">
              Блюдо «<span className="text-[#E12C43] font-bold"> {lang === "TJ" ? dishToDelete?.name_tj : lang === "RU" ? dishToDelete?.name_ru : dishToDelete?.name_en} </span>» {ui.confirmDeleteDesc}
            </p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setDeleteConfirmOpen(false)} disabled={isDeleting} className="flex-1 py-3 rounded-xl bg-neutral-100 text-xs font-bold uppercase tracking-wider text-[#5C4033] disabled:opacity-50 disabled:cursor-not-allowed" >
                {ui.cancel}
              </button>
              <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 py-3 rounded-xl bg-red-600 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" >
                {isDeleting && (
                  <span className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                )}
                {isDeleting ? ui.deletingBtn : ui.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛКА ПРОСМОТРА БЛЮДА */}
      {activeDish && (() => {
        const activeTranslation = {
          name: lang === "TJ" ? activeDish.name_tj : lang === "RU" ? activeDish.name_ru : lang === "EN" ? activeDish.name_en : "",
          description: lang === "TJ" ? activeDish.description_tj : lang === "RU" ? activeDish.description_ru : lang === "EN" ? activeDish.description_en : "",
          composition: lang === "TJ" ? activeDish.composition_tj : lang === "RU" ? activeDish.composition_ru : lang === "EN" ? activeDish.composition_en : "",
        };
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(225,44,67,0.06)] border border-[#FFA3B1]/20 max-h-[92vh] flex flex-col">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <button onClick={(e) => toggleFavorite(activeDish.id, e)} className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FFF9F6] border border-[#FFA3B1]/20 text-[#E12C43]" >
                  <Heart className={`h-4.5 w-4.5 ${favorites.some((favId) => String(favId) === String(activeDish.id)) ? "fill-[#E12C43] text-[#E12C43]" : ""}`} />
                </button>
                <button onClick={() => setActiveDish(null)} className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FFF9F6] border border-neutral-200 text-neutral-500 hover:text-[#5C4033]">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="relative w-full h-[50vh] rounded-2xl bg-[#FFF9F6] flex items-center justify-center overflow-hidden mb-4 shrink-0 border border-[#FFA3B1]/15 p-3">
                {activeDish.image ? (
                  <img src={activeDish.image} alt={activeTranslation.name} className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl" />
                ) : (
                  <span className="relative text-6xl">{menuUiData.categories.find(c => c.id === activeDish.category)?.icon || "🧁"}</span>
                )}
              </div>

              <div className="overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#E12C43]">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-[20px] font-bold text-[#5C4033] leading-snug">{activeTranslation.name}</h3>
                  <p className="text-[11px] leading-relaxed text-neutral-500">{activeTranslation.description || "—"}</p>
                  <span className="self-start mt-2 rounded-lg bg-gradient-to-r from-[#FF8FAB] to-[#E12C43] border border-[#E12C43]/20 px-4 py-2 text-lg font-black text-white shadow-sm">{activeDish.price} {formatCurrency(activeDish.currency)}</span>
                </div>
                <div className="my-4 h-[1px] bg-neutral-100" />
                {activeTranslation.composition ? (
                  <div className="space-y-1.5">
                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-[#E12C43]">{menuUiData.compositionLabel}</h4>
                    <p className="text-xs leading-relaxed text-neutral-600">{activeTranslation.composition}</p>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400 italic">Таркиб муайян нашудааст / Состав не указан</p>
                )}
                <button onClick={() => setActiveDish(null)} className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#FF8FAB] to-[#E12C43] border border-[#E12C43]/20 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm">{menuUiData.closeLabel}</button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}