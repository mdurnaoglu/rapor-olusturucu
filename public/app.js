const REPORT_TYPE_ORDER = ["meta", "google_ads", "linkedin_ads", "social_media", "website", "general_performance", "custom"];
const AD_REPORT_TYPES = new Set(["meta", "google_ads", "linkedin_ads"]);

const TEXT = {
  tr: {
    no_sections: "Bu sayfa için içerik seçilmedi.",
    cover_label: "Reklam Performans Raporu",
    report_period: "Rapor Dönemi",
    language: "Dil",
    currency: "Para Birimi",
    goals: "Rapor Hedefleri",
    page_kpi: "KPI Özeti",
    current_period: "Mevcut Dönem",
    previous_period: "Önceki Dönem",
    previous_optional: "Önceki dönem (opsiyonel)",
    kpi_note: "KPI notu (opsiyonel)",
    general_note: "Genel Not",
    report_image: "Rapor Görseli",
    image_position: "Görsel Konumu",
    image_start: "Başlangıç",
    image_middle: "Orta",
    image_end: "Son",
    select_limit_reached: "Bu rapor tipi için KPI seçim limiti doldu.",
    creative_test: "Kreatif Test Süreci",
    tested_creatives: "Test Edilen Kreatif",
    activated_ads: "Aktif Edilen Reklam",
    paused_ads: "Kapatılan Reklam",
    ongoing_ads: "Aktif Devam Reklam",
    add_custom_kpi: "+ Yeni KPI Ekle",
    custom_kpi_name: "Alan Adı",
    custom_kpi_type: "Alan Türü",
    number: "Sayı",
    currency_type: "Para",
    percent: "Yüzde",
    text_type: "Metin",
    social_platforms: "Seçili Platformlar",
    no_kpi_selected: "Henüz KPI seçilmedi.",
    custom_modules: "Özel Modüller",
    no_custom_modules: "Özel modül eklenmedi.",
    preview_first: "Önce rapor önizlemesini oluşturun.",
    summary: "Genel Özet",
    period_comparison: "Dönem Karşılaştırması"
  },
  en: {
    no_sections: "No section selected for this page.",
    cover_label: "Advertising Performance Report",
    report_period: "Report Period",
    language: "Language",
    currency: "Currency",
    goals: "Report Goals",
    page_kpi: "KPI Summary",
    current_period: "Current Period",
    previous_period: "Previous Period",
    previous_optional: "Previous period (optional)",
    kpi_note: "KPI note (optional)",
    general_note: "General Note",
    report_image: "Report Image",
    image_position: "Image Position",
    image_start: "Start",
    image_middle: "Middle",
    image_end: "End",
    select_limit_reached: "KPI selection limit reached for this report type.",
    creative_test: "Creative Testing Process",
    tested_creatives: "Tested Creatives",
    activated_ads: "Activated Ads",
    paused_ads: "Paused Ads",
    ongoing_ads: "Ongoing Ads",
    add_custom_kpi: "+ Add New KPI",
    custom_kpi_name: "Field Name",
    custom_kpi_type: "Field Type",
    number: "Number",
    currency_type: "Currency",
    percent: "Percent",
    text_type: "Text",
    social_platforms: "Selected Platforms",
    no_kpi_selected: "No KPI selected yet.",
    custom_modules: "Custom Modules",
    no_custom_modules: "No custom module added.",
    preview_first: "Generate the preview first.",
    summary: "Overview",
    period_comparison: "Period Comparison"
  }
};

function metric(id, tr, en, kind = "number") {
  return { id, label: { tr, en }, kind };
}

