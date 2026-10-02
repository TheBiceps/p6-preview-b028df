/* dev guard: nothing leaves localhost */
(function () {
  var of = window.fetch;
  window.fetch = function (input, init) {
    var u = new URL(typeof input === 'string' ? input : input.url, location.href);
    if (u.origin !== location.origin) {
      console.info('[dev] blocked fetch', u.href);
      return new Promise(function (r) { setTimeout(function () { r(new Response('{"success":true,"dev":true}', { status: 200, headers: { 'Content-Type': 'application/json' } })); }, 600); });
    }
    return of.apply(this, arguments);
  };
  if (navigator.sendBeacon) navigator.sendBeacon = function (u) { console.info('[dev] blocked beacon', u); return true; };
})();