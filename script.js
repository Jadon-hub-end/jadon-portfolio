const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav, .cinema-header nav, .inner-header nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const filters = document.querySelectorAll('.work-filters button');
const cards = document.querySelectorAll('[data-type]');
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  cards.forEach(card => card.classList.toggle('hidden', filter.dataset.filter !== 'all' && card.dataset.type !== filter.dataset.filter));
}));

// Portfolio previews only play while the visitor is hovering a card.
document.querySelectorAll('.film-card').forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;
  card.addEventListener('pointerenter', () => video.play().catch(() => {}));
  card.addEventListener('pointerleave', () => {
    video.pause();
    video.currentTime = 0;
  });
  card.addEventListener('focusin', () => video.play().catch(() => {}));
  card.addEventListener('focusout', () => video.pause());
});

const projects = {
  toilet:{title:'新月马桶 / 三维产品视频',category:'BATHROOM FILM',description:'以产品结构、流动光影与使用情境为重点的卫浴产品三维影片。',video:'assets/videos/bathroom-toilet.mp4',poster:'assets/works/p1.jpg',index:'01 / 08'},
  tubler:{title:'Tubler / 卫浴产品影片',category:'PRODUCT FILM',description:'通过镜头运动与空间氛围呈现产品质感和功能表达。',video:'assets/videos/bathroom-tubler.mp4',poster:'assets/works/p2.jpg',index:'02 / 08'},
  bosco:{title:'BOSCO / 品牌动态视觉',category:'BRAND FILM',description:'围绕品牌感知与产品形象打造的三维动态视觉内容。',video:'assets/videos/brand-bosco.mp4',poster:'assets/works/x1.jpg',index:'03 / 08'},
  qsj:{title:'商业产品 / 品牌影像',category:'COMMERCIAL FILM',description:'将产品卖点与视觉节奏融合的商业三维广告影片。',video:'assets/videos/brand-qsj.mp4',poster:'assets/works/c1.jpg',index:'04 / 08'},
  oppo:{title:'OPPO / 产品广告片',category:'PRODUCT CAMPAIGN',description:'以科技产品的形态、细节和速度感为核心的视觉广告。',video:'assets/videos/brand-oppo.mp4',poster:'assets/works/c.jpg',index:'05 / 08'},
  appliance:{title:'家电产品 / 三维视觉影片',category:'APPLIANCE FILM',description:'从产品细节到整体场景，用动态三维视觉强化家电产品体验。',video:'assets/videos/appliance-2024.mp4',poster:'assets/works/01.jpg',index:'06 / 08'},
  mix:{title:'商业视觉 / 动态影像',category:'BRAND FILM',description:'为商业传播场景制作的品牌动态内容。',video:'assets/videos/brand-mix.mp4',poster:'assets/works/02.jpg',index:'07 / 08'},
  node:{title:'品牌视觉 / 动态片段',category:'MOTION TEST',description:'用于展示镜头、材质与动效节奏的品牌动态作品片段。',video:'assets/videos/campaign-node2.mp4',poster:'assets/works/x2.jpg',index:'08 / 13'},
  'ai-node-6':{title:'AI 视频节点 6 / 动态视觉工作流',category:'AI FEATURE / NODE 06',description:'重点展示 AI 辅助动态视觉工作流：围绕画面生成、镜头衔接与动态节奏进行探索，并通过制作判断保持视觉表达的统一。',video:'assets/videos/ai-node-6.mp4',poster:'assets/works/x4.jpg',index:'09 / 13'},
  'ai-node-2':{title:'AI 视频节点 2 / 流程实验',category:'AI WORKFLOW / NODE 02',description:'以节点化流程组织画面与动态元素，探索 AI 辅助创作在镜头构建中的表现可能。',video:'assets/videos/ai-node-2.mp4',poster:'assets/works/x3.jpg',index:'10 / 13'},
  'ai-storyboard-1':{title:'AI 分镜视频 #1',category:'AI STORYBOARD',description:'从分镜节奏出发进行的 AI 动态视觉实验，呈现画面叙事与镜头氛围。',video:'assets/videos/ai-storyboard-1.mp4',poster:'assets/works/p3.jpg',index:'11 / 13'},
  'ai-storyboard-2':{title:'AI 分镜视频 #2',category:'AI STORYBOARD',description:'围绕视觉节奏与镜头转场展开的 AI 分镜探索作品。',video:'assets/videos/ai-storyboard-2.mp4',poster:'assets/works/p4.jpg',index:'12 / 13'},
  'ai-storyboard-6':{title:'AI 分镜视频 #6',category:'AI STORYBOARD',description:'以动态画面、色彩氛围与叙事推进为重点的 AI 分镜视觉实验。',video:'assets/videos/ai-storyboard-6.mp4',poster:'assets/works/x2.jpg',index:'13 / 13'}
};
if (document.body.classList.contains('project-page')) {
  const id = new URLSearchParams(window.location.search).get('id');
  const project = projects[id] || projects.toilet;
  document.title = `${project.title} | 程玉栋作品集`;
  document.querySelector('#project-category').textContent = project.category;
  document.querySelector('#project-title').textContent = project.title;
  document.querySelector('#project-description').textContent = project.description;
  document.querySelector('#project-index').textContent = project.index;
  const video = document.querySelector('#project-video');
  video.pause();
  video.classList.add('is-loading');
  video.poster = '';
  video.removeAttribute('src');
  video.load();
  // A unique query forces the browser to discard any previous video's frame.
  video.src = `${project.video}?project=${encodeURIComponent(id || 'default')}`;
  video.load();
  video.addEventListener('loadeddata', () => video.classList.remove('is-loading'), { once: true });
  video.addEventListener('error', () => video.classList.remove('is-loading'), { once: true });
}

