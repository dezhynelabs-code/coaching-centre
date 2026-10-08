/**
 * VIJETHA STUDY CIRCLE - INTERACTIVE ENGINE
 * Handcrafted with modular architecture and zero dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initCourseFilters();
  initExamCalculator();
  initMiniQuiz();
  initFaqAccordion();
  initScrollTop();
  initModalAndForms();
});

/* ---------------------------------------------------------
   1. Theme Toggle (Light / Dark)
   --------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  
  const savedTheme = localStorage.getItem('vsc-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('vsc-theme', newTheme);
      updateThemeIcons(newTheme);
    });
  }

  function updateThemeIcons(theme) {
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }
}

/* ---------------------------------------------------------
   2. Header Scroll Effects
   --------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  }, { passive: true });
}

/* ---------------------------------------------------------
   3. Mobile Navigation Menu
   --------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on navigation link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        toggleBtn.setAttribute('aria-expanded', false);
      });
    });
  }
}

/* ---------------------------------------------------------
   4. Course Category Filtering
   --------------------------------------------------------- */
function initCourseFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---------------------------------------------------------
   5. Interactive Exam Calculator & Eligibility Guide
   --------------------------------------------------------- */
const examData = {
  tspsc_group1: {
    name: 'TGPSC / TSPSC Group 1 (Gazetted Officers)',
    ageLimit: '18 - 46 Years (Relaxations as per TS Govt Rules)',
    minQual: 'Any Degree / Graduation',
    pattern: 'Prelims (150 Marks) + Mains (6 Papers, 900 Marks)',
    highlights: 'Deputy Collector, DSP, Commercial Tax Officer, RDO',
    recommendedBatch: 'Super 50 Intensive 9-Month Integrated Batch'
  },
  tspsc_group2: {
    name: 'TSPSC Group 2 (Executive Posts)',
    ageLimit: '18 - 44 Years (Standard state relaxation applies)',
    minQual: 'Bachelor’s Degree in any discipline',
    pattern: 'Objective Examination (4 Papers, 600 Marks Total)',
    highlights: 'ACTO, Naib Tahsildar, Sub-Registrar, Municipal Commissioner',
    recommendedBatch: 'Target 600 Batch (Morning & Evening Regular)'
  },
  tspsc_group4: {
    name: 'TSPSC Group 4 (Junior Assistant / Typist)',
    ageLimit: '18 - 44 Years',
    minQual: 'Degree / Graduation with Computer Proficiency',
    pattern: 'Paper 1 (GS: 150 Qs) + Paper 2 (Secretarial: 150 Qs)',
    highlights: 'Junior Assistant in Revenue, Treasury, & Secretariat',
    recommendedBatch: '100-Day Crash Course & Grand Test Series'
  },
  police_si: {
    name: 'Telangana Police SI & Constable',
    ageLimit: '21 - 25 Years (Relaxed up to 30 for TS quota)',
    minQual: 'Degree for SI, Intermediate (10+2) for Constable',
    pattern: 'Prelims Test + Physical PMT/PET + Final Written (4 Papers)',
    highlights: 'Physical Ground Training + Rigorous Reasoning & Arithmetic',
    recommendedBatch: 'Mission Police Khaki Batch (Theory + Ground Training)'
  },
  dsc_sgt: {
    name: 'Telangana DSC / TRT & SGT (Teachers Recruitment)',
    ageLimit: '18 - 46 Years',
    minQual: 'D.Ed / B.Ed + TET Qualified',
    pattern: 'State Teacher Recruitment Test (80 Marks TRT + 20% TET Weightage)',
    highlights: 'School Assistant, SGT, Language Pandit across Telangana',
    recommendedBatch: 'Vijetha Special DSC Rankers Mentorship'
  },
  ssc_rrb: {
    name: 'SSC CGL / CHSL & RRB NTPC (Central Government)',
    ageLimit: '18 - 32 Years (Exam-specific categories)',
    minQual: '12th / Degree based on Tier',
    pattern: 'CBT Tier-I + Tier-II (Maths, English, Reasoning, GS)',
    highlights: 'Income Tax Inspector, ASO, Station Master, Railways Clerk',
    recommendedBatch: 'Central Exams Bilingual Foundation Batch'
  }
};

