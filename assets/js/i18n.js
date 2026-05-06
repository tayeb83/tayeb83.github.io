/* ===== Arabic / French Language Switcher =====
 * - Auto-detects Arabic browser locale or Arabic-region timezone
 * - Respects user preference stored in localStorage
 * - Toggles RTL layout and shows/hides translated content blocks
 * - Translates navigation links and author sidebar
 */

(function () {
  'use strict';

  var ARABIC_LANG_CODES = [
    'ar','ar-SA','ar-EG','ar-DZ','ar-MA','ar-TN','ar-LY','ar-SD',
    'ar-IQ','ar-SY','ar-LB','ar-JO','ar-KW','ar-AE','ar-QA',
    'ar-BH','ar-OM','ar-YE','ar-MR','ar-PS','ar-SO','ar-DJ','ar-KM'
  ];

  var ARABIC_TIMEZONES = [
    'Asia/Riyadh','Asia/Kuwait','Asia/Qatar','Asia/Bahrain','Asia/Dubai',
    'Asia/Muscat','Asia/Aden','Asia/Baghdad','Asia/Damascus','Asia/Beirut',
    'Asia/Amman','Asia/Gaza','Asia/Hebron','Africa/Cairo','Africa/Tripoli',
    'Africa/Tunis','Africa/Algiers','Africa/Casablanca','Africa/Khartoum',
    'Africa/Mogadishu','Africa/Djibouti','Indian/Comoro'
  ];

  var NAV_TRANSLATIONS = {
    '/':              { fr: 'À propos',   ar: 'حول' },
    '/projects/':     { fr: 'Projets',    ar: 'المشاريع' },
    '/publications/': { fr: 'Publications', ar: 'المنشورات' },
    '/teaching/':     { fr: 'Enseignement', ar: 'التدريس' }
  };

  var PAGE_TITLES = {
    '/':              { fr: 'Tayeb Merabti, PhD', ar: 'طيب مرابطي، دكتوراه' },
    '/projects/':     { fr: 'Projets',    ar: 'المشاريع' },
    '/publications/': { fr: 'Publications', ar: 'المنشورات' },
    '/teaching/':     { fr: 'Enseignement', ar: 'التدريس' }
  };

  var AUTHOR_BIO = {
    fr: 'Responsable Plateforme Terminologie &amp; Interopérabilité Santé · <strong>VIDAL</strong><br>SNOMED CT · FHIR · UMLS · Web Sémantique',
    ar: 'مسؤول منصة المصطلحات وقابلية التشغيل البيني الصحي · <strong>VIDAL</strong><br>SNOMED CT · FHIR · UMLS · الويب الدلالي'
  };

  function detectArabicLocale() {
    var langs = (navigator.languages && navigator.languages.length)
      ? Array.from(navigator.languages)
      : [navigator.language || navigator.userLanguage || ''];
    return langs.some(function (l) {
      return ARABIC_LANG_CODES.some(function (a) {
        return l.toLowerCase().startsWith(a.toLowerCase());
      });
    });
  }

  function detectArabicTimezone() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return ARABIC_TIMEZONES.indexOf(tz) !== -1;
    } catch (e) {
      return false;
    }
  }

  function getCurrentLang() {
    var stored = localStorage.getItem('site-lang');
    if (stored === 'ar' || stored === 'fr') return stored;
    return (detectArabicLocale() || detectArabicTimezone()) ? 'ar' : 'fr';
  }

  function applyLanguage(lang) {
    localStorage.setItem('site-lang', lang);

    /* Document direction */
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    /* Show / hide translated content blocks */
    document.querySelectorAll('.lang-fr').forEach(function (el) {
      el.style.display = lang === 'fr' ? '' : 'none';
    });
    document.querySelectorAll('.lang-ar').forEach(function (el) {
      el.style.display = lang === 'ar' ? '' : 'none';
    });

    /* Navigation links */
    document.querySelectorAll('.greedy-nav a, .visible-links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && NAV_TRANSLATIONS[href]) {
        a.textContent = NAV_TRANSLATIONS[href][lang];
      }
    });

    /* Page heading (h1.page__title) */
    var path = window.location.pathname.replace(/\/?$/, '/');
    if (path === '//') path = '/';
    var h1 = document.querySelector('h1.page__title');
    if (h1 && PAGE_TITLES[path]) {
      h1.textContent = PAGE_TITLES[path][lang];
    }

    /* Author sidebar bio */
    var bio = document.querySelector('.author__bio');
    if (bio) {
      bio.innerHTML = AUTHOR_BIO[lang];
    }

    /* Switcher button label */
    var btn = document.getElementById('lang-switcher');
    if (btn) {
      btn.textContent = lang === 'ar' ? 'FR' : 'عربي';
      btn.title = lang === 'ar' ? 'Passer en français' : 'التبديل إلى العربية';
    }
  }

  function addSwitcherButton() {
    var nav = document.querySelector('.greedy-nav');
    if (!nav || document.getElementById('lang-switcher')) return;

    var btn = document.createElement('button');
    btn.id = 'lang-switcher';
    btn.className = 'lang-switcher-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Switch language');

    btn.addEventListener('click', function () {
      var next = getCurrentLang() === 'ar' ? 'fr' : 'ar';
      applyLanguage(next);
    });

    /* Insert before the hamburger toggle (or at end of nav) */
    var toggle = nav.querySelector('.greedy-nav__toggle');
    if (toggle) {
      nav.insertBefore(btn, toggle);
    } else {
      nav.appendChild(btn);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    addSwitcherButton();
    applyLanguage(getCurrentLang());
  });
})();
