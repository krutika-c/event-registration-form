(function(){ 
 const form = document.getElementById('regForm'); 
 const fields = Array.from(form.querySelectorAll('.field')); 
 const validators = { 
 fullName: v => v.trim().length >= 3, 
 email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), 
 phone: v => /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(v.trim()), 
 dob: v => { 
 if(!v) return false; 
 const dob = new Date(v); 
 if(isNaN(dob)) return false; 
 const today = new Date(); 
 let age = today.getFullYear() - dob.getFullYear(); 
 const m = today.getMonth() - dob.getMonth(); 
 if(m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;  return age >= 16 && age < 100; 
 }, 
 gender: () => true, 
 city: v => v.trim().length >= 2, 
 organization: v => v.trim().length >= 2, 
 designation: v => v.trim().length >= 2, 
 experience: v => v.trim().length > 0, 
 github: v => v.trim() === '' || /^https?:\/\/.+/i.test(v.trim()), 
 linkedin: v => v.trim() === '' || /^https?:\/\/.+/i.test(v.trim()), 
 ticketType: () => !!form.querySelector('input[name="ticketType"]:checked'),  tracks: () => form.querySelectorAll('input[name="tracks"]:checked').length > 0,  workshop: v => v.trim().length > 0, 
 tshirt: v => v.trim().length > 0, 
 dietary: () => !!form.querySelector('input[name="dietary"]:checked'),  accommodation: () => !!form.querySelector('input[name="accommodation"]:checked'),  hearAbout: v => v.trim().length > 0, 
 emergencyName: v => v.trim().length >= 2, 
 emergencyPhone: v => /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(v.trim()),  specialRequirements: () => true, 
 terms: () => form.querySelector('#terms').checked, 
 newsletter: () => true 
 }; 
 function getValue(name){ 
 const el = form.querySelector(`[name="${name}"]`); 
 if(!el) return ''; 
 if(el.type === 'checkbox' || el.type === 'radio'){
 return el.value; 
 } 
 return el.value; 
 } 
 function validateField(fieldEl){ 
 const name = fieldEl.dataset.name; 
 const fn = validators[name]; 
 if(!fn) return true; 
 let value = ''; 
 const single = form.querySelector(`#${CSS.escape(name)}`); 
 if(single && (single.tagName === 'INPUT' || single.tagName === 'SELECT' || single.tagName ===  'TEXTAREA')){ 
 value = single.value; 
 } 
 const ok = fn(value); 
 fieldEl.classList.toggle('invalid', !ok); 
 return ok; 
 } 
 fields.forEach(f => { 
 f.addEventListener('input', () => validateField(f)); 
 f.addEventListener('change', () => validateField(f)); 
 f.addEventListener('focusout', () => validateField(f)); 
 }); 
 const textarea = document.getElementById('specialRequirements'); 
 const charCount = document.getElementById('charCount'); 
 textarea.addEventListener('input', () => { 
 charCount.textContent = textarea.value.length; 
 }); 
 const stops = Array.from(document.querySelectorAll('.pearl-stop')); 
 const sections = stops.map(s => document.getElementById(s.dataset.target));  const observer = new IntersectionObserver((entries) => { 
 entries.forEach(entry => { 
 if(entry.isIntersecting){ 
 const idx = sections.indexOf(entry.target); 
 stops.forEach((s, i) => { 
 s.classList.toggle('active', i === idx); 
 s.classList.toggle('done', i < idx); 
 }); 
 } 
 }); 
 }, { threshold: 0.35, rootMargin: '-15% 0px -55% 0px' }); 
 sections.forEach(s => s && observer.observe(s)); 
 stops.forEach(s => { 
 s.style.cursor = 'pointer'; 
 s.addEventListener('click', () => { 
 document.getElementById(s.dataset.target).scrollIntoView({ behavior: 'smooth', block: 'start' });
 }); 
 }); 
 form.addEventListener('submit', (e) => { 
 e.preventDefault(); 
 let firstInvalid = null; 
 let allValid = true; 
 fields.forEach(f => { 
 const ok = validateField(f); 
 if(!ok){ 
 allValid = false; 
 if(!firstInvalid) firstInvalid = f; 
 } 
 }); 
 if(!allValid){ 
 firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
 const focusable = firstInvalid.querySelector('input, select, textarea'); 
 if(focusable) focusable.focus(); 
 return; 
 } 
 const name = document.getElementById('fullName').value.trim().split(' ')[0];  const regId = 'HTS26-' + Math.floor(10000 + Math.random() * 89999); 

 document.getElementById('ticketName').textContent = `See you in Hyderabad, ${name}.`;  document.getElementById('regId').textContent = regId; 
 document.querySelector('.card').style.display = 'none'; 
 document.getElementById('ticket').style.display = 'block'; 
 document.getElementById('ticket').scrollIntoView({ behavior: 'smooth', block: 'start' });  }); 
})(); 
