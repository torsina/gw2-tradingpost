from pathlib import Path
import os as os
import json as json
import urllib
from subprocess import DEVNULL, STDOUT, check_call

class AssetInjector:
    def __init__(self):
        self.newJs = open("mainFiles/js/prefetch_96479.js", "r").read()
        self.newHtml = open("mainFiles/html/TP_96479.html", "r").read()
        self.injectedScript = open("./bot.js").read()
        self.promisePolyfill = open("./promise-polyfill.js", "r").read()
        self.newHtml = self.newHtml.replace("__PLACEHOLDER__", str(self.promisePolyfill) + "\n" + str(self.injectedScript))
        self.isWorking = False
        r = urllib.request.urlopen("https://api.guildwars2.com/v2/build")
        self.buildId = str(json.loads(r.read().decode("utf-8"))["id"])
        self.baseAssetPath = "./assetSaves/" + self.buildId + "/"



    def response(self, flow):
        if not self.isWorking:
            self.isWorking = True
            print("working")


        # tradingpost js prefetch injector
        if "gemstore" in flow.request.pretty_url:
            flow.response.headers["cache-control"] = "no-cache, no-store, must-revalidate"
            print(flow.request.pretty_url)
        # tradingpost js prefetch injector
        if "https://tradingpost-live.ncplatform.net/prefetch.js" in flow.request.pretty_url:
            flow.response.headers["cache-control"] = "no-cache, no-store, must-revalidate"
            flow.response.headers["Expires"] = "0"
            print("tradingpost js inject")
            flow.response.text = self.newJs

        # tradingpost main html injector
        if "https://tradingpost-" in flow.request.pretty_url and "-live.ncplatform.net/?" in flow.request.pretty_url:
            flow.response.headers["cache-control"] = "no-cache, no-store, must-revalidate"
            flow.response.headers["Expires"] = "0"
            print("tradingpost html inject")
            flow.response.text = self.newHtml

        # tradingpost asset injector
        # check for the dummy flag created when we want the real sources
        if "2tradingpost.staticwars.com" in flow.request.pretty_url and not checkHeadersForDummy(flow.request.headers):
            flow.response.headers["cache-control"] = "no-cache, no-store, must-revalidate"
            flow.response.headers["Expires"] = "0"
            # handle combo requests
            if "&" in flow.request.pretty_url:
                print("combo request")
                baseUrl = "2tradingpost.staticwars.com/combo/_"
                filesPaths = flow.request.pretty_url.replace(baseUrl, "")
                filesPaths = filesPaths.replace("https://", "")
                filesPaths = filesPaths.split("&")
                baseUrl = "2tradingpost.staticwars.com/"
                self.handleFiles(baseUrl, filesPaths, flow)
            # handle normal request
            else:
                path = flow.request.pretty_url
                path = path.replace("https://", "")
                print("normal request file: " + path)
                self.handleFile(path, flow)

    def handleFiles(self, basePath, paths, flow):
        flow.response.text = ""
        for path in paths:
            path = basePath + path
            try:
                injectedFile = open(self.baseAssetPath + path, "r").read()
            except FileNotFoundError:
                self.createFileIfNotSaved(path, flow, True)
                pass
            else:
                flow.response.text += injectedFile + "\n"
                print("Injected the file: " + self.buildId + "/" + path)



    def handleFile(self, path, flow):
        if ".png" in path[-4]:
            return
        try:
            injectedFile = open(self.baseAssetPath + path, "r").read()
        except FileNotFoundError:
            self.createFileIfNotSaved(path, flow)
            injectedFile = open(self.baseAssetPath + path, "r").read()
            pass
        else:
            flow.response.text = injectedFile
            print("Injected the file: " + self.buildId + "/" + path)

    def createFileIfNotSaved(self, path, flow, isComboRequest=False):
        print("Saved the file: " + self.buildId + "/" + path)
        folderPath = path.split("/")
        folderPath = join_l(folderPath[:-1], "/")
        if not os.path.exists(self.baseAssetPath + folderPath):
            os.makedirs(self.baseAssetPath + folderPath)
        newFile = open(self.baseAssetPath + path, "wb")
        if not isComboRequest:
            newFile.write(flow.response.content)
        else:
            content = self.getFileFromComboRequest(path)
            newFile.write(content)
        newFile.close()
        # js beautify
        if ".js" in flow.request.pretty_url \
                and ".css" not in flow.request.pretty_url \
                and ".svg" not in flow.request.pretty_url \
                and ".png" not in flow.request.pretty_url:
                check_call(['js-beautify', '-r', self.baseAssetPath + path], stdout=DEVNULL, stderr=STDOUT)

    def getFileFromComboRequest(self, url):
        print("asset request: " + "https://" + url)
        headers = {"foo": "bar"}
        req = urllib.request.Request("https://" + url, headers=headers)
        r = urllib.request.urlopen(req)
        return r.read()


def checkHeadersForDummy(headers):
    for header in headers:
        if header[0] == "foo":
            return True
    return False


def join_l(l, sep):
    li = iter(l)
    string = str(next(li))
    for i in li:
        string += str(sep) + str(i)
    return string

addons = [
    AssetInjector()
]


