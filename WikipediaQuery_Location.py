import urllib
import urllib2
import json


#Wikipedia Site
url = 'https://en.wikipedia.org/w/api.php'

# geospatial query
query_args = { 'action':'query',
               'list': 'geosearch',
               'gsradius': '10000',
               'gscoord': '26.918349|-80.132422',
               'format': 'json'
            }

# urlencode data (need urllib)
data = urllib.urlencode(query_args)

# Send HTTP POST request
request = urllib2.Request(url, data)

response = urllib2.urlopen(request)
parsed_json = json.load(response)

for results in parsed_json['query']['geosearch']:
    pageid = results['pageid']
    title = results['title']
    #print results['lat']
    #print results['lon']
    #print results['dist']
    query_args2 = { 'action':'query',
                'prop': 'extracts',
                'pageids': pageid,
                'format': 'json',
                'explaintext':'',
                'exintro':''
            }
    # urlencode data (need urllib)
    data = urllib.urlencode(query_args2)

    # Send HTTP POST request
    request = urllib2.Request(url, data)
    response = urllib2.urlopen(request)
    
    #Need to come back and optimize
    parsed_json = json.load(response)
    extract = parsed_json['query']['pages']
    a_id = extract.keys()[0]
    p = extract.get(a_id)
    
    # dump into database
    stuff = json.dumps(p['extract'].encode('utf-8'))
    print(stuff)
    


