// Professional, efficient JS for page selector control.
(function(){
  'use strict';

  const selectAll = document.getElementById('select-all');
  const pageCheckboxes = Array.from(document.querySelectorAll('.page-checkbox'));
  const doneBtn = document.getElementById('done');
  const card = document.querySelector('.card');

  const updateDoneState = () => {
    const any = pageCheckboxes.some(cb => cb.checked);
    doneBtn.disabled = !any;
  };

  const updateSelectAllState = () => {
    const checkedCount = pageCheckboxes.filter(cb => cb.checked).length;
    if(checkedCount === 0){
      selectAll.checked = false;
      selectAll.indeterminate = false;
    } else if(checkedCount === pageCheckboxes.length){
      selectAll.checked = true;
      selectAll.indeterminate = false;
    } else {
      selectAll.checked = false;
      selectAll.indeterminate = true;
    }
  };

  updateSelectAllState();
  updateDoneState();

  card.addEventListener('change', (e) => {
    const target = e.target;
    if(target.matches('.page-checkbox')){
      updateSelectAllState();
      updateDoneState();
    } else if(target === selectAll){
      pageCheckboxes.forEach(cb => cb.checked = selectAll.checked);
      updateDoneState();
    }
  });

  // Done action: gather selected pages and call a handler (currently alert)
  doneBtn.addEventListener('click', () => {
    const selected = pageCheckboxes.filter(cb => cb.checked).map(cb => `Page ${cb.dataset.index}`);
    if(selected.length === 0){
      window.alert('No pages selected.');
      return;
    }

    window.alert('Selected: ' + selected.join(', '));
  });
})();