const REPORT_CONFIG = {
  meta: {
    label: { tr: "META", en: "META" },
    maxKpis: 12,
    groups: [
      {
        title: { tr: "Genel Özet", en: "Overview" },
        items: [
          metric("spend", "Harcama", "Spend", "currency"),
          metric("impressions", "Gösterim", "Impressions", "number"),
          metric("reach", "Erişim", "Reach", "number"),
          metric("clicks", "Tıklama", "Clicks", "number"),
          metric("ctr", "CTR", "CTR", "percent"),
          metric("cpc", "CPC", "CPC", "currency"),
          metric("cpm", "CPM", "CPM", "currency")
        ]
      },
      {
        title: { tr: "Sonuç KPI", en: "Result KPI" },
        items: [
          metric("leads", "Lead Sayısı", "Lead Count", "number"),
          metric("purchases", "Satın Alma", "Purchases", "number"),
          metric("add_to_cart", "Sepete Ekleme", "Add to Cart", "number"),
          metric("messages", "Mesaj Sayısı", "Message Count", "number"),
          metric("calls", "Telefon Araması", "Phone Calls", "number")
        ]
      },
      {
        title: { tr: "Maliyet Performansı", en: "Cost Performance" },
        items: [
          metric("cpl", "CPL", "CPL", "currency"),
          metric("cpa", "CPA", "CPA", "currency"),
          metric("roas", "ROAS", "ROAS", "ratio"),
          metric("cost_per_message", "Cost per Message", "Cost per Message", "currency")
        ]
      },
      {
        title: { tr: "Dönüşüm Değeri", en: "Conversion Value" },
        items: [metric("revenue", "Toplam Gelir", "Total Revenue", "currency")]
      },
      {
        title: { tr: "Kitle Performansı", en: "Audience Performance" },
        items: [
          metric("best_age", "En İyi Yaş Grubu", "Best Age Group", "text"),
          metric("best_gender", "En İyi Cinsiyet", "Best Gender", "text"),
          metric("best_placement", "En İyi Yerleşim", "Best Placement", "text")
        ]
      }
    ]
  },
  google_ads: {
    label: { tr: "Google Ads", en: "Google Ads" },
    maxKpis: 12,
    groups: [
      {
        title: { tr: "Genel", en: "General" },
        items: [
          metric("spend", "Harcama", "Spend", "currency"),
          metric("impressions", "Gösterim", "Impressions", "number"),
          metric("clicks", "Tıklama", "Clicks", "number"),
          metric("ctr", "CTR", "CTR", "percent"),
          metric("cpc", "CPC", "CPC", "currency"),
          metric("cpm", "CPM", "CPM", "currency"),
          metric("click_rate", "Tıklama Oranı", "Click Rate", "percent")
        ]
      },
      {
        title: { tr: "Sonuç", en: "Results" },
        items: [
          metric("conversions", "Dönüşüm Sayısı", "Conversions", "number"),
          metric("conversion_rate", "Dönüşüm Oranı", "Conversion Rate", "percent"),
          metric("conversion_cost", "Dönüşüm Maliyeti", "Conversion Cost", "currency")
        ]
      },
      {
        title: { tr: "Değer", en: "Value" },
        items: [
          metric("conversion_value", "Conversion Value", "Conversion Value", "currency"),
          metric("roas", "ROAS", "ROAS", "ratio")
        ]
      },
      {
        title: { tr: "Kampanya Türü Dağılımı", en: "Campaign Type Distribution" },
        items: [
          metric("search_spend", "Search Harcama", "Search Spend", "currency"),
          metric("display_spend", "Display Harcama", "Display Spend", "currency"),
          metric("pmax_spend", "PMax Harcama", "PMax Spend", "currency"),
          metric("youtube_spend", "YouTube Harcama", "YouTube Spend", "currency")
        ]
      }
    ]
  },
  linkedin_ads: {
    label: { tr: "LinkedIn Ads", en: "LinkedIn Ads" },
    maxKpis: 10,
    groups: [
      {
        title: { tr: "Genel", en: "General" },
        items: [
          metric("spend", "Harcama", "Spend", "currency"),
          metric("impressions", "Gösterim", "Impressions", "number"),
          metric("clicks", "Tıklama", "Clicks", "number"),
          metric("ctr", "CTR", "CTR", "percent"),
          metric("cpc", "CPC", "CPC", "currency")
        ]
      },
      {
        title: { tr: "Sonuç", en: "Results" },
        items: [
          metric("leads", "Lead Sayısı", "Lead Count", "number"),
          metric("forms", "Form Doldurma", "Form Completions", "number"),
          metric("website_conversion", "Website Conversion", "Website Conversion", "number")
        ]
      },
      {
        title: { tr: "Lead Kalitesi", en: "Lead Quality" },
        items: [
          metric("cpl", "CPL", "CPL", "currency"),
          metric("avg_lead_cost", "Ortalama Lead Maliyeti", "Average Lead Cost", "currency")
        ]
      }
    ]
  },
  social_media: {
    label: { tr: "Sosyal Medya", en: "Social Media" },
    maxKpis: 12,
    groups: [
      {
        title: { tr: "Büyüme", en: "Growth" },
        items: [
          metric("followers_start", "Takipçi Başlangıç", "Followers Start", "number"),
          metric("followers_end", "Takipçi Bitiş", "Followers End", "number"),
          metric("followers_growth", "Takipçi Artışı", "Follower Growth", "number")
        ]
      },
      {
        title: { tr: "Erişim", en: "Reach" },
        items: [
          metric("reach_total", "Toplam Erişim", "Total Reach", "number"),
          metric("impressions", "Gösterim", "Impressions", "number")
        ]
      },
      {
        title: { tr: "Etkileşim", en: "Engagement" },
        items: [
          metric("likes", "Beğeni", "Likes", "number"),
          metric("comments", "Yorum", "Comments", "number"),
          metric("saves", "Kaydetme", "Saves", "number"),
          metric("shares", "Paylaşım", "Shares", "number"),
          metric("engagement_rate", "Engagement Rate", "Engagement Rate", "percent")
        ]
      },
      {
        title: { tr: "İçerik Performansı", en: "Content Performance" },
        items: [
          metric("post_count", "Post Sayısı", "Post Count", "number"),
          metric("reels_count", "Reels Sayısı", "Reels Count", "number"),
          metric("best_content_link", "En İyi İçerik Linki", "Best Content Link", "text")
        ]
      }
    ]
  },
  general_performance: {
    label: { tr: "Genel Performans", en: "General Performance" },
    maxKpis: 10,
    groups: [
      {
        title: { tr: "Üst Yönetim Özeti", en: "Executive Summary" },
        items: [
          metric("total_marketing_spend", "Toplam Pazarlama Harcaması", "Total Marketing Spend", "currency"),
          metric("total_leads", "Toplam Lead", "Total Leads", "number"),
          metric("total_sales", "Toplam Satış", "Total Sales", "number"),
          metric("total_messages", "Toplam Mesajlaşma", "Total Messaging", "number"),
          metric("avg_cpl", "Ortalama CPL", "Average CPL", "currency"),
          metric("avg_cpa", "Ortalama CPA", "Average CPA", "currency"),
          metric("total_revenue", "Toplam Ciro", "Total Revenue", "currency"),
          metric("roas", "ROAS", "ROAS", "ratio"),
          metric("website_visits", "Website Ziyaret", "Website Visits", "number"),
          metric("sessions", "Oturum", "Sessions", "number"),
          metric("bounce_rate", "Bounce Rate", "Bounce Rate", "percent")
        ]
      }
    ]
  },
  website: {
    label: { tr: "Web Site", en: "Website" },
    maxKpis: 14,
    groups: [
      {
        title: { tr: "Trafik Özeti", en: "Traffic Summary" },
        items: [
          metric("users", "Kullanıcılar", "Users", "number"),
          metric("new_users", "Yeni Kullanıcılar", "New Users", "number"),
          metric("sessions", "Oturumlar", "Sessions", "number"),
          metric("page_views", "Görüntülenme", "Views", "number"),
          metric("engaged_sessions", "Etkileşimli Oturum", "Engaged Sessions", "number"),
          metric("engagement_rate", "Etkileşim Oranı", "Engagement Rate", "percent"),
          metric("avg_engagement_time", "Oturum Başına Ort. Etkileşim Süresi", "Avg Engagement Time / Session", "text")
        ]
      },
      {
        title: { tr: "Trafik Kaynak Kalitesi", en: "Traffic Source Quality" },
        items: [
          metric("channel_breakdown", "Kanal Kırılımı", "Channel Breakdown", "text"),
          metric("source_medium_users", "Kaynak/Aracıya Göre Kullanıcı", "Users by Source/Medium", "text")
        ]
      },
      {
        title: { tr: "Landing Page Performansı", en: "Landing Page Performance" },
        items: [
          metric("top_landing_pages", "En İyi Açılış Sayfaları", "Top Landing Pages", "text"),
          metric("landing_engagement_rate", "Açılış Sayfası Etkileşim Oranı", "Landing Engagement Rate", "percent")
        ]
      },
      {
        title: { tr: "Dönüşüm ve İş Hedefi", en: "Conversion and Business Goal" },
        items: [
          metric("total_conversions", "Toplam Dönüşüm", "Total Conversions", "number"),
          metric("conversion_rate", "Dönüşüm Oranı", "Conversion Rate", "percent"),
          metric("top_conversion_pages", "En Çok Dönüşüm Alan Sayfalar", "Top Conversion Pages", "text")
        ]
      }
    ]
  },
  custom: {
    label: { tr: "Özel Rapor", en: "Custom Report" },
    maxKpis: 10,
    groups: []
  }
};

const GOAL_LABELS = {
  lead: { tr: "Lead / Form Toplama", en: "Lead / Form Collection" },
  sales: { tr: "Satış / E-ticaret", en: "Sales / E-commerce" },
  traffic: { tr: "Trafik", en: "Traffic" },
  awareness: { tr: "Marka Bilinirliği", en: "Brand Awareness" },
  engagement: { tr: "Etkileşim", en: "Engagement" },
  app: { tr: "Uygulama İndirme", en: "App Install" },
  overall: { tr: "Genel Performans", en: "Overall Performance" }
};

const SOCIAL_PLATFORM_LABELS = {
  instagram: { tr: "Instagram", en: "Instagram" },
  facebook: { tr: "Facebook", en: "Facebook" },
  x: { tr: "X", en: "X" },
  linkedin: { tr: "LinkedIn", en: "LinkedIn" },
  tiktok: { tr: "TikTok", en: "TikTok" },
  youtube: { tr: "YouTube", en: "YouTube" }
};

const CURRENCY_SYMBOLS = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
  GBP: "£"
};

