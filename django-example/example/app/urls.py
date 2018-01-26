from django.conf.urls import url
from views import download, upload, finalize

urlpatterns = [
    url(r'^d/(?P<pk>.+?)$', download, name="download"),
    url(r'^finalize/(?P<prefix>.*?)$', finalize, name="finalize"),
    url(r'^$', upload, name="upload"),
    ]
