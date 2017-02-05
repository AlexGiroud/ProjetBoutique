'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');



var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    var sys = require('util')
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("cd client/ && ionic serve -p 80 81", puts);
    exec("curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '[   \     {   \        \"name\":\"Intel Core i3-7320 (4.1 GHz)\", \        \"price\":185.95, \        \"description\":\"Idéals pour jouer, travailler ou vous divertir, les processeurs Intel Kaby ake délivrent encore plus de puissance que les processeurs Intel de la génération précédente, grâce à des fréquences de fonctionnement natives revues à la hausse et à un contrôleur graphique encore plus performant.\", \      \"inStock\":true, \ \"imageUrl\":\"http://media.ldlc.com/ld/products/00/04/11/03/LD0004110341_2_0004110389.jpg\" \     }, \     {   \        \"name\":\"Intel Core i5-4670K (3.4 GHz)\", \        \"price\":269.95, \        \"description\":\"Adaptez votre puissance grâce au processeur Haswell Intel Core i5-4670K (3.4 Hz). Le processeur pour PC de bureau Intel Core i5-4670K (3.4 GHz) délivre des performances avec Turbo pour les derniers jeux PC et pour un multitâche fluide.\", \        \"inStock\":true, \        \"imageUrl\":\"http://media.ldlc.com/ld/products/00/01/28/71/LD0001287199_2.jpg\" \     }, \    {  \        \"name\":\"Ballistix Elite 16 Go (4 x 4 Go) DDR3 1600 MHz CL8\", \       \"price\":198.95, \        \"description\":\"Kit Quad Channel RAM DDR3 PC12800 - BLE4CP4G3D1608DE1TX0BEU (garantie à vie par Crucial)\", \        \"inStock\":true, \ \"imageUrl\":\"http://media.ldlc.com/ld/products/00/01/25/13/LD0001251393_2.jpg\" \     } \  ]' 'http://localhost:3000/api/produits'", puts);
  });

};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
  //
});