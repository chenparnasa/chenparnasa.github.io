(() => {
  // ─── Collect all zoomable media on the page ───────────────────────────
  function collectMedia() {
    return Array.from(document.querySelectorAll('.zoomable')).map(el => ({
      el,
      type: el.tagName === 'VIDEO' ? 'video' : 'image',
      src: el.tagName === 'VIDEO'
        ? el.querySelector('source')?.src || el.src
        : el.src,
      alt: el.alt || '',
    }));
  }

  // ─── Build lightbox DOM ───────────────────────────────────────────────
  function buildLightbox() {
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div class="lb-backdrop"></div>
      <button class="lb-close" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="lb-arrow lb-prev" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 3l-7 7 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="lb-arrow lb-next" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 3l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="lb-stage">
        <div class="lb-media-wrap"></div>
      </div>
      <div class="lb-thumbs"></div>
    `;
    document.body.appendChild(lb);
    return lb;
  }

  // ─── State ────────────────────────────────────────────────────────────
  let media = [];
  let current = 0;
  let lb, mediaWrap, thumbsEl;

  // ─── Render current item ──────────────────────────────────────────────
  function render(index) {
    current = index;
    const item = media[index];

    // Stop any playing video
    mediaWrap.querySelectorAll('video').forEach(v => v.pause());

    mediaWrap.innerHTML = '';

    if (item.type === 'video') {
      const vid = document.createElement('video');
      vid.controls = true;
      vid.autoplay = true;
      vid.muted = true;
      vid.playsinline = true;
      vid.loop = true;
      const src = document.createElement('source');
      src.src = item.src;
      src.type = 'video/mp4';
      vid.appendChild(src);
      mediaWrap.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      mediaWrap.appendChild(img);
    }

    // Update thumbnails
    thumbsEl.querySelectorAll('.lb-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });

    // Scroll active thumb into view
    const activeThumb = thumbsEl.querySelector('.lb-thumb.active');
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    // Show/hide arrows
    lb.querySelector('.lb-prev').style.opacity = media.length > 1 ? '1' : '0';
    lb.querySelector('.lb-next').style.opacity = media.length > 1 ? '1' : '0';
  }

  // ─── Build thumbnails ─────────────────────────────────────────────────
  function buildThumbs() {
    thumbsEl.innerHTML = '';
    media.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'lb-thumb';
      btn.setAttribute('aria-label', `View item ${i + 1}`);

      if (item.type === 'video') {
        // Video thumb: poster or first frame via canvas
        const vid = document.createElement('video');
        vid.src = item.src;
        vid.muted = true;
        vid.preload = 'metadata';
        // Try to get poster from original video element
        const originalVideo = item.el;
        if (originalVideo.poster) {
          const img = document.createElement('img');
          img.src = originalVideo.poster;
          btn.appendChild(img);
        } else {
          const icon = document.createElement('div');
          icon.className = 'lb-thumb-video-icon';
          icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
          btn.appendChild(icon);
        }
      } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        btn.appendChild(img);
      }

      btn.addEventListener('click', () => render(i));
      thumbsEl.appendChild(btn);
    });
  }

  // ─── Open / Close ─────────────────────────────────────────────────────
  function open(index) {
    media = collectMedia();
    if (!media.length) return;
    buildThumbs();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    render(index);
  }

  function close() {
    mediaWrap.querySelectorAll('video').forEach(v => v.pause());
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ─── Init ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    media = collectMedia();
    if (!media.length) return;

    lb = buildLightbox();
    mediaWrap = lb.querySelector('.lb-media-wrap');
    thumbsEl  = lb.querySelector('.lb-thumbs');

    // Click on zoomable elements
    media.forEach((item, i) => {
      item.el.style.cursor = 'zoom-in';
      item.el.addEventListener('click', (e) => {
        e.preventDefault();
        open(i);
      });
    });

    // Controls
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-backdrop').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', () => render((current - 1 + media.length) % media.length));
    lb.querySelector('.lb-next').addEventListener('click', () => render((current + 1) % media.length));

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')   render((current - 1 + media.length) % media.length);
      if (e.key === 'ArrowRight')  render((current + 1) % media.length);
    });

    // Touch swipe
    let touchStartX = 0;
    lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0
          ? render((current + 1) % media.length)
          : render((current - 1 + media.length) % media.length);
      }
    });
  });
})();
