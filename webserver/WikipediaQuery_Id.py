import urllib
import urllib2
import json

class WikiQueryId:
    
    #Wikipedia Site
    url_path = 'https://en.wikipedia.org/w/api.php'
    query_args = ''
    
    def __init__(self, pageid):
        
        # page id query
        self.query_args = { 'action':'query',
            'prop': 'extracts',
            'pageids': pageid,
            'format': 'json',
            'explaintext':'',
            'exintro':''
        }
        
        
        
    def getResults(self):
        # urlencode data (need urllib)
        data = urllib.urlencode(self.query_args)
        
        # Send HTTP POST request
        request = urllib2.Request(self.url_path, data)
        
        response = urllib2.urlopen(request)
        parsed_json = json.load(response)
        
        extract = parsed_json['query']['pages']
        a_id = extract.keys()[0]
        p = extract.get(a_id)
            
        # dump into database
        stuff = json.dumps(p['extract'].encode('utf-8'))
        data_rt = []
        data = {}
        data['pageid'] = a_id
        data['extract'] = stuff
        
        data_rt.append(data)
        
        return json.dumps(data_rt)
    