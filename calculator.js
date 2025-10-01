(function(){
  const display = document.getElementById('display');
  const grid = document.querySelector('.calc-grid');
  const themeBtn = document.getElementById('themeBtn');

  // Theme persistence
  const saved = localStorage.getItem('calc-theme');
  if(saved === 'light') document.documentElement.setAttribute('data-theme','light');
  themeBtn.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '☀️' : '🌙';
  themeBtn.addEventListener('click', ()=>{
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if(isLight){
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('calc-theme','dark');
      themeBtn.textContent = '🌙';
    }else{
      document.documentElement.setAttribute('data-theme','light');
      localStorage.setItem('calc-theme','light');
      themeBtn.textContent = '☀️';
    }
  });

  function setDisplay(val){
    display.value = val;
  }
  function append(val){
    if(display.value === '0' && /[0-9.]/.test(val)) setDisplay(val);
    else setDisplay(display.value + val);
  }
  function clearAll(){ setDisplay('0'); }
  function backspace(){
    const v = display.value;
    if(v.length <= 1) return setDisplay('0');
    setDisplay(v.slice(0,-1));
  }
  function equals(){
    try{
      // Prevent unsafe eval patterns
      if(/[^0-9+\-*/(). ]/.test(display.value)) return;
      const result = Function('return '+display.value)();
      setDisplay(String(result));
    }catch{
      setDisplay('Error');
      setTimeout(()=> setDisplay('0'), 800);
    }
  }

  grid.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    const val = btn.getAttribute('data-value');
    const act = btn.getAttribute('data-action');
    if(val) return append(val);
    if(act === 'clear') return clearAll();
    if(act === 'back') return backspace();
    if(act === 'equals') return equals();
  });

  // Keyboard support
  document.addEventListener('keydown', (e)=>{
    if((/^[0-9.+\-*/()]$/).test(e.key)) append(e.key);
    else if(e.key === 'Enter') equals();
    else if(e.key === 'Backspace') backspace();
    else if(e.key.toLowerCase() === 'c') clearAll();
  });
})();