function initExamCalculator() {
  const examSelect = document.getElementById('calc-target-exam');
  const qualSelect = document.getElementById('calc-qualification');
  const ageInput = document.getElementById('calc-age');
  const checkBtn = document.getElementById('calc-submit-btn');

  const titleEl = document.getElementById('calc-res-title');
  const badgeEl = document.getElementById('calc-res-badge');
  const patternEl = document.getElementById('calc-res-pattern');
  const ageLimitEl = document.getElementById('calc-res-age');
  const batchEl = document.getElementById('calc-res-batch');
  const postsEl = document.getElementById('calc-res-posts');

  if (checkBtn) {
    checkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const examKey = examSelect.value;
      const age = parseInt(ageInput.value, 10) || 24;
      const data = examData[examKey] || examData.tspsc_group2;

      titleEl.textContent = data.name;
      patternEl.textContent = data.pattern;
      ageLimitEl.textContent = data.ageLimit;
      batchEl.textContent = data.recommendedBatch;
      postsEl.textContent = data.highlights;

      if (age < 18 || age > 46) {
        badgeEl.textContent = 'Check Specific Age Relaxation';
        badgeEl.style.backgroundColor = 'rgba(234, 88, 12, 0.15)';
        badgeEl.style.color = '#EA580C';
      } else {
        badgeEl.textContent = 'High Eligibility Match';
        badgeEl.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        badgeEl.style.color = '#059669';
      }

      showToast(`Profile evaluated for ${data.name}!`);
    });
  }
}

/* ---------------------------------------------------------
   6. Interactive Mini Practice Quiz Widget
   --------------------------------------------------------- */
const quizQuestions = [
  {
    question: "1. Who was the founder of the Kakatiya Dynasty's sovereign rule from Orugallu (Warangal)?",
    options: [
      { text: "Beta I", correct: false },
      { text: "Prolaraja II", correct: true },
      { text: "Prataparudra I (Rudradeva)", correct: false },
      { text: "Ganapati Deva", correct: false }
    ],
    explanation: "Prolaraja II declared independence from Western Chalukyas, and his son Rudradeva made Orugallu the prominent capital."
  },
  {
    question: "2. If a train 150m long crosses a telephone pole in 9 seconds, what is its speed in km/h?",
    options: [
      { text: "50 km/h", correct: false },
      { text: "60 km/h", correct: true },
      { text: "54 km/h", correct: false },
      { text: "72 km/h", correct: false }
    ],
    explanation: "Speed = Distance / Time = 150 / 9 m/s = (150/9) * (18/5) = 30 * 2 = 60 km/h."
  },
  {
    question: "3. Under which Article of the Indian Constitution is the Public Service Commission for the States established?",
    options: [
      { text: "Article 280", correct: false },
      { text: "Article 315", correct: true },
      { text: "Article 324", correct: false },
      { text: "Article 356", correct: false }
    ],
    explanation: "Article 315 provides for the creation of Union Public Service Commission (UPSC) and State Public Service Commissions (like TGPSC/TSPSC)."
  }
];

let currentQuizIdx = 0;
let quizScore = 0;

