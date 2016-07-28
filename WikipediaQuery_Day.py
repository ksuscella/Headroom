import urllib
import urllib2
import json


#Wikipedia Site
url = 'https://en.wikipedia.org/w/api.php'

#action=query&format=json&prop=extracts&meta=siteinfo&indexpageids=1&continue=&titles=July+25&exsectionformat=wiki
query_args = { 'action':'query',
               'format': 'json',
               'prop':'extracts',
               'meta':'siteinfo',
               'indexpageids':'1',
               'continue':'',
               'titles':'July 25',
               'exsectionformat':'wiki'
               
            }

# urlencode data (need urllib)
data = urllib.urlencode(query_args)

# Send HTTP POST request
request = urllib2.Request(url, data)

response = urllib2.urlopen(request)
parsed_json = json.load(response)

#print json.dumps(parsed_json)
    
#Need to come back and optimize
extract = parsed_json['query']['pages']
a_id = extract.keys()[0]
p = extract.get(a_id)
    
# dump into database
stuff = json.dumps(p['extract'].encode('utf-8'))
print(stuff)
    


