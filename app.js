const TEMPLATE_BANK = {
  strategy_summary: {
    balanced:
      "{report_period} döneminde {client_name} için çift yönlü trafik stratejisi uygulanmış, marka algısını güçlendiren kreatif test ve optimizasyon süreci aktif şekilde yürütülmüştür.",
    optimization:
      "Bu dönemde temel yaklaşım, düşük performanslı reklamların elenmesi ve bütçenin verimli kreatiflere yönlendirilmesi üzerine kurgulanmıştır.",
    awareness:
      "Rapor döneminde görünürlük ve etkileşimi birlikte artırmak için website ve platform yönlendirmeleri dengeli biçimde planlanmıştır."
  },
  strategic_insight: {
    efficiency:
      "Test ve optimizasyon süreci sayesinde düşük performanslı reklamlar kapatılarak bütçe daha verimli kreatiflere yönlendirilmiştir.",
    traffic:
      "Kampanya yapısı, hem doğrudan trafik kazanımı hem de kullanıcıyı satış kanalına taşıyan yönlendirme akışını desteklemiştir.",
    consistency:
      "Düzenli kreatif iterasyonu, performansın dönem boyunca daha stabil ilerlemesine katkı sağlamıştır."
  },
  strategic_results: {
    standard:
      "Reklamlar yalnızca trafik değil, organik görünürlüğü de önemli ölçüde artırmıştır.\nMarka bilinirliği ve profil etkileşimi güçlenmiştir.\nWebsite üzerinden oluşturulan marka algısı, yönlendirme performansını desteklemiştir.",
    growth:
      "Kreatif test süreci ile içerik performansı sürekli optimize edilmiştir.\nOrganik metriklerde gözle görülür bir iyileşme yakalanmıştır.\nKanal geçişlerinde kullanıcı akışı güçlenmiştir.",
    focus:
      "Reklam harcaması, yüksek geri dönüş sağlayan reklam setlerine odaklanacak şekilde yönetilmiştir.\nBu yapı görünürlük ve etkileşim tarafında daha dengeli bir büyüme üretmiştir."
  },
  growth_note: {
    organic: "Organik etkileşimde önemli artış",
    stable: "Dönem boyunca sürdürülebilir büyüme eğilimi korunmuştur",
    visibility: "Gösterim ve erişim metriklerinde belirgin ivme yakalanmıştır"
  },
  overall_evaluation: {
    healthy:
      "Bu dönem, satış kanallarına trafik sağlama ve marka prestiji oluşturma açısından verimli ve sağlıklı bir büyüme süreci sunmuştur.",
    strong:
      "Genel tablo, performans odaklı optimizasyon yaklaşımının olumlu sonuç verdiğini ve bir sonraki döneme güçlü bir temel oluşturduğunu göstermektedir.",
    momentum:
      "Kampanya çıktıları, görünürlük ve etkileşim tarafında ivmenin sürdüğünü ve stratejinin doğru kurgulandığını ortaya koymaktadır."
  }
};

const DEFAULT_FUNNEL_STEPS = [
  { id: "step_1", label: "", value: "" }
];

const TEMPLATE_TITLES = {
  strategy_summary: {
    balanced: "Dengeli Strateji",
    optimization: "Optimizasyon Odaklı",
    awareness: "Görünürlük ve Etkileşim"
  },
  strategic_insight: {
    efficiency: "Verimlilik Vurgusu",
    traffic: "Trafik ve Yönlendirme",
    consistency: "Süreklilik ve İstikrar"
  },
  strategic_results: {
    standard: "Standart Sonuç Seti",
    growth: "Büyüme Odaklı Sonuçlar",
    focus: "Bütçe Odaklı Sonuçlar"
  },
  growth_note: {
    organic: "Organik Artış",
    stable: "Sürdürülebilir Büyüme",
    visibility: "Görünürlük İvmesi"
  },
  overall_evaluation: {
    healthy: "Sağlıklı Dönem Özeti",
    strong: "Güçlü Performans Özeti",
    momentum: "İvme Değerlendirmesi"
  }
};

