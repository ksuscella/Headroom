from NOAAQuery_Location import NOAAQueryLoc


a = NOAAQueryLoc('26.92', '-80.13')
print a.getResults()

#import json
##multikeys = []
#for i in range(3):
#    multikeys.append(dict([(x, x**3) for x in xrange(1, 3)]))
##print json.dumps(multikeys, indent=4)
#
#print(dict([(x, x**3) for x in xrange(1, 3)]))
#
#a = {}
#a['1'] = 2
#a['2'] = 3
#a['3'] = 4
#
#print json.dumps(a, indent=4)
