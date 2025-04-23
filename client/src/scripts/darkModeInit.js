// This should run as early as possible in your application
if (typeof window !== 'undefined') {
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
}