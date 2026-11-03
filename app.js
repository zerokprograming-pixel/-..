const question = document.getElementById('question');
const code = document.getElementById('code');
const helpType = document.getElementById('helpType');
const status = document.getElementById('status');

document.getElementById('prepare').addEventListener('click', async () => {
  const q = question.value.trim();
  const c = code.value.trim();

  if (!q) {
    status.textContent = 'اكتب نص السؤال أولاً.';
    question.focus();
    return;
  }

  const prompt = [
    'أنت مساعد تعليمي لطالب يتعلم البرمجة على QUREO.',
    helpType.value,
    'اشرح بالعربية وبأسلوب بسيط يناسب طالباً مبتدئاً. لا تدّعِ أنك دخلت المنصة أو نفذت المهمة.',
    'ابدأ بفهم المطلوب، ثم اشرح المفهوم، ووجّهني لأجرب بنفسي. إذا احتجت إلى كود، استخدم مثالاً تعليمياً واشرح كل جزء.',
    '',
    'نص السؤال:',
    q,
    '',
    'محاولتي البرمجية:',
    c || 'لم أكتب كوداً بعد.'
  ].join('\n');

  try {
    await navigator.clipboard.writeText(prompt);
    status.textContent = 'تم نسخ السؤال مع تعليمات المساعدة. سيفتح ChatGPT الآن؛ الصق النص في المحادثة.';
  } catch (e) {
    status.textContent = 'تعذّر النسخ التلقائي. انسخ النص من المربع التالي.';
    const fallback = document.createElement('textarea');
    fallback.value = prompt;
    fallback.style.width = '100%';
    fallback.style.marginTop = '12px';
    fallback.rows = 10;
    fallback.dir = 'auto';
    document.querySelector('.panel').appendChild(fallback);
    fallback.focus();
    fallback.select();
  }

  window.open('https://chatgpt.com/', '_blank', 'noopener');
});
