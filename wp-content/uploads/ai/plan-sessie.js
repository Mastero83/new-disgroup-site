/* Aanvraagformulier AI-inspiratie- en werksessie (statische site, geen backend).
 * Wil je een ander adres of een andere dienst? Pas alleen FORM_ENDPOINT aan (zie README). */
// LET OP: na activatie van FormSubmit (eerste inzending -> activatiemail) dit adres
// vervangen door de willekeurige alias die FormSubmit geeft, bv.
// 'https://formsubmit.co/ajax/<alias>', zodat het e-mailadres niet meer in de paginabron staat.
var FORM_ENDPOINT = 'https://formsubmit.co/ajax/rjaprins@gmail.com';
var CONTACT_URL = '../../contact/index.html'; // fallback-link bij een fout

(function () {
  var form = document.getElementById('plan-form');
  if (!form) return;
  var btn = document.getElementById('plan-submit');
  var alertBox = document.getElementById('plan-error');
  var success = document.getElementById('plan-success');
  var d1 = document.getElementById('f-datum1'), d2 = document.getElementById('f-datum2');

  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  var today = iso(new Date());
  d1.min = today; d2.min = today;

  function isWeekend(v) { var p = v.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); var w = d.getDay(); return w === 0 || w === 6; }
  function errEl(input) { return document.getElementById('e-' + input.id.replace('f-', '')); }
  function setErr(input, msg) {
    var e = errEl(input); if (!e) return;
    e.textContent = msg || '';
    var f = input.closest('.f');
    if (msg) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', e.id); f && f.classList.add('has-err'); }
    else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); f && f.classList.remove('has-err'); }
  }
  function check(input) {
    var v = (input.type === 'checkbox') ? input.checked : input.value.trim();
    if (input.required && !v) return input.dataset.msg;
    if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return input.dataset.msg;
    if (input.type === 'tel' && v && !/^[+()\d\s.-]{8,20}$/.test(v)) return input.dataset.msg;
    if (input.type === 'date' && v) {
      if (v < today) return 'Kies een datum vanaf vandaag.';
      if (isWeekend(v)) return 'Kies een werkdag (maandag t/m vrijdag).';
      if (input === d2 && d1.value && v === d1.value) return 'Kies een andere datum dan je eerste voorkeur.';
    }
    return '';
  }
  var fields = Array.prototype.slice.call(form.querySelectorAll('input[id^="f-"]:not([type=radio]):not(#f-honey)'));
  fields.forEach(function (el) {
    var ev = (el.type === 'checkbox' || el.type === 'date') ? 'change' : 'blur';
    el.addEventListener(ev, function () { setErr(el, check(el)); });
    el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) setErr(el, check(el)); });
  });

  function setLoading(on) {
    btn.disabled = on; btn.classList.toggle('loading', on);
    btn.querySelector('.btn-label').textContent = on ? 'Bezig met versturen…' : 'Verstuur aanvraag';
  }
  function showError() {
    var subject = encodeURIComponent('Aanvraag AI-inspiratie- en werksessie');
    alertBox.innerHTML = '<strong>Versturen is niet gelukt.</strong> Lukt het niet? Neem contact op via <a href="' + CONTACT_URL + '">onze contactpagina</a>.';
    alertBox.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alertBox.hidden = true;
    var first = null;
    fields.forEach(function (el) { var m = check(el); setErr(el, m); if (m && !first) first = el; });
    if (first) { first.focus(); return; }
    if (document.getElementById('f-honey').value) return; // bot
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    setLoading(true);
    fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === false || j.success === 'false') throw new Error('fail'); }); })
      .then(function () {
        form.hidden = true;
        var when = d1.value ? 'Voorkeur: ' + new Date(d1.value + 'T12:00').toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' }) + ', ' + (data.Dagdeel || '').toLowerCase() + '.' : 'We plannen samen een geschikt moment.';
        document.getElementById('plan-summary').textContent = when + ' We reageren via ' + data.email + '.';
        success.hidden = false; success.focus();
      })
      .catch(showError)
      .then(function () { setLoading(false); });
  });
})();
