//Expand functionality
let expandBtn = document.querySelector('.expandBtn');

expandBtn.addEventListener('click', expand);

function expand() {
  document.querySelector('.quoteSection').classList.toggle('hide');
  document.querySelector('.expandedSection').classList.toggle('hide');
  document.querySelector('.fa-chevron-circle-down').classList.toggle('fa-flip-vertical');
  document.querySelector('.clockSection').classList.toggle('expandActive');
  
  let btnText = document.querySelector('.btnText');
  
  if(btnText.innerHTML === 'more'){
    btnText.innerText = 'less';
  } else {
    btnText.innerText = 'more';
  }
}


//Quote functionallity
window.addEventListener('load', displayQuote)

document.querySelector('.refreshBtn')
.addEventListener('click', displayQuote);

async function getQuote(){
  const res = await axios.get('https://api.quotable.io/random');
  const quote = res.data.content;
  const author = res.data.author;
  return [quote, author];
}

async function displayQuote(){
  const quoteContent = await getQuote();

  document.querySelector('.quote').innerHTML = `${quoteContent[0]}`;
  document.querySelector('.author').innerHTML = `${quoteContent[1]}`;
}