const FONT_STACK = {
  Inter: "Inter, sans-serif",
  Montserrat: "Montserrat, sans-serif",
  Poppins: "Poppins, sans-serif",
  "Open Sans": "'Open Sans', sans-serif",
  Roboto: "Roboto, sans-serif"
};

const THEME_PRESETS = {
  theme_1: {
    mode: "light",
    coverColor: "#0e2943",
    headingColor: "#ffffff",
    textColor: "#102437",
    accentColor: "#1d6fa3",
    gradientEnabled: true,
    gradientColor1: "#1d4fa8",
    gradientColor2: "#071934",
    gradientDirection: "diagonal",
    fontFamily: "Inter",
    headingSize: "medium",
    bodySize: "medium"
  },
  theme_2: {
    mode: "dark",
    coverColor: "#051327",
    headingColor: "#f3f7ff",
    textColor: "#d2dcf1",
    accentColor: "#67b9ff",
    gradientEnabled: true,
    gradientColor1: "#224fd6",
    gradientColor2: "#040a18",
    gradientDirection: "diagonal",
    fontFamily: "Inter",
    headingSize: "medium",
    bodySize: "medium"
  },
  theme_3: {
    mode: "light",
    coverColor: "#364eb6",
    headingColor: "#ffffff",
    textColor: "#1a2245",
    accentColor: "#6f63d8",
    gradientEnabled: true,
    gradientColor1: "#8d57d9",
    gradientColor2: "#67b9ff",
    gradientDirection: "horizontal",
    fontFamily: "Poppins",
    headingSize: "medium",
    bodySize: "medium"
  }
};

const SIZE_SCALE = {
  small: { h1: 44, h2: 28, h3: 22, body: 14, kpi: 22 },
  medium: { h1: 52, h2: 32, h3: 24, body: 16, kpi: 26 },
  large: { h1: 60, h2: 36, h3: 28, body: 18, kpi: 30 }
};

const form = document.getElementById("reportForm");
const stepButtons = [...document.querySelectorAll(".step")];
const stepPanels = [...document.querySelectorAll(".step-panel")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const previewBtn = document.getElementById("previewBtn");
const dynamicFields = document.getElementById("dynamicFields");
const previewContainer = document.getElementById("reportPreview");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");

const socialPlatformsBlock = document.getElementById("socialPlatformsBlock");
const customModuleBlock = document.getElementById("customModuleBlock");
const customModuleInput = document.getElementById("customModuleInput");
const addCustomModuleBtn = document.getElementById("addCustomModuleBtn");
const customModuleList = document.getElementById("customModuleList");

const state = {
  currentStep: 1,
  selectedReportTypes: new Set(["meta", "google_ads"]),
  selectedSocialPlatforms: new Set(["instagram"]),
  selectedGoals: new Set(["lead"]),
  customModules: [],
  selectedKpisByType: {},
  kpiValuesByType: {},
  customKpis: [],
  reportNotesByType: {},
  reportImageByType: {},
  creativeByType: {},
  logoState: { agency_logo: "", client_logo: "" },
  previewDebounce: null,
  customKpiSeq: 1
};

function text(key, lang) {
  return TEXT[lang]?.[key] || TEXT.tr[key] || key;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCurrentLang() {
  return form.report_language?.value === "en" ? "en" : "tr";
}

function getLocale(lang) {
  return lang === "en" ? "en-US" : "tr-TR";
}

function reportTypeLabel(typeId, lang) {
  return REPORT_CONFIG[typeId]?.label?.[lang] || typeId;
}

function metricLabel(metricObj, lang) {
  return metricObj?.label?.[lang] || metricObj?.id || "";
}

function readSelectedCheckboxValues(name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function toBoolean(value) {
  return value === true || value === "true" || value === "on" || value === 1;
}

function parseLooseNumber(raw) {
  const input = String(raw || "").trim();
  if (!input) return NaN;
  let cleaned = input.replace(/\s/g, "").replace(/[^\d,.-]/g, "");
  if (!cleaned) return NaN;

  const commaCount = (cleaned.match(/,/g) || []).length;
  const dotCount = (cleaned.match(/\./g) || []).length;

  if (commaCount > 0 && dotCount > 0) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      cleaned = cleaned.replace(/,/g, "");
    }
  } else if (commaCount > 0 && dotCount === 0) {
    cleaned = cleaned.replace(",", ".");
  }

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function formatMetricValue(kind, rawValue, currency, lang) {
  const raw = String(rawValue || "").trim();
  if (!raw) return "-";
  if (kind === "text") return raw;

  const number = parseLooseNumber(raw);
  if (!Number.isFinite(number)) return raw;

  const locale = getLocale(lang);

  if (kind === "currency") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "TRY",
      maximumFractionDigits: 2
    }).format(number);
  }

  if (kind === "percent") {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(number)}%`;
  }

  if (kind === "ratio") {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(number)}x`;
  }

  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(number);
}

function formatDelta(currentRaw, previousRaw, lang) {
  const current = parseLooseNumber(currentRaw);
  const previous = parseLooseNumber(previousRaw);
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) {
    return null;
  }

  const delta = ((current - previous) / Math.abs(previous)) * 100;
  const sign = delta >= 0 ? "+" : "";
  const locale = getLocale(lang);
  return {
    className: delta >= 0 ? "up" : "down",
    text: `${sign}${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(delta)}%`
  };
}

function buildReportPeriod(start, end, lang) {
  const locale = getLocale(lang);
  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  };

  const startText = formatDate(start);
  const endText = formatDate(end);
  if (startText && endText) return `${startText} - ${endText}`;
  return startText || endText || "-";
}

function getFlattenKpis(typeId) {
  const config = REPORT_CONFIG[typeId];
  if (!config) return [];
  return config.groups.flatMap((group) => group.items);
}

function getMetricById(typeId, metricId) {
  return getFlattenKpis(typeId).find((item) => item.id === metricId) || null;
}

function createCustomKpi() {
  const id = `custom_kpi_${state.customKpiSeq++}`;
  return {
    id,
    name: "",
    kind: "number",
    current: "",
    previous: "",
    note: ""
  };
}

function ensureTypeState(typeId) {
  if (!state.selectedKpisByType[typeId]) {
    const defaultItems = getFlattenKpis(typeId).slice(0, 6).map((item) => item.id);
    state.selectedKpisByType[typeId] = new Set(defaultItems);
  }

  if (!state.kpiValuesByType[typeId]) {
    state.kpiValuesByType[typeId] = {};
  }

  if (!state.reportNotesByType[typeId]) {
    state.reportNotesByType[typeId] = "";
  }

  if (!state.reportImageByType[typeId]) {
    state.reportImageByType[typeId] = { position: "start", src: "" };
  }

  if (AD_REPORT_TYPES.has(typeId) && !state.creativeByType[typeId]) {
    state.creativeByType[typeId] = { tested: "", activated: "", paused: "", active: "" };
  }

  if (typeId === "custom" && state.customKpis.length === 0) {
    state.customKpis = [createCustomKpi()];
  }
}