const sectionDefinitions = [
  {
    id: "goals_strategy",
    name: "Kampanya Hedefleri ve Strateji",
    description: "Hedefler ve strateji özeti",
    fields: [
      { key: "goal_1", label: "Hedef 1", type: "text", required: true },
      { key: "goal_2", label: "Hedef 2", type: "text", required: true },
      { key: "goal_3", label: "Hedef 3", type: "text" },
      { key: "goal_4", label: "Hedef 4", type: "text" },
      {
        key: "strategy_summary_template_key",
        label: "Strateji Şablonu",
        type: "template_select",
        templateGroup: "strategy_summary",
        required: true
      },
      { key: "strategy_summary_custom", label: "Strateji Ek Notu (Opsiyonel)", type: "textarea" }
    ],
    render: (data) => `
      <section class="report-section">
        <h3>Kampanya Hedefleri</h3>
        <ol>
          ${[data.goal_1, data.goal_2, data.goal_3, data.goal_4]
            .filter(Boolean)
            .map((goal) => `<li>${escapeHtml(goal)}</li>`)
            .join("")}
        </ol>
        <h3>Strateji Özeti</h3>
        <p>${escapeHtml(resolveNarrative(data, "strategy_summary"))}</p>
      </section>
    `
  },
  {
    id: "funnel",
    name: "Dönüşüm Hunisi",
    description: "Platform ve değer gir, sırala",
    fields: [{ key: "funnel", label: "Huni Akışı", type: "funnel_builder" }],
    render: (data) => {
      const steps = getFunnelStepsFromData(data);
      const typedSteps = (steps.length ? steps : DEFAULT_FUNNEL_STEPS).filter((step) => String(step.label || "").trim() || String(step.value || "").trim());
      if (!typedSteps.length) {
        return `
      <section class="report-section">
        <h3>${trText("Dönüşüm Hunisi")}</h3>
        <p>${trText("Platform ve değer girildiğinde huni burada görünecek.")}</p>
      </section>
    `;
      }

      const nodes = typedSteps.map((step, index) => {
        const rawValue = String(step.value || "").trim();
        const normalized = Number(rawValue.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, ""));
        return {
          label: step.label || `Adım ${index + 1}`,
          value: rawValue,
          numeric: Number.isFinite(normalized) ? normalized : NaN,
          index
        };
      });

      const numericValues = nodes.map((node) => node.numeric).filter((value) => Number.isFinite(value) && value > 0);
      const maxValue = numericValues.length ? Math.max(...numericValues) : 0;
      const palette = ["#3b2a98", "#5ba7d8", "#1c8f53", "#d8c86f", "#cb6679", "#8d63d1"];
      const chartNodes = nodes.map((node, index) => {
        if (maxValue > 0 && Number.isFinite(node.numeric) && node.numeric > 0) {
          return { ...node, width: Math.max(24, Math.min(100, (node.numeric / maxValue) * 100)), color: palette[index % palette.length] };
        }
        return { ...node, width: Math.max(24, 100 - node.index * 17), color: palette[index % palette.length] };
      });

      return `
      <section class="report-section">
        <h3>${trText("Dönüşüm Hunisi")}</h3>
        <div class="funnel-chart">
          ${chartNodes
            .map((node, index) => {
              const nextWidth = index < chartNodes.length - 1 ? chartNodes[index + 1].width : Math.max(18, node.width * 0.72);
              return `
                <div class="funnel-segment-wrap">
                  <div class="funnel-segment" style="--top:${node.width}%; --bottom:${nextWidth}%; --segment:${node.color};">
                    <span class="funnel-node-title">${escapeHtml(node.label)}</span>
                    <strong class="funnel-node-value">${escapeHtml(node.value || "-")}</strong>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
    }
  },
  {
    id: "kpi",
    name: "Anahtar Performans Göstergeleri",
    description: "Bütçe, erişim, gösterim, tıklama",
    fields: [
      { key: "spend_tl", label: "Toplam Harcama (TL)", type: "text", required: true },
      { key: "reach", label: "Erişim", type: "text", required: true },
      { key: "impressions", label: "Görünürlük / Gösterim", type: "text", required: true },
      { key: "link_clicks", label: "Toplam Link Tıklaması", type: "text", required: true }
    ],
    render: (data) => `
      <section class="report-section">
        <h3>Anahtar Performans Göstergeleri</h3>
        <div class="kpi-grid">
          <div class="kpi-card"><span>Bütçe</span><strong>${escapeHtml(data.spend_tl || "-")} TL</strong><small>Toplam Harcama</small></div>
          <div class="kpi-card"><span>Erişim</span><strong>${escapeHtml(data.reach || "-")}</strong><small>Tekil Kullanıcı</small></div>
          <div class="kpi-card"><span>Görünürlük</span><strong>${escapeHtml(data.impressions || "-")}</strong><small>Toplam Gösterim</small></div>
          <div class="kpi-card"><span>Etkileşim</span><strong>${escapeHtml(data.link_clicks || "-")}</strong><small>Toplam Link Tıklaması</small></div>
        </div>
        <p>Bu dönemde toplam ${escapeHtml(data.spend_tl || "-")} TL harcama ile ${escapeHtml(data.reach || "-")} kişiye erişildi ve ${escapeHtml(data.link_clicks || "-")} link tıklaması elde edildi.</p>
      </section>
    `
  },
  {
    id: "follower_growth",
    name: "Takipçi Artışı",
    description: "Yeni takipçi adedi",
    fields: [{ key: "new_followers", label: "Yeni Takipçi", type: "text" }],
    render: (data) => `
      <section class="report-section">
        <h3>${trText("Takipçi Artışı")}</h3>
        <div class="kpi-grid">
          <div class="kpi-card"><span>${trText("Yeni Takipçi")}</span><strong>+${escapeHtml(data.new_followers || "0")}</strong><small>${trText("Dönem Toplamı")}</small></div>
        </div>
      </section>
    `
  },
  {
    id: "creative_test",
    name: "Kreatif Test Süreci",
    description: "Test edilen/aktif/kapatılan reklamlar",
    fields: [
      { key: "creative_tested", label: "Test Edilen Farklı Kreatif", type: "text" },
      { key: "ads_activated", label: "Aktif Edilen Reklam", type: "text" },
      { key: "ads_paused", label: "Kapatılan Reklam", type: "text" },
      { key: "ads_active", label: "Aktif Devam Reklam", type: "text" }
    ],
    render: (data) => `
      <section class="report-section">
        <h3>Kreatif Test Süreci</h3>
        <div class="kpi-grid">
          <div class="kpi-card"><span>${escapeHtml(data.creative_tested || "-")}</span><strong>Farklı Kreatif</strong><small>Test Edildi</small></div>
          <div class="kpi-card"><span>${escapeHtml(data.ads_activated || "-")}</span><strong>Reklam</strong><small>Aktif Edildi</small></div>
          <div class="kpi-card"><span>${escapeHtml(data.ads_paused || "-")}</span><strong>Reklam</strong><small>Kapatıldı</small></div>
          <div class="kpi-card"><span>${escapeHtml(data.ads_active || "-")}</span><strong>Reklam</strong><small>Aktif Devam</small></div>
        </div>
      </section>
    `
  },
  {
    id: "strategic_insight",
    name: "Stratejik Insight",
    description: "Hazır cümle + kullanıcı metni",
    fields: [
      {
        key: "strategic_insight_template_key",
        label: "Insight Şablonu",
        type: "template_select",
        templateGroup: "strategic_insight",
        required: true
      },
      { key: "strategic_insight_custom", label: "Insight Ek Notu (Opsiyonel)", type: "textarea" }
    ],
    render: (data) => `
      <section class="report-section">
        <h3>Stratejik Insight</h3>
        <p>${escapeHtml(resolveNarrative(data, "strategic_insight"))}</p>
      </section>
    `
  },
  {
    id: "organic_impact",
    name: "Organik Etki",
    description: "Organik metrikler ve artış",
    fields: [
      { key: "organic_impressions", label: "Organik Gösterim", type: "text" },
      { key: "organic_impressions_growth", label: "Organik Gösterim Artış %", type: "text" },
      { key: "organic_interactions", label: "Organik Etkileşim", type: "text" },
      { key: "organic_interactions_growth", label: "Organik Etkileşim Artış %", type: "text" }
    ],
    render: (data) => `
      <section class="report-section">
        <h3>Organik Gösterim</h3>
        <div class="kpi-grid">
          <div class="kpi-card"><span>Organik Gösterim</span><strong>${escapeHtml(data.organic_impressions || "-")}</strong><small>Toplam</small></div>

          <div class="kpi-card"><span>Önceki Döneme Göre Artış</span><strong>${escapeHtml(data.organic_impressions_growth || "-")}</strong><small>Gösterim Artışı</small></div>
          <div class="kpi-card"><span>Organik Etkileşim</span><strong>${escapeHtml(data.organic_interactions || "-")}</strong><small>Toplam</small></div>
          <div class="kpi-card"><span>Önceki Döneme Göre Artış</span><strong>${escapeHtml(data.organic_interactions_growth || "-")}</strong><small>Etkileşim Artışı</small></div>
        </div>
      </section>
    `
  },
  {
    id: "strategic_results",
    name: "Stratejik Sonuçlar",
    description: "Maddeler halinde sonuçlar",
    fields: [
      {
        key: "strategic_results_template_key",
        label: "Stratejik Sonuçlar Şablonu",
        type: "template_select",
        templateGroup: "strategic_results",
        required: true
      },
      {
        key: "strategic_results_custom",
        label: "Stratejik Sonuçlar Ek Maddeler (Her satıra 1 madde)",
        type: "textarea",
        placeholder: "Kreatif test süreci sayesinde performans sürekli optimize edilmiştir"
      }
    ],
    render: (data) => {
      const items = resolveListNarrative(data, "strategic_results")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const listHtml = items.length
        ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "<p>-</p>";
      return `
      <section class="report-section">
        <h3>Stratejik Sonuçlar</h3>
        ${listHtml}
      </section>
    `;
    }
  },
  {
    id: "growth",
    name: "Büyüme Performansı",
    description: "Çarpan bazlı büyüme alanları",
    fields: [
      {
        key: "growth_note_template_key",
        label: "Büyüme Notu Şablonu",
        type: "template_select",
        templateGroup: "growth_note",
        required: true
      },
      { key: "growth_note_custom", label: "Büyüme Notu Ek Metin (Opsiyonel)", type: "text" },
      { key: "impression_multiplier", label: "Gösterim Artışı (örn 4,3x)", type: "text" },
      { key: "reach_multiplier", label: "Erişim Artışı (örn 3,5x)", type: "text" }
    ],
    render: (data) => `
      <section class="report-section">
        <h3>Büyüme Performansı</h3>
        <p>${escapeHtml(resolveNarrative(data, "growth_note"))}</p>
        <p>Gösterim artışı: <strong>${escapeHtml(data.impression_multiplier || "-")}</strong></p>
        <p>Erişim artışı: <strong>${escapeHtml(data.reach_multiplier || "-")}</strong></p>
      </section>
    `
  },
  {
    id: "overall_evaluation",
    name: "Genel Değerlendirme",
    description: "Raporun kapanış metni",
    fields: [
      {
        key: "overall_evaluation_template_key",
        label: "Genel Değerlendirme Şablonu",
        type: "template_select",
        templateGroup: "overall_evaluation",
        required: true
      },
      { key: "overall_evaluation_custom", label: "Genel Değerlendirme Ek Notu (Opsiyonel)", type: "textarea" }
    ],
    render: (data) => `
      <section class="report-section">
        <h3>Genel Değerlendirme</h3>
        <p>${escapeHtml(resolveNarrative(data, "overall_evaluation"))}</p>
      </section>
    `
  }
];

