import json
import os
import urllib.request
from jsbeautifier import beautify
url = 'https://2tradingpost.staticwars.com/combo/_/app/app-ntp.367b7fd4.js'
#response = urllib.request.urlopen(url)
#data = response.read()      # a `bytes` object
#text = data.decode('utf-8') # a `str`; this step can't be used if data is binary


json_data=open("./YUI.json").read()

data = json.loads(json_data)

objects = []

for firstLayer in data.keys():
    urlBase = data[firstLayer]["comboBase"] + data[firstLayer]["root"]
    for moduleName in data[firstLayer]["modules"].keys():
        module = data[firstLayer]["modules"][moduleName]
        moduleFile = str(module["path"])
        file = {
            'url': urlBase + moduleFile,
            'fileName': moduleFile,
            'folderPath': str(urlBase).replace("https://", "")
        }
        objects.append(file)

objects.append({
    'url': "https://2tradingpost.staticwars.com/combo/_/gw2/button/button.bc5b6f51.js",
    'fileName': 'button.bc5b6f51.js',
    'folderName': '2tradingpost.staticwars.com/combo/_/gw2/button/'
})

for asset in objects:
    print(asset["url"])
    response = urllib.request.urlopen(asset["url"])
    data = response.read()      # a `bytes` object
    text = data.decode('utf-8') # a `str`; this step can't be used if data is binary
    if not os.path.exists("./" + asset["folderPath"]):
        os.makedirs("./" + asset["folderPath"])
    savedFile = open("./" + asset["folderPath"] + asset["fileName"], "w")
    if ".css" in asset["fileName"]:
        savedFile.write(text)
    else:
        savedFile.write(beautify(text))
    savedFile.close()
