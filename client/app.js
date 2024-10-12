function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
        if(uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; // Invalid Value
  }
  
  function getBalconyValue() {
      var uiBalcony = document.getElementsByName("uiBalcony");
      for(var i in uiBalcony) {
          if(uiBalcony[i].checked) {
              return parseInt(uiBalcony[i].value);
          }
      }
      return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
        if(uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var balcony = getBalconyValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price"; // Replace with your actual Flask server URL
  
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location,
        balcony: balcony
    }, function(data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakhs</h2>";
    });
  }
  
  function onPageLoad() {
    var url = "http://127.0.0.1:5000/get_location_names"; // Replace with your actual Flask server URL
    $.get(url, function(data, status) {
        if(data) {
            var locations = data.location;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty(); // Clear existing options
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  function toggleTheme() {
    const body = document.body;
    const themeSwitch = document.getElementById('themeSwitch');
    
    // Toggle the dark-theme class on the body
    body.classList.toggle('dark-theme');
    
    // Update the button text based on the current theme
    if (body.classList.contains('dark-theme')) {
        themeSwitch.textContent = '🌜 Switch to Light Mode';
    } else {
        themeSwitch.textContent = '🌞 Switch to Dark Mode';
    }
}

  window.onload = onPageLoad;
  