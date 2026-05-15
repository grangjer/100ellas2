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
    1: { title: "1. PROBLEM", list: ["Before evaluating any solution, you must understand the problem deeply and independently — not through the founder's lens alone. What structural, economic, or systemic forces have kept it unsolved? A real problem has evidence."], footer: "Ask: Who suffers most from this problem, and are they currently being served?  What is the cost of inaction? Do they impact your community?", fClass: "footer-1" },
    2: { title: "2. SOLUTION", list: ["A well-defined problem deserves a well-designed solution. Evaluate whether the solution is genuinely matched to the problem."], footer: "Ask: Is the solution directly addressing the root cause? Does the solution get more accessible as the company scales? Could this solution cause unintended harm?", fClass: "footer-2" },
   3: { title: "3. STRATEGY", list: ["A great solution in the wrong hands, aimed at the wrong market, is not investable."], footer: "Ask: Is the go-to-market reaching those who most need it? Does the team have the domain to execute? How will it sustain itself financially over time? What are the key risks to successful execution?", fClass: "footer-3" },
    4: { title: "4. DESIRED OUTCOME", list: ["Impact investing requires clarity about what success looks like — not just financially, but in the lives of the people the company is built to serve. Define this before you invest, not after."], footer:"Ask: How does the company define and measure impact?  What happens to the impact if the company is acquired?", fClass: "footer-4" },
    5: { title: "5. EVALUATE RESULTS", list: ["Due diligence does not end when you write the check. Post-investment evaluation is how you protect your capital, hold founders accountable, and learn what to look for in the next deal."], footer: "Ask: Is the company's impact trajectory moving in the right direction? Are the agreed impact metrics being tracked and reported?", fClass: "footer-5" }
};

const card = document.getElementById('info-card');
const cTitle = document.getElementById('card-title');
const cContent = document.getElementById('card-content');

let activeStep = null;

function showCard(step, event) {
  event.stopPropagation();

  // If clicking the same step, toggle it closed
  if (activeStep === step && card.classList.contains('active')) {
    hideCard();
    return;
  }

  activeStep = step;
  const data = contentData[step];

  cTitle.innerText = data.title;
  cTitle.style.color = `var(--step-${step})`;

  let listHtml = '<ul>';
  data.list.forEach(item => { listHtml += `<li>${item}</li>`; });
  listHtml += '</ul>';
  listHtml += `<div class="card-footer ${data.fClass}">${data.footer}</div>`;

  cContent.innerHTML = listHtml;

  // Position below the road, not next to the click
  card.style.left = '';
  card.style.top = '';
  card.style.position = 'relative';

  card.classList.add('active');

  // Smooth scroll to card
  setTimeout(() => {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

function hideCard() {
  card.classList.remove('active');
  activeStep = null;
}

document.addEventListener('click', (e) => {
  if (!card.contains(e.target)) hideCard();
});
