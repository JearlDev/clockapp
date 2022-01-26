//***Expand functionality***//
//call expand function on expand button click
document.querySelector('.expandBtn').addEventListener('click', expand);

function expand() {
  //toggle classes on selected elements
  document.querySelector('.quoteSection').classList.toggle('hide');
  document.querySelector('.expandedSection').classList.toggle('hide');
  document.querySelector('.fa-chevron-circle-down').classList.toggle('fa-flip-vertical');
  document.querySelector('.clockSection').classList.toggle('expandActive');
  
  const btnTextIsMore = document.querySelector('.btnText').innerHTML === 'more';
  
  if(btnTextIsMore){
    document.querySelector('.btnText').innerText = 'less';
  } else {
    document.querySelector('.btnText').innerText = 'more';
  }
}



//***Quote functionallity***//
//display quote on page load
window.addEventListener('load', displayQuote)
//display new quote on refresh button click
document.querySelector('.refreshBtn').addEventListener('click', displayQuote);

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
  //set quote and author text to fetched values
  document.querySelector('.quote').innerHTML = `${quoteContent[0]}`;
  document.querySelector('.author').innerHTML = `${quoteContent[1]}`;
}



//***Time and Location Details functionality***////
//display time and location details on page load
window.addEventListener('load', displayDetails, );
window.addEventListener('load', displayTime);

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
  //get time and location details
  const details = await getTimeDetails();

  //concatenate location string
  const location = `${details[6]}, ${details[7]}`;

  //update time and location details
  document.querySelector('.timezoneAbbr').innerHTML = `${details[0]}`;
  document.querySelector('.location').innerHTML = location;
  document.querySelector('.currTimezone').innerHTML = `${details[4]}`;
  document.querySelector('.dayOfYear').innerHTML = `${details[2]}`;
  document.querySelector('.dayOfWeek').innerHTML = `${details[1]}`;
  document.querySelector('.weekNum').innerHTML = `${details[3]}`;
}


function displayTime(){
  //get current time
  const today = new Date();
  const hrs = today.getHours();
  const mins = today.getMinutes();

  //Save time of day booleans to variables
  const isMorning = hrs < 12 && hrs >= 5;
  const isAfternoon = hrs >= 12 && hrs < 18;

  //Set timeOfDay text and background image based on time of day
  if(isMorning){
    //set good morning text and icon
    document.querySelector('.tOD').innerHTML = 'Good morning';
    document.querySelector('.tODIcon').src = 'assets/images/desktop/icon-sun.svg';
    
    disableNightMode();

  }else if(isAfternoon){
    //set good afternoon text and icon
    document.querySelector('.tOD').innerHTML = 'Good afternoon';
    document.querySelector('.tODIcon').src = 'assets/images/desktop/icon-sun.svg';
    
    disableNightMode();
    
  }else {
    //set good evening text and icons
    document.querySelector('.tOD').innerHTML = 'Good evening';
    document.querySelector('.tODIcon').src = 'assets/images/desktop/icon-moon.svg';
    //add night-time classes
    document.querySelector('body').classList.add('nighttimeBg');
    document.querySelector('.expandedSection').classList.add('nighttimeBgColor');
    document.querySelector('.expandWrapper').classList.add('nighttimeText');
    document.querySelector('.expandRight').classList.add('nighttimeDivider');
  }

  //save time values to one variable
  const hours = pad(hrs);
  const minutes = pad(mins);
  const time = `${hours}:${minutes}`;
  
  //update time
  document.querySelector('.time').innerHTML = time;
  //start time refreshing loop by calling refreshTime function
  refreshTime();
}

//refreshes time every 10 seconds
function refreshTime(){
  const refreshRate = 10000;
  setTimeout(displayTime, refreshRate);
}

//adds '0' to beginning of intergers with one digit
function pad(val) {
  val = String(val);
  while (val.length < 2) val = "0" + val;
  return val;
};


function disableNightMode(){
  document.querySelector('body').classList.remove('nighttimeBg');
  document.querySelector('.expandedSection').classList.remove('nighttimeBgColor');
  document.querySelector('.expandWrapper').classList.remove('nighttimeText');
  document.querySelector('.expandRight').classList.remove('nighttimeDivider');
}


