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
  try {
    const res = await axios.get('https://api.quotable.io/random');
    const quote = res.data.content;
    const author = res.data.author;
    return [quote, author];
  } catch(e){
    console.log(e);
  }
  
}

async function displayQuote(){
  const quoteContent = await getQuote();

  document.querySelector('.quote').innerHTML = `${quoteContent[0]}`;
  document.querySelector('.author').innerHTML = `${quoteContent[1]}`;
}



//Time and Location Details functionality
window.addEventListener('load', displayDetails);

async function getLocationDetails(){
  try {
    const res = await axios.get('https://ipapi.co/json/');
    const timezone = res.data.timezone;
    const city = res.data.city;
    const country = res.data.country;

    const arr = [timezone, city, country];
    
    return arr;
  } catch(e){
    console.log(e);
  }
}



async function getTimeDetails(){
  try {
    const locationDetails = await getLocationDetails();
    const timezone = locationDetails[0];

    const res = await axios.get(`https://worldtimeapi.org/api/timezone/${timezone}`);
    
    const abbrev = res.data.abbreviation;
    const dayOfWeek = res.data.day_of_week;
    const dayOfYear = res.data.day_of_year;
    const weekNum = res.data.week_number;
    const dateTime = res.data.datetime;
    const city = locationDetails[1];
    const country = locationDetails[2];

    const arr = [abbrev, dayOfWeek, dayOfYear, weekNum, timezone, dateTime, city, country];
    
    return arr;
  } catch(e){
    console.log(e);
  }
}


async function displayDetails(){
  const details = await getTimeDetails();
  
  const dateTime = details[5];
  const time = dateTime.substr(11,5);
  const location = `${details[6]}, ${details[7]}`;

  
  document.querySelector('.timezoneAbbr').innerHTML = `${details[0]}`;
  document.querySelector('.time').innerHTML = time;
  document.querySelector('.location').innerHTML = location;
  document.querySelector('.currTimezone').innerHTML = `${details[4]}`;
  document.querySelector('.dayOfYear').innerHTML = `${details[2]}`;
  document.querySelector('.dayOfWeek').innerHTML = `${details[1]}`;
  document.querySelector('.weekNum').innerHTML = `${details[3]}`;
}
