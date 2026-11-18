/* 公開前に必ずご自身のFormspreeフォームIDを入力してください。
   例: https://formspree.io/f/xxxxxxxx */
const FORM_ENDPOINT = 'https://formspree.io/f/xgakkbwa';

const form = document.getElementById('seminar-form');
const status = document.getElementById('form-status');
const success = document.getElementById('form-success');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  if (!form.reportValidity()) return;
  if (!FORM_ENDPOINT || !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(FORM_ENDPOINT)) {
    status.textContent = '現在、申込フォームの送信先が未設定です。公開担当者がFormspreeのフォームIDを設定してください。';
    return;
  }
  const button = form.querySelector('button[type=submit]');
  button.disabled = true;
  button.textContent = '送信中…';
  const data = new FormData(form);
  data.set('_subject', '【note採用広報セミナー】新規参加申込');
  try {
    const response = await fetch(FORM_ENDPOINT, {method:'POST',body:data,headers:{'Accept':'application/json'}});
    if (!response.ok) throw new Error('送信に失敗しました');
    form.hidden = true;
    success.hidden = false;
  } catch(error) {
    status.textContent = '送信できませんでした。通信状況をご確認のうえ、もう一度お試しください。';
    button.disabled = false;
    button.innerHTML = '無料セミナーに申し込む <span>↗</span>';
  }
});
