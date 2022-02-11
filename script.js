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
    const {location,ip,country_code,city,continent_code} = data
    
    let card=document.createElement('div')
    card.classList.add('card')
    card.innerHTML=`<div class="item"><p>ip address</p><h5>${ip}</div>
    <div class="item"><p>location</p><h5>${country_code} ${city}</h5></div>
    <div class="item"><p>timezone</p><h5>UTC-${continent_code}</h5></div>
    <div class="item"><p>flag</p><h5><img src="${location.country_flag}" width="10%" alt=""></h5></div>`
    HEADER.appendChild(card) 
}

async function getIp() {
    const response = await fetch(`
    http://api.ipapi.com/${address}?access_key=c04a179acd153d1b82df505cb0fb8f62`);
    try {
    const data = await response.json()
    const{latitude,longitude} = data
    creatCard(data)
    
    mymap.setView([latitude, longitude], 13);
    const markerIcon = L.icon({
      iconUrl: "./images/icon-location.svg",
      iconSize: [25, 35],
    });
    L.marker([latitude, longitude], { icon: markerIcon }).addTo(mymap)
  } catch (error) {
    console.log("error", error);
  }
   
  }
  
  getIp()
  
  var setMap = () => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhdzEyIiwiYSI6ImNrZXR4bDhmbDBqYmUzNGxoa2I3M2hmdDMifQ.b-m-i1U8b4MWy5WUCegzSQ', {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      
       
   }).addTo(mymap);
   
  }
  setMap();

  BUTTON.addEventListener('click', addAddress)