const form = document.getElementById("reportForm");
const stepButtons = [...document.querySelectorAll(".step")];
const stepPanels = [...document.querySelectorAll(".step-panel")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const previewBtn = document.getElementById("previewBtn");
const dynamicFields = document.getElementById("dynamicFields");
const previewContainer = document.getElementById("reportPreview");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const languageSelect = document.getElementById("languageSelect");

let currentLang = "tr";

const I18N = {
  tr: {
    language_label: "Dil",
    hero_title: "Ajans Rapor Oluşturucu",
    hero_subtitle: "Standart cümle şablonları + değişken alanlar ile profesyonel PDF çıktısı.",
    step_structure: "Rapor Yapısı",
    step_theme: "Tema ve Marka",
    step_data: "Veri ve İçerik",
    panel_create_title: "Nasıl bir rapor oluşturmak istiyorsun?",
    panel_theme_title: "Tema ve Marka Ayarları",
    panel_data_title: "Veriler ve Metin Alanları",
    panel_data_hint: "Her bölümdeki checkbox'ı açıp kapatarak ilgili yazı alanlarını anında gösterip gizleyebilirsin.",
    btn_prev: "Geri",
    btn_next: "İleri",
    btn_preview: "Önizlemeyi Yenile",
    btn_pdf: "PDF Olarak İndir",
    preview_title: "Rapor Önizleme",
    report_type: "Rapor Tipi",
    report_type_meta: "Meta Reklam Performans Raporu",
    report_type_custom: "Özel Performans Raporu",
    report_title: "Rapor Başlığı",
    start_date: "Başlangıç Tarihi",
    end_date: "Bitiş Tarihi",
    client_name: "Müşteri Adı",
    agency_name: "Ajans Adı",
    agency_logo: "Ajans Logosu",
    client_logo: "Müşteri Logosu",
    optional: "(Opsiyonel)",
    primary_color: "Ana Renk",
    cover_mid: "Kapak Orta Tonu",
    text_color: "Metin Rengi",
    gradient_type: "Gradient Tipi",
    gradient_deep: "Derin Glow",
    gradient_diagonal: "Diyagonal Yumuşak",
    gradient_radial: "Radyal Odak",
    not_selected: "Bu sayfa için bölüm seçilmedi.",
    preview_first: "Önce rapor önizlemesini oluşturun.",
    page_perf: "Performans Sonuçları",
    page_org: "Organik Etki ve Genel Değerlendirme"
  },
  en: {
    language_label: "Language",
    hero_title: "Agency Report Builder",
    hero_subtitle: "Professional PDF output with standard templates + variables.",
    step_structure: "Report Setup",
    step_theme: "Theme & Brand",
    step_data: "Data & Content",
    panel_create_title: "What kind of report do you want to create?",
    panel_theme_title: "Theme & Brand Settings",
    panel_data_title: "Data & Content Fields",
    panel_data_hint: "Toggle each section checkbox to show/hide related input fields instantly.",
    btn_prev: "Back",
    btn_next: "Next",
    btn_preview: "Refresh Preview",
    btn_pdf: "Download PDF",
    preview_title: "Report Preview",
    report_type: "Report Type",
    report_type_meta: "Meta Ad Performance Report",
    report_type_custom: "Custom Performance Report",
    report_title: "Report Title",
    start_date: "Start Date",
    end_date: "End Date",
    client_name: "Client Name",
    agency_name: "Agency Name",
    agency_logo: "Agency Logo",
    client_logo: "Client Logo",
    optional: "(Optional)",
    primary_color: "Primary Color",
    cover_mid: "Cover Mid Tone",
    text_color: "Text Color",
    gradient_type: "Gradient Type",
    gradient_deep: "Deep Glow",
    gradient_diagonal: "Diagonal Soft",
    gradient_radial: "Radial Focus",
    not_selected: "No section selected for this page.",
    preview_first: "Generate report preview first.",
    page_perf: "Performance Results",
    page_org: "Organic Impact & Overall Review"
  }
};

let currentStep = 1;
let logoState = { agency_logo: "", client_logo: "" };
let fieldState = {};
const defaultSelectedSectionIds = [
  "goals_strategy",
  "funnel",
  "kpi",
  "follower_growth",
  "creative_test",
  "strategic_insight",
  "organic_impact",
  "strategic_results",
  "growth",
  "overall_evaluation"
];
let selectedSectionsState = new Set();
let previewDebounce = null;
let funnelStepsState = DEFAULT_FUNNEL_STEPS.map((step) => ({ ...step }));
let pendingPreviewFocusSectionId = "";
if (languageSelect?.value === "en") currentLang = "en";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function t(key) {
  return I18N[currentLang]?.[key] || I18N.tr[key] || key;
}

function trText(text) {
  const map = {
    "Kampanya Hedefleri ve Strateji": { en: "Campaign Goals & Strategy" },
    "Dönüşüm Hunisi": { en: "Conversion Funnel" },
    "Anahtar Performans Göstergeleri": { en: "Key Performance Indicators" },
    "Takipçi Artışı": { en: "Follower Growth" },
    "Kreatif Test Süreci": { en: "Creative Testing Process" },
    "Stratejik Insight": { en: "Strategic Insight" },
    "Organik Etki": { en: "Organic Impact" },
    "Stratejik Sonuçlar": { en: "Strategic Outcomes" },
    "Büyüme Performansı": { en: "Growth Performance" },
    "Genel Değerlendirme": { en: "Overall Evaluation" },
    "Yeni Takipçi": { en: "New Followers" },
    "Dönem Toplamı": { en: "Period Total" },
    "Platform ve değer girildiğinde huni burada görünecek.": { en: "The funnel will appear here after entering platform and value." }
  };
  if (currentLang === "tr") return text;
  return map[text]?.en || text;
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });
}

