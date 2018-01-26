Example apps for OpenStack Swift
================================

This repository contains two example applications for OpenStack Swift.
One app is a server-side app using Django, the other one a
client-side app using Angular.

Environment setup
-----------------

This makes it easier to use the swift CLI and also installs the required Python
packages.

	virtualenv sampleenv
	source sampleenv/bin/activate
	pip install django=1.11 python-swiftclient
	export ST_AUTH=http://192.168.8.80:8080/auth/v1.0
	export ST_KEY=testing
	export ST_USER=test:tester

Getting started
---------------
You'll need a running Swift all in one (SAIO) environment to use these examples.

One simply way is to run a single-replica environment in a Docker container,
for example using https://github.com/cschwede/dockerswift/.

Once the container is running, check that you can access the proxy:

    curl -I http://127.0.0.1:8080/info


Django example
--------------

The example uses http://192.168.8.80:8080/ as proxy URL by default. If your proxy is not
accessible using this hostname you have to change the setting in
django-swift-example/example/settings.py .

You can run the example in the following manner:

    cd django-example
    python manage.py migrate
    python manage.py runserver 0.0.0.0:8000

Angular example
---------------
The easiest way to start is to store the examples in a public readable container
within Swift itself. For example:

    cd angular-example
    swift post -r ".r:*,.rlistings" public
    swift upload public angular.min.js
    swift upload public example_*

Afterwards you can access the examples in your browser using the URL
http://192.168.8.80:8080/v1/AUTH_test/public/example_01.html
