from django.conf.urls import patterns, url
from views import download, upload, finalize

urlpatterns = patterns(
    'ossample.views',
    url(r'^d/(?P<pk>.+?)$', download, name="download"),
    url(r'^finalize/(?P<prefix>.*?)$', finalize, name="finalize"),
    url(r'^$', upload, name="upload"),
    )
