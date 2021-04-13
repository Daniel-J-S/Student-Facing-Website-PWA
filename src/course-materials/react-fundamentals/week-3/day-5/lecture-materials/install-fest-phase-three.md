---
track: "Second Language"
title: "Install-fest Phase Three"
week: 3
day: 5
type: "lecture"
---

# Install-fest Phase Three - Ruby Environment Setup

<br>
<br>
<br>


### &#x26A0; Uninstall RVM (Ruby Version Manager)

To check if you have RVM installed simply run the command `rvm`. If it is not intalled you'll see the message `command not found: rvm`

<img src="https://i.imgur.com/Vs12OwE.png" alt width=400 />

If it is installed then uninstall rvm by following these instructions: 
- [uninstall rvm](https://installvirtual.com/how-to-uninstall-rvm-implode-rvm-on-mac/)

Once you have removed rvm close and reopen the terminal.  Then test running the rvm command and confrim it's been removed.


<br>
<br>
<br>


### Install rbenv

- If homebrew is installed, run `brew upgrade` to upgrade to the latest version of homebrew
	* Might take a while, might upgrade stuff for postgres, node, heroku, etc.
- Run `brew update` to update the list of installable programs by homebrew
	* Might say Already up-to-date

rbenv is a version manager for Ruby. We don't want to use our system Ruby because we can mess with it. Instead, let's get an up to date version of Ruby that is safe to mess with.

- Check if rbenv already installed: `rbenv`
- If already exists, upgrade with:

```shell
brew upgrade rbenv ruby-build
```

Otherwise:

```shell
brew install rbenv ruby-build
```

<br>
<br>
<br>

### View Possible Ruby Versions
**See which versions of Ruby you can download**
```shell
rbenv install --list
```
There will be stuff like `rbx` and `jruby`, we are only interested in the ones that start with numbers.  
You should see outputs similar to the following:

<img src="https://i.imgur.com/lVhFWiW.png" alt width=400 />

Or you can try using the `rbenv install --list-all` command to list all the versions. In the middle of the list, you will see outputs like: 

<img src="https://i.imgur.com/XNvBwbh.png" alt width=200 />

Either command is fine, you need to choose the version of ruby before `jruby-someversion` or `-dev`

<br>
<br>
<br>


### Install Latest Ruby
**Install the latest version of Ruby**

At the time of updating this readme the current version was 2.7.1 but that will change so install the version before `-dev`. 


```shell
rbenv install 2.7.1
```

* There is no way within rbenv just to get the latest stable version
* You **must** install Ruby 2.2.2 or greater for Rails 5.
* Install might take a long time -- Terminal could just look like it's hanging

> ruby-build: use readline from homebrew
>
> Installed ruby-2.7.1 to /usr/local/var/rbenv/versions/2.7.1

<br>
<br>
<br>

### View Installed Versions of Ruby

```shell
rbenv versions
```

![screenshot](https://i.imgur.com/ZEICt8R.png)

* system is your system Ruby
* asterisk is next to the version that you are using

<br>
<br>
<br>


### View Currently Running Version of Ruby

```shell
rbenv version
```


<br>
<br>
<br>


### Switch rbenv to a different Version of Ruby

```shell
rbenv global 2.7.1
```

Check with `rbenv versions`. Asterisk should be next to 2.7.1

Tell the computer we've switch versions of ruby and confirm:

```shell
rbenv rehash

rbenv versions
```

**CLOSE AND RESTART TERMINAL**

<br>
<br>
<br>



### Update Environment to use new Ruby

Confirm ruby version _now in use by the system_ is `2.5.3p111` or something similar

```shell
ruby -v
```

IF NOT

```shell
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

* (replace `.bash_profile` with `.zshrc` if you're using zsh)

```shell
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
```

* (replace `.bash_profile` with `.zshrc` if you're using zsh)
	
`$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile`
	* (replace `.bash_profile` with `.zshrc` if you're using zsh)
	
Close and repoen the terminal and confirm ruby version _now in use by the system_ is `2.7.1` or something similar

```shell
ruby -v
```

<br>
<br>
<br>

### Install a gem

Gems are like NPM packages for Ruby, but they're installed globally, as opposed to multiple times for each application that you build.

The steps below will confirm that you are able to install a gem.  The gem is called `pry` which is one of the available ruby terminal shells we can use to run ruby commands via the terminal. 

1. List gems with `gem list`
1. Run `gem install pry` to install a gem called pry.  It's a ruby REPL command
1. Run `rbenv rehash` to tell computer we've installed a new gem
1. List gems with `gem list` look for `pry`
1. Run `pry` to start pry command
1. Inside pry type `2 + 2`
1. If that works, type quit

Note: 
- If you are getting a permissions error you can aadd `sudo` in front of the command for now.
- Might need to update the gem manager with `gem update --system`

<br>
<br>
<br>



### Install Rails 5.2 beta

1. Run `gem install rails --pre` to install the rails commands
2. `rbenv rehash`
3. `rails -v`


<img src="https://i.imgur.com/LgInpgn.png" alt width=200 />



Note: if Rails already installed, might need to run `bundle update rails`

<br>
<br>
<br>


### Test Rails
1. Run `rails new blog` to create a new app
2. `cd blog`
3. Run `rails s` to start the server
   - If `rails s` throws errors, you need to run `rails webpacker:install`, and then, run `rails s` again.
   - If `rails webpacker:install` throws errors, you may need to - [download yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable), and then, run `rails webpacker:install` again.
6. Now, everything should be good. 
<img src="https://i.imgur.com/yvr70Hj.png" alt width=400 />
7. Ready to see something cool? Go to `http://localhost:3000`

<img src="https://i.imgur.com/ig6BSe5.png" alt width=400 />