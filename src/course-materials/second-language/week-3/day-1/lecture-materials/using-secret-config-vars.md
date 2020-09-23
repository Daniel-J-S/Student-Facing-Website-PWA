---
track: "Second Language"
title: "Using Secret Config Vars"
week: 3
day: 1
type: "walk-thru"
---


# Using "secret" config vars in Django

<br>
<br>

[Click here](https://generalassembly.zoom.us/rec/share/nKz6qA8hM2WZ49nVadJjm6fLXS9Qsch2UmSsuZg9sQqYSNKWg3fAqutuTJyPCo_R.Olus9e_jJWRO5wgc?startTime=1600100641000) to access walk-thru recording

<br>
<br>




If you need to use secret keys in your Django project for API access, etc., here’s an approach very similar to what we did in Express:

1. `$ pip3 install django-environ`

<br>
<br>


2. Create a `.env` file in the same folder where `settings.py` is.

<br>
<br>


3. Put your secrets inside of `.env` (one per line, no spaces). For example:

	```python
	SECRET_KEY=abc123
	```
<br>
<br>


4. Anywhere in `settings.py` add this code:
	
	```python
	import environ
	environ.Env()
	environ.Env.read_env()
	```

<br>
<br>


5. Then in whatever module you need access to the secrets:
	
	```python
	import os
	
	def some_function(request):
	    my_key = os.environ['SECRET_KEY']
	```

<br>
<br>


Don’t forget after deploying, you’ll need to set the exact same config vars in Heroku using `config:set`, for example:

```bash
$ config:set SECRET_KEY=abc123
```