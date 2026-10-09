'use strict';

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const savedTheme = root.dataset.theme;
    let preference = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;

    function updateTheme() {
        const dark = preference ? preference === 'dark' : systemTheme.matches;
        if (preference) root.dataset.theme = preference;
        else delete root.dataset.theme;
        themeToggle.setAttribute('aria-pressed', String(dark));
        themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
        themeColor?.setAttribute('content', dark ? '#171c19' : '#f5f3ed');
    }

    updateTheme();
    themeToggle.hidden = false;
    themeToggle.addEventListener('click', () => {
        const dark = preference ? preference === 'dark' : systemTheme.matches;
        preference = dark ? 'light' : 'dark';
        updateTheme();
        try { localStorage.setItem('atul-theme', preference); } catch (_) { /* Keep the choice for this visit. */ }
    });
    systemTheme.addEventListener('change', updateTheme);
    window.addEventListener('storage', event => {
        if (event.key !== 'atul-theme' && event.key !== null) return;
        preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
        updateTheme();
    });
}

const demo = document.querySelector('[data-video-player]');
if (demo) {
    const stage = demo.querySelector('.video-stage');
    const image = stage.querySelector('img');
    const play = demo.querySelector('[data-play-demo]');
    const close = demo.querySelector('[data-close-demo]');
    const fallback = demo.querySelector('.video-fallback');
    let frame;

    play.hidden = false;
    fallback.hidden = true;
    play.addEventListener('click', () => {
        if (frame) return;
        frame = document.createElement('iframe');
        frame.title = 'to.video product overview';
        frame.src = 'https://www.youtube-nocookie.com/embed/F15ApAY0Qho?autoplay=1&rel=0';
        frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.className = 'demo-frame';
        image.hidden = true;
        play.hidden = true;
        close.hidden = false;
        stage.append(frame);
        frame.focus();
    });
    close.addEventListener('click', () => {
        frame?.remove();
        frame = undefined;
        image.hidden = false;
        play.hidden = false;
        close.hidden = true;
        play.focus();
    });
}

const musicDialog = document.querySelector('#music-dialog');
if (musicDialog && typeof musicDialog.showModal === 'function') {
    const player = musicDialog.querySelector('.music-modal-player');
    const title = musicDialog.querySelector('#music-dialog-title');
    const provider = musicDialog.querySelector('#music-dialog-source');
    const providerIcon = musicDialog.querySelector('#music-source-icon');
    const credit = musicDialog.querySelector('#music-credit');
    const directLink = musicDialog.querySelector('.player-direct-link');
    const close = musicDialog.querySelector('.music-close');
    let opener;

    document.querySelectorAll('#music [data-music-source]').forEach(link => {
        link.addEventListener('click', event => {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            if (musicDialog.open) return;
            opener = link;
            const source = link.dataset.musicSource;
            const frame = document.createElement('iframe');
            frame.id = 'music-embed';
            frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            frame.allowFullscreen = true;
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            title.textContent = link.dataset.title;
            directLink.href = link.href;
            musicDialog.dataset.source = source;
            if (source === 'spotify') {
                frame.src = `https://open.spotify.com/embed/track/${encodeURIComponent(link.dataset.track)}?theme=0`;
                frame.title = `${link.dataset.title} by Atul Shukla on Spotify`;
                provider.textContent = 'Spotify';
                providerIcon.src = 'assets/spotify-icon.svg';
                credit.textContent = 'Composed & produced by Atul Shukla.';
                directLink.textContent = 'Open on Spotify';
            } else if (source === 'soundcloud') {
                frame.src = 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F299808&visual=false&auto_play=false&color=%23a34429&show_artwork=true&show_playcount=false';
                frame.title = 'Atul Shukla’s music archive on SoundCloud';
                provider.textContent = 'SoundCloud archive';
                providerIcon.src = 'assets/soundcloud-icon.svg';
                credit.textContent = 'Earlier compositions and experiments.';
                directLink.textContent = 'Open on SoundCloud';
            } else if (source === 'film') {
                frame.src = 'https://www.youtube-nocookie.com/embed/9CF4PRGzfgs?autoplay=1&rel=0';
                frame.title = 'Aavrati teaser — original score by Atul Shukla';
                provider.textContent = 'Film score';
                providerIcon.src = 'assets/youtube-icon.svg';
                credit.textContent = 'Aavrati · I composed the score.';
                directLink.textContent = 'Watch on YouTube';
            }
            player.replaceChildren(frame);
            musicDialog.showModal();
        });
    });
    close.addEventListener('click', () => musicDialog.close());
    musicDialog.addEventListener('close', () => {
        player.replaceChildren();
        opener?.focus();
        opener = undefined;
    });
    musicDialog.addEventListener('click', event => {
        if (event.target !== musicDialog) return;
        const bounds = musicDialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) musicDialog.close();
    });
}
