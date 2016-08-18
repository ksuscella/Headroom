txt = '[{"dist": 2021.9, "pageid": 9116857, "title": "North Palm Beach Heights"}, {"dist": 2878.4, "pageid": 109600, "title": "Jupiter, Florida"}, {"dist": 2901, "pageid": 7187853, "title": "Jupiter Community High School"}, {"dist": 2966.3, "pageid": 109610, "title": "Limestone Creek, Florida"}, {"dist": 3510.5, "pageid": 32304675, "title": "WJUP-LP"}, {"dist": 3526.9, "pageid": 36152977, "title": "Abacoa, Florida"}, {"dist": 4124.9, "pageid": 35751290, "title": "Riverbend Park"}, {"dist": 4193.2, "pageid": 34402063, "title": "Max Planck Florida Institute for Neuroscience"}, {"dist": 4299.4, "pageid": 9544799, "title": "Loxahatchee River"}, {"dist": 5398.9, "pageid": 5848421, "title": "William T. Dwyer High School"}]'
json_results = JSON.parse(txt);
console.log(json_results);
console.log('');

var article_list = [];  //keep track of articles already played
var m_pageid = 0;
var m_title = '';
var m_dist = 99999;

runTest();
function runTest() {
   
    for (var key in json_results) {
      if (json_results.hasOwnProperty(key)) {
        //Lets find the closest article
        if (json_results[key].dist < m_dist) {
            //Did we already pick this article?
            console.log(article_list.indexOf('goodbye'));
            m_dist = json_results[key].dist;
            m_pageid = json_results[key].pageid;
            m_title = json_results[key].title;
        }
        //console.log(key + " -> " + json_results[key].dist);
        //console.log(key + " -> " + json_results[key].pageid);
        //console.log(key + " -> " + json_results[key].title);
      }
    }
    console.log(m_pageid + ', ' + m_title + ', ' + m_dist);
}

function runTest2() {
    var ages = [3, 10, 18, 20];
    console.log(ages.find(18));
}