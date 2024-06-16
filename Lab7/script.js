medalData.sort((a, b) => { return parseInt(a.Rank) - parseInt(b.Rank)});

var countriesContainer = document.getElementById("countriesContainer");
var countryResults = document.getElementById("countryResults");
var countryGold = document.getElementById("GoldMedals");
var countrySilver = document.getElementById("SilverMedals");
var countryBronze = document.getElementById("BronzeMedals");

// Populate the tables with data
for (var i = 0; i < medalData.length; i++) {
  var countryData = medalData[i];
  countriesContainer.appendChild(createCountryItem(countryData));
}

function createCountryItem(data) {
  var row = document.createElement("div");
  
  if (data.Rank < 4)
      row.classList.add('top3');

  var flag = document.createElement('img');
  flag.setAttribute('src','img/Flags/' + data.Team_NOC + '.png');
  flag.setAttribute('data-country-name', data.Team_NOC)
  flag.onclick = showCountryResults;
  row.appendChild(flag);

  row.appendChild(getNewElement('h3', 'Rank: ' + data.Rank));

  row.appendChild(getNewElement('h1', data.Team_NOC));

  row.appendChild(getNewElement('h4','Total Medals:' + (parseInt(data.Gold) + parseInt(data.Silver) + parseInt(data.Bronze))));

  return row;
}

function getNewElement(type, text){
  let element = document.createElement(type);
  element.textContent = text;
  return element;
}


function showCountryResults(event){
  let country = getCountryByName(event.target.getAttribute('data-country-name'));
  document.getElementById("ChosenCountryName").textContent = country.Team_NOC;
  document.querySelector("#countryResults > img").setAttribute('src', 'img/flags/' + country.Team_NOC + '.png');

  countryGold.innerHTML = '';
  countrySilver.innerHTML = '';
  countryBronze.innerHTML = '';

  for(i = 0; i < country.Gold; i ++){
    countryGold.innerHTML += '<span></span>' ;
  }

  for(i = 0; i < country.Silver; i ++){
    countrySilver.innerHTML += '<span></span>' ;
  }

  for(i = 0; i < country.Bronze; i ++){
    countryBronze.innerHTML += '<span></span>' ;
  }

  document.documentElement.scrollTop = 0;
}


function getCountryByName(value) {
  return medalData.find(element => element['Team_NOC'] === value);
}