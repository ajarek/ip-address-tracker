const HEADER=document.querySelector('header')
const INPUT=document.querySelector('.wrapper input')
const BUTTON=document.querySelector('.wrapper button')
let address='89.64.124.79'
let mymap = L.map('map');

const addAddress = (e) => {
    e.preventDefault()
     address=INPUT.value
      getIp()
}
const creatCard= (data) => {
    const {location,ip,isp} = data
    const {country,city,timezone} = location
    let card=document.createElement('div')
    card.classList.add('card')
    card.innerHTML=`<div class="item"><p>ip address</p><h5>${ip}</div>
    <div class="item"><p>location</p><h5>${country} ${city}</h5></div>
    <div class="item"><p>timezone</p><h5>UTC${timezone}</h5></div>
    <div class="item"><p>isp</p><h5>${isp}</h5></div>`
    HEADER.appendChild(card) 
}

async function getIp() {
    const response = await fetch(`
    https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_Wvx7yuU8cnKsnVSOeOYNCuI2NQD4y&ipAddress=${address}`);
    const data = await response.json()
    console.log(data)
    const{location} = data
    creatCard(data)
    //po opłaceniu przywrócić kod:
    // mymap.setView([location.lat, location.lng], 13);
    // L.marker([location.lat, location.lng]).addTo(mymap)
    
    L.marker([54.1387, 15.5089]).addTo(mymap)//po opłaceniu wyciąć kod
  }
  
  getIp()
  
  var setMap = () => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhdzEyIiwiYSI6ImNrZXR4bDhmbDBqYmUzNGxoa2I3M2hmdDMifQ.b-m-i1U8b4MWy5WUCegzSQ', {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
   }).addTo(mymap);
   mymap.setView([54.1760, 15.6089], 13);//po opłaceniu wyciąć kod
  }
  setMap();

  BUTTON.addEventListener('click', addAddress)
