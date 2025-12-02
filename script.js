// script.js — Max Stability Fix V2 (CLEANED – NO PICSUM)

(() => {
  // DOM Elements
  const grid = document.getElementById('grid');
  const filters = Array.from(document.querySelectorAll('.filter'));
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinks = document.getElementById('modalLinks');
  const modalClose = document.getElementById('modalClose');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const yearEl = document.getElementById('year');
  const countFigmaEl = document.getElementById('count-figma');
  const countPostsEl = document.getElementById('count-posts');
  const countEcomEl = document.getElementById('count-ecom');
  const scrollOffset = 70;

  // DATA
  const figmaItems = [
    { img: "images/figma/aadhi_cover.png", link:"https://www.figma.com/proto/1EKTKzCY5sBUuT6aFSovf6/Aadhi-Cottage?node-id=1-2", title:"AADHI COTTAGE Web", desc:"Minimal cottage booking UI — soft palette, clear booking flow." },
    { img: "images/figma/veyil_cover.png", link:"https://www.figma.com/make/VWuwq0FxmHNHazOc3putQB/Veyil-Solutions?node-id=0-1", title:"VEYIL SOLUTIONS Web", desc:"A simple site with our service details and a contact form for eCommerce projects." },
    { img: "images/figma/cttae_cover.png", link:"https://www.figma.com/proto/RBUhrd3WwthsTwMAKVgx4J/CTTAE-FINAL?node-id=9-456", title:"CTTAE PLATFORM Web", desc:"Channel Tower Trading manages electrical installs for camera surveillance." },
    { img: "images/figma/hse_cover.png", link:"https://www.figma.com/proto/uxBDLCB2GZgXjCofk63VhS/HSE?node-id=6-3", title:"HSE PORTAL Web", desc:"HSE-MS is a port-focused Health, Safety, and Environment management system." },
    { img: "images/figma/cable_cover.png", link:"https://www.figma.com/proto/jUiCuGTSb1396esKGIcas7/Untitled?node-id=14-97", title:"DAYA SAT VISION Mobile", desc:"A system to track monthly cable TV and internet payments from customers." },
    { img: "images/figma/mgame_cover.png", link:"https://www.figma.com/proto/pUfgXuFtzZIXDcRSvCAFgI/Untitled?node-id=4-80", title:"MERLION GAMES Mobile", desc:"A system built to record game sessions, track playtime, and manage payments." }
  ];

  const instaItems = [
    { img: "images/insta/insta1.png" },
    { img: "images/insta/insta2.png" }, { img: "images/insta/insta3.png" }, { img: "images/insta/insta4.png" }, { img: "images/insta/insta5.png" },
    { img: "images/insta/insta6.png" }, { img: "images/insta/insta7.png" }, { img: "images/insta/insta8.png" }, { img: "images/insta/insta9.png" },
    { img: "images/insta/insta10.png" }, { img: "images/insta/insta11.png" }, { img: "images/insta/insta12.png" }, { img: "images/insta/insta13.png" },
    { img: "images/insta/insta14.png" }, { img: "images/insta/insta15.png" }, { img: "images/insta/insta16.png" }, { img: "images/insta/insta17.png" },
    { img: "images/insta/insta18.png" }, { img: "images/insta/insta19.png" }, { img: "images/insta/insta20.webp" }, { img: "images/insta/insta21.webp" }
  ];

  const shopifyItems = [
    { img: "images/other/leader_cover.png", link:"https://leaderclothings.in", title:"Leader Clothings", desc:"E-commerce store with custom theme & checkout improvements." }
  ];

  // Convert to unified items array (NO PICSUM fallback)
  const items = [];
  figmaItems.forEach((it, idx) => items.push({
    id:`figma-${idx+1}`,
    category:'figma',
    title:it.title,
    desc:it.desc,
    img:it.img,
    linksHtml: it.link ? `<a href="${it.link}" target="_blank" rel="noopener" class="btn-primary">Open Figma</a>` : ''
  }));

  instaItems.forEach((it, idx) => items.push({
    id:`insta-${idx+1}`,
    category:'posts',
    title:`Graphic Design ${idx+1}`,
    desc:'Social Media creations',
    img:it.img,
    linksHtml: it.link ? `<a href="${it.link}" target="_blank" rel="noopener" class="btn-primary">View on Instagram</a>` : ''
  }));

  shopifyItems.forEach((it, idx) => items.push({
    id:`shop-${idx+1}`,
    category:'shopify',
    title:it.title,
    desc:it.desc,
    img:it.img,
    linksHtml: it.link ? `<a href="${it.link}" target="_blank" rel="noopener" class="btn-primary">View Store</a>` : ''
  }));

  /* Helpers */
  function el(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k,v])=>{
      if(k==='class') n.className=v;
      else if(k.startsWith('data-')) n.setAttribute(k,v);
      else n[k]=v;
    });
    children.forEach(c=>n.appendChild(c));
    return n;
  }

  /* Reveal on scroll */
  const revealObserver = (() => {
    const elementsToHide = document.querySelectorAll('.reveal, .card');
    setTimeout(() => {
      elementsToHide.forEach(el => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('js-hidden');
        }
      });
    }, 10);

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.remove('js-hidden');
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.1});

    return {
      observeAll(){
        elementsToHide.forEach(el=>{
          if(!el.classList.contains('revealed')) io.observe(el);
        });
      },
    };
  })();

  /* Render grid */
  function renderList(list){
    if (!grid) return;
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    list.forEach((item, index) => {
      const card = el('article',{class:'card', tabIndex:0});
      card.style.transitionDelay = `${index * 80}ms`;

      const media = el('div',{class:'card-media'});
      const img = el('img',{src:item.img,alt:item.title,loading:'lazy',decoding:'async'});
      media.appendChild(img);

      const body = el('div',{class:'card-body'});
      const h3 = el('h3',{},[document.createTextNode(item.title)]);
      const p = el('p',{},[document.createTextNode(item.desc)]);
      body.appendChild(h3); body.appendChild(p);

      card.appendChild(media); 
      card.appendChild(body);

      card.addEventListener('click',()=>openModal(item));
      card.addEventListener('keydown',(e)=>{ if(e.key==='Enter') openModal(item); });

      frag.appendChild(card);
    });
    grid.appendChild(frag);
    revealObserver.observeAll();
  }

  /* Modal */
  let lastFocus = null;
  function openModal(item){
    modal.setAttribute('aria-hidden','false');
    modalImg.src = item.img;
    modalImg.alt = item.title;
    modalTitle.textContent = item.title;
    modalDesc.innerHTML = `<p>${item.desc}</p>`;
    modalLinks.innerHTML = item.linksHtml || '';
    lastFocus = document.activeElement;
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Initial render
  renderList(items);

  /* Filtering */
  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');

      const f = btn.dataset.filter;
      const filteredList = (!f || f==='all') ? items : items.filter(i=>i.category===f);

      setTimeout(() => {
        renderList(filteredList);
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
          window.scrollTo({top: portfolioSection.offsetTop - scrollOffset, behavior:'smooth'});
        }
      }, 50);
    });
  });

  /* Modal listeners */
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal();
  });

  /* Mobile menu */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', ()=>{
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      if(open){ 
        mobileMenu.hidden = true; 
        mobileMenu.setAttribute('aria-hidden','true'); 
      } else { 
        mobileMenu.hidden = false; 
        mobileMenu.setAttribute('aria-hidden','false'); 
      }
    });

    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
      mobileMenu.hidden=true; 
      hamburger.setAttribute('aria-expanded','false');
    }));
  }

  revealObserver.observeAll();

  /* Magnetic buttons */
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove', (e)=>{
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height;
      btn.style.transform = `translate3d(${dx*15}px, ${dy*10}px, 0)`;
    });
    btn.addEventListener('mouseleave', ()=> btn.style.transform = '');
  });

  /* Counters */
  if (countFigmaEl) countFigmaEl.textContent = figmaItems.length;
  if (countPostsEl) countPostsEl.textContent = instaItems.length;
  if (countEcomEl) countEcomEl.textContent = shopifyItems.length;

  /* Copy URL buttons */
  document.querySelectorAll('.copy').forEach(button => {
    button.addEventListener('click', (e) => {
      const url = e.currentTarget.dataset.url;
      navigator.clipboard.writeText(url).then(() => {
        const originalText = e.currentTarget.textContent;
        e.currentTarget.textContent = 'Copied!';
        setTimeout(() => {
          e.currentTarget.textContent = originalText;
        }, 1500);
      });
    });
  });

  /* Utilities */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Tab') document.body.classList.add('user-is-tabbing');
  });

})();
