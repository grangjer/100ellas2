document.addEventListener('DOMContentLoaded', () => {

    // --- Cookie Banner --- //
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
  
    if (banner) {
      const cookieChoice = localStorage.getItem('cookieConsent');
  
      if (cookieChoice) {
        banner.classList.add('hidden');
      }
  
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.add('hidden');
      });
  
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.classList.add('hidden');
      });
    }
  
    // --- Contact Form ---
    const form = document.getElementById('contact-form');
    const thanksMessage = document.getElementById('thanks-message');
  
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          form.style.display = 'none';
          thanksMessage.style.display = 'block';
        } else {
          alert("Oops! There was a problem submitting your form. Please try again.");
        }
      });
    }
  
    // --- Hamburger Menu --- //
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
  
    if (btn && menu) {
      btn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
      });
    }
  
  });

      // --- ROADMAP --- //

  const contentData = {
    1: { title: "1. PROBLEM", list: ["What is the real problem?", "Who is most affected?", "Why has it persisted?"], footer: "Look for evidence, not assumptions. A real problem has data behind it.", fClass: "footer-1" },
    2: { title: "2. SOLUTION", list: ["Does it address root cause?", "Who tried before — and why did they fail?", "Could it cause unintended harm?"], footer: "Good solutions are relevant, differentiated, and get more accessible as they scale — not less.", fClass: "footer-2" },
    3: { title: "3. STRATEGY", list: ["Is the go-to-market reaching those who most need it?", "Does the team have the domain to execute?", "How will it sustain itself financially over time?", "What are the key risks to successful execution?"], footer: "A great solution in the wrong hands, aimed at the wrong market, is not investable.", fClass: "footer-3" },
    4: { title: "4. DESIRED OUTCOME", list: ["What change will this create?", "Would this outcome happen without this company?", "What if the company is acquired?"], footer: "Define impact before you invest — in the beneficiary's words, not the founder's.", fClass: "footer-4" },
    5: { title: "5. EVALUATE RESULTS", list: ["Is impact trajectory moving in the right direction?", "Has the beneficiary population drifted?", "What did this teach you for the next deal?"], footer: "Track what matters. Learn. Adapt. Your portfolio is an evidence base, not just a ledger.", fClass: "footer-5" }
};

const card = document.getElementById('info-card');
const cTitle = document.getElementById('card-title');
const cContent = document.getElementById('card-content');

function showCard(step, event) {
    event.stopPropagation();
    const data = contentData[step];
    
    cTitle.innerText = data.title;
    cTitle.style.color = `var(--step-${step})`;

    let listHtml = '<ul>';
    data.list.forEach(item => { listHtml += `<li>${item}</li>`; });
    listHtml += '</ul>';
    listHtml += `<div class="card-footer ${data.fClass}">${data.footer}</div>`;
    
    cContent.innerHTML = listHtml;

    const rect = event.currentTarget.getBoundingClientRect();
    const wrapperRect = document.querySelector('.roadmap-wrapper').getBoundingClientRect();
    
    card.style.left = (rect.left - wrapperRect.left) + "px";
    card.style.top = (rect.top - wrapperRect.top + 60) + "px";

    card.classList.add('active');
}

function hideCard() { card.classList.remove('active'); }
document.addEventListener('click', (e) => { if (!card.contains(e.target)) hideCard(); });