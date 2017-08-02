import pandas as pd
import operator
import csv
line_info = []
dot_info = []

if __name__ == '__main__':

    loc = pd.read_csv('data/locations.csv')

    for k in loc.iterrows():
        dot_info.append({
                'y': k[1]['dropoff_latitude'],
                'x': k[1]['dropoff_longitude'],
                'id': k[0],
                'location': ''
            })
    map = pd.read_json('data/NewYorkbyNeighbourhood.json')
    i = 0
    p=0
    line_info = []

    for k in map.features:
        line_info.append({
            'name': k['properties']['neighborhood'],
            'coords': [],
            'count': 0
        })
        for l in k['geometry']['coordinates'][0]:
            line_info[i]['coords'].append({
                    'x': l[0],
                    'y': l[1]
                })
    i+=1
    for test in dot_info:
        i=0
        fails = 0
        successes = 0
        f = 0
        s = 0
        testProb = 0
        prob = 0
        name = ''

        for m in line_info:
            n = m['coords'][0]
            for g in m['coords']:
                if test['x'] <= g['x'] and test['x'] >= n['x']:
                    if test['y'] <= g['y'] and test['y'] >= n['y']:
                        s+=1
                    elif test['y'] >= g['y'] and test['y'] <= n['y']:
                        s+=1

                elif test['x'] >= g['x'] and test['x'] <= n['x']:
                    if test['y'] <= g['y'] and test['y'] >= n['y']:
                        s+=1
                    elif test['y'] >= g['y'] and test['y'] <= n['y']:
                        s+=1
                else:
                    f+=1
                testProb = s/(s+f)
                if testProb > prob:
                    prob = testProb
                    test['location'] = m['name']
            if testProb ==0 and prob ==0:
                fails +=1
            else:
                successes +=1
       # print(name, 'most likely with ', prob)
        points = pd.DataFrame.from_dict(dot_info)
        print(points)
        points.to_csv('output_dropoffs.csv')
        poly[]
        for k in line_info:
            for g in k['coords']:
                poly.append([k['x'],k['y']])
