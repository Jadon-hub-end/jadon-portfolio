const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav, .cinema-header nav, .inner-header nav, .showcase-nav nav');
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
const prefersFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const isCompactViewport = window.matchMedia('(max-width: 800px)').matches;
const previewPosters = {
  toilet:'assets/posters/bathroom-toilet.jpg',
  bosco:'assets/posters/brand-bosco.jpg',
  qsj:'assets/posters/brand-qsj.jpg',
  oppo:'assets/posters/brand-oppo.jpg',
  appliance:'assets/posters/appliance-2024.jpg',
  'auto-vision':'assets/posters/auto-vision.jpg',
  'huasa-shower':'assets/posters/huasa-shower.jpg',
  'tubler-space':'assets/posters/tubler-space.jpg',
  'tona-logo-motion':'assets/posters/tona-logo-motion.jpg',
  'space-composite':'assets/posters/space-composite.jpg',
  'tona-architecture':'assets/posters/tona-architecture.jpg',
  'brand-journey':'assets/posters/brand-journey.jpg',
  mix:'assets/posters/brand-mix.jpg',
  node:'assets/posters/campaign-node2.jpg',
  'ai-node-6':'assets/posters/ai-node-6.jpg',
  'ai-node-2':'assets/posters/ai-node-2.jpg',
  'ai-storyboard-1':'assets/posters/ai-storyboard-1.jpg',
  'ai-storyboard-2':'assets/posters/ai-storyboard-2.jpg',
  'ai-storyboard-6':'assets/posters/ai-storyboard-6.jpg'
};
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  cards.forEach(card => card.classList.toggle('hidden', filter.dataset.filter !== 'all' && card.dataset.type !== filter.dataset.filter));
}));