function initMiniQuiz() {
  const qTitle = document.getElementById('quiz-question-title');
  const qOptionsContainer = document.getElementById('quiz-options-container');
  const qFeedback = document.getElementById('quiz-feedback');
  const qStep = document.getElementById('quiz-step-indicator');
  const nextBtn = document.getElementById('quiz-next-btn');
  const resetBtn = document.getElementById('quiz-reset-btn');

  function renderQuestion(idx) {
    if (!qTitle || !qOptionsContainer) return;
    const item = quizQuestions[idx];
    qTitle.textContent = item.question;
    qStep.textContent = `Question ${idx + 1} of ${quizQuestions.length}`;
    qOptionsContainer.innerHTML = '';
    qFeedback.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    item.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.type = 'button';
      btn.innerHTML = `<span>${opt.text}</span> <span class="opt-status"></span>`;
      btn.addEventListener('click', () => handleOptionSelect(btn, opt, item));
      qOptionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelect(selectedBtn, option, item) {
    const allBtns = qOptionsContainer.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (option.correct) {
      selectedBtn.classList.add('correct');
      quizScore++;
      qFeedback.style.display = 'block';
      qFeedback.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
      qFeedback.style.color = '#065F46';
      qFeedback.innerHTML = `<strong>Correct Answer!</strong> ${item.explanation}`;
    } else {
      selectedBtn.classList.add('wrong');
      allBtns.forEach((b, i) => {
        if (item.options[i].correct) b.classList.add('correct');
      });
      qFeedback.style.display = 'block';
      qFeedback.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
      qFeedback.style.color = '#991B1B';
      qFeedback.innerHTML = `<strong>Incorrect.</strong> ${item.explanation}`;
    }

    if (currentQuizIdx < quizQuestions.length - 1) {
      if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = 'Next Question →';
      }
    } else {
      if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = `Finish Quiz (Score: ${quizScore}/${quizQuestions.length})`;
      }
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuizIdx < quizQuestions.length - 1) {
        currentQuizIdx++;
        renderQuestion(currentQuizIdx);
      } else {
        qTitle.textContent = `Quiz Completed! Your Score: ${quizScore} / ${quizQuestions.length}`;
        qOptionsContainer.innerHTML = `
          <div style="text-align:center; padding: 2rem 1rem;">
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: var(--text-main);">
              ${quizScore === 3 ? 'Outstanding! You have strong competitive aptitude.' : 'Great effort! Join Vijetha Study Circle to sharpen your speed and accuracy.'}
            </p>
            <button class="btn btn-primary" onclick="openDemoModal('Demo Mock Test')">Enroll For Full Grand Test Series</button>
          </div>
        `;
        qFeedback.style.display = 'none';
        nextBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentQuizIdx = 0;
      quizScore = 0;
      resetBtn.style.display = 'none';
      renderQuestion(0);
    });
  }

  // Initial render
  renderQuestion(0);
}

/* ---------------------------------------------------------
   7. FAQ Accordion
   --------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ---------------------------------------------------------
   8. Scroll To Top
   --------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   9. Modal & Form Handling
   --------------------------------------------------------- */
function initModalAndForms() {
  const modalBackdrop = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalForm = document.getElementById('demo-modal-form');
  const heroForm = document.getElementById('hero-booking-form');

  window.openDemoModal = function(courseName = 'TSPSC Group-II Regular Batch') {
    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      const courseInput = document.getElementById('modal-course-input');
      if (courseInput && courseName) {
        courseInput.value = courseName;
      }
    }
  };

  window.closeDemoModal = function() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
    }
  };

  closeBtn?.addEventListener('click', window.closeDemoModal);

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      window.closeDemoModal();
    }
  });

  // Modal Form Submit
  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modal-name')?.value || 'Student';
    const phone = document.getElementById('modal-phone')?.value;
    const course = document.getElementById('modal-course-input')?.value;

    window.closeDemoModal();
    modalForm.reset();
    showToast(`Thank you, ${name}! Your free demo pass for ${course} has been reserved. Our admissions desk will call ${phone} shortly.`);
  });

  // Hero Mini Form Submit
  heroForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('hero-name')?.value || 'Student';
    const phone = document.getElementById('hero-phone')?.value;
    const course = document.getElementById('hero-course')?.value;

    heroForm.reset();
    showToast(`Seat reserved for ${name}! We will contact you at ${phone} with batch details for ${course}.`);
  });
}

/* ---------------------------------------------------------
   10. Toast Notification Helper
   --------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
