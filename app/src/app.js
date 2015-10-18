if (process.env.NODE_ENV === "development") {
  //
  // window.LiveReloadOptions = { host: 'localhost' }
  // console.log('test')
  // require('livereload-js')
}

//main
var React           = require("react"),
    Router          = require("react-router"),
    Fluxxor         = require("fluxxor")

var Tabletop        = require('tabletop').Tabletop
window.Tabletop     = Tabletop

//fluxxor
var actions         = require("actions"),
    routes          = require("routes"),
    loadData        = require('data/load-data')
//stores
var RouteStore          = require("stores/route-store"),
    EntityStore          = require("stores/entity-store")
    

//helpers
var _               = require('lodash')

//logging
var log             = require('debug')('src:app')


//TODO set with config | environment variable
// localStorage.setItem("debug", "*");

var router = Router.create({
  routes: routes,
  location: Router.HashLocation
})

// the google spreadsheet key
// var key = '10t6LSAUsgVoqdxLbiTcQ8A_3m-R1t71iBAp4ctAoLew' // PRODUCTIVE

var key = '1N8XjgNi0C2NnCv9jfVaoEc3Pj1hASCZLk0lbWAQEonw' //  TEST
var bucket = 'npabuffer'
var isProxy = false        

var entityStoreConfig = {
  key : key,
  bucket : bucket,
  loadData : loadData,
  isProxy : isProxy
}

// initialise stores
var stores = {
  routes: new RouteStore({ router: router }),
  actions:          new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'actions', type:'action'})),  
  recommendations:  new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'recommendations', type:'recommendation'})),  
  issues:           new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'issues', type:'issue'})),  
  groups:           new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'groups', type:'group'})),  
  agencies:         new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'agencies', type:'agency'})),  
  treatybodies:     new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'treatybodies', type:'treatybody'})),  
  articles:         new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'articles', type:'article'})),  
  terms:            new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'terms', type:'term'})),  
  sessions:         new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'sessions', type:'session'})),  
  pages:            new EntityStore(_.extend({},entityStoreConfig,{ sheet: 'pages', type:'page'}))  
}

log('init flux...')
var flux = new Fluxxor.Flux(stores, actions.methods);
log('flux initialised')

router.run(
  function(Handler) {
    log('rendering app...')
    React.render(
      React.createElement(Handler, { flux: flux }),
      document.getElementById("app")
    );
  }
);

// boilerplate logging
flux.on("dispatch", function(type, payload) {
//  console.log("Dispatch:", type, payload);
});
