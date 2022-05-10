from flask import Flask, request, url_for, render_template, redirect
import requests, validators
from subprocess import Popen
from urllib.parse import urlparse

app = Flask(__name__, static_url_path = '/static', static_folder = 'static')
app.config['DEBUG'] = True

Popen("bash run_services.sh", shell=True)

@app.route("/")
def start():
    return render_template("index.html")

@app.route("/check_existence", methods = ['POST'])
def ssrf():
    url = request.form['url']
    # protocol = str(urlparse(url).scheme)
    # hostServ = str(urlparse(url).netloc)
    # isLocalService = "127.0.0.1" in hostServ or "0.0.0.0" in hostServ or "localhost" in hostServ
    # if not validators.url(url) or "http" not in protocol or isLocalService:
    if not validators.url(url) or "http" not in str(urlparse(url).scheme):
        return render_template("index.html", result = "The URL schema is not valid.")
    try:
        requests.head(url, timeout=2.000)
        return render_template("index.html", result = "Webpage found!")
    except Exception as e:
        if "NewConnectionError" in str(e):
            return render_template("index.html", result = "Target resource is not reacheable.")
        else:
            return render_template("index.html", result = "Target resource is reacheable!")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")


if __name__ == "__main__":
  app.run(host = '0.0.0.0')

