async function loadSharedFragments() {
    const includeTargets = document.querySelectorAll('[data-include]');

    await Promise.all(Array.from(includeTargets).map(async (target) => {
        const includePath = target.getAttribute('data-include');
        if (!includePath) return;

        try {
            const response = await fetch(includePath);
            if (!response.ok) return;

            const html = await response.text();
            target.innerHTML = html;
        } catch (error) {
            // Keep the page usable even if include fails.
            console.error('Failed to load include:', includePath, error);
        }
    }));

    document.dispatchEvent(new Event('site:fragments-loaded'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSharedFragments);
} else {
    loadSharedFragments();
}
