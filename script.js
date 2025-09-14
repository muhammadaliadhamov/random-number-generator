const translations = {
  uz: {
    title: "🎲 Random raqam generatori",
    min: "Minimal son",
    max: "Maksimal son",
    count: "Nechta son kerak",
    dup: "Takrorlansinmi?",
    generate: "Yarat",
    copy: "📋 Nusxa olish",
    error: "❗ Iltimos, butun son kiriting."
  },
  ru: {
    title: "🎲 Генератор случайных чисел",
    min: "Минимальное число",
    max: "Максимальное число",
    count: "Сколько чисел?",
    dup: "Разрешить повторы?",
    generate: "Создать",
    copy: "📋 Копировать",
    error: "❗ Введите целые числа."
  },
  en: {
    title: "🎲 Random Number Generator",
    min: "Minimum number",
    max: "Maximum number",
    count: "How many numbers?",
    dup: "Allow duplicates?",
    generate: "Generate",
    copy: "📋 Copy",
    error: "❗ Please enter valid integers."
  },
  es: {
    title: "🎲 Generador de números aleatorios",
    min: "Número mínimo",
    max: "Número máximo",
    count: "¿Cuántos números?",
    dup: "¿Permitir duplicados?",
    generate: "Generar",
    copy: "📋 Copiar",
    error: "❗ Por favor, ingrese números enteros válidos."
  },
  zh: {
    title: "🎲 随机数字生成器",
    min: "最小值",
    max: "最大值",
    count: "需要多少个数字？",
    dup: "允许重复？",
    generate: "生成",
    copy: "📋 复制",
    error: "❗ 请输入有效的整数。"
  },
  de: {
    title: "🎲 Zufallszahlengenerator",
    min: "Minimale Zahl",
    max: "Maximale Zahl",
    count: "Wie viele Zahlen?",
    dup: "Duplikate erlauben?",
    generate: "Generieren",
    copy: "📋 Kopieren",
    error: "❗ Bitte gültige Ganzzahlen eingeben."
  }
};

function applyLanguage(langCode) {
  const t = translations[langCode] || translations["en"];
  document.getElementById("title").textContent = t.title;
  document.getElementById("label-min").childNodes[0].textContent = t.min + ": ";
  document.getElementById("label-max").childNodes[0].textContent = t.max + ": ";
  document.getElementById("label-count").childNodes[0].textContent = t.count + ": ";
  document.getElementById("label-dup").textContent = t.dup;
  document.getElementById("generate").textContent = t.generate;
  document.getElementById("copy").textContent = t.copy;
  window.langError = t.error;
}

const langSelect = document.getElementById("lang");
const defaultLang = (navigator.language || "en").slice(0,2);
langSelect.value = defaultLang;
applyLanguage(defaultLang);

langSelect.addEventListener("change", () => {
  applyLanguage(langSelect.value);
});

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumbers(min, max, count, allowDuplicates) {
  const rangeSize = max - min + 1;
  if (!allowDuplicates && count > rangeSize) {
    return [`❌ ${count} > ${rangeSize}`];
  }

  const result = allowDuplicates
    ? Array.from({ length: count }, () => randint(min, max))
    : (() => {
        const set = new Set();
        while (set.size < count) set.add(randint(min, max));
        return Array.from(set);
      })();

  return result;
}

document.getElementById("generate").onclick = () => {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const count = parseInt(document.getElementById("count").value);
  const allowDuplicates = document.getElementById("duplicates").checked;

  if (isNaN(min) || isNaN(max) || isNaN(count)) {
    document.getElementById("output").textContent = window.langError;
    return;
  }

  const numbers = generateNumbers(min, max, count, allowDuplicates);
  document.getElementById("output").textContent = numbers.join(", ");
};

document.getElementById("copy").onclick = () => {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    document.getElementById("copy").textContent = "✅";
    setTimeout(() => {
      applyLanguage(langSelect.value);
    }, 1500);
  });
};
