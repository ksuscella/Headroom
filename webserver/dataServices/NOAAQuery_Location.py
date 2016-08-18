import urllib
import urllib2
import requests
import json

#http://forecast.weather.gov/MapClick.php?lat=26.918349&lon=-80.132422&FcstType=json
#OpenWeatherMap ksuscella M@xH3adR00m
#api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=5f018c2fe12dc2b622ee90163869bd6f
#5f018c2fe12dc2b622ee90163869bd6f
#Wikipedia Site
#url =  'http://forecast.weather.gov/MapClick.php'
#url = 'http://forecast.weather.gov/MapClick.php?lat=26.918349&lon=-80.132422&FcstType=json'
#http://forecast.weather.gov/MapClick.php?lat=44.9055&lon=-122.8107&lg=english&FcstType=text#.V5a_pGOZiCQ
# geospatial query
#api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=5f018c2fe12dc2b622ee90163869bd6f
url =  'http://api.openweathermap.org/data/2.5/weather'
url =  'http://forecast.weather.gov/MapClick.php'
query_args = { 'lat':26.92,
               'lon': -80.12,
               'appid':'5f018c2fe12dc2b622ee90163869bd6f'
            }
query_args = {'lat': 26.92,
              'lon': -80.12,
              'FcstType':'json'
              }
# urlencode data (need urllib)
data = urllib.urlencode(query_args)

# Send HTTP POST request
request = requests.get(url,data)
if (request.ok):
    print(request.content)
    jData = json.loads(request.content)
    for x in range(0, 3):
        print jData['time']['startPeriodName'][x]
        #print jData['time']['tempLabel'][x]
        #print jData['data']['temperature'][x]
        #print jData['data']['weather'][x]
        print jData['data']['text'][x]
    print "current temperature: " + jData['currentobservation']['Temp']
##response = urllib2.urlopen(request)
#print response.read()
#parsed_json = json.load(response)

#print parsed_json
    


