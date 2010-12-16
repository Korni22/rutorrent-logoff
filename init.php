<?php
eval(getPluginConf("logoff"));

$me = getUser();
$users = array();

$dirs = scandir($rootPath . "/share/users/");
if ($dirs && count($dirs) > 0)
    foreach ($dirs as $dir)
        if ($dir[0] != "." && $dir != $me)
            $users[] = $dir;

$jResult .= "plugin.logoffURL = '" . $logoffURL . "';";
$jResult .= "plugin.me = '" . $me . "';";
$jResult .= "plugin.users = " . json_encode($users) . ";";
$jResult .= "plugin.allowSwitch = " . json_encode(explode(",", $allowSwitch)) . ";";

$theSettings->registerPlugin("logoff");
?>
