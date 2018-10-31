<?php

require_once(realpath($_SERVER['DOCUMENT_ROOT']).'<t4 type="media" formatter="image/path" id="299228" />');  

/**
 * Optional debugging mode
 * mode = 1 for Chrome and Firefox
 * mode 2 for just Firefox
 * mode 3 for just Chrome
 * mode 0 when you have a HUGE-MONGOUS log, and
 *    HTTP headers break the server or browser...
 *    WARNING: mode 0 will echo the log in an HTML comment, so 
 *    no more http headers can be sent once you call QuantumPHP::send()
 *    (unless you use output buffering)
 * defaults to mode 2
 */
QuantumPHP::$MODE = 2;

// Optional debug size. Defaults to 5kB
// QuantumPHP::$HEADER_LIMIT = 16000;

// Logging strings
// QuantumPHP::log('Regular log');
// QuantumPHP::warn('Regular warn');
// QuantumPHP::error('Regular error');

// Logging strings, objects, or arrays
// QuantumPHP::add('Hello console table!');
// QuantumPHP::add('Something Bad','error');
// QuantumPHP::add('Something Really Bad','critical');
// QuantumPHP::log($_SERVER); // you will need mode 0 for this!

QuantumPHP::error("running 01");
QuantumPHP::send();

?>