function syncStateFromStep1() {
  const reportTypes = readSelectedCheckboxValues("report_types");
  if (!reportTypes.length) {
    const fallbackInput = form.querySelector('input[name="report_types"][value="meta"]');
    if (fallbackInput) fallbackInput.checked = true;
  }

  state.selectedReportTypes = new Set(readSelectedCheckboxValues("report_types"));
  if (!state.selectedReportTypes.size) {
    state.selectedReportTypes = new Set(["meta"]);
  }

  state.selectedSocialPlatforms = new Set(readSelectedCheckboxValues("social_platforms"));
  if (state.selectedReportTypes.has("social_media") && !state.selectedSocialPlatforms.size) {
    const firstPlatform = form.querySelector('input[name="social_platforms"][value="instagram"]');
    if (firstPlatform) {
      firstPlatform.checked = true;
      state.selectedSocialPlatforms = new Set(["instagram"]);
    }
  }

  state.selectedGoals = new Set(readSelectedCheckboxValues("report_goals"));

  [...state.selectedReportTypes].forEach((typeId) => ensureTypeState(typeId));
}

function renderCustomModuleChips() {
  const chipsHtml = state.customModules.length
    ? state.customModules
        .map(
          (chip, index) => `
            <button type="button" class="chip-item" data-remove-custom-module="${index}">
              <span>${escapeHtml(chip)}</span>
              <strong>×</strong>
            </button>
          `
        )
        .join("")
    : `<p class="inline-note">${text("no_custom_modules", getCurrentLang())}</p>`;

  customModuleList.innerHTML = chipsHtml;

  customModuleList.querySelectorAll("[data-remove-custom-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-remove-custom-module"));
      if (Number.isNaN(index)) return;
      state.customModules.splice(index, 1);
      renderCustomModuleChips();
      scheduleLivePreview();
    });
  });
}

function updateStep1ConditionalBlocks() {
  const hasSocial = state.selectedReportTypes.has("social_media");
  const hasCustom = state.selectedReportTypes.has("custom");
  socialPlatformsBlock.classList.toggle("is-hidden", !hasSocial);
  customModuleBlock.classList.toggle("is-hidden", !hasCustom);
}

function getThemePresetById(id) {
  return THEME_PRESETS[id] || THEME_PRESETS.theme_1;
}

function setThemeMode(mode) {
  const defaults = mode === "dark"
    ? {
        coverColor: "#06142b",
        headingColor: "#f3f7ff",
        textColor: "#d3ddf2",
        accentColor: "#6eb8ff",
        gradientColor1: "#234ec7",
        gradientColor2: "#040a18"
      }
    : {
        coverColor: "#0e2943",
        headingColor: "#ffffff",
        textColor: "#102437",
        accentColor: "#1d6fa3",
        gradientColor1: "#1d4fa8",
        gradientColor2: "#071934"
      };

  form.cover_color.value = defaults.coverColor;
  form.heading_color.value = defaults.headingColor;
  form.text_color.value = defaults.textColor;
  form.accent_color.value = defaults.accentColor;
  form.gradient_color_1.value = defaults.gradientColor1;
  form.gradient_color_2.value = defaults.gradientColor2;
}

function applyThemePreset(presetId, schedule = true) {
  const preset = getThemePresetById(presetId);
  const modeInput = form.querySelector(`input[name="theme_mode"][value="${preset.mode}"]`);
  if (modeInput) modeInput.checked = true;

  form.cover_color.value = preset.coverColor;
  form.heading_color.value = preset.headingColor;
  form.text_color.value = preset.textColor;
  form.accent_color.value = preset.accentColor;
  form.gradient_enabled.checked = Boolean(preset.gradientEnabled);
  form.gradient_color_1.value = preset.gradientColor1;
  form.gradient_color_2.value = preset.gradientColor2;
  form.gradient_direction.value = preset.gradientDirection;
  form.font_family.value = preset.fontFamily;
  form.heading_size.value = preset.headingSize;
  form.body_size.value = preset.bodySize;

  if (schedule) scheduleLivePreview();
}

function updateStepUI() {
  stepButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.step) === state.currentStep);
  });

  stepPanels.forEach((panel) => {
    panel.classList.toggle("active", Number(panel.dataset.step) === state.currentStep);
  });

  prevBtn.style.display = state.currentStep === 1 ? "none" : "inline-flex";
  nextBtn.style.display = state.currentStep === 3 ? "none" : "inline-flex";
  previewBtn.style.display = state.currentStep === 3 ? "inline-flex" : "none";
}

function buildMetricSelectionHtml(typeId, lang) {
  const config = REPORT_CONFIG[typeId];
  if (!config || !config.groups.length) return "";

  const selectedSet = state.selectedKpisByType[typeId] || new Set();
  const count = selectedSet.size;

  return `
    <div class="kpi-selection-header">
      <strong>KPI Seçimi</strong>
      <span>${count}/${config.maxKpis}</span>
    </div>
    ${config.groups
      .map((group) => {
        const options = group.items
          .map((item) => {
            const checked = selectedSet.has(item.id) ? "checked" : "";
            return `
              <label class="kpi-pick-item">
                <input type="checkbox" data-kpi-toggle="${typeId}" data-kpi-id="${item.id}" ${checked} />
                <span>${escapeHtml(metricLabel(item, lang))}</span>
              </label>
            `;
          })
          .join("");

        return `
          <div class="kpi-pick-group">
            <h4>${escapeHtml(group.title[lang] || group.title.tr)}</h4>
            <div class="kpi-pick-grid">${options}</div>
          </div>
        `;
      })
      .join("")}
  `;
}

function buildSelectedKpiInputsHtml(typeId, lang) {
  const selectedSet = state.selectedKpisByType[typeId] || new Set();
  if (!selectedSet.size) {
    return `<p class="inline-note">${text("no_kpi_selected", lang)}</p>`;
  }

  const metrics = getFlattenKpis(typeId).filter((item) => selectedSet.has(item.id));

  return metrics
    .map((item) => {
      const metricState = state.kpiValuesByType[typeId]?.[item.id] || { current: "", previous: "", note: "" };
      return `
        <div class="kpi-input-row">
          <div class="kpi-input-row-head">
            <strong>${escapeHtml(metricLabel(item, lang))}</strong>
            <span>${escapeHtml(item.kind)}</span>
          </div>
          <div class="kpi-input-row-grid">
            <input type="text" data-kpi-current="${typeId}" data-kpi-id="${item.id}" value="${escapeHtml(metricState.current)}" placeholder="${text("current_period", lang)}" />
            <input type="text" data-kpi-previous="${typeId}" data-kpi-id="${item.id}" value="${escapeHtml(metricState.previous)}" placeholder="${text("previous_optional", lang)}" />
            <input type="text" data-kpi-note="${typeId}" data-kpi-id="${item.id}" value="${escapeHtml(metricState.note)}" placeholder="${text("kpi_note", lang)}" />
          </div>
        </div>
      `;
    })
    .join("");
}

