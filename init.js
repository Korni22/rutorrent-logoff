plugin.loadMainCSS();
plugin.loadLang();

plugin.onLangLoaded = function()
{
    var before = (theWebUI.systemInfo.rTorrent.started ? "add" : "settings");
    this.addButtonToToolbar("logoff", theUILang.logoff + " (" + plugin.me + ")", "theDialogManager.show('logoffDlg')", before);
    this.addSeparatorToToolbar(before);
    var multi = false;

    if (plugin.allowSwitch) {
        var options = "";
        for (var i = 0; i < plugin.users.length; i++)
            options += "<option value=\"" + plugin.users[i] + "\">" + plugin.users[i] + "</option>";

        var switchUser = "";
        if (options != "") {
            multi = true;
            switchUser = ""+
            "<div>"+
                "<label for=\"login.username\">" + theUILang.logoffUsername + ":</label> "+
                "<select id=\"login.username\">"+
                    options+
                "</select>"+
            "</div>"+
            "<div>"+
                "<label for=\"login.password\">" + theUILang.logoffPassword + ":</label> <input type=\"password\" id=\"login.password\" class=\"Textbox\" /> <span id=\"logoffPassEmpty\"></span>"+
            "</div>";
        }
    }

    theDialogManager.make("logoffDlg", theUILang.logoff,
        "<div id=\"logoffDlg-content\">"+
            (multi ? theUILang.logoffSwitchPrompt + switchUser : theUILang.logoffPrompt)+
        "</div>"+
        "<div id=\"logoffDlg-buttons\" class=\"aright buttons-list\">"+
            (multi ? "<input type=\"button\" class=\"Button\" value=\"" + theUILang.logoffSwitch + "\" id=\"logoffSwitch\">" : "")+
            "<input type=\"button\" class=\"Button\" value=\"" + theUILang.logoff + "\" id=\"logoffComplete\">"+
            "<input type=\"button\" class=\"Button\" value=\"" + theUILang.Cancel + "\" id=\"logoffCancel\">"+
        "</div>",
    true);

    if (multi) {
        $("#logoffSwitch").click(function()
        {
            if ($($$("login.password")).val() == "") {
                $("#logoffPassEmpty").html(theUILang.logoffEmpty);
                return(false);
            }
            $("#logoffPassEmpty").html("");

            if (browser.isFirefox3x) {
                try {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", document.location.href, true, $($$("login.username")).val(), $($$("login.password")).val());
                    xmlhttp.onreadystatechange = function() { if (this.readyState == 4) theWebUI.reload(); };
                    xmlhttp.send(null);
                } catch (e) {}
            } else {
                try {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", this.action, true, $($$("login.username")).val(), $($$("login.password")).val());
                    xmlhttp.onreadystatechange = function() { if (this.readyState == 4) { document.location = this.action; theWebUI.reload(); } };
                    xmlhttp.send(null);
                } catch (e) {}
            }

            return(false);
        });
    }

    $("#logoffComplete").click(function()
    {
        try {
            if (browser.isIE7up) {
                document.execCommand("ClearAuthenticationCache");
                document.location = plugin.logoffURL;
            } else if (browser.isFirefox3x){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", document.location.href, true, "logoff", "logoff");
                xmlhttp.onreadystatechange = function() { if (this.readyState == 4) document.location = plugin.logoffURL; };
                xmlhttp.send(null);
                xmlhttp.abort();
            } else {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", this.action, true, "logoff", "logoff");
                xmlhttp.onreadystatechange = function() { if (this.readyState == 4) document.location = plugin.logoffURL; };
                xmlhttp.send(null);
            }
        } catch (e) {}

        return(false);
    });

    $("#logoffCancel").click(function()
    {
        theDialogManager.hide("logoffDlg");
        return(false);
    });
}

plugin.onRemove = function()
{
    theDialogManager.hide("logoffDlg");
    this.removeSeparatorFromToolbar(theWebUI.systemInfo.rTorrent.started ? "add" : "settings");
    this.removeButtonFromToolbar("logoff");
}
