
// ================================================
// TRANSLATION SYSTEM
// ================================================
const translationMap = {
  // =========================
  // Navigation
  // =========================
  "Fuji": "富士",
  "About": "私たちについて",
  "Dojo": "道場",
  "Sensei": "先生",
  "Contact": "お問い合わせ",

  // =========================
  // Footer / Branding
  // =========================
  "Fuji Japanese Coaching": "富士日本語コーチング",
  "Learning Japanese with precision, culture, and passion.": "正確さ、文化、情熱をもって日本語を学ぶ。",

  // =========================
  // Hero / Auto-typer
  // =========================
  "Join our FREE 5-day crash course and start speaking Japanese with confidence.": "無料の5日間集中コースに参加して、自信を持って日本語を話しましょう。",
  "Register Now – Free Access": "今すぐ登録 – 無料アクセス",
  "students joined since 2017": "2017年以来参加した学生",


  // Fuji page
"Why Learn Japanese With Us?": "なぜ私たちと日本語を学ぶのか？",
"Unlock opportunities, connect with culture, and become a confident Japanese speaker.": "チャンスを広げ、文化とつながり、自信を持って日本語を話せるようになりましょう。",
  // =========================
  // Sensei Page
  // =========================
  "Meet Your Sensei": "先生に会いましょう",
  "こんにちは – Welcome!": "こんにちは – ようこそ！",
"I'm Yasmine Sensei, passionate about helping students discover the beauty of Japanese language and culture. Whether you're preparing for the JLPT or learning for fun, I guide students step-by-step with a clear and practical method.":
"私はヤスミン先生です。学生が日本語と日本文化の美しさを発見できるよう、情熱をもって指導しています。JLPTの準備中でも趣味で学ぶ方でも、わかりやすく実践的な方法で一歩ずつサポートします。",
  "“Theory + LOTS of practice 💪 — that’s how you succeed in Japanese.”": "「理論＋たくさんの練習 💪 — これが日本語で成功する方法です。」",
  "Years Teaching Experience": "指導経験年数",
  "Students Successfully Trained": "指導済みの学生",

  // =========================
  // About Page
  // =========================
  "About Fuji Japanese Coaching": "富士日本語コーチングについて",
  "Fuji Japanese Coaching was created to help students learn Japanese in a\nclear, practical, and motivating way. Our goal is to make Japanese\nlanguage learning accessible and enjoyable for everyone — whether\nyou are preparing for the JLPT or simply exploring Japanese culture.":
    "富士日本語コーチングは、学生がわかりやすく実践的に日本語を学べるように作られました。JLPTの準備中の方も、日本文化を楽しみながら学ぶ方も、すべての人に日本語学習を楽しく身近なものにすることを目標としています。",
  "With modern teaching techniques, immersive exercises, and real\ncommunication practice, students can quickly build confidence and\ndevelop real Japanese skills.":
    "最新の指導法、没入型の演習、実践的なコミュニケーション練習により、学生は自信を早くつけ、本物の日本語スキルを身につけることができます。",
  "Projects & Resources": "プロジェクト＆リソース",
  "N2 Students Magazine": "N2学生向けマガジン",
  "N3 Students Magazine": "N3学生向けマガジン",
  "N4 Students Magazine": "N4学生向けマガジン",
  "N5 Students Magazine": "N5学生向けマガジン",
  "Visit": "訪問",
  "View": "閲覧",
  "Learning Moments": "学習の瞬間",
  "Student Feedback": "学生のフィードバック",

  // =========================
  // Dojo Page
  // =========================
  "Other Japanese Programs": "その他の日本語プログラム",
  "JLPT Preparation": "JLPT対策",
  "Dojo designed to help you pass JLPT N5 – N1 successfully.": "JLPT N5〜N1合格を目指すコースです。",
  "Cultural Immersion": "文化体験",
  "Learn Japanese culture, etiquette, traditions, and communication skills.": "日本文化、マナー、伝統、コミュニケーションスキルを学びましょう。",
  "Scholarships & Competitions": "奨学金とコンテスト",
  "Opportunities for contests, training programs, and scholarships from Japanese institutions.": "日本の教育機関によるコンテスト、研修プログラム、奨学金の機会。",
  "Advanced Dojo": "上級コース",
  "Long-term Dojo for mastering advanced grammar, kanji, and real-life communication.": "上級文法、漢字、実践的なコミュニケーションを習得する長期コース。",
  "5-Day Free Japanese Crash Course": "5日間無料集中日本語コース",
  "Master the basics of Japanese and open doors to exciting opportunities!": "日本語の基礎を習得して、ワクワクするチャンスを広げましょう。",
  "Day 1": "1日目",
  "Introduction to Japanese": "日本語入門",
  "Learn: Japanese phonetics, Hiragana & Katakana, self-introduction.": "学ぶ: 日本語の発音、ひらがな・カタカナ、自己紹介。",
  "Activity: Introduce yourself in Japanese confidently!": "アクティビティ: 自信を持って日本語で自己紹介しましょう！",
  "Day 2": "2日目",
  "Build Your Vocabulary": "語彙力アップ",
  "Learn: Essential phrases for everyday conversation, first particles.": "学ぶ: 日常会話で使う基本フレーズ、最初の助詞。",
  "Activity: Practice 10 new sentences.": "アクティビティ: 新しい10文を練習しましょう。",
  "Day 3": "3日目",
  "Build Your Grammar Foundations": "文法基礎を築く",
  "Learn: Basic particles (は, が, を), simple sentence creation.": "学ぶ: 基本助詞（は、が、を）、簡単な文章作成。",
  "Activity: Write your first short essay in Japanese.": "アクティビティ: 日本語で最初の短文を書きましょう。",
  "Day 4": "4日目",
  "Speak with Confidence": "自信を持って話す",
  "Learn: Role-play common scenarios, cultural communication tips.": "学ぶ: 日常シーンのロールプレイ、文化的コミュニケーションのコツ。",
  "Activity: Record and share your role-play experience.": "アクティビティ: ロールプレイを録音して共有しましょう。",
  "Day 5": "5日目",
  "Listen Like a Pro": "プロのように聞く",
  "Learn: Practice listening to native Japanese audio, understand context & tone.": "学ぶ: ネイティブの音声を聞いて、文脈とイントネーションを理解しましょう。",
  "Activity: Share your progress and celebrate your new skills!": "アクティビティ: 学習成果を共有して、新しいスキルを祝福しましょう。",

  // =========================
  // Carousel / Cards
  // =========================
  "Be Special": "特別になろう",
  "Learning Japanese sets you apart! Fewer people master it, giving you unique opportunities.": "日本語を学ぶことで他の人と差をつけられます！習得する人は少なく、特別な機会が得られます。",
  "Japan Awaits": "日本が待っています",
  "Explore scholarships, contests, and training programs provided by Japanese institutions.": "日本の教育機関が提供する奨学金、コンテスト、研修プログラムを体験しましょう。",
  "Join a Global Community": "グローバルコミュニティに参加",
  "Connect with anime fans, gamers, and Japan enthusiasts worldwide.": "アニメファンやゲーマー、日本好きの人々と世界中でつながりましょう。",
  "Professional Growth": "キャリアの成長",
  "Boost your career prospects by mastering Japanese, a fast-growing global language.": "急成長中の国際言語である日本語を習得して、キャリアの可能性を広げましょう。",
  "Immersive Learning": "没入型学習",
  "Experience Japanese culture through interactive exercises and real practice.": "インタラクティブな演習や実践を通して日本文化を体験しましょう。"
};
const originalTexts = new Map();

