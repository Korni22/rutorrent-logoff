# Introduction #

Here you can find information on how to install the logoff plugin. Of course you need [rutorrent](http://code.google.com/p/rutorrent/) before you install this plugin.


## Details ##

**Note:** to download/edit files in your web directory you most likely need either _**root**_ or _**sudo**_. Also your web directory and web user might differ from this guide.


### Installation ###

move to your rutorrent plugins directory:
```
cd /var/www/rutorrent/plugins/
```

download the plugin from SVN:
```
svn checkout http://rutorrent-logoff.googlecode.com/svn/trunk/ logoff
```

**or** download the plugin tarball and unpack it (make sure to check for the latest version on the [downloads](http://code.google.com/p/rutorrent-logoff/downloads/list) page):
```
wget http://rutorrent-chat.googlecode.com/files/logoff-1.3.tar.gz
tar -zxf logoff-1.3.tar.gz
rm logoff-1.3.tar.gz
```

and change the ownership of the files to your web user:
```
chown -R www-user:www-user logoff/
```


## Configuration ##

In the `conf.php` file you can find a couple settings you can change:

```
$logoffURL = "http://google.com/";
```
Here you can set the URL where users get redirected to after they have logged out.

```
$abortMs = 1000;
```
Here you can change the time after which the XMLHttpRequest will be aborted for non-IE and non-FF browsers.

**Note**: set this too low and you won't be logged off, set it too high and you will get the auth popup before being redirected.

```
$allowSwitch = "scars,user1,user2";
```
This is a comma separated list of users who are allowed to switch user. If a username is **not** in this list he will _only_ get the option to log off or cancel.


### Finished ###

You can now start using the plugin!