function normalizeHexColor(value, fallback) {
  const raw = String(value || "").trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(raw)) return raw;
  if (/^#[0-9A-Fa-f]{3}$/.test(raw)) {
    const short = raw.slice(1);
    return `#${short[0]}${short[0]}${short[1]}${short[1]}${short[2]}${short[2]}`;
  }
  return fallback;
}

function clampColor(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}


function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex, "#000000");
  const clean = normalized.slice(1);
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16)
  };
}

function rgbToHex(r, g, b) {
  return `#${clampColor(r).toString(16).padStart(2, "0")}${clampColor(g).toString(16).padStart(2, "0")}${clampColor(b)
    .toString(16)
    .padStart(2, "0")}`;
}

function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  const safeAlpha = Math.max(0, Math.min(1, Number(alpha)));
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}

function shiftHex(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + amount, g + amount, b + amount);
}

function getCoverBackground(palette, gradientType) {
  const deep = escapeHtml(palette.coverDeep);
  const base = escapeHtml(palette.cover);
  const mid = escapeHtml(palette.coverMid);
  const glowA45 = escapeHtml(hexToRgba(palette.glowA, 0.45));
  const glowA18 = escapeHtml(hexToRgba(palette.glowA, 0.18));
  const glowB42 = escapeHtml(hexToRgba(palette.glowB, 0.42));
  const glowB22 = escapeHtml(hexToRgba(palette.glowB, 0.22));
  const transparentDeep = escapeHtml(hexToRgba(palette.coverDeep, 0));

  if (gradientType === "diagonal_soft") {
    return `
      linear-gradient(138deg, ${base} 0%, ${mid} 52%, ${deep} 100%),
      radial-gradient(88% 120% at 12% 10%, ${glowA18} 0%, ${transparentDeep} 60%)
    `;
  }

  if (gradientType === "radial_focus") {
    return `
      radial-gradient(120% 130% at 18% 24%, ${glowA45} 0%, ${glowA18} 32%, ${transparentDeep} 66%),
      radial-gradient(90% 110% at 88% 84%, ${glowB42} 0%, ${glowB22} 24%, ${transparentDeep} 62%),
      linear-gradient(148deg, ${base} 0%, ${mid} 46%, ${deep} 100%)
    `;
  }

  return `
    radial-gradient(96% 120% at 10% 18%, ${glowA45} 0%, ${glowA18} 30%, ${transparentDeep} 62%),
    radial-gradient(74% 96% at 90% 90%, ${glowB42} 0%, ${transparentDeep} 56%),
    linear-gradient(136deg, ${base} 0%, ${mid} 42%, ${deep} 100%)
  `;
}