const stillLightbox = document.querySelector('#still-lightbox');
if (stillLightbox) {
  const stillImage = document.querySelector('#still-lightbox-image');
  const stillTitle = document.querySelector('#still-lightbox-title');
  document.querySelectorAll('.still-card').forEach(card => card.addEventListener('click', () => {
    stillImage.src = card.dataset.image;
    stillImage.alt = card.dataset.title;
    stillTitle.textContent = card.dataset.title;
    stillLightbox.showModal();
  }));
  stillLightbox.querySelector('.close-lightbox').addEventListener('click', () => stillLightbox.close());
  stillLightbox.addEventListener('click', event => { if (event.target === stillLightbox) stillLightbox.close(); });
}

const homeVideo = document.querySelector('.cinema-video');
const soundToggle = document.querySelector('.sound-toggle');
if (homeVideo && soundToggle) {
  soundToggle.addEventListener('click', () => {
    homeVideo.muted = !homeVideo.muted;
    soundToggle.textContent = homeVideo.muted ? 'SOUND OFF' : 'SOUND ON';
    soundToggle.setAttribute('aria-label', homeVideo.muted ? '打开背景音乐' : '关闭背景音乐');
  });
}

const showcaseSlides = [...document.querySelectorAll('.showcase-slide')];
const showcaseButtons = [...document.querySelectorAll('.showcase-rail button')];
if (showcaseSlides.length) {
  let activeSlide = 0;
  const link = document.querySelector('#slide-link');
  const current = document.querySelector('#slide-current');
  const setSlide = (index) => {
    activeSlide = (index + showcaseSlides.length) % showcaseSlides.length;
    showcaseSlides.forEach((slide, i) => {
      const selected = i === activeSlide;
      slide.classList.toggle('active', selected);
      const video = slide.querySelector('video');
      if (selected) video.play().catch(() => {}); else video.pause();
    });
    showcaseButtons.forEach((button, i) => button.classList.toggle('active', i === activeSlide));
    // The main call-to-action always leads to the portfolio overview.
    if (link) link.href = 'works.html';
    current.textContent = String(activeSlide + 1).padStart(2, '0');
  };
  showcaseButtons.forEach(button => button.addEventListener('click', () => setSlide(Number(button.dataset.slide))));
  document.querySelectorAll('.showcase-arrow').forEach(button => button.addEventListener('click', () => setSlide(activeSlide + (button.dataset.direction === 'next' ? 1 : -1))));
  setSlide(0);
}
