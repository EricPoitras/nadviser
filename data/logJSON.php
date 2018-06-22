<?php
$filename = 'results.json';
$somecontent = $_POST['data'];

if(is_writable($filename)){
    if(!$handle = fopen($filename,'a')){
        echo "Cannot open file ($filename)";
        exit;
    }
    if(fwrite($handle,$somecontent)===FALSE){
        echo "Cannot write to file ($filename)";
        exit;
    }
    
    echo "Success, wrote content to file";
    
    fclose($handle);
} else{
    echo "The file $filename is not writable";
}

    //$fp = fopen('results.json', 'w');
    //fwrite($fp, $_POST['data']);
    //fclose($fp);
    //echo "Success"
?>