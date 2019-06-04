class LauncherInjector:
    def __init__(self):
        self.circualrJSON = open("launcher inject/circularJSON.js", "r").read()
        self.jquery = open("launcher inject/jquery.js", "r").read()
        self.socketio = open("launcher inject/socket.io.js", "r").read()
        self.client = open("launcher inject/client.js", "r").read()
        self.isWorking = False


    def response(self, flow):
        if not self.isWorking:
            self.isWorking = True
            print("working")

        # tradingpost js prefetch injector
        if "https://www.google-analytics.com/analytics.js" in flow.request.pretty_url:
            flow.response.headers["cache-control"] = "no-cache, no-store, must-revalidate"
            flow.response.headers["Expires"] = "0"
            print("launcher google analytics inject")
            flow.response.text += "\n" + self.circualrJSON + "\n" + self.jquery + "\n" + self.socketio + "\n" + self.client



addons = [
    LauncherInjector()
]