document.querySelectorAll('.film-card').forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;
  const projectId = new URL(card.href, window.location.href).searchParams.get('id');
  const poster = projectId && previewPosters[projectId] ? previewPosters[projectId] : '';

  if (!prefersFinePointer) {
    if (poster) video.poster = poster;
    video.preload = 'none';
    if (!window.mobilePreviewLoader) {
      window.mobilePreviewLoader = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const targetVideo = entry.target;
        const source = targetVideo.querySelector('source');
        if (!source.src && source.dataset.src) {
          source.src = source.dataset.src;
          targetVideo.load();
        }
      }), { rootMargin: '180px 0px', threshold: 0.12 });
    }
    window.mobilePreviewLoader.observe(video);
    return;
  }

  // Load only visible desktop card videos so their real first frame is the preview.
  if (!window.previewLoader) {
    window.previewLoader = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const targetVideo = entry.target;
      const source = targetVideo.querySelector('source');
      if (!source.src && source.dataset.src) {
        source.src = source.dataset.src;
        targetVideo.load();
      }
      window.previewLoader.unobserve(targetVideo);
    }), { rootMargin: '120px 0px', threshold: 0.05 });
  }
  window.previewLoader.observe(video);

  // Desktop previews only play while the visitor is hovering a card.
  card.addEventListener('pointerenter', () => {
    const source = video.querySelector('source');
    if (!source.src && source.dataset.src) {
      source.src = source.dataset.src;
      video.load();
    }
    video.play().catch(() => {});
  });
  card.addEventListener('pointerleave', () => {
    video.pause();
    video.currentTime = 0;
  });
  card.addEventListener('focusin', () => video.play().catch(() => {}));
  card.addEventListener('focusout', () => video.pause());
});
const projects = {
  toilet:{title:'新月马桶 / 三维产品视频',category:'BATHROOM FILM',description:'以产品结构、流动光影与使用情境为重点的卫浴产品三维影片。',video:'assets/videos/bathroom-toilet.mp4',poster:'assets/posters/bathroom-toilet.jpg',index:'01 / 08'},
  bosco:{title:'BOSCO / 品牌动态视觉',category:'BRAND FILM',description:'围绕品牌感知与产品形象打造的三维动态视觉内容。',video:'assets/videos/brand-bosco.mp4',poster:'assets/posters/brand-bosco.jpg',index:'03 / 08'},
  qsj:{title:'商业产品 / 品牌影像',category:'COMMERCIAL FILM',description:'将产品卖点与视觉节奏融合的商业三维广告影片。',video:'assets/videos/brand-qsj.mp4',poster:'assets/posters/brand-qsj.jpg',index:'04 / 08'},
  oppo:{title:'OPPO / 产品广告片',category:'PRODUCT CAMPAIGN',description:'以科技产品的形态、细节和速度感为核心的视觉广告。',video:'assets/videos/brand-oppo.mp4',poster:'assets/posters/brand-oppo.jpg',index:'05 / 08'},
  appliance:{title:'家电产品 / 三维视觉影片',category:'APPLIANCE FILM',description:'从产品细节到整体场景，用动态三维视觉强化家电产品体验。',video:'assets/videos/appliance-2024.mp4',poster:'assets/posters/appliance-2024.jpg',index:'06 / 08'},
  'auto-vision':{title:'汽车产品视觉 / 未来座舱',category:'AUTOMOTIVE VISUAL',description:'围绕未来座舱、车身细节与光影氛围建立汽车产品的商业视觉表达。',video:'assets/videos/auto-vision.mp4',poster:'assets/posters/auto-vision.jpg',index:'07 / 11'},
  'huasa-shower':{title:'华萨淋浴系统 / 产品视觉',category:'SHOWER SYSTEM',description:'以产品结构、喷淋细节和功能演示，呈现卫浴系统的品质与科技感。',video:'assets/videos/huasa-shower.mp4',poster:'assets/posters/huasa-shower.jpg',index:'08 / 11'},
  'tubler-space':{title:'Tubler 家居空间 / 卫浴视觉',category:'HOME & BATH',description:'以家居空间、卫浴产品与使用情境建立温润而专业的产品影像体验。',video:'assets/videos/tubler-space.mp4',poster:'assets/posters/tubler-space.jpg',index:'09 / 11'},
  'tona-logo-motion':{title:'Tona 品牌演绎 / Logo Motion',category:'LOGO MOTION',description:'围绕品牌标识、色彩与核心视觉元素展开的动态识别演绎。',video:'assets/videos/tona-logo-motion.mp4',poster:'assets/posters/tona-logo-motion.jpg',index:'04 / 07'},
  'space-composite':{title:'空间视觉合成 / Brand Motion',category:'SPACE MOTION',description:'以空间镜头、产品场景和后期合成营造沉浸式的品牌氛围。',video:'assets/videos/space-composite.mp4',poster:'assets/posters/space-composite.jpg',index:'05 / 07'},
  'tona-architecture':{title:'Tona 建筑氛围 / Dynamic Visual',category:'ARCHITECTURE MOTION',description:'将建筑空间、自然光影与时间变化转化为具有情绪张力的动态视觉。',video:'assets/videos/tona-architecture.mp4',poster:'assets/posters/tona-architecture.jpg',index:'06 / 07'},
  'brand-journey':{title:'品牌发展影像 / Journey Film',category:'BRAND JOURNEY',description:'以企业场景、活动记录与时间线组织品牌成长过程的动态叙事。',video:'assets/videos/brand-journey.mp4',poster:'assets/posters/brand-journey.jpg',index:'07 / 07'},
  mix:{title:'商业视觉 / 动态影像',category:'BRAND FILM',description:'为商业传播场景制作的品牌动态内容。',video:'assets/videos/brand-mix.mp4',poster:'assets/posters/brand-mix.jpg',index:'07 / 08'},
  node:{title:'品牌视觉 / 动态片段',category:'MOTION TEST',description:'用于展示镜头、材质与动效节奏的品牌动态作品片段。',video:'assets/videos/campaign-node2.mp4',poster:'assets/posters/campaign-node2.jpg',index:'08 / 13'},
  'ai-node-6':{title:'AI 视频节点 6 / 动态视觉工作流',category:'AI FEATURE / NODE 06',description:'重点展示 AI 辅助动态视觉工作流：围绕画面生成、镜头衔接与动态节奏进行探索，并通过制作判断保持视觉表达的统一。',video:'assets/videos/ai-node-6.mp4',poster:'assets/posters/ai-node-6.jpg',index:'09 / 13'},
  'ai-node-2':{title:'AI 视频节点 2 / 流程实验',category:'AI WORKFLOW / NODE 02',description:'以节点化流程组织画面与动态元素，探索 AI 辅助创作在镜头构建中的表现可能。',video:'assets/videos/ai-node-2.mp4',poster:'assets/posters/ai-node-2.jpg',index:'10 / 13'},
  'ai-storyboard-1':{title:'AI 分镜视频 #1',category:'AI STORYBOARD',description:'从分镜节奏出发进行的 AI 动态视觉实验，呈现画面叙事与镜头氛围。',video:'assets/videos/ai-storyboard-1.mp4',poster:'assets/posters/ai-storyboard-1.jpg',index:'11 / 13'},
  'ai-storyboard-2':{title:'AI 分镜视频 #2',category:'AI STORYBOARD',description:'围绕视觉节奏与镜头转场展开的 AI 分镜探索作品。',video:'assets/videos/ai-storyboard-2.mp4',poster:'assets/posters/ai-storyboard-2.jpg',index:'12 / 13'},
  'ai-storyboard-6':{title:'AI 分镜视频 #6',category:'AI STORYBOARD',description:'以动态画面、色彩氛围与叙事推进为重点的 AI 分镜视觉实验。',video:'assets/videos/ai-storyboard-6.mp4',poster:'assets/posters/ai-storyboard-6.jpg',index:'13 / 13'}
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
  video.poster = project.poster;
  video.removeAttribute('src');
  video.load();
  // A unique query forces the browser to discard any previous video's frame.
  const loadProjectVideo = () => {
    video.src = `${project.video}?project=${encodeURIComponent(id || 'default')}`;
    video.load();
    video.addEventListener('loadeddata', () => {
      video.classList.remove('is-loading');
      if (isCompactViewport) {
        video.muted = true;
        video.play().catch(() => {});
      }
    }, { once: true });
    video.addEventListener('error', () => video.classList.remove('is-loading'), { once: true });
  };
  loadProjectVideo();
  const directVideo = document.querySelector('#project-video-open');
  if (directVideo) directVideo.href = project.video;
}

