function addHR(){
  var node = document.getElementById("amiiboResults");
  var hrTag = document.createElement("HR");
  node.appendChild(hrTag);
};

function ifNull(data){
  if(data === null){
    return "N/A";
  }
  else{
    return data;
  }
};

document.getElementById("amiiboSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const name = document.getElementById("amiiboInput").value;
  if (name === "")
    return;
  console.log(name);
  const url = "https://www.amiiboapi.com/api/amiibo/?amiiboSeries=" + name;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      for (let i=0; i < json.amiibo.length; i++) {
        results += "<div id=\"hider\">";
        results += "Name:  " + json.amiibo[i].name;
        results += "<br>Series:  " + json.amiibo[i].amiiboSeries;
        results += "<br><img src=\"" + json.amiibo[i].image + "\">";
        results += "<br>  AU:  ";
        results += ifNull(json.amiibo[i].release.au);

        results += "<br>  EU:  ";
        results += ifNull(json.amiibo[i].release.eu);

        results += "<br>  JP:  ";
        results += ifNull(json.amiibo[i].release.jp);

        results += "<br>  NA:  ";
        results += ifNull(json.amiibo[i].release.na);
        results += "</div>";
      }
      document.getElementById("amiiboResults").innerHTML = results;
    });

    document.getElementById("amiiboInput").value = "";
});

document.getElementById("amiiboList").addEventListener("click", function(event) {
  event.preventDefault();
  const url = "https://www.amiiboapi.com/api/amiiboseries";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      for (let i=0; i < json.amiibo.length; i++) {
        results += "<div>";
        results += json.amiibo[i].name;
        results += "</div>";
      }
      document.getElementById("amiiboSeriesResults").innerHTML = results;
    });
});