function pickContrastText(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#0F1720" : "#FFFFFF";
}

function formatDateTR(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function buildReportPeriod(start, end) {
  const startText = formatDateTR(start);
  const endText = formatDateTR(end);
  if (startText && endText) return `${startText} - ${endText}`;
  return startText || endText || "";
}

function syncPeriodField() {
  const start = form.report_start_date?.value || "";
  const end = form.report_end_date?.value || "";
  const period = buildReportPeriod(start, end);
  fieldState.report_period = period;
}

function renderLivePreview() {
  const data = collectFormData();
  renderPreview(data);
}

function scheduleLivePreview() {
  if (previewDebounce) {
    clearTimeout(previewDebounce);
  }
  previewDebounce = setTimeout(() => {
    renderLivePreview();
  }, 80);
}

function injectSectionId(sectionHtml, sectionId) {
  return sectionHtml.replace('<section class="report-section"', `<section class="report-section" data-preview-section="${sectionId}"`);
}

function getFunnelStepsFromData(data) {
  if (!data.funnel_steps_json) {
    return funnelStepsState.map((step) => ({ ...step }));
  }
  try {
    const parsed = JSON.parse(String(data.funnel_steps_json));
    if (!Array.isArray(parsed)) return funnelStepsState.map((step) => ({ ...step }));
    return parsed
      .map((item, index) => ({
        id: String(item.id || `step_${index + 1}`),
        label: String(item.label || "").trim(),
        value: String(item.value || "").trim()
      }))
      .filter((item) => item.label || item.value);
  } catch {
    return funnelStepsState.map((step) => ({ ...step }));
  }
}

function updateFunnelStep(stepId, key, value) {
  funnelStepsState = funnelStepsState.map((step) => (step.id === stepId ? { ...step, [key]: value } : step));
}

function addFunnelStep() {
  const id = `custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  funnelStepsState = [...funnelStepsState, { id, label: "", value: "" }];
}

function applyTemplate(rawTemplate, data) {
  return String(rawTemplate || "").replace(/\{([^}]+)\}/g, (_, key) => {
    const value = data[key.trim()];
    return value == null || value === "" ? "-" : String(value);
  });
}

function getTemplateText(data, baseKey) {
  const selectedKey = data[`${baseKey}_template_key`];
  const group = TEMPLATE_BANK[baseKey] || {};
  return applyTemplate(group[selectedKey] || "", data);
}

function resolveNarrative(data, baseKey) {
  const fromTemplate = getTemplateText(data, baseKey).trim();
  const custom = String(data[`${baseKey}_custom`] || "").trim();
  if (fromTemplate && custom) return `${fromTemplate} ${custom}`;
  return fromTemplate || custom || "-";
}

function resolveListNarrative(data, baseKey) {
  const fromTemplate = getTemplateText(data, baseKey).trim();
  const custom = String(data[`${baseKey}_custom`] || "").trim();
  if (fromTemplate && custom) return `${fromTemplate}\n${custom}`;
  return fromTemplate || custom || "-";
}

function getTemplateEntries(groupName) {
  const group = TEMPLATE_BANK[groupName] || {};
  const titles = TEMPLATE_TITLES[groupName] || {};
  return Object.entries(group).map(([key, text]) => {
    const cleanText = String(text).replaceAll("\n", " ");
    return {
      key,
      title: titles[key] || key,
      preview: cleanText
    };
  });
}

function snapshotDynamicValues() {
  const entries = [...dynamicFields.querySelectorAll("input[name], textarea[name], select[name]")].map((el) => {
    if (el instanceof HTMLInputElement && el.type === "checkbox") {
      return [el.name, el.checked ? "1" : ""];
    }
    return [el.name, el.value];
  });
  for (const [key, value] of entries) {
    fieldState[key] = value;
  }
}

function bindDynamicStateTracking() {
  [...dynamicFields.querySelectorAll("input[name], textarea[name], select[name]")].forEach((el) => {
    const update = () => {
      if (el instanceof HTMLInputElement && el.type === "checkbox") {
        fieldState[el.name] = el.checked ? "1" : "";
      } else {
        fieldState[el.name] = el.value;
      }
      scheduleLivePreview();
    };
    el.addEventListener("input", update);
    el.addEventListener("change", update);
  });
}

function renderDynamicFields() {
  snapshotDynamicValues();
  const selectedSet = selectedSectionsState;

  dynamicFields.innerHTML = sectionDefinitions
    .map(
      (section) => {
        const sectionEnabled = selectedSet.has(section.id);
        const disabledAttr = sectionEnabled ? "" : "disabled";
        return `
      <fieldset class="dynamic-group">
        <legend class="dynamic-group-head">
          <label class="section-toggle">
            <input type="checkbox" class="section-toggle-input" data-section-id="${section.id}" ${selectedSet.has(section.id) ? "checked" : ""} />
            <span>${trText(section.name)}</span>
          </label>
        </legend>
        <div class="grid two section-fields ${selectedSet.has(section.id) ? "" : "is-hidden"}" data-section-fields="${section.id}">
          ${section.fields
            .map((field) => {
              const tag =
                field.type === "textarea"
                  ? "textarea"
                  : field.type === "template_select"
                    ? "select"
                    : field.type === "funnel_builder"
                      ? "funnel_builder"
                      : "input";
              const required = field.required ? "required" : "";
              const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : "";
              const savedValue = fieldState[field.key] || "";

              if (tag === "textarea") {
                return `
                  <label>
                    <span class="field-label">${trText(field.label)}${field.required ? ' <span class="meta-required" aria-hidden="true">*</span>' : ` <span class="meta-optional">${t("optional")}</span>`}</span>
                    <textarea name="${field.key}" ${required} ${disabledAttr} ${placeholder}>${escapeHtml(savedValue)}</textarea>
                  </label>
                `;
              }

              if (tag === "select") {
                const entries = getTemplateEntries(field.templateGroup);
                const initialPreview = entries.length ? entries[0].preview : "";
                return `
                  <label>
                    <span class="field-label">${trText(field.label)}${field.required ? ' <span class="meta-required" aria-hidden="true">*</span>' : ` <span class="meta-optional">${t("optional")}</span>`}</span>
                    <select name="${field.key}" data-template-group="${field.templateGroup}" data-preview-target="${field.key}__preview" ${required} ${disabledAttr}>
                      ${entries
                        .map((entry) => {
                          return `<option value="${entry.key}" ${savedValue === entry.key ? "selected" : ""}>${escapeHtml(entry.title)} - ${escapeHtml(entry.preview.slice(0, 52))}${entry.preview.length > 52 ? "..." : ""}</option>`;
                        })
                        .join("")}
                    </select>
                    <small class="template-help" id="${field.key}__preview">${escapeHtml(initialPreview.slice(0, 180))}${initialPreview.length > 180 ? "..." : ""}</small>
                  </label>
                `;
              }

              if (tag === "funnel_builder") {
                return `
                  <div class="funnel-builder">
                    ${funnelStepsState
                      .map((step) => {
                        return `
                          <div class="funnel-builder-row">
                            <input
                              type="text"
                              class="funnel-step-name-input"
                              data-funnel-id="${step.id}"
                              value="${escapeHtml(step.label)}"
                              placeholder="${currentLang === "en" ? "Platform (e.g. Meta Ads)" : "Platform (örn: Meta Ads)"}"
                            />
                            <input
                              type="text"
                              class="funnel-platform-value"
                              data-funnel-value-id="${step.id}"
                              value="${escapeHtml(step.value)}"
                              placeholder="${currentLang === "en" ? "Value (e.g. 100,000)" : "Değer (örn: 100.000)"}"
                            />
                          </div>
                        `;
                      })
                      .join("")}
                    <button type="button" class="funnel-add-btn">${currentLang === "en" ? "+ Add Platform" : "+ Platform Ekle"}</button>
                  </div>
                `;
              }

              return `
                <label>
                  <span class="field-label">${trText(field.label)}${field.required ? ' <span class="meta-required" aria-hidden="true">*</span>' : ` <span class="meta-optional">${t("optional")}</span>`}</span>
                  <input type="text" name="${field.key}" value="${escapeHtml(savedValue)}" ${required} ${disabledAttr} ${placeholder} />
                </label>
              `;
            })
            .join("")}
        </div>
      </fieldset>
    `;
      }
    )
    .join("");

  [...dynamicFields.querySelectorAll("select[data-template-group]")].forEach((select) => {
    const refreshPreview = () => {
      const groupName = select.dataset.templateGroup;
      const entries = getTemplateEntries(groupName);
      const current = entries.find((entry) => entry.key === select.value);
      const targetId = select.dataset.previewTarget;
      const target = targetId ? dynamicFields.querySelector(`#${targetId}`) : null;
      if (target && current) {
        target.textContent = current.preview;
      }
    };
    select.addEventListener("change", refreshPreview);
    refreshPreview();
  });

  [...dynamicFields.querySelectorAll(".section-toggle-input")].forEach((toggle) => {
    toggle.addEventListener("change", () => {
      const sectionId = toggle.dataset.sectionId;
      if (!sectionId) return;
      if (toggle.checked) {
        selectedSectionsState.add(sectionId);
        pendingPreviewFocusSectionId = sectionId;
      }
      else selectedSectionsState.delete(sectionId);
      renderDynamicFields();
      scheduleLivePreview();
    });
  });

  [...dynamicFields.querySelectorAll(".funnel-step-name-input")].forEach((input) => {
    input.addEventListener("input", () => {
      const id = input.dataset.funnelId;
      if (!id) return;
      updateFunnelStep(id, "label", input.value);
      scheduleLivePreview();
    });
  });

  [...dynamicFields.querySelectorAll(".funnel-platform-value[data-funnel-value-id]")].forEach((input) => {
    input.addEventListener("input", () => {
      const id = input.dataset.funnelValueId;
      if (!id) return;
      updateFunnelStep(id, "value", input.value);
      scheduleLivePreview();
    });
  });

  const addBtn = dynamicFields.querySelector(".funnel-add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addFunnelStep();
      renderDynamicFields();
      scheduleLivePreview();
    });
  }

  bindDynamicStateTracking();
}

