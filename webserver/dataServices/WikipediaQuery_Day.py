import urllib
import urllib2
import json
from HTMLParser import HTMLParser

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
    #def handle_starttag(self, tag, attrs):
    #    print "Encountered a start tag:", tag

    #def handle_endtag(self, tag):
    #    print "Encountered an end tag :", tag

    def handle_data(self, data):
        print "Encountered some data  :", data


#Wikipedia Site
url = 'https://en.wikipedia.org/w/api.php'

#action=query&format=json&prop=extracts&meta=siteinfo&indexpageids=1&continue=&titles=July+25&exsectionformat=wiki
query_args = { 'action':'query',
               'format': 'json',
               'prop':'extracts',
               'meta':'siteinfo',
               'titles':'August 17'
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
    
# instantiate the parser and fed it some HTML
#parser = MyHTMLParser()
#parser.feed(p['extract'].encode('utf-8'))    


