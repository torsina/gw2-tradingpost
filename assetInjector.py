from pathlib import Path
import os
class AssetInjector:
    def __init__(self):
        self.newJs = open("mainFiles/js/prefetch.js", "r").read()
        self.newHtml = open("mainFiles/html/TP.html", "r").read()
        self.isWorking = False


    def response(self, flow):
        if not self.isWorking:
            self.isWorking = True
            print("working")


        # tradingpost js prefetch injector
        if "gemstore" in flow.request.pretty_url:
            flow.response.headers["cache-control"] = "no-cache, no-store, must-revalidate"
            print("GEMSTORE WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
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
        if "2tradingpost.staticwars.com" in flow.request.pretty_url:
            flow.response.headers["cache-control"] = "no-cache, no-store, must-revalidate"
            flow.response.headers["Expires"] = "0"
            # handle combo requests
            if "&" in flow.request.pretty_url:
                baseUrl = "2tradingpost.staticwars.com/combo/_"
                filesPaths = flow.request.pretty_url.replace(baseUrl, "")
                filesPaths = filesPaths.replace("https://", "")
                filesPaths = filesPaths.split("&")
                for filePath in filesPaths:
                    try:
                        injectedFile = open("./" + baseUrl + filePath, "r").read()
                    except FileExistsError:
                        print("Couldn't inject the file: " + filePath)

                        folderPath = filePath.split("/")
                        folderPath = join_l(folderPath[:-1], "/")
                        if not os.path.exists("./" + folderPath):
                            os.makedirs("./" + folderPath)
                        newFile = open("./" + filePath, "wb")
                        newFile.write(flow.response.content)
                        newFile.close()
                        pass
                    else:
                        flow.response.text += injectedFile
                        print("Injected the file: " + filePath)
            else:
                path = flow.request.pretty_url
                path = path.replace("https://", "")
                pathObject = Path("./" + path)
                exists = pathObject.is_file()
                if exists and not ".svg" in path and not ".png" in path:
                    try:
                        injectedFile = open("./" + path, "r").read()
                    except FileExistsError:
                        flow.response.text = flow.response.text
                        print("Couldn't inject the file: " + path)
                        pass
                    else:
                        flow.response.text = injectedFile
                        print("Injected the file: " + path)
                else:
                    print("Couldn't inject the file: " + path)
                    folderPath = path.split("/")
                    folderPath = join_l(folderPath[:-1], "/")
                    if not os.path.exists("./" + folderPath):
                        os.makedirs("./" + folderPath)
                    newFile = open("./" + path, "wb")
                    newFile.write(flow.response.content)
                    newFile.close()

def join_l(l, sep):
    li = iter(l)
    string = str(next(li))
    for i in li:
        string += str(sep) + str(i)
    return string

addons = [
    AssetInjector()
]
