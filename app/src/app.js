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
var insertCSS       = require('insert-css')
var fs              = require('fs')

//logging
var log             = require('debug')('src:app')


//TODO set with config | environment variable
// localStorage.setItem("debug", "*");

var router = Router.create({
  routes: routes,
  location: Router.HashLocation
})

// the google spreadhseet key
var key = '1V5SQbTVfGgTMCJa0MMPb1t93LryiiTVkZNIQ-VxEiLg'

// initialise stores
var stores = {
  routes: new RouteStore({ router: router }),
  actions: new EntityStore({ key: key, sheet: 'actions', type:'action', loadData: loadData }),  
  recommendations: new EntityStore({ key: key, sheet: 'recommendations', type:'recommendation', loadData: loadData }),
  issues: new EntityStore({ key: key, sheet: 'issues', type:'issue', loadData: loadData }),
  groups: new EntityStore({ key: key, sheet: 'groups', type:'group', loadData: loadData }),
  agencies: new EntityStore({ key: key, sheet: 'agencies', type:'agency', loadData: loadData }),
  treatybodies: new EntityStore({ key: key, sheet: 'treatybodies', type:'treatybody', loadData: loadData }),
  articles: new EntityStore({ key: key, sheet: 'articles', type:'article', loadData: loadData }),
  terms: new EntityStore({ key: key, sheet: 'glossary', type:'term', loadData: loadData }),
  sessions: new EntityStore({ key: key, sheet: 'sessions', type:'session', loadData: loadData }),
  pages: new EntityStore({ key: key, sheet: 'pages', type:'pages', loadData: loadData })  
  
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
