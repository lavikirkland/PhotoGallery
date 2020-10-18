import requests
import pprint
import urllib
import PIL.Image

URL = 'https://unsplash.com/t/nature'
page = requests.get(URL)

# pprint.pprint(page.content)
urllib.request.urlretrieve("https://images.unsplash.com/photo-1601404392031-e60fccba272c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60", "sample.jpg")
img = PIL.Image.open("sample.jpg")
print(img)
img.show()