function updateStepUI() {
  stepButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.step) === currentStep);
  });

  stepPanels.forEach((panel) => {
    panel.classList.toggle("active", Number(panel.dataset.step) === currentStep);
  });

  prevBtn.style.display = currentStep === 1 ? "none" : "inline-flex";
  nextBtn.style.display = currentStep === 3 ? "none" : "inline-flex";
  previewBtn.style.display = currentStep === 3 ? "inline-flex" : "none";
}


function collectFormData() {
  syncPeriodField();
  snapshotDynamicValues();
  const data = { ...fieldState, ...Object.fromEntries(new FormData(form).entries()) };
  data.funnel_steps_json = JSON.stringify(funnelStepsState);
  data.selected_sections = [...selectedSectionsState];
  data.agency_logo = logoState.agency_logo;
  data.client_logo = logoState.client_logo;
  return data;
}

function renderPreview(data) {
  const primary = normalizeHexColor(data.primary_color_hex, "#0E2943");
  const text = normalizeHexColor(data.text_color_hex, "#102437");
  const cover = shiftHex(primary, -58);
  const coverDeep = shiftHex(primary, -96);
  const coverMidDefault = shiftHex(primary, -24);
  const coverMid = data.cover_mid_hex ? normalizeHexColor(data.cover_mid_hex, coverMidDefault) : coverMidDefault;
  const glowA = shiftHex(primary, 42);
  const glowB = shiftHex(primary, 26);
  const secondary = shiftHex(primary, 18);
  const accent = shiftHex(primary, 34);
  const coverText = pickContrastText(coverMid);
  const gradientType = String(data.gradient_type || "glow_deep");

  const palette = {
    primary,
    secondary,
    accent,
    cover,
    coverDeep,
    coverMid,
    glowA,
    glowB,
    text,
    coverText
  };

  const sectionMap = new Map(sectionDefinitions.map((section) => [section.id, section]));
  const renderByIds = (ids) =>
    ids
      .filter((id) => data.selected_sections.includes(id))
      .map((id) => sectionMap.get(id))
      .filter(Boolean)
      .map((section) => injectSectionId(section.render(data), section.id))
      .join("");

  const page1Sections = renderByIds(["goals_strategy", "funnel"]);
  const page2Sections = renderByIds(["kpi", "follower_growth", "creative_test", "strategic_insight"]);
  const page3Sections = renderByIds(["organic_impact", "strategic_results", "growth", "overall_evaluation"]);

  previewContainer.innerHTML = `
    <div class="report-stack" style="--primary:${escapeHtml(palette.primary)};--secondary:${escapeHtml(palette.secondary)};--accent:${escapeHtml(palette.accent)};--text:${escapeHtml(palette.text)};">
      <article class="pdf-page">
        <section class="cover" style="background:${getCoverBackground(palette, gradientType)};color:${escapeHtml(palette.coverText)};">
          <div class="cover-grain" aria-hidden="true"></div>
          <div class="logo-slot logo-left">
            <div class="logo-box">${data.agency_logo ? `<img src="${data.agency_logo}" alt="Ajans logosu" />` : `<span>${escapeHtml(data.agency_name)}</span>`}</div>
          </div>
          <div class="logo-slot logo-right">
            <div class="logo-box">${data.client_logo ? `<img src="${data.client_logo}" alt="Müşteri logosu" />` : `<span>${escapeHtml(data.client_name)}</span>`}</div>
          </div>
          <p class="eyebrow">${escapeHtml(data.report_type === "custom_performance" ? "Özel Rapor" : "Meta Reklam Raporu")}</p>
          <h1>${escapeHtml(data.client_name)}</h1>
          <h2>${escapeHtml(data.report_title)}</h2>
          <p>${escapeHtml(data.report_period)}</p>
        </section>
        <section class="content">
          ${page1Sections || `<p>${t("not_selected")}</p>`}
        </section>
      </article>

      <article class="pdf-page">
        <header class="page-head">
          <h2>${t("page_perf")}</h2>
          <p>${escapeHtml(data.client_name)} • ${escapeHtml(data.report_period)}</p>
        </header>
        <section class="content">
          ${page2Sections || `<p>${t("not_selected")}</p>`}
        </section>
      </article>

      <article class="pdf-page">
        <header class="page-head">
          <h2>${t("page_org")}</h2>
          <p>${escapeHtml(data.client_name)} • ${escapeHtml(data.report_period)}</p>
        </header>
        <section class="content">
          ${page3Sections || `<p>${t("not_selected")}</p>`}
        </section>
      </article>
    </div>
  `;

  if (pendingPreviewFocusSectionId) {
    const target = previewContainer.querySelector(`[data-preview-section="${pendingPreviewFocusSectionId}"]`);
    if (target) {
      const previewRect = previewContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const delta = targetRect.top - previewRect.top;
      const top = Math.max(0, previewContainer.scrollTop + delta - previewContainer.clientHeight * 0.18);
      previewContainer.scrollTo({ top, behavior: "smooth" });
    }
    pendingPreviewFocusSectionId = "";
  }
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
    logoState[input.name] = "";
    scheduleLivePreview();
    return;
  }

  logoState[input.name] = await readFileAsDataUrl(input.files[0]);
  scheduleLivePreview();
}

