import urllib
import urllib2
import json

class WikiQueryLoc:
    
    #Wikipedia Site
    url_path = 'https://en.wikipedia.org/w/api.php'
    query_args = ''
    
    def __init__(self, lat, lng):
        
        loc = lat + '|' + lng   #Prepare coordinate
        
        # geospatial query
        self.query_args = { 'action':'query',
            'list': 'geosearch',
            'gsradius': '10000',    #Meters
            'gscoord': loc,
            'format': 'json'
        }
        
        
        
    def getResults(self):
        # urlencode data (need urllib)
        data = urllib.urlencode(self.query_args)
        
        # Send HTTP POST request
        request = urllib2.Request(self.url_path, data)
        
        response = urllib2.urlopen(request)
        parsed_json = json.load(response)
        
        cnt = 0
        
        data_rt = []
        for results in parsed_json['query']['geosearch']:
            data = {}
            data['pageid'] = results['pageid']
            data['title'] =  results['title']
            data['dist'] = results['dist']
            
            data_rt.append(data)
            cnt +=1

        return json.dumps(data_rt)
        


