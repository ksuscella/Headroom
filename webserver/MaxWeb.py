import tornado.escape
import tornado.ioloop
import tornado.web
import os

# Simple web server that serves html content from /Users/kirk/Documents/GoMaxGo/headroom/web/
# url http://localhost:8889/web/index.html

#static_path = "/Users/kirk/Documents/GoMaxGo/headroom/web/" #-Removed hard path
static_path = os.path.join(os.path.dirname(os.path.dirname(__file__)),"web")

application = tornado.web.Application([
    (r"/web/(.*)",tornado.web.StaticFileHandler, {"path": static_path}) 
])
 
if __name__ == "__main__":
    application.listen(8889)
    tornado.ioloop.IOLoop.instance().start()