async function waitForRenderableAssets(root) {
  if (document.fonts && typeof document.fonts.ready?.then === "function") {
    try {
      await document.fonts.ready;
    } catch (_error) {
      // Continue even if font readiness fails in some browsers.
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

renderDynamicFields();
updateStepUI();
syncPeriodField();
applyStaticI18n();

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    currentLang = languageSelect.value === "en" ? "en" : "tr";
    applyStaticI18n();
    renderDynamicFields();
    scheduleLivePreview();
  });
}

if (form.report_start_date) {
  form.report_start_date.addEventListener("change", () => {
    syncPeriodField();
    scheduleLivePreview();
  });
}
if (form.report_end_date) {
  form.report_end_date.addEventListener("change", () => {
    syncPeriodField();
    scheduleLivePreview();
  });
}

form.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
  if (target.type === "file") return;
  scheduleLivePreview();
});

form.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
  if (target.type === "file") return;
  scheduleLivePreview();
});

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentStep = Number(button.dataset.step);
    updateStepUI();
  });
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep -= 1;
    updateStepUI();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentStep < 3) {
    currentStep += 1;
    updateStepUI();
  }
});

form.agency_logo.addEventListener("change", updateLogoState);
form.client_logo.addEventListener("change", updateLogoState);

previewBtn.addEventListener("click", () => {
  renderLivePreview();
});

downloadPdfBtn.addEventListener("click", async () => {
  const printable = previewContainer.querySelector(".report-stack");
  if (!printable) {
    alert(t("preview_first"));
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

renderLivePreview();

