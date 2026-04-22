window.ladi_viewport = function (b) {
  var a = document;
  b = b ? b : "innerWidth";
  var c = window[b];
  var d = true;
  if (
    typeof window.ladi_is_desktop == "undefined" ||
    window.ladi_is_desktop == undefined
  ) {
    window.ladi_is_desktop = !d;
  }
  var e = 960;
  var f = 420;
  var g = "";
  if (!d) {
    g = "width=" + e + ",user-scalable=no,initial-scale=1.0,viewport-fit=cover";
  } else {
    var h = 1;
    var i = f;
    if (i != c) {
      h = c / i;
    }
    g =
      "width=" +
      i +
      ",user-scalable=no,initial-scale=" +
      h +
      ",minimum-scale=" +
      h +
      ",maximum-scale=" +
      h +
      ",viewport-fit=cover";
  }
  var j = a.getElementById("viewport");
  if (!j) {
    j = a.createElement("meta");
    j.id = "viewport";
    j.name = "viewport";
    a.head.appendChild(j);
  }
  j.setAttribute("content", g);
};
window.ladi_set_narrow_vars = function () {
  var dw = window.innerWidth || 420;
  var el = document.documentElement;
  el.style.setProperty("--device-width-px", dw + "px");
  var frac = Math.min(1, Math.max(360 / 440, dw / 440));
  el.style.setProperty("--narrow-frac", String(frac));
};
window.ladi_viewport();
window.ladi_set_narrow_vars();
window.addEventListener("resize", function () {
  window.ladi_viewport();
  window.ladi_set_narrow_vars();
});
window.addEventListener("orientationchange", function () {
  setTimeout(function () {
    window.ladi_viewport();
    window.ladi_set_narrow_vars();
  }, 200);
});
window.ladi_fbq_data = [];
window.ladi_fbq = function () {
  window.ladi_fbq_data.push(arguments);
};
window.ladi_ttq_data = [];
window.ladi_ttq = function () {
  window.ladi_ttq_data.push(arguments);
};
