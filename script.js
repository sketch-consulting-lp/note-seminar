(() => {
  const cta = document.getElementById('fixed-cta');
  const formSection = document.getElementById('form');
  const form = document.getElementById('entry-form');
  const successBox = document.getElementById('form-success');
  const button = document.getElementById('submit-btn');
  const btnText = button.querySelector('.btn-text');
  const btnLoading = button.querySelector('.btn-loading');
  const errorBox = document.getElementById('form-error');

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      cta.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { threshold: 0.05 }).observe(formSection);
  }
  const setLoading = (loading) => {
    button.disabled = loading;
    btnText.hidden = loading;
    btnLoading.hidden = !loading;
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    setLoading(true);
    errorBox.hidden = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Formspree returned ' + response.status);
      form.hidden = true;
      successBox.hidden = false;
      cta.classList.add('is-hidden');
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      successBox.focus({ preventScroll: true });
    } catch (error) {
      errorBox.textContent = '送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。';
      errorBox.hidden = false;
      setLoading(false);
    }
  });
})();
