document.addEventListener("DOMContentLoaded", function() {
  
    medalData.sort((a,b)=>{ return a.Rank - b.Rank});
    
    var topCountriesTableBody = document.getElementById("topCountriesTableBody");
    var otherCountriesTableBody = document.getElementById("otherCountriesTableBody");
    
    function createTableRow(data){
        let row = document.createElement('tr');

        for(prop in data){
           row.appendChild(createTableCell(data[prop]));
        }

        row.appendChild(createTableCell(data.Gold + data.Silver + data.Bronze));

        return row;
    }

    function createTableCell(data){
      let element = document.createElement('td');
      element.innerHTML = '<span>' + data + '</span>';
      return element
    }
    
    // Populate the tables with data
    for (var i = 0; i < medalData.length; i++) {
      var countryData = medalData[i];
      var tableRow= createTableRow(countryData);
      
      if (i < 10) {
        topCountriesTableBody.appendChild(tableRow);
      } else {
        otherCountriesTableBody.appendChild(tableRow);
      }
    }
  });