const stillLightbox = document.querySelector('#still-lightbox');
if (stillLightbox) {
  const stillImage = document.querySelector('#still-lightbox-image');
  const stillTitle = document.querySelector('#still-lightbox-title');
  document.querySelectorAll('.still-card, .project-frames button').forEach(card => card.addEventListener('click', () => {
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
      if (selected && (prefersFinePointer || isCompactViewport)) {
        const source = video.querySelector('source');
        if (!source.src && source.dataset.src) {
          source.src = source.dataset.src;
          video.load();
        }
        video.play().catch(() => {});
      } else {
        video.pause();
        if (isCompactViewport) {
          const source = video.querySelector('source');
          if (source && source.src) {
            source.removeAttribute('src');
            video.load();
          }
        }
      }
    });
    showcaseButtons.forEach((button, i) => button.classList.toggle('active', i === activeSlide));
    // The main call-to-action always leads to the portfolio overview.
    if (link) link.href = 'works.html';
    // The redesigned home screen has no visible slide counter.
    if (current) current.textContent = String(activeSlide + 1).padStart(2, '0');
  };
  showcaseButtons.forEach(button => button.addEventListener('click', () => setSlide(Number(button.dataset.slide))));
  document.querySelectorAll('.showcase-arrow').forEach(button => button.addEventListener('click', () => setSlide(activeSlide + (button.dataset.direction === 'next' ? 1 : -1))));
  setSlide(0);

  // Some mobile browsers defer autoplay until the first frame can be decoded.
  // Retrying on readiness keeps the landing background alive without user input.
  if (isCompactViewport) {
    const mobileHeroVideo = showcaseSlides[0].querySelector('video');
    mobileHeroVideo.addEventListener('canplay', () => {
      mobileHeroVideo.muted = true;
      mobileHeroVideo.play().catch(() => {});
    }, { once: true });
  }
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) return;
  document.querySelectorAll('video').forEach(video => video.pause());
});

document.querySelectorAll('.home-column-body').forEach(track => {
  let dragging = false;
  let moved = false;
  let suppressClickUntil = 0;
  let startX = 0;
  let startScrollLeft = 0;

  const beginDrag = clientX => {
    if (track.scrollWidth <= track.clientWidth) return;
    dragging = true;
    moved = false;
    startX = clientX;
    startScrollLeft = track.scrollLeft;
    track.classList.add('is-dragging');
  };

  const moveDrag = clientX => {
    if (!dragging) return;
    const delta = clientX - startX;
    if (Math.abs(delta) > 4) moved = true;
    if (moved) track.scrollLeft = startScrollLeft - delta;
  };

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('is-dragging');
    // Suppress only the click generated immediately after a real drag.
    // A later intentional click must always open its linked project.
    if (moved) suppressClickUntil = Date.now() + 180;
  };

  // Mouse events are more reliable than Pointer Events in this local preview.
  track.addEventListener('mousedown', event => {
    if (event.button !== 0) return;
    beginDrag(event.clientX);
  });
  document.addEventListener('mousemove', event => {
    moveDrag(event.clientX);
    if (dragging && moved) event.preventDefault();
  });
  document.addEventListener('mouseup', endDrag);
  track.addEventListener('dragstart', event => event.preventDefault());

  // On phones the touch almost always starts on a card. Track movement from
  // the card itself, then only cancel its click after a real horizontal drag.
  track.addEventListener('touchstart', event => beginDrag(event.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove', event => {
    moveDrag(event.touches[0].clientX);
    if (moved) event.preventDefault();
  }, { passive: false });
  track.addEventListener('touchend', endDrag);
  track.addEventListener('touchcancel', endDrag);

  // Wheel movement also browses the lane horizontally, so laptops without a
  // convenient drag gesture can still reveal every project.
  track.addEventListener('wheel', event => {
    if (track.scrollWidth <= track.clientWidth) return;
    const distance = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!distance) return;
    event.preventDefault();
    track.scrollLeft += distance;
  }, { passive: false });

  track.addEventListener('click', event => {
    if (Date.now() > suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
    suppressClickUntil = 0;
  }, true);
});

// The three portfolio headings remain direct links even when their case lanes
// are being dragged horizontally.
document.querySelectorAll('.home-column-head').forEach(link => {
  link.addEventListener('click', event => {
    if (event.defaultPrevented || !link.href) return;
    window.location.assign(link.href);
  });
});

// Make every visible case card a reliable route to its matching portfolio
// project, independent of the surrounding horizontal browsing lane.
document.querySelectorAll('.home-asset').forEach(link => {
  link.addEventListener('click', event => {
    if (event.defaultPrevented || !link.href) return;
    window.location.assign(link.href);
  });
});