function buildCreativeTestHtml(typeId, lang) {
  if (!AD_REPORT_TYPES.has(typeId)) return "";
  const creative = state.creativeByType[typeId] || { tested: "", activated: "", paused: "", active: "" };

  return `
    <div class="creative-block">
      <h4>${text("creative_test", lang)}</h4>
      <div class="grid two compact-grid">
        <label>
          <span class="field-label">${text("tested_creatives", lang)}</span>
          <input type="text" data-creative="${typeId}" data-creative-key="tested" value="${escapeHtml(creative.tested)}" />
        </label>
        <label>
          <span class="field-label">${text("activated_ads", lang)}</span>
          <input type="text" data-creative="${typeId}" data-creative-key="activated" value="${escapeHtml(creative.activated)}" />
        </label>
        <label>
          <span class="field-label">${text("paused_ads", lang)}</span>
          <input type="text" data-creative="${typeId}" data-creative-key="paused" value="${escapeHtml(creative.paused)}" />
        </label>
        <label>
          <span class="field-label">${text("ongoing_ads", lang)}</span>
          <input type="text" data-creative="${typeId}" data-creative-key="active" value="${escapeHtml(creative.active)}" />
        </label>
      </div>
    </div>
  `;
}

function buildReportAssetHtml(typeId, lang) {
  const imageState = state.reportImageByType[typeId] || { position: "start", src: "" };
  const note = state.reportNotesByType[typeId] || "";
  const imagePreview = imageState.src
    ? `
      <div class="asset-preview">
        <img src="${imageState.src}" alt="report-image" />
        <button type="button" data-clear-type-image="${typeId}">Görseli Temizle</button>
      </div>
    `
    : "";

  return `
    <div class="asset-grid">
      <label>
        <span class="field-label">${text("image_position", lang)}</span>
        <select data-image-position="${typeId}">
          <option value="start" ${imageState.position === "start" ? "selected" : ""}>${text("image_start", lang)}</option>
          <option value="middle" ${imageState.position === "middle" ? "selected" : ""}>${text("image_middle", lang)}</option>
          <option value="end" ${imageState.position === "end" ? "selected" : ""}>${text("image_end", lang)}</option>
        </select>
      </label>
      <label>
        <span class="field-label">${text("report_image", lang)}</span>
        <input type="file" accept="image/*" data-type-image="${typeId}" />
      </label>
      <label class="full-width">
        <span class="field-label">${text("general_note", lang)}</span>
        <textarea data-type-note="${typeId}" placeholder="${text("general_note", lang)}">${escapeHtml(note)}</textarea>
      </label>
      ${imagePreview}
    </div>
  `;
}

function buildCustomReportHtml(lang) {
  const rows = state.customKpis
    .map(
      (item) => `
      <div class="custom-kpi-row" data-custom-kpi-row="${item.id}">
        <input type="text" data-custom-name="${item.id}" value="${escapeHtml(item.name)}" placeholder="${text("custom_kpi_name", lang)}" />
        <select data-custom-kind="${item.id}">
          <option value="number" ${item.kind === "number" ? "selected" : ""}>${text("number", lang)}</option>
          <option value="currency" ${item.kind === "currency" ? "selected" : ""}>${text("currency_type", lang)}</option>
          <option value="percent" ${item.kind === "percent" ? "selected" : ""}>${text("percent", lang)}</option>
          <option value="text" ${item.kind === "text" ? "selected" : ""}>${text("text_type", lang)}</option>
        </select>
        <input type="text" data-custom-current="${item.id}" value="${escapeHtml(item.current)}" placeholder="${text("current_period", lang)}" />
        <input type="text" data-custom-previous="${item.id}" value="${escapeHtml(item.previous)}" placeholder="${text("previous_optional", lang)}" />
        <input type="text" data-custom-note="${item.id}" value="${escapeHtml(item.note)}" placeholder="${text("kpi_note", lang)}" />
        <button type="button" data-remove-custom-kpi="${item.id}">×</button>
      </div>
    `
    )
    .join("");

  return `
    <div class="custom-kpi-builder">
      <div class="kpi-selection-header">
        <strong>${text("custom_kpi_name", lang)}</strong>
      </div>
      <div class="custom-kpi-list">${rows}</div>
      <button type="button" class="add-custom-kpi" data-add-custom-kpi>${text("add_custom_kpi", lang)}</button>
    </div>
  `;
}

