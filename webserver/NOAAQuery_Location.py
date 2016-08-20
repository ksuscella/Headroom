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

class NOAAQueryLoc:

    url =  'http://api.openweathermap.org/data/2.5/weather'
    url =  'http://forecast.weather.gov/MapClick.php'
    query_args = ''
    
    def __init__(self, lat, lng):
        # geospatial query - arguments to pass into
        self.query_args = {
            'lat': lat,
            'lon': lng,
            'appid': '5f018c2fe12dc2b622ee90163869bd6f',
            'FcstType':'json'
        }
        
    def getResults(self):
        
        # urlencode data (need urllib)
        data = urllib.urlencode(self.query_args)
    
        # Send HTTP POST request
        request = requests.get(self.url,data)
        
        #if (request.ok): -> Need to improve error handling
        jData = json.loads(request.content) #Get Info
        
        data_rt = []
        data = {}
        data['current_temp'] = jData['currentobservation']['Temp']
        data_rt.append(data)
        for x in range(0, 3):
            data = {}
            data['day'] = jData['time']['startPeriodName'][x]
            data['description'] = jData['data']['text'][x]
            data_rt.append(data)
            
        return json.dumps(data_rt)



