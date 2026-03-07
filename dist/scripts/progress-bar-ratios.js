/**
 * Progress bar ratio fix
 * Sets bar widths proportionally to the numeric values in each group,
 * so the largest value in the group gets 100% and others scale correctly.
 */
document.addEventListener('DOMContentLoaded', function () {
  function parseValue(text) {
    if (text === null || text === undefined) return NaN;
    const cleaned = String(text).replace(/,/g, '').trim();
    const num = parseFloat(cleaned);
    return isFinite(num) ? num : NaN;
  }

  // 1) Group results (#group-results): width is on .progress-bar-wrapper
  const groupResults = document.querySelector('#group-results');
  if (groupResults) {
    groupResults.querySelectorAll('.result-years').forEach(function (resultYears) {
      const items = resultYears.querySelectorAll(':scope > .result-years-item');
      const wrappers = [];
      items.forEach(function (item) {
        const counter = item.querySelector('.progress-bar .counter, .progress-bar .counter-finish');
        const wrapper = item.querySelector('.progress-bar-wrapper');
        if (counter && wrapper) {
          const val = parseValue(counter.textContent);
          if (!isNaN(val)) {
            const hasExtra = wrapper.style.width && wrapper.style.width.indexOf('29px') !== -1;
            wrappers.push({ wrapper: wrapper, value: val, hasExtra: hasExtra });
          }
        }
      });
      if (wrappers.length === 0) return;
      const maxVal = Math.max.apply(null, wrappers.map(function (w) { return w.value; }));
      wrappers.forEach(function (w) {
        const pct = maxVal > 0 ? (w.value / maxVal) * 100 : 100;
        w.wrapper.style.width = w.hasExtra ? 'calc(' + pct + '% - 29px - 49px)' : 'calc(' + pct + '% - 49px)';
      });
    });
  }

  // 2) Markets/countries: --bar-width on .result-years-item or .result-years-item-mbl (exclude #group-results)
  const barItems = document.querySelectorAll('.result-years-item, .result-years-item-mbl');
  const parentToItems = new Map();
  barItems.forEach(function (item) {
    if (item.closest('#group-results')) return;
    const counter = item.querySelector('.progress-bar .counter, .progress-bar .counter-finish');
    if (!counter) return;
    const val = parseValue(counter.textContent);
    if (isNaN(val)) return;
    const parent = item.parentElement;
    if (!parent) return;
    if (!parentToItems.has(parent)) parentToItems.set(parent, []);
    parentToItems.get(parent).push({ item: item, value: val });
  });
  parentToItems.forEach(function (items) {
    const maxVal = Math.max.apply(null, items.map(function (o) { return o.value; }));
    items.forEach(function (o) {
      const pct = maxVal > 0 ? (o.value / maxVal) * 100 : 100;
      o.item.style.setProperty('--bar-width', pct + '%');
    });
  });
});