function renderDynamicFields() {
  syncStateFromStep1();
  const lang = getCurrentLang();

  const selectedTypes = REPORT_TYPE_ORDER.filter((typeId) => state.selectedReportTypes.has(typeId));
  if (!selectedTypes.length) {
    dynamicFields.innerHTML = `<p class="inline-note">${text("no_sections", lang)}</p>`;
    return;
  }

  const html = selectedTypes
    .map((typeId) => {
      ensureTypeState(typeId);
      const config = REPORT_CONFIG[typeId];
      const typeTitle = config?.label?.[lang] || config?.label?.tr || typeId;

      const typeSpecific =
        typeId === "custom"
          ? buildCustomReportHtml(lang)
          : `
            <div class="kpi-builder-block">
              ${buildMetricSelectionHtml(typeId, lang)}
              <div class="kpi-input-list">
                ${buildSelectedKpiInputsHtml(typeId, lang)}
              </div>
            </div>
          `;

      const socialInfo =
        typeId === "social_media" && state.selectedSocialPlatforms.size
          ? `
            <div class="inline-pills">
              <strong>${text("social_platforms", lang)}:</strong>
              ${[...state.selectedSocialPlatforms]
                .map((platformId) => `<span>${escapeHtml(SOCIAL_PLATFORM_LABELS[platformId]?.[lang] || platformId)}</span>`)
                .join("")}
            </div>
          `
          : "";

      const customInfo =
        typeId === "custom"
          ? `
            <div class="inline-pills">
              <strong>${text("custom_modules", lang)}:</strong>
              ${state.customModules.length ? state.customModules.map((module) => `<span>${escapeHtml(module)}</span>`).join("") : `<span>${text("no_custom_modules", lang)}</span>`}
            </div>
          `
          : "";

      return `
        <fieldset class="dynamic-group" data-type-group="${typeId}">
          <legend>${escapeHtml(typeTitle)}</legend>
          ${socialInfo}
          ${customInfo}
          ${typeSpecific}
          ${buildCreativeTestHtml(typeId, lang)}
          ${buildReportAssetHtml(typeId, lang)}
        </fieldset>
      `;
    })
    .join("");

  dynamicFields.innerHTML = html;

  dynamicFields.querySelectorAll("[data-kpi-toggle]").forEach((input) => {
    input.addEventListener("change", () => {
      const typeId = input.getAttribute("data-kpi-toggle");
      const metricId = input.getAttribute("data-kpi-id");
      if (!typeId || !metricId) return;

      const selectedSet = state.selectedKpisByType[typeId] || new Set();
      const max = REPORT_CONFIG[typeId]?.maxKpis || 999;
      if (input.checked) {
        if (selectedSet.size >= max) {
          input.checked = false;
          alert(text("select_limit_reached", getCurrentLang()));
          return;
        }
        selectedSet.add(metricId);
      } else {
        selectedSet.delete(metricId);
      }
      state.selectedKpisByType[typeId] = selectedSet;
      renderDynamicFields();
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-kpi-current]").forEach((input) => {
    input.addEventListener("input", () => {
      const typeId = input.getAttribute("data-kpi-current");
      const metricId = input.getAttribute("data-kpi-id");
      if (!typeId || !metricId) return;
      if (!state.kpiValuesByType[typeId]) state.kpiValuesByType[typeId] = {};
      if (!state.kpiValuesByType[typeId][metricId]) state.kpiValuesByType[typeId][metricId] = { current: "", previous: "", note: "" };
      state.kpiValuesByType[typeId][metricId].current = input.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-kpi-previous]").forEach((input) => {
    input.addEventListener("input", () => {
      const typeId = input.getAttribute("data-kpi-previous");
      const metricId = input.getAttribute("data-kpi-id");
      if (!typeId || !metricId) return;
      if (!state.kpiValuesByType[typeId]) state.kpiValuesByType[typeId] = {};
      if (!state.kpiValuesByType[typeId][metricId]) state.kpiValuesByType[typeId][metricId] = { current: "", previous: "", note: "" };
      state.kpiValuesByType[typeId][metricId].previous = input.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-kpi-note]").forEach((input) => {
    input.addEventListener("input", () => {
      const typeId = input.getAttribute("data-kpi-note");
      const metricId = input.getAttribute("data-kpi-id");
      if (!typeId || !metricId) return;
      if (!state.kpiValuesByType[typeId]) state.kpiValuesByType[typeId] = {};
      if (!state.kpiValuesByType[typeId][metricId]) state.kpiValuesByType[typeId][metricId] = { current: "", previous: "", note: "" };
      state.kpiValuesByType[typeId][metricId].note = input.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-type-note]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      const typeId = textarea.getAttribute("data-type-note");
      if (!typeId) return;
      state.reportNotesByType[typeId] = textarea.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-image-position]").forEach((select) => {
    select.addEventListener("change", () => {
      const typeId = select.getAttribute("data-image-position");
      if (!typeId) return;
      if (!state.reportImageByType[typeId]) state.reportImageByType[typeId] = { position: "start", src: "" };
      state.reportImageByType[typeId].position = select.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-type-image]").forEach((fileInput) => {
    fileInput.addEventListener("change", async () => {
      const typeId = fileInput.getAttribute("data-type-image");
      if (!typeId) return;
      if (!state.reportImageByType[typeId]) state.reportImageByType[typeId] = { position: "start", src: "" };
      const file = fileInput.files?.[0];
      if (!file) {
        state.reportImageByType[typeId].src = "";
        renderDynamicFields();
        scheduleLivePreview();
        return;
      }
      state.reportImageByType[typeId].src = await readFileAsDataUrl(file);
      renderDynamicFields();
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-clear-type-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const typeId = button.getAttribute("data-clear-type-image");
      if (!typeId || !state.reportImageByType[typeId]) return;
      state.reportImageByType[typeId].src = "";
      renderDynamicFields();
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-creative]").forEach((input) => {
    input.addEventListener("input", () => {
      const typeId = input.getAttribute("data-creative");
      const key = input.getAttribute("data-creative-key");
      if (!typeId || !key) return;
      if (!state.creativeByType[typeId]) state.creativeByType[typeId] = { tested: "", activated: "", paused: "", active: "" };
      state.creativeByType[typeId][key] = input.value;
      scheduleLivePreview();
    });
  });

  const addCustomKpi = dynamicFields.querySelector("[data-add-custom-kpi]");
  if (addCustomKpi) {
    addCustomKpi.addEventListener("click", () => {
      if (state.customKpis.length >= REPORT_CONFIG.custom.maxKpis) {
        alert(text("select_limit_reached", getCurrentLang()));
        return;
      }
      state.customKpis.push(createCustomKpi());
      renderDynamicFields();
      scheduleLivePreview();
    });
  }

  dynamicFields.querySelectorAll("[data-remove-custom-kpi]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-remove-custom-kpi");
      state.customKpis = state.customKpis.filter((item) => item.id !== id);
      if (!state.customKpis.length) state.customKpis = [createCustomKpi()];
      renderDynamicFields();
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-custom-name]").forEach((input) => {
    input.addEventListener("input", () => {
      const id = input.getAttribute("data-custom-name");
      const row = state.customKpis.find((item) => item.id === id);
      if (!row) return;
      row.name = input.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-custom-kind]").forEach((select) => {
    select.addEventListener("change", () => {
      const id = select.getAttribute("data-custom-kind");
      const row = state.customKpis.find((item) => item.id === id);
      if (!row) return;
      row.kind = select.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-custom-current]").forEach((input) => {
    input.addEventListener("input", () => {
      const id = input.getAttribute("data-custom-current");
      const row = state.customKpis.find((item) => item.id === id);
      if (!row) return;
      row.current = input.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-custom-previous]").forEach((input) => {
    input.addEventListener("input", () => {
      const id = input.getAttribute("data-custom-previous");
      const row = state.customKpis.find((item) => item.id === id);
      if (!row) return;
      row.previous = input.value;
      scheduleLivePreview();
    });
  });

  dynamicFields.querySelectorAll("[data-custom-note]").forEach((input) => {
    input.addEventListener("input", () => {
      const id = input.getAttribute("data-custom-note");
      const row = state.customKpis.find((item) => item.id === id);
      if (!row) return;
      row.note = input.value;
      scheduleLivePreview();
    });
  });
}

function syncPeriodField() {
  const lang = getCurrentLang();
  const period = buildReportPeriod(form.report_start_date.value, form.report_end_date.value, lang);
  form.report_period.value = period;
}

function getSelectedTypeList() {
  return REPORT_TYPE_ORDER.filter((typeId) => state.selectedReportTypes.has(typeId));
}

function buildCoverBackground(theme) {
  if (!theme.gradientEnabled) return theme.coverColor;

  const angle = theme.gradientDirection === "horizontal" ? "90deg" : theme.gradientDirection === "vertical" ? "180deg" : "135deg";
  return `linear-gradient(${angle}, ${theme.gradientColor1} 0%, ${theme.gradientColor2} 100%), ${theme.coverColor}`;
}

function getThemeTokens(data) {
  const headingScale = SIZE_SCALE[data.heading_size] || SIZE_SCALE.medium;
  const bodyScale = SIZE_SCALE[data.body_size] || SIZE_SCALE.medium;
  return {
    mode: data.theme_mode || "light",
    coverColor: data.cover_color || "#0e2943",
    headingColor: data.heading_color || "#ffffff",
    textColor: data.text_color || "#102437",
    accentColor: data.accent_color || "#1d6fa3",
    gradientEnabled: toBoolean(data.gradient_enabled),
    gradientColor1: data.gradient_color_1 || "#1d4fa8",
    gradientColor2: data.gradient_color_2 || "#071934",
    gradientDirection: data.gradient_direction || "diagonal",
    fontFamily: FONT_STACK[data.font_family] || FONT_STACK.Inter,
    h1: headingScale.h1,
    h2: headingScale.h2,
    h3: headingScale.h3,
    body: bodyScale.body,
    kpi: bodyScale.kpi,
    pageBg: data.theme_mode === "dark" ? "#0f172a" : "#ffffff",
    cardBg: data.theme_mode === "dark" ? "#111f3b" : "#ffffff",
    cardBorder: data.theme_mode === "dark" ? "#2a3a5f" : "#d7e2ee",
    muted: data.theme_mode === "dark" ? "#9ab0d3" : "#5e7286"
  };
}

function getDataSnapshot() {
  syncPeriodField();
  syncStateFromStep1();

  const raw = Object.fromEntries(new FormData(form).entries());
  const selectedKpisByType = {};
  Object.entries(state.selectedKpisByType).forEach(([typeId, set]) => {
    selectedKpisByType[typeId] = [...set];
  });

  return {
    ...raw,
    selectedReportTypes: [...state.selectedReportTypes],
    selectedSocialPlatforms: [...state.selectedSocialPlatforms],
    selectedGoals: [...state.selectedGoals],
    customModules: [...state.customModules],
    selectedKpisByType,
    kpiValuesByType: JSON.parse(JSON.stringify(state.kpiValuesByType)),
    customKpis: JSON.parse(JSON.stringify(state.customKpis)),
    reportNotesByType: JSON.parse(JSON.stringify(state.reportNotesByType)),
    reportImageByType: JSON.parse(JSON.stringify(state.reportImageByType)),
    creativeByType: JSON.parse(JSON.stringify(state.creativeByType)),
    agency_logo: state.logoState.agency_logo,
    client_logo: state.logoState.client_logo
  };
}

function renderMetricCards(typeId, data, lang) {
  if (typeId === "custom") {
    const customRows = (data.customKpis || []).filter((row) => String(row.name || "").trim());
    if (!customRows.length) return `<p class="empty-placeholder">${text("no_kpi_selected", lang)}</p>`;
    return `
      <div class="metric-grid">
        ${customRows
          .map((row) => {
            const current = formatMetricValue(row.kind, row.current, data.currency, lang);
            const previous = formatMetricValue(row.kind, row.previous, data.currency, lang);
            const delta = formatDelta(row.current, row.previous, lang);
            return `
              <article class="metric-card">
                <span class="metric-label">${escapeHtml(row.name)}</span>
                <strong>${escapeHtml(current)}</strong>
                <small>${text("previous_period", lang)}: ${escapeHtml(previous)}</small>
                ${delta ? `<span class="metric-delta ${delta.className}">${escapeHtml(delta.text)}</span>` : ""}
                ${row.note ? `<p class="metric-note">${escapeHtml(row.note)}</p>` : ""}
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  const selectedIds = data.selectedKpisByType[typeId] || [];
  const metrics = getFlattenKpis(typeId).filter((item) => selectedIds.includes(item.id));

  if (!metrics.length) {
    return `<p class="empty-placeholder">${text("no_kpi_selected", lang)}</p>`;
  }

  return `
    <div class="metric-grid">
      ${metrics
        .map((item) => {
          const rowState = data.kpiValuesByType[typeId]?.[item.id] || { current: "", previous: "", note: "" };
          let currentRaw = rowState.current;
          if (typeId === "social_media" && item.id === "followers_growth") {
            const start = parseLooseNumber(data.kpiValuesByType[typeId]?.followers_start?.current);
            const end = parseLooseNumber(data.kpiValuesByType[typeId]?.followers_end?.current);
            if (Number.isFinite(start) && Number.isFinite(end)) {
              currentRaw = String(end - start);
            }
          }

          const current = formatMetricValue(item.kind, currentRaw, data.currency, lang);
          const previous = formatMetricValue(item.kind, rowState.previous, data.currency, lang);
          const delta = formatDelta(currentRaw, rowState.previous, lang);

          return `
            <article class="metric-card">
              <span class="metric-label">${escapeHtml(metricLabel(item, lang))}</span>
              <strong>${escapeHtml(current)}</strong>
              <small>${text("previous_period", lang)}: ${escapeHtml(previous)}</small>
              ${delta ? `<span class="metric-delta ${delta.className}">${escapeHtml(delta.text)}</span>` : ""}
              ${rowState.note ? `<p class="metric-note">${escapeHtml(rowState.note)}</p>` : ""}
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCreativeSummary(typeId, data, lang) {
  if (!AD_REPORT_TYPES.has(typeId)) return "";
  const creative = data.creativeByType[typeId] || {};
  const values = [creative.tested, creative.activated, creative.paused, creative.active].filter((value) => String(value || "").trim());
  if (!values.length) return "";

  return `
    <div class="creative-summary">
      <h4>${text("creative_test", lang)}</h4>
      <div class="metric-grid compact">
        <article class="metric-card compact"><span class="metric-label">${text("tested_creatives", lang)}</span><strong>${escapeHtml(creative.tested || "-")}</strong></article>
        <article class="metric-card compact"><span class="metric-label">${text("activated_ads", lang)}</span><strong>${escapeHtml(creative.activated || "-")}</strong></article>
        <article class="metric-card compact"><span class="metric-label">${text("paused_ads", lang)}</span><strong>${escapeHtml(creative.paused || "-")}</strong></article>
        <article class="metric-card compact"><span class="metric-label">${text("ongoing_ads", lang)}</span><strong>${escapeHtml(creative.active || "-")}</strong></article>
      </div>
    </div>
  `;
}

function renderTypePage(typeId, data, lang, theme) {
  const typeLabel = reportTypeLabel(typeId, lang);
  const imageState = data.reportImageByType[typeId] || { position: "start", src: "" };
  const imageHtml = imageState.src
    ? `<figure class="section-image"><img src="${imageState.src}" alt="${escapeHtml(typeLabel)}" /></figure>`
    : "";

  const contentHtml = renderMetricCards(typeId, data, lang);
  const creativeHtml = renderCreativeSummary(typeId, data, lang);
  const noteHtml = data.reportNotesByType[typeId]
    ? `<div class="general-note"><h4>${text("general_note", lang)}</h4><p>${escapeHtml(data.reportNotesByType[typeId])}</p></div>`
    : "";

  const socialPlatformsHtml =
    typeId === "social_media" && data.selectedSocialPlatforms.length
      ? `
        <div class="inline-pills preview-pills">
          <strong>${text("social_platforms", lang)}:</strong>
          ${data.selectedSocialPlatforms
            .map((platformId) => `<span>${escapeHtml(SOCIAL_PLATFORM_LABELS[platformId]?.[lang] || platformId)}</span>`)
            .join("")}
        </div>
      `
      : "";

  const customModuleHtml =
    typeId === "custom" && data.customModules.length
      ? `
        <div class="inline-pills preview-pills">
          <strong>${text("custom_modules", lang)}:</strong>
          ${data.customModules.map((module) => `<span>${escapeHtml(module)}</span>`).join("")}
        </div>
      `
      : "";

  return `
    <article class="pdf-page" style="--page-bg:${theme.pageBg};--page-text:${theme.textColor};--card-bg:${theme.cardBg};--card-line:${theme.cardBorder};--muted:${theme.muted};--accent:${theme.accentColor};">
      <header class="page-head">
        <h2>${escapeHtml(typeLabel)}</h2>
        <p>${escapeHtml(data.client_name || "-")} • ${escapeHtml(data.report_period || "-")}</p>
      </header>
      <section class="content">
        ${socialPlatformsHtml}
        ${customModuleHtml}
        ${imageState.position === "start" ? imageHtml : ""}
        ${contentHtml}
        ${imageState.position === "middle" ? imageHtml : ""}
        ${creativeHtml}
        ${noteHtml}
        ${imageState.position === "end" ? imageHtml : ""}
      </section>
    </article>
  `;
}

function renderPreview(data) {
  const lang = data.report_language === "en" ? "en" : "tr";
  const theme = getThemeTokens(data);

  const reportTypes = REPORT_TYPE_ORDER.filter((typeId) => data.selectedReportTypes.includes(typeId));
  const goals = data.selectedGoals || [];
  const goalsText = goals.length
    ? goals.map((goal) => GOAL_LABELS[goal]?.[lang] || goal).join(" • ")
    : "-";

  const typeBadges = reportTypes.length
    ? reportTypes.map((typeId) => `<span>${escapeHtml(reportTypeLabel(typeId, lang))}</span>`).join("")
    : `<span>-</span>`;

  const coverBackground = buildCoverBackground(theme);

  const coverPage = `
    <article class="pdf-page" style="--page-bg:${theme.pageBg};--page-text:${theme.textColor};--card-bg:${theme.cardBg};--card-line:${theme.cardBorder};--muted:${theme.muted};--accent:${theme.accentColor};">
      <section class="cover" style="background:${coverBackground};color:${theme.headingColor};--cover-h1:${theme.h1}px;--cover-h2:${theme.h2}px;">
        <div class="logo-slot logo-left">
          <div class="logo-box">${data.agency_logo ? `<img src="${data.agency_logo}" alt="Ajans logosu" />` : `<span>${escapeHtml(data.agency_name || "Ajans")}</span>`}</div>
        </div>
        <div class="logo-slot logo-right">
          <div class="logo-box">${data.client_logo ? `<img src="${data.client_logo}" alt="Müşteri logosu" />` : `<span>${escapeHtml(data.client_name || "Müşteri")}</span>`}</div>
        </div>

        <div class="cover-top-tags">
          <span>${text("language", lang)}: ${lang === "en" ? "English" : "Türkçe"}</span>
          <span>${text("currency", lang)}: ${escapeHtml(data.currency || "TRY")}</span>
        </div>

        <p class="eyebrow">${text("cover_label", lang)}</p>
        <h1>${escapeHtml(data.report_title || "-")}</h1>
        <h2>${escapeHtml(data.client_name || "-")}</h2>
        <p class="period">${text("report_period", lang)}: ${escapeHtml(data.report_period || "-")}</p>

        <div class="cover-chip-row">${typeBadges}</div>
        <p class="cover-goals">${text("goals", lang)}: ${escapeHtml(goalsText)}</p>
      </section>
    </article>
  `;

  const pages = reportTypes.length
    ? reportTypes.map((typeId) => renderTypePage(typeId, data, lang, theme)).join("")
    : `<article class="pdf-page"><section class="content"><p>${text("no_sections", lang)}</p></section></article>`;

  previewContainer.innerHTML = `
    <div class="report-stack" style="--report-font:${theme.fontFamily};--report-body:${theme.body}px;--report-h3:${theme.h3}px;--report-kpi:${theme.kpi}px;--report-accent:${theme.accentColor};--report-text:${theme.textColor};">
      ${coverPage}
      ${pages}
    </div>
  `;
}

function renderLivePreview() {
  const data = getDataSnapshot();
  renderPreview(data);
}

function scheduleLivePreview() {
  if (state.previewDebounce) clearTimeout(state.previewDebounce);
  state.previewDebounce = setTimeout(() => {
    renderLivePreview();
  }, 120);
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function updateLogoState(event) {
  const input = event.target;
  if (!input.files || !input.files[0]) {
    state.logoState[input.name] = "";
    scheduleLivePreview();
    return;
  }

  state.logoState[input.name] = await readFileAsDataUrl(input.files[0]);
  scheduleLivePreview();
}

async function waitForRenderableAssets(root) {
  if (document.fonts && typeof document.fonts.ready?.then === "function") {
    try {
      await document.fonts.ready;
    } catch (_error) {
      // Continue without blocking PDF.
    }
  }

  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        })
    )
  );

  await new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function bindStep1Events() {
  form.querySelectorAll('input[name="report_types"]').forEach((input) => {
    input.addEventListener("change", () => {
      const selected = readSelectedCheckboxValues("report_types");
      if (!selected.length) {
        input.checked = true;
      }
      syncStateFromStep1();
      updateStep1ConditionalBlocks();
      renderDynamicFields();
      scheduleLivePreview();
    });
  });

  form.querySelectorAll('input[name="social_platforms"]').forEach((input) => {
    input.addEventListener("change", () => {
      const selected = readSelectedCheckboxValues("social_platforms");
      if (state.selectedReportTypes.has("social_media") && !selected.length) {
        input.checked = true;
      }
      syncStateFromStep1();
      renderDynamicFields();
      scheduleLivePreview();
    });
  });

  form.querySelectorAll('input[name="report_goals"]').forEach((input) => {
    input.addEventListener("change", () => {
      syncStateFromStep1();
      scheduleLivePreview();
    });
  });

  addCustomModuleBtn.addEventListener("click", () => {
    const value = String(customModuleInput.value || "").trim();
    if (!value) return;
    if (state.customModules.includes(value)) {
      customModuleInput.value = "";
      return;
    }
    state.customModules.push(value);
    customModuleInput.value = "";
    renderCustomModuleChips();
    scheduleLivePreview();
  });

  customModuleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomModuleBtn.click();
    }
  });

  form.report_language.addEventListener("change", () => {
    renderDynamicFields();
    scheduleLivePreview();
  });
}

function bindThemeEvents() {
  form.querySelectorAll('input[name="theme_preset"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      applyThemePreset(radio.value);
    });
  });

  form.querySelectorAll('input[name="theme_mode"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      setThemeMode(radio.value);
      scheduleLivePreview();
    });
  });
}

