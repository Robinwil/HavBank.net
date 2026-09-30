// Applies the stored/system theme before first paint (loaded blocking from app.html).
// External file so it works with prerendered pages under the CSP (no nonce needed).
(() => {
	const storageKey = 'havbank-theme';
	try {
		const storedTheme = localStorage.getItem(storageKey);
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const useDark = storedTheme === 'dark' || (storedTheme !== 'light' && prefersDark);
		document.documentElement.classList.toggle('dark', useDark);
		document.documentElement.style.colorScheme = useDark ? 'dark' : 'light';
	} catch {
		// Fall back to the system preference if storage access is unavailable.
	}
})();
