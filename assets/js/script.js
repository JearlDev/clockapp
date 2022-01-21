let expandBtn = document.querySelector('.expandBtn');

expandBtn.addEventListener('click', expand);

function expand() {
  document.querySelector('.quoteSection').classList.toggle('hide');
  document.querySelector('.expandedSection').classList.toggle('hide');
  // document.querySelector('.expandedSection').classList.toggle('expandActive2');
  document.querySelector('.fa-chevron-circle-down').classList.toggle('fa-flip-vertical');
  document.querySelector('.clockSection').classList.toggle('expandActive');
  
  let btnText = document.querySelector('.btnText');
  
  if(btnText.innerHTML === 'more'){
    btnText.innerText = 'less';
  } else {
    btnText.innerText = 'more';
  }
    
}

