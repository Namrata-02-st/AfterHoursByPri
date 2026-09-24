document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile nav toggle */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

/* Accordion — services */
document.querySelectorAll('.acc-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.acc-item');
    const wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('is-open'));
    if (!wasOpen) item.classList.add('is-open');
  });
});

/* Video lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src){
  lightboxVideo.src = src;
  lightbox.classList.add('is-active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxVideo.play().catch(()=>{});
}
function closeLightbox(){
  lightbox.classList.remove('is-active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.load();
}
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card.dataset.video));
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeLightbox(); closeBlogModal(); } });

/* Blog article modal */
const articles = {
  'branding-matters': {
    cat: 'Branding',
    title: 'Why Strong Branding Matters in a Digital World',
    body: `
      <p>Every business is competing for the same thing: a second of someone's attention on a screen that never stops scrolling. In that second, a customer isn't reading your mission statement — they're forming an impression, instantly and instinctively.</p>
      <p>Strong branding is what decides that impression before a single word is read. A consistent colour palette, a recognizable tone of voice, a logo that shows up the same way everywhere — these aren't decoration. They're the shortcuts a brain uses to file a business away as familiar, trustworthy, worth a second look.</p>
      <p>Businesses without that consistency pay for it in a quieter way than a bad review ever could: they simply get forgotten. A post here, an ad there, a website that looks like it belongs to someone else entirely — none of it adds up to anything a customer can hold onto.</p>
      <p>Branding done well compounds. Every touchpoint — a Reel, a delivery box, a WhatsApp reply — becomes one more repetition of the same signal, until recognition happens before recall does. That's the actual goal: not to be seen once, but to be remembered without effort.</p>
    `
  },
  'seo-vs-paid': {
    cat: 'SEO & Advertising',
    title: 'SEO vs Paid Advertising: Understanding Digital Growth',
    body: `
      <p>The question isn't really which one works. Both do — they just work on different timelines, and for different jobs.</p>
      <p>Paid advertising is immediate. Launch a campaign this morning, and by evening you have traffic, enquiries, maybe a sale. It's the right tool when you need visibility now: a launch, a festive sale, a limited window that can't wait for organic growth to catch up.</p>
      <p>SEO plays a longer game. It's the slow work of making sure that when someone searches for what you offer — not your brand name, but the actual need — your website is the one that shows up. It takes months to build, but unlike an ad, it doesn't switch off the moment the budget does.</p>
      <p>The brands that grow fastest rarely choose one over the other. They run paid campaigns to generate momentum today, while SEO quietly builds a foundation that keeps paying off long after that campaign has ended. Used together, one buys time for the other to work.</p>
    `
  },
  'website-works': {
    cat: 'Web Development',
    title: 'What Makes a Website Actually Work?',
    body: `
      <p>A website can be visually stunning and still fail at the one thing it exists to do: move a visitor to act. Looking good and working well are related, but they are not the same job.</p>
      <p>A website that works is fast — because every extra second before a page loads is a visitor who's already gone. It's clear about what a business does within the first few seconds, without making anyone scroll to figure it out. And it makes the next step obvious: a visible way to enquire, call, or buy, not buried three menus deep.</p>
      <p>It also has to work on the device most people actually use — a phone, usually with one thumb, on the move. A layout that only looks intentional on a desktop monitor is, for most visitors, simply broken.</p>
      <p>The best websites don't ask visitors to work for the information they came for. They hand it over, then get out of the way.</p>
    `
  }
};

const blogModal = document.getElementById('blogModal');
const blogModalCat = document.getElementById('blogModalCat');
const blogModalTitle = document.getElementById('blogModalTitle');
const blogModalBody = document.getElementById('blogModalBody');
const blogModalClose = document.getElementById('blogModalClose');

function openBlogModal(id){
  const a = articles[id];
  if(!a) return;
  blogModalCat.textContent = a.cat;
  blogModalTitle.textContent = a.title;
  blogModalBody.innerHTML = a.body;
  blogModal.classList.add('is-active');
  blogModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeBlogModal(){
  blogModal.classList.remove('is-active');
  blogModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => openBlogModal(btn.dataset.article));
});
blogModalClose.addEventListener('click', closeBlogModal);
blogModal.addEventListener('click', (e) => { if (e.target === blogModal) closeBlogModal(); });

/* Contact form -> WhatsApp */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  const text = `Hi AfterHours By Pri! I'm ${name} (${phone}).\n\n${msg}`;
  const url = `https://wa.me/918238825140?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
});

/* Sticky nav background on scroll */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(58,40,27,0.08)' : 'none';
}, { passive: true });
