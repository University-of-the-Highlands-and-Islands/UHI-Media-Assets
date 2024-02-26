 @echo off
 echo running

 REM
 REM compile all source files
 FOR %%I in (source/*.js) DO (

 	echo %%~nI%

 	 	"C:\Program Files\Java\jdk-18.0.2\bin\java" -jar compiler.jar --js source/%%~nI.js --create_source_map map/%%~nI-min.js.map --source_map_format=V3 --js_output_file min/%%~nI-min.js --source_map_location_mapping="source/%%~nI.js|/en/t4-media/one-web/university/admin-assets/js/source/%%~nI.js" --output_wrapper "%%output%% //# sourceMappingURL=/en/t4-media/one-web/university/admin-assets/js/map/%%~nI-min.js.map" --compilation_level SIMPLE_OPTIMIZATIONS

 	)

REM compile all plugins into single file
 "C:\Program Files\Java\jdk-18.0.2\bin\java" -jar compiler.jar --js plugins/*.js --create_source_map map/plugins-min.js.map --source_map_format=V3 --js_output_file min/plugins-min.js --source_map_location_mapping="source/plugins.js|/en/t4-media/one-web/university/admin-assets/js/source/plugins.js" --output_wrapper "%%output%% //# sourceMappingURL=/en/t4-media/one-web/university/admin-assets/js/map/plugins-min.js.map" --compilation_level SIMPLE_OPTIMIZATIONS
echo plugins

REM  --debug=true =>  will make the compiler rename variables by surrounding them with $ - instead of shortening them - This is so that you can map renamed values back to original one
REM
REM



pause