function translatePage(toJapanese = true) {
  const elements = document.querySelectorAll("body *:not(script):not(style)");
  elements.forEach(el => {
    if (el.children.length === 0) {
      const text = el.textContent.trim();
      if (!text) return;

      if (!originalTexts.has(el)) originalTexts.set(el, text);

      if (toJapanese && translationMap[text]) el.textContent = translationMap[text];
      if (!toJapanese && originalTexts.has(el)) el.textContent = originalTexts.get(el);
    }
  });
}



// ============================================
// LANGUAGE BUTTON
// ============================================
function createLanguageBar() {
  if (document.getElementById("language-bar")) return;

  const button = document.createElement("button");
  button.id = "language-bar";
  button.textContent = "日本語 / English";

  Object.assign(button.style, {
    padding: "6px 14px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    border: "none",
    background: "#ff3c3c",
    color: "white",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    marginLeft: "20px"
  });

  button.addEventListener("mouseenter", () => {
    button.style.background = "#ff5c5c";
    button.style.transform = "scale(1.05)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.background = "#ff3c3c";
    button.style.transform = "scale(1)";
  });

  let translated = false;
  button.addEventListener("click", () => {
    translated = !translated;

    // Translate page text
    translatePage(translated);

    // Switch auto-typer phrases
    phrases = translated ? phrasesJP : phrasesEN;

    // Reset typing animation
    phraseIndex = 0;
    charIndex = 0;
    typing = true;

    // Stop previous timeout to avoid speeding up
    clearTimeout(typingTimeout);
    typeWriter();// ================================================
// AUTO-TYPER + TRANSLATION SYSTEM (Updated)
// ================================================

const phrasesEN = [
    "Join our FREE 5-day crash course and start speaking Japanese with confidence.",
    "Master Japanese basics quickly with expert guidance.",
    "Unlock Japanese culture and communication in just 5 days.",
    "Step into the world of Japanese language with ease."
];

const phrasesJP = [
    "無料の5日間集中コースに参加して、自信を持って日本語を話しましょう。",
    "専門家の指導で日本語の基礎をすばやく習得しましょう。",
    "わずか5日間で日本文化と言語を体験しましょう。",
    "やさしく日本語の世界へ踏み出しましょう。"
];

let phrases = phrasesEN;
let phraseIndex = 0;
let charIndex = 0;
let typing = true;
let typingTimeout;

const rotatingText = document.getElementById("rotating-text");

function typeWriter() {
    if (!rotatingText) return;
    const currentPhrase = phrases[phraseIndex];
    if (typing) {
        rotatingText.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            typing = false;
            typingTimeout = setTimeout(typeWriter, 1500);
            return;
        }
    } else {
        rotatingText.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typing = true;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    typingTimeout = setTimeout(typeWriter, typing ? 50 : 40);
}
typeWriter();

// ================================================
// TRANSLATION MAP (Complete for all HTML files)
// ================================================
const translationMap = {
    // Navigation
    "Fuji": "富士",
    "About": "私たちについて",
    "Dojo": "道場",
    "Sensei": "先生",
    "Book a lesson": "レッスン予約",

    // Branding & Footer
    "Fuji Japanese Coaching": "富士日本語コーチング",
    "Learning Japanese with precision, culture, and passion.": "正確さ、文化、情熱をもって日本語を学ぶ。",
    "Website developed by": "サイト制作：",

    // Index Page
    "Join our FREE 5-day crash course and start speaking Japanese with confidence.": "無料の5日間集中コースに参加して、自信を持って日本語を話しましょう。",
    "Register Now – Free Access": "今すぐ登録 – 無料アクセス",
    "Students joined": "参加学生数",
    "Years Experience": "経験年数",
    "Success Stories": "合格実績",
    "Why Learn With Us?": "なぜ私たちを選ぶのか？",
    "Be Special": "特別になろう",
    "Learning Japanese sets you apart from the crowd.": "日本語を学ぶことで、周囲に差をつけられます。",
    "Japan Awaits": "日本が待っています",
    "Explore scholarships and elite training programs.": "奨学金やエリート研修プログラムを探しましょう。",
    "Global Growth": "グローバルな成長",
    "Boost your career with a fast-growing global language.": "成長を続ける国際言語でキャリアを強化しましょう。",

    // Sensei Page
    "Meet Your Sensei": "先生に会いましょう",
    "こんにちは – Welcome!": "こんにちは – ようこそ！",
    "Teaching Years": "指導年数",
    "Students Trained": "指導学生数",

    // Dojo Page - Tracks
    "Specialized Japanese Tracks": "専門日本語コース",
    "JLPT Preparation": "JLPT対策",
    "Strategic coaching to master N5 through N1 levels with precision.": "N5からN1まで正確にマスターするための戦略的コーチング。",
    "Cultural Immersion": "文化体験",
    "Beyond language: learn etiquette, traditions, and the soul of Japan.": "言語を超えて、マナーや伝統、日本の心を感じましょう。",
    "Scholarships": "奨学金",
    "Guidance for contests and training programs from elite Japanese institutions.": "日本の教育機関によるコンテストや研修のガイダンス。",

    // Dojo Page - Events
    "2026 Event Calendar": "2026年イベントカレンダー",
    "Spring Welcome Party": "春の新入生歓迎会",
    "Language Exchange Camp": "言語交流キャンプ",
    "Bonenkai Party": "忘年会",
    "Get the Full Plan": "フルプランを入手",

    // Dojo Page - Timeline
    "5-Day Japanese Crash Course": "5日間日本語集中コース",
    "The Basics & Phonetics": "基礎と発音",
    "Essential Vocabulary": "必須語彙",
    "Grammar Foundations": "文法基礎",
    "Speaking Confidence": "スピーキングの自信",
    "Listening Mastery": "リスニングの習得",

    // About Page
    "About Fuji Japanese Coaching": "富士日本語について",
    "FJC Japanese": "富士日本語",
    "Learning Moments": "学習の記録",
    "Student Feedback": "学生の声",
    "Projects & Resources": "プロジェクトと教材"
};

const originalTexts = new Map();

function translatePage(toJapanese = true) {
    const elements = document.querySelectorAll("body *:not(script):not(style)");
    elements.forEach(el => {
        if (el.children.length === 0) {
            const text = el.textContent.trim();
            if (!text || text.length < 2) return;
            if (!originalTexts.has(el)) originalTexts.set(el, text);
            if (toJapanese && translationMap[text]) el.textContent = translationMap[text];
            else if (!toJapanese && originalTexts.has(el)) el.textContent = originalTexts.get(el);
        }
    });
}

function createLanguageBar() {
    if (document.getElementById("language-bar")) return;
    const button = document.createElement("button");
    button.id = "language-bar";
    button.textContent = "日本語 / EN";
    Object.assign(button.style, {
        padding: "8px 15px", background: "#ff3c3c", color: "white", 
        border: "none", borderRadius: "20px", cursor: "pointer", 
        fontWeight: "bold", marginLeft: "15px", fontSize: "12px"
    });

    let translated = false;
    button.addEventListener("click", () => {
        translated = !translated;
        translatePage(translated);
        phrases = translated ? phrasesJP : phrasesEN;
        phraseIndex = 0; charIndex = 0; typing = true;
        clearTimeout(typingTimeout);
        typeWriter();
    });

    const navbar = document.querySelector(".nav-links");
    if (navbar) navbar.appendChild(button);
}

document.addEventListener("DOMContentLoaded", createLanguageBar);
  });

  const navbar = document.querySelector(".navbar .nav-links");
  if (navbar) navbar.appendChild(button);
  else {
    button.style.position = "fixed";
    button.style.top = "15px";
    button.style.right = "20px";
    button.style.zIndex = "9999";
    document.body.appendChild(button);
  }
}

// Initialize language bar
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createLanguageBar);
} else {
  createLanguageBar();
}

// ==========================================