function bindGenericLiveEvents() {
  form.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
    if (target.type === "file") return;
    syncPeriodField();
    scheduleLivePreview();
  });

  form.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
    if (target.type === "file") return;
    syncPeriodField();
    scheduleLivePreview();
  });
}

function initStepControls() {
  stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentStep = Number(button.dataset.step);
      updateStepUI();
    });
  });

  prevBtn.addEventListener("click", () => {
    if (state.currentStep > 1) {
      state.currentStep -= 1;
      updateStepUI();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (state.currentStep < 3) {
      state.currentStep += 1;
      updateStepUI();
    }
  });

  previewBtn.addEventListener("click", () => {
    renderLivePreview();
  });
}

function initPdfExport() {
  downloadPdfBtn.addEventListener("click", async () => {
    const printable = previewContainer.querySelector(".report-stack");
    if (!printable) {
      alert(text("preview_first", getCurrentLang()));
      return;
    }

    const fileName = `${(form.client_name.value || "rapor").replace(/\s+/g, "_")}_rapor.pdf`;

    await waitForRenderableAssets(printable);

    html2pdf()
      .set({
        margin: 8,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(printable)
      .save();
  });
}

function initLogos() {
  form.agency_logo.addEventListener("change", updateLogoState);
  form.client_logo.addEventListener("change", updateLogoState);
}

function bootstrap() {
  syncStateFromStep1();
  updateStep1ConditionalBlocks();
  renderCustomModuleChips();
  applyThemePreset("theme_1", false);
  renderDynamicFields();
  syncPeriodField();
  updateStepUI();

  bindStep1Events();
  bindThemeEvents();
  bindGenericLiveEvents();
  initStepControls();
  initPdfExport();
  initLogos();

  renderLivePreview();
}

bootstrap();
