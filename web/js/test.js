var loc_stats = []

for (i = 0; i < 10; i++) { 
    b = {ltime: new Date(), lat: 26.91848456716815, lng: -80.13254900079171}
    loc_stats.push(b);
}

console.log(loc_stats.length)

var lat = []
var lng = []
for (i=0; i < loc_stats.length; i++)
    lat.push(loc_stats[i].lat)
    //lng.push(loc_stats[i].lng)
console.log(math.std(lat))
//console.log(math.std(lng))