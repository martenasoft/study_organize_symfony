(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/controllers sync recursive ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \\.(j|t)sx?$":
/*!*****************************************************************************************************************!*\
  !*** ./assets/controllers/ sync ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \.(j|t)sx?$ ***!
  \*****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./calendar_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/calendar_controller.js",
	"./checklist_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/checklist_controller.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./assets/controllers sync recursive ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \\.(j|t)sx?$";

/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/dist/webpack/loader.js!./assets/controllers.json":
/*!************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/dist/webpack/loader.js!./assets/controllers.json ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
});

/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/calendar_controller.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/calendar_controller.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");

jQuery(function ($) {
  /* initialize the external events
      -----------------------------------------------------------------*/
  var dateFormat = 'DD/MM/yyyy HH:MM';
  var dateFormat2 = 'yyyy-mm-dd';
  $('.date-picker').datepicker({
    autoclose: true,
    todayHighlight: true,
    format: dateFormat2
  });
  $('#calendar_item_dateRange').daterangepicker({
    'applyClass': 'btn-sm btn-success',
    'cancelClass': 'btn-sm btn-default',
    opens: 'left',
    timePicker: true,
    locale: {
      format: 'DD/MM/YYYY hh:mm',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel'
    }
  });

  var getDateFormat = function getDateFormat(date) {
    var mm = date._d.getMonth() + 1;

    var dd = date._d.getDate();

    return date._d.getFullYear() + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
  };

  function showErrorAlert(reason, detail) {
    var msg = '';

    if (reason === 'unsupported-file-type') {
      msg = "Unsupported format " + detail;
    } else {//console.log("error uploading file", reason, detail);
    }

    $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' + '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
  }

  $('#calendar_color, #calendar_textColor, #calendar_item_color, #calendar_item_textColor').ace_colorpicker();
  $('#external-events div.external-event').each(function () {
    var eventObject = {
      title: $.trim($(this).text()) // use the element's text as the event title

    }; // store the Event Object in the DOM element so we can get to it later

    $(this).data('eventObject', eventObject); // make the event draggable using jQuery UI

    $(this).draggable({
      zIndex: 999,
      revert: true,
      // will cause the event to go back to its
      revertDuration: 0 //  original position after the drag

    });
  });
  /* initialize the calendar
  -----------------------------------------------------------------*/

  var calendar = $('#calendar_js').fullCalendar({
    //isRTL: true,
    //firstDay: 1,// >> change first day of week
    height: 680,
    lazyFetching: true,
    buttonHtml: {
      prev: '<i class="ace-icon fa fa-chevron-left"></i>',
      next: '<i class="ace-icon fa fa-chevron-right"></i>'
    },
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    //events: calendarEvents,
    events: function events(start, end, timezone, callback) {
      $.get(getDataUrl(getDateFormat(start), getDateFormat(end)), callback);
    },
    eventResize: function eventResize(event, delta, revertFunc) {
      changeData(event.id, event.start.format(), event.end.format());
    },
    editable: isEditable(),
    droppable: isDroppable(),
    // this allows things to be dropped onto the calendar !!!
    eventDrop: function eventDrop(event) {
      changeData(event.id, event.start.format(), event.end.format());
    },
    drop: function drop(date) {
      // this function is called when something is dropped
      // retrieve the dropped element's stored Event Object
      var originalEventObject = $(this).data('eventObject');
      var $extraEventClass = $(this).attr('data-class'); // we need to copy it, so that multiple events don't have a reference to the same object

      var copiedEventObject = $.extend({}, originalEventObject); // assign it the date that was reported

      copiedEventObject.start = date;
      copiedEventObject.allDay = false;
      if ($extraEventClass) copiedEventObject['className'] = [$extraEventClass]; // render the event on the calendar
      // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)

      $('#calendar').fullCalendar('renderEvent', copiedEventObject, true); // is the "remove after drop" checkbox checked?

      if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove();
      }
    },
    selectable: true,
    selectHelper: true,
    select: function select(start, end, allDay) {
      $("#calendar_item_title").val('');
      var date_ = start.format(dateFormat) + ' - ' + end.format(dateFormat);
      $("#calendar_item_dateRange").val(date_);
      $("#btn-submit").removeAttr('disabled').removeClass('disabled'); //calendar.fullCalendar('unselect');
    },
    eventClick: function eventClick(calEvent, jsEvent, view) {
      redirectToEdit(calEvent.calendar_id, calEvent.id);
    }
  });
  $('.select_calendar').off('click').on('click', function () {
    $('#calendar_js').fullCalendar('refetchEvents');
  });
});

/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/checklist_controller.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/checklist_controller.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_bootstrap_tag_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../js/bootstrap-tag.min.js */ "./assets/js/bootstrap-tag.min.js");
/* harmony import */ var _js_bootstrap_tag_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_bootstrap_tag_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

$(function () {
  $('#checklist_color').ace_colorpicker();
  /*  var tag_input = $('#checklist_title');
    try {
        tag_input.tag(
            {
                placeholder: tag_input.attr('placeholder'),
                source: function (query, process) {
                    $.get(getTagDataUrl(query), function (date) {
                        console.log(date);
                    });
                    /!* $.ajax({url: 'remote_source.php?q=' + encodeURIComponent(query)})
                         .done(function (result_items) {
                             process(result_items);
                         });*!/
                }
            }
        );
     } catch (e) {
        console.error(e)
    }
  */
});

/***/ }),

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/bootstrap.min.css */ "./assets/css/bootstrap.min.css");
/* harmony import */ var _font_awesome_4_5_0_css_font_awesome_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./font-awesome/4.5.0/css/font-awesome.min.css */ "./assets/font-awesome/4.5.0/css/font-awesome.min.css");
/* harmony import */ var _css_fonts_googleapis_com_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/fonts.googleapis.com.css */ "./assets/css/fonts.googleapis.com.css");
/* harmony import */ var _css_ace_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./css/ace.min.css */ "./assets/css/ace.min.css");
/* harmony import */ var _css_ace_skins_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/ace-skins.min.css */ "./assets/css/ace-skins.min.css");
/* harmony import */ var _css_ace_rtl_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/ace-rtl.min.css */ "./assets/css/ace-rtl.min.css");
/* harmony import */ var _css_jquery_ui_custom_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./css/jquery-ui.custom.min.css */ "./assets/css/jquery-ui.custom.min.css");
/* harmony import */ var _css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css/fullcalendar.min.css */ "./assets/css/fullcalendar.min.css");
/* harmony import */ var _css_bootstrap_colorpicker_min_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./css/bootstrap-colorpicker.min.css */ "./assets/css/bootstrap-colorpicker.min.css");
/* harmony import */ var _css_bootstrap_datepicker3_min_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./css/bootstrap-datepicker3.min.css */ "./assets/css/bootstrap-datepicker3.min.css");
/* harmony import */ var _css_bootstrap_timepicker_min_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./css/bootstrap-timepicker.min.css */ "./assets/css/bootstrap-timepicker.min.css");
/* harmony import */ var _css_daterangepicker_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./css/daterangepicker.min.css */ "./assets/css/daterangepicker.min.css");
/* harmony import */ var _css_bootstrap_datetimepicker_min_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./css/bootstrap-datetimepicker.min.css */ "./assets/css/bootstrap-datetimepicker.min.css");
/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./css/app.css */ "./assets/css/app.css");
/* harmony import */ var _js_bootstrap_min__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./js/bootstrap.min */ "./assets/js/bootstrap.min.js");
/* harmony import */ var _js_bootstrap_min__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_js_bootstrap_min__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _js_jquery_ui_custom_min__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./js/jquery-ui.custom.min */ "./assets/js/jquery-ui.custom.min.js");
/* harmony import */ var _js_jquery_ui_custom_min__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_ui_custom_min__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _js_jquery_ui_touch_punch_min__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./js/jquery.ui.touch-punch.min */ "./assets/js/jquery.ui.touch-punch.min.js");
/* harmony import */ var _js_jquery_ui_touch_punch_min__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_ui_touch_punch_min__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _js_bootbox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./js/bootbox */ "./assets/js/bootbox.js");
/* harmony import */ var _js_bootbox__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_js_bootbox__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _js_bootstrap_datepicker_min_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./js/bootstrap-datepicker.min.js */ "./assets/js/bootstrap-datepicker.min.js");
/* harmony import */ var _js_bootstrap_datepicker_min_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_js_bootstrap_datepicker_min_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _js_bootstrap_colorpicker_min_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./js/bootstrap-colorpicker.min.js */ "./assets/js/bootstrap-colorpicker.min.js");
/* harmony import */ var _js_bootstrap_colorpicker_min_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_js_bootstrap_colorpicker_min_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _js_jquery_easypiechart_min_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./js/jquery.easypiechart.min.js */ "./assets/js/jquery.easypiechart.min.js");
/* harmony import */ var _js_jquery_easypiechart_min_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_easypiechart_min_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _js_jquery_sparkline_index_min_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./js/jquery.sparkline.index.min.js */ "./assets/js/jquery.sparkline.index.min.js");
/* harmony import */ var _js_jquery_sparkline_index_min_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_sparkline_index_min_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _js_jquery_flot_min_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./js/jquery.flot.min.js */ "./assets/js/jquery.flot.min.js");
/* harmony import */ var _js_jquery_flot_min_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_flot_min_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _js_jquery_flot_pie_min_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./js/jquery.flot.pie.min.js */ "./assets/js/jquery.flot.pie.min.js");
/* harmony import */ var _js_jquery_flot_pie_min_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_flot_pie_min_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _js_jquery_flot_resize_min_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./js/jquery.flot.resize.min.js */ "./assets/js/jquery.flot.resize.min.js");
/* harmony import */ var _js_jquery_flot_resize_min_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_flot_resize_min_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _js_ace_elements_min_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./js/ace-elements.min.js */ "./assets/js/ace-elements.min.js");
/* harmony import */ var _js_ace_elements_min_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_js_ace_elements_min_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _js_ace_min_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./js/ace.min.js */ "./assets/js/ace.min.js");
/* harmony import */ var _js_ace_min_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_js_ace_min_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _js_fullcalendar_min_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./js/fullcalendar.min.js */ "./assets/js/fullcalendar.min.js");
/* harmony import */ var _js_fullcalendar_min_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_js_fullcalendar_min_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _js_daterangepicker_min_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./js/daterangepicker.min.js */ "./assets/js/daterangepicker.min.js");
/* harmony import */ var _js_daterangepicker_min_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_js_daterangepicker_min_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./bootstrap */ "./assets/bootstrap.js");
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)















var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__.g.$ = __webpack_require__.g.jQuery = $;
















/*
import Vue from 'vue';

import VueResource from 'vue-resource';

import App from './src/App';
import store from "./src/store";
import router from "./src/router"

Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h =>h(App)
}).$mount('#app');

*/

/***/ }),

/***/ "./assets/bootstrap.js":
/*!*****************************!*\
  !*** ./assets/bootstrap.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "app": () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var _symfony_stimulus_bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @symfony/stimulus-bridge */ "./node_modules/@symfony/stimulus-bridge/dist/index.js");
 // Registers Stimulus controllers from controllers.json and in the controllers/ directory

var app = (0,_symfony_stimulus_bridge__WEBPACK_IMPORTED_MODULE_0__.startStimulusApp)(__webpack_require__("./assets/controllers sync recursive ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \\.(j|t)sx?$"));

/***/ }),

/***/ "./assets/js/ace-elements.min.js":
/*!***************************************!*\
  !*** ./assets/js/ace-elements.min.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var __webpack_provided_window_dot_jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.array.last-index-of.js */ "./node_modules/core-js/modules/es.array.last-index-of.js");

__webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.fixed.js */ "./node_modules/core-js/modules/es.string.fixed.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

/*!
 * Ace v1.4.0
 */
if ("undefined" == typeof jQuery) throw new Error("Ace's JavaScript requires jQuery");
!function (a, b) {
  var c = function c(b, _c) {
    function d(a) {
      a.preventDefault(), a.stopPropagation();
      var b = A.offset(),
          c = b[o],
          d = u ? a.pageY : a.pageX;
      d > c + G ? (G = d - c - F + I, G > H && (G = H)) : (G = d - c - I, 0 > G && (G = 0)), l.update_scroll();
    }

    function e(b) {
      b.preventDefault(), b.stopPropagation(), ba = aa = u ? b.pageY : b.pageX, Q = !0, a("html").off("mousemove.ace_scroll").on("mousemove.ace_scroll", f), a(R).off("mouseup.ace_scroll").on("mouseup.ace_scroll", g), A.addClass("active"), S && l.$element.trigger("drag.start");
    }

    function f(a) {
      a.preventDefault(), a.stopPropagation(), ba = u ? a.pageY : a.pageX, ba - aa + G > H ? ba = aa + H - G : 0 > ba - aa + G && (ba = aa - G), G += ba - aa, aa = ba, 0 > G ? G = 0 : G > H && (G = H), l.update_scroll();
    }

    function g(b) {
      b.preventDefault(), b.stopPropagation(), Q = !1, a("html").off(".ace_scroll"), a(R).off(".ace_scroll"), A.removeClass("active"), S && l.$element.trigger("drag.end"), w && W && !Y && i();
    }

    function h(a) {
      var b = +new Date();

      if (Z && b - da > 1e3) {
        var c = z[t];
        $ != c && ($ = c, _ = !0, l.reset(!0)), da = b;
      }

      w && W && (null != ca && (clearTimeout(ca), ca = null), A.addClass("not-idle"), Y || 1 != a || i());
    }

    function i() {
      null != ca && (clearTimeout(ca), ca = null), ca = setTimeout(function () {
        ca = null, A.removeClass("not-idle");
      }, X);
    }

    function j() {
      A.css("visibility", "hidden").addClass("scroll-hover"), N = u ? parseInt(A.outerWidth()) || 0 : parseInt(A.outerHeight()) || 0, A.css("visibility", "").removeClass("scroll-hover");
    }

    function k() {
      if (V !== !1) {
        var a = y.offset(),
            b = a.left,
            c = a.top;
        u ? M || (b += y.outerWidth() - N) : M || (c += y.outerHeight() - N), V === !0 ? A.css({
          top: parseInt(c),
          left: parseInt(b)
        }) : "left" === V ? A.css("left", parseInt(b)) : "top" === V && A.css("top", parseInt(c));
      }
    }

    var l = this,
        m = ace.helper.getAttrSettings(b, a.fn.ace_scroll.defaults),
        n = a.extend({}, a.fn.ace_scroll.defaults, _c, m);
    this.size = 0, this.lock = !1, this.lock_anyway = !1, this.$element = a(b), this.element = b;

    var o,
        p,
        q,
        r,
        s,
        t,
        u = !0,
        v = !1,
        w = !1,
        x = !1,
        y = null,
        z = null,
        A = null,
        B = null,
        C = null,
        D = null,
        E = null,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = !0,
        K = !1,
        L = "",
        M = !1,
        N = 0,
        O = 1,
        P = !1,
        Q = !1,
        R = "onmouseup" in window ? window : "html",
        S = n.dragEvent || !1,
        T = _c.scrollEvent || !1,
        U = n.detached || !1,
        V = n.updatePos || !1,
        W = n.hideOnIdle || !1,
        X = n.hideDelay || 1500,
        Y = !1,
        Z = n.observeContent || !1,
        $ = 0,
        _ = !0;

    this.ref = function () {
      return this;
    }, this.create = function (b) {
      if (!x) {
        b && (n = a.extend({}, a.fn.ace_scroll.defaults, b)), this.size = parseInt(this.$element.attr("data-size")) || n.size || 200, u = !n.horizontal, o = u ? "top" : "left", p = u ? "height" : "width", q = u ? "maxHeight" : "maxWidth", r = u ? "clientHeight" : "clientWidth", s = u ? "scrollTop" : "scrollLeft", t = u ? "scrollHeight" : "scrollWidth", this.$element.addClass("ace-scroll"), "static" == this.$element.css("position") ? (P = this.element.style.position, this.element.style.position = "relative") : P = !1;
        var c = null;
        U ? c = a('<div class="scroll-track scroll-detached"><div class="scroll-bar"></div></div>').appendTo("body") : (this.$element.wrapInner('<div class="scroll-content" />'), this.$element.prepend('<div class="scroll-track"><div class="scroll-bar"></div></div>')), y = this.$element, U || (y = this.$element.find(".scroll-content").eq(0)), u || y.wrapInner("<div />"), z = y.get(0), U ? (A = c, k()) : A = this.$element.find(".scroll-track").eq(0), B = A.find(".scroll-bar").eq(0), C = A.get(0), D = B.get(0), E = D.style, u || A.addClass("scroll-hz"), n.styleClass && (L = n.styleClass, A.addClass(L), M = !!L.match(/scroll\-left|scroll\-top/)), 0 == N && (A.show(), j()), A.hide(), A.on("mousedown", d), B.on("mousedown", e), y.on("scroll", function () {
          J && (G = parseInt(Math.round(this[s] * O)), E[o] = G + "px"), J = !1, T && this.$element.trigger("scroll", [z]);
        }), n.mouseWheel && (this.lock = n.mouseWheelLock, this.lock_anyway = n.lockAnyway, this.$element.on(a.event.special.mousewheel ? "mousewheel.ace_scroll" : "mousewheel.ace_scroll DOMMouseScroll.ace_scroll", function (b) {
          if (!v) {
            if (h(!0), !w) return !l.lock_anyway;
            Q && (Q = !1, a("html").off(".ace_scroll"), a(R).off(".ace_scroll"), S && l.$element.trigger("drag.end")), b.deltaY = b.deltaY || 0;
            var c = b.deltaY > 0 || b.originalEvent.detail < 0 || b.originalEvent.wheelDelta > 0 ? 1 : -1,
                d = !1,
                e = z[r],
                f = z[s];
            l.lock || (d = -1 == c ? z[t] <= f + e : 0 == f), l.move_bar(!0);
            var g = parseInt(e / 8);
            return 80 > g && (g = 80), g > l.size && (g = l.size), g += 1, z[s] = f - c * g, d && !l.lock_anyway;
          }
        }));
        var f = ace.vars.touch && "ace_drag" in a.event.special && n.touchDrag;

        if (f) {
          var g = "",
              m = f ? "ace_drag" : "swipe";
          this.$element.on(m + ".ace_scroll", function (a) {
            if (v) return void (a.retval.cancel = !0);
            if (h(!0), !w) return void (a.retval.cancel = this.lock_anyway);

            if (g = a.direction, u && ("up" == g || "down" == g) || !u && ("left" == g || "right" == g)) {
              var b = u ? a.dy : a.dx;
              0 != b && (Math.abs(b) > 20 && f && (b = 2 * b), l.move_bar(!0), z[s] = z[s] + b);
            }
          });
        }

        W && A.addClass("idle-hide"), Z && A.on("mouseenter.ace_scroll", function () {
          Y = !0, h(!1);
        }).on("mouseleave.ace_scroll", function () {
          Y = !1, 0 == Q && i();
        }), this.$element.on("mouseenter.ace_scroll touchstart.ace_scroll", function (a) {
          _ = !0, Z ? h(!0) : n.hoverReset && l.reset(!0), A.addClass("scroll-hover");
        }).on("mouseleave.ace_scroll touchend.ace_scroll", function () {
          A.removeClass("scroll-hover");
        }), u || y.children(0).css(p, this.size), y.css(q, this.size), v = !1, x = !0;
      }
    }, this.is_active = function () {
      return w;
    }, this.is_enabled = function () {
      return !v;
    }, this.move_bar = function (a) {
      J = a;
    }, this.get_track = function () {
      return C;
    }, this.reset = function (a) {
      if (!v) {
        x || this.create();
        var b = this.size;

        if (!a || _) {
          if (_ = !1, U) {
            var c = parseInt(Math.round((parseInt(y.css("border-top-width")) + parseInt(y.css("border-bottom-width"))) / 2.5));
            b -= c;
          }

          var d = u ? z[t] : b;
          if (u && 0 == d || !u && 0 == this.element.scrollWidth) return void A.removeClass("scroll-active");
          var e = u ? b : z.clientWidth;
          u || y.children(0).css(p, b), y.css(q, this.size), d > e ? (w = !0, A.css(p, e).show(), O = parseFloat((e / d).toFixed(5)), F = parseInt(Math.round(e * O)), I = parseInt(Math.round(F / 2)), H = e - F, G = parseInt(Math.round(z[s] * O)), E[p] = F + "px", E[o] = G + "px", A.addClass("scroll-active"), 0 == N && j(), K || (n.reset && (z[s] = 0, E[o] = 0), K = !0), U && k()) : (w = !1, A.hide(), A.removeClass("scroll-active"), y.css(q, ""));
        }
      }
    }, this.disable = function () {
      z[s] = 0, E[o] = 0, v = !0, w = !1, A.hide(), this.$element.addClass("scroll-disabled"), A.removeClass("scroll-active"), y.css(q, "");
    }, this.enable = function () {
      v = !1, this.$element.removeClass("scroll-disabled");
    }, this.destroy = function () {
      w = !1, v = !1, x = !1, this.$element.removeClass("ace-scroll scroll-disabled scroll-active"), this.$element.off(".ace_scroll"), U || (u || y.find("> div").children().unwrap(), y.children().unwrap(), y.remove()), A.remove(), P !== !1 && (this.element.style.position = P), null != ca && (clearTimeout(ca), ca = null);
    }, this.modify = function (b) {
      b && (n = a.extend({}, n, b)), this.destroy(), this.create(), _ = !0, this.reset(!0);
    }, this.update = function (b) {
      b && (n = a.extend({}, n, b)), this.size = n.size || this.size, this.lock = n.mouseWheelLock || this.lock, this.lock_anyway = n.lockAnyway || this.lock_anyway, W = n.hideOnIdle || W, X = n.hideDelay || X, Z = n.observeContent || !1, S = n.dragEvent || !1, "undefined" != typeof b.styleClass && (L && A.removeClass(L), L = b.styleClass, L && A.addClass(L), M = !!L.match(/scroll\-left|scroll\-top/));
    }, this.start = function () {
      z[s] = 0;
    }, this.end = function () {
      z[s] = z[t];
    }, this.hide = function () {
      A.hide();
    }, this.show = function () {
      A.show();
    }, this.update_scroll = function () {
      J = !1, E[o] = G + "px", z[s] = parseInt(Math.round(G / O));
    };
    var aa = -1,
        ba = -1,
        ca = null,
        da = 0;
    return this.track_size = function () {
      return 0 == N && j(), N;
    }, this.create(), _ = !0, this.reset(!0), $ = z[t], this;
  };

  a.fn.ace_scroll = function (d, e) {
    var f,
        g = this.each(function () {
      var b = a(this),
          g = b.data("ace_scroll"),
          h = "object" == _typeof(d) && d;
      g || b.data("ace_scroll", g = new c(this, h)), "string" == typeof d && (f = g[d](e));
    });
    return f === b ? g : f;
  }, a.fn.ace_scroll.defaults = {
    size: 200,
    horizontal: !1,
    mouseWheel: !0,
    mouseWheelLock: !1,
    lockAnyway: !1,
    styleClass: !1,
    observeContent: !1,
    hideOnIdle: !1,
    hideDelay: 1500,
    hoverReset: !0,
    reset: !1,
    dragEvent: !1,
    touchDrag: !0,
    touchSwipe: !1,
    scrollEvent: !1,
    detached: !1,
    updatePos: !0
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  var c = function c(b, _c2) {
    var d = ace.helper.getAttrSettings(b, a.fn.ace_colorpicker.defaults),
        e = a.extend({}, a.fn.ace_colorpicker.defaults, _c2, d),
        f = a(b),
        g = "",
        h = "",
        i = null,
        j = [];
    f.addClass("hide").find("option").each(function () {
      var a = "colorpick-btn",
          b = this.value.replace(/[^\w\s,#\(\)\.]/g, "");
      b.indexOf("number") >= 0 || (this.value != b && (this.value = b), this.selected && (a += " selected", h = b), j.push(b), g += '<li><a class="' + a + '" style="background-color:' + b + ';" data-color="' + b + '"></a></li>');
    }).end().on("change.color", function () {
      f.next().find(".btn-colorpicker").css("background-color", this.value);
    }).after('<div class="dropdown dropdown-colorpicker">		<a data-toggle="dropdown" class="dropdown-toggle" ' + (e.auto_pos ? 'data-position="auto"' : "") + '><span class="btn-colorpicker" style="background-color:' + h + '"></span></a><ul class="dropdown-menu' + (e.caret ? " dropdown-caret" : "") + (e.pull_right ? " dropdown-menu-right" : "") + '">' + g + "</ul></div>");
    var k = f.next().find(".dropdown-menu");
    k.on(ace.click_event, function (b, c) {
      var d = a(b.target);
      if (!d.is(".colorpick-btn")) return !1;
      i && i.removeClass("selected"), i = d, i.addClass("selected");
      var e = i.data("color");
      return c !== !0 && f.val(e).trigger("change"), f.next().find(".btn-colorpicker").css("background-color", e), b.preventDefault(), !0;
    }), i = f.next().find("a.selected"), this.pick = function (c, d) {
      if ("number" == typeof c) {
        if (c >= j.length) return;
        b.selectedIndex = c, k.find("a:eq(" + c + ")").trigger(ace.click_event, [!0]);
      } else if ("string" == typeof c) {
        var e = c.replace(/[^\w\s,#\(\)\.]/g, "");
        if (c = j.indexOf(e), -1 == c && d === !0 && (j.push(e), a("<option />").appendTo(f).val(e), a('<li><a class="colorpick-btn"></a></li>').appendTo(k).find("a").css("background-color", e).data("color", e), c = j.length - 1), -1 == c) return;
        k.find("a:eq(" + c + ")").trigger(ace.click_event, [!0]);
      }
    }, this.destroy = function () {
      f.removeClass("hide").next().remove(), j = [];
    };
  };

  a.fn.ace_colorpicker = function (d, e) {
    var f,
        g = this.each(function () {
      var b = a(this),
          g = b.data("ace_colorpicker"),
          h = "object" == _typeof(d) && d;
      g || b.data("ace_colorpicker", g = new c(this, h)), "string" == typeof d && (f = g[d](e));
    });
    return f === b ? g : f;
  }, a.fn.ace_colorpicker.defaults = {
    pull_right: !1,
    caret: !0,
    auto_pos: !0
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  var c = ("multiple" in document.createElement("INPUT")),
      d = ("FileList" in window),
      e = ("FileReader" in window),
      f = ("File" in window),
      g = function g(b, c) {
    var d = this,
        e = ace.helper.getAttrSettings(b, a.fn.ace_file_input.defaults);
    this.settings = a.extend({}, a.fn.ace_file_input.defaults, c, e), this.$element = a(b), this.element = b, this.disabled = !1, this.can_reset = !0, this.$element.off("change.ace_inner_call").on("change.ace_inner_call", function (a, b) {
      return d.disabled || b === !0 ? void 0 : i.call(d);
    });
    var f = this.$element.closest("label").css({
      display: "block"
    }),
        g = 0 == f.length ? "label" : "span";
    this.$element.wrap("<" + g + ' class="ace-file-input" />'), this.apply_settings(), this.reset_input_field();
  };

  g.error = {
    FILE_LOAD_FAILED: 1,
    IMAGE_LOAD_FAILED: 2,
    THUMBNAIL_FAILED: 3
  }, g.prototype.apply_settings = function () {
    var b = this;
    this.multi = this.$element.attr("multiple") && c, this.well_style = "well" == this.settings.style, this.well_style ? (this.settings.thumbnail || (this.settings.thumbnail = "small"), this.$element.parent().addClass("ace-file-multiple")) : this.$element.parent().removeClass("ace-file-multiple"), this.$element.parent().find(":not(input[type=file])").remove(), this.$element.after('<span class="ace-file-container" data-title="' + this.settings.btn_choose + '"><span class="ace-file-name" data-title="' + this.settings.no_file + '">' + (this.settings.no_icon ? '<i class="' + ace.vars.icon + this.settings.no_icon + '"></i>' : "") + "</span></span>"), this.$label = this.$element.next(), this.$container = this.$element.closest(".ace-file-input");
    var e = !!this.settings.icon_remove;

    if (e) {
      var f = a('<a class="remove" href="#"><i class="' + ace.vars.icon + this.settings.icon_remove + '"></i></a>').appendTo(this.$element.parent());
      f.on(ace.click_event, function (a) {
        if (a.preventDefault(), !b.can_reset) return !1;
        var c = !0;
        if (b.settings.before_remove && (c = b.settings.before_remove.call(b.element)), !c) return !1;
        b.reset_input();
        return !1;
      });
    }

    this.settings.droppable && d && h.call(this);
  }, g.prototype.show_file_list = function (b, c) {
    var d = "undefined" == typeof b ? this.$element.data("ace_input_files") : b;

    if (d && 0 != d.length) {
      this.well_style && (this.$label.find(".ace-file-name").remove(), this.settings.btn_change || this.$label.addClass("hide-placeholder")), this.$label.attr("data-title", this.settings.btn_change).addClass("selected");

      for (var g = 0; g < d.length; g++) {
        var h = "",
            i = !1;
        if ("string" == typeof d[g]) h = d[g];else if (f && d[g] instanceof File) h = a.trim(d[g].name);else {
          if (!(d[g] instanceof Object && d[g].hasOwnProperty("name"))) continue;
          h = d[g].name, d[g].hasOwnProperty("type") && (i = d[g].type), d[g].hasOwnProperty("path") || (d[g].path = d[g].name);
        }
        var k = h.lastIndexOf("\\") + 1;
        0 == k && (k = h.lastIndexOf("/") + 1), h = h.substr(k), 0 == i && (i = /\.(jpe?g|png|gif|svg|bmp|tiff?)$/i.test(h) ? "image" : /\.(mpe?g|flv|mov|avi|swf|mp4|mkv|webm|wmv|3gp)$/i.test(h) ? "video" : /\.(mp3|ogg|wav|wma|amr|aac)$/i.test(h) ? "audio" : "file");
        var l = {
          file: "fa fa-file",
          image: "fa fa-picture-o file-image",
          video: "fa fa-film file-video",
          audio: "fa fa-music file-audio"
        },
            m = l[i];

        if (this.well_style) {
          this.$label.append('<span class="ace-file-name" data-title="' + h + '"><i class="' + ace.vars.icon + m + '"></i></span>');
          var n = c === !0 && f && d[g] instanceof File ? a.trim(d[g].type) : "",
              o = e && this.settings.thumbnail && (n.length > 0 && n.match("image") || 0 == n.length && "image" == i);

          if (o) {
            var p = this;
            a.when(j.call(this, d[g])).fail(function (a) {
              p.settings.preview_error && p.settings.preview_error.call(p, h, a.code);
            });
          }
        } else this.$label.find(".ace-file-name").attr({
          "data-title": h
        }).find(ace.vars[".icon"]).attr("class", ace.vars.icon + m);
      }

      return !0;
    }
  }, g.prototype.reset_input = function () {
    this.reset_input_ui(), this.reset_input_field();
  }, g.prototype.reset_input_ui = function () {
    this.$label.attr({
      "data-title": this.settings.btn_choose,
      "class": "ace-file-container"
    }).find(".ace-file-name:first").attr({
      "data-title": this.settings.no_file,
      "class": "ace-file-name"
    }).find(ace.vars[".icon"]).attr("class", ace.vars.icon + this.settings.no_icon).prev("img").remove(), this.settings.no_icon || this.$label.find(ace.vars[".icon"]).remove(), this.$label.find(".ace-file-name").not(":first").remove(), this.reset_input_data();
  }, g.prototype.reset_input_field = function () {
    this.$element.wrap("<form>").parent().get(0).reset(), this.$element.unwrap();
  }, g.prototype.reset_input_data = function () {
    this.$element.data("ace_input_files") && (this.$element.removeData("ace_input_files"), this.$element.removeData("ace_input_method"));
  }, g.prototype.enable_reset = function (a) {
    this.can_reset = a;
  }, g.prototype.disable = function () {
    this.disabled = !0, this.$element.attr("disabled", "disabled").addClass("disabled");
  }, g.prototype.enable = function () {
    this.disabled = !1, this.$element.removeAttr("disabled").removeClass("disabled");
  }, g.prototype.files = function () {
    return a(this).data("ace_input_files") || null;
  }, g.prototype.method = function () {
    return a(this).data("ace_input_method") || "";
  }, g.prototype.update_settings = function (b) {
    this.settings = a.extend({}, this.settings, b), this.apply_settings();
  }, g.prototype.loading = function (b) {
    if (b === !1) this.$container.find(".ace-file-overlay").remove(), this.element.removeAttribute("readonly");else {
      var c = "string" == typeof b ? b : '<i class="overlay-content fa fa-spin fa-spinner orange2 fa-2x"></i>',
          d = this.$container.find(".ace-file-overlay");
      0 == d.length && (d = a('<div class="ace-file-overlay"></div>').appendTo(this.$container), d.on("click tap", function (a) {
        return a.stopImmediatePropagation(), a.preventDefault(), !1;
      }), this.element.setAttribute("readonly", "true")), d.empty().append(c);
    }
  };

  var h = function h() {
    var a = this,
        b = this.$element.parent();
    b.off("dragenter").on("dragenter", function (a) {
      a.preventDefault(), a.stopPropagation();
    }).off("dragover").on("dragover", function (a) {
      a.preventDefault(), a.stopPropagation();
    }).off("drop").on("drop", function (b) {
      if (b.preventDefault(), b.stopPropagation(), !a.disabled) {
        var c = b.originalEvent.dataTransfer,
            d = c.files;

        if (!a.multi && d.length > 1) {
          var e = [];
          e.push(d[0]), d = e;
        }

        return d = l.call(a, d, !0), d === !1 ? !1 : (a.$element.data("ace_input_method", "drop"), a.$element.data("ace_input_files", d), a.show_file_list(d, !0), a.$element.triggerHandler("change", [!0]), !0);
      }
    });
  },
      i = function i() {
    var a = this.element.files || [this.element.value];
    return a = l.call(this, a, !1), a === !1 ? !1 : (this.$element.data("ace_input_method", "select"), this.$element.data("ace_input_files", a), this.show_file_list(a, !0), !0);
  },
      j = function j(b) {
    var c = this,
        d = c.$label.find(".ace-file-name:last"),
        e = new a.Deferred(),
        h = function h(b, c) {
      d.prepend("<img class='middle' style='display:none;' />");
      var e = d.find("img:last").get(0);
      a(e).one("load", function () {
        i.call(null, e, c);
      }).one("error", function () {
        j.call(null, e);
      }), e.src = b;
    },
        i = function i(b, f) {
      var h = c.settings.previewSize;
      h || (c.settings.previewWidth || c.settings.previewHeight ? h = {
        previewWidth: c.settings.previewWidth,
        previewHeight: c.settings.previewHeight
      } : (h = 50, "large" == c.settings.thumbnail && (h = 150))), "fit" == c.settings.thumbnail ? h = d.width() : "number" == typeof h && (h = parseInt(Math.min(h, d.width())));
      var i = k(b, h);
      if (null == i) return a(this).remove(), void e.reject({
        code: g.error.THUMBNAIL_FAILED
      });
      var j = !0;

      if (f && f instanceof File) {
        f.width = i.width, f.height = i.height, c.$element.trigger("file.preview.ace", {
          file: f
        });
        var l;
        c.$element.trigger(l = new a.Event("file.preview.ace"), {
          file: f
        }), l.isDefaultPrevented() && (j = !1);
      }

      if (j) {
        var m = i.previewWidth,
            n = i.previewHeight;
        "small" == c.settings.thumbnail ? m = n = parseInt(Math.max(m, n)) : d.addClass("large"), a(b).css({
          "background-image": "url(" + i.src + ")",
          width: m,
          height: n
        }).data("thumb", i.src).attr({
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
        }).show();
      }

      e.resolve();
    },
        j = function j(a) {
      d.find("img").remove(), e.reject({
        code: g.error.IMAGE_LOAD_FAILED
      });
    };

    if (f && b instanceof File) {
      var l = new FileReader();
      l.onload = function (a) {
        h(a.target.result, b);
      }, l.onerror = function (a) {
        e.reject({
          code: g.error.FILE_LOAD_FAILED
        });
      }, l.readAsDataURL(b);
    } else b instanceof Object && b.hasOwnProperty("path") && h(b.path, null);

    return e.promise();
  },
      k = function k(b, c, d) {
    var e = b.width,
        f = b.height;
    e = e > 0 ? e : a(b).width(), f = f > 0 ? f : a(b).height();
    var g = !1,
        h = !1,
        i = !1;
    "number" == typeof c ? g = c : c instanceof Object && (c.previewWidth && !c.previewHeight ? i = c.previewWidth : c.previewHeight && !c.previewWidth ? h = c.previewHeight : c.previewWidth && c.previewHeight && (i = c.previewWidth, h = c.previewHeight)), g ? e > f ? (i = g, h = parseInt(f / e * i)) : (h = g, i = parseInt(e / f * h)) : !h && i ? h = parseInt(f / e * i) : h && !i && (i = parseInt(e / f * h));
    var j;

    try {
      var k = document.createElement("canvas");
      k.width = i, k.height = h;
      var l = k.getContext("2d");
      l.drawImage(b, 0, 0, e, f, 0, 0, i, h), j = k.toDataURL();
    } catch (m) {
      j = null;
    }

    return j ? (/^data\:image\/(png|jpe?g|gif);base64,[0-9A-Za-z\+\/\=]+$/.test(j) || (j = null), j ? {
      src: j,
      previewWidth: i,
      previewHeight: h,
      width: e,
      height: f
    } : null) : null;
  },
      l = function l(a, b) {
    var c = o.call(this, a, b);
    return -1 === c ? (this.reset_input(), !1) : c && 0 != c.length ? ((c instanceof Array || d && c instanceof FileList) && (a = c), c = !0, this.settings.before_change && (c = this.settings.before_change.call(this.element, a, b)), -1 === c ? (this.reset_input(), !1) : c && 0 != c.length ? ((c instanceof Array || d && c instanceof FileList) && (a = c), a) : (this.$element.data("ace_input_files") || this.reset_input(), !1)) : (this.$element.data("ace_input_files") || this.reset_input(), !1);
  },
      m = function m(a) {
    return a ? ("string" == typeof a && (a = [a]), 0 == a.length ? null : new RegExp(".(?:" + a.join("|") + ")$", "i")) : null;
  },
      n = function n(a) {
    return a ? ("string" == typeof a && (a = [a]), 0 == a.length ? null : new RegExp("^(?:" + a.join("|").replace(/\//g, "\\/") + ")$", "i")) : null;
  },
      o = function o(b, c) {
    var d = m(this.settings.allowExt),
        e = m(this.settings.denyExt),
        g = n(this.settings.allowMime),
        h = n(this.settings.denyMime),
        i = this.settings.maxSize || !1;
    if (!(d || e || g || h || i)) return !0;

    for (var j = [], k = {}, l = 0; l < b.length; l++) {
      var o = b[l],
          p = f ? o.name : o;
      if (!d || d.test(p)) {
        if (e && e.test(p)) "ext" in k || (k.ext = []), k.ext.push(p);else {
          var q;

          if (f) {
            if ((q = a.trim(o.type)).length > 0) {
              if (g && !g.test(q)) {
                "mime" in k || (k.mime = []), k.mime.push(p);
                continue;
              }

              if (h && h.test(q)) {
                "mime" in k || (k.mime = []), k.mime.push(p);
                continue;
              }
            }

            i && o.size > i ? ("size" in k || (k.size = []), k.size.push(p)) : j.push(o);
          } else j.push(o);
        }
      } else "ext" in k || (k.ext = []), k.ext.push(p);
    }

    if (j.length == b.length) return b;
    var r = {
      ext: 0,
      mime: 0,
      size: 0
    };
    "ext" in k && (r.ext = k.ext.length), "mime" in k && (r.mime = k.mime.length), "size" in k && (r.size = k.size.length);
    var s;
    return this.$element.trigger(s = new a.Event("file.error.ace"), {
      file_count: b.length,
      invalid_count: b.length - j.length,
      error_list: k,
      error_count: r,
      dropped: c
    }), s.isDefaultPrevented() ? -1 : j;
  };

  a.fn.aceFileInput = a.fn.ace_file_input = function (c, d) {
    var e,
        f = this.each(function () {
      var b = a(this),
          f = b.data("ace_file_input"),
          h = "object" == _typeof(c) && c;
      f || b.data("ace_file_input", f = new g(this, h)), "string" == typeof c && (e = f[c](d));
    });
    return e === b ? f : e;
  }, a.fn.ace_file_input.defaults = {
    style: !1,
    no_file: "No File ...",
    no_icon: "fa fa-upload",
    btn_choose: "Choose",
    btn_change: "Change",
    icon_remove: "fa fa-times",
    droppable: !1,
    thumbnail: !1,
    allowExt: null,
    denyExt: null,
    allowMime: null,
    denyMime: null,
    maxSize: !1,
    previewSize: !1,
    previewWidth: !1,
    previewHeight: !1,
    before_change: null,
    before_remove: null,
    preview_error: null
  };
}(__webpack_provided_window_dot_jQuery), !function (a) {
  "use strict";

  var b = function b(_b, c) {
    this.$element = a(_b), this.options = a.extend({}, a.fn.bs_typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = a(this.options.menu), this.shown = !1, this.listen();
  };

  b.prototype = {
    constructor: b,
    select: function select() {
      var a = this.$menu.find(".active").attr("data-value");
      return this.$element.val(this.updater(a)).change(), this.hide();
    },
    updater: function updater(a) {
      return a;
    },
    show: function show() {
      var b = a.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      });
      return this.$menu.insertAfter(this.$element).css({
        top: b.top + b.height,
        left: b.left
      }).show(), this.shown = !0, this;
    },
    hide: function hide() {
      return this.$menu.hide(), this.shown = !1, this;
    },
    lookup: function lookup(b) {
      var c;
      return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (c = a.isFunction(this.source) ? this.source(this.query, a.proxy(this.process, this)) : this.source, c ? this.process(c) : this);
    },
    process: function process(b) {
      var c = this;
      return b = a.grep(b, function (a) {
        return c.matcher(a);
      }), b = this.sorter(b), b.length ? this.render(b.slice(0, this.options.items)).show() : this.shown ? this.hide() : this;
    },
    matcher: function matcher(a) {
      return ~a.toLowerCase().indexOf(this.query.toLowerCase());
    },
    sorter: function sorter(a) {
      for (var b, c = [], d = [], e = []; b = a.shift();) {
        b.toLowerCase().indexOf(this.query.toLowerCase()) ? ~b.indexOf(this.query) ? d.push(b) : e.push(b) : c.push(b);
      }

      return c.concat(d, e);
    },
    highlighter: function highlighter(a) {
      var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      return a.replace(new RegExp("(" + b + ")", "ig"), function (a, b) {
        return "<strong>" + b + "</strong>";
      });
    },
    render: function render(b) {
      var c = this;
      return b = a(b).map(function (b, d) {
        return b = a(c.options.item).attr("data-value", d), b.find("a").html(c.highlighter(d)), b[0];
      }), b.first().addClass("active"), this.$menu.html(b), this;
    },
    next: function next(b) {
      var c = this.$menu.find(".active").removeClass("active"),
          d = c.next();
      d.length || (d = a(this.$menu.find("li")[0])), d.addClass("active");
    },
    prev: function prev(a) {
      var b = this.$menu.find(".active").removeClass("active"),
          c = b.prev();
      c.length || (c = this.$menu.find("li").last()), c.addClass("active");
    },
    listen: function listen() {
      this.$element.on("focus", a.proxy(this.focus, this)).on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", a.proxy(this.keydown, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this)).on("mouseleave", "li", a.proxy(this.mouseleave, this));
    },
    eventSupported: function eventSupported(a) {
      var b = (a in this.$element);
      return b || (this.$element.setAttribute(a, "return;"), b = "function" == typeof this.$element[a]), b;
    },
    move: function move(a) {
      if (this.shown) {
        switch (a.keyCode) {
          case 9:
          case 13:
          case 27:
            a.preventDefault();
            break;

          case 38:
            a.preventDefault(), this.prev();
            break;

          case 40:
            a.preventDefault(), this.next();
        }

        a.stopPropagation();
      }
    },
    keydown: function keydown(b) {
      this.suppressKeyPressRepeat = ~a.inArray(b.keyCode, [40, 38, 9, 13, 27]), this.move(b);
    },
    keypress: function keypress(a) {
      this.suppressKeyPressRepeat || this.move(a);
    },
    keyup: function keyup(a) {
      switch (a.keyCode) {
        case 40:
        case 38:
        case 16:
        case 17:
        case 18:
          break;

        case 9:
        case 13:
          if (!this.shown) return;
          this.select();
          break;

        case 27:
          if (!this.shown) return;
          this.hide();
          break;

        default:
          this.lookup();
      }

      a.stopPropagation(), a.preventDefault();
    },
    focus: function focus(a) {
      this.focused = !0;
    },
    blur: function blur(a) {
      this.focused = !1, !this.mousedover && this.shown && this.hide();
    },
    click: function click(a) {
      a.stopPropagation(), a.preventDefault(), this.select(), this.$element.focus();
    },
    mouseenter: function mouseenter(b) {
      this.mousedover = !0, this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active");
    },
    mouseleave: function mouseleave(a) {
      this.mousedover = !1, !this.focused && this.shown && this.hide();
    }
  };
  var c = a.fn.bs_typeahead;
  a.fn.bs_typeahead = function (c) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs_typeahead"),
          f = "object" == _typeof(c) && c;
      e || d.data("bs_typeahead", e = new b(this, f)), "string" == typeof c && e[c]();
    });
  }, a.fn.bs_typeahead.defaults = {
    source: [],
    items: 8,
    menu: '<ul class="typeahead dropdown-menu"></ul>',
    item: '<li><a href="#"></a></li>',
    minLength: 1
  }, a.fn.bs_typeahead.Constructor = b, a.fn.bs_typeahead.noConflict = function () {
    return a.fn.bs_typeahead = c, this;
  }, a(document).on("focus.bs_typeahead.data-api", '[data-provide="bs_typeahead"]', function (b) {
    var c = a(this);
    c.data("bs_typeahead") || c.bs_typeahead(c.data());
  });
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  a.fn.ace_wysiwyg = function (b, c) {
    var d = a.extend({
      speech_button: !0,
      wysiwyg: {}
    }, b),
        e = ["#ac725e", "#d06b64", "#f83a22", "#fa573c", "#ff7537", "#ffad46", "#42d692", "#16a765", "#7bd148", "#b3dc6c", "#fbe983", "#fad165", "#92e1c0", "#9fe1e7", "#9fc6e7", "#4986e7", "#9a9cff", "#b99aff", "#c2c2c2", "#cabdbf", "#cca6ac", "#f691b2", "#cd74e6", "#a47ae2", "#444444"],
        f = {
      font: {
        values: ["Arial", "Courier", "Comic Sans MS", "Helvetica", "Open Sans", "Tahoma", "Verdana"],
        icon: "fa fa-font",
        title: "Font"
      },
      fontSize: {
        values: {
          5: "Huge",
          3: "Normal",
          1: "Small"
        },
        icon: "fa fa-text-height",
        title: "Font Size"
      },
      bold: {
        icon: "fa fa-bold",
        title: "Bold (Ctrl/Cmd+B)"
      },
      italic: {
        icon: "fa fa-italic",
        title: "Italic (Ctrl/Cmd+I)"
      },
      strikethrough: {
        icon: "fa fa-strikethrough",
        title: "Strikethrough"
      },
      underline: {
        icon: "fa fa-underline",
        title: "Underline"
      },
      insertunorderedlist: {
        icon: "fa fa-list-ul",
        title: "Bullet list"
      },
      insertorderedlist: {
        icon: "fa fa-list-ol",
        title: "Number list"
      },
      outdent: {
        icon: "fa fa-outdent",
        title: "Reduce indent (Shift+Tab)"
      },
      indent: {
        icon: "fa fa-indent",
        title: "Indent (Tab)"
      },
      justifyleft: {
        icon: "fa fa-align-left",
        title: "Align Left (Ctrl/Cmd+L)"
      },
      justifycenter: {
        icon: "fa fa-align-center",
        title: "Center (Ctrl/Cmd+E)"
      },
      justifyright: {
        icon: "fa fa-align-right",
        title: "Align Right (Ctrl/Cmd+R)"
      },
      justifyfull: {
        icon: "fa fa-align-justify",
        title: "Justify (Ctrl/Cmd+J)"
      },
      createLink: {
        icon: "fa fa-link",
        title: "Hyperlink",
        button_text: "Add",
        placeholder: "URL",
        button_class: "btn-primary"
      },
      unlink: {
        icon: "fa fa-chain-broken",
        title: "Remove Hyperlink"
      },
      insertImage: {
        icon: "fa fa-picture-o",
        title: "Insert picture",
        button_text: '<i class="' + ace.vars.icon + 'fa fa-file"></i> Choose Image &hellip;',
        placeholder: "Image URL",
        button_insert: "Insert",
        button_class: "btn-success",
        button_insert_class: "btn-primary",
        choose_file: !0
      },
      foreColor: {
        values: e,
        title: "Change Color"
      },
      backColor: {
        values: e,
        title: "Change Background Color"
      },
      undo: {
        icon: "fa fa-undo",
        title: "Undo (Ctrl/Cmd+Z)"
      },
      redo: {
        icon: "fa fa-repeat",
        title: "Redo (Ctrl/Cmd+Y)"
      },
      viewSource: {
        icon: "fa fa-code",
        title: "View Source"
      }
    },
        g = d.toolbar || ["font", null, "fontSize", null, "bold", "italic", "strikethrough", "underline", null, "insertunorderedlist", "insertorderedlist", "outdent", "indent", null, "justifyleft", "justifycenter", "justifyright", "justifyfull", null, "createLink", "unlink", null, "insertImage", null, "foreColor", null, "undo", "redo", null, "viewSource"];
    return this.each(function () {
      var b = ' <div class="wysiwyg-toolbar btn-toolbar center"> <div class="btn-group"> ';

      for (var c in g) {
        if (g.hasOwnProperty(c)) {
          var e = g[c];

          if (null === e) {
            b += ' </div> <div class="btn-group"> ';
            continue;
          }

          if ("string" == typeof e && e in f) e = f[e], e.name = g[c];else {
            if (!("object" == _typeof(e) && e.name in f)) continue;
            e = a.extend(f[e.name], e);
          }
          var h = "className" in e ? e.className : "btn-default";

          switch (e.name) {
            case "font":
              b += ' <a class="btn btn-sm ' + h + ' dropdown-toggle" data-toggle="dropdown" title="' + e.title + '"><i class="' + ace.vars.icon + e.icon + '"></i><i class="' + ace.vars.icon + 'fa fa-angle-down icon-on-right"></i></a> ', b += ' <ul class="dropdown-menu dropdown-light dropdown-caret">';

              for (var i in e.values) {
                e.values.hasOwnProperty(i) && (b += ' <li><a data-edit="fontName ' + e.values[i] + '" style="font-family:\'' + e.values[i] + "'\">" + e.values[i] + "</a></li> ");
              }

              b += " </ul>";
              break;

            case "fontSize":
              b += ' <a class="btn btn-sm ' + h + ' dropdown-toggle" data-toggle="dropdown" title="' + e.title + '"><i class="' + ace.vars.icon + e.icon + '"></i>&nbsp;<i class="' + ace.vars.icon + 'fa fa-angle-down icon-on-right"></i></a> ', b += ' <ul class="dropdown-menu dropdown-light dropdown-caret"> ';

              for (var j in e.values) {
                e.values.hasOwnProperty(j) && (b += ' <li><a data-edit="fontSize ' + j + '"><font size="' + j + '">' + e.values[j] + "</font></a></li> ");
              }

              b += " </ul> ";
              break;

            case "createLink":
              b += ' <div class="btn-group"> <a class="btn btn-sm ' + h + ' dropdown-toggle" data-toggle="dropdown" title="' + e.title + '"><i class="' + ace.vars.icon + e.icon + '"></i></a> ', b += ' <div class="dropdown-menu dropdown-caret dropdown-menu-right">							 <div class="input-group">								<input class="form-control" placeholder="' + e.placeholder + '" type="text" data-edit="' + e.name + '" />								<span class="input-group-btn">									<button class="btn btn-sm ' + e.button_class + '" type="button">' + e.button_text + "</button>								</span>							 </div>						</div> </div>";
              break;

            case "insertImage":
              b += ' <div class="btn-group"> <a class="btn btn-sm ' + h + ' dropdown-toggle" data-toggle="dropdown" title="' + e.title + '"><i class="' + ace.vars.icon + e.icon + '"></i></a> ', b += ' <div class="dropdown-menu dropdown-caret dropdown-menu-right">							 <div class="input-group">								<input class="form-control" placeholder="' + e.placeholder + '" type="text" data-edit="' + e.name + '" />								<span class="input-group-btn">									<button class="btn btn-sm ' + e.button_insert_class + '" type="button">' + e.button_insert + "</button>								</span>							 </div>", e.choose_file && "FileReader" in window && (b += '<div class="space-2"></div>							 <label class="center block no-margin-bottom">								<button class="btn btn-sm ' + e.button_class + ' wysiwyg-choose-file" type="button">' + e.button_text + '</button>								<input type="file" data-edit="' + e.name + '" />							  </label>'), b += " </div> </div>";
              break;

            case "foreColor":
            case "backColor":
              b += ' <select class="hide wysiwyg_colorpicker" title="' + e.title + '"> ', a.each(e.values, function (a, c) {
                b += ' <option value="' + c + '">' + c + "</option> ";
              }), b += " </select> ", b += ' <input style="display:none;" disabled class="hide" type="text" data-edit="' + e.name + '" /> ';
              break;

            case "viewSource":
              b += ' <a class="btn btn-sm ' + h + '" data-view="source" title="' + e.title + '"><i class="' + ace.vars.icon + e.icon + '"></i></a> ';
              break;

            default:
              b += ' <a class="btn btn-sm ' + h + '" data-edit="' + e.name + '" title="' + e.title + '"><i class="' + ace.vars.icon + e.icon + '"></i></a> ';
          }
        }
      }

      b += " </div> ";
      var k;
      d.speech_button && "onwebkitspeechchange" in (k = document.createElement("input")) && (b += ' <input class="wysiwyg-speech-input" type="text" data-edit="inserttext" x-webkit-speech />'), k = null, b += " </div> ", b = d.toolbar_place ? d.toolbar_place.call(this, b) : a(this).before(b).prev(), a.fn.tooltip && b.find("a[title]").tooltip({
        animation: !1,
        container: "body"
      }), b.find(".dropdown-menu input[type=text]").on("click", function () {
        return !1;
      }).on("change", function () {
        a(this).closest(".dropdown-menu").siblings(".dropdown-toggle").dropdown("toggle");
      }).on("keydown", function (b) {
        27 == b.which ? (this.value = "", a(this).change()) : 13 == b.which && (b.preventDefault(), b.stopPropagation(), a(this).change());
      }), b.find("input[type=file]").prev().on(ace.click_event, function (b) {
        a(this).next().click();
      }), b.find(".wysiwyg_colorpicker").each(function () {
        var b = a(this).ace_colorpicker({
          pull_right: !0
        }).change(function () {
          a(this).nextAll("input").eq(0).val(this.value).change();
        }).next().find(".btn-colorpicker");
        a.fn.tooltip && b.tooltip({
          title: this.title,
          animation: !1,
          container: "body"
        });
      });
      var l = a(this),
          m = !1;
      b.find("a[data-view=source]").on("click", function (b) {
        if (b.preventDefault(), m) {
          var c = l.next();
          l.html(c.val()).show(), c.remove(), a(this).removeClass("active");
        } else a("<textarea />").css({
          width: l.outerWidth(),
          height: l.outerHeight()
        }).val(l.html()).insertAfter(l), l.hide(), a(this).addClass("active");

        m = !m;
      });
      var n = a.extend({}, {
        activeToolbarClass: "active",
        toolbarSelector: b
      }, d.wysiwyg || {});
      a(this).wysiwyg(n);
    }), this;
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  function c(b, c) {
    var d = ace.helper.getAttrSettings(b, a.fn.ace_spinner.defaults),
        e = a.extend({}, a.fn.ace_spinner.defaults, c, d),
        f = e.max;
    f = ("" + f).length;
    var g = parseInt(Math.max(20 * f + 40, 90)),
        h = a(b),
        i = "btn-sm",
        j = 2;
    h.hasClass("input-sm") ? (i = "btn-xs", j = 1) : h.hasClass("input-lg") && (i = "btn-lg", j = 3), 2 == j ? g += 25 : 3 == j && (g += 50), h.addClass("spinbox-input form-control text-center").wrap('<div class="ace-spinner middle">');
    var k = h.closest(".ace-spinner").spinbox(e).wrapInner("<div class='input-group'></div>"),
        l = k.data("fu.spinbox");
    e.on_sides ? (h.before('<div class="spinbox-buttons input-group-btn">					<button type="button" class="btn spinbox-down ' + i + " " + e.btn_down_class + '">						<i class="icon-only ' + ace.vars.icon + e.icon_down + '"></i>					</button>				</div>').after('<div class="spinbox-buttons input-group-btn">					<button type="button" class="btn spinbox-up ' + i + " " + e.btn_up_class + '">						<i class="icon-only ' + ace.vars.icon + e.icon_up + '"></i>					</button>				</div>'), k.addClass("touch-spinner"), k.css("width", g + "px")) : (h.after('<div class="spinbox-buttons input-group-btn">					<button type="button" class="btn spinbox-up ' + i + " " + e.btn_up_class + '">						<i class="icon-only ' + ace.vars.icon + e.icon_up + '"></i>					</button>					<button type="button" class="btn spinbox-down ' + i + " " + e.btn_down_class + '">						<i class="icon-only ' + ace.vars.icon + e.icon_down + '"></i>					</button>				</div>'), ace.vars.touch || e.touch_spinner ? (k.addClass("touch-spinner"), k.css("width", g + "px")) : (h.next().addClass("btn-group-vertical"), k.css("width", g + "px"))), k.on("changed", function () {
      h.trigger("change");
    }), this._call = function (a, b) {
      l[a](b);
    };
  }

  a.fn.ace_spinner = function (d, e) {
    var f,
        g = this.each(function () {
      var b = a(this),
          g = b.data("ace_spinner"),
          h = "object" == _typeof(d) && d;
      g || (h = a.extend({}, a.fn.ace_spinner.defaults, d), b.data("ace_spinner", g = new c(this, h))), "string" == typeof d && (f = g._call(d, e));
    });
    return f === b ? g : f;
  }, a.fn.ace_spinner.defaults = {
    icon_up: "fa fa-chevron-up",
    icon_down: "fa fa-chevron-down",
    on_sides: !1,
    btn_up_class: "",
    btn_down_class: "",
    max: 999,
    touch_spinner: !1
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  a.fn.aceTree = a.fn.ace_tree = function (b) {
    var c = {
      "open-icon": ace.vars.icon + "fa fa-folder-open",
      "close-icon": ace.vars.icon + "fa fa-folder",
      "toggle-icon": ace.vars.icon + "fa fa-play",
      "selected-icon": ace.vars.icon + "fa fa-check",
      "unselected-icon": ace.vars.icon + "fa fa-times",
      "base-icon": ace.vars.icon + "fa",
      "folder-open-icon": "fa fa-plus-square-o",
      "folder-close-icon": "fa fa-plus-minus-o",
      loadingHTML: "Loading..."
    };
    return this.each(function () {
      var d = ace.helper.getAttrSettings(this, c),
          e = a.extend({}, c, b, d),
          f = a(this);
      f.addClass("tree").attr("role", "tree"), f.html('<li class="tree-branch hide" data-template="treebranch" role="treeitem" aria-expanded="false">				' + (e.folderSelect ? '<i class="icon-caret ' + e["folder-open-icon"] + '"></i>&nbsp;' : "") + '				<div class="tree-branch-header">					<span class="tree-branch-name">						<i class="icon-folder ' + e["close-icon"] + '"></i>						<span class="tree-label"></span>					</span>				</div>				<ul class="tree-branch-children" role="group"></ul>				<div class="tree-loader" role="alert">' + e.loadingHTML + '</div>			</li>			<li class="tree-item hide" data-template="treeitem" role="treeitem">				<span class="tree-item-name">				  ' + (null == e["unselected-icon"] ? "" : '<i class="icon-item ' + e["unselected-icon"] + '"></i>') + '				  <span class="tree-label"></span>				</span>			</li>'), f.addClass(1 == e.selectable ? "tree-selectable" : "tree-unselectable"), f.tree(e);
    }), this;
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  a.fn.aceWizard = a.fn.ace_wizard = function (b) {
    return this.each(function () {
      var c = a(this);
      c.wizard(), ace.vars.old_ie && c.find("ul.steps > li").last().addClass("last-child");
      var d = b && b.buttons ? a(b.buttons) : c.siblings(".wizard-actions").eq(0),
          e = c.data("fu.wizard");
      e.$prevBtn.remove(), e.$nextBtn.remove(), e.$prevBtn = d.find(".btn-prev").eq(0).on(ace.click_event, function () {
        e.previous();
      }).attr("disabled", "disabled"), e.$nextBtn = d.find(".btn-next").eq(0).on(ace.click_event, function () {
        e.next();
      }).removeAttr("disabled"), e.nextText = e.$nextBtn.text();
      var f = b && (b.selectedItem && b.selectedItem.step || b.step);
      f && (e.currentStep = f, e.setState());
    }), this;
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  function c(b, c) {
    var e = this,
        f = a(b),
        g = "right",
        h = !1,
        i = f.hasClass("fade"),
        j = ace.helper.getAttrSettings(b, a.fn.ace_aside.defaults);
    if (this.settings = a.extend({}, a.fn.ace_aside.defaults, c, j), !this.settings.background || c.scroll_style || j.scroll_style || (this.settings.scroll_style = "scroll-white no-track"), this.container = this.settings.container, this.container) try {
      a(this.container).get(0) == document.body && (this.container = null);
    } catch (k) {}
    this.container && (this.settings.backdrop = !1, f.addClass("aside-contained"));
    var l = f.find(".modal-dialog"),
        m = f.find(".modal-content"),
        n = 300;
    this.initiate = function () {
      b.className = b.className.replace(/(\s|^)aside\-(right|top|left|bottom)(\s|$)/gi, "$1$3"), g = this.settings.placement, g && (g = a.trim(g.toLowerCase())), g && /right|top|left|bottom/.test(g) || (g = "right"), f.attr("data-placement", g), f.addClass("aside-" + g), /right|left/.test(g) ? (h = !0, f.addClass("aside-vc")) : f.addClass("aside-hz"), this.settings.fixed && f.addClass("aside-fixed"), this.settings.background && f.addClass("aside-dark"), this.settings.offset && f.addClass("navbar-offset"), this.settings.transition || f.addClass("transition-off"), f.addClass("aside-hidden"), this.insideContainer(), l = f.find(".modal-dialog"), m = f.find(".modal-content"), this.settings.body_scroll || f.on("mousewheel.aside DOMMouseScroll.aside touchmove.aside pointermove.aside", function (b) {
        return a.contains(m[0], b.target) ? void 0 : (b.preventDefault(), !1);
      }), 0 == this.settings.backdrop && f.addClass("no-backdrop");
    }, this.show = function () {
      if (0 == this.settings.backdrop) try {
        f.data("bs.modal").$backdrop.remove();
      } catch (b) {}
      this.container ? a(this.container).addClass("overflow-hidden") : f.css("position", "fixed"), f.removeClass("aside-hidden");
    }, this.hide = function () {
      this.container && (this.container.addClass("overflow-hidden"), ace.vars.firefox && b.offsetHeight), o(), ace.vars.transition && !i && f.one("bsTransitionEnd", function () {
        f.addClass("aside-hidden"), f.css("position", ""), e.container && e.container.removeClass("overflow-hidden");
      }).emulateTransitionEnd(n);
    }, this.shown = function () {
      if (o(), a("body").removeClass("modal-open").css("padding-right", ""), "invisible" == this.settings.backdrop) try {
        f.data("bs.modal").$backdrop.css("opacity", 0);
      } catch (b) {}
      var c = h ? m.height() : l.height();
      ace.vars.touch ? m.addClass("overflow-scroll").css("max-height", c + "px") : m.hasClass("ace-scroll") || m.ace_scroll({
        size: c,
        reset: !0,
        mouseWheelLock: !0,
        lockAnyway: !this.settings.body_scroll,
        styleClass: this.settings.scroll_style,
        observeContent: !0,
        hideOnIdle: !ace.vars.old_ie,
        hideDelay: 1500
      }), d.off("resize.modal.aside").on("resize.modal.aside", function () {
        if (ace.vars.touch) m.css("max-height", (h ? m.height() : l.height()) + "px");else {
          m.ace_scroll("disable");
          var a = h ? m.height() : l.height();
          m.ace_scroll("update", {
            size: a
          }).ace_scroll("enable").ace_scroll("reset");
        }
      }).triggerHandler("resize.modal.aside"), e.container && ace.vars.transition && !i && f.one("bsTransitionEnd", function () {
        e.container.removeClass("overflow-hidden");
      }).emulateTransitionEnd(n);
    }, this.hidden = function () {
      d.off(".aside"), ace.vars.transition && !i || (f.addClass("aside-hidden"), f.css("position", ""));
    }, this.insideContainer = function () {
      var b = a(".main-container"),
          c = f.find(".modal-dialog");

      if (c.css({
        right: "",
        left: ""
      }), b.hasClass("container")) {
        var e = !1;
        1 == h && (c.css(g, parseInt((d.width() - b.width()) / 2)), e = !0), e && ace.vars.firefox && ace.helper.redraw(b[0]);
      }
    }, this.flip = function () {
      var a = {
        right: "left",
        left: "right",
        top: "bottom",
        bottom: "top"
      };
      f.removeClass("aside-" + g).addClass("aside-" + a[g]), g = a[g];
    };

    var o = function o() {
      var a = f.find(".aside-trigger");

      if (0 != a.length) {
        a.toggleClass("open");
        var b = a.find(ace.vars[".icon"]);
        0 != b.length && b.toggleClass(b.attr("data-icon1") + " " + b.attr("data-icon2"));
      }
    };

    this.initiate(), this.container && (this.container = a(this.container)), f.appendTo(this.container || "body");
  }

  var d = a(window);
  a(document).on("show.bs.modal", ".modal.aside", function (b) {
    a(".aside.in").modal("hide"), a(this).ace_aside("show");
  }).on("hide.bs.modal", ".modal.aside", function (b) {
    a(this).ace_aside("hide");
  }).on("shown.bs.modal", ".modal.aside", function (b) {
    a(this).ace_aside("shown");
  }).on("hidden.bs.modal", ".modal.aside", function (b) {
    a(this).ace_aside("hidden");
  }), a(window).on("resize.aside_container", function () {
    a(".modal.aside").ace_aside("insideContainer");
  }), a(document).on("settings.ace.aside", function (b, c) {
    "main_container_fixed" == c && a(".modal.aside").ace_aside("insideContainer");
  }), a.fn.aceAside = a.fn.ace_aside = function (d, e) {
    var f,
        g = this.each(function () {
      var b = a(this),
          g = b.data("ace_aside"),
          h = "object" == _typeof(d) && d;
      g || b.data("ace_aside", g = new c(this, h)), "string" == typeof d && "function" == typeof g[d] && (f = e instanceof Array ? g[d].apply(g, e) : g[d](e));
    });
    return f === b ? g : f;
  }, a.fn.ace_aside.defaults = {
    fixed: !1,
    background: !1,
    offset: !1,
    body_scroll: !1,
    transition: !0,
    scroll_style: "scroll-dark no-track",
    container: null,
    backdrop: !1,
    placement: "right"
  };
}(__webpack_provided_window_dot_jQuery);

/***/ }),

/***/ "./assets/js/ace.min.js":
/*!******************************!*\
  !*** ./assets/js/ace.min.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var __webpack_provided_window_dot_jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

/*!
 * Ace v1.4.0
 */
if ("undefined" == typeof jQuery) throw new Error("Ace's JavaScript requires jQuery");
!function (a) {
  "ace" in window || (window.ace = {}), "helper" in window.ace || (window.ace.helper = {}), "vars" in window.ace || (window.ace.vars = {}), window.ace.vars.icon = " ace-icon ", window.ace.vars[".icon"] = ".ace-icon", ace.vars.touch = "ontouchstart" in window;
  var b = navigator.userAgent;
  ace.vars.webkit = !!b.match(/AppleWebKit/i), ace.vars.safari = !!b.match(/Safari/i) && !b.match(/Chrome/i), ace.vars.android = ace.vars.safari && !!b.match(/Android/i), ace.vars.ios_safari = !!b.match(/OS ([4-9])(_\d)+ like Mac OS X/i) && !b.match(/CriOS/i), ace.vars.ie = window.navigator.msPointerEnabled || document.all && document.querySelector, ace.vars.old_ie = document.all && !document.addEventListener, ace.vars.very_old_ie = document.all && !document.querySelector, ace.vars.firefox = "MozAppearance" in document.documentElement.style, ace.vars.non_auto_fixed = ace.vars.android || ace.vars.ios_safari, ace.click_event = ace.vars.touch && jQuery.fn.tap ? "tap" : "click";
}(), function (a, b) {
  a.unCamelCase = function (a) {
    return a.replace(/([a-z])([A-Z])/g, function (a, b, c) {
      return b + "-" + c.toLowerCase();
    });
  }, a.strToVal = function (a) {
    var b = a.match(/^(?:(true)|(false)|(null)|(\-?[\d]+(?:\.[\d]+)?)|(\[.*\]|\{.*\}))$/i),
        c = a;
    if (b) if (b[1]) c = !0;else if (b[2]) c = !1;else if (b[3]) c = null;else if (b[4]) c = parseFloat(a);else if (b[5]) try {
      c = JSON.parse(a);
    } catch (d) {}
    return c;
  }, a.getAttrSettings = function (b, c, d) {
    if (b) {
      var e = c instanceof Array ? 1 : 2,
          d = d ? d.replace(/([^\-])$/, "$1-") : "";
      d = "data-" + d;
      var f = {};

      for (var g in c) {
        if (c.hasOwnProperty(g)) {
          var h,
              i = 1 == e ? c[g] : g,
              j = a.unCamelCase(i.replace(/[^A-Za-z0-9]{1,}/g, "-")).toLowerCase();
          if (!(h = b.getAttribute(d + j))) continue;
          f[i] = a.strToVal(h);
        }
      }

      return f;
    }
  }, a.scrollTop = function () {
    return document.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
  }, a.winHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  }, a.redraw = function (a, b) {
    if (a) {
      var c = a.style.display;
      a.style.display = "none", a.offsetHeight, b !== !0 ? a.style.display = c : setTimeout(function () {
        a.style.display = c;
      }, 10);
    }
  };
}(ace.helper), jQuery(function (a) {
  try {
    ace.demo.init();
  } catch (b) {}
}), function (a, b) {
  ace.demo = {
    functions: {},
    init: function init(a) {
      var a = !!a && !0;
      if ("undefined" == typeof requirejs || a) for (var b in ace.demo.functions) {
        ace.demo.functions.hasOwnProperty(b) && ace.demo.functions[b]();
      }
    }
  }, ace.demo.functions.basics = function () {
    ace.vars.non_auto_fixed && a("body").addClass("mob-safari"), ace.vars.transition = ace.vars.animation || !!a.support.transition;
  }, ace.demo.functions.enableSidebar = function () {
    var b = a(".sidebar");
    a.fn.ace_sidebar && b.ace_sidebar(), a.fn.ace_sidebar_scroll && b.ace_sidebar_scroll({
      include_toggle: ace.vars.safari || ace.vars.ios_safari
    }), a.fn.ace_sidebar_hover && b.ace_sidebar_hover({
      sub_hover_delay: 750,
      sub_scroll_style: "no-track scroll-thin scroll-margin scroll-visible"
    });
  }, ace.demo.functions.enableDemoAjax = function () {
    if (a.fn.ace_ajax) {
      window.Pace && (window.paceOptions = {
        ajax: !0,
        document: !0,
        eventLag: !1
      });
      var b = {
        close_active: !0,
        close_mobile_menu: "#sidebar",
        close_dropdowns: !0,
        default_url: "page/index",
        content_url: function content_url(a) {
          if (!a.match(/^page\//)) return !1;
          var b = document.location.pathname;
          return b.match(/(\/ajax\/)(index\.html)?/) ? b.replace(/(\/ajax\/)(index\.html)?/, "/ajax/content/" + a.replace(/^page\//, "") + ".html") : b + "?" + a.replace(/\//, "=");
        }
      };
      b.loading_overlay = "body", a("[data-ajax-content=true]").ace_ajax(b), a(window).on("error.ace_ajax", function () {
        a("[data-ajax-content=true]").each(function () {
          var b = a(this);
          b.ace_ajax("working") && (window.Pace && Pace.running && Pace.stop(), b.ace_ajax("stopLoading", !0));
        });
      });
    }
  }, ace.demo.functions.handleScrollbars = function () {
    var b = !!a.fn.ace_scroll;
    b && a(".dropdown-content").ace_scroll({
      reset: !1,
      mouseWheelLock: !0
    }), b && !ace.vars.old_ie && (a(window).on("resize.reset_scroll", function () {
      a(".ace-scroll:not(.scroll-disabled)").not(":hidden").ace_scroll("reset");
    }), b && a(document).on("settings.ace.reset_scroll", function (b, c) {
      "sidebar_collapsed" == c && a(".ace-scroll:not(.scroll-disabled)").not(":hidden").ace_scroll("reset");
    }));
  }, ace.demo.functions.dropdownAutoPos = function () {
    a(document).on("click.dropdown.pos", '.dropdown-toggle[data-position="auto"]', function () {
      var b = a(this).offset(),
          c = a(this.parentNode);
      parseInt(b.top + a(this).height()) + 50 > ace.helper.scrollTop() + ace.helper.winHeight() - c.find(".dropdown-menu").eq(0).height() ? c.addClass("dropup") : c.removeClass("dropup");
    });
  }, ace.demo.functions.navbarHelpers = function () {
    a('.ace-nav [class*="icon-animated-"]').closest("a").one("click", function () {
      var b = a(this).find('[class*="icon-animated-"]').eq(0),
          c = b.attr("class").match(/icon\-animated\-([\d\w]+)/);
      b.removeClass(c[0]);
    }), a(document).on("click", ".dropdown-navbar .nav-tabs", function (b) {
      b.stopPropagation();
      var c;
      b.target;
      (c = a(b.target).closest("[data-toggle=tab]")) && c.length > 0 && (c.tab("show"), b.preventDefault(), a(window).triggerHandler("resize.navbar.dropdown"));
    });
  }, ace.demo.functions.sidebarTooltips = function () {
    a(".sidebar .nav-list .badge[title],.sidebar .nav-list .badge[title]").each(function () {
      var b = a(this).attr("class").match(/tooltip\-(?:\w+)/);
      b = b ? b[0] : "tooltip-error", a(this).tooltip({
        placement: function placement(b, c) {
          var d = a(c).offset();
          return parseInt(d.left) < parseInt(document.body.scrollWidth / 2) ? "right" : "left";
        },
        container: "body",
        template: '<div class="tooltip ' + b + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
      });
    });
  }, ace.demo.functions.someBrowserFix = function () {
    if (ace.vars.webkit) {
      var b = a(".ace-nav").get(0);
      b && a(window).on("resize.webkit_fix", function () {
        ace.helper.redraw(b);
      });
    }

    ace.vars.ios_safari && a(document).on("ace.settings.ios_fix", function (b, c, d) {
      "navbar_fixed" == c && (a(document).off("focus.ios_fix blur.ios_fix", "input,textarea,.wysiwyg-editor"), 1 == d && a(document).on("focus.ios_fix", "input,textarea,.wysiwyg-editor", function () {
        a(window).on("scroll.ios_fix", function () {
          var b = a("#navbar").get(0);
          b && ace.helper.redraw(b);
        });
      }).on("blur.ios_fix", "input,textarea,.wysiwyg-editor", function () {
        a(window).off("scroll.ios_fix");
      }));
    }).triggerHandler("ace.settings.ios_fix", ["navbar_fixed", "fixed" == a("#navbar").css("position")]);
  }, ace.demo.functions.bsCollapseToggle = function () {
    a(document).on("hide.bs.collapse show.bs.collapse", function (b) {
      var c = b.target.getAttribute("id"),
          d = a('a[href*="#' + c + '"]');
      0 == d.length && (d = a('a[data-target*="#' + c + '"]')), 0 != d.length && d.find(ace.vars[".icon"]).each(function () {
        var c,
            d = a(this),
            e = null,
            f = null;
        return (e = d.attr("data-icon-show")) ? f = d.attr("data-icon-hide") : (c = d.attr("class").match(/fa\-(.*)\-(up|down)/)) && (e = "fa-" + c[1] + "-down", f = "fa-" + c[1] + "-up"), e ? ("show" == b.type ? d.removeClass(e).addClass(f) : d.removeClass(f).addClass(e), !1) : void 0;
      });
    });
  }, ace.demo.functions.smallDeviceDropdowns = function () {
    function b() {
      var b = a(this).find("> .dropdown-menu");

      if ("fixed" == b.css("position")) {
        var d = parseInt(a(window).width()),
            e = d > 320 ? 60 : d > 240 ? 40 : 30,
            f = parseInt(d) - e,
            g = parseInt(a(window).height()) - 30,
            h = parseInt(Math.min(f, 320));
        b.css("width", h);
        var i = !1,
            j = 0,
            k = b.find(".tab-pane.active .dropdown-content.ace-scroll");
        0 == k.length ? k = b.find(".dropdown-content.ace-scroll") : i = !0;
        var l = k.closest(".dropdown-menu"),
            m = b[0].scrollHeight;

        if (1 == k.length) {
          var n = k.find(".scroll-content")[0];
          n && (m = n.scrollHeight), j += l.find(".dropdown-header").outerHeight(), j += l.find(".dropdown-footer").outerHeight();
          var o = l.closest(".tab-content");
          0 != o.length && (j += o.siblings(".nav-tabs").eq(0).height());
        }

        var p = parseInt(Math.min(g, 480, m + j)),
            q = parseInt(Math.abs((f + e - h) / 2)),
            r = parseInt(Math.abs((g + 30 - p) / 2)),
            s = parseInt(b.css("z-index")) || 0;

        if (b.css({
          height: p,
          left: q,
          right: "auto",
          top: r - (i ? 3 : 1)
        }), 1 == k.length && (ace.vars.touch ? k.ace_scroll("disable").css("max-height", p - j).addClass("overflow-scroll") : k.ace_scroll("update", {
          size: p - j
        }).ace_scroll("enable").ace_scroll("reset")), b.css("height", p + (i ? 7 : 2)), b.hasClass("user-menu")) {
          b.css("height", "");
          var t = a(this).find(".user-info");
          1 == t.length && "fixed" == t.css("position") ? t.css({
            left: q,
            right: "auto",
            top: r,
            width: h - 2,
            "max-width": h - 2,
            "z-index": s + 1
          }) : t.css({
            left: "",
            right: "",
            top: "",
            width: "",
            "max-width": "",
            "z-index": ""
          });
        }

        a(this).closest(".navbar.navbar-fixed-top").css("z-index", s);
      } else 0 != b.length && c.call(this, b);
    }

    function c(b) {
      if (b = b || a(this).find("> .dropdown-menu"), b.length > 0 && (b.css({
        width: "",
        height: "",
        left: "",
        right: "",
        top: ""
      }).find(".dropdown-content").each(function () {
        ace.vars.touch && a(this).css("max-height", "").removeClass("overflow-scroll");
        var b = parseInt(a(this).attr("data-size") || 0) || a.fn.ace_scroll.defaults.size;
        a(this).ace_scroll("update", {
          size: b
        }).ace_scroll("enable").ace_scroll("reset");
      }), b.hasClass("user-menu"))) {
        a(this).find(".user-info").css({
          left: "",
          right: "",
          top: "",
          width: "",
          "max-width": "",
          "z-index": ""
        });
      }

      a(this).closest(".navbar").css("z-index", "");
    }

    ace.vars.old_ie || a(document).on("shown.bs.dropdown.navbar", ".ace-nav > li.dropdown-modal", function (c) {
      b.call(this);
      var d = this;
      a(window).on("resize.navbar.dropdown", function () {
        b.call(d);
      });
    }).on("hidden.bs.dropdown.navbar", ".ace-nav > li.dropdown-modal", function (b) {
      a(window).off("resize.navbar.dropdown"), c.call(this);
    });
  };
}(jQuery), function (a, b) {
  var c = a(".btn-scroll-up");

  if (c.length > 0) {
    var d = !1;
    a(window).on("scroll.scroll_btn", function () {
      var a = ace.helper.scrollTop(),
          b = ace.helper.winHeight(),
          e = document.body.scrollHeight;
      a > parseInt(b / 4) || a > 0 && e >= b && b + a >= e - 1 ? d || (c.addClass("display"), d = !0) : d && (c.removeClass("display"), d = !1);
    }).triggerHandler("scroll.scroll_btn"), c.on(ace.click_event, function () {
      var b = Math.min(500, Math.max(100, parseInt(ace.helper.scrollTop() / 3)));
      return a("html,body").animate({
        scrollTop: 0
      }, b), !1;
    });
  }
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  function c(b, c) {
    function e(b) {
      var c = "",
          d = a(".breadcrumb");

      if (d.length > 0 && d.is(":visible")) {
        d.find("> li:not(:first-child)").remove();
        var e = 0;
        b.parents(".nav li").each(function () {
          var b = a(this).find("> a"),
              f = b.clone();
          f.find("i,.fa,.glyphicon,.ace-icon,.menu-icon,.badge,.label").remove();
          var g = f.text();
          f.remove();
          var h = b.attr("href");

          if (0 == e) {
            var i = a('<li class="active"></li>').appendTo(d);
            i.text(g), c = g;
          } else {
            var i = a("<li><a /></li>").insertAfter(d.find("> li:first-child"));
            i.find("a").attr("href", h).text(g);
          }

          e++;
        });
      }

      return c;
    }

    function f(b) {
      var c = g.find(".ajax-append-title");
      if (c.length > 0) document.title = c.text(), c.remove();else if (b.length > 0) {
        var d = a.trim(String(document.title).replace(/^(.*)[\-]/, ""));
        d && (d = " - " + d), b = a.trim(b) + d;
      }
    }

    var g = a(b),
        h = this;
    g.attr("data-ajax-content", "true");
    var i = ace.helper.getAttrSettings(b, a.fn.ace_ajax.defaults);
    this.settings = a.extend({}, a.fn.ace_ajax.defaults, c, i);
    var j = !1,
        k = a();
    this.force_reload = !1, this.loadUrl = function (a, b, c) {
      var d = !1;
      a = a.replace(/^(\#\!)?\#/, ""), this.force_reload = b === !1, "function" == typeof this.settings.content_url && (d = this.settings.content_url(a)), "string" == typeof d && this.getUrl(d, a, c);
    }, this.loadAddr = function (a, b, c) {
      this.force_reload = c === !1, this.getUrl(a, b, !1);
    }, this.reload = function () {
      var b = a.trim(window.location.hash);
      !b && this.settings.default_url && (b = this.settings.default_url), this.loadUrl(b, !1);
    }, this.post = function (b, c, d, e) {
      var b = b || a.trim(location.href.replace(location.hash, ""));

      if (b) {
        var c = c || {},
            d = d || !1;
        this.getUrl(b, null, !1, "POST", c, d, e);
      }
    }, this.getUrl = function (b, c, d, i, l, m, n) {
      if (!j) {
        var o,
            i = i || "GET",
            m = "GET" == i || "POST" == i && 1 == m,
            l = l || null;

        if (g.trigger(o = a.Event("ajaxloadstart"), {
          url: b,
          hash: c,
          method: i,
          data: l
        }), !o.isDefaultPrevented()) {
          h.startLoading();
          var p = "GET" == i ? {
            url: b,
            cache: !this.force_reload
          } : {
            url: b,
            method: "POST",
            data: l
          };
          "POST" == i && "object" == _typeof(n) && (p = a.extend({}, p, n)), a.ajax(p).error(function () {
            g.trigger("ajaxloaderror", {
              url: b,
              hash: c,
              method: i,
              data: l
            }), h.stopLoading(!0);
          }).done(function (j) {
            if (g.trigger("ajaxloaddone", {
              url: b,
              hash: c,
              method: i,
              data: l
            }), "POST" == i) {
              var n;
              g.trigger(n = a.Event("ajaxpostdone", {
                url: b,
                data: l,
                result: j
              })), n.isDefaultPrevented() && (m = !1);
            }

            var o = null,
                p = "";
            if ("function" == typeof h.settings.update_active) o = h.settings.update_active.call(null, c, b, i, m);else if (h.settings.update_active === !0 && c && (o = a('a[data-url="' + c + '"]'), o.length > 0)) {
              var q = o.closest(".nav");

              if (q.length > 0) {
                q.find(".active").each(function () {
                  var b = "active";
                  (a(this).hasClass("hover") || h.settings.close_active) && (b += " open"), a(this).removeClass(b), h.settings.close_active && a(this).find(" > .submenu").css("display", "");
                });
                o.closest("li").addClass("active").parents(".nav li").addClass("active open");
                q.closest(".sidebar[data-sidebar-scroll=true]").each(function () {
                  var b = a(this);
                  b.ace_sidebar_scroll("reset"), 1 == d && b.ace_sidebar_scroll("scroll_to_active");
                });
              }
            }
            "function" == typeof h.settings.update_breadcrumbs ? p = h.settings.update_breadcrumbs.call(null, c, b, o, i, m) : h.settings.update_breadcrumbs === !0 && null != o && o.length > 0 && (p = e(o)), k.addClass("content-loaded").detach(), m && (j = String(j).replace(/<(title|link)([\s\>])/gi, '<div class="hidden ajax-append-$1"$2').replace(/<\/(title|link)\>/gi, "</div>"), g.empty().html(j)), a(h.settings.loading_overlay || g).append(k), m && setTimeout(function () {
              a("head").find("link.ace-ajax-stylesheet").remove();

              for (var b = ["link.ace-main-stylesheet", "link#main-ace-style", 'link[href*="/ace.min.css"]', 'link[href*="/ace.css"]'], c = [], d = 0; d < b.length && (c = a("head").find(b[d]).first(), !(c.length > 0)); d++) {
                ;
              }

              g.find(".ajax-append-link").each(function (b) {
                var d = a(this);

                if (d.attr("href")) {
                  var e = jQuery("<link />", {
                    type: "text/css",
                    rel: "stylesheet",
                    "class": "ace-ajax-stylesheet"
                  });
                  c.length > 0 ? e.insertBefore(c) : e.appendTo("head"), e.attr("href", d.attr("href"));
                }

                d.remove();
              });
            }, 10), "function" == typeof h.settings.update_title ? h.settings.update_title.call(null, c, b, p, i, m) : h.settings.update_title === !0 && "GET" == i && f(p), !d && m && a("html,body").animate({
              scrollTop: 0
            }, 250), g.trigger("ajaxloadcomplete", {
              url: b,
              hash: c,
              method: i,
              data: l
            });
            var r = /\.(?:\s*)ace(?:_a|A)jax(?:\s*)\((?:\s*)(?:\'|\")loadScripts(?:\'|\")/;
            j.match(r) ? h.stopLoading() : h.stopLoading(!0);
          });
        }
      }
    };
    var l = !1,
        m = null;
    this.startLoading = function () {
      j || (j = !0, this.settings.loading_overlay || "static" != g.css("position") || (g.css("position", "relative"), l = !0), k.remove(), k = a('<div class="ajax-loading-overlay"><i class="ajax-loading-icon ' + (this.settings.loading_icon || "") + '"></i> ' + this.settings.loading_text + "</div>"), "body" == this.settings.loading_overlay ? a("body").append(k.addClass("ajax-overlay-body")) : this.settings.loading_overlay ? a(this.settings.loading_overlay).append(k) : g.append(k), this.settings.max_load_wait !== !1 && (m = setTimeout(function () {
        if (m = null, j) {
          var b;
          g.trigger(b = a.Event("ajaxloadlong")), b.isDefaultPrevented() || h.stopLoading(!0);
        }
      }, 1e3 * this.settings.max_load_wait)));
    }, this.stopLoading = function (a) {
      a === !0 ? (j = !1, k.remove(), l && (g.css("position", ""), l = !1), null != m && (clearTimeout(m), m = null)) : (k.addClass("almost-loaded"), g.one("ajaxscriptsloaded.inner_call", function () {
        h.stopLoading(!0);
      }));
    }, this.working = function () {
      return j;
    }, this.loadScripts = function (b, c) {
      var b = b || [];
      a.ajaxPrefilter("script", function (a) {
        a.cache = !0;
      }), setTimeout(function () {
        function e() {
          "function" == typeof c && c(), a('.btn-group[data-toggle="buttons"] > .btn').button(), g.trigger("ajaxscriptsloaded");
        }

        function f(a) {
          a += 1, a < b.length ? h(a) : e();
        }

        function h(c) {
          if (c = c || 0, !b[c]) return f(c);
          var g = "js-" + b[c].replace(/[^\w\d\-]/g, "-").replace(/\-\-/g, "-");
          d[g] !== !0 ? a.getScript(b[c]).done(function () {
            d[g] = !0;
          }).complete(function () {
            k++, k >= i && j ? e() : f(c);
          }) : f(c);
        }

        for (var i = 0, k = 0, l = 0; l < b.length; l++) {
          b[l] && !function () {
            var a = "js-" + b[l].replace(/[^\w\d\-]/g, "-").replace(/\-\-/g, "-");
            d[a] !== !0 && i++;
          }();
        }

        i > 0 ? h() : e();
      }, 10);
    }, a(window).off("hashchange.ace_ajax").on("hashchange.ace_ajax", function (b, c) {
      var d = a.trim(window.location.hash);

      if (d && 0 != d.length) {
        if (h.settings.close_mobile_menu) try {
          a(h.settings.close_mobile_menu).ace_sidebar("mobileHide");
        } catch (b) {}
        h.settings.close_dropdowns && a(".dropdown.open .dropdown-toggle").dropdown("toggle"), h.loadUrl(d, null, c);
      }
    }).trigger("hashchange.ace_ajax", [!0]);
    var n = a.trim(window.location.hash);
    !n && this.settings.default_url && (window.location.hash = this.settings.default_url);
  }

  var d = {};
  a.fn.aceAjax = a.fn.ace_ajax = function (d, e, f, g, h) {
    var i,
        j = this.each(function () {
      var j = a(this),
          k = j.data("ace_ajax"),
          l = "object" == _typeof(d) && d;
      k || j.data("ace_ajax", k = new c(this, l)), "string" == typeof d && "function" == typeof k[d] && (i = h !== b ? k[d](e, f, g, h) : g !== b ? k[d](e, f, g) : f !== b ? k[d](e, f) : k[d](e));
    });
    return i === b ? j : i;
  }, a.fn.aceAjax.defaults = a.fn.ace_ajax.defaults = {
    content_url: !1,
    default_url: !1,
    loading_icon: "fa fa-spin fa-spinner fa-2x orange",
    loading_text: "",
    loading_overlay: null,
    update_breadcrumbs: !0,
    update_title: !0,
    update_active: !0,
    close_active: !1,
    max_load_wait: !1,
    close_mobile_menu: !1,
    close_dropdowns: !1
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  if (ace.vars.touch) {
    var c = "touchstart MSPointerDown pointerdown",
        d = "touchend touchcancel MSPointerUp MSPointerCancel pointerup pointercancel",
        e = "touchmove MSPointerMove MSPointerHover pointermove";
    a.event.special.ace_drag = {
      setup: function setup() {
        var f = 0,
            g = a(this);
        g.on(c, function (c) {
          function h(a) {
            if (k) {
              var b = a.originalEvent.touches ? a.originalEvent.touches[0] : a;

              if (i = {
                coords: [b.pageX, b.pageY]
              }, k && i && (m = 0, n = 0, l = Math.abs(n = k.coords[1] - i.coords[1]) > f && Math.abs(m = k.coords[0] - i.coords[0]) <= Math.abs(n) ? n > 0 ? "up" : "down" : Math.abs(m = k.coords[0] - i.coords[0]) > f && Math.abs(n) <= Math.abs(m) ? m > 0 ? "left" : "right" : !1, l !== !1)) {
                var c = {
                  cancel: !1
                };
                k.origin.trigger({
                  type: "ace_drag",
                  direction: l,
                  dx: m,
                  dy: n,
                  retval: c
                }), 0 == c.cancel && a.preventDefault();
              }

              k.coords[0] = i.coords[0], k.coords[1] = i.coords[1];
            }
          }

          var i,
              j = c.originalEvent.touches ? c.originalEvent.touches[0] : c,
              k = {
            coords: [j.pageX, j.pageY],
            origin: a(c.target)
          },
              l = !1,
              m = 0,
              n = 0;
          g.on(e, h).one(d, function (a) {
            g.off(e, h), k = i = b;
          });
        });
      }
    };
  }
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  function c(b, c) {
    function e() {
      this.mobile_view = this.mobile_style < 4 && this.is_mobile_view(), this.collapsible = !this.mobile_view && this.is_collapsible(), this.minimized = !this.collapsible && this.$sidebar.hasClass(k) || 3 == this.mobile_style && this.mobile_view && this.$sidebar.hasClass(l), this.horizontal = !(this.mobile_view || this.collapsible) && this.$sidebar.hasClass(n);
    }

    var f = this;
    this.$sidebar = a(b), this.$sidebar.attr("data-sidebar", "true"), this.$sidebar.attr("id") || this.$sidebar.attr("id", "id-sidebar-" + ++d);
    var g = ace.helper.getAttrSettings(b, a.fn.ace_sidebar.defaults, "sidebar-");
    this.settings = a.extend({}, a.fn.ace_sidebar.defaults, c, g), this.minimized = !1, this.collapsible = !1, this.horizontal = !1, this.mobile_view = !1, this.vars = function () {
      return {
        minimized: this.minimized,
        collapsible: this.collapsible,
        horizontal: this.horizontal,
        mobile_view: this.mobile_view
      };
    }, this.get = function (a) {
      return this.hasOwnProperty(a) ? this[a] : void 0;
    }, this.set = function (a, b) {
      this.hasOwnProperty(a) && (this[a] = b);
    }, this.ref = function () {
      return this;
    };

    var h = function h(b, c) {
      var d,
          e,
          f = a(this).find(ace.vars[".icon"]);

      if (f.length > 0) {
        d = f.attr("data-icon1"), e = f.attr("data-icon2"), "undefined" != typeof b ? b ? f.removeClass(d).addClass(e) : f.removeClass(e).addClass(d) : f.toggleClass(d).toggleClass(e);

        try {
          c !== !1 && ace.settings.saveState(f.get(0));
        } catch (g) {}
      }
    },
        i = function i() {
      var b = f.$sidebar.find(".sidebar-collapse");
      return 0 == b.length && (b = a('.sidebar-collapse[data-target="#' + (f.$sidebar.attr("id") || "") + '"]')), b = 0 != b.length ? b[0] : null;
    };

    this.toggleMenu = function (c, d) {
      if (this.collapsible) return !1;
      this.minimized = !this.minimized;
      var d = !(c === !1 || d === !1);
      this.minimized ? this.$sidebar.addClass("menu-min") : this.$sidebar.removeClass("menu-min");

      try {
        d && ace.settings.saveState(b, "class", "menu-min", this.minimized);
      } catch (e) {}

      return c || (c = i()), c && h.call(c, this.minimized, d), ace.vars.old_ie && ace.helper.redraw(b), a(document).trigger("settings.ace", ["sidebar_collapsed", this.minimized, b, d]), this.minimized ? this.$sidebar.trigger(a.Event("collapse.ace.sidebar")) : this.$sidebar.trigger(a.Event("expand.ace.sidebar")), !0;
    }, this.collapse = function (a, b) {
      this.collapsible || (this.minimized = !1, this.toggleMenu(a, b));
    }, this.expand = function (a, b) {
      this.collapsible || (this.minimized = !0, this.toggleMenu(a, b));
    }, this.showResponsive = function () {
      this.$sidebar.removeClass(l).removeClass(m);
    }, this.toggleResponsive = function (b, c) {
      if (this.mobile_view && 3 == this.mobile_style) {
        if (this.$sidebar.hasClass("menu-min")) {
          this.$sidebar.removeClass("menu-min");
          var d = i();
          d && h.call(d);
        }

        var c = "boolean" == typeof c ? c : "boolean" == typeof b ? b : this.$sidebar.hasClass(l);

        if (c ? this.$sidebar.addClass(m).removeClass(l) : this.$sidebar.removeClass(m).addClass(l), this.minimized = !c, b && "object" == _typeof(b) || (b = this.$sidebar.find(".sidebar-expand"), 0 == b.length && (b = a('.sidebar-expand[data-target="#' + (this.$sidebar.attr("id") || "") + '"]')), b = 0 != b.length ? b[0] : null), b) {
          var e,
              g,
              j = a(b).find(ace.vars[".icon"]);
          j.length > 0 && (e = j.attr("data-icon1"), g = j.attr("data-icon2"), c ? j.removeClass(e).addClass(g) : j.removeClass(g).addClass(e));
        }

        c ? f.$sidebar.trigger(a.Event("mobileShow.ace.sidebar")) : f.$sidebar.trigger(a.Event("mobileHide.ace.sidebar")), a(document).triggerHandler("settings.ace", ["sidebar_collapsed", this.minimized]);
      }
    }, this.is_collapsible = function () {
      var b;
      return this.$sidebar.hasClass("navbar-collapse") && null != (b = a('.navbar-toggle[data-target="#' + (this.$sidebar.attr("id") || "") + '"]').get(0)) && b.scrollHeight > 0;
    }, this.is_mobile_view = function () {
      var b;
      return null != (b = a('.menu-toggler[data-target="#' + (this.$sidebar.attr("id") || "") + '"]').get(0)) && b.scrollHeight > 0;
    };
    var j = !1;
    this.show = function (b, c, d) {
      if (d = d !== !1, d && j) return !1;
      var e,
          f = a(b);
      if (f.trigger(e = a.Event("show.ace.submenu")), e.isDefaultPrevented()) return !1;
      d && (j = !0), c = "undefined" != typeof c ? c : this.settings.duration, f.css({
        height: 0,
        overflow: "hidden",
        display: "block"
      }).removeClass("nav-hide").addClass("nav-show").parent().addClass("open"), b.scrollTop = 0;

      var g = function g(b, c) {
        b && b.stopPropagation(), f.css({
          "transition-property": "",
          "transition-duration": "",
          overflow: "",
          height: ""
        }), c !== !1 && f.trigger(a.Event("shown.ace.submenu")), d && (j = !1);
      },
          h = b.scrollHeight;

      return 0 != c && 0 != h && a.support.transition.end ? (f.css({
        height: h,
        "transition-property": "height",
        "transition-duration": c / 1e3 + "s"
      }).one(a.support.transition.end, g), ace.vars.android && setTimeout(function () {
        g(null, !1), ace.helper.redraw(b);
      }, c + 20)) : g(), !0;
    }, this.hide = function (b, c, d) {
      if (d = d !== !1, d && j) return !1;
      var e,
          f = a(b);
      if (f.trigger(e = a.Event("hide.ace.submenu")), e.isDefaultPrevented()) return !1;
      d && (j = !0), c = "undefined" != typeof c ? c : this.settings.duration;
      var g = b.scrollHeight;
      f.css({
        height: g,
        overflow: "hidden",
        display: "block"
      }).parent().removeClass("open"), b.offsetHeight;

      var h = function h(b, c) {
        b && b.stopPropagation(), f.css({
          display: "none",
          overflow: "",
          height: "",
          "transition-property": "",
          "transition-duration": ""
        }).removeClass("nav-show").addClass("nav-hide"), c !== !1 && f.trigger(a.Event("hidden.ace.submenu")), d && (j = !1);
      };

      return 0 != c && 0 != g && a.support.transition.end ? (f.css({
        height: 0,
        "transition-property": "height",
        "transition-duration": c / 1e3 + "s"
      }).one(a.support.transition.end, h), ace.vars.android && setTimeout(function () {
        h(null, !1), ace.helper.redraw(b);
      }, c + 20)) : h(), !0;
    }, this.toggle = function (a, b) {
      if (b = b || f.settings.duration, 0 == a.scrollHeight) {
        if (this.show(a, b)) return 1;
      } else if (this.hide(a, b)) return -1;

      return 0;
    }, this.mobileToggle = function (a) {
      this.mobile_view ? 1 == this.mobile_style || 2 == this.mobile_style ? this.toggleMobile("object" == _typeof(a) ? a : null, "boolean" == typeof a ? a : null) : 3 == this.mobile_style && this.toggleResponsive("object" == _typeof(a) ? a : null, "boolean" == typeof a ? a : null) : this.collapsible && this.toggleCollapsible("object" == _typeof(a) ? a : null, "boolean" == typeof a ? a : null);
    }, this.mobileShow = function () {
      this.mobileToggle(!0);
    }, this.mobileHide = function () {
      this.mobileToggle(!1);
    }, this.toggleMobile = function (b, c) {
      if (1 == this.mobile_style || 2 == this.mobile_style) {
        var c = "boolean" == typeof c ? c : "boolean" == typeof b ? b : !this.$sidebar.hasClass("display");
        b && "object" == _typeof(b) || (b = a('.menu-toggler[data-target="#' + (this.$sidebar.attr("id") || "") + '"]'), b = 0 != b.length ? b[0] : null), c ? (this.$sidebar.addClass("display"), b && a(b).addClass("display")) : (this.$sidebar.removeClass("display"), b && a(b).removeClass("display")), c ? f.$sidebar.trigger(a.Event("mobileShow.ace.sidebar")) : f.$sidebar.trigger(a.Event("mobileHide.ace.sidebar"));
      }
    }, this.toggleCollapsible = function (b, c) {
      if (4 == this.mobile_style) {
        var c = "boolean" == typeof c ? c : "boolean" == typeof b ? b : !this.$sidebar.hasClass("in");
        c ? this.$sidebar.collapse("show") : (this.$sidebar.removeClass("display"), this.$sidebar.collapse("hide")), c ? f.$sidebar.trigger(a.Event("mobileShow.ace.sidebar")) : f.$sidebar.trigger(a.Event("mobileHide.ace.sidebar"));
      }
    };

    var k = "menu-min",
        l = "responsive-min",
        m = "responsive-max",
        n = "h-sidebar",
        o = function o() {
      this.mobile_style = 1, this.$sidebar.hasClass("responsive") && !a('.menu-toggler[data-target="#' + this.$sidebar.attr("id") + '"]').hasClass("navbar-toggle") ? this.mobile_style = 2 : this.$sidebar.hasClass(l) ? this.mobile_style = 3 : this.$sidebar.hasClass("navbar-collapse") && (this.mobile_style = 4);
    };

    o.call(f), a(window).on("resize.sidebar.vars", function () {
      e.call(f);
    }).triggerHandler("resize.sidebar.vars"), this.$sidebar.on(ace.click_event + ".ace.submenu", ".nav-list", function (b) {
      var c = this,
          d = a(b.target).closest("a");

      if (d && 0 != d.length) {
        var e = f.minimized && !f.collapsible;

        if (d.hasClass("dropdown-toggle")) {
          b.preventDefault();
          var g = d.siblings(".submenu").get(0);
          if (!g) return !1;
          var h = a(g),
              i = 0,
              j = g.parentNode.parentNode;
          if (e && j == c || h.parent().hasClass("hover") && "absolute" == h.css("position") && !f.collapsible) return !1;
          var k = 0 == g.scrollHeight;
          return k && f.settings.hide_open_subs && a(j).find("> .open > .submenu").each(function () {
            this == g || a(this.parentNode).hasClass("active") || (i -= this.scrollHeight, f.hide(this, f.settings.duration, !1));
          }), k ? (f.show(g, f.settings.duration), 0 != i && (i += g.scrollHeight)) : (f.hide(g, f.settings.duration), i -= g.scrollHeight), 0 != i && ("true" != f.$sidebar.attr("data-sidebar-scroll") || f.minimized || f.$sidebar.ace_sidebar_scroll("prehide", i)), !1;
        }

        if ("tap" == ace.click_event && e && d.get(0).parentNode.parentNode == c) {
          var l = d.find(".menu-text").get(0);
          if (null != l && b.target != l && !a.contains(l, b.target)) return b.preventDefault(), !1;
        }

        if (ace.vars.ios_safari && "false" !== d.attr("data-link")) return document.location = d.attr("href"), b.preventDefault(), !1;
      }
    });
  }

  var d = 0;
  a(document).on(ace.click_event + ".ace.menu", ".menu-toggler", function (b) {
    var c = a(this),
        d = a(c.attr("data-target"));

    if (0 != d.length) {
      b.preventDefault(), d.ace_sidebar("mobileToggle", this);
      var e = ace.click_event + ".ace.autohide",
          f = "true" === d.attr("data-auto-hide");
      return c.hasClass("display") ? (f && a(document).on(e, function (b) {
        return d.get(0) == b.target || a.contains(d.get(0), b.target) ? void b.stopPropagation() : (d.ace_sidebar("mobileToggle", this, !1), void a(document).off(e));
      }), "true" == d.attr("data-sidebar-scroll") && d.ace_sidebar_scroll("reset")) : f && a(document).off(e), !1;
    }
  }).on(ace.click_event + ".ace.menu", ".sidebar-collapse", function (b) {
    var c = a(this).attr("data-target"),
        d = null;
    c && (d = a(c)), null != d && 0 != d.length || (d = a(this).closest(".sidebar")), 0 != d.length && (b.preventDefault(), d.ace_sidebar("toggleMenu", this));
  }).on(ace.click_event + ".ace.menu", ".sidebar-expand", function (b) {
    var c = a(this).attr("data-target"),
        d = null;

    if (c && (d = a(c)), null != d && 0 != d.length || (d = a(this).closest(".sidebar")), 0 != d.length) {
      var e = this;
      b.preventDefault(), d.ace_sidebar("toggleResponsive", this);
      var f = ace.click_event + ".ace.autohide";
      "true" === d.attr("data-auto-hide") && (d.hasClass(responsive_max_class) ? a(document).on(f, function (b) {
        return d.get(0) == b.target || a.contains(d.get(0), b.target) ? void b.stopPropagation() : (d.ace_sidebar("toggleResponsive", e), void a(document).off(f));
      }) : a(document).off(f));
    }
  }), a.fn.ace_sidebar = function (d, e, f) {
    var g,
        h = this.each(function () {
      var h = a(this),
          i = h.data("ace_sidebar"),
          j = "object" == _typeof(d) && d;
      i || h.data("ace_sidebar", i = new c(this, j)), "string" == typeof d && "function" == typeof i[d] && (g = e instanceof Array ? i[d].apply(i, e) : f !== b ? i[d](e, f) : i[d](e));
    });
    return g === b ? h : g;
  }, a.fn.ace_sidebar.defaults = {
    duration: 300,
    hide_open_subs: !0
  };
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  function c(b, c) {
    var f,
        g,
        h,
        i,
        j = this,
        k = a(window),
        l = a(b);

    if (f = l.find(".nav-list"), g = f.get(0)) {
      var m = ace.helper.getAttrSettings(b, a.fn.ace_sidebar_scroll.defaults);
      this.settings = a.extend({}, a.fn.ace_sidebar_scroll.defaults, c, m);
      var n = j.settings.scroll_to_active,
          o = l.ace_sidebar("ref");
      l.attr("data-sidebar-scroll", "true");
      var p = null,
          q = null,
          r = null,
          s = null,
          t = null,
          u = null;
      this.is_scrolling = !1;
      var v = !1;
      this.sidebar_fixed = e(b, "fixed");

      var w,
          x,
          y = function y() {
        var a = f.parent().offset();
        return j.sidebar_fixed && (a.top -= ace.helper.scrollTop()), k.innerHeight() - a.top - (j.settings.include_toggle ? 0 : h.outerHeight()) + 1;
      },
          z = function z() {
        return g.clientHeight;
      },
          A = function A(b) {
        if (!v && j.sidebar_fixed && (f = l.find(".nav-list"), h = l.find(".sidebar-toggle").eq(0), i = l.find(".sidebar-shortcuts").eq(0), g = f.get(0))) {
          f.wrap('<div class="nav-wrap-up pos-rel" />'), f.after("<div><div></div></div>"), f.wrap('<div class="nav-wrap" />'), j.settings.include_toggle || h.css({
            "z-index": 1
          }), j.settings.include_shortcuts || i.css({
            "z-index": 99
          }), p = f.parent().next().ace_scroll({
            size: y(),
            mouseWheelLock: !0,
            hoverReset: !1,
            dragEvent: !0,
            styleClass: j.settings.scroll_style,
            touchDrag: !1
          }).closest(".ace-scroll").addClass("nav-scroll"), u = p.data("ace_scroll"), q = p.find(".scroll-content").eq(0), r = q.find(" > div").eq(0), t = a(u.get_track()), s = t.find(".scroll-bar").eq(0), j.settings.include_shortcuts && 0 != i.length && (f.parent().prepend(i).wrapInner("<div />"), f = f.parent()), j.settings.include_toggle && 0 != h.length && (f.append(h), f.closest(".nav-wrap").addClass("nav-wrap-t")), f.css({
            position: "relative"
          }), 1 == j.settings.scroll_outside && p.addClass("scrollout"), g = f.get(0), g.style.top = 0, q.on("scroll.nav", function () {
            g.style.top = -1 * this.scrollTop + "px";
          }), f.on(a.event.special.mousewheel ? "mousewheel.ace_scroll" : "mousewheel.ace_scroll DOMMouseScroll.ace_scroll", function (a) {
            return j.is_scrolling && u.is_active() ? p.trigger(a) : !j.settings.lock_anyway;
          }), f.on("mouseenter.ace_scroll", function () {
            t.addClass("scroll-hover");
          }).on("mouseleave.ace_scroll", function () {
            t.removeClass("scroll-hover");
          });
          var c = q.get(0);

          if (f.on("ace_drag.nav", function (b) {
            if (!j.is_scrolling || !u.is_active()) return void (b.retval.cancel = !0);
            if (0 != a(b.target).closest(".can-scroll").length) return void (b.retval.cancel = !0);

            if ("up" == b.direction || "down" == b.direction) {
              u.move_bar(!0);
              var d = b.dy;
              d = parseInt(Math.min(w, d)), Math.abs(d) > 2 && (d = 2 * d), 0 != d && (c.scrollTop = c.scrollTop + d, g.style.top = -1 * c.scrollTop + "px");
            }
          }), j.settings.smooth_scroll && f.on("touchstart.nav MSPointerDown.nav pointerdown.nav", function (a) {
            f.css("transition-property", "none"), s.css("transition-property", "none");
          }).on("touchend.nav touchcancel.nav MSPointerUp.nav MSPointerCancel.nav pointerup.nav pointercancel.nav", function (a) {
            f.css("transition-property", "top"), s.css("transition-property", "top");
          }), d && !j.settings.include_toggle) {
            var e = h.get(0);
            e && q.on("scroll.safari", function () {
              ace.helper.redraw(e);
            });
          }

          if (v = !0, 1 == b && (j.reset(), n && j.scroll_to_active(), n = !1), "number" == typeof j.settings.smooth_scroll && j.settings.smooth_scroll > 0 && (f.css({
            "transition-property": "top",
            "transition-duration": (j.settings.smooth_scroll / 1e3).toFixed(2) + "s"
          }), s.css({
            "transition-property": "top",
            "transition-duration": (j.settings.smooth_scroll / 1500).toFixed(2) + "s"
          }), p.on("drag.start", function (a) {
            a.stopPropagation(), f.css("transition-property", "none");
          }).on("drag.end", function (a) {
            a.stopPropagation(), f.css("transition-property", "top");
          })), ace.vars.android) {
            var k = ace.helper.scrollTop();
            2 > k && (window.scrollTo(k, 0), setTimeout(function () {
              j.reset();
            }, 20));
            var m,
                o = ace.helper.winHeight();
            a(window).on("scroll.ace_scroll", function () {
              j.is_scrolling && u.is_active() && (m = ace.helper.winHeight(), m != o && (o = m, j.reset()));
            });
          }
        }
      };

      this.scroll_to_active = function () {
        if (u && u.is_active()) try {
          var a,
              b = o.vars(),
              c = l.find(".nav-list");
          b.minimized && !b.collapsible ? a = c.find("> .active") : (a = f.find("> .active.hover"), 0 == a.length && (a = f.find(".active:not(.open)")));
          var d = a.outerHeight();
          c = c.get(0);

          for (var e = a.get(0); e != c;) {
            d += e.offsetTop, e = e.parentNode;
          }

          var h = d - p.height();
          h > 0 && (g.style.top = -h + "px", q.scrollTop(h));
        } catch (i) {}
      }, this.reset = function (a) {
        if (a === !0 && (this.sidebar_fixed = e(b, "fixed")), !this.sidebar_fixed) return void this.disable();
        v || A();
        var c = o.vars(),
            d = !c.collapsible && !c.horizontal && (w = y()) < (x = g.clientHeight);
        this.is_scrolling = !0, d && (r.css({
          height: x,
          width: 8
        }), p.prev().css({
          "max-height": w
        }), u.update({
          size: w
        }), u.enable(), u.reset()), d && u.is_active() ? l.addClass("sidebar-scroll") : this.is_scrolling && this.disable();
      }, this.disable = function () {
        this.is_scrolling = !1, p && (p.css({
          height: "",
          "max-height": ""
        }), r.css({
          height: "",
          width: ""
        }), p.prev().css({
          "max-height": ""
        }), u.disable()), parseInt(g.style.top) < 0 && j.settings.smooth_scroll && a.support.transition.end ? f.one(a.support.transition.end, function () {
          l.removeClass("sidebar-scroll"), f.off(".trans");
        }) : l.removeClass("sidebar-scroll"), g.style.top = 0;
      }, this.prehide = function (a) {
        if (this.is_scrolling && !o.get("minimized")) if (z() + a < y()) this.disable();else if (0 > a) {
          var b = q.scrollTop() + a;
          if (0 > b) return;
          g.style.top = -1 * b + "px";
        }
      }, this._reset = function (a) {
        a === !0 && (this.sidebar_fixed = e(b, "fixed")), ace.vars.webkit ? setTimeout(function () {
          j.reset();
        }, 0) : this.reset();
      }, this.set_hover = function () {
        t && t.addClass("scroll-hover");
      }, this.get = function (a) {
        return this.hasOwnProperty(a) ? this[a] : void 0;
      }, this.set = function (a, b) {
        this.hasOwnProperty(a) && (this[a] = b);
      }, this.ref = function () {
        return this;
      }, this.updateStyle = function (a) {
        null != u && u.update({
          styleClass: a
        });
      }, l.on("hidden.ace.submenu.sidebar_scroll shown.ace.submenu.sidebar_scroll", ".submenu", function (a) {
        a.stopPropagation(), o.get("minimized") || (j._reset(), "shown" == a.type && j.set_hover());
      }), A(!0);
    }
  }

  var d = ace.vars.safari && navigator.userAgent.match(/version\/[1-5]/i),
      e = "getComputedStyle" in window ? function (a, b) {
    return a.offsetHeight, window.getComputedStyle(a).position == b;
  } : function (b, c) {
    return b.offsetHeight, a(b).css("position") == c;
  };
  a(document).on("settings.ace.sidebar_scroll", function (b, c, d) {
    a(".sidebar[data-sidebar-scroll=true]").each(function () {
      var b = a(this),
          d = b.ace_sidebar_scroll("ref");
      if ("sidebar_collapsed" == c && e(this, "fixed")) "true" == b.attr("data-sidebar-hover") && b.ace_sidebar_hover("reset"), d._reset();else if ("sidebar_fixed" === c || "navbar_fixed" === c) {
        var f = d.get("is_scrolling"),
            g = e(this, "fixed");
        d.set("sidebar_fixed", g), g && !f ? d._reset() : g || d.disable();
      }
    });
  }), a(window).on("resize.ace.sidebar_scroll", function () {
    a(".sidebar[data-sidebar-scroll=true]").each(function () {
      var b = a(this);
      "true" == b.attr("data-sidebar-hover") && b.ace_sidebar_hover("reset");
      var c = a(this).ace_sidebar_scroll("ref"),
          d = e(this, "fixed");
      c.set("sidebar_fixed", d), c._reset();
    });
  }), a.fn.ace_sidebar_scroll || (a.fn.ace_sidebar_scroll = function (d, e) {
    var f,
        g = this.each(function () {
      var b = a(this),
          g = b.data("ace_sidebar_scroll"),
          h = "object" == _typeof(d) && d;
      g || b.data("ace_sidebar_scroll", g = new c(this, h)), "string" == typeof d && "function" == typeof g[d] && (f = g[d](e));
    });
    return f === b ? g : f;
  }, a.fn.ace_sidebar_scroll.defaults = {
    scroll_to_active: !0,
    include_shortcuts: !0,
    include_toggle: !1,
    smooth_scroll: 150,
    scroll_outside: !1,
    scroll_style: "",
    lock_anyway: !1
  });
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  function c(b, c) {
    function h(b) {
      var c = b,
          d = a(c),
          e = null,
          f = !1;
      this.show = function () {
        null != e && clearTimeout(e), e = null, d.addClass("hover-show hover-shown"), f = !0;

        for (var a = 0; a < g.length; a++) {
          g[a].find(".hover-show").not(".hover-shown").each(function () {
            i(this).hide();
          });
        }
      }, this.hide = function () {
        f = !1, d.removeClass("hover-show hover-shown hover-flip"), null != e && clearTimeout(e), e = null;
        var a = d.find("> .submenu").get(0);
        a && j(a, "hide");
      }, this.hideDelay = function (a) {
        null != e && clearTimeout(e), d.removeClass("hover-shown"), e = setTimeout(function () {
          f = !1, d.removeClass("hover-show hover-flip"), e = null;
          var b = d.find("> .submenu").get(0);
          b && j(b, "hide"), "function" == typeof a && a.call(this);
        }, m.settings.sub_hover_delay);
      }, this.is_visible = function () {
        return f;
      };
    }

    function i(b) {
      var c = a(b).data("subHide");
      return c || a(b).data("subHide", c = new h(b)), c;
    }

    function j(b, c) {
      var d = a(b).data("ace_scroll");
      return d ? "string" == typeof c ? (d[c](), !0) : d : !1;
    }

    function k(c) {
      var d = a(this),
          f = a(c);
      c.style.top = "", c.style.bottom = "";
      var g = null;
      q.minimized && (g = d.find(".menu-text").get(0)) && (g.style.marginTop = "");
      var h = ace.helper.scrollTop(),
          i = 0,
          k = h;
      w && (i = b.offsetTop, k += i + 1);
      var m = d.offset();
      m.top = parseInt(m.top);
      var n,
          o = 0;
      c.style.maxHeight = "";
      var r = c.scrollHeight,
          n = d.height();
      g && (o = n, m.top += o);
      var t = parseInt(m.top + r),
          v = 0,
          y = u.height(),
          z = parseInt(m.top - k - o),
          A = y,
          B = q.horizontal,
          C = !1;
      B && this.parentNode == p && (v = 0, m.top += d.height(), C = !0), !C && (v = t - (y + h)) >= 0 && (v = z > v ? v : z, 0 == v && (v = 20), z - v > 10 && (v += parseInt(Math.min(25, z - v))), m.top + (n - o) > t - v && (v -= m.top + (n - o) - (t - v)), v > 0 && (c.style.top = -v + "px", g && (g.style.marginTop = -v + "px"))), 0 > v && (v = 0);
      var D = v > 0 && v > n - 20;
      if (D ? d.addClass("pull_up") : d.removeClass("pull_up"), B) if (d.parent().parent().hasClass("hover-flip")) d.addClass("hover-flip");else {
        var E = f.offset(),
            F = f.width(),
            G = u.width();
        E.left + F > G && d.addClass("hover-flip");
      }
      var H = d.hasClass("hover") && !q.mobile_view;

      if (!(H && f.find("> li > .submenu").length > 0)) {
        var I = A - (m.top - h) + v,
            J = v - I;

        if (J > 0 && n > J && (I += parseInt(Math.max(n, n - J))), I -= 5, !(90 > I)) {
          var K = !1;
          if (e) f.addClass("sub-scroll").css("max-height", I + "px");else {
            if (K = j(c), 0 == K) {
              f.ace_scroll({
                observeContent: !0,
                detached: !0,
                updatePos: !1,
                reset: !0,
                mouseWheelLock: !0,
                styleClass: l.settings.sub_scroll_style
              }), K = j(c);
              var L = K.get_track();
              L && f.after(L);
            }

            K.update({
              size: I
            });
          }

          if (x = I, !e && K) {
            I > 14 && r - I > 4 ? (K.enable(), K.reset()) : K.disable();
            var L = K.get_track();

            if (L) {
              L.style.top = -(v - o - 1) + "px";
              var m = f.position(),
                  M = m.left;
              M += s ? 2 : f.outerWidth() - K.track_size(), L.style.left = parseInt(M) + "px", C && (L.style.left = parseInt(M - 2) + "px", L.style.top = parseInt(m.top) + (g ? o - 2 : 0) + "px");
            }
          }

          ace.vars.safari && ace.helper.redraw(c);
        }
      }
    }

    var l = this,
        m = this,
        n = ace.helper.getAttrSettings(b, a.fn.ace_sidebar_hover.defaults);
    this.settings = a.extend({}, a.fn.ace_sidebar_hover.defaults, c, n);
    var o = a(b),
        p = o.find(".nav-list").get(0);
    o.attr("data-sidebar-hover", "true"), g.push(o);
    var q = {},
        r = ace.vars.old_ie,
        s = !1,
        t = l.settings.sub_hover_delay || !1;
    d && t && (l.settings.sub_hover_delay = parseInt(Math.max(l.settings.sub_hover_delay, 2500)));
    var u = a(window),
        v = a(".navbar").eq(0),
        w = "fixed" == v.css("position");
    this.update_vars = function () {
      w = "fixed" == v.css("position");
    }, l.dirty = !1, this.reset = function () {
      0 != l.dirty && (l.dirty = !1, o.find(".submenu").each(function () {
        var b = a(this),
            c = b.parent();
        b.css({
          top: "",
          bottom: "",
          "max-height": ""
        }), b.hasClass("ace-scroll") ? b.ace_scroll("disable") : b.removeClass("sub-scroll"), f(this, "absolute") ? b.addClass("can-scroll") : b.removeClass("can-scroll"), c.removeClass("pull_up").find(".menu-text:first").css("margin-top", "");
      }), o.find(".hover-show").removeClass("hover-show hover-shown hover-flip"));
    }, this.updateStyle = function (a) {
      sub_scroll_style = a, o.find(".submenu.ace-scroll").ace_scroll("update", {
        styleClass: a
      });
    }, this.changeDir = function (a) {
      s = "right" === a;
    };
    var x = -1;
    e || o.on("hide.ace.submenu.sidebar_hover", ".submenu", function (b) {
      if (!(1 > x)) {
        b.stopPropagation();
        var c = a(this).closest(".ace-scroll.can-scroll");
        0 != c.length && f(c[0], "absolute") && c[0].scrollHeight - this.scrollHeight < x && c.ace_scroll("disable");
      }
    }), e || o.on("shown.ace.submenu.sidebar_hover hidden.ace.submenu.sidebar_hover", ".submenu", function (b) {
      if (!(1 > x)) {
        var c = a(this).closest(".ace-scroll.can-scroll");

        if (0 != c.length && f(c[0], "absolute")) {
          var d = c[0].scrollHeight;
          x > 14 && d - x > 4 ? c.ace_scroll("enable").ace_scroll("reset") : c.ace_scroll("disable");
        }
      }
    });
    var y = -1,
        z = d ? "touchstart.sub_hover" : "mouseenter.sub_hover",
        A = d ? "touchend.sub_hover touchcancel.sub_hover" : "mouseleave.sub_hover";
    o.on(z, ".nav-list li, .sidebar-shortcuts", function (b) {
      if (q = o.ace_sidebar("vars"), !q.collapsible) {
        var c = a(this),
            e = !1,
            g = c.hasClass("hover"),
            h = c.find("> .submenu").get(0);
        if (!(h || this.parentNode == p || g || (e = c.hasClass("sidebar-shortcuts")))) return void (h && a(h).removeClass("can-scroll"));
        var j = h,
            m = !1;
        if (j || this.parentNode != p || (j = c.find("> a > .menu-text").get(0)), !j && e && (j = c.find(".sidebar-shortcuts-large").get(0)), !(j && (m = f(j, "absolute")) || g)) return void (h && a(h).removeClass("can-scroll"));
        var n = t ? i(this) : null;
        if (h) if (m) {
          l.dirty = !0;
          var s = ace.helper.scrollTop();
          if (t && !n.is_visible() || !d && s != y || r) if (a(h).addClass("can-scroll"), r || d) {
            var u = this;
            setTimeout(function () {
              k.call(u, h);
            }, 0);
          } else k.call(this, h);
          y = s;
        } else a(h).removeClass("can-scroll");
        t && n.show();
      }
    }).on(A, ".nav-list li, .sidebar-shortcuts", function (b) {
      q = o.ace_sidebar("vars"), q.collapsible || a(this).hasClass("hover-show") && t && i(this).hideDelay();
    });
  }

  if (!ace.vars.very_old_ie) {
    var d = ace.vars.touch,
        e = ace.vars.old_ie || d,
        f = "getComputedStyle" in window ? function (a, b) {
      return a.offsetHeight, window.getComputedStyle(a).position == b;
    } : function (b, c) {
      return b.offsetHeight, a(b).css("position") == c;
    };
    a(window).on("resize.sidebar.ace_hover", function () {
      a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("update_vars").ace_sidebar_hover("reset");
    }), a(document).on("settings.ace.ace_hover", function (b, c, d) {
      "sidebar_collapsed" == c ? a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("reset") : "navbar_fixed" == c && a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("update_vars");
    });
    var g = [];
    a.fn.ace_sidebar_hover = function (d, e) {
      var f,
          g = this.each(function () {
        var b = a(this),
            g = b.data("ace_sidebar_hover"),
            h = "object" == _typeof(d) && d;
        g || b.data("ace_sidebar_hover", g = new c(this, h)), "string" == typeof d && "function" == typeof g[d] && (f = g[d](e));
      });
      return f === b ? g : f;
    }, a.fn.ace_sidebar_hover.defaults = {
      sub_hover_delay: 750,
      sub_scroll_style: "no-track scroll-thin"
    };
  }
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  function c(b, c) {
    var d = b.find(".widget-main").eq(0);
    a(window).off("resize.widget.scroll");
    var e = ace.vars.old_ie || ace.vars.touch;

    if (c) {
      var f = d.data("ace_scroll");
      f && d.data("save_scroll", {
        size: f.size,
        lock: f.lock,
        lock_anyway: f.lock_anyway
      });
      var g = b.height() - b.find(".widget-header").height() - 10;
      g = parseInt(g), d.css("min-height", g), e ? (f && d.ace_scroll("disable"), d.css("max-height", g).addClass("overflow-scroll")) : (f ? d.ace_scroll("update", {
        size: g,
        mouseWheelLock: !0,
        lockAnyway: !0
      }) : d.ace_scroll({
        size: g,
        mouseWheelLock: !0,
        lockAnyway: !0
      }), d.ace_scroll("enable").ace_scroll("reset")), a(window).on("resize.widget.scroll", function () {
        var a = b.height() - b.find(".widget-header").height() - 10;
        a = parseInt(a), d.css("min-height", a), e ? d.css("max-height", a).addClass("overflow-scroll") : d.ace_scroll("update", {
          size: a
        }).ace_scroll("reset");
      });
    } else {
      d.css("min-height", "");
      var h = d.data("save_scroll");
      h && d.ace_scroll("update", {
        size: h.size,
        mouseWheelLock: h.lock,
        lockAnyway: h.lock_anyway
      }).ace_scroll("enable").ace_scroll("reset"), e ? d.css("max-height", "").removeClass("overflow-scroll") : h || d.ace_scroll("disable");
    }
  }

  var d = function d(b, _d) {
    this.$box = a(b);
    this.reload = function () {
      var a = this.$box,
          b = !1;
      "static" == a.css("position") && (b = !0, a.addClass("position-relative")), a.append('<div class="widget-box-overlay"><i class="' + ace.vars.icon + 'loading-icon fa fa-spinner fa-spin fa-2x white"></i></div>'), a.one("reloaded.ace.widget", function () {
        a.find(".widget-box-overlay").remove(), b && a.removeClass("position-relative");
      });
    }, this.closeFast = function () {
      this.close(0);
    }, this.close = function (a) {
      var b = this.$box,
          a = "undefined" == typeof a ? 300 : a;
      b.fadeOut(a, function () {
        b.trigger("closed.ace.widget"), b.remove();
      });
    }, this.toggleFast = function () {
      this.toggle(null, null, 0, 0);
    }, this.toggle = function (a, b, c, d) {
      var e = this.$box,
          f = e.find(".widget-body").eq(0),
          g = null,
          h = a || (e.hasClass("collapsed") ? "show" : "hide"),
          i = "show" == h ? "shown" : "hidden";

      if (b || (b = e.find("> .widget-header a[data-action=collapse]").eq(0), 0 == b.length && (b = null)), b) {
        g = b.find(ace.vars[".icon"]).eq(0);
        var j,
            k = null,
            l = null;
        (k = g.attr("data-icon-show")) ? l = g.attr("data-icon-hide") : (j = g.attr("class").match(/fa\-(.*)\-(up|down)/)) && (k = "fa-" + j[1] + "-down", l = "fa-" + j[1] + "-up");
      }

      var c = "undefined" == typeof c ? 250 : c,
          d = "undefined" == typeof d ? 200 : d;
      "show" == h ? (g && g.removeClass(k).addClass(l), f.hide(), e.removeClass("collapsed"), f.slideDown(c, function () {
        e.trigger(i + ".ace.widget");
      })) : (g && g.removeClass(l).addClass(k), f.slideUp(d, function () {
        e.addClass("collapsed"), e.trigger(i + ".ace.widget");
      })), e.trigger("toggled.ace.widget", [h]);
    }, this.hide = function () {
      this.toggle("hide");
    }, this.show = function () {
      this.toggle("show");
    }, this.hideFast = function () {
      this.toggle("hide", null, 0, 0);
    }, this.showFast = function () {
      this.toggle("show", null, 0, 0);
    }, this.fullscreen = function (a) {
      var b = this.$box.find("> .widget-header a[data-action=fullscreen]").find(ace.vars[".icon"]).eq(0),
          d = null,
          e = null;
      (d = b.attr("data-icon1")) ? e = b.attr("data-icon2") : (d = "fa-expand", e = "fa-compress");
      var f = this.$box.hasClass("fullscreen"),
          g = a !== !0 && a !== !1;
      a === !0 || g && !f ? (b.removeClass(d).addClass(e), this.$box.addClass("fullscreen"), c(this.$box, !0)) : (a === !1 || g && f) && (b.addClass(d).removeClass(e), this.$box.removeClass("fullscreen"), c(this.$box, !1)), this.$box.trigger("fullscreened.ace.widget");
    };
  };

  a.fn.widget_box = function (c, e) {
    var f,
        g = this.each(function () {
      var b = a(this),
          g = b.data("widget_box"),
          h = "object" == _typeof(c) && c;
      g || b.data("widget_box", g = new d(this, h)), "string" == typeof c && (f = g[c](e));
    });
    return f === b ? g : f;
  }, a(document).on(ace.click_event + ".ace.widget", ".widget-header a[data-action]", function (b) {
    b.preventDefault();
    var c = a(this),
        e = c.closest(".widget-box");

    if (0 != e.length && !e.hasClass("ui-sortable-helper")) {
      var f = e.data("widget_box");
      f || e.data("widget_box", f = new d(e.get(0)));
      var g = c.data("action");

      if ("collapse" == g) {
        var h,
            i = e.hasClass("collapsed") ? "show" : "hide";
        if (e.trigger(h = a.Event(i + ".ace.widget")), h.isDefaultPrevented()) return;
        e.trigger(h = a.Event("toggle.ace.widget"), [i]), f.toggle(i, c);
      } else if ("close" == g) {
        var h;
        if (e.trigger(h = a.Event("close.ace.widget")), h.isDefaultPrevented()) return;
        f.close();
      } else if ("reload" == g) {
        c.blur();
        var h;
        if (e.trigger(h = a.Event("reload.ace.widget")), h.isDefaultPrevented()) return;
        f.reload();
      } else if ("fullscreen" == g) {
        var h;
        if (e.trigger(h = a.Event("fullscreen.ace.widget")), h.isDefaultPrevented()) return;
        f.fullscreen();
      } else "settings" == g && e.trigger("setting.ace.widget");
    }
  });
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  a("#ace-settings-btn").on(ace.click_event, function (b) {
    b.preventDefault(), a(this).toggleClass("open"), a("#ace-settings-box").toggleClass("open");
  }), a("#ace-settings-navbar").on("click", function () {
    ace.settingFunction.navbar_fixed(null, this.checked);
  }), a("#ace-settings-sidebar").on("click", function () {
    ace.settingFunction.sidebar_fixed(null, this.checked);
  }), a("#ace-settings-breadcrumbs").on("click", function () {
    ace.settingFunction.breadcrumbs_fixed(null, this.checked);
  }), a("#ace-settings-add-container").on("click", function () {
    ace.settingFunction.main_container_fixed(null, this.checked);
  }), a("#ace-settings-compact").on("click", function () {
    if (this.checked) {
      a("#sidebar").addClass("compact");
      var b = a("#ace-settings-hover");
      b.length > 0 && b.removeAttr("checked").trigger("click");
    } else a("#sidebar").removeClass("compact"), a("#sidebar[data-sidebar-scroll=true]").ace_sidebar_scroll("reset");

    ace.vars.old_ie && ace.helper.redraw(a("#sidebar")[0], !0);
  }), a("#ace-settings-highlight").on("click", function () {
    this.checked ? a("#sidebar .nav-list > li").addClass("highlight") : a("#sidebar .nav-list > li").removeClass("highlight"), ace.vars.old_ie && ace.helper.redraw(a("#sidebar")[0]);
  }), a("#ace-settings-hover").on("click", function () {
    if (!a("#sidebar").hasClass("h-sidebar")) {
      if (this.checked) a("#sidebar li").addClass("hover").filter(".open").removeClass("open").find("> .submenu").css("display", "none");else {
        a("#sidebar li.hover").removeClass("hover");
        var b = a("#ace-settings-compact");
        b.length > 0 && b.get(0).checked && b.trigger("click");
      }
      a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("reset"), a(".sidebar[data-sidebar-scroll=true]").ace_sidebar_scroll("reset"), ace.vars.old_ie && ace.helper.redraw(a("#sidebar")[0]);
    }
  });
  a(document).on("settings.ace", function (b, c, d, e, f) {
    var g = "";

    switch (c) {
      case "navbar_fixed":
        g = "ace-settings-navbar";
        break;

      case "sidebar_fixed":
        g = "ace-settings-sidebar";
        break;

      case "breadcrumbs_fixed":
        g = "ace-settings-breadcrumbs";
        break;

      case "main_container_fixed":
        g = "ace-settings-add-container";
    }

    if (g && (g = document.getElementById(g))) {
      a(g).prop("checked", d);

      try {
        1 == f && ace.settings.saveState(g, "checked");
      } catch (h) {}
    }
  }), ace.settingFunction = {
    navbar_fixed: function navbar_fixed(b, c, d, e) {
      if (ace.vars.very_old_ie) return !1;
      var b = b || "#navbar";
      if ("string" == typeof b && (b = a(b).get(0)), !b) return !1;
      var f,
          c = c || !1,
          d = "undefined" != typeof d ? d : !0;
      if (a(document).trigger(f = a.Event("presettings.ace"), ["navbar_fixed", c, b, d]), f.isDefaultPrevented()) return !1;

      if (e !== !1 && !c) {
        var g = a("#sidebar");
        g.hasClass("sidebar-fixed") && ace.settingFunction.sidebar_fixed(g.get(0), !1, d);
      }

      c ? a(b).addClass("navbar-fixed-top") : a(b).removeClass("navbar-fixed-top"), d && ace.settings.saveState(b, "class", "navbar-fixed-top", c), a(document).trigger("settings.ace", ["navbar_fixed", c, b, d]);
    },
    sidebar_fixed: function sidebar_fixed(b, c, d, e) {
      if (ace.vars.very_old_ie) return !1;
      var b = b || "#sidebar";
      if ("string" == typeof b && (b = a(b).get(0)), !b) return !1;
      var f,
          c = c || !1,
          d = "undefined" != typeof d ? d : !0;
      if (a(document).trigger(f = a.Event("presettings.ace"), ["sidebar_fixed", c, b, d]), f.isDefaultPrevented()) return !1;
      e !== !1 && (c ? ace.settingFunction.navbar_fixed(null, !0, d) : ace.settingFunction.breadcrumbs_fixed(null, !1, d));
      var g = a("#menu-toggler");
      c ? (a(b).addClass("sidebar-fixed"), g.addClass("fixed")) : (a(b).removeClass("sidebar-fixed"), g.removeClass("fixed")), d && (ace.settings.saveState(b, "class", "sidebar-fixed", c), 0 != g.length && ace.settings.saveState(g[0], "class", "fixed", c)), a(document).trigger("settings.ace", ["sidebar_fixed", c, b, d]);
    },
    breadcrumbs_fixed: function breadcrumbs_fixed(b, c, d, e) {
      if (ace.vars.very_old_ie) return !1;
      var b = b || "#breadcrumbs";
      if ("string" == typeof b && (b = a(b).get(0)), !b) return !1;
      var f,
          c = c || !1,
          d = "undefined" != typeof d ? d : !0;
      return a(document).trigger(f = a.Event("presettings.ace"), ["breadcrumbs_fixed", c, b, d]), f.isDefaultPrevented() ? !1 : (c && e !== !1 && ace.settingFunction.sidebar_fixed(null, !0, d), c ? a(b).addClass("breadcrumbs-fixed") : a(b).removeClass("breadcrumbs-fixed"), d && ace.settings.saveState(b, "class", "breadcrumbs-fixed", c), void a(document).trigger("settings.ace", ["breadcrumbs_fixed", c, b, d]));
    },
    main_container_fixed: function main_container_fixed(b, c, d) {
      if (ace.vars.very_old_ie) return !1;
      var c = c || !1,
          d = "undefined" != typeof d ? d : !0,
          b = b || "#main-container";
      if ("string" == typeof b && (b = a(b).get(0)), !b) return !1;
      var e;
      if (a(document).trigger(e = a.Event("presettings.ace"), ["main_container_fixed", c, b, d]), e.isDefaultPrevented()) return !1;
      var f = a("#navbar-container");
      c ? (a(b).addClass("container"), a(f).addClass("container")) : (a(b).removeClass("container"), a(f).removeClass("container")), d && (ace.settings.saveState(b, "class", "container", c), 0 != f.length && ace.settings.saveState(f[0], "class", "container", c)), navigator.userAgent.match(/webkit/i) && (a("#sidebar").toggleClass("menu-min"), setTimeout(function () {
        a("#sidebar").toggleClass("menu-min");
      }, 10)), a(document).trigger("settings.ace", ["main_container_fixed", c, b, d]);
    }
  };
}(jQuery), function (a, b) {
  a("#ace-settings-rtl").removeAttr("checked").on("click", function () {
    c();
  });

  var c = function c() {
    function b(b) {
      function c(a, b) {
        e.find("." + a).removeClass(a).addClass("tmp-rtl-" + a).end().find("." + b).removeClass(b).addClass(a).end().find(".tmp-rtl-" + a).removeClass("tmp-rtl-" + a).addClass(b);
      }

      var d = a(document.body);
      b || d.toggleClass("rtl"), b = b || document.body;
      var e = a(b);
      e.find(".dropdown-menu:not(.datepicker-dropdown,.colorpicker)").toggleClass("dropdown-menu-right").end().find(".pull-right:not(.dropdown-menu,blockquote,.profile-skills .pull-right)").removeClass("pull-right").addClass("tmp-rtl-pull-right").end().find(".pull-left:not(.dropdown-submenu,.profile-skills .pull-left)").removeClass("pull-left").addClass("pull-right").end().find(".tmp-rtl-pull-right").removeClass("tmp-rtl-pull-right").addClass("pull-left").end().find(".chosen-select").toggleClass("chosen-rtl").next().toggleClass("chosen-rtl"), c("align-left", "align-right"), c("no-padding-left", "no-padding-right"), c("arrowed", "arrowed-right"), c("arrowed-in", "arrowed-in-right"), c("tabs-left", "tabs-right"), c("messagebar-item-left", "messagebar-item-right"), a(".modal.aside-vc").ace_aside("flip").ace_aside("insideContainer"), e.find(".fa").each(function () {
        if (!(this.className.match(/ui-icon/) || a(this).closest(".fc-button").length > 0)) for (var b = this.attributes.length, c = 0; b > c; c++) {
          var d = this.attributes[c].value;
          d.match(/fa\-(?:[\w\-]+)\-left/) ? this.attributes[c].value = d.replace(/fa\-([\w\-]+)\-(left)/i, "fa-$1-right") : d.match(/fa\-(?:[\w\-]+)\-right/) && (this.attributes[c].value = d.replace(/fa\-([\w\-]+)\-(right)/i, "fa-$1-left"));
        }
      });
      var f = d.hasClass("rtl");
      f ? (e.find(".scroll-hz").addClass("make-ltr").find(".scroll-content").wrapInner('<div class="make-rtl" />'), a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("changeDir", "right")) : (e.find(".scroll-hz").removeClass("make-ltr").find(".make-rtl").children().unwrap(), a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("changeDir", "left")), a.fn.ace_scroll && e.find(".scroll-hz").ace_scroll("reset");

      try {
        var g = a("#piechart-placeholder");

        if (g.length > 0) {
          var h = d.hasClass("rtl") ? "nw" : "ne";
          g.data("draw").call(g.get(0), g, g.data("chart"), h);
        }
      } catch (i) {}

      ace.helper.redraw(b, !0);
    }

    b(), a(".page-content-area[data-ajax-content=true]").on("ajaxscriptsloaded.rtl", function () {
      a("body").hasClass("rtl") && b(this);
    });
  };
}(jQuery), function (a, b) {
  try {
    a("#skin-colorpicker").ace_colorpicker({
      auto_pos: !1
    });
  } catch (c) {}

  a("#skin-colorpicker").on("change", function () {
    function b(b) {
      var c = a(document.body);
      c.removeClass("no-skin skin-1 skin-2 skin-3"), c.addClass(b), ace.data.set("skin", b);
      var d = ["red", "blue", "green", ""];
      a(".ace-nav > li.grey").removeClass("dark"), a(".ace-nav > li").removeClass("no-border margin-1"), a(".ace-nav > li:not(:last-child)").removeClass("light-pink").find("> a > " + ace.vars[".icon"]).removeClass("pink").end().eq(0).find(".badge").removeClass("badge-warning"), a(".sidebar-shortcuts .btn").removeClass("btn-pink btn-white").find(ace.vars[".icon"]).removeClass("white"), a(".ace-nav > li.grey").removeClass("red").find(".badge").removeClass("badge-yellow"), a(".sidebar-shortcuts .btn").removeClass("btn-primary btn-white");
      var e = 0;
      a(".sidebar-shortcuts .btn").each(function () {
        a(this).find(ace.vars[".icon"]).removeClass(d[e++]);
      });
      var f = ["btn-success", "btn-info", "btn-warning", "btn-danger"];

      if ("no-skin" == b) {
        var e = 0;
        a(".sidebar-shortcuts .btn").each(function () {
          a(this).attr("class", "btn " + f[e++ % 4]);
        }), a(".sidebar[data-sidebar-scroll=true]").ace_sidebar_scroll("updateStyle", ""), a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("updateStyle", "no-track scroll-thin");
      } else if ("skin-1" == b) {
        a(".ace-nav > li.grey").addClass("dark");
        var e = 0;
        a(".sidebar-shortcuts").find(".btn").each(function () {
          a(this).attr("class", "btn " + f[e++ % 4]);
        }), a(".sidebar[data-sidebar-scroll=true]").ace_sidebar_scroll("updateStyle", "scroll-white no-track"), a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("updateStyle", "no-track scroll-thin scroll-white");
      } else if ("skin-2" == b) a(".ace-nav > li").addClass("no-border margin-1"), a(".ace-nav > li:not(:last-child)").addClass("light-pink").find("> a > " + ace.vars[".icon"]).addClass("pink").end().eq(0).find(".badge").addClass("badge-warning"), a(".sidebar-shortcuts .btn").attr("class", "btn btn-white btn-pink").find(ace.vars[".icon"]).addClass("white"), a(".sidebar[data-sidebar-scroll=true]").ace_sidebar_scroll("updateStyle", "scroll-white no-track"), a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("updateStyle", "no-track scroll-thin scroll-white");else if ("skin-3" == b) {
        c.addClass("no-skin"), a(".ace-nav > li.grey").addClass("red").find(".badge").addClass("badge-yellow");
        var e = 0;
        a(".sidebar-shortcuts .btn").each(function () {
          a(this).attr("class", "btn btn-primary btn-white"), a(this).find(ace.vars[".icon"]).addClass(d[e++]);
        }), a(".sidebar[data-sidebar-scroll=true]").ace_sidebar_scroll("updateStyle", "scroll-dark no-track"), a(".sidebar[data-sidebar-hover=true]").ace_sidebar_hover("updateStyle", "no-track scroll-thin");
      }

      a(".sidebar[data-sidebar-scroll=true]").ace_sidebar_scroll("reset"), ace.vars.old_ie && ace.helper.redraw(document.body, !0);
    }

    var c = a(this).find("option:selected").data("skin");
    b(c);
  });
}(jQuery), function (a, b) {
  a(document).on("reload.ace.widget", ".widget-box", function (b) {
    var c = a(this);
    setTimeout(function () {
      c.trigger("reloaded.ace.widget");
    }, parseInt(1e3 * Math.random() + 1e3));
  });
}(__webpack_provided_window_dot_jQuery), function (a, b) {
  ace.vars.US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  try {
    a("#nav-search-input").bs_typeahead({
      source: ace.vars.US_STATES,
      updater: function updater(b) {
        return a("#nav-search-input").focus(), b;
      }
    });
  } catch (c) {}
}(__webpack_provided_window_dot_jQuery);

/***/ }),

/***/ "./assets/js/bootbox.js":
/*!******************************!*\
  !*** ./assets/js/bootbox.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * bootbox.js [v4.4.0]
 *
 * http://bootboxjs.com/license.txt
 */
!function (a, b) {
  "use strict";

   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(this, function a(b, c) {
  "use strict";

  function d(a) {
    var b = q[o.locale];
    return b ? b[a] : q.en[a];
  }

  function e(a, c, d) {
    a.stopPropagation(), a.preventDefault();
    var e = b.isFunction(d) && d.call(c, a) === !1;
    e || c.modal("hide");
  }

  function f(a) {
    var b,
        c = 0;

    for (b in a) {
      c++;
    }

    return c;
  }

  function g(a, c) {
    var d = 0;
    b.each(a, function (a, b) {
      c(a, b, d++);
    });
  }

  function h(a) {
    var c, d;
    if ("object" != _typeof(a)) throw new Error("Please supply an object of options");
    if (!a.message) throw new Error("Please specify a message");
    return a = b.extend({}, o, a), a.buttons || (a.buttons = {}), c = a.buttons, d = f(c), g(c, function (a, e, f) {
      if (b.isFunction(e) && (e = c[a] = {
        callback: e
      }), "object" !== b.type(e)) throw new Error("button with key " + a + " must be an object");
      e.label || (e.label = a), e.className || (2 >= d && f === d - 1 ? e.className = "btn-primary" : e.className = "btn-default");
    }), a;
  }

  function i(a, b) {
    var c = a.length,
        d = {};
    if (1 > c || c > 2) throw new Error("Invalid argument length");
    return 2 === c || "string" == typeof a[0] ? (d[b[0]] = a[0], d[b[1]] = a[1]) : d = a[0], d;
  }

  function j(a, c, d) {
    return b.extend(!0, {}, a, i(c, d));
  }

  function k(a, b, c, d) {
    var e = {
      className: "bootbox-" + a,
      buttons: l.apply(null, b)
    };
    return m(j(e, d, c), b);
  }

  function l() {
    for (var a = {}, b = 0, c = arguments.length; c > b; b++) {
      var e = arguments[b],
          f = e.toLowerCase(),
          g = e.toUpperCase();
      a[f] = {
        label: d(g)
      };
    }

    return a;
  }

  function m(a, b) {
    var d = {};
    return g(b, function (a, b) {
      d[b] = !0;
    }), g(a.buttons, function (a) {
      if (d[a] === c) throw new Error("button key " + a + " is not allowed (options are " + b.join("\n") + ")");
    }), a;
  }

  var n = {
    dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
    header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
    footer: "<div class='modal-footer'></div>",
    closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
    form: "<form class='bootbox-form'></form>",
    inputs: {
      text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
      textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
      email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
      select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
      checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
      date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
      time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
      number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
      password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
    }
  },
      o = {
    locale: "en",
    backdrop: "static",
    animate: !0,
    className: null,
    closeButton: !0,
    show: !0,
    container: "body"
  },
      p = {};
  p.alert = function () {
    var a;
    if (a = k("alert", ["ok"], ["message", "callback"], arguments), a.callback && !b.isFunction(a.callback)) throw new Error("alert requires callback property to be a function when provided");
    return a.buttons.ok.callback = a.onEscape = function () {
      return b.isFunction(a.callback) ? a.callback.call(this) : !0;
    }, p.dialog(a);
  }, p.confirm = function () {
    var a;
    if (a = k("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), a.buttons.cancel.callback = a.onEscape = function () {
      return a.callback.call(this, !1);
    }, a.buttons.confirm.callback = function () {
      return a.callback.call(this, !0);
    }, !b.isFunction(a.callback)) throw new Error("confirm requires a callback");
    return p.dialog(a);
  }, p.prompt = function () {
    var a, d, e, f, h, i, k;
    if (f = b(n.form), d = {
      className: "bootbox-prompt",
      buttons: l("cancel", "confirm"),
      value: "",
      inputType: "text"
    }, a = m(j(d, arguments, ["title", "callback"]), ["cancel", "confirm"]), i = a.show === c ? !0 : a.show, a.message = f, a.buttons.cancel.callback = a.onEscape = function () {
      return a.callback.call(this, null);
    }, a.buttons.confirm.callback = function () {
      var c;

      switch (a.inputType) {
        case "text":
        case "textarea":
        case "email":
        case "select":
        case "date":
        case "time":
        case "number":
        case "password":
          c = h.val();
          break;

        case "checkbox":
          var d = h.find("input:checked");
          c = [], g(d, function (a, d) {
            c.push(b(d).val());
          });
      }

      return a.callback.call(this, c);
    }, a.show = !1, !a.title) throw new Error("prompt requires a title");
    if (!b.isFunction(a.callback)) throw new Error("prompt requires a callback");
    if (!n.inputs[a.inputType]) throw new Error("invalid prompt type");

    switch (h = b(n.inputs[a.inputType]), a.inputType) {
      case "text":
      case "textarea":
      case "email":
      case "date":
      case "time":
      case "number":
      case "password":
        h.val(a.value);
        break;

      case "select":
        var o = {};
        if (k = a.inputOptions || [], !b.isArray(k)) throw new Error("Please pass an array of input options");
        if (!k.length) throw new Error("prompt with select requires options");
        g(k, function (a, d) {
          var e = h;
          if (d.value === c || d.text === c) throw new Error("given options in wrong format");
          d.group && (o[d.group] || (o[d.group] = b("<optgroup/>").attr("label", d.group)), e = o[d.group]), e.append("<option value='" + d.value + "'>" + d.text + "</option>");
        }), g(o, function (a, b) {
          h.append(b);
        }), h.val(a.value);
        break;

      case "checkbox":
        var q = b.isArray(a.value) ? a.value : [a.value];
        if (k = a.inputOptions || [], !k.length) throw new Error("prompt with checkbox requires options");
        if (!k[0].value || !k[0].text) throw new Error("given options in wrong format");
        h = b("<div/>"), g(k, function (c, d) {
          var e = b(n.inputs[a.inputType]);
          e.find("input").attr("value", d.value), e.find("label").append(d.text), g(q, function (a, b) {
            b === d.value && e.find("input").prop("checked", !0);
          }), h.append(e);
        });
    }

    return a.placeholder && h.attr("placeholder", a.placeholder), a.pattern && h.attr("pattern", a.pattern), a.maxlength && h.attr("maxlength", a.maxlength), f.append(h), f.on("submit", function (a) {
      a.preventDefault(), a.stopPropagation(), e.find(".btn-primary").click();
    }), e = p.dialog(a), e.off("shown.bs.modal"), e.on("shown.bs.modal", function () {
      h.focus();
    }), i === !0 && e.modal("show"), e;
  }, p.dialog = function (a) {
    a = h(a);
    var d = b(n.dialog),
        f = d.find(".modal-dialog"),
        i = d.find(".modal-body"),
        j = a.buttons,
        k = "",
        l = {
      onEscape: a.onEscape
    };
    if (b.fn.modal === c) throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.");

    if (g(j, function (a, b) {
      k += "<button data-bb-handler='" + a + "' type='button' class='btn " + b.className + "'>" + b.label + "</button>", l[a] = b.callback;
    }), i.find(".bootbox-body").html(a.message), a.animate === !0 && d.addClass("fade"), a.className && d.addClass(a.className), "large" === a.size ? f.addClass("modal-lg") : "small" === a.size && f.addClass("modal-sm"), a.title && i.before(n.header), a.closeButton) {
      var m = b(n.closeButton);
      a.title ? d.find(".modal-header").prepend(m) : m.css("margin-top", "-10px").prependTo(i);
    }

    return a.title && d.find(".modal-title").html(a.title), k.length && (i.after(n.footer), d.find(".modal-footer").html(k)), d.on("hidden.bs.modal", function (a) {
      a.target === this && d.remove();
    }), d.on("shown.bs.modal", function () {
      d.find(".btn-primary:first").focus();
    }), "static" !== a.backdrop && d.on("click.dismiss.bs.modal", function (a) {
      d.children(".modal-backdrop").length && (a.currentTarget = d.children(".modal-backdrop").get(0)), a.target === a.currentTarget && d.trigger("escape.close.bb");
    }), d.on("escape.close.bb", function (a) {
      l.onEscape && e(a, d, l.onEscape);
    }), d.on("click", ".modal-footer button", function (a) {
      var c = b(this).data("bb-handler");
      e(a, d, l[c]);
    }), d.on("click", ".bootbox-close-button", function (a) {
      e(a, d, l.onEscape);
    }), d.on("keyup", function (a) {
      27 === a.which && d.trigger("escape.close.bb");
    }), b(a.container).append(d), d.modal({
      backdrop: a.backdrop ? "static" : !1,
      keyboard: !1,
      show: !1
    }), a.show && d.modal("show"), d;
  }, p.setDefaults = function () {
    var a = {};
    2 === arguments.length ? a[arguments[0]] = arguments[1] : a = arguments[0], b.extend(o, a);
  }, p.hideAll = function () {
    return b(".bootbox").modal("hide"), p;
  };
  var q = {
    bg_BG: {
      OK: "Ок",
      CANCEL: "Отказ",
      CONFIRM: "Потвърждавам"
    },
    br: {
      OK: "OK",
      CANCEL: "Cancelar",
      CONFIRM: "Sim"
    },
    cs: {
      OK: "OK",
      CANCEL: "Zrušit",
      CONFIRM: "Potvrdit"
    },
    da: {
      OK: "OK",
      CANCEL: "Annuller",
      CONFIRM: "Accepter"
    },
    de: {
      OK: "OK",
      CANCEL: "Abbrechen",
      CONFIRM: "Akzeptieren"
    },
    el: {
      OK: "Εντάξει",
      CANCEL: "Ακύρωση",
      CONFIRM: "Επιβεβαίωση"
    },
    en: {
      OK: "OK",
      CANCEL: "Cancel",
      CONFIRM: "OK"
    },
    es: {
      OK: "OK",
      CANCEL: "Cancelar",
      CONFIRM: "Aceptar"
    },
    et: {
      OK: "OK",
      CANCEL: "Katkesta",
      CONFIRM: "OK"
    },
    fa: {
      OK: "قبول",
      CANCEL: "لغو",
      CONFIRM: "تایید"
    },
    fi: {
      OK: "OK",
      CANCEL: "Peruuta",
      CONFIRM: "OK"
    },
    fr: {
      OK: "OK",
      CANCEL: "Annuler",
      CONFIRM: "D'accord"
    },
    he: {
      OK: "אישור",
      CANCEL: "ביטול",
      CONFIRM: "אישור"
    },
    hu: {
      OK: "OK",
      CANCEL: "Mégsem",
      CONFIRM: "Megerősít"
    },
    hr: {
      OK: "OK",
      CANCEL: "Odustani",
      CONFIRM: "Potvrdi"
    },
    id: {
      OK: "OK",
      CANCEL: "Batal",
      CONFIRM: "OK"
    },
    it: {
      OK: "OK",
      CANCEL: "Annulla",
      CONFIRM: "Conferma"
    },
    ja: {
      OK: "OK",
      CANCEL: "キャンセル",
      CONFIRM: "確認"
    },
    lt: {
      OK: "Gerai",
      CANCEL: "Atšaukti",
      CONFIRM: "Patvirtinti"
    },
    lv: {
      OK: "Labi",
      CANCEL: "Atcelt",
      CONFIRM: "Apstiprināt"
    },
    nl: {
      OK: "OK",
      CANCEL: "Annuleren",
      CONFIRM: "Accepteren"
    },
    no: {
      OK: "OK",
      CANCEL: "Avbryt",
      CONFIRM: "OK"
    },
    pl: {
      OK: "OK",
      CANCEL: "Anuluj",
      CONFIRM: "Potwierdź"
    },
    pt: {
      OK: "OK",
      CANCEL: "Cancelar",
      CONFIRM: "Confirmar"
    },
    ru: {
      OK: "OK",
      CANCEL: "Отмена",
      CONFIRM: "Применить"
    },
    sq: {
      OK: "OK",
      CANCEL: "Anulo",
      CONFIRM: "Prano"
    },
    sv: {
      OK: "OK",
      CANCEL: "Avbryt",
      CONFIRM: "OK"
    },
    th: {
      OK: "ตกลง",
      CANCEL: "ยกเลิก",
      CONFIRM: "ยืนยัน"
    },
    tr: {
      OK: "Tamam",
      CANCEL: "İptal",
      CONFIRM: "Onayla"
    },
    zh_CN: {
      OK: "OK",
      CANCEL: "取消",
      CONFIRM: "确认"
    },
    zh_TW: {
      OK: "OK",
      CANCEL: "取消",
      CONFIRM: "確認"
    }
  };
  return p.addLocale = function (a, c) {
    return b.each(["OK", "CANCEL", "CONFIRM"], function (a, b) {
      if (!c[b]) throw new Error("Please supply a translation for '" + b + "'");
    }), q[a] = {
      OK: c.OK,
      CANCEL: c.CANCEL,
      CONFIRM: c.CONFIRM
    }, p;
  }, p.removeLocale = function (a) {
    return delete q[a], p;
  }, p.setLocale = function (a) {
    return p.setDefaults("locale", a);
  }, p.init = function (c) {
    return a(c || b);
  }, p;
});

/***/ }),

/***/ "./assets/js/bootstrap-colorpicker.min.js":
/*!************************************************!*\
  !*** ./assets/js/bootstrap-colorpicker.min.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* provided dependency */ var __webpack_provided_window_dot_jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Bootstrap Colorpicker
 * http://mjolnic.github.io/bootstrap-colorpicker/
 *
 * Originally written by (c) 2012 Stefan Petre
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 * @todo Update DOCS
 */
!function (a) {
  "use strict";

  "object" == ( false ? 0 : _typeof(exports)) ? module.exports = a(__webpack_provided_window_dot_jQuery) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (a) {
  "use strict";

  var b = function b(_b, c) {
    this.value = {
      h: 0,
      s: 0,
      b: 0,
      a: 1
    }, this.origFormat = null, c && a.extend(this.colors, c), _b && (void 0 !== _b.toLowerCase ? (_b += "", this.setColor(_b)) : void 0 !== _b.h && (this.value = _b));
  };

  b.prototype = {
    constructor: b,
    colors: {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgrey: "#d3d3d3",
      lightgreen: "#90ee90",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370d8",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#d87093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32",
      transparent: "transparent"
    },
    _sanitizeNumber: function _sanitizeNumber(a) {
      return "number" == typeof a ? a : isNaN(a) || null === a || "" === a || void 0 === a ? 1 : void 0 !== a.toLowerCase ? parseFloat(a) : 1;
    },
    isTransparent: function isTransparent(a) {
      return a ? (a = a.toLowerCase().trim(), "transparent" === a || a.match(/#?00000000/) || a.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/)) : !1;
    },
    rgbaIsTransparent: function rgbaIsTransparent(a) {
      return 0 === a.r && 0 === a.g && 0 === a.b && 0 === a.a;
    },
    setColor: function setColor(a) {
      a = a.toLowerCase().trim(), a && (this.isTransparent(a) ? this.value = {
        h: 0,
        s: 0,
        b: 0,
        a: 0
      } : this.value = this.stringToHSB(a) || {
        h: 0,
        s: 0,
        b: 0,
        a: 1
      });
    },
    stringToHSB: function stringToHSB(b) {
      b = b.toLowerCase();
      var c;
      "undefined" != typeof this.colors[b] && (b = this.colors[b], c = "alias");
      var d = this,
          e = !1;
      return a.each(this.stringParsers, function (a, f) {
        var g = f.re.exec(b),
            h = g && f.parse.apply(d, [g]),
            i = c || f.format || "rgba";
        return h ? (e = i.match(/hsla?/) ? d.RGBtoHSB.apply(d, d.HSLtoRGB.apply(d, h)) : d.RGBtoHSB.apply(d, h), d.origFormat = i, !1) : !0;
      }), e;
    },
    setHue: function setHue(a) {
      this.value.h = 1 - a;
    },
    setSaturation: function setSaturation(a) {
      this.value.s = a;
    },
    setBrightness: function setBrightness(a) {
      this.value.b = 1 - a;
    },
    setAlpha: function setAlpha(a) {
      this.value.a = parseInt(100 * (1 - a), 10) / 100;
    },
    toRGB: function toRGB(a, b, c, d) {
      a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
      var e, f, g, h, i;
      return a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], {
        r: Math.round(255 * e),
        g: Math.round(255 * f),
        b: Math.round(255 * g),
        a: d || this.value.a
      };
    },
    toHex: function toHex(a, b, c, d) {
      var e = this.toRGB(a, b, c, d);
      return this.rgbaIsTransparent(e) ? "transparent" : "#" + (1 << 24 | parseInt(e.r) << 16 | parseInt(e.g) << 8 | parseInt(e.b)).toString(16).substr(1);
    },
    toHSL: function toHSL(a, b, c, d) {
      a = a || this.value.h, b = b || this.value.s, c = c || this.value.b, d = d || this.value.a;
      var e = a,
          f = (2 - b) * c,
          g = b * c;
      return g /= f > 0 && 1 >= f ? f : 2 - f, f /= 2, g > 1 && (g = 1), {
        h: isNaN(e) ? 0 : e,
        s: isNaN(g) ? 0 : g,
        l: isNaN(f) ? 0 : f,
        a: isNaN(d) ? 0 : d
      };
    },
    toAlias: function toAlias(a, b, c, d) {
      var e = this.toHex(a, b, c, d);

      for (var f in this.colors) {
        if (this.colors[f] === e) return f;
      }

      return !1;
    },
    RGBtoHSB: function RGBtoHSB(a, b, c, d) {
      a /= 255, b /= 255, c /= 255;
      var e, f, g, h;
      return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 === h ? null : g === a ? (b - c) / h : g === b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = 0 === h ? 0 : h / g, {
        h: this._sanitizeNumber(e),
        s: f,
        b: g,
        a: this._sanitizeNumber(d)
      };
    },
    HueToRGB: function HueToRGB(a, b, c) {
      return 0 > c ? c += 1 : c > 1 && (c -= 1), 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a;
    },
    HSLtoRGB: function HSLtoRGB(a, b, c, d) {
      0 > b && (b = 0);
      var e;
      e = .5 >= c ? c * (1 + b) : c + b - c * b;
      var f = 2 * c - e,
          g = a + 1 / 3,
          h = a,
          i = a - 1 / 3,
          j = Math.round(255 * this.HueToRGB(f, e, g)),
          k = Math.round(255 * this.HueToRGB(f, e, h)),
          l = Math.round(255 * this.HueToRGB(f, e, i));
      return [j, k, l, this._sanitizeNumber(d)];
    },
    toString: function toString(a) {
      a = a || "rgba";
      var b = !1;

      switch (a) {
        case "rgb":
          return b = this.toRGB(), this.rgbaIsTransparent(b) ? "transparent" : "rgb(" + b.r + "," + b.g + "," + b.b + ")";

        case "rgba":
          return b = this.toRGB(), "rgba(" + b.r + "," + b.g + "," + b.b + "," + b.a + ")";

        case "hsl":
          return b = this.toHSL(), "hsl(" + Math.round(360 * b.h) + "," + Math.round(100 * b.s) + "%," + Math.round(100 * b.l) + "%)";

        case "hsla":
          return b = this.toHSL(), "hsla(" + Math.round(360 * b.h) + "," + Math.round(100 * b.s) + "%," + Math.round(100 * b.l) + "%," + b.a + ")";

        case "hex":
          return this.toHex();

        case "alias":
          return this.toAlias() || this.toHex();

        default:
          return b;
      }
    },
    stringParsers: [{
      re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
      format: "rgb",
      parse: function parse(a) {
        return [a[1], a[2], a[3], 1];
      }
    }, {
      re: /rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
      format: "rgb",
      parse: function parse(a) {
        return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], 1];
      }
    }, {
      re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
      format: "rgba",
      parse: function parse(a) {
        return [a[1], a[2], a[3], a[4]];
      }
    }, {
      re: /rgba\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
      format: "rgba",
      parse: function parse(a) {
        return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]];
      }
    }, {
      re: /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
      format: "hsl",
      parse: function parse(a) {
        return [a[1] / 360, a[2] / 100, a[3] / 100, a[4]];
      }
    }, {
      re: /hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
      format: "hsla",
      parse: function parse(a) {
        return [a[1] / 360, a[2] / 100, a[3] / 100, a[4]];
      }
    }, {
      re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
      format: "hex",
      parse: function parse(a) {
        return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16), 1];
      }
    }, {
      re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
      format: "hex",
      parse: function parse(a) {
        return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16), 1];
      }
    }],
    colorNameToHex: function colorNameToHex(a) {
      return "undefined" != typeof this.colors[a.toLowerCase()] ? this.colors[a.toLowerCase()] : !1;
    }
  };

  var c = {
    horizontal: !1,
    inline: !1,
    color: !1,
    format: !1,
    input: "input",
    container: !1,
    component: ".add-on, .input-group-addon",
    sliders: {
      saturation: {
        maxLeft: 100,
        maxTop: 100,
        callLeft: "setSaturation",
        callTop: "setBrightness"
      },
      hue: {
        maxLeft: 0,
        maxTop: 100,
        callLeft: !1,
        callTop: "setHue"
      },
      alpha: {
        maxLeft: 0,
        maxTop: 100,
        callLeft: !1,
        callTop: "setAlpha"
      }
    },
    slidersHorz: {
      saturation: {
        maxLeft: 100,
        maxTop: 100,
        callLeft: "setSaturation",
        callTop: "setBrightness"
      },
      hue: {
        maxLeft: 100,
        maxTop: 0,
        callLeft: "setHue",
        callTop: !1
      },
      alpha: {
        maxLeft: 100,
        maxTop: 0,
        callLeft: "setAlpha",
        callTop: !1
      }
    },
    template: '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div><div class="colorpicker-selectors"></div></div>',
    align: "right",
    customClass: null,
    colorSelectors: null
  },
      d = function d(_d, e) {
    if (this.element = a(_d).addClass("colorpicker-element"), this.options = a.extend(!0, {}, c, this.element.data(), e), this.component = this.options.component, this.component = this.component !== !1 ? this.element.find(this.component) : !1, this.component && 0 === this.component.length && (this.component = !1), this.container = this.options.container === !0 ? this.element : this.options.container, this.container = this.container !== !1 ? a(this.container) : !1, this.input = this.element.is("input") ? this.element : this.options.input ? this.element.find(this.options.input) : !1, this.input && 0 === this.input.length && (this.input = !1), this.color = new b(this.options.color !== !1 ? this.options.color : this.getValue(), this.options.colorSelectors), this.format = this.options.format !== !1 ? this.options.format : this.color.origFormat, this.picker = a(this.options.template), this.options.customClass && this.picker.addClass(this.options.customClass), this.options.inline ? this.picker.addClass("colorpicker-inline colorpicker-visible") : this.picker.addClass("colorpicker-hidden"), this.options.horizontal && this.picker.addClass("colorpicker-horizontal"), "rgba" !== this.format && "hsla" !== this.format && this.options.format !== !1 || this.picker.addClass("colorpicker-with-alpha"), "right" === this.options.align && this.picker.addClass("colorpicker-right"), this.options.colorSelectors) {
      var f = this;
      a.each(this.options.colorSelectors, function (b, c) {
        var d = a("<i />").css("background-color", c).data("class", b);
        d.click(function () {
          f.setValue(a(this).css("background-color"));
        }), f.picker.find(".colorpicker-selectors").append(d);
      }), this.picker.find(".colorpicker-selectors").show();
    }

    this.picker.on("mousedown.colorpicker touchstart.colorpicker", a.proxy(this.mousedown, this)), this.picker.appendTo(this.container ? this.container : a("body")), this.input !== !1 && (this.input.on({
      "keyup.colorpicker": a.proxy(this.keyup, this)
    }), this.input.on({
      "change.colorpicker": a.proxy(this.change, this)
    }), this.component === !1 && this.element.on({
      "focus.colorpicker": a.proxy(this.show, this)
    }), this.options.inline === !1 && this.element.on({
      "focusout.colorpicker": a.proxy(this.hide, this)
    })), this.component !== !1 && this.component.on({
      "click.colorpicker": a.proxy(this.show, this)
    }), this.input === !1 && this.component === !1 && this.element.on({
      "click.colorpicker": a.proxy(this.show, this)
    }), this.input !== !1 && this.component !== !1 && "color" === this.input.attr("type") && this.input.on({
      "click.colorpicker": a.proxy(this.show, this),
      "focus.colorpicker": a.proxy(this.show, this)
    }), this.update(), a(a.proxy(function () {
      this.element.trigger("create");
    }, this));
  };

  d.Color = b, d.prototype = {
    constructor: d,
    destroy: function destroy() {
      this.picker.remove(), this.element.removeData("colorpicker").off(".colorpicker"), this.input !== !1 && this.input.off(".colorpicker"), this.component !== !1 && this.component.off(".colorpicker"), this.element.removeClass("colorpicker-element"), this.element.trigger({
        type: "destroy"
      });
    },
    reposition: function reposition() {
      if (this.options.inline !== !1 || this.options.container) return !1;
      var a = this.container && this.container[0] !== document.body ? "position" : "offset",
          b = this.component || this.element,
          c = b[a]();
      "right" === this.options.align && (c.left -= this.picker.outerWidth() - b.outerWidth()), this.picker.css({
        top: c.top + b.outerHeight(),
        left: c.left
      });
    },
    show: function show(b) {
      return this.isDisabled() ? !1 : (this.picker.addClass("colorpicker-visible").removeClass("colorpicker-hidden"), this.reposition(), a(window).on("resize.colorpicker", a.proxy(this.reposition, this)), !b || this.hasInput() && "color" !== this.input.attr("type") || b.stopPropagation && b.preventDefault && (b.stopPropagation(), b.preventDefault()), this.options.inline === !1 && a(window.document).on({
        "mousedown.colorpicker": a.proxy(this.hide, this)
      }), void this.element.trigger({
        type: "showPicker",
        color: this.color
      }));
    },
    hide: function hide() {
      this.picker.addClass("colorpicker-hidden").removeClass("colorpicker-visible"), a(window).off("resize.colorpicker", this.reposition), a(document).off({
        "mousedown.colorpicker": this.hide
      }), this.update(), this.element.trigger({
        type: "hidePicker",
        color: this.color
      });
    },
    updateData: function updateData(a) {
      return a = a || this.color.toString(this.format), this.element.data("color", a), a;
    },
    updateInput: function updateInput(a) {
      if (a = a || this.color.toString(this.format), this.input !== !1) {
        if (this.options.colorSelectors) {
          var c = new b(a, this.options.colorSelectors),
              d = c.toAlias();
          "undefined" != typeof this.options.colorSelectors[d] && (a = d);
        }

        this.input.prop("value", a);
      }

      return a;
    },
    updatePicker: function updatePicker(a) {
      void 0 !== a && (this.color = new b(a, this.options.colorSelectors));
      var c = this.options.horizontal === !1 ? this.options.sliders : this.options.slidersHorz,
          d = this.picker.find("i");
      return 0 !== d.length ? (this.options.horizontal === !1 ? (c = this.options.sliders, d.eq(1).css("top", c.hue.maxTop * (1 - this.color.value.h)).end().eq(2).css("top", c.alpha.maxTop * (1 - this.color.value.a))) : (c = this.options.slidersHorz, d.eq(1).css("left", c.hue.maxLeft * (1 - this.color.value.h)).end().eq(2).css("left", c.alpha.maxLeft * (1 - this.color.value.a))), d.eq(0).css({
        top: c.saturation.maxTop - this.color.value.b * c.saturation.maxTop,
        left: this.color.value.s * c.saturation.maxLeft
      }), this.picker.find(".colorpicker-saturation").css("backgroundColor", this.color.toHex(this.color.value.h, 1, 1, 1)), this.picker.find(".colorpicker-alpha").css("backgroundColor", this.color.toHex()), this.picker.find(".colorpicker-color, .colorpicker-color div").css("backgroundColor", this.color.toString(this.format)), a) : void 0;
    },
    updateComponent: function updateComponent(a) {
      if (a = a || this.color.toString(this.format), this.component !== !1) {
        var b = this.component.find("i").eq(0);
        b.length > 0 ? b.css({
          backgroundColor: a
        }) : this.component.css({
          backgroundColor: a
        });
      }

      return a;
    },
    update: function update(a) {
      var b;
      return this.getValue(!1) === !1 && a !== !0 || (b = this.updateComponent(), this.updateInput(b), this.updateData(b), this.updatePicker()), b;
    },
    setValue: function setValue(a) {
      this.color = new b(a, this.options.colorSelectors), this.update(!0), this.element.trigger({
        type: "changeColor",
        color: this.color,
        value: a
      });
    },
    getValue: function getValue(a) {
      a = void 0 === a ? "#000000" : a;
      var b;
      return b = this.hasInput() ? this.input.val() : this.element.data("color"), void 0 !== b && "" !== b && null !== b || (b = a), b;
    },
    hasInput: function hasInput() {
      return this.input !== !1;
    },
    isDisabled: function isDisabled() {
      return this.hasInput() ? this.input.prop("disabled") === !0 : !1;
    },
    disable: function disable() {
      return this.hasInput() ? (this.input.prop("disabled", !0), this.element.trigger({
        type: "disable",
        color: this.color,
        value: this.getValue()
      }), !0) : !1;
    },
    enable: function enable() {
      return this.hasInput() ? (this.input.prop("disabled", !1), this.element.trigger({
        type: "enable",
        color: this.color,
        value: this.getValue()
      }), !0) : !1;
    },
    currentSlider: null,
    mousePointer: {
      left: 0,
      top: 0
    },
    mousedown: function mousedown(b) {
      b.pageX || b.pageY || !b.originalEvent || (b.pageX = b.originalEvent.touches[0].pageX, b.pageY = b.originalEvent.touches[0].pageY), b.stopPropagation(), b.preventDefault();
      var c = a(b.target),
          d = c.closest("div"),
          e = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;

      if (!d.is(".colorpicker")) {
        if (d.is(".colorpicker-saturation")) this.currentSlider = a.extend({}, e.saturation);else if (d.is(".colorpicker-hue")) this.currentSlider = a.extend({}, e.hue);else {
          if (!d.is(".colorpicker-alpha")) return !1;
          this.currentSlider = a.extend({}, e.alpha);
        }
        var f = d.offset();
        this.currentSlider.guide = d.find("i")[0].style, this.currentSlider.left = b.pageX - f.left, this.currentSlider.top = b.pageY - f.top, this.mousePointer = {
          left: b.pageX,
          top: b.pageY
        }, a(document).on({
          "mousemove.colorpicker": a.proxy(this.mousemove, this),
          "touchmove.colorpicker": a.proxy(this.mousemove, this),
          "mouseup.colorpicker": a.proxy(this.mouseup, this),
          "touchend.colorpicker": a.proxy(this.mouseup, this)
        }).trigger("mousemove");
      }

      return !1;
    },
    mousemove: function mousemove(a) {
      a.pageX || a.pageY || !a.originalEvent || (a.pageX = a.originalEvent.touches[0].pageX, a.pageY = a.originalEvent.touches[0].pageY), a.stopPropagation(), a.preventDefault();
      var b = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((a.pageX || this.mousePointer.left) - this.mousePointer.left))),
          c = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top + ((a.pageY || this.mousePointer.top) - this.mousePointer.top)));
      return this.currentSlider.guide.left = b + "px", this.currentSlider.guide.top = c + "px", this.currentSlider.callLeft && this.color[this.currentSlider.callLeft].call(this.color, b / this.currentSlider.maxLeft), this.currentSlider.callTop && this.color[this.currentSlider.callTop].call(this.color, c / this.currentSlider.maxTop), "setAlpha" === this.currentSlider.callTop && this.options.format === !1 && (1 !== this.color.value.a ? (this.format = "rgba", this.color.origFormat = "rgba") : (this.format = "hex", this.color.origFormat = "hex")), this.update(!0), this.element.trigger({
        type: "changeColor",
        color: this.color
      }), !1;
    },
    mouseup: function mouseup(b) {
      return b.stopPropagation(), b.preventDefault(), a(document).off({
        "mousemove.colorpicker": this.mousemove,
        "touchmove.colorpicker": this.mousemove,
        "mouseup.colorpicker": this.mouseup,
        "touchend.colorpicker": this.mouseup
      }), !1;
    },
    change: function change(a) {
      this.keyup(a);
    },
    keyup: function keyup(a) {
      38 === a.keyCode ? (this.color.value.a < 1 && (this.color.value.a = Math.round(100 * (this.color.value.a + .01)) / 100), this.update(!0)) : 40 === a.keyCode ? (this.color.value.a > 0 && (this.color.value.a = Math.round(100 * (this.color.value.a - .01)) / 100), this.update(!0)) : (this.color = new b(this.input.val(), this.options.colorSelectors), this.color.origFormat && this.options.format === !1 && (this.format = this.color.origFormat), this.getValue(!1) !== !1 && (this.updateData(), this.updateComponent(), this.updatePicker())), this.element.trigger({
        type: "changeColor",
        color: this.color,
        value: this.input.val()
      });
    }
  }, a.colorpicker = d, a.fn.colorpicker = function (b) {
    var c,
        e = arguments,
        f = this.each(function () {
      var f = a(this),
          g = f.data("colorpicker"),
          h = "object" == _typeof(b) ? b : {};
      g || "string" == typeof b ? "string" == typeof b && (c = g[b].apply(g, Array.prototype.slice.call(e, 1))) : f.data("colorpicker", new d(this, h));
    });
    return "getValue" === b ? c : f;
  }, a.fn.colorpicker.constructor = d;
});

/***/ }),

/***/ "./assets/js/bootstrap-datepicker.min.js":
/*!***********************************************!*\
  !*** ./assets/js/bootstrap-datepicker.min.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.fill.js */ "./node_modules/core-js/modules/es.array.fill.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Datepicker for Bootstrap v1.6.0 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
!function (a) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (a, b) {
  function c() {
    return new Date(Date.UTC.apply(Date, arguments));
  }

  function d() {
    var a = new Date();
    return c(a.getFullYear(), a.getMonth(), a.getDate());
  }

  function e(a, b) {
    return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
  }

  function f(a) {
    return function () {
      return this[a].apply(this, arguments);
    };
  }

  function g(a) {
    return a && !isNaN(a.getTime());
  }

  function h(b, c) {
    function d(a, b) {
      return b.toLowerCase();
    }

    var e,
        f = a(b).data(),
        g = {},
        h = new RegExp("^" + c.toLowerCase() + "([A-Z])");
    c = new RegExp("^" + c.toLowerCase());

    for (var i in f) {
      c.test(i) && (e = i.replace(h, d), g[e] = f[i]);
    }

    return g;
  }

  function i(b) {
    var c = {};

    if (q[b] || (b = b.split("-")[0], q[b])) {
      var d = q[b];
      return a.each(p, function (a, b) {
        b in d && (c[b] = d[b]);
      }), c;
    }
  }

  var j = function () {
    var b = {
      get: function get(a) {
        return this.slice(a)[0];
      },
      contains: function contains(a) {
        for (var b = a && a.valueOf(), c = 0, d = this.length; d > c; c++) {
          if (this[c].valueOf() === b) return c;
        }

        return -1;
      },
      remove: function remove(a) {
        this.splice(a, 1);
      },
      replace: function replace(b) {
        b && (a.isArray(b) || (b = [b]), this.clear(), this.push.apply(this, b));
      },
      clear: function clear() {
        this.length = 0;
      },
      copy: function copy() {
        var a = new j();
        return a.replace(this), a;
      }
    };
    return function () {
      var c = [];
      return c.push.apply(c, arguments), a.extend(c, b), c;
    };
  }(),
      k = function k(b, c) {
    a(b).data("datepicker", this), this._process_options(c), this.dates = new j(), this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = a(b), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = a(r.template), this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow), this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function (a, b) {
      return parseInt(b) + 1;
    }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted), this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show();
  };

  k.prototype = {
    constructor: k,
    _resolveViewName: function _resolveViewName(a, c) {
      return 0 === a || "days" === a || "month" === a ? 0 : 1 === a || "months" === a || "year" === a ? 1 : 2 === a || "years" === a || "decade" === a ? 2 : 3 === a || "decades" === a || "century" === a ? 3 : 4 === a || "centuries" === a || "millennium" === a ? 4 : c === b ? !1 : c;
    },
    _check_template: function _check_template(c) {
      try {
        if (c === b || "" === c) return !1;
        if ((c.match(/[<>]/g) || []).length <= 0) return !0;
        var d = a(c);
        return d.length > 0;
      } catch (e) {
        return !1;
      }
    },
    _process_options: function _process_options(b) {
      this._o = a.extend({}, this._o, b);
      var e = this.o = a.extend({}, this._o),
          f = e.language;
      q[f] || (f = f.split("-")[0], q[f] || (f = o.language)), e.language = f, e.startView = this._resolveViewName(e.startView, 0), e.minViewMode = this._resolveViewName(e.minViewMode, 0), e.maxViewMode = this._resolveViewName(e.maxViewMode, 4), e.startView = Math.min(e.startView, e.maxViewMode), e.startView = Math.max(e.startView, e.minViewMode), e.multidate !== !0 && (e.multidate = Number(e.multidate) || !1, e.multidate !== !1 && (e.multidate = Math.max(0, e.multidate))), e.multidateSeparator = String(e.multidateSeparator), e.weekStart %= 7, e.weekEnd = (e.weekStart + 6) % 7;
      var g = r.parseFormat(e.format);

      if (e.startDate !== -(1 / 0) && (e.startDate ? e.startDate instanceof Date ? e.startDate = this._local_to_utc(this._zero_time(e.startDate)) : e.startDate = r.parseDate(e.startDate, g, e.language, e.assumeNearbyYear) : e.startDate = -(1 / 0)), e.endDate !== 1 / 0 && (e.endDate ? e.endDate instanceof Date ? e.endDate = this._local_to_utc(this._zero_time(e.endDate)) : e.endDate = r.parseDate(e.endDate, g, e.language, e.assumeNearbyYear) : e.endDate = 1 / 0), e.daysOfWeekDisabled = e.daysOfWeekDisabled || [], a.isArray(e.daysOfWeekDisabled) || (e.daysOfWeekDisabled = e.daysOfWeekDisabled.split(/[,\s]*/)), e.daysOfWeekDisabled = a.map(e.daysOfWeekDisabled, function (a) {
        return parseInt(a, 10);
      }), e.daysOfWeekHighlighted = e.daysOfWeekHighlighted || [], a.isArray(e.daysOfWeekHighlighted) || (e.daysOfWeekHighlighted = e.daysOfWeekHighlighted.split(/[,\s]*/)), e.daysOfWeekHighlighted = a.map(e.daysOfWeekHighlighted, function (a) {
        return parseInt(a, 10);
      }), e.datesDisabled = e.datesDisabled || [], !a.isArray(e.datesDisabled)) {
        var h = [];
        h.push(r.parseDate(e.datesDisabled, g, e.language, e.assumeNearbyYear)), e.datesDisabled = h;
      }

      e.datesDisabled = a.map(e.datesDisabled, function (a) {
        return r.parseDate(a, g, e.language, e.assumeNearbyYear);
      });
      var i = String(e.orientation).toLowerCase().split(/\s+/g),
          j = e.orientation.toLowerCase();
      if (i = a.grep(i, function (a) {
        return /^auto|left|right|top|bottom$/.test(a);
      }), e.orientation = {
        x: "auto",
        y: "auto"
      }, j && "auto" !== j) {
        if (1 === i.length) switch (i[0]) {
          case "top":
          case "bottom":
            e.orientation.y = i[0];
            break;

          case "left":
          case "right":
            e.orientation.x = i[0];
        } else j = a.grep(i, function (a) {
          return /^left|right$/.test(a);
        }), e.orientation.x = j[0] || "auto", j = a.grep(i, function (a) {
          return /^top|bottom$/.test(a);
        }), e.orientation.y = j[0] || "auto";
      } else ;

      if (e.defaultViewDate) {
        var k = e.defaultViewDate.year || new Date().getFullYear(),
            l = e.defaultViewDate.month || 0,
            m = e.defaultViewDate.day || 1;
        e.defaultViewDate = c(k, l, m);
      } else e.defaultViewDate = d();
    },
    _events: [],
    _secondaryEvents: [],
    _applyEvents: function _applyEvents(a) {
      for (var c, d, e, f = 0; f < a.length; f++) {
        c = a[f][0], 2 === a[f].length ? (d = b, e = a[f][1]) : 3 === a[f].length && (d = a[f][1], e = a[f][2]), c.on(e, d);
      }
    },
    _unapplyEvents: function _unapplyEvents(a) {
      for (var c, d, e, f = 0; f < a.length; f++) {
        c = a[f][0], 2 === a[f].length ? (e = b, d = a[f][1]) : 3 === a[f].length && (e = a[f][1], d = a[f][2]), c.off(d, e);
      }
    },
    _buildEvents: function _buildEvents() {
      var b = {
        keyup: a.proxy(function (b) {
          -1 === a.inArray(b.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update();
        }, this),
        keydown: a.proxy(this.keydown, this),
        paste: a.proxy(this.paste, this)
      };
      this.o.showOnFocus === !0 && (b.focus = a.proxy(this.show, this)), this.isInput ? this._events = [[this.element, b]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), b], [this.component, {
        click: a.proxy(this.show, this)
      }]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {
        click: a.proxy(this.show, this)
      }]], this._events.push([this.element, "*", {
        blur: a.proxy(function (a) {
          this._focused_from = a.target;
        }, this)
      }], [this.element, {
        blur: a.proxy(function (a) {
          this._focused_from = a.target;
        }, this)
      }]), this.o.immediateUpdates && this._events.push([this.element, {
        "changeYear changeMonth": a.proxy(function (a) {
          this.update(a.date);
        }, this)
      }]), this._secondaryEvents = [[this.picker, {
        click: a.proxy(this.click, this)
      }], [a(window), {
        resize: a.proxy(this.place, this)
      }], [a(document), {
        mousedown: a.proxy(function (a) {
          this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.picker.hasClass("datepicker-inline") || this.hide();
        }, this)
      }]];
    },
    _attachEvents: function _attachEvents() {
      this._detachEvents(), this._applyEvents(this._events);
    },
    _detachEvents: function _detachEvents() {
      this._unapplyEvents(this._events);
    },
    _attachSecondaryEvents: function _attachSecondaryEvents() {
      this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
    },
    _detachSecondaryEvents: function _detachSecondaryEvents() {
      this._unapplyEvents(this._secondaryEvents);
    },
    _trigger: function _trigger(b, c) {
      var d = c || this.dates.get(-1),
          e = this._utc_to_local(d);

      this.element.trigger({
        type: b,
        date: e,
        dates: a.map(this.dates, this._utc_to_local),
        format: a.proxy(function (a, b) {
          0 === arguments.length ? (a = this.dates.length - 1, b = this.o.format) : "string" == typeof a && (b = a, a = this.dates.length - 1), b = b || this.o.format;
          var c = this.dates.get(a);
          return r.formatDate(c, b, this.o.language);
        }, this)
      });
    },
    show: function show() {
      var b = this.component ? this.element.find("input") : this.element;
      if (!b.attr("readonly") || this.o.enableOnReadonly !== !1) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && a(this.element).blur(), this;
    },
    hide: function hide() {
      return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"), this) : this;
    },
    destroy: function destroy() {
      return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this;
    },
    paste: function paste(b) {
      var c;
      if (b.originalEvent.clipboardData && b.originalEvent.clipboardData.types && -1 !== a.inArray("text/plain", b.originalEvent.clipboardData.types)) c = b.originalEvent.clipboardData.getData("text/plain");else {
        if (!window.clipboardData) return;
        c = window.clipboardData.getData("Text");
      }
      this.setDate(c), this.update(), b.preventDefault();
    },
    _utc_to_local: function _utc_to_local(a) {
      return a && new Date(a.getTime() + 6e4 * a.getTimezoneOffset());
    },
    _local_to_utc: function _local_to_utc(a) {
      return a && new Date(a.getTime() - 6e4 * a.getTimezoneOffset());
    },
    _zero_time: function _zero_time(a) {
      return a && new Date(a.getFullYear(), a.getMonth(), a.getDate());
    },
    _zero_utc_time: function _zero_utc_time(a) {
      return a && new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()));
    },
    getDates: function getDates() {
      return a.map(this.dates, this._utc_to_local);
    },
    getUTCDates: function getUTCDates() {
      return a.map(this.dates, function (a) {
        return new Date(a);
      });
    },
    getDate: function getDate() {
      return this._utc_to_local(this.getUTCDate());
    },
    getUTCDate: function getUTCDate() {
      var a = this.dates.get(-1);
      return "undefined" != typeof a ? new Date(a) : null;
    },
    clearDates: function clearDates() {
      var a;
      this.isInput ? a = this.element : this.component && (a = this.element.find("input")), a && a.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide();
    },
    setDates: function setDates() {
      var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
      return this.update.apply(this, b), this._trigger("changeDate"), this.setValue(), this;
    },
    setUTCDates: function setUTCDates() {
      var b = a.isArray(arguments[0]) ? arguments[0] : arguments;
      return this.update.apply(this, a.map(b, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this;
    },
    setDate: f("setDates"),
    setUTCDate: f("setUTCDates"),
    remove: f("destroy"),
    setValue: function setValue() {
      var a = this.getFormattedDate();
      return this.isInput ? this.element.val(a) : this.component && this.element.find("input").val(a), this;
    },
    getFormattedDate: function getFormattedDate(c) {
      c === b && (c = this.o.format);
      var d = this.o.language;
      return a.map(this.dates, function (a) {
        return r.formatDate(a, c, d);
      }).join(this.o.multidateSeparator);
    },
    getStartDate: function getStartDate() {
      return this.o.startDate;
    },
    setStartDate: function setStartDate(a) {
      return this._process_options({
        startDate: a
      }), this.update(), this.updateNavArrows(), this;
    },
    getEndDate: function getEndDate() {
      return this.o.endDate;
    },
    setEndDate: function setEndDate(a) {
      return this._process_options({
        endDate: a
      }), this.update(), this.updateNavArrows(), this;
    },
    setDaysOfWeekDisabled: function setDaysOfWeekDisabled(a) {
      return this._process_options({
        daysOfWeekDisabled: a
      }), this.update(), this.updateNavArrows(), this;
    },
    setDaysOfWeekHighlighted: function setDaysOfWeekHighlighted(a) {
      return this._process_options({
        daysOfWeekHighlighted: a
      }), this.update(), this;
    },
    setDatesDisabled: function setDatesDisabled(a) {
      this._process_options({
        datesDisabled: a
      }), this.update(), this.updateNavArrows();
    },
    place: function place() {
      if (this.isInline) return this;
      var b = this.picker.outerWidth(),
          c = this.picker.outerHeight(),
          d = 10,
          e = a(this.o.container),
          f = e.width(),
          g = "body" === this.o.container ? a(document).scrollTop() : e.scrollTop(),
          h = e.offset(),
          i = [];
      this.element.parents().each(function () {
        var b = a(this).css("z-index");
        "auto" !== b && 0 !== b && i.push(parseInt(b));
      });
      var j = Math.max.apply(Math, i) + this.o.zIndexOffset,
          k = this.component ? this.component.parent().offset() : this.element.offset(),
          l = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
          m = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
          n = k.left - h.left,
          o = k.top - h.top;
      "body" !== this.o.container && (o += g), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (n -= b - m)) : k.left < 0 ? (this.picker.addClass("datepicker-orient-left"), n -= k.left - d) : n + b > f ? (this.picker.addClass("datepicker-orient-right"), n += m - b) : this.picker.addClass("datepicker-orient-left");
      var p,
          q = this.o.orientation.y;

      if ("auto" === q && (p = -g + o - c, q = 0 > p ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + q), "top" === q ? o -= c + parseInt(this.picker.css("padding-top")) : o += l, this.o.rtl) {
        var r = f - (n + m);
        this.picker.css({
          top: o,
          right: r,
          zIndex: j
        });
      } else this.picker.css({
        top: o,
        left: n,
        zIndex: j
      });

      return this;
    },
    _allow_update: !0,
    update: function update() {
      if (!this._allow_update) return this;
      var b = this.dates.copy(),
          c = [],
          d = !1;
      return arguments.length ? (a.each(arguments, a.proxy(function (a, b) {
        b instanceof Date && (b = this._local_to_utc(b)), c.push(b);
      }, this)), d = !0) : (c = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), c = c && this.o.multidate ? c.split(this.o.multidateSeparator) : [c], delete this.element.data().date), c = a.map(c, a.proxy(function (a) {
        return r.parseDate(a, this.o.format, this.o.language, this.o.assumeNearbyYear);
      }, this)), c = a.grep(c, a.proxy(function (a) {
        return !this.dateWithinRange(a) || !a;
      }, this), !0), this.dates.replace(c), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate, d ? this.setValue() : c.length && String(b) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && b.length && this._trigger("clearDate"), this.fill(), this.element.change(), this;
    },
    fillDow: function fillDow() {
      var b = this.o.weekStart,
          c = "<tr>";

      for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function (a, b) {
        return parseInt(b) + 1;
      }), c += '<th class="cw">&#160;</th>'); b < this.o.weekStart + 7;) {
        c += '<th class="dow', a.inArray(b, this.o.daysOfWeekDisabled) > -1 && (c += " disabled"), c += '">' + q[this.o.language].daysMin[b++ % 7] + "</th>";
      }

      c += "</tr>", this.picker.find(".datepicker-days thead").append(c);
    },
    fillMonths: function fillMonths() {
      for (var a = this._utc_to_local(this.viewDate), b = "", c = 0; 12 > c;) {
        var d = a && a.getMonth() === c ? " focused" : "";
        b += '<span class="month' + d + '">' + q[this.o.language].monthsShort[c++] + "</span>";
      }

      this.picker.find(".datepicker-months td").html(b);
    },
    setRange: function setRange(b) {
      b && b.length ? this.range = a.map(b, function (a) {
        return a.valueOf();
      }) : delete this.range, this.fill();
    },
    getClassNames: function getClassNames(b) {
      var c = [],
          d = this.viewDate.getUTCFullYear(),
          e = this.viewDate.getUTCMonth(),
          f = new Date();
      return b.getUTCFullYear() < d || b.getUTCFullYear() === d && b.getUTCMonth() < e ? c.push("old") : (b.getUTCFullYear() > d || b.getUTCFullYear() === d && b.getUTCMonth() > e) && c.push("new"), this.focusDate && b.valueOf() === this.focusDate.valueOf() && c.push("focused"), this.o.todayHighlight && b.getUTCFullYear() === f.getFullYear() && b.getUTCMonth() === f.getMonth() && b.getUTCDate() === f.getDate() && c.push("today"), -1 !== this.dates.contains(b) && c.push("active"), this.dateWithinRange(b) && !this.dateIsDisabled(b) || c.push("disabled"), -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekHighlighted) && c.push("highlighted"), this.range && (b > this.range[0] && b < this.range[this.range.length - 1] && c.push("range"), -1 !== a.inArray(b.valueOf(), this.range) && c.push("selected"), b.valueOf() === this.range[0] && c.push("range-start"), b.valueOf() === this.range[this.range.length - 1] && c.push("range-end")), c;
    },
    _fill_yearsView: function _fill_yearsView(c, d, e, f, g, h, i, j) {
      var k, l, m, n, o, p, q, r, s, t, u;

      for (k = "", l = this.picker.find(c), m = parseInt(g / e, 10) * e, o = parseInt(h / f, 10) * f, p = parseInt(i / f, 10) * f, n = a.map(this.dates, function (a) {
        return parseInt(a.getUTCFullYear() / f, 10) * f;
      }), l.find(".datepicker-switch").text(m + "-" + (m + 9 * f)), q = m - f, r = -1; 11 > r; r += 1) {
        s = [d], t = null, -1 === r ? s.push("old") : 10 === r && s.push("new"), -1 !== a.inArray(q, n) && s.push("active"), (o > q || q > p) && s.push("disabled"), q === this.viewDate.getFullYear() && s.push("focused"), j !== a.noop && (u = j(new Date(q, 0, 1)), u === b ? u = {} : "boolean" == typeof u ? u = {
          enabled: u
        } : "string" == typeof u && (u = {
          classes: u
        }), u.enabled === !1 && s.push("disabled"), u.classes && (s = s.concat(u.classes.split(/\s+/))), u.tooltip && (t = u.tooltip)), k += '<span class="' + s.join(" ") + '"' + (t ? ' title="' + t + '"' : "") + ">" + q + "</span>", q += f;
      }

      l.find("td").html(k);
    },
    fill: function fill() {
      var d,
          e,
          f = new Date(this.viewDate),
          g = f.getUTCFullYear(),
          h = f.getUTCMonth(),
          i = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
          j = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
          k = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
          l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
          m = q[this.o.language].today || q.en.today || "",
          n = q[this.o.language].clear || q.en.clear || "",
          o = q[this.o.language].titleFormat || q.en.titleFormat;

      if (!isNaN(g) && !isNaN(h)) {
        this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f, o, this.o.language)), this.picker.find("tfoot .today").text(m).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot .clear").text(n).toggle(this.o.clearBtn !== !1), this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title), this.updateNavArrows(), this.fillMonths();
        var p = c(g, h - 1, 28),
            s = r.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
        p.setUTCDate(s), p.setUTCDate(s - (p.getUTCDay() - this.o.weekStart + 7) % 7);
        var t = new Date(p);
        p.getUTCFullYear() < 100 && t.setUTCFullYear(p.getUTCFullYear()), t.setUTCDate(t.getUTCDate() + 42), t = t.valueOf();

        for (var u, v = []; p.valueOf() < t;) {
          if (p.getUTCDay() === this.o.weekStart && (v.push("<tr>"), this.o.calendarWeeks)) {
            var w = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
                x = new Date(Number(w) + (11 - w.getUTCDay()) % 7 * 864e5),
                y = new Date(Number(y = c(x.getUTCFullYear(), 0, 1)) + (11 - y.getUTCDay()) % 7 * 864e5),
                z = (x - y) / 864e5 / 7 + 1;
            v.push('<td class="cw">' + z + "</td>");
          }

          u = this.getClassNames(p), u.push("day"), this.o.beforeShowDay !== a.noop && (e = this.o.beforeShowDay(this._utc_to_local(p)), e === b ? e = {} : "boolean" == typeof e ? e = {
            enabled: e
          } : "string" == typeof e && (e = {
            classes: e
          }), e.enabled === !1 && u.push("disabled"), e.classes && (u = u.concat(e.classes.split(/\s+/))), e.tooltip && (d = e.tooltip)), u = a.unique(u), v.push('<td class="' + u.join(" ") + '"' + (d ? ' title="' + d + '"' : "") + ">" + p.getUTCDate() + "</td>"), d = null, p.getUTCDay() === this.o.weekEnd && v.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1);
        }

        this.picker.find(".datepicker-days tbody").empty().append(v.join(""));
        var A = q[this.o.language].monthsTitle || q.en.monthsTitle || "Months",
            B = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? A : g).end().find("span").removeClass("active");

        if (a.each(this.dates, function (a, b) {
          b.getUTCFullYear() === g && B.eq(b.getUTCMonth()).addClass("active");
        }), (i > g || g > k) && B.addClass("disabled"), g === i && B.slice(0, j).addClass("disabled"), g === k && B.slice(l + 1).addClass("disabled"), this.o.beforeShowMonth !== a.noop) {
          var C = this;
          a.each(B, function (c, d) {
            var e = new Date(g, c, 1),
                f = C.o.beforeShowMonth(e);
            f === b ? f = {} : "boolean" == typeof f ? f = {
              enabled: f
            } : "string" == typeof f && (f = {
              classes: f
            }), f.enabled !== !1 || a(d).hasClass("disabled") || a(d).addClass("disabled"), f.classes && a(d).addClass(f.classes), f.tooltip && a(d).prop("title", f.tooltip);
          });
        }

        this._fill_yearsView(".datepicker-years", "year", 10, 1, g, i, k, this.o.beforeShowYear), this._fill_yearsView(".datepicker-decades", "decade", 100, 10, g, i, k, this.o.beforeShowDecade), this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, g, i, k, this.o.beforeShowCentury);
      }
    },
    updateNavArrows: function updateNavArrows() {
      if (this._allow_update) {
        var a = new Date(this.viewDate),
            b = a.getUTCFullYear(),
            c = a.getUTCMonth();

        switch (this.viewMode) {
          case 0:
            this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() && c <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
              visibility: "hidden"
            }) : this.picker.find(".prev").css({
              visibility: "visible"
            }), this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() && c >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
              visibility: "hidden"
            }) : this.picker.find(".next").css({
              visibility: "visible"
            });
            break;

          case 1:
          case 2:
          case 3:
          case 4:
            this.o.startDate !== -(1 / 0) && b <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").css({
              visibility: "hidden"
            }) : this.picker.find(".prev").css({
              visibility: "visible"
            }), this.o.endDate !== 1 / 0 && b >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").css({
              visibility: "hidden"
            }) : this.picker.find(".next").css({
              visibility: "visible"
            });
        }
      }
    },
    click: function click(b) {
      b.preventDefault(), b.stopPropagation();
      var e, f, g, h, i, j, k;
      e = a(b.target), e.hasClass("datepicker-switch") && this.showMode(1);
      var l = e.closest(".prev, .next");
      l.length > 0 && (f = r.modes[this.viewMode].navStep * (l.hasClass("prev") ? -1 : 1), 0 === this.viewMode ? (this.viewDate = this.moveMonth(this.viewDate, f), this._trigger("changeMonth", this.viewDate)) : (this.viewDate = this.moveYear(this.viewDate, f), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)), this.fill()), e.hasClass("today") && (this.showMode(-2), this._setDate(d(), "linked" === this.o.todayBtn ? null : "view")), e.hasClass("clear") && this.clearDates(), e.hasClass("disabled") || (e.hasClass("day") && (g = parseInt(e.text(), 10) || 1, h = this.viewDate.getUTCFullYear(), i = this.viewDate.getUTCMonth(), e.hasClass("old") && (0 === i ? (i = 11, h -= 1, j = !0, k = !0) : (i -= 1, j = !0)), e.hasClass("new") && (11 === i ? (i = 0, h += 1, j = !0, k = !0) : (i += 1, j = !0)), this._setDate(c(h, i, g)), k && this._trigger("changeYear", this.viewDate), j && this._trigger("changeMonth", this.viewDate)), e.hasClass("month") && (this.viewDate.setUTCDate(1), g = 1, i = e.parent().find("span").index(e), h = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(i), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode ? (this._setDate(c(h, i, g)), this.showMode()) : this.showMode(-1), this.fill()), (e.hasClass("year") || e.hasClass("decade") || e.hasClass("century")) && (this.viewDate.setUTCDate(1), g = 1, i = 0, h = parseInt(e.text(), 10) || 0, this.viewDate.setUTCFullYear(h), e.hasClass("year") && (this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(c(h, i, g))), e.hasClass("decade") && (this._trigger("changeDecade", this.viewDate), 3 === this.o.minViewMode && this._setDate(c(h, i, g))), e.hasClass("century") && (this._trigger("changeCentury", this.viewDate), 4 === this.o.minViewMode && this._setDate(c(h, i, g))), this.showMode(-1), this.fill())), this.picker.is(":visible") && this._focused_from && a(this._focused_from).focus(), delete this._focused_from;
    },
    _toggle_multidate: function _toggle_multidate(a) {
      var b = this.dates.contains(a);
      if (a || this.dates.clear(), -1 !== b ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(b) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(a)) : this.dates.push(a), "number" == typeof this.o.multidate) for (; this.dates.length > this.o.multidate;) {
        this.dates.remove(0);
      }
    },
    _setDate: function _setDate(a, b) {
      b && "date" !== b || this._toggle_multidate(a && new Date(a)), b && "view" !== b || (this.viewDate = a && new Date(a)), this.fill(), this.setValue(), b && "view" === b || this._trigger("changeDate");
      var c;
      this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && c.change(), !this.o.autoclose || b && "date" !== b || this.hide();
    },
    moveDay: function moveDay(a, b) {
      var c = new Date(a);
      return c.setUTCDate(a.getUTCDate() + b), c;
    },
    moveWeek: function moveWeek(a, b) {
      return this.moveDay(a, 7 * b);
    },
    moveMonth: function moveMonth(a, b) {
      if (!g(a)) return this.o.defaultViewDate;
      if (!b) return a;
      var c,
          d,
          e = new Date(a.valueOf()),
          f = e.getUTCDate(),
          h = e.getUTCMonth(),
          i = Math.abs(b);
      if (b = b > 0 ? 1 : -1, 1 === i) d = -1 === b ? function () {
        return e.getUTCMonth() === h;
      } : function () {
        return e.getUTCMonth() !== c;
      }, c = h + b, e.setUTCMonth(c), (0 > c || c > 11) && (c = (c + 12) % 12);else {
        for (var j = 0; i > j; j++) {
          e = this.moveMonth(e, b);
        }

        c = e.getUTCMonth(), e.setUTCDate(f), d = function d() {
          return c !== e.getUTCMonth();
        };
      }

      for (; d();) {
        e.setUTCDate(--f), e.setUTCMonth(c);
      }

      return e;
    },
    moveYear: function moveYear(a, b) {
      return this.moveMonth(a, 12 * b);
    },
    moveAvailableDate: function moveAvailableDate(a, b, c) {
      do {
        if (a = this[c](a, b), !this.dateWithinRange(a)) return !1;
        c = "moveDay";
      } while (this.dateIsDisabled(a));

      return a;
    },
    weekOfDateIsDisabled: function weekOfDateIsDisabled(b) {
      return -1 !== a.inArray(b.getUTCDay(), this.o.daysOfWeekDisabled);
    },
    dateIsDisabled: function dateIsDisabled(b) {
      return this.weekOfDateIsDisabled(b) || a.grep(this.o.datesDisabled, function (a) {
        return e(b, a);
      }).length > 0;
    },
    dateWithinRange: function dateWithinRange(a) {
      return a >= this.o.startDate && a <= this.o.endDate;
    },
    keydown: function keydown(a) {
      if (!this.picker.is(":visible")) return void (40 !== a.keyCode && 27 !== a.keyCode || (this.show(), a.stopPropagation()));
      var b,
          c,
          d = !1,
          e = this.focusDate || this.viewDate;

      switch (a.keyCode) {
        case 27:
          this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), a.preventDefault(), a.stopPropagation();
          break;

        case 37:
        case 38:
        case 39:
        case 40:
          if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
          b = 37 === a.keyCode || 38 === a.keyCode ? -1 : 1, 0 === this.viewMode ? a.ctrlKey ? (c = this.moveAvailableDate(e, b, "moveYear"), c && this._trigger("changeYear", this.viewDate)) : a.shiftKey ? (c = this.moveAvailableDate(e, b, "moveMonth"), c && this._trigger("changeMonth", this.viewDate)) : 37 === a.keyCode || 39 === a.keyCode ? c = this.moveAvailableDate(e, b, "moveDay") : this.weekOfDateIsDisabled(e) || (c = this.moveAvailableDate(e, b, "moveWeek")) : 1 === this.viewMode ? (38 !== a.keyCode && 40 !== a.keyCode || (b = 4 * b), c = this.moveAvailableDate(e, b, "moveMonth")) : 2 === this.viewMode && (38 !== a.keyCode && 40 !== a.keyCode || (b = 4 * b), c = this.moveAvailableDate(e, b, "moveYear")), c && (this.focusDate = this.viewDate = c, this.setValue(), this.fill(), a.preventDefault());
          break;

        case 13:
          if (!this.o.forceParse) break;
          e = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(e), d = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (a.preventDefault(), a.stopPropagation(), this.o.autoclose && this.hide());
          break;

        case 9:
          this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide();
      }

      if (d) {
        this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
        var f;
        this.isInput ? f = this.element : this.component && (f = this.element.find("input")), f && f.change();
      }
    },
    showMode: function showMode(a) {
      a && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + a))), this.picker.children("div").hide().filter(".datepicker-" + r.modes[this.viewMode].clsName).show(), this.updateNavArrows();
    }
  };

  var l = function l(b, c) {
    a(b).data("datepicker", this), this.element = a(b), this.inputs = a.map(c.inputs, function (a) {
      return a.jquery ? a[0] : a;
    }), delete c.inputs, n.call(a(this.inputs), c).on("changeDate", a.proxy(this.dateUpdated, this)), this.pickers = a.map(this.inputs, function (b) {
      return a(b).data("datepicker");
    }), this.updateDates();
  };

  l.prototype = {
    updateDates: function updateDates() {
      this.dates = a.map(this.pickers, function (a) {
        return a.getUTCDate();
      }), this.updateRanges();
    },
    updateRanges: function updateRanges() {
      var b = a.map(this.dates, function (a) {
        return a.valueOf();
      });
      a.each(this.pickers, function (a, c) {
        c.setRange(b);
      });
    },
    dateUpdated: function dateUpdated(b) {
      if (!this.updating) {
        this.updating = !0;
        var c = a(b.target).data("datepicker");

        if ("undefined" != typeof c) {
          var d = c.getUTCDate(),
              e = a.inArray(b.target, this.inputs),
              f = e - 1,
              g = e + 1,
              h = this.inputs.length;

          if (-1 !== e) {
            if (a.each(this.pickers, function (a, b) {
              b.getUTCDate() || b.setUTCDate(d);
            }), d < this.dates[f]) for (; f >= 0 && d < this.dates[f];) {
              this.pickers[f--].setUTCDate(d);
            } else if (d > this.dates[g]) for (; h > g && d > this.dates[g];) {
              this.pickers[g++].setUTCDate(d);
            }
            this.updateDates(), delete this.updating;
          }
        }
      }
    },
    remove: function remove() {
      a.map(this.pickers, function (a) {
        a.remove();
      }), delete this.element.data().datepicker;
    }
  };

  var m = a.fn.datepicker,
      n = function n(c) {
    var d = Array.apply(null, arguments);
    d.shift();
    var e;
    if (this.each(function () {
      var b = a(this),
          f = b.data("datepicker"),
          g = "object" == _typeof(c) && c;

      if (!f) {
        var j = h(this, "date"),
            m = a.extend({}, o, j, g),
            n = i(m.language),
            p = a.extend({}, o, n, j, g);
        b.hasClass("input-daterange") || p.inputs ? (a.extend(p, {
          inputs: p.inputs || b.find("input").toArray()
        }), f = new l(this, p)) : f = new k(this, p), b.data("datepicker", f);
      }

      "string" == typeof c && "function" == typeof f[c] && (e = f[c].apply(f, d));
    }), e === b || e instanceof k || e instanceof l) return this;
    if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + c + " function)");
    return e;
  };

  a.fn.datepicker = n;
  var o = a.fn.datepicker.defaults = {
    assumeNearbyYear: !1,
    autoclose: !1,
    beforeShowDay: a.noop,
    beforeShowMonth: a.noop,
    beforeShowYear: a.noop,
    beforeShowDecade: a.noop,
    beforeShowCentury: a.noop,
    calendarWeeks: !1,
    clearBtn: !1,
    toggleActive: !1,
    daysOfWeekDisabled: [],
    daysOfWeekHighlighted: [],
    datesDisabled: [],
    endDate: 1 / 0,
    forceParse: !0,
    format: "mm/dd/yyyy",
    keyboardNavigation: !0,
    language: "en",
    minViewMode: 0,
    maxViewMode: 4,
    multidate: !1,
    multidateSeparator: ",",
    orientation: "auto",
    rtl: !1,
    startDate: -(1 / 0),
    startView: 0,
    todayBtn: !1,
    todayHighlight: !1,
    weekStart: 0,
    disableTouchKeyboard: !1,
    enableOnReadonly: !0,
    showOnFocus: !0,
    zIndexOffset: 10,
    container: "body",
    immediateUpdates: !1,
    title: "",
    templates: {
      leftArrow: "&laquo;",
      rightArrow: "&raquo;"
    }
  },
      p = a.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
  a.fn.datepicker.Constructor = k;
  var q = a.fn.datepicker.dates = {
    en: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today",
      clear: "Clear",
      titleFormat: "MM yyyy"
    }
  },
      r = {
    modes: [{
      clsName: "days",
      navFnc: "Month",
      navStep: 1
    }, {
      clsName: "months",
      navFnc: "FullYear",
      navStep: 1
    }, {
      clsName: "years",
      navFnc: "FullYear",
      navStep: 10
    }, {
      clsName: "decades",
      navFnc: "FullDecade",
      navStep: 100
    }, {
      clsName: "centuries",
      navFnc: "FullCentury",
      navStep: 1e3
    }],
    isLeapYear: function isLeapYear(a) {
      return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
    },
    getDaysInMonth: function getDaysInMonth(a, b) {
      return [31, r.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b];
    },
    validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
    nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
    parseFormat: function parseFormat(a) {
      if ("function" == typeof a.toValue && "function" == typeof a.toDisplay) return a;
      var b = a.replace(this.validParts, "\x00").split("\x00"),
          c = a.match(this.validParts);
      if (!b || !b.length || !c || 0 === c.length) throw new Error("Invalid date format.");
      return {
        separators: b,
        parts: c
      };
    },
    parseDate: function parseDate(e, f, g, h) {
      function i(a, b) {
        return b === !0 && (b = 10), 100 > a && (a += 2e3, a > new Date().getFullYear() + b && (a -= 100)), a;
      }

      function j() {
        var a = this.slice(0, s[n].length),
            b = s[n].slice(0, a.length);
        return a.toLowerCase() === b.toLowerCase();
      }

      if (!e) return b;
      if (e instanceof Date) return e;
      if ("string" == typeof f && (f = r.parseFormat(f)), f.toValue) return f.toValue(e, f, g);
      var l,
          m,
          n,
          o,
          p = /([\-+]\d+)([dmwy])/,
          s = e.match(/([\-+]\d+)([dmwy])/g),
          t = {
        d: "moveDay",
        m: "moveMonth",
        w: "moveWeek",
        y: "moveYear"
      },
          u = {
        yesterday: "-1d",
        today: "+0d",
        tomorrow: "+1d"
      };

      if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
        for (e = new Date(), n = 0; n < s.length; n++) {
          l = p.exec(s[n]), m = parseInt(l[1]), o = t[l[2]], e = k.prototype[o](e, m);
        }

        return c(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate());
      }

      if ("undefined" != typeof u[e] && (e = u[e], s = e.match(/([\-+]\d+)([dmwy])/g), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))) {
        for (e = new Date(), n = 0; n < s.length; n++) {
          l = p.exec(s[n]), m = parseInt(l[1]), o = t[l[2]], e = k.prototype[o](e, m);
        }

        return c(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate());
      }

      s = e && e.match(this.nonpunctuation) || [], e = new Date();
      var v,
          w,
          x = {},
          y = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
          z = {
        yyyy: function yyyy(a, b) {
          return a.setUTCFullYear(h ? i(b, h) : b);
        },
        yy: function yy(a, b) {
          return a.setUTCFullYear(h ? i(b, h) : b);
        },
        m: function m(a, b) {
          if (isNaN(a)) return a;

          for (b -= 1; 0 > b;) {
            b += 12;
          }

          for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() !== b;) {
            a.setUTCDate(a.getUTCDate() - 1);
          }

          return a;
        },
        d: function d(a, b) {
          return a.setUTCDate(b);
        }
      };
      z.M = z.MM = z.mm = z.m, z.dd = z.d, e = d();
      var A = f.parts.slice();

      if (s.length !== A.length && (A = a(A).filter(function (b, c) {
        return -1 !== a.inArray(c, y);
      }).toArray()), s.length === A.length) {
        var B;

        for (n = 0, B = A.length; B > n; n++) {
          if (v = parseInt(s[n], 10), l = A[n], isNaN(v)) switch (l) {
            case "MM":
              w = a(q[g].months).filter(j), v = a.inArray(w[0], q[g].months) + 1;
              break;

            case "M":
              w = a(q[g].monthsShort).filter(j), v = a.inArray(w[0], q[g].monthsShort) + 1;
          }
          x[l] = v;
        }

        var C, D;

        for (n = 0; n < y.length; n++) {
          D = y[n], D in x && !isNaN(x[D]) && (C = new Date(e), z[D](C, x[D]), isNaN(C) || (e = C));
        }
      }

      return e;
    },
    formatDate: function formatDate(b, c, d) {
      if (!b) return "";
      if ("string" == typeof c && (c = r.parseFormat(c)), c.toDisplay) return c.toDisplay(b, c, d);
      var e = {
        d: b.getUTCDate(),
        D: q[d].daysShort[b.getUTCDay()],
        DD: q[d].days[b.getUTCDay()],
        m: b.getUTCMonth() + 1,
        M: q[d].monthsShort[b.getUTCMonth()],
        MM: q[d].months[b.getUTCMonth()],
        yy: b.getUTCFullYear().toString().substring(2),
        yyyy: b.getUTCFullYear()
      };
      e.dd = (e.d < 10 ? "0" : "") + e.d, e.mm = (e.m < 10 ? "0" : "") + e.m, b = [];

      for (var f = a.extend([], c.separators), g = 0, h = c.parts.length; h >= g; g++) {
        f.length && b.push(f.shift()), b.push(e[c.parts[g]]);
      }

      return b.join("");
    },
    headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
    footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
  };
  r.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + r.headTemplate + "<tbody></tbody>" + r.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + r.headTemplate + r.contTemplate + r.footTemplate + "</table></div></div>", a.fn.datepicker.DPGlobal = r, a.fn.datepicker.noConflict = function () {
    return a.fn.datepicker = m, this;
  }, a.fn.datepicker.version = "1.6.0", a(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (b) {
    var c = a(this);
    c.data("datepicker") || (b.preventDefault(), n.call(c, "show"));
  }), a(function () {
    n.call(a('[data-provide="datepicker-inline"]'));
  });
});

/***/ }),

/***/ "./assets/js/bootstrap-tag.min.js":
/*!****************************************!*\
  !*** ./assets/js/bootstrap-tag.min.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var __webpack_provided_window_dot_jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

/* ==========================================================
 * bootstrap-tag.js v2.3.0
 * https://github.com/fdeschenes/bootstrap-tag
 * ==========================================================
 * Copyright 2012 Francois Deschenes.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function (a) {
  "use strict";

  var b = function b(_b, c) {
    this.element = a(_b), this.options = a.extend(!0, {}, a.fn.tag.defaults, c), this.values = a.grep(a.map(this.element.val().split(","), a.trim), function (a) {
      return a.length > 0;
    }), this.show();
  };

  b.prototype = {
    constructor: b,
    show: function show() {
      var b = this;
      b.element.parent().prepend(b.element.detach().hide()), b.element.wrap(a('<div class="tags">')).parent().on("click", function () {
        b.input.focus();
      }), b.values.length && a.each(b.values, function () {
        b.createBadge(this);
      }), b.input = a('<input type="text">').attr("placeholder", b.options.placeholder).insertAfter(b.element).on("focus", function () {
        b.element.parent().addClass("tags-hover");
      }).on("blur", function () {
        b.skip || (b.process(), b.element.parent().removeClass("tags-hover"), b.element.siblings(".tag").removeClass("tag-important")), b.skip = !1;
      }).on("keydown", function (c) {
        if (188 == c.keyCode || 13 == c.keyCode || 9 == c.keyCode) !a.trim(a(this).val()) || b.element.siblings(".typeahead").length && !b.element.siblings(".typeahead").is(":hidden") ? 188 == c.keyCode && (b.options.autocompleteOnComma ? !b.element.siblings(".typeahead").length || b.element.siblings(".typeahead").is(":hidden") ? c.preventDefault() : (b.input.data("bs_typeahead").select(), c.stopPropagation(), c.preventDefault()) : (c.preventDefault(), b.process())) : (9 != c.keyCode && c.preventDefault(), b.process());else if (a.trim(a(this).val()) || 8 != c.keyCode) b.element.siblings(".tag").removeClass("tag-important");else {
          var d = b.element.siblings(".tag").length;

          if (d) {
            var e = b.element.siblings(".tag:eq(" + (d - 1) + ")");
            e.hasClass("tag-important") ? b.remove(d - 1) : e.addClass("tag-important");
          }
        }
      }).bs_typeahead({
        source: b.options.source,
        matcher: function matcher(a) {
          return ~a.toLowerCase().indexOf(this.query.toLowerCase()) && (-1 == b.inValues(a) || b.options.allowDuplicates);
        },
        updater: a.proxy(b.add, b)
      }), a(b.input.data("bs_typeahead").$menu).on("mousedown", function () {
        b.skip = !0;
      }), this.element.trigger("shown");
    },
    inValues: function inValues(b) {
      if (this.options.caseInsensitive) {
        var c = -1;
        return a.each(this.values, function (a, d) {
          return d.toLowerCase() == b.toLowerCase() ? (c = a, !1) : void 0;
        }), c;
      }

      return a.inArray(b, this.values);
    },
    createBadge: function createBadge(b) {
      var c = this;
      a("<span/>", {
        "class": "tag"
      }).text(b.toString()).append(a('<button type="button" class="close">&times;</button>').on("click", function () {
        c.remove(c.element.siblings(".tag").index(a(this).closest(".tag")));
      })).insertBefore(c.element);
    },
    add: function add(b) {
      var c = this;

      if (!c.options.allowDuplicates) {
        var d = c.inValues(b);

        if (-1 != d) {
          var e = c.element.siblings(".tag:eq(" + d + ")");
          return e.addClass("tag-warning"), void setTimeout(function () {
            a(e).removeClass("tag-warning");
          }, 500);
        }
      }

      this.values.push(b), this.createBadge(b), this.element.val(this.values.join(", ")), this.element.trigger("added", [b]);
    },
    remove: function remove(a) {
      if (a >= 0) {
        var b = this.values.splice(a, 1);
        this.element.siblings(".tag:eq(" + a + ")").remove(), this.element.val(this.values.join(", ")), this.element.trigger("removed", [b]);
      }
    },
    process: function process() {
      var b = a.grep(a.map(this.input.val().split(","), a.trim), function (a) {
        return a.length > 0;
      }),
          c = this;
      a.each(b, function () {
        c.add(this);
      }), this.input.val("");
    },
    skip: !1
  };
  var c = a.fn.tag;
  a.fn.tag = function (c) {
    return this.each(function () {
      var d = a(this),
          e = d.data("tag"),
          f = "object" == _typeof(c) && c;
      e || d.data("tag", e = new b(this, f)), "string" == typeof c && e[c]();
    });
  }, a.fn.tag.defaults = {
    allowDuplicates: !1,
    caseInsensitive: !0,
    autocompleteOnComma: !1,
    placeholder: "",
    source: []
  }, a.fn.tag.Constructor = b, a.fn.tag.noConflict = function () {
    return a.fn.tag = c, this;
  }, a(window).on("load", function () {
    a('[data-provide="tag"]').each(function () {
      var b = a(this);
      b.data("tag") || b.tag(b.data());
    });
  });
}(__webpack_provided_window_dot_jQuery);

/***/ }),

/***/ "./assets/js/bootstrap.min.js":
/*!************************************!*\
  !*** ./assets/js/bootstrap.min.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
  "use strict";

  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
}(jQuery), +function (a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
        b = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };

    for (var c in b) {
      if (void 0 !== a.style[c]) return {
        end: b[c]
      };
    }

    return !1;
  }

  a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
        d = this;
    a(this).one("bsTransitionEnd", function () {
      c = !0;
    });

    var e = function e() {
      c || a(d).trigger(a.support.transition.end);
    };

    return setTimeout(e, b), this;
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
      bindType: a.support.transition.end,
      delegateType: a.support.transition.end,
      handle: function handle(b) {
        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
      }
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.alert");
      e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
    });
  }

  var c = '[data-dismiss="alert"]',
      d = function d(b) {
    a(b).on("click", c, this.close);
  };

  d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove();
    }

    var e = a(this),
        f = e.attr("data-target");
    f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
    var g = a(f);
    b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this;
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.button"),
          f = "object" == _typeof(b) && b;
      e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
    });
  }

  var c = function c(b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
  };

  c.VERSION = "3.3.6", c.DEFAULTS = {
    loadingText: "loading..."
  }, c.prototype.setState = function (b) {
    var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val" : "html",
        f = d.data();
    b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
    }, this), 0);
  }, c.prototype.toggle = function () {
    var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');

    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change");
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this;
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target);
    d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault();
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == _typeof(b) && b),
          g = "string" == typeof b ? b : f.slide;
      e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
    });
  }

  var c = function c(b, _c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
  };

  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {
        case 37:
          this.prev();
          break;

        case 39:
          this.next();
          break;

        default:
          return;
      }

      a.preventDefault();
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
    if (d && !this.options.wrap) return b;
    var e = "prev" == a ? -1 : 1,
        f = (c + e) % this.$items.length;
    return this.$items.eq(f);
  }, c.prototype.to = function (a) {
    var b = this,
        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a);
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
  }, c.prototype.next = function () {
    return this.sliding ? void 0 : this.slide("next");
  }, c.prototype.prev = function () {
    return this.sliding ? void 0 : this.slide("prev");
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
        f = d || this.getItemForDirection(b, e),
        g = this.interval,
        h = "next" == b ? "left" : "right",
        i = this;
    if (f.hasClass("active")) return this.sliding = !1;
    var j = f[0],
        k = a.Event("slide.bs.carousel", {
      relatedTarget: j,
      direction: h
    });

    if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
        l && l.addClass("active");
      }

      var m = a.Event("slid.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
      return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m);
        }, 0);
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
    }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this;
  };

  var e = function e(c) {
    var d,
        e = a(this),
        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));

    if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
          h = e.attr("data-slide-to");
      h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
    }
  };

  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);
      b.call(c, c.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    var c,
        d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
    return a(d);
  }

  function c(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.collapse"),
          f = a.extend({}, d.DEFAULTS, c.data(), "object" == _typeof(b) && b);
      !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
    });
  }

  var d = function d(b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
  };

  d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
    toggle: !0
  }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height";
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b,
          e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");

      if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");

        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
          var g = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;

          var h = function h() {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
          };

          if (!a.support.transition) return h.call(this);
          var i = a.camelCase(["scroll", g].join("-"));
          this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");

      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;

        var e = function e() {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };

        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);
      this.addAriaAndCollapsedClass(b(e), e);
    }, this)).end();
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");
    a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this;
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);
    e.attr("data-target") || d.preventDefault();
    var f = b(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle" : e.data();
    c.call(f, h);
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent();
  }

  function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
          e = b(d),
          f = {
        relatedTarget: this
      };
      e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))));
    }));
  }

  function d(b) {
    return this.each(function () {
      var c = a(this),
          d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
    });
  }

  var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function g(b) {
    a(b).on("click.bs.dropdown", this.toggle);
  };

  g.VERSION = "3.3.6", g.prototype.toggle = function (d) {
    var e = a(this);

    if (!e.is(".disabled, :disabled")) {
      var f = b(e),
          g = f.hasClass("open");

      if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
      }

      return !1;
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);

      if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
            g = e.hasClass("open");
        if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
        var h = " li:not(.disabled):visible a",
            i = e.find(".dropdown-menu" + h);

        if (i.length) {
          var j = i.index(c.target);
          38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
        }
      }
    }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this;
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation();
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function (a) {
  "use strict";

  function b(b, d) {
    return this.each(function () {
      var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == _typeof(b) && b);
      f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
    });
  }

  var c = function c(b, _c2) {
    this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal");
    }, this));
  };

  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a);
  }, c.prototype.show = function (b) {
    var d = this,
        e = a.Event("show.bs.modal", {
      relatedTarget: b
    });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
      });
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");
      d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
      var f = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f);
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
    }));
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
    }, this));
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide();
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
  }, c.prototype.hideModal = function () {
    var a = this;
    this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
    });
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
  }, c.prototype.backdrop = function (b) {
    var d = this,
        e = this.$element.hasClass("fade") ? "fade" : "";

    if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;
      if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
      }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");

      var g = function g() {
        d.removeBackdrop(), b && b();
      };

      a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
    } else b && b();
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog();
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
    });
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    });
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;

    if (!a) {
      var b = document.documentElement.getBoundingClientRect();
      a = b.right - Math.abs(b.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad);
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b;
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this;
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
        e = d.attr("href"),
        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
        g = f.data("bs.modal") ? "toggle" : a.extend({
      remote: !/#/.test(e) && e
    }, f.data(), d.data());
    d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus");
      });
    }), b.call(f, g, this);
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == _typeof(b) && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }

  var c = function c(a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
  };

  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
      click: !1,
      hover: !1,
      focus: !1
    }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");

    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
            i = "hover" == g ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle();
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b;
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
        c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d);
    }), b;
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show();
    }, c.options.delay.show)) : c.show());
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState) {
      if (this.inState[a]) return !0;
    }

    return !1;
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide();
    }, c.options.delay.hide)) : c.hide());
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (b.isDefaultPrevented() || !d) return;
      var e = this,
          f = this.tip(),
          g = this.getUID(this.type);
      this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
      var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
          i = /\s?auto?\s?/i,
          j = i.test(h);
      j && (h = h.replace(i, "") || "top"), f.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
      var k = this.getPosition(),
          l = f[0].offsetWidth,
          m = f[0].offsetHeight;

      if (j) {
        var n = h,
            o = this.getPosition(this.$viewport);
        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h);
      }

      var p = this.getCalculatedOffset(h, k, l, m);
      this.applyPlacement(p, h);

      var q = function q() {
        var a = e.hoverState;
        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
      };

      a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
        e = d[0].offsetWidth,
        f = d[0].offsetHeight,
        g = parseInt(d.css("margin-top"), 10),
        h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
      using: function using(a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        });
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
        j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = /top|bottom/.test(c),
        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
        n = l ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(m, d[0][n], l);
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
    }

    var e = this,
        f = a(this.$tip),
        g = a.Event("hide.bs." + this.type);
    return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this);
  }, c.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
  }, c.prototype.hasContent = function () {
    return this.getTitle();
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;
    var c = b[0],
        d = "BODY" == c.tagName,
        e = c.getBoundingClientRect();
    null == e.width && (e = a.extend({}, e, {
      width: e.right - e.left,
      height: e.bottom - e.top
    }));
    var f = d ? {
      top: 0,
      left: 0
    } : b.offset(),
        g = {
      scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
    },
        h = d ? {
      width: a(window).width(),
      height: a(window).height()
    } : null;
    return a.extend({}, e, g, h, f);
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    };
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
        g = this.getPosition(this.$viewport);

    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
          i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
    } else {
      var j = b.left - f,
          k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
    }

    return e;
  }, c.prototype.getTitle = function () {
    var a,
        b = this.$element,
        c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
  }, c.prototype.getUID = function (a) {
    do {
      a += ~~(1e6 * Math.random());
    } while (document.getElementById(a));

    return a;
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip;
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  }, c.prototype.enable = function () {
    this.enabled = !0;
  }, c.prototype.disable = function () {
    this.enabled = !1;
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  }, c.prototype.toggle = function (b) {
    var c = this;
    b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
  }, c.prototype.destroy = function () {
    var a = this;
    clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null;
    });
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this;
  };
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == _typeof(b) && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }

  var c = function c(a, b) {
    this.init("popover", a, b);
  };

  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle(),
        c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  }, c.prototype.getContent = function () {
    var a = this.$element,
        b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this;
  };
}(jQuery), +function (a) {
  "use strict";

  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
  }

  function c(c) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == _typeof(c) && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
    });
  }

  b.VERSION = "3.3.6", b.DEFAULTS = {
    offset: 10
  }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  }, b.prototype.refresh = function () {
    var b = this,
        c = "offset",
        d = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
          e = b.data("target") || b.attr("href"),
          f = /^#./.test(e) && a(e);
      return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1]);
    });
  }, b.prototype.process = function () {
    var a,
        b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.getScrollHeight(),
        d = this.options.offset + c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;
    if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
    if (g && b < e[0]) return this.activeTarget = null, this.clear();

    for (a = e.length; a--;) {
      g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
    }
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this;
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      c.call(b, b.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tab");
      e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
    });
  }

  var c = function c(b) {
    this.element = a(b);
  };

  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");

    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
          f = a.Event("hide.bs.tab", {
        relatedTarget: b[0]
      }),
          g = a.Event("show.bs.tab", {
        relatedTarget: e[0]
      });

      if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);
        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({
            type: "hidden.bs.tab",
            relatedTarget: b[0]
          }), b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e[0]
          });
        });
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
    }

    var g = d.find("> .active"),
        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
    g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this;
  };

  var e = function e(c) {
    c.preventDefault(), b.call(a(this), "show");
  };

  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == _typeof(b) && b;
      e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
    });
  }

  var c = function c(b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
  };

  c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
    offset: 0,
    target: window
  }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
        f = this.$element.offset(),
        g = this.$target.height();
    if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
    if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
    var h = null == this.affixed,
        i = h ? e : f.top,
        j = h ? g : b;
    return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$target.scrollTop(),
        b = this.$element.offset();
    return this.pinnedOffset = b.top - a;
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1);
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
          d = this.options.offset,
          e = d.top,
          f = d.bottom,
          g = Math.max(a(document).height(), a(document.body).height());
      "object" != _typeof(d) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
      var h = this.getState(g, b, e, f);

      if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");
        var i = "affix" + (h ? "-" + h : ""),
            j = a.Event(i + ".bs.affix");
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
      }

      "bottom" == h && this.$element.offset({
        top: g - b - f
      });
    }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this;
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
          d = c.data();
      d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
    });
  });
}(jQuery);

/***/ }),

/***/ "./assets/js/daterangepicker.min.js":
/*!******************************************!*\
  !*** ./assets/js/daterangepicker.min.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
* @version: 2.1.17
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/
!function (a, b) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! moment */ "./node_modules/moment/moment.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (c, d, e) {
    a.daterangepicker = b(a, e, c, d);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var c, d; }
}(this || {}, function (a, b, c, d) {
  var e = function e(a, b, _e) {
    if (this.parentEl = "body", this.element = d(a), this.startDate = c().startOf("day"), this.endDate = c().endOf("day"), this.minDate = !1, this.maxDate = !1, this.dateLimit = !1, this.autoApply = !1, this.singleDatePicker = !1, this.showDropdowns = !1, this.showWeekNumbers = !1, this.timePicker = !1, this.timePicker24Hour = !1, this.timePickerIncrement = 1, this.timePickerSeconds = !1, this.linkedCalendars = !0, this.autoUpdateInput = !0, this.ranges = {}, this.opens = "right", this.element.hasClass("pull-right") && (this.opens = "left"), this.drops = "down", this.element.hasClass("dropup") && (this.drops = "up"), this.buttonClasses = "btn btn-sm", this.applyClass = "btn-success", this.cancelClass = "btn-default", this.locale = {
      format: "MM/DD/YYYY",
      separator: " - ",
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      weekLabel: "W",
      customRangeLabel: "Custom Range",
      daysOfWeek: c.weekdaysMin(),
      monthNames: c.monthsShort(),
      firstDay: c.localeData().firstDayOfWeek()
    }, this.callback = function () {}, this.isShowing = !1, this.leftCalendar = {}, this.rightCalendar = {}, "object" == _typeof(b) && null !== b || (b = {}), b = d.extend(this.element.data(), b), "string" != typeof b.template && (b.template = '<div class="daterangepicker dropdown-menu"><div class="calendar left"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_start" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="calendar right"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_end" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="ranges"><div class="range_inputs"><button class="applyBtn" disabled="disabled" type="button"></button> <button class="cancelBtn" type="button"></button></div></div></div>'), this.parentEl = d(b.parentEl && d(b.parentEl).length ? b.parentEl : this.parentEl), this.container = d(b.template).appendTo(this.parentEl), "object" == _typeof(b.locale) && ("string" == typeof b.locale.format && (this.locale.format = b.locale.format), "string" == typeof b.locale.separator && (this.locale.separator = b.locale.separator), "object" == _typeof(b.locale.daysOfWeek) && (this.locale.daysOfWeek = b.locale.daysOfWeek.slice()), "object" == _typeof(b.locale.monthNames) && (this.locale.monthNames = b.locale.monthNames.slice()), "number" == typeof b.locale.firstDay && (this.locale.firstDay = b.locale.firstDay), "string" == typeof b.locale.applyLabel && (this.locale.applyLabel = b.locale.applyLabel), "string" == typeof b.locale.cancelLabel && (this.locale.cancelLabel = b.locale.cancelLabel), "string" == typeof b.locale.weekLabel && (this.locale.weekLabel = b.locale.weekLabel), "string" == typeof b.locale.customRangeLabel && (this.locale.customRangeLabel = b.locale.customRangeLabel)), "string" == typeof b.startDate && (this.startDate = c(b.startDate, this.locale.format)), "string" == typeof b.endDate && (this.endDate = c(b.endDate, this.locale.format)), "string" == typeof b.minDate && (this.minDate = c(b.minDate, this.locale.format)), "string" == typeof b.maxDate && (this.maxDate = c(b.maxDate, this.locale.format)), "object" == _typeof(b.startDate) && (this.startDate = c(b.startDate)), "object" == _typeof(b.endDate) && (this.endDate = c(b.endDate)), "object" == _typeof(b.minDate) && (this.minDate = c(b.minDate)), "object" == _typeof(b.maxDate) && (this.maxDate = c(b.maxDate)), this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone()), this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone()), "string" == typeof b.applyClass && (this.applyClass = b.applyClass), "string" == typeof b.cancelClass && (this.cancelClass = b.cancelClass), "object" == _typeof(b.dateLimit) && (this.dateLimit = b.dateLimit), "string" == typeof b.opens && (this.opens = b.opens), "string" == typeof b.drops && (this.drops = b.drops), "boolean" == typeof b.showWeekNumbers && (this.showWeekNumbers = b.showWeekNumbers), "string" == typeof b.buttonClasses && (this.buttonClasses = b.buttonClasses), "object" == _typeof(b.buttonClasses) && (this.buttonClasses = b.buttonClasses.join(" ")), "boolean" == typeof b.showDropdowns && (this.showDropdowns = b.showDropdowns), "boolean" == typeof b.singleDatePicker && (this.singleDatePicker = b.singleDatePicker, this.singleDatePicker && (this.endDate = this.startDate.clone())), "boolean" == typeof b.timePicker && (this.timePicker = b.timePicker), "boolean" == typeof b.timePickerSeconds && (this.timePickerSeconds = b.timePickerSeconds), "number" == typeof b.timePickerIncrement && (this.timePickerIncrement = b.timePickerIncrement), "boolean" == typeof b.timePicker24Hour && (this.timePicker24Hour = b.timePicker24Hour), "boolean" == typeof b.autoApply && (this.autoApply = b.autoApply), "boolean" == typeof b.autoUpdateInput && (this.autoUpdateInput = b.autoUpdateInput), "boolean" == typeof b.linkedCalendars && (this.linkedCalendars = b.linkedCalendars), "function" == typeof b.isInvalidDate && (this.isInvalidDate = b.isInvalidDate), 0 != this.locale.firstDay) for (var f = this.locale.firstDay; f > 0;) {
      this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), f--;
    }
    var g, h, i;

    if ("undefined" == typeof b.startDate && "undefined" == typeof b.endDate && d(this.element).is("input[type=text]")) {
      var j = d(this.element).val(),
          k = j.split(this.locale.separator);
      g = h = null, 2 == k.length ? (g = c(k[0], this.locale.format), h = c(k[1], this.locale.format)) : this.singleDatePicker && "" !== j && (g = c(j, this.locale.format), h = c(j, this.locale.format)), null !== g && null !== h && (this.setStartDate(g), this.setEndDate(h));
    }

    if ("object" == _typeof(b.ranges)) {
      for (i in b.ranges) {
        g = "string" == typeof b.ranges[i][0] ? c(b.ranges[i][0], this.locale.format) : c(b.ranges[i][0]), h = "string" == typeof b.ranges[i][1] ? c(b.ranges[i][1], this.locale.format) : c(b.ranges[i][1]), this.minDate && g.isBefore(this.minDate) && (g = this.minDate.clone());
        var l = this.maxDate;

        if (this.dateLimit && g.clone().add(this.dateLimit).isAfter(l) && (l = g.clone().add(this.dateLimit)), l && h.isAfter(l) && (h = l.clone()), !(this.minDate && h.isBefore(this.minDate) || l && g.isAfter(l))) {
          var m = document.createElement("textarea");
          m.innerHTML = i;
          var n = m.value;
          this.ranges[n] = [g, h];
        }
      }

      var o = "<ul>";

      for (i in this.ranges) {
        o += "<li>" + i + "</li>";
      }

      o += "<li>" + this.locale.customRangeLabel + "</li>", o += "</ul>", this.container.find(".ranges").prepend(o);
    }

    if ("function" == typeof _e && (this.callback = _e), this.timePicker || (this.startDate = this.startDate.startOf("day"), this.endDate = this.endDate.endOf("day"), this.container.find(".calendar-time").hide()), this.timePicker && this.autoApply && (this.autoApply = !1), this.autoApply && "object" != _typeof(b.ranges) ? this.container.find(".ranges").hide() : this.autoApply && this.container.find(".applyBtn, .cancelBtn").addClass("hide"), this.singleDatePicker && (this.container.addClass("single"), this.container.find(".calendar.left").addClass("single"), this.container.find(".calendar.left").show(), this.container.find(".calendar.right").hide(), this.container.find(".daterangepicker_input input, .daterangepicker_input i").hide(), this.timePicker || this.container.find(".ranges").hide()), "undefined" != typeof b.ranges || this.singleDatePicker || this.container.addClass("show-calendar"), this.container.addClass("opens" + this.opens), "undefined" != typeof b.ranges && "right" == this.opens) {
      var p = this.container.find(".ranges"),
          q = p.clone();
      p.remove(), this.container.find(".calendar.left").parent().prepend(q);
    }

    this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses), this.applyClass.length && this.container.find(".applyBtn").addClass(this.applyClass), this.cancelClass.length && this.container.find(".cancelBtn").addClass(this.cancelClass), this.container.find(".applyBtn").html(this.locale.applyLabel), this.container.find(".cancelBtn").html(this.locale.cancelLabel), this.container.find(".calendar").on("click.daterangepicker", ".prev", d.proxy(this.clickPrev, this)).on("click.daterangepicker", ".next", d.proxy(this.clickNext, this)).on("click.daterangepicker", "td.available", d.proxy(this.clickDate, this)).on("mouseenter.daterangepicker", "td.available", d.proxy(this.hoverDate, this)).on("mouseleave.daterangepicker", "td.available", d.proxy(this.updateFormInputs, this)).on("change.daterangepicker", "select.yearselect", d.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.monthselect", d.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", d.proxy(this.timeChanged, this)).on("click.daterangepicker", ".daterangepicker_input input", d.proxy(this.showCalendars, this)).on("change.daterangepicker", ".daterangepicker_input input", d.proxy(this.formInputsChanged, this)), this.container.find(".ranges").on("click.daterangepicker", "button.applyBtn", d.proxy(this.clickApply, this)).on("click.daterangepicker", "button.cancelBtn", d.proxy(this.clickCancel, this)).on("click.daterangepicker", "li", d.proxy(this.clickRange, this)).on("mouseenter.daterangepicker", "li", d.proxy(this.hoverRange, this)).on("mouseleave.daterangepicker", "li", d.proxy(this.updateFormInputs, this)), this.element.is("input") ? this.element.on({
      "click.daterangepicker": d.proxy(this.show, this),
      "focus.daterangepicker": d.proxy(this.show, this),
      "keyup.daterangepicker": d.proxy(this.elementChanged, this),
      "keydown.daterangepicker": d.proxy(this.keydown, this)
    }) : this.element.on("click.daterangepicker", d.proxy(this.toggle, this)), this.element.is("input") && !this.singleDatePicker && this.autoUpdateInput ? (this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)), this.element.trigger("change")) : this.element.is("input") && this.autoUpdateInput && (this.element.val(this.startDate.format(this.locale.format)), this.element.trigger("change"));
  };

  return e.prototype = {
    constructor: e,
    setStartDate: function setStartDate(a) {
      "string" == typeof a && (this.startDate = c(a, this.locale.format)), "object" == _typeof(a) && (this.startDate = c(a)), this.timePicker || (this.startDate = this.startDate.startOf("day")), this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement), this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate), this.maxDate && this.startDate.isAfter(this.maxDate) && (this.startDate = this.maxDate), this.isShowing || this.updateElement(), this.updateMonthsInView();
    },
    setEndDate: function setEndDate(a) {
      "string" == typeof a && (this.endDate = c(a, this.locale.format)), "object" == _typeof(a) && (this.endDate = c(a)), this.timePicker || (this.endDate = this.endDate.endOf("day")), this.timePicker && this.timePickerIncrement && this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement), this.endDate.isBefore(this.startDate) && (this.endDate = this.startDate.clone()), this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate), this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate) && (this.endDate = this.startDate.clone().add(this.dateLimit)), this.previousRightTime = this.endDate.clone(), this.isShowing || this.updateElement(), this.updateMonthsInView();
    },
    isInvalidDate: function isInvalidDate() {
      return !1;
    },
    updateView: function updateView() {
      this.timePicker && (this.renderTimePicker("left"), this.renderTimePicker("right"), this.endDate ? this.container.find(".right .calendar-time select").removeAttr("disabled").removeClass("disabled") : this.container.find(".right .calendar-time select").attr("disabled", "disabled").addClass("disabled")), this.endDate ? (this.container.find('input[name="daterangepicker_end"]').removeClass("active"), this.container.find('input[name="daterangepicker_start"]').addClass("active")) : (this.container.find('input[name="daterangepicker_end"]').addClass("active"), this.container.find('input[name="daterangepicker_start"]').removeClass("active")), this.updateMonthsInView(), this.updateCalendars(), this.updateFormInputs();
    },
    updateMonthsInView: function updateMonthsInView() {
      if (this.endDate) {
        if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.startDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM"))) return;
        this.leftCalendar.month = this.startDate.clone().date(2), this.linkedCalendars || this.endDate.month() == this.startDate.month() && this.endDate.year() == this.startDate.year() ? this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month") : this.rightCalendar.month = this.endDate.clone().date(2);
      } else this.leftCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && (this.leftCalendar.month = this.startDate.clone().date(2), this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month"));
    },
    updateCalendars: function updateCalendars() {
      if (this.timePicker) {
        var a, b, c;

        if (this.endDate) {
          if (a = parseInt(this.container.find(".left .hourselect").val(), 10), b = parseInt(this.container.find(".left .minuteselect").val(), 10), c = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0, !this.timePicker24Hour) {
            var d = this.container.find(".left .ampmselect").val();
            "PM" === d && 12 > a && (a += 12), "AM" === d && 12 === a && (a = 0);
          }
        } else if (a = parseInt(this.container.find(".right .hourselect").val(), 10), b = parseInt(this.container.find(".right .minuteselect").val(), 10), c = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0, !this.timePicker24Hour) {
          var d = this.container.find(".right .ampmselect").val();
          "PM" === d && 12 > a && (a += 12), "AM" === d && 12 === a && (a = 0);
        }

        this.leftCalendar.month.hour(a).minute(b).second(c), this.rightCalendar.month.hour(a).minute(b).second(c);
      }

      if (this.renderCalendar("left"), this.renderCalendar("right"), this.container.find(".ranges li").removeClass("active"), null != this.endDate) {
        var e = !0,
            f = 0;

        for (var g in this.ranges) {
          if (this.timePicker) {
            if (this.startDate.isSame(this.ranges[g][0]) && this.endDate.isSame(this.ranges[g][1])) {
              e = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + f + ")").addClass("active").html();
              break;
            }
          } else if (this.startDate.format("YYYY-MM-DD") == this.ranges[g][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[g][1].format("YYYY-MM-DD")) {
            e = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + f + ")").addClass("active").html();
            break;
          }

          f++;
        }

        e && (this.chosenLabel = this.container.find(".ranges li:last").addClass("active").html(), this.showCalendars());
      }
    },
    renderCalendar: function renderCalendar(a) {
      var b = "left" == a ? this.leftCalendar : this.rightCalendar,
          e = b.month.month(),
          f = b.month.year(),
          g = b.month.hour(),
          h = b.month.minute(),
          i = b.month.second(),
          j = c([f, e]).daysInMonth(),
          k = c([f, e, 1]),
          l = c([f, e, j]),
          m = c(k).subtract(1, "month").month(),
          n = c(k).subtract(1, "month").year(),
          o = c([n, m]).daysInMonth(),
          p = k.day(),
          b = [];
      b.firstDay = k, b.lastDay = l;

      for (var q = 0; 6 > q; q++) {
        b[q] = [];
      }

      var r = o - p + this.locale.firstDay + 1;
      r > o && (r -= 7), p == this.locale.firstDay && (r = o - 6);

      for (var s, t, u = c([n, m, r, 12, h, i]), q = 0, s = 0, t = 0; 42 > q; q++, s++, u = c(u).add(24, "hour")) {
        q > 0 && s % 7 === 0 && (s = 0, t++), b[t][s] = u.clone().hour(g).minute(h).second(i), u.hour(12), this.minDate && b[t][s].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") && b[t][s].isBefore(this.minDate) && "left" == a && (b[t][s] = this.minDate.clone()), this.maxDate && b[t][s].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") && b[t][s].isAfter(this.maxDate) && "right" == a && (b[t][s] = this.maxDate.clone());
      }

      "left" == a ? this.leftCalendar.calendar = b : this.rightCalendar.calendar = b;
      var v = "left" == a ? this.minDate : this.startDate,
          w = this.maxDate,
          x = ("left" == a ? this.startDate : this.endDate, '<table class="table-condensed">');
      x += "<thead>", x += "<tr>", this.showWeekNumbers && (x += "<th></th>"), x += v && !v.isBefore(b.firstDay) || this.linkedCalendars && "left" != a ? "<th></th>" : '<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';
      var y = this.locale.monthNames[b[1][1].month()] + b[1][1].format(" YYYY");

      if (this.showDropdowns) {
        for (var z = b[1][1].month(), A = b[1][1].year(), B = w && w.year() || A + 5, C = v && v.year() || A - 50, D = A == C, E = A == B, F = '<select class="monthselect">', G = 0; 12 > G; G++) {
          F += (!D || G >= v.month()) && (!E || G <= w.month()) ? "<option value='" + G + "'" + (G === z ? " selected='selected'" : "") + ">" + this.locale.monthNames[G] + "</option>" : "<option value='" + G + "'" + (G === z ? " selected='selected'" : "") + " disabled='disabled'>" + this.locale.monthNames[G] + "</option>";
        }

        F += "</select>";

        for (var H = '<select class="yearselect">', I = C; B >= I; I++) {
          H += '<option value="' + I + '"' + (I === A ? ' selected="selected"' : "") + ">" + I + "</option>";
        }

        H += "</select>", y = F + H;
      }

      if (x += '<th colspan="5" class="month">' + y + "</th>", x += w && !w.isAfter(b.lastDay) || this.linkedCalendars && "right" != a && !this.singleDatePicker ? "<th></th>" : '<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>', x += "</tr>", x += "<tr>", this.showWeekNumbers && (x += '<th class="week">' + this.locale.weekLabel + "</th>"), d.each(this.locale.daysOfWeek, function (a, b) {
        x += "<th>" + b + "</th>";
      }), x += "</tr>", x += "</thead>", x += "<tbody>", null == this.endDate && this.dateLimit) {
        var J = this.startDate.clone().add(this.dateLimit).endOf("day");
        w && !J.isBefore(w) || (w = J);
      }

      for (var t = 0; 6 > t; t++) {
        x += "<tr>", this.showWeekNumbers && (x += '<td class="week">' + b[t][0].week() + "</td>");

        for (var s = 0; 7 > s; s++) {
          var K = [];
          b[t][s].isSame(new Date(), "day") && K.push("today"), b[t][s].isoWeekday() > 5 && K.push("weekend"), b[t][s].month() != b[1][1].month() && K.push("off"), this.minDate && b[t][s].isBefore(this.minDate, "day") && K.push("off", "disabled"), w && b[t][s].isAfter(w, "day") && K.push("off", "disabled"), this.isInvalidDate(b[t][s]) && K.push("off", "disabled"), b[t][s].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && K.push("active", "start-date"), null != this.endDate && b[t][s].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && K.push("active", "end-date"), null != this.endDate && b[t][s] > this.startDate && b[t][s] < this.endDate && K.push("in-range");

          for (var L = "", M = !1, q = 0; q < K.length; q++) {
            L += K[q] + " ", "disabled" == K[q] && (M = !0);
          }

          M || (L += "available"), x += '<td class="' + L.replace(/^\s+|\s+$/g, "") + '" data-title="r' + t + "c" + s + '">' + b[t][s].date() + "</td>";
        }

        x += "</tr>";
      }

      x += "</tbody>", x += "</table>", this.container.find(".calendar." + a + " .calendar-table").html(x);
    },
    renderTimePicker: function renderTimePicker(a) {
      var b,
          c,
          d,
          e = this.maxDate;
      if (!this.dateLimit || this.maxDate && !this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate) || (e = this.startDate.clone().add(this.dateLimit)), "left" == a) c = this.startDate.clone(), d = this.minDate;else if ("right" == a) {
        c = this.endDate ? this.endDate.clone() : this.previousRightTime.clone(), d = this.startDate;
        var f = this.container.find(".calendar.right .calendar-time div");

        if ("" != f.html()) {
          if (c.hour(f.find(".hourselect option:selected").val() || c.hour()), c.minute(f.find(".minuteselect option:selected").val() || c.minute()), c.second(f.find(".secondselect option:selected").val() || c.second()), !this.timePicker24Hour) {
            var g = f.find(".ampmselect option:selected").val();
            "PM" === g && c.hour() < 12 && c.hour(c.hour() + 12), "AM" === g && 12 === c.hour() && c.hour(0);
          }

          c.isBefore(this.startDate) && (c = this.startDate.clone()), c.isAfter(e) && (c = e.clone());
        }
      }
      b = '<select class="hourselect">';

      for (var h = this.timePicker24Hour ? 0 : 1, i = this.timePicker24Hour ? 23 : 12, j = h; i >= j; j++) {
        var k = j;
        this.timePicker24Hour || (k = c.hour() >= 12 ? 12 == j ? 12 : j + 12 : 12 == j ? 0 : j);
        var l = c.clone().hour(k),
            m = !1;
        d && l.minute(59).isBefore(d) && (m = !0), e && l.minute(0).isAfter(e) && (m = !0), b += k != c.hour() || m ? m ? '<option value="' + j + '" disabled="disabled" class="disabled">' + j + "</option>" : '<option value="' + j + '">' + j + "</option>" : '<option value="' + j + '" selected="selected">' + j + "</option>";
      }

      b += "</select> ", b += ': <select class="minuteselect">';

      for (var j = 0; 60 > j; j += this.timePickerIncrement) {
        var n = 10 > j ? "0" + j : j,
            l = c.clone().minute(j),
            m = !1;
        d && l.second(59).isBefore(d) && (m = !0), e && l.second(0).isAfter(e) && (m = !0), b += c.minute() != j || m ? m ? '<option value="' + j + '" disabled="disabled" class="disabled">' + n + "</option>" : '<option value="' + j + '">' + n + "</option>" : '<option value="' + j + '" selected="selected">' + n + "</option>";
      }

      if (b += "</select> ", this.timePickerSeconds) {
        b += ': <select class="secondselect">';

        for (var j = 0; 60 > j; j++) {
          var n = 10 > j ? "0" + j : j,
              l = c.clone().second(j),
              m = !1;
          d && l.isBefore(d) && (m = !0), e && l.isAfter(e) && (m = !0), b += c.second() != j || m ? m ? '<option value="' + j + '" disabled="disabled" class="disabled">' + n + "</option>" : '<option value="' + j + '">' + n + "</option>" : '<option value="' + j + '" selected="selected">' + n + "</option>";
        }

        b += "</select> ";
      }

      if (!this.timePicker24Hour) {
        b += '<select class="ampmselect">';
        var o = "",
            p = "";
        d && c.clone().hour(12).minute(0).second(0).isBefore(d) && (o = ' disabled="disabled" class="disabled"'), e && c.clone().hour(0).minute(0).second(0).isAfter(e) && (p = ' disabled="disabled" class="disabled"'), b += c.hour() >= 12 ? '<option value="AM"' + o + '>AM</option><option value="PM" selected="selected"' + p + ">PM</option>" : '<option value="AM" selected="selected"' + o + '>AM</option><option value="PM"' + p + ">PM</option>", b += "</select>";
      }

      this.container.find(".calendar." + a + " .calendar-time div").html(b);
    },
    updateFormInputs: function updateFormInputs() {
      this.container.find("input[name=daterangepicker_start]").is(":focus") || this.container.find("input[name=daterangepicker_end]").is(":focus") || (this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.locale.format)), this.endDate && this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.locale.format)), this.singleDatePicker || this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)) ? this.container.find("button.applyBtn").removeAttr("disabled") : this.container.find("button.applyBtn").attr("disabled", "disabled"));
    },
    move: function move() {
      var a,
          b = {
        top: 0,
        left: 0
      },
          c = d(window).width();
      this.parentEl.is("body") || (b = {
        top: this.parentEl.offset().top - this.parentEl.scrollTop(),
        left: this.parentEl.offset().left - this.parentEl.scrollLeft()
      }, c = this.parentEl[0].clientWidth + this.parentEl.offset().left), a = "up" == this.drops ? this.element.offset().top - this.container.outerHeight() - b.top : this.element.offset().top + this.element.outerHeight() - b.top, this.container["up" == this.drops ? "addClass" : "removeClass"]("dropup"), "left" == this.opens ? (this.container.css({
        top: a,
        right: c - this.element.offset().left - this.element.outerWidth(),
        left: "auto"
      }), this.container.offset().left < 0 && this.container.css({
        right: "auto",
        left: 9
      })) : "center" == this.opens ? (this.container.css({
        top: a,
        left: this.element.offset().left - b.left + this.element.outerWidth() / 2 - this.container.outerWidth() / 2,
        right: "auto"
      }), this.container.offset().left < 0 && this.container.css({
        right: "auto",
        left: 9
      })) : (this.container.css({
        top: a,
        left: this.element.offset().left - b.left,
        right: "auto"
      }), this.container.offset().left + this.container.outerWidth() > d(window).width() && this.container.css({
        left: "auto",
        right: 0
      }));
    },
    show: function show(a) {
      this.isShowing || (this._outsideClickProxy = d.proxy(function (a) {
        this.outsideClick(a);
      }, this), d(document).on("mousedown.daterangepicker", this._outsideClickProxy).on("touchend.daterangepicker", this._outsideClickProxy).on("click.daterangepicker", "[data-toggle=dropdown]", this._outsideClickProxy).on("focusin.daterangepicker", this._outsideClickProxy), d(window).on("resize.daterangepicker", d.proxy(function (a) {
        this.move(a);
      }, this)), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.previousRightTime = this.endDate.clone(), this.updateView(), this.container.show(), this.move(), this.element.trigger("show.daterangepicker", this), this.isShowing = !0);
    },
    hide: function hide(a) {
      this.isShowing && (this.endDate || (this.startDate = this.oldStartDate.clone(), this.endDate = this.oldEndDate.clone()), this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.callback(this.startDate, this.endDate, this.chosenLabel), this.updateElement(), d(document).off(".daterangepicker"), d(window).off(".daterangepicker"), this.container.hide(), this.element.trigger("hide.daterangepicker", this), this.isShowing = !1);
    },
    toggle: function toggle(a) {
      this.isShowing ? this.hide() : this.show();
    },
    outsideClick: function outsideClick(a) {
      var b = d(a.target);
      "focusin" == a.type || b.closest(this.element).length || b.closest(this.container).length || b.closest(".calendar-table").length || this.hide();
    },
    showCalendars: function showCalendars() {
      this.container.addClass("show-calendar"), this.move(), this.element.trigger("showCalendar.daterangepicker", this);
    },
    hideCalendars: function hideCalendars() {
      this.container.removeClass("show-calendar"), this.element.trigger("hideCalendar.daterangepicker", this);
    },
    hoverRange: function hoverRange(a) {
      if (!this.container.find("input[name=daterangepicker_start]").is(":focus") && !this.container.find("input[name=daterangepicker_end]").is(":focus")) {
        var b = a.target.innerHTML;
        if (b == this.locale.customRangeLabel) this.updateView();else {
          var c = this.ranges[b];
          this.container.find("input[name=daterangepicker_start]").val(c[0].format(this.locale.format)), this.container.find("input[name=daterangepicker_end]").val(c[1].format(this.locale.format));
        }
      }
    },
    clickRange: function clickRange(a) {
      var b = a.target.innerHTML;
      if (this.chosenLabel = b, b == this.locale.customRangeLabel) this.showCalendars();else {
        var c = this.ranges[b];
        this.startDate = c[0], this.endDate = c[1], this.timePicker || (this.startDate.startOf("day"), this.endDate.endOf("day")), this.hideCalendars(), this.clickApply();
      }
    },
    clickPrev: function clickPrev(a) {
      var b = d(a.target).parents(".calendar");
      b.hasClass("left") ? (this.leftCalendar.month.subtract(1, "month"), this.linkedCalendars && this.rightCalendar.month.subtract(1, "month")) : this.rightCalendar.month.subtract(1, "month"), this.updateCalendars();
    },
    clickNext: function clickNext(a) {
      var b = d(a.target).parents(".calendar");
      b.hasClass("left") ? this.leftCalendar.month.add(1, "month") : (this.rightCalendar.month.add(1, "month"), this.linkedCalendars && this.leftCalendar.month.add(1, "month")), this.updateCalendars();
    },
    hoverDate: function hoverDate(a) {
      if (!this.container.find("input[name=daterangepicker_start]").is(":focus") && !this.container.find("input[name=daterangepicker_end]").is(":focus") && d(a.target).hasClass("available")) {
        var b = d(a.target).attr("data-title"),
            c = b.substr(1, 1),
            e = b.substr(3, 1),
            f = d(a.target).parents(".calendar"),
            g = f.hasClass("left") ? this.leftCalendar.calendar[c][e] : this.rightCalendar.calendar[c][e];
        this.endDate ? this.container.find("input[name=daterangepicker_start]").val(g.format(this.locale.format)) : this.container.find("input[name=daterangepicker_end]").val(g.format(this.locale.format));
        var h = this.leftCalendar,
            i = this.rightCalendar,
            j = this.startDate;
        this.endDate || this.container.find(".calendar td").each(function (a, b) {
          if (!d(b).hasClass("week")) {
            var c = d(b).attr("data-title"),
                e = c.substr(1, 1),
                f = c.substr(3, 1),
                k = d(b).parents(".calendar"),
                l = k.hasClass("left") ? h.calendar[e][f] : i.calendar[e][f];
            l.isAfter(j) && l.isBefore(g) ? d(b).addClass("in-range") : d(b).removeClass("in-range");
          }
        });
      }
    },
    clickDate: function clickDate(a) {
      if (d(a.target).hasClass("available")) {
        var b = d(a.target).attr("data-title"),
            c = b.substr(1, 1),
            e = b.substr(3, 1),
            f = d(a.target).parents(".calendar"),
            g = f.hasClass("left") ? this.leftCalendar.calendar[c][e] : this.rightCalendar.calendar[c][e];

        if (this.endDate || g.isBefore(this.startDate, "day")) {
          if (this.timePicker) {
            var h = parseInt(this.container.find(".left .hourselect").val(), 10);

            if (!this.timePicker24Hour) {
              var i = f.find(".ampmselect").val();
              "PM" === i && 12 > h && (h += 12), "AM" === i && 12 === h && (h = 0);
            }

            var j = parseInt(this.container.find(".left .minuteselect").val(), 10),
                k = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0;
            g = g.clone().hour(h).minute(j).second(k);
          }

          this.endDate = null, this.setStartDate(g.clone());
        } else if (!this.endDate && g.isBefore(this.startDate)) this.setEndDate(this.startDate.clone());else {
          if (this.timePicker) {
            var h = parseInt(this.container.find(".right .hourselect").val(), 10);

            if (!this.timePicker24Hour) {
              var i = this.container.find(".right .ampmselect").val();
              "PM" === i && 12 > h && (h += 12), "AM" === i && 12 === h && (h = 0);
            }

            var j = parseInt(this.container.find(".right .minuteselect").val(), 10),
                k = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0;
            g = g.clone().hour(h).minute(j).second(k);
          }

          this.setEndDate(g.clone()), this.autoApply && this.clickApply();
        }

        this.singleDatePicker && (this.setEndDate(this.startDate), this.timePicker || this.clickApply()), this.updateView();
      }
    },
    clickApply: function clickApply(a) {
      this.hide(), this.element.trigger("apply.daterangepicker", this);
    },
    clickCancel: function clickCancel(a) {
      this.startDate = this.oldStartDate, this.endDate = this.oldEndDate, this.hide(), this.element.trigger("cancel.daterangepicker", this);
    },
    monthOrYearChanged: function monthOrYearChanged(a) {
      var b = d(a.target).closest(".calendar").hasClass("left"),
          c = b ? "left" : "right",
          e = this.container.find(".calendar." + c),
          f = parseInt(e.find(".monthselect").val(), 10),
          g = e.find(".yearselect").val();
      b || (g < this.startDate.year() || g == this.startDate.year() && f < this.startDate.month()) && (f = this.startDate.month(), g = this.startDate.year()), this.minDate && (g < this.minDate.year() || g == this.minDate.year() && f < this.minDate.month()) && (f = this.minDate.month(), g = this.minDate.year()), this.maxDate && (g > this.maxDate.year() || g == this.maxDate.year() && f > this.maxDate.month()) && (f = this.maxDate.month(), g = this.maxDate.year()), b ? (this.leftCalendar.month.month(f).year(g), this.linkedCalendars && (this.rightCalendar.month = this.leftCalendar.month.clone().add(1, "month"))) : (this.rightCalendar.month.month(f).year(g), this.linkedCalendars && (this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, "month"))), this.updateCalendars();
    },
    timeChanged: function timeChanged(a) {
      var b = d(a.target).closest(".calendar"),
          c = b.hasClass("left"),
          e = parseInt(b.find(".hourselect").val(), 10),
          f = parseInt(b.find(".minuteselect").val(), 10),
          g = this.timePickerSeconds ? parseInt(b.find(".secondselect").val(), 10) : 0;

      if (!this.timePicker24Hour) {
        var h = b.find(".ampmselect").val();
        "PM" === h && 12 > e && (e += 12), "AM" === h && 12 === e && (e = 0);
      }

      if (c) {
        var i = this.startDate.clone();
        i.hour(e), i.minute(f), i.second(g), this.setStartDate(i), this.singleDatePicker ? this.endDate = this.startDate.clone() : this.endDate && this.endDate.format("YYYY-MM-DD") == i.format("YYYY-MM-DD") && this.endDate.isBefore(i) && this.setEndDate(i.clone());
      } else if (this.endDate) {
        var j = this.endDate.clone();
        j.hour(e), j.minute(f), j.second(g), this.setEndDate(j);
      }

      this.updateCalendars(), this.updateFormInputs(), this.renderTimePicker("left"), this.renderTimePicker("right");
    },
    formInputsChanged: function formInputsChanged(a) {
      var b = d(a.target).closest(".calendar").hasClass("right"),
          e = c(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format),
          f = c(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);
      e.isValid() && f.isValid() && (b && f.isBefore(e) && (e = f.clone()), this.setStartDate(e), this.setEndDate(f), b ? this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format)) : this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format))), this.updateCalendars(), this.timePicker && (this.renderTimePicker("left"), this.renderTimePicker("right"));
    },
    elementChanged: function elementChanged() {
      if (this.element.is("input") && this.element.val().length && !(this.element.val().length < this.locale.format.length)) {
        var a = this.element.val().split(this.locale.separator),
            b = null,
            d = null;
        2 === a.length && (b = c(a[0], this.locale.format), d = c(a[1], this.locale.format)), (this.singleDatePicker || null === b || null === d) && (b = c(this.element.val(), this.locale.format), d = b), b.isValid() && d.isValid() && (this.setStartDate(b), this.setEndDate(d), this.updateView());
      }
    },
    keydown: function keydown(a) {
      9 !== a.keyCode && 13 !== a.keyCode || this.hide();
    },
    updateElement: function updateElement() {
      this.element.is("input") && !this.singleDatePicker && this.autoUpdateInput ? (this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)), this.element.trigger("change")) : this.element.is("input") && this.autoUpdateInput && (this.element.val(this.startDate.format(this.locale.format)), this.element.trigger("change"));
    },
    remove: function remove() {
      this.container.remove(), this.element.off(".daterangepicker"), this.element.removeData();
    }
  }, d.fn.daterangepicker = function (a, b) {
    return this.each(function () {
      var c = d(this);
      c.data("daterangepicker") && c.data("daterangepicker").remove(), c.data("daterangepicker", new e(c, a, b));
    }), this;
  }, e;
});

/***/ }),

/***/ "./assets/js/fullcalendar.min.js":
/*!***************************************!*\
  !*** ./assets/js/fullcalendar.min.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.date.to-iso-string.js */ "./node_modules/core-js/modules/es.date.to-iso-string.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * FullCalendar v2.6.1
 * Docs & License: http://fullcalendar.io/
 * (c) 2015 Adam Shaw
 */
!function (a) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! moment */ "./node_modules/moment/moment.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (a, b) {
  function c(a) {
    return Q(a, Ra);
  }

  function d(b) {
    var c,
        d = {
      views: b.views || {}
    };
    return a.each(b, function (b, e) {
      "views" != b && (a.isPlainObject(e) && !/(time|duration|interval)$/i.test(b) && -1 == a.inArray(b, Ra) ? (c = null, a.each(e, function (a, e) {
        /^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(a) ? (d.views[a] || (d.views[a] = {}), d.views[a][b] = e) : (c || (c = {}), c[a] = e);
      }), c && (d[b] = c)) : d[b] = e);
    }), d;
  }

  function e(a, b) {
    b.left && a.css({
      "border-left-width": 1,
      "margin-left": b.left - 1
    }), b.right && a.css({
      "border-right-width": 1,
      "margin-right": b.right - 1
    });
  }

  function f(a) {
    a.css({
      "margin-left": "",
      "margin-right": "",
      "border-left-width": "",
      "border-right-width": ""
    });
  }

  function g() {
    a("body").addClass("fc-not-allowed");
  }

  function h() {
    a("body").removeClass("fc-not-allowed");
  }

  function i(b, c, d) {
    var e = Math.floor(c / b.length),
        f = Math.floor(c - e * (b.length - 1)),
        g = [],
        h = [],
        i = [],
        k = 0;
    j(b), b.each(function (c, d) {
      var j = c === b.length - 1 ? f : e,
          l = a(d).outerHeight(!0);
      j > l ? (g.push(d), h.push(l), i.push(a(d).height())) : k += l;
    }), d && (c -= k, e = Math.floor(c / g.length), f = Math.floor(c - e * (g.length - 1))), a(g).each(function (b, c) {
      var d = b === g.length - 1 ? f : e,
          j = h[b],
          k = i[b],
          l = d - (j - k);
      d > j && a(c).height(l);
    });
  }

  function j(a) {
    a.height("");
  }

  function k(b) {
    var c = 0;
    return b.find("> span").each(function (b, d) {
      var e = a(d).outerWidth();
      e > c && (c = e);
    }), c++, b.width(c), c;
  }

  function l(a, b) {
    return a.height(b).addClass("fc-scroller"), a[0].scrollHeight - 1 > a[0].clientHeight ? !0 : (m(a), !1);
  }

  function m(a) {
    a.height("").removeClass("fc-scroller");
  }

  function n(b) {
    var c = b.css("position"),
        d = b.parents().filter(function () {
      var b = a(this);
      return /(auto|scroll)/.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"));
    }).eq(0);
    return "fixed" !== c && d.length ? d : a(b[0].ownerDocument || document);
  }

  function o(a) {
    var b = a.offset();
    return {
      left: b.left,
      right: b.left + a.outerWidth(),
      top: b.top,
      bottom: b.top + a.outerHeight()
    };
  }

  function p(a) {
    var b = a.offset(),
        c = r(a),
        d = b.left + u(a, "border-left-width") + c.left,
        e = b.top + u(a, "border-top-width") + c.top;
    return {
      left: d,
      right: d + a[0].clientWidth,
      top: e,
      bottom: e + a[0].clientHeight
    };
  }

  function q(a) {
    var b = a.offset(),
        c = b.left + u(a, "border-left-width") + u(a, "padding-left"),
        d = b.top + u(a, "border-top-width") + u(a, "padding-top");
    return {
      left: c,
      right: c + a.width(),
      top: d,
      bottom: d + a.height()
    };
  }

  function r(a) {
    var b = a.innerWidth() - a[0].clientWidth,
        c = {
      left: 0,
      right: 0,
      top: 0,
      bottom: a.innerHeight() - a[0].clientHeight
    };
    return s() && "rtl" == a.css("direction") ? c.left = b : c.right = b, c;
  }

  function s() {
    return null === Sa && (Sa = t()), Sa;
  }

  function t() {
    var b = a("<div><div/></div>").css({
      position: "absolute",
      top: -1e3,
      left: 0,
      border: 0,
      padding: 0,
      overflow: "scroll",
      direction: "rtl"
    }).appendTo("body"),
        c = b.children(),
        d = c.offset().left > b.offset().left;
    return b.remove(), d;
  }

  function u(a, b) {
    return parseFloat(a.css(b)) || 0;
  }

  function v(a) {
    return 1 == a.which && !a.ctrlKey;
  }

  function w(a, b) {
    var c = {
      left: Math.max(a.left, b.left),
      right: Math.min(a.right, b.right),
      top: Math.max(a.top, b.top),
      bottom: Math.min(a.bottom, b.bottom)
    };
    return c.left < c.right && c.top < c.bottom ? c : !1;
  }

  function x(a, b) {
    return {
      left: Math.min(Math.max(a.left, b.left), b.right),
      top: Math.min(Math.max(a.top, b.top), b.bottom)
    };
  }

  function y(a) {
    return {
      left: (a.left + a.right) / 2,
      top: (a.top + a.bottom) / 2
    };
  }

  function z(a, b) {
    return {
      left: a.left - b.left,
      top: a.top - b.top
    };
  }

  function A(b) {
    var c,
        d,
        e = [],
        f = [];

    for ("string" == typeof b ? f = b.split(/\s*,\s*/) : "function" == typeof b ? f = [b] : a.isArray(b) && (f = b), c = 0; c < f.length; c++) {
      d = f[c], "string" == typeof d ? e.push("-" == d.charAt(0) ? {
        field: d.substring(1),
        order: -1
      } : {
        field: d,
        order: 1
      }) : "function" == typeof d && e.push({
        func: d
      });
    }

    return e;
  }

  function B(a, b, c) {
    var d, e;

    for (d = 0; d < c.length; d++) {
      if (e = C(a, b, c[d])) return e;
    }

    return 0;
  }

  function C(a, b, c) {
    return c.func ? c.func(a, b) : D(a[c.field], b[c.field]) * (c.order || 1);
  }

  function D(b, c) {
    return b || c ? null == c ? -1 : null == b ? 1 : "string" === a.type(b) || "string" === a.type(c) ? String(b).localeCompare(String(c)) : b - c : 0;
  }

  function E(a, b) {
    var c,
        d,
        e,
        f,
        g = a.start,
        h = a.end,
        i = b.start,
        j = b.end;
    return h > i && j > g ? (g >= i ? (c = g.clone(), e = !0) : (c = i.clone(), e = !1), j >= h ? (d = h.clone(), f = !0) : (d = j.clone(), f = !1), {
      start: c,
      end: d,
      isStart: e,
      isEnd: f
    }) : void 0;
  }

  function F(a, c) {
    return b.duration({
      days: a.clone().stripTime().diff(c.clone().stripTime(), "days"),
      ms: a.time() - c.time()
    });
  }

  function G(a, c) {
    return b.duration({
      days: a.clone().stripTime().diff(c.clone().stripTime(), "days")
    });
  }

  function H(a, c, d) {
    return b.duration(Math.round(a.diff(c, d, !0)), d);
  }

  function I(a, b) {
    var c, d, e;

    for (c = 0; c < Ua.length && (d = Ua[c], e = J(d, a, b), !(e >= 1 && ba(e))); c++) {
      ;
    }

    return d;
  }

  function J(a, c, d) {
    return null != d ? d.diff(c, a, !0) : b.isDuration(c) ? c.as(a) : c.end.diff(c.start, a, !0);
  }

  function K(a, b, c) {
    var d;
    return N(c) ? (b - a) / c : (d = c.asMonths(), Math.abs(d) >= 1 && ba(d) ? b.diff(a, "months", !0) / d : b.diff(a, "days", !0) / c.asDays());
  }

  function L(a, b) {
    var c, d;
    return N(a) || N(b) ? a / b : (c = a.asMonths(), d = b.asMonths(), Math.abs(c) >= 1 && ba(c) && Math.abs(d) >= 1 && ba(d) ? c / d : a.asDays() / b.asDays());
  }

  function M(a, c) {
    var d;
    return N(a) ? b.duration(a * c) : (d = a.asMonths(), Math.abs(d) >= 1 && ba(d) ? b.duration({
      months: d * c
    }) : b.duration({
      days: a.asDays() * c
    }));
  }

  function N(a) {
    return Boolean(a.hours() || a.minutes() || a.seconds() || a.milliseconds());
  }

  function O(a) {
    return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date;
  }

  function P(a) {
    return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(a);
  }

  function Q(a, b) {
    var c,
        d,
        e,
        f,
        g,
        h,
        i = {};
    if (b) for (c = 0; c < b.length; c++) {
      for (d = b[c], e = [], f = a.length - 1; f >= 0; f--) {
        if (g = a[f][d], "object" == _typeof(g)) e.unshift(g);else if (void 0 !== g) {
          i[d] = g;
          break;
        }
      }

      e.length && (i[d] = Q(e));
    }

    for (c = a.length - 1; c >= 0; c--) {
      h = a[c];

      for (d in h) {
        d in i || (i[d] = h[d]);
      }
    }

    return i;
  }

  function R(a) {
    var b = function b() {};

    return b.prototype = a, new b();
  }

  function S(a, b) {
    for (var c in a) {
      U(a, c) && (b[c] = a[c]);
    }
  }

  function T(a, b) {
    var c,
        d,
        e = ["constructor", "toString", "valueOf"];

    for (c = 0; c < e.length; c++) {
      d = e[c], a[d] !== Object.prototype[d] && (b[d] = a[d]);
    }
  }

  function U(a, b) {
    return Ya.call(a, b);
  }

  function V(b) {
    return /undefined|null|boolean|number|string/.test(a.type(b));
  }

  function W(b, c, d) {
    if (a.isFunction(b) && (b = [b]), b) {
      var e, f;

      for (e = 0; e < b.length; e++) {
        f = b[e].apply(c, d) || f;
      }

      return f;
    }
  }

  function X() {
    for (var a = 0; a < arguments.length; a++) {
      if (void 0 !== arguments[a]) return arguments[a];
    }
  }

  function Y(a) {
    return (a + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />");
  }

  function Z(a) {
    return a.replace(/&.*?;/g, "");
  }

  function $(b) {
    var c = [];
    return a.each(b, function (a, b) {
      null != b && c.push(a + ":" + b);
    }), c.join(";");
  }

  function _(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }

  function aa(a, b) {
    return a - b;
  }

  function ba(a) {
    return a % 1 === 0;
  }

  function ca(a, b) {
    var c = a[b];
    return function () {
      return c.apply(a, arguments);
    };
  }

  function da(a, b) {
    var c,
        d,
        e,
        f,
        g = function g() {
      var h = +new Date() - f;
      b > h && h > 0 ? c = setTimeout(g, b - h) : (c = null, a.apply(e, d), c || (e = d = null));
    };

    return function () {
      e = this, d = arguments, f = +new Date(), c || (c = setTimeout(g, b));
    };
  }

  function ea(c, d, e) {
    var f,
        g,
        h,
        i,
        j = c[0],
        k = 1 == c.length && "string" == typeof j;
    return b.isMoment(j) ? (i = b.apply(null, c), ga(j, i)) : O(j) || void 0 === j ? i = b.apply(null, c) : (f = !1, g = !1, k ? Za.test(j) ? (j += "-01", c = [j], f = !0, g = !0) : (h = $a.exec(j)) && (f = !h[5], g = !0) : a.isArray(j) && (g = !0), i = d || f ? b.utc.apply(b, c) : b.apply(null, c), f ? (i._ambigTime = !0, i._ambigZone = !0) : e && (g ? i._ambigZone = !0 : k && (i.utcOffset ? i.utcOffset(j) : i.zone(j)))), i._fullCalendar = !0, i;
  }

  function fa(a, c) {
    var d,
        e,
        f = !1,
        g = !1,
        h = a.length,
        i = [];

    for (d = 0; h > d; d++) {
      e = a[d], b.isMoment(e) || (e = Pa.moment.parseZone(e)), f = f || e._ambigTime, g = g || e._ambigZone, i.push(e);
    }

    for (d = 0; h > d; d++) {
      e = i[d], c || !f || e._ambigTime ? g && !e._ambigZone && (i[d] = e.clone().stripZone()) : i[d] = e.clone().stripTime();
    }

    return i;
  }

  function ga(a, b) {
    a._ambigTime ? b._ambigTime = !0 : b._ambigTime && (b._ambigTime = !1), a._ambigZone ? b._ambigZone = !0 : b._ambigZone && (b._ambigZone = !1);
  }

  function ha(a, b) {
    a.year(b[0] || 0).month(b[1] || 0).date(b[2] || 0).hours(b[3] || 0).minutes(b[4] || 0).seconds(b[5] || 0).milliseconds(b[6] || 0);
  }

  function ia(a, b) {
    return ab.format.call(a, b);
  }

  function ja(a, b) {
    return ka(a, pa(b));
  }

  function ka(a, b) {
    var c,
        d = "";

    for (c = 0; c < b.length; c++) {
      d += la(a, b[c]);
    }

    return d;
  }

  function la(a, b) {
    var c, d;
    return "string" == typeof b ? b : (c = b.token) ? bb[c] ? bb[c](a) : ia(a, c) : b.maybe && (d = ka(a, b.maybe), d.match(/[1-9]/)) ? d : "";
  }

  function ma(a, b, c, d, e) {
    var f;
    return a = Pa.moment.parseZone(a), b = Pa.moment.parseZone(b), f = (a.localeData || a.lang).call(a), c = f.longDateFormat(c) || c, d = d || " - ", na(a, b, pa(c), d, e);
  }

  function na(a, b, c, d, e) {
    var f,
        g,
        h,
        i,
        j = a.clone().stripZone(),
        k = b.clone().stripZone(),
        l = "",
        m = "",
        n = "",
        o = "",
        p = "";

    for (g = 0; g < c.length && (f = oa(a, b, j, k, c[g]), f !== !1); g++) {
      l += f;
    }

    for (h = c.length - 1; h > g && (f = oa(a, b, j, k, c[h]), f !== !1); h--) {
      m = f + m;
    }

    for (i = g; h >= i; i++) {
      n += la(a, c[i]), o += la(b, c[i]);
    }

    return (n || o) && (p = e ? o + d + n : n + d + o), l + p + m;
  }

  function oa(a, b, c, d, e) {
    var f, g;
    return "string" == typeof e ? e : (f = e.token) && (g = cb[f.charAt(0)], g && c.isSame(d, g)) ? ia(a, f) : !1;
  }

  function pa(a) {
    return a in db ? db[a] : db[a] = qa(a);
  }

  function qa(a) {
    for (var b, c = [], d = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; b = d.exec(a);) {
      b[1] ? c.push(b[1]) : b[2] ? c.push({
        maybe: qa(b[2])
      }) : b[3] ? c.push({
        token: b[3]
      }) : b[5] && c.push(b[5]);
    }

    return c;
  }

  function ra() {}

  function sa(a, b) {
    var c;
    return U(b, "constructor") && (c = b.constructor), "function" != typeof c && (c = b.constructor = function () {
      a.apply(this, arguments);
    }), c.prototype = R(a.prototype), S(b, c.prototype), T(b, c.prototype), S(a, c), c;
  }

  function ta(a, b) {
    S(b.prototype || b, a.prototype);
  }

  function ua(a, b) {
    return a || b ? a && b ? a.component === b.component && va(a, b) && va(b, a) : !1 : !0;
  }

  function va(a, b) {
    for (var c in a) {
      if (!/^(component|left|right|top|bottom)$/.test(c) && a[c] !== b[c]) return !1;
    }

    return !0;
  }

  function wa(a) {
    var b = ya(a);
    return "background" === b || "inverse-background" === b;
  }

  function xa(a) {
    return "inverse-background" === ya(a);
  }

  function ya(a) {
    return X((a.source || {}).rendering, a.rendering);
  }

  function za(a) {
    var b,
        c,
        d = {};

    for (b = 0; b < a.length; b++) {
      c = a[b], (d[c._id] || (d[c._id] = [])).push(c);
    }

    return d;
  }

  function Aa(a, b) {
    return a.start - b.start;
  }

  function Ba(c) {
    var d,
        e,
        f,
        g,
        h = Pa.dataAttrPrefix;
    return h && (h += "-"), d = c.data(h + "event") || null, d && (d = "object" == _typeof(d) ? a.extend({}, d) : {}, e = d.start, null == e && (e = d.time), f = d.duration, g = d.stick, delete d.start, delete d.time, delete d.duration, delete d.stick), null == e && (e = c.data(h + "start")), null == e && (e = c.data(h + "time")), null == f && (f = c.data(h + "duration")), null == g && (g = c.data(h + "stick")), e = null != e ? b.duration(e) : null, f = null != f ? b.duration(f) : null, g = Boolean(g), {
      eventProps: d,
      startTime: e,
      duration: f,
      stick: g
    };
  }

  function Ca(a, b) {
    var c, d;

    for (c = 0; c < b.length; c++) {
      if (d = b[c], d.leftCol <= a.rightCol && d.rightCol >= a.leftCol) return !0;
    }

    return !1;
  }

  function Da(a, b) {
    return a.leftCol - b.leftCol;
  }

  function Ea(a) {
    var b,
        c,
        d,
        e = [];

    for (b = 0; b < a.length; b++) {
      for (c = a[b], d = 0; d < e.length && Ha(c, e[d]).length; d++) {
        ;
      }

      c.level = d, (e[d] || (e[d] = [])).push(c);
    }

    return e;
  }

  function Fa(a) {
    var b, c, d, e, f;

    for (b = 0; b < a.length; b++) {
      for (c = a[b], d = 0; d < c.length; d++) {
        for (e = c[d], e.forwardSegs = [], f = b + 1; f < a.length; f++) {
          Ha(e, a[f], e.forwardSegs);
        }
      }
    }
  }

  function Ga(a) {
    var b,
        c,
        d = a.forwardSegs,
        e = 0;

    if (void 0 === a.forwardPressure) {
      for (b = 0; b < d.length; b++) {
        c = d[b], Ga(c), e = Math.max(e, 1 + c.forwardPressure);
      }

      a.forwardPressure = e;
    }
  }

  function Ha(a, b, c) {
    c = c || [];

    for (var d = 0; d < b.length; d++) {
      Ia(a, b[d]) && c.push(b[d]);
    }

    return c;
  }

  function Ia(a, b) {
    return a.bottom > b.top && a.top < b.bottom;
  }

  function Ja(c, d) {
    function e() {
      U ? h() && (k(), i()) : f();
    }

    function f() {
      V = O.theme ? "ui" : "fc", c.addClass("fc"), O.isRTL ? c.addClass("fc-rtl") : c.addClass("fc-ltr"), O.theme ? c.addClass("ui-widget") : c.addClass("fc-unthemed"), U = a("<div class='fc-view-container'/>").prependTo(c), S = N.header = new Ma(N, O), T = S.render(), T && c.prepend(T), i(O.defaultView), O.handleWindowResize && (Y = da(m, O.windowResizeDelay), a(window).resize(Y));
    }

    function g() {
      W && W.removeElement(), S.removeElement(), U.remove(), c.removeClass("fc fc-ltr fc-rtl fc-unthemed ui-widget"), Y && a(window).unbind("resize", Y);
    }

    function h() {
      return c.is(":visible");
    }

    function i(b) {
      ca++, W && b && W.type !== b && (S.deactivateButton(W.type), H(), W.removeElement(), W = N.view = null), !W && b && (W = N.view = ba[b] || (ba[b] = N.instantiateView(b)), W.setElement(a("<div class='fc-view fc-" + b + "-view' />").appendTo(U)), S.activateButton(b)), W && (Z = W.massageCurrentDate(Z), W.displaying && Z.isWithin(W.intervalStart, W.intervalEnd) || h() && (W.display(Z), I(), u(), v(), q())), I(), ca--;
    }

    function j(a) {
      return h() ? (a && l(), ca++, W.updateSize(!0), ca--, !0) : void 0;
    }

    function k() {
      h() && l();
    }

    function l() {
      X = "number" == typeof O.contentHeight ? O.contentHeight : "number" == typeof O.height ? O.height - (T ? T.outerHeight(!0) : 0) : Math.round(U.width() / Math.max(O.aspectRatio, .5));
    }

    function m(a) {
      !ca && a.target === window && W.start && j(!0) && W.trigger("windowResize", aa);
    }

    function n() {
      p(), r();
    }

    function o() {
      h() && (H(), W.displayEvents(ea), I());
    }

    function p() {
      H(), W.clearEvents(), I();
    }

    function q() {
      !O.lazyFetching || $(W.start, W.end) ? r() : o();
    }

    function r() {
      _(W.start, W.end);
    }

    function s(a) {
      ea = a, o();
    }

    function t() {
      o();
    }

    function u() {
      S.updateTitle(W.title);
    }

    function v() {
      var a = N.getNow();
      a.isWithin(W.intervalStart, W.intervalEnd) ? S.disableButton("today") : S.enableButton("today");
    }

    function w(a, b) {
      W.select(N.buildSelectSpan.apply(N, arguments));
    }

    function x() {
      W && W.unselect();
    }

    function y() {
      Z = W.computePrevDate(Z), i();
    }

    function z() {
      Z = W.computeNextDate(Z), i();
    }

    function A() {
      Z.add(-1, "years"), i();
    }

    function B() {
      Z.add(1, "years"), i();
    }

    function C() {
      Z = N.getNow(), i();
    }

    function D(a) {
      Z = N.moment(a).stripZone(), i();
    }

    function E(a) {
      Z.add(b.duration(a)), i();
    }

    function F(a, b) {
      var c;
      b = b || "day", c = N.getViewSpec(b) || N.getUnitViewSpec(b), Z = a.clone(), i(c ? c.type : null);
    }

    function G() {
      return N.applyTimezone(Z);
    }

    function H() {
      U.css({
        width: "100%",
        height: U.height(),
        overflow: "hidden"
      });
    }

    function I() {
      U.css({
        width: "",
        height: "",
        overflow: ""
      });
    }

    function J() {
      return N;
    }

    function K() {
      return W;
    }

    function L(a, b) {
      return void 0 === b ? O[a] : void ("height" != a && "contentHeight" != a && "aspectRatio" != a || (O[a] = b, j(!0)));
    }

    function M(a, b) {
      var c = Array.prototype.slice.call(arguments, 2);
      return b = b || aa, this.triggerWith(a, b, c), O[a] ? O[a].apply(b, c) : void 0;
    }

    var N = this;
    N.initOptions(d || {});
    var O = this.options;
    N.render = e, N.destroy = g, N.refetchEvents = n, N.reportEvents = s, N.reportEventChange = t, N.rerenderEvents = o, N.changeView = i, N.select = w, N.unselect = x, N.prev = y, N.next = z, N.prevYear = A, N.nextYear = B, N.today = C, N.gotoDate = D, N.incrementDate = E, N.zoomTo = F, N.getDate = G, N.getCalendar = J, N.getView = K, N.option = L, N.trigger = M;
    var P = R(La(O.lang));

    if (O.monthNames && (P._months = O.monthNames), O.monthNamesShort && (P._monthsShort = O.monthNamesShort), O.dayNames && (P._weekdays = O.dayNames), O.dayNamesShort && (P._weekdaysShort = O.dayNamesShort), null != O.firstDay) {
      var Q = R(P._week);
      Q.dow = O.firstDay, P._week = Q;
    }

    P._fullCalendar_weekCalc = function (a) {
      return "function" == typeof a ? a : "local" === a ? a : "iso" === a || "ISO" === a ? "ISO" : void 0;
    }(O.weekNumberCalculation), N.defaultAllDayEventDuration = b.duration(O.defaultAllDayEventDuration), N.defaultTimedEventDuration = b.duration(O.defaultTimedEventDuration), N.moment = function () {
      var a;
      return "local" === O.timezone ? (a = Pa.moment.apply(null, arguments), a.hasTime() && a.local()) : a = "UTC" === O.timezone ? Pa.moment.utc.apply(null, arguments) : Pa.moment.parseZone.apply(null, arguments), "_locale" in a ? a._locale = P : a._lang = P, a;
    }, N.getIsAmbigTimezone = function () {
      return "local" !== O.timezone && "UTC" !== O.timezone;
    }, N.applyTimezone = function (a) {
      if (!a.hasTime()) return a.clone();
      var b,
          c = N.moment(a.toArray()),
          d = a.time() - c.time();
      return d && (b = c.clone().add(d), a.time() - b.time() === 0 && (c = b)), c;
    }, N.getNow = function () {
      var a = O.now;
      return "function" == typeof a && (a = a()), N.moment(a).stripZone();
    }, N.getEventEnd = function (a) {
      return a.end ? a.end.clone() : N.getDefaultEventEnd(a.allDay, a.start);
    }, N.getDefaultEventEnd = function (a, b) {
      var c = b.clone();
      return a ? c.stripTime().add(N.defaultAllDayEventDuration) : c.add(N.defaultTimedEventDuration), N.getIsAmbigTimezone() && c.stripZone(), c;
    }, N.humanizeDuration = function (a) {
      return (a.locale || a.lang).call(a, O.lang).humanize();
    }, Na.call(N, O);
    var S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z,
        $ = N.isFetchNeeded,
        _ = N.fetchEvents,
        aa = c[0],
        ba = {},
        ca = 0,
        ea = [];
    Z = null != O.defaultDate ? N.moment(O.defaultDate).stripZone() : N.getNow(), N.getSuggestedViewHeight = function () {
      return void 0 === X && k(), X;
    }, N.isHeightAuto = function () {
      return "auto" === O.contentHeight || "auto" === O.height;
    }, N.freezeContentHeight = H, N.unfreezeContentHeight = I, N.initialize();
  }

  function Ka(b) {
    a.each(tb, function (a, c) {
      null == b[a] && (b[a] = c(b));
    });
  }

  function La(a) {
    var c = b.localeData || b.langData;
    return c.call(b, a) || c.call(b, "en");
  }

  function Ma(b, c) {
    function d() {
      var b = c.header;
      return n = c.theme ? "ui" : "fc", b ? o = a("<div class='fc-toolbar'/>").append(f("left")).append(f("right")).append(f("center")).append('<div class="fc-clear"/>') : void 0;
    }

    function e() {
      o.remove(), o = a();
    }

    function f(d) {
      var e = a('<div class="fc-' + d + '"/>'),
          f = c.header[d];
      return f && a.each(f.split(" "), function (d) {
        var f,
            g = a(),
            h = !0;
        a.each(this.split(","), function (d, e) {
          var f, i, j, k, l, m, o, q, r, s;
          "title" == e ? (g = g.add(a("<h2>&nbsp;</h2>")), h = !1) : ((f = (b.options.customButtons || {})[e]) ? (j = function j(a) {
            f.click && f.click.call(s[0], a);
          }, k = "", l = f.text) : (i = b.getViewSpec(e)) ? (j = function j() {
            b.changeView(e);
          }, p.push(e), k = i.buttonTextOverride, l = i.buttonTextDefault) : b[e] && (j = function j() {
            b[e]();
          }, k = (b.overrides.buttonText || {})[e], l = c.buttonText[e]), j && (m = f ? f.themeIcon : c.themeButtonIcons[e], o = f ? f.icon : c.buttonIcons[e], q = k ? Y(k) : m && c.theme ? "<span class='ui-icon ui-icon-" + m + "'></span>" : o && !c.theme ? "<span class='fc-icon fc-icon-" + o + "'></span>" : Y(l), r = ["fc-" + e + "-button", n + "-button", n + "-state-default"], s = a('<button type="button" class="' + r.join(" ") + '">' + q + "</button>").click(function (a) {
            s.hasClass(n + "-state-disabled") || (j(a), (s.hasClass(n + "-state-active") || s.hasClass(n + "-state-disabled")) && s.removeClass(n + "-state-hover"));
          }).mousedown(function () {
            s.not("." + n + "-state-active").not("." + n + "-state-disabled").addClass(n + "-state-down");
          }).mouseup(function () {
            s.removeClass(n + "-state-down");
          }).hover(function () {
            s.not("." + n + "-state-active").not("." + n + "-state-disabled").addClass(n + "-state-hover");
          }, function () {
            s.removeClass(n + "-state-hover").removeClass(n + "-state-down");
          }), g = g.add(s)));
        }), h && g.first().addClass(n + "-corner-left").end().last().addClass(n + "-corner-right").end(), g.length > 1 ? (f = a("<div/>"), h && f.addClass("fc-button-group"), f.append(g), e.append(f)) : e.append(g);
      }), e;
    }

    function g(a) {
      o.find("h2").text(a);
    }

    function h(a) {
      o.find(".fc-" + a + "-button").addClass(n + "-state-active");
    }

    function i(a) {
      o.find(".fc-" + a + "-button").removeClass(n + "-state-active");
    }

    function j(a) {
      o.find(".fc-" + a + "-button").attr("disabled", "disabled").addClass(n + "-state-disabled");
    }

    function k(a) {
      o.find(".fc-" + a + "-button").removeAttr("disabled").removeClass(n + "-state-disabled");
    }

    function l() {
      return p;
    }

    var m = this;
    m.render = d, m.removeElement = e, m.updateTitle = g, m.activateButton = h, m.deactivateButton = i, m.disableButton = j, m.enableButton = k, m.getViewsWithButtons = l;
    var n,
        o = a(),
        p = [];
  }

  function Na(c) {
    function d(a, b) {
      return !L || L > a || b > M;
    }

    function e(a, b) {
      L = a, M = b, T = [];
      var c = ++R,
          d = Q.length;
      S = d;

      for (var e = 0; d > e; e++) {
        f(Q[e], c);
      }
    }

    function f(b, c) {
      g(b, function (d) {
        var e,
            f,
            g,
            h = a.isArray(b.events);

        if (c == R) {
          if (d) for (e = 0; e < d.length; e++) {
            f = d[e], g = h ? f : s(f, b), g && T.push.apply(T, w(g));
          }
          S--, S || N(T);
        }
      });
    }

    function g(b, d) {
      var e,
          f,
          h = Pa.sourceFetchers;

      for (e = 0; e < h.length; e++) {
        if (f = h[e].call(K, b, L.clone(), M.clone(), c.timezone, d), f === !0) return;
        if ("object" == _typeof(f)) return void g(f, d);
      }

      var i = b.events;
      if (i) a.isFunction(i) ? (K.pushLoading(), i.call(K, L.clone(), M.clone(), c.timezone, function (a) {
        d(a), K.popLoading();
      })) : a.isArray(i) ? d(i) : d();else {
        var j = b.url;

        if (j) {
          var k,
              l = b.success,
              m = b.error,
              n = b.complete;
          k = a.isFunction(b.data) ? b.data() : b.data;
          var o = a.extend({}, k || {}),
              p = X(b.startParam, c.startParam),
              q = X(b.endParam, c.endParam),
              r = X(b.timezoneParam, c.timezoneParam);
          p && (o[p] = L.format()), q && (o[q] = M.format()), c.timezone && "local" != c.timezone && (o[r] = c.timezone), K.pushLoading(), a.ajax(a.extend({}, ub, b, {
            data: o,
            success: function success(b) {
              b = b || [];
              var c = W(l, this, arguments);
              a.isArray(c) && (b = c), d(b);
            },
            error: function error() {
              W(m, this, arguments), d();
            },
            complete: function complete() {
              W(n, this, arguments), K.popLoading();
            }
          }));
        } else d();
      }
    }

    function h(a) {
      var b = i(a);
      b && (Q.push(b), S++, f(b, R));
    }

    function i(b) {
      var c,
          d,
          e = Pa.sourceNormalizers;

      if (a.isFunction(b) || a.isArray(b) ? c = {
        events: b
      } : "string" == typeof b ? c = {
        url: b
      } : "object" == _typeof(b) && (c = a.extend({}, b)), c) {
        for (c.className ? "string" == typeof c.className && (c.className = c.className.split(/\s+/)) : c.className = [], a.isArray(c.events) && (c.origArray = c.events, c.events = a.map(c.events, function (a) {
          return s(a, c);
        })), d = 0; d < e.length; d++) {
          e[d].call(K, c);
        }

        return c;
      }
    }

    function j(b) {
      Q = a.grep(Q, function (a) {
        return !k(a, b);
      }), T = a.grep(T, function (a) {
        return !k(a.source, b);
      }), N(T);
    }

    function k(a, b) {
      return a && b && l(a) == l(b);
    }

    function l(a) {
      return ("object" == _typeof(a) ? a.origArray || a.googleCalendarId || a.url || a.events : null) || a;
    }

    function m(a) {
      a.start = K.moment(a.start), a.end ? a.end = K.moment(a.end) : a.end = null, x(a, n(a)), N(T);
    }

    function n(b) {
      var c = {};
      return a.each(b, function (a, b) {
        o(a) && void 0 !== b && V(b) && (c[a] = b);
      }), c;
    }

    function o(a) {
      return !/^_|^(id|allDay|start|end)$/.test(a);
    }

    function p(a, b) {
      var c,
          d,
          e,
          f = s(a);

      if (f) {
        for (c = w(f), d = 0; d < c.length; d++) {
          e = c[d], e.source || (b && (O.events.push(e), e.source = O), T.push(e));
        }

        return N(T), c;
      }

      return [];
    }

    function q(b) {
      var c, d;

      for (null == b ? b = function b() {
        return !0;
      } : a.isFunction(b) || (c = b + "", b = function b(a) {
        return a._id == c;
      }), T = a.grep(T, b, !0), d = 0; d < Q.length; d++) {
        a.isArray(Q[d].events) && (Q[d].events = a.grep(Q[d].events, b, !0));
      }

      N(T);
    }

    function r(b) {
      return a.isFunction(b) ? a.grep(T, b) : null != b ? (b += "", a.grep(T, function (a) {
        return a._id == b;
      })) : T;
    }

    function s(d, e) {
      var f,
          g,
          h,
          i = {};
      if (c.eventDataTransform && (d = c.eventDataTransform(d)), e && e.eventDataTransform && (d = e.eventDataTransform(d)), a.extend(i, d), e && (i.source = e), i._id = d._id || (void 0 === d.id ? "_fc" + vb++ : d.id + ""), d.className ? "string" == typeof d.className ? i.className = d.className.split(/\s+/) : i.className = d.className : i.className = [], f = d.start || d.date, g = d.end, P(f) && (f = b.duration(f)), P(g) && (g = b.duration(g)), d.dow || b.isDuration(f) || b.isDuration(g)) i.start = f ? b.duration(f) : null, i.end = g ? b.duration(g) : null, i._recurring = !0;else {
        if (f && (f = K.moment(f), !f.isValid())) return !1;
        g && (g = K.moment(g), g.isValid() || (g = null)), h = d.allDay, void 0 === h && (h = X(e ? e.allDayDefault : void 0, c.allDayDefault)), t(f, g, h, i);
      }
      return i;
    }

    function t(a, b, c, d) {
      d.start = a, d.end = b, d.allDay = c, u(d), Oa(d);
    }

    function u(a) {
      v(a), a.end && !a.end.isAfter(a.start) && (a.end = null), a.end || (c.forceEventDuration ? a.end = K.getDefaultEventEnd(a.allDay, a.start) : a.end = null);
    }

    function v(a) {
      null == a.allDay && (a.allDay = !(a.start.hasTime() || a.end && a.end.hasTime())), a.allDay ? (a.start.stripTime(), a.end && a.end.stripTime()) : (a.start.hasTime() || (a.start = K.applyTimezone(a.start.time(0))), a.end && !a.end.hasTime() && (a.end = K.applyTimezone(a.end.time(0))));
    }

    function w(b, c, d) {
      var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n = [];
      if (c = c || L, d = d || M, b) if (b._recurring) {
        if (f = b.dow) for (e = {}, g = 0; g < f.length; g++) {
          e[f[g]] = !0;
        }

        for (h = c.clone().stripTime(); h.isBefore(d);) {
          e && !e[h.day()] || (i = b.start, j = b.end, k = h.clone(), l = null, i && (k = k.time(i)), j && (l = h.clone().time(j)), m = a.extend({}, b), t(k, l, !i && !j, m), n.push(m)), h.add(1, "days");
        }
      } else n.push(b);
      return n;
    }

    function x(b, c, d) {
      function e(a, b) {
        return d ? H(a, b, d) : c.allDay ? G(a, b) : F(a, b);
      }

      var f,
          g,
          h,
          i,
          j,
          k,
          l = {};
      return c = c || {}, c.start || (c.start = b.start.clone()), void 0 === c.end && (c.end = b.end ? b.end.clone() : null), null == c.allDay && (c.allDay = b.allDay), u(c), f = {
        start: b._start.clone(),
        end: b._end ? b._end.clone() : K.getDefaultEventEnd(b._allDay, b._start),
        allDay: c.allDay
      }, u(f), g = null !== b._end && null === c.end, h = e(c.start, f.start), c.end ? (i = e(c.end, f.end), j = i.subtract(h)) : j = null, a.each(c, function (a, b) {
        o(a) && void 0 !== b && (l[a] = b);
      }), k = y(r(b._id), g, c.allDay, h, j, l), {
        dateDelta: h,
        durationDelta: j,
        undo: k
      };
    }

    function y(b, c, d, e, f, g) {
      var h = K.getIsAmbigTimezone(),
          i = [];
      return e && !e.valueOf() && (e = null), f && !f.valueOf() && (f = null), a.each(b, function (b, j) {
        var k, l;
        k = {
          start: j.start.clone(),
          end: j.end ? j.end.clone() : null,
          allDay: j.allDay
        }, a.each(g, function (a) {
          k[a] = j[a];
        }), l = {
          start: j._start,
          end: j._end,
          allDay: d
        }, u(l), c ? l.end = null : f && !l.end && (l.end = K.getDefaultEventEnd(l.allDay, l.start)), e && (l.start.add(e), l.end && l.end.add(e)), f && l.end.add(f), h && !l.allDay && (e || f) && (l.start.stripZone(), l.end && l.end.stripZone()), a.extend(j, g, l), Oa(j), i.push(function () {
          a.extend(j, k), Oa(j);
        });
      }), function () {
        for (var a = 0; a < i.length; a++) {
          i[a]();
        }
      };
    }

    function z(b) {
      var d,
          e = c.businessHours,
          f = {
        className: "fc-nonbusiness",
        start: "09:00",
        end: "17:00",
        dow: [1, 2, 3, 4, 5],
        rendering: "inverse-background"
      },
          g = K.getView();
      return e && (d = a.extend({}, f, "object" == _typeof(e) ? e : {})), d ? (b && (d.start = null, d.end = null), w(s(d), g.start, g.end)) : [];
    }

    function A(a, b) {
      var d = b.source || {},
          e = X(b.constraint, d.constraint, c.eventConstraint),
          f = X(b.overlap, d.overlap, c.eventOverlap);
      return D(a, e, f, b);
    }

    function B(b, c, d) {
      var e, f;
      return d && (e = a.extend({}, d, c), f = w(s(e))[0]), f ? A(b, f) : C(b);
    }

    function C(a) {
      return D(a, c.selectConstraint, c.selectOverlap);
    }

    function D(a, b, c, d) {
      var e, f, g, h, i, j;

      if (null != b) {
        for (e = E(b), f = !1, h = 0; h < e.length; h++) {
          if (I(e[h], a)) {
            f = !0;
            break;
          }
        }

        if (!f) return !1;
      }

      for (g = K.getPeerEvents(a, d), h = 0; h < g.length; h++) {
        if (i = g[h], J(i, a)) {
          if (c === !1) return !1;
          if ("function" == typeof c && !c(i, d)) return !1;

          if (d) {
            if (j = X(i.overlap, (i.source || {}).overlap), j === !1) return !1;
            if ("function" == typeof j && !j(d, i)) return !1;
          }
        }
      }

      return !0;
    }

    function E(a) {
      return "businessHours" === a ? z() : "object" == _typeof(a) ? w(s(a)) : r(a);
    }

    function I(a, b) {
      var c = a.start.clone().stripZone(),
          d = K.getEventEnd(a).stripZone();
      return b.start >= c && b.end <= d;
    }

    function J(a, b) {
      var c = a.start.clone().stripZone(),
          d = K.getEventEnd(a).stripZone();
      return b.start < d && b.end > c;
    }

    var K = this;
    K.isFetchNeeded = d, K.fetchEvents = e, K.addEventSource = h, K.removeEventSource = j, K.updateEvent = m, K.renderEvent = p, K.removeEvents = q, K.clientEvents = r, K.mutateEvent = x, K.normalizeEventDates = u, K.normalizeEventTimes = v;
    var L,
        M,
        N = K.reportEvents,
        O = {
      events: []
    },
        Q = [O],
        R = 0,
        S = 0,
        T = [];
    a.each((c.events ? [c.events] : []).concat(c.eventSources || []), function (a, b) {
      var c = i(b);
      c && Q.push(c);
    }), K.getBusinessHoursEvents = z, K.isEventSpanAllowed = A, K.isExternalSpanAllowed = B, K.isSelectionSpanAllowed = C, K.getEventCache = function () {
      return T;
    };
  }

  function Oa(a) {
    a._allDay = a.allDay, a._start = a.start.clone(), a._end = a.end ? a.end.clone() : null;
  }

  var Pa = a.fullCalendar = {
    version: "2.6.1",
    internalApiVersion: 3
  },
      Qa = Pa.views = {};

  a.fn.fullCalendar = function (b) {
    var c = Array.prototype.slice.call(arguments, 1),
        d = this;
    return this.each(function (e, f) {
      var g,
          h = a(f),
          i = h.data("fullCalendar");
      "string" == typeof b ? i && a.isFunction(i[b]) && (g = i[b].apply(i, c), e || (d = g), "destroy" === b && h.removeData("fullCalendar")) : i || (i = new pb(h, b), h.data("fullCalendar", i), i.render());
    }), d;
  };

  var Ra = ["header", "buttonText", "buttonIcons", "themeButtonIcons"];
  Pa.intersectRanges = E, Pa.applyAll = W, Pa.debounce = da, Pa.isInt = ba, Pa.htmlEscape = Y, Pa.cssToStr = $, Pa.proxy = ca, Pa.capitaliseFirstLetter = _, Pa.getOuterRect = o, Pa.getClientRect = p, Pa.getContentRect = q, Pa.getScrollbarWidths = r;
  var Sa = null;
  Pa.intersectRects = w, Pa.parseFieldSpecs = A, Pa.compareByFieldSpecs = B, Pa.compareByFieldSpec = C, Pa.flexibleCompare = D, Pa.computeIntervalUnit = I, Pa.divideRangeByDuration = K, Pa.divideDurationByDuration = L, Pa.multiplyDuration = M, Pa.durationHasTime = N;
  var Ta = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      Ua = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
  Pa.log = function () {
    var a = window.console;
    return a && a.log ? a.log.apply(a, arguments) : void 0;
  }, Pa.warn = function () {
    var a = window.console;
    return a && a.warn ? a.warn.apply(a, arguments) : Pa.log.apply(Pa, arguments);
  };
  var Va,
      Wa,
      Xa,
      Ya = {}.hasOwnProperty,
      Za = /^\s*\d{4}-\d\d$/,
      $a = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
      _a = b.fn,
      ab = a.extend({}, _a);
  Pa.moment = function () {
    return ea(arguments);
  }, Pa.moment.utc = function () {
    var a = ea(arguments, !0);
    return a.hasTime() && a.utc(), a;
  }, Pa.moment.parseZone = function () {
    return ea(arguments, !0, !0);
  }, _a.clone = function () {
    var a = ab.clone.apply(this, arguments);
    return ga(this, a), this._fullCalendar && (a._fullCalendar = !0), a;
  }, _a.week = _a.weeks = function (a) {
    var b = (this._locale || this._lang)._fullCalendar_weekCalc;
    return null == a && "function" == typeof b ? b(this) : "ISO" === b ? ab.isoWeek.apply(this, arguments) : ab.week.apply(this, arguments);
  }, _a.time = function (a) {
    if (!this._fullCalendar) return ab.time.apply(this, arguments);
    if (null == a) return b.duration({
      hours: this.hours(),
      minutes: this.minutes(),
      seconds: this.seconds(),
      milliseconds: this.milliseconds()
    });
    this._ambigTime = !1, b.isDuration(a) || b.isMoment(a) || (a = b.duration(a));
    var c = 0;
    return b.isDuration(a) && (c = 24 * Math.floor(a.asDays())), this.hours(c + a.hours()).minutes(a.minutes()).seconds(a.seconds()).milliseconds(a.milliseconds());
  }, _a.stripTime = function () {
    var a;
    return this._ambigTime || (a = this.toArray(), this.utc(), Wa(this, a.slice(0, 3)), this._ambigTime = !0, this._ambigZone = !0), this;
  }, _a.hasTime = function () {
    return !this._ambigTime;
  }, _a.stripZone = function () {
    var a, b;
    return this._ambigZone || (a = this.toArray(), b = this._ambigTime, this.utc(), Wa(this, a), this._ambigTime = b || !1, this._ambigZone = !0), this;
  }, _a.hasZone = function () {
    return !this._ambigZone;
  }, _a.local = function () {
    var a = this.toArray(),
        b = this._ambigZone;
    return ab.local.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, b && Xa(this, a), this;
  }, _a.utc = function () {
    return ab.utc.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, this;
  }, a.each(["zone", "utcOffset"], function (a, b) {
    ab[b] && (_a[b] = function (a) {
      return null != a && (this._ambigTime = !1, this._ambigZone = !1), ab[b].apply(this, arguments);
    });
  }), _a.format = function () {
    return this._fullCalendar && arguments[0] ? ja(this, arguments[0]) : this._ambigTime ? ia(this, "YYYY-MM-DD") : this._ambigZone ? ia(this, "YYYY-MM-DD[T]HH:mm:ss") : ab.format.apply(this, arguments);
  }, _a.toISOString = function () {
    return this._ambigTime ? ia(this, "YYYY-MM-DD") : this._ambigZone ? ia(this, "YYYY-MM-DD[T]HH:mm:ss") : ab.toISOString.apply(this, arguments);
  }, _a.isWithin = function (a, b) {
    var c = fa([this, a, b]);
    return c[0] >= c[1] && c[0] < c[2];
  }, _a.isSame = function (a, b) {
    var c;
    return this._fullCalendar ? b ? (c = fa([this, a], !0), ab.isSame.call(c[0], c[1], b)) : (a = Pa.moment.parseZone(a), ab.isSame.call(this, a) && Boolean(this._ambigTime) === Boolean(a._ambigTime) && Boolean(this._ambigZone) === Boolean(a._ambigZone)) : ab.isSame.apply(this, arguments);
  }, a.each(["isBefore", "isAfter"], function (a, b) {
    _a[b] = function (a, c) {
      var d;
      return this._fullCalendar ? (d = fa([this, a]), ab[b].call(d[0], d[1], c)) : ab[b].apply(this, arguments);
    };
  }), Va = "_d" in b() && "updateOffset" in b, Wa = Va ? function (a, c) {
    a._d.setTime(Date.UTC.apply(Date, c)), b.updateOffset(a, !1);
  } : ha, Xa = Va ? function (a, c) {
    a._d.setTime(+new Date(c[0] || 0, c[1] || 0, c[2] || 0, c[3] || 0, c[4] || 0, c[5] || 0, c[6] || 0)), b.updateOffset(a, !1);
  } : ha;
  var bb = {
    t: function t(a) {
      return ia(a, "a").charAt(0);
    },
    T: function T(a) {
      return ia(a, "A").charAt(0);
    }
  };
  Pa.formatRange = ma;
  var cb = {
    Y: "year",
    M: "month",
    D: "day",
    d: "day",
    A: "second",
    a: "second",
    T: "second",
    t: "second",
    H: "second",
    h: "second",
    m: "second",
    s: "second"
  },
      db = {};
  Pa.Class = ra, ra.extend = function () {
    var a,
        b,
        c = arguments.length;

    for (a = 0; c > a; a++) {
      b = arguments[a], c - 1 > a && ta(this, b);
    }

    return sa(this, b || {});
  }, ra.mixin = function (a) {
    ta(this, a);
  };
  var eb = Pa.Emitter = ra.extend({
    callbackHash: null,
    on: function on(a, b) {
      return this.getCallbacks(a).add(b), this;
    },
    off: function off(a, b) {
      return this.getCallbacks(a).remove(b), this;
    },
    trigger: function trigger(a) {
      var b = Array.prototype.slice.call(arguments, 1);
      return this.triggerWith(a, this, b), this;
    },
    triggerWith: function triggerWith(a, b, c) {
      var d = this.getCallbacks(a);
      return d.fireWith(b, c), this;
    },
    getCallbacks: function getCallbacks(b) {
      var c;
      return this.callbackHash || (this.callbackHash = {}), c = this.callbackHash[b], c || (c = this.callbackHash[b] = a.Callbacks()), c;
    }
  }),
      fb = ra.extend({
    isHidden: !0,
    options: null,
    el: null,
    documentMousedownProxy: null,
    margin: 10,
    constructor: function constructor(a) {
      this.options = a || {};
    },
    show: function show() {
      this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"));
    },
    hide: function hide() {
      this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"));
    },
    render: function render() {
      var b = this,
          c = this.options;
      this.el = a('<div class="fc-popover"/>').addClass(c.className || "").css({
        top: 0,
        left: 0
      }).append(c.content).appendTo(c.parentEl), this.el.on("click", ".fc-close", function () {
        b.hide();
      }), c.autoHide && a(document).on("mousedown", this.documentMousedownProxy = ca(this, "documentMousedown"));
    },
    documentMousedown: function documentMousedown(b) {
      this.el && !a(b.target).closest(this.el).length && this.hide();
    },
    removeElement: function removeElement() {
      this.hide(), this.el && (this.el.remove(), this.el = null), a(document).off("mousedown", this.documentMousedownProxy);
    },
    position: function position() {
      var b,
          c,
          d,
          e,
          f,
          g = this.options,
          h = this.el.offsetParent().offset(),
          i = this.el.outerWidth(),
          j = this.el.outerHeight(),
          k = a(window),
          l = n(this.el);
      e = g.top || 0, f = void 0 !== g.left ? g.left : void 0 !== g.right ? g.right - i : 0, l.is(window) || l.is(document) ? (l = k, b = 0, c = 0) : (d = l.offset(), b = d.top, c = d.left), b += k.scrollTop(), c += k.scrollLeft(), g.viewportConstrain !== !1 && (e = Math.min(e, b + l.outerHeight() - j - this.margin), e = Math.max(e, b + this.margin), f = Math.min(f, c + l.outerWidth() - i - this.margin), f = Math.max(f, c + this.margin)), this.el.css({
        top: e - h.top,
        left: f - h.left
      });
    },
    trigger: function trigger(a) {
      this.options[a] && this.options[a].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }),
      gb = Pa.CoordCache = ra.extend({
    els: null,
    forcedOffsetParentEl: null,
    origin: null,
    boundingRect: null,
    isHorizontal: !1,
    isVertical: !1,
    lefts: null,
    rights: null,
    tops: null,
    bottoms: null,
    constructor: function constructor(b) {
      this.els = a(b.els), this.isHorizontal = b.isHorizontal, this.isVertical = b.isVertical, this.forcedOffsetParentEl = b.offsetParent ? a(b.offsetParent) : null;
    },
    build: function build() {
      var a = this.forcedOffsetParentEl || this.els.eq(0).offsetParent();
      this.origin = a.offset(), this.boundingRect = this.queryBoundingRect(), this.isHorizontal && this.buildElHorizontals(), this.isVertical && this.buildElVerticals();
    },
    clear: function clear() {
      this.origin = null, this.boundingRect = null, this.lefts = null, this.rights = null, this.tops = null, this.bottoms = null;
    },
    ensureBuilt: function ensureBuilt() {
      this.origin || this.build();
    },
    queryBoundingRect: function queryBoundingRect() {
      var a = n(this.els.eq(0));
      return a.is(document) ? void 0 : p(a);
    },
    buildElHorizontals: function buildElHorizontals() {
      var b = [],
          c = [];
      this.els.each(function (d, e) {
        var f = a(e),
            g = f.offset().left,
            h = f.outerWidth();
        b.push(g), c.push(g + h);
      }), this.lefts = b, this.rights = c;
    },
    buildElVerticals: function buildElVerticals() {
      var b = [],
          c = [];
      this.els.each(function (d, e) {
        var f = a(e),
            g = f.offset().top,
            h = f.outerHeight();
        b.push(g), c.push(g + h);
      }), this.tops = b, this.bottoms = c;
    },
    getHorizontalIndex: function getHorizontalIndex(a) {
      this.ensureBuilt();
      var b,
          c = this.boundingRect,
          d = this.lefts,
          e = this.rights,
          f = d.length;
      if (!c || a >= c.left && a < c.right) for (b = 0; f > b; b++) {
        if (a >= d[b] && a < e[b]) return b;
      }
    },
    getVerticalIndex: function getVerticalIndex(a) {
      this.ensureBuilt();
      var b,
          c = this.boundingRect,
          d = this.tops,
          e = this.bottoms,
          f = d.length;
      if (!c || a >= c.top && a < c.bottom) for (b = 0; f > b; b++) {
        if (a >= d[b] && a < e[b]) return b;
      }
    },
    getLeftOffset: function getLeftOffset(a) {
      return this.ensureBuilt(), this.lefts[a];
    },
    getLeftPosition: function getLeftPosition(a) {
      return this.ensureBuilt(), this.lefts[a] - this.origin.left;
    },
    getRightOffset: function getRightOffset(a) {
      return this.ensureBuilt(), this.rights[a];
    },
    getRightPosition: function getRightPosition(a) {
      return this.ensureBuilt(), this.rights[a] - this.origin.left;
    },
    getWidth: function getWidth(a) {
      return this.ensureBuilt(), this.rights[a] - this.lefts[a];
    },
    getTopOffset: function getTopOffset(a) {
      return this.ensureBuilt(), this.tops[a];
    },
    getTopPosition: function getTopPosition(a) {
      return this.ensureBuilt(), this.tops[a] - this.origin.top;
    },
    getBottomOffset: function getBottomOffset(a) {
      return this.ensureBuilt(), this.bottoms[a];
    },
    getBottomPosition: function getBottomPosition(a) {
      return this.ensureBuilt(), this.bottoms[a] - this.origin.top;
    },
    getHeight: function getHeight(a) {
      return this.ensureBuilt(), this.bottoms[a] - this.tops[a];
    }
  }),
      hb = Pa.DragListener = ra.extend({
    options: null,
    isListening: !1,
    isDragging: !1,
    originX: null,
    originY: null,
    mousemoveProxy: null,
    mouseupProxy: null,
    subjectEl: null,
    subjectHref: null,
    scrollEl: null,
    scrollBounds: null,
    scrollTopVel: null,
    scrollLeftVel: null,
    scrollIntervalId: null,
    scrollHandlerProxy: null,
    scrollSensitivity: 30,
    scrollSpeed: 200,
    scrollIntervalMs: 50,
    constructor: function constructor(a) {
      a = a || {}, this.options = a, this.subjectEl = a.subjectEl;
    },
    mousedown: function mousedown(a) {
      v(a) && (a.preventDefault(), this.startListening(a), this.options.distance || this.startDrag(a));
    },
    startListening: function startListening(b) {
      var c;
      this.isListening || (b && this.options.scroll && (c = n(a(b.target)), c.is(window) || c.is(document) || (this.scrollEl = c, this.scrollHandlerProxy = da(ca(this, "scrollHandler"), 100), this.scrollEl.on("scroll", this.scrollHandlerProxy))), a(document).on("mousemove", this.mousemoveProxy = ca(this, "mousemove")).on("mouseup", this.mouseupProxy = ca(this, "mouseup")).on("selectstart", this.preventDefault), b ? (this.originX = b.pageX, this.originY = b.pageY) : (this.originX = 0, this.originY = 0), this.isListening = !0, this.listenStart(b));
    },
    listenStart: function listenStart(a) {
      this.trigger("listenStart", a);
    },
    mousemove: function mousemove(a) {
      var b,
          c,
          d = a.pageX - this.originX,
          e = a.pageY - this.originY;
      this.isDragging || (b = this.options.distance || 1, c = d * d + e * e, c >= b * b && this.startDrag(a)), this.isDragging && this.drag(d, e, a);
    },
    startDrag: function startDrag(a) {
      this.isListening || this.startListening(), this.isDragging || (this.isDragging = !0, this.dragStart(a));
    },
    dragStart: function dragStart(a) {
      var b = this.subjectEl;
      this.trigger("dragStart", a), (this.subjectHref = b ? b.attr("href") : null) && b.removeAttr("href");
    },
    drag: function drag(a, b, c) {
      this.trigger("drag", a, b, c), this.updateScroll(c);
    },
    mouseup: function mouseup(a) {
      this.stopListening(a);
    },
    stopDrag: function stopDrag(a) {
      this.isDragging && (this.stopScrolling(), this.dragStop(a), this.isDragging = !1);
    },
    dragStop: function dragStop(a) {
      var b = this;
      this.trigger("dragStop", a), setTimeout(function () {
        b.subjectHref && b.subjectEl.attr("href", b.subjectHref);
      }, 0);
    },
    stopListening: function stopListening(b) {
      this.stopDrag(b), this.isListening && (this.scrollEl && (this.scrollEl.off("scroll", this.scrollHandlerProxy), this.scrollHandlerProxy = null), a(document).off("mousemove", this.mousemoveProxy).off("mouseup", this.mouseupProxy).off("selectstart", this.preventDefault), this.mousemoveProxy = null, this.mouseupProxy = null, this.isListening = !1, this.listenStop(b));
    },
    listenStop: function listenStop(a) {
      this.trigger("listenStop", a);
    },
    trigger: function trigger(a) {
      this.options[a] && this.options[a].apply(this, Array.prototype.slice.call(arguments, 1));
    },
    preventDefault: function preventDefault(a) {
      a.preventDefault();
    },
    computeScrollBounds: function computeScrollBounds() {
      var a = this.scrollEl;
      this.scrollBounds = a ? o(a) : null;
    },
    updateScroll: function updateScroll(a) {
      var b,
          c,
          d,
          e,
          f = this.scrollSensitivity,
          g = this.scrollBounds,
          h = 0,
          i = 0;
      g && (b = (f - (a.pageY - g.top)) / f, c = (f - (g.bottom - a.pageY)) / f, d = (f - (a.pageX - g.left)) / f, e = (f - (g.right - a.pageX)) / f, b >= 0 && 1 >= b ? h = b * this.scrollSpeed * -1 : c >= 0 && 1 >= c && (h = c * this.scrollSpeed), d >= 0 && 1 >= d ? i = d * this.scrollSpeed * -1 : e >= 0 && 1 >= e && (i = e * this.scrollSpeed)), this.setScrollVel(h, i);
    },
    setScrollVel: function setScrollVel(a, b) {
      this.scrollTopVel = a, this.scrollLeftVel = b, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(ca(this, "scrollIntervalFunc"), this.scrollIntervalMs));
    },
    constrainScrollVel: function constrainScrollVel() {
      var a = this.scrollEl;
      this.scrollTopVel < 0 ? a.scrollTop() <= 0 && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && a.scrollTop() + a[0].clientHeight >= a[0].scrollHeight && (this.scrollTopVel = 0), this.scrollLeftVel < 0 ? a.scrollLeft() <= 0 && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && a.scrollLeft() + a[0].clientWidth >= a[0].scrollWidth && (this.scrollLeftVel = 0);
    },
    scrollIntervalFunc: function scrollIntervalFunc() {
      var a = this.scrollEl,
          b = this.scrollIntervalMs / 1e3;
      this.scrollTopVel && a.scrollTop(a.scrollTop() + this.scrollTopVel * b), this.scrollLeftVel && a.scrollLeft(a.scrollLeft() + this.scrollLeftVel * b), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.stopScrolling();
    },
    stopScrolling: function stopScrolling() {
      this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.scrollStop());
    },
    scrollHandler: function scrollHandler() {
      this.scrollIntervalId || this.scrollStop();
    },
    scrollStop: function scrollStop() {}
  }),
      ib = hb.extend({
    component: null,
    origHit: null,
    hit: null,
    coordAdjust: null,
    constructor: function constructor(a, b) {
      hb.call(this, b), this.component = a;
    },
    listenStart: function listenStart(a) {
      var b,
          c,
          d,
          e = this.subjectEl;
      hb.prototype.listenStart.apply(this, arguments), this.computeCoords(), a ? (c = {
        left: a.pageX,
        top: a.pageY
      }, d = c, e && (b = o(e), d = x(d, b)), this.origHit = this.queryHit(d.left, d.top), e && this.options.subjectCenter && (this.origHit && (b = w(this.origHit, b) || b), d = y(b)), this.coordAdjust = z(d, c)) : (this.origHit = null, this.coordAdjust = null);
    },
    computeCoords: function computeCoords() {
      this.component.prepareHits(), this.computeScrollBounds();
    },
    dragStart: function dragStart(a) {
      var b;
      hb.prototype.dragStart.apply(this, arguments), b = this.queryHit(a.pageX, a.pageY), b && this.hitOver(b);
    },
    drag: function drag(a, b, c) {
      var d;
      hb.prototype.drag.apply(this, arguments), d = this.queryHit(c.pageX, c.pageY), ua(d, this.hit) || (this.hit && this.hitOut(), d && this.hitOver(d));
    },
    dragStop: function dragStop() {
      this.hitDone(), hb.prototype.dragStop.apply(this, arguments);
    },
    hitOver: function hitOver(a) {
      var b = ua(a, this.origHit);
      this.hit = a, this.trigger("hitOver", this.hit, b, this.origHit);
    },
    hitOut: function hitOut() {
      this.hit && (this.trigger("hitOut", this.hit), this.hitDone(), this.hit = null);
    },
    hitDone: function hitDone() {
      this.hit && this.trigger("hitDone", this.hit);
    },
    listenStop: function listenStop() {
      hb.prototype.listenStop.apply(this, arguments), this.origHit = null, this.hit = null, this.component.releaseHits();
    },
    scrollStop: function scrollStop() {
      hb.prototype.scrollStop.apply(this, arguments), this.computeCoords();
    },
    queryHit: function queryHit(a, b) {
      return this.coordAdjust && (a += this.coordAdjust.left, b += this.coordAdjust.top), this.component.queryHit(a, b);
    }
  }),
      jb = ra.extend({
    options: null,
    sourceEl: null,
    el: null,
    parentEl: null,
    top0: null,
    left0: null,
    mouseY0: null,
    mouseX0: null,
    topDelta: null,
    leftDelta: null,
    mousemoveProxy: null,
    isFollowing: !1,
    isHidden: !1,
    isAnimating: !1,
    constructor: function constructor(b, c) {
      this.options = c = c || {}, this.sourceEl = b, this.parentEl = c.parentEl ? a(c.parentEl) : b.parent();
    },
    start: function start(b) {
      this.isFollowing || (this.isFollowing = !0, this.mouseY0 = b.pageY, this.mouseX0 = b.pageX, this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), a(document).on("mousemove", this.mousemoveProxy = ca(this, "mousemove")));
    },
    stop: function stop(b, c) {
      function d() {
        this.isAnimating = !1, e.removeElement(), this.top0 = this.left0 = null, c && c();
      }

      var e = this,
          f = this.options.revertDuration;
      this.isFollowing && !this.isAnimating && (this.isFollowing = !1, a(document).off("mousemove", this.mousemoveProxy), b && f && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
        top: this.top0,
        left: this.left0
      }, {
        duration: f,
        complete: d
      })) : d());
    },
    getEl: function getEl() {
      var a = this.el;
      return a || (this.sourceEl.width(), a = this.el = this.sourceEl.clone().css({
        position: "absolute",
        visibility: "",
        display: this.isHidden ? "none" : "",
        margin: 0,
        right: "auto",
        bottom: "auto",
        width: this.sourceEl.width(),
        height: this.sourceEl.height(),
        opacity: this.options.opacity || "",
        zIndex: this.options.zIndex
      }).appendTo(this.parentEl)), a;
    },
    removeElement: function removeElement() {
      this.el && (this.el.remove(), this.el = null);
    },
    updatePosition: function updatePosition() {
      var a, b;
      this.getEl(), null === this.top0 && (this.sourceEl.width(), a = this.sourceEl.offset(), b = this.el.offsetParent().offset(), this.top0 = a.top - b.top, this.left0 = a.left - b.left), this.el.css({
        top: this.top0 + this.topDelta,
        left: this.left0 + this.leftDelta
      });
    },
    mousemove: function mousemove(a) {
      this.topDelta = a.pageY - this.mouseY0, this.leftDelta = a.pageX - this.mouseX0, this.isHidden || this.updatePosition();
    },
    hide: function hide() {
      this.isHidden || (this.isHidden = !0, this.el && this.el.hide());
    },
    show: function show() {
      this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show());
    }
  }),
      kb = Pa.Grid = ra.extend({
    view: null,
    isRTL: null,
    start: null,
    end: null,
    el: null,
    elsByFill: null,
    externalDragStartProxy: null,
    eventTimeFormat: null,
    displayEventTime: null,
    displayEventEnd: null,
    minResizeDuration: null,
    largeUnit: null,
    constructor: function constructor(a) {
      this.view = a, this.isRTL = a.opt("isRTL"), this.elsByFill = {}, this.externalDragStartProxy = ca(this, "externalDragStart");
    },
    computeEventTimeFormat: function computeEventTimeFormat() {
      return this.view.opt("smallTimeFormat");
    },
    computeDisplayEventTime: function computeDisplayEventTime() {
      return !0;
    },
    computeDisplayEventEnd: function computeDisplayEventEnd() {
      return !0;
    },
    setRange: function setRange(a) {
      this.start = a.start.clone(), this.end = a.end.clone(), this.rangeUpdated(), this.processRangeOptions();
    },
    rangeUpdated: function rangeUpdated() {},
    processRangeOptions: function processRangeOptions() {
      var a,
          b,
          c = this.view;
      this.eventTimeFormat = c.opt("eventTimeFormat") || c.opt("timeFormat") || this.computeEventTimeFormat(), a = c.opt("displayEventTime"), null == a && (a = this.computeDisplayEventTime()), b = c.opt("displayEventEnd"), null == b && (b = this.computeDisplayEventEnd()), this.displayEventTime = a, this.displayEventEnd = b;
    },
    spanToSegs: function spanToSegs(a) {},
    diffDates: function diffDates(a, b) {
      return this.largeUnit ? H(a, b, this.largeUnit) : F(a, b);
    },
    prepareHits: function prepareHits() {},
    releaseHits: function releaseHits() {},
    queryHit: function queryHit(a, b) {},
    getHitSpan: function getHitSpan(a) {},
    getHitEl: function getHitEl(a) {},
    setElement: function setElement(b) {
      var c = this;
      this.el = b, b.on("mousedown", function (b) {
        a(b.target).is(".fc-event-container *, .fc-more") || a(b.target).closest(".fc-popover").length || c.dayMousedown(b);
      }), this.bindSegHandlers(), this.bindGlobalHandlers();
    },
    removeElement: function removeElement() {
      this.unbindGlobalHandlers(), this.el.remove();
    },
    renderSkeleton: function renderSkeleton() {},
    renderDates: function renderDates() {},
    unrenderDates: function unrenderDates() {},
    bindGlobalHandlers: function bindGlobalHandlers() {
      a(document).on("dragstart sortstart", this.externalDragStartProxy);
    },
    unbindGlobalHandlers: function unbindGlobalHandlers() {
      a(document).off("dragstart sortstart", this.externalDragStartProxy);
    },
    dayMousedown: function dayMousedown(a) {
      var b,
          c,
          d = this,
          e = this.view,
          f = e.opt("selectable"),
          i = new ib(this, {
        scroll: e.opt("dragScroll"),
        dragStart: function dragStart() {
          e.unselect();
        },
        hitOver: function hitOver(a, e, h) {
          h && (b = e ? a : null, f && (c = d.computeSelection(d.getHitSpan(h), d.getHitSpan(a)), c ? d.renderSelection(c) : c === !1 && g()));
        },
        hitOut: function hitOut() {
          b = null, c = null, d.unrenderSelection(), h();
        },
        listenStop: function listenStop(a) {
          b && e.triggerDayClick(d.getHitSpan(b), d.getHitEl(b), a), c && e.reportSelection(c, a), h();
        }
      });
      i.mousedown(a);
    },
    renderEventLocationHelper: function renderEventLocationHelper(a, b) {
      var c = this.fabricateHelperEvent(a, b);
      this.renderHelper(c, b);
    },
    fabricateHelperEvent: function fabricateHelperEvent(a, b) {
      var c = b ? R(b.event) : {};
      return c.start = a.start.clone(), c.end = a.end ? a.end.clone() : null, c.allDay = null, this.view.calendar.normalizeEventDates(c), c.className = (c.className || []).concat("fc-helper"), b || (c.editable = !1), c;
    },
    renderHelper: function renderHelper(a, b) {},
    unrenderHelper: function unrenderHelper() {},
    renderSelection: function renderSelection(a) {
      this.renderHighlight(a);
    },
    unrenderSelection: function unrenderSelection() {
      this.unrenderHighlight();
    },
    computeSelection: function computeSelection(a, b) {
      var c = this.computeSelectionSpan(a, b);
      return c && !this.view.calendar.isSelectionSpanAllowed(c) ? !1 : c;
    },
    computeSelectionSpan: function computeSelectionSpan(a, b) {
      var c = [a.start, a.end, b.start, b.end];
      return c.sort(aa), {
        start: c[0].clone(),
        end: c[3].clone()
      };
    },
    renderHighlight: function renderHighlight(a) {
      this.renderFill("highlight", this.spanToSegs(a));
    },
    unrenderHighlight: function unrenderHighlight() {
      this.unrenderFill("highlight");
    },
    highlightSegClasses: function highlightSegClasses() {
      return ["fc-highlight"];
    },
    renderBusinessHours: function renderBusinessHours() {},
    unrenderBusinessHours: function unrenderBusinessHours() {},
    getNowIndicatorUnit: function getNowIndicatorUnit() {},
    renderNowIndicator: function renderNowIndicator(a) {},
    unrenderNowIndicator: function unrenderNowIndicator() {},
    renderFill: function renderFill(a, b) {},
    unrenderFill: function unrenderFill(a) {
      var b = this.elsByFill[a];
      b && (b.remove(), delete this.elsByFill[a]);
    },
    renderFillSegEls: function renderFillSegEls(b, c) {
      var d,
          e = this,
          f = this[b + "SegEl"],
          g = "",
          h = [];

      if (c.length) {
        for (d = 0; d < c.length; d++) {
          g += this.fillSegHtml(b, c[d]);
        }

        a(g).each(function (b, d) {
          var g = c[b],
              i = a(d);
          f && (i = f.call(e, g, i)), i && (i = a(i), i.is(e.fillSegTag) && (g.el = i, h.push(g)));
        });
      }

      return h;
    },
    fillSegTag: "div",
    fillSegHtml: function fillSegHtml(a, b) {
      var c = this[a + "SegClasses"],
          d = this[a + "SegCss"],
          e = c ? c.call(this, b) : [],
          f = $(d ? d.call(this, b) : {});
      return "<" + this.fillSegTag + (e.length ? ' class="' + e.join(" ") + '"' : "") + (f ? ' style="' + f + '"' : "") + " />";
    },
    getDayClasses: function getDayClasses(a) {
      var b = this.view,
          c = b.calendar.getNow(),
          d = ["fc-" + Ta[a.day()]];
      return 1 == b.intervalDuration.as("months") && a.month() != b.intervalStart.month() && d.push("fc-other-month"), a.isSame(c, "day") ? d.push("fc-today", b.highlightStateClass) : c > a ? d.push("fc-past") : d.push("fc-future"), d;
    }
  });
  kb.mixin({
    mousedOverSeg: null,
    isDraggingSeg: !1,
    isResizingSeg: !1,
    isDraggingExternal: !1,
    segs: null,
    renderEvents: function renderEvents(a) {
      var b,
          c = [],
          d = [];

      for (b = 0; b < a.length; b++) {
        (wa(a[b]) ? c : d).push(a[b]);
      }

      this.segs = [].concat(this.renderBgEvents(c), this.renderFgEvents(d));
    },
    renderBgEvents: function renderBgEvents(a) {
      var b = this.eventsToSegs(a);
      return this.renderBgSegs(b) || b;
    },
    renderFgEvents: function renderFgEvents(a) {
      var b = this.eventsToSegs(a);
      return this.renderFgSegs(b) || b;
    },
    unrenderEvents: function unrenderEvents() {
      this.triggerSegMouseout(), this.unrenderFgSegs(), this.unrenderBgSegs(), this.segs = null;
    },
    getEventSegs: function getEventSegs() {
      return this.segs || [];
    },
    renderFgSegs: function renderFgSegs(a) {},
    unrenderFgSegs: function unrenderFgSegs() {},
    renderFgSegEls: function renderFgSegEls(b, c) {
      var d,
          e = this.view,
          f = "",
          g = [];

      if (b.length) {
        for (d = 0; d < b.length; d++) {
          f += this.fgSegHtml(b[d], c);
        }

        a(f).each(function (c, d) {
          var f = b[c],
              h = e.resolveEventEl(f.event, a(d));
          h && (h.data("fc-seg", f), f.el = h, g.push(f));
        });
      }

      return g;
    },
    fgSegHtml: function fgSegHtml(a, b) {},
    renderBgSegs: function renderBgSegs(a) {
      return this.renderFill("bgEvent", a);
    },
    unrenderBgSegs: function unrenderBgSegs() {
      this.unrenderFill("bgEvent");
    },
    bgEventSegEl: function bgEventSegEl(a, b) {
      return this.view.resolveEventEl(a.event, b);
    },
    bgEventSegClasses: function bgEventSegClasses(a) {
      var b = a.event,
          c = b.source || {};
      return ["fc-bgevent"].concat(b.className, c.className || []);
    },
    bgEventSegCss: function bgEventSegCss(a) {
      return {
        "background-color": this.getSegSkinCss(a)["background-color"]
      };
    },
    businessHoursSegClasses: function businessHoursSegClasses(a) {
      return ["fc-nonbusiness", "fc-bgevent"];
    },
    bindSegHandlers: function bindSegHandlers() {
      var b = this,
          c = this.view;
      a.each({
        mouseenter: function mouseenter(a, c) {
          b.triggerSegMouseover(a, c);
        },
        mouseleave: function mouseleave(a, c) {
          b.triggerSegMouseout(a, c);
        },
        click: function click(a, b) {
          return c.trigger("eventClick", this, a.event, b);
        },
        mousedown: function mousedown(d, e) {
          a(e.target).is(".fc-resizer") && c.isEventResizable(d.event) ? b.segResizeMousedown(d, e, a(e.target).is(".fc-start-resizer")) : c.isEventDraggable(d.event) && b.segDragMousedown(d, e);
        }
      }, function (c, d) {
        b.el.on(c, ".fc-event-container > *", function (c) {
          var e = a(this).data("fc-seg");
          return !e || b.isDraggingSeg || b.isResizingSeg ? void 0 : d.call(this, e, c);
        });
      });
    },
    triggerSegMouseover: function triggerSegMouseover(a, b) {
      this.mousedOverSeg || (this.mousedOverSeg = a, this.view.trigger("eventMouseover", a.el[0], a.event, b));
    },
    triggerSegMouseout: function triggerSegMouseout(a, b) {
      b = b || {}, this.mousedOverSeg && (a = a || this.mousedOverSeg, this.mousedOverSeg = null, this.view.trigger("eventMouseout", a.el[0], a.event, b));
    },
    segDragMousedown: function segDragMousedown(a, b) {
      var c,
          d = this,
          e = this.view,
          f = e.calendar,
          i = a.el,
          j = a.event,
          k = new jb(a.el, {
        parentEl: e.el,
        opacity: e.opt("dragOpacity"),
        revertDuration: e.opt("dragRevertDuration"),
        zIndex: 2
      }),
          l = new ib(e, {
        distance: 5,
        scroll: e.opt("dragScroll"),
        subjectEl: i,
        subjectCenter: !0,
        listenStart: function listenStart(a) {
          k.hide(), k.start(a);
        },
        dragStart: function dragStart(b) {
          d.triggerSegMouseout(a, b), d.segDragStart(a, b), e.hideEvent(j);
        },
        hitOver: function hitOver(b, h, i) {
          a.hit && (i = a.hit), c = d.computeEventDrop(i.component.getHitSpan(i), b.component.getHitSpan(b), j), c && !f.isEventSpanAllowed(d.eventToSpan(c), j) && (g(), c = null), c && e.renderDrag(c, a) ? k.hide() : k.show(), h && (c = null);
        },
        hitOut: function hitOut() {
          e.unrenderDrag(), k.show(), c = null;
        },
        hitDone: function hitDone() {
          h();
        },
        dragStop: function dragStop(b) {
          k.stop(!c, function () {
            e.unrenderDrag(), e.showEvent(j), d.segDragStop(a, b), c && e.reportEventDrop(j, c, this.largeUnit, i, b);
          });
        },
        listenStop: function listenStop() {
          k.stop();
        }
      });
      l.mousedown(b);
    },
    segDragStart: function segDragStart(a, b) {
      this.isDraggingSeg = !0, this.view.trigger("eventDragStart", a.el[0], a.event, b, {});
    },
    segDragStop: function segDragStop(a, b) {
      this.isDraggingSeg = !1, this.view.trigger("eventDragStop", a.el[0], a.event, b, {});
    },
    computeEventDrop: function computeEventDrop(a, b, c) {
      var d,
          e,
          f = this.view.calendar,
          g = a.start,
          h = b.start;
      return g.hasTime() === h.hasTime() ? (d = this.diffDates(h, g), c.allDay && N(d) ? (e = {
        start: c.start.clone(),
        end: f.getEventEnd(c),
        allDay: !1
      }, f.normalizeEventTimes(e)) : e = {
        start: c.start.clone(),
        end: c.end ? c.end.clone() : null,
        allDay: c.allDay
      }, e.start.add(d), e.end && e.end.add(d)) : e = {
        start: h.clone(),
        end: null,
        allDay: !h.hasTime()
      }, e;
    },
    applyDragOpacity: function applyDragOpacity(a) {
      var b = this.view.opt("dragOpacity");
      null != b && a.each(function (a, c) {
        c.style.opacity = b;
      });
    },
    externalDragStart: function externalDragStart(b, c) {
      var d,
          e,
          f = this.view;
      f.opt("droppable") && (d = a((c ? c.item : null) || b.target), e = f.opt("dropAccept"), (a.isFunction(e) ? e.call(d[0], d) : d.is(e)) && (this.isDraggingExternal || this.listenToExternalDrag(d, b, c)));
    },
    listenToExternalDrag: function listenToExternalDrag(a, b, c) {
      var d,
          e = this,
          f = this.view.calendar,
          i = Ba(a),
          j = new ib(this, {
        listenStart: function listenStart() {
          e.isDraggingExternal = !0;
        },
        hitOver: function hitOver(a) {
          d = e.computeExternalDrop(a.component.getHitSpan(a), i), d && !f.isExternalSpanAllowed(e.eventToSpan(d), d, i.eventProps) && (g(), d = null), d && e.renderDrag(d);
        },
        hitOut: function hitOut() {
          d = null;
        },
        hitDone: function hitDone() {
          h(), e.unrenderDrag();
        },
        dragStop: function dragStop() {
          d && e.view.reportExternalDrop(i, d, a, b, c);
        },
        listenStop: function listenStop() {
          e.isDraggingExternal = !1;
        }
      });
      j.startDrag(b);
    },
    computeExternalDrop: function computeExternalDrop(a, b) {
      var c = this.view.calendar,
          d = {
        start: c.applyTimezone(a.start),
        end: null
      };
      return b.startTime && !d.start.hasTime() && d.start.time(b.startTime), b.duration && (d.end = d.start.clone().add(b.duration)), d;
    },
    renderDrag: function renderDrag(a, b) {},
    unrenderDrag: function unrenderDrag() {},
    segResizeMousedown: function segResizeMousedown(a, b, c) {
      var d,
          e = this,
          f = this.view,
          i = f.calendar,
          j = a.el,
          k = a.event,
          l = i.getEventEnd(k),
          m = new ib(this, {
        distance: 5,
        scroll: f.opt("dragScroll"),
        subjectEl: j,
        dragStart: function dragStart(b) {
          e.triggerSegMouseout(a, b), e.segResizeStart(a, b);
        },
        hitOver: function hitOver(b, h, j) {
          var m = e.getHitSpan(j),
              n = e.getHitSpan(b);
          d = c ? e.computeEventStartResize(m, n, k) : e.computeEventEndResize(m, n, k), d && (i.isEventSpanAllowed(e.eventToSpan(d), k) ? d.start.isSame(k.start) && d.end.isSame(l) && (d = null) : (g(), d = null)), d && (f.hideEvent(k), e.renderEventResize(d, a));
        },
        hitOut: function hitOut() {
          d = null;
        },
        hitDone: function hitDone() {
          e.unrenderEventResize(), f.showEvent(k), h();
        },
        dragStop: function dragStop(b) {
          e.segResizeStop(a, b), d && f.reportEventResize(k, d, this.largeUnit, j, b);
        }
      });
      m.mousedown(b);
    },
    segResizeStart: function segResizeStart(a, b) {
      this.isResizingSeg = !0, this.view.trigger("eventResizeStart", a.el[0], a.event, b, {});
    },
    segResizeStop: function segResizeStop(a, b) {
      this.isResizingSeg = !1, this.view.trigger("eventResizeStop", a.el[0], a.event, b, {});
    },
    computeEventStartResize: function computeEventStartResize(a, b, c) {
      return this.computeEventResize("start", a, b, c);
    },
    computeEventEndResize: function computeEventEndResize(a, b, c) {
      return this.computeEventResize("end", a, b, c);
    },
    computeEventResize: function computeEventResize(a, b, c, d) {
      var e,
          f,
          g = this.view.calendar,
          h = this.diffDates(c[a], b[a]);
      return e = {
        start: d.start.clone(),
        end: g.getEventEnd(d),
        allDay: d.allDay
      }, e.allDay && N(h) && (e.allDay = !1, g.normalizeEventTimes(e)), e[a].add(h), e.start.isBefore(e.end) || (f = this.minResizeDuration || (d.allDay ? g.defaultAllDayEventDuration : g.defaultTimedEventDuration), "start" == a ? e.start = e.end.clone().subtract(f) : e.end = e.start.clone().add(f)), e;
    },
    renderEventResize: function renderEventResize(a, b) {},
    unrenderEventResize: function unrenderEventResize() {},
    getEventTimeText: function getEventTimeText(a, b, c) {
      return null == b && (b = this.eventTimeFormat), null == c && (c = this.displayEventEnd), this.displayEventTime && a.start.hasTime() ? c && a.end ? this.view.formatRange(a, b) : a.start.format(b) : "";
    },
    getSegClasses: function getSegClasses(a, b, c) {
      var d = a.event,
          e = ["fc-event", a.isStart ? "fc-start" : "fc-not-start", a.isEnd ? "fc-end" : "fc-not-end"].concat(d.className, d.source ? d.source.className : []);
      return b && e.push("fc-draggable"), c && e.push("fc-resizable"), e;
    },
    getSegSkinCss: function getSegSkinCss(a) {
      var b = a.event,
          c = this.view,
          d = b.source || {},
          e = b.color,
          f = d.color,
          g = c.opt("eventColor");
      return {
        "background-color": b.backgroundColor || e || d.backgroundColor || f || c.opt("eventBackgroundColor") || g,
        "border-color": b.borderColor || e || d.borderColor || f || c.opt("eventBorderColor") || g,
        color: b.textColor || d.textColor || c.opt("eventTextColor")
      };
    },
    eventToSegs: function eventToSegs(a) {
      return this.eventsToSegs([a]);
    },
    eventToSpan: function eventToSpan(a) {
      return this.eventToSpans(a)[0];
    },
    eventToSpans: function eventToSpans(a) {
      var b = this.eventToRange(a);
      return this.eventRangeToSpans(b, a);
    },
    eventsToSegs: function eventsToSegs(b, c) {
      var d = this,
          e = za(b),
          f = [];
      return a.each(e, function (a, b) {
        var e,
            g = [];

        for (e = 0; e < b.length; e++) {
          g.push(d.eventToRange(b[e]));
        }

        if (xa(b[0])) for (g = d.invertRanges(g), e = 0; e < g.length; e++) {
          f.push.apply(f, d.eventRangeToSegs(g[e], b[0], c));
        } else for (e = 0; e < g.length; e++) {
          f.push.apply(f, d.eventRangeToSegs(g[e], b[e], c));
        }
      }), f;
    },
    eventToRange: function eventToRange(a) {
      return {
        start: a.start.clone().stripZone(),
        end: (a.end ? a.end.clone() : this.view.calendar.getDefaultEventEnd(null != a.allDay ? a.allDay : !a.start.hasTime(), a.start)).stripZone()
      };
    },
    eventRangeToSegs: function eventRangeToSegs(a, b, c) {
      var d,
          e = this.eventRangeToSpans(a, b),
          f = [];

      for (d = 0; d < e.length; d++) {
        f.push.apply(f, this.eventSpanToSegs(e[d], b, c));
      }

      return f;
    },
    eventRangeToSpans: function eventRangeToSpans(b, c) {
      return [a.extend({}, b)];
    },
    eventSpanToSegs: function eventSpanToSegs(a, b, c) {
      var d,
          e,
          f = c ? c(a) : this.spanToSegs(a);

      for (d = 0; d < f.length; d++) {
        e = f[d], e.event = b, e.eventStartMS = +a.start, e.eventDurationMS = a.end - a.start;
      }

      return f;
    },
    invertRanges: function invertRanges(a) {
      var b,
          c,
          d = this.view,
          e = d.start.clone(),
          f = d.end.clone(),
          g = [],
          h = e;

      for (a.sort(Aa), b = 0; b < a.length; b++) {
        c = a[b], c.start > h && g.push({
          start: h,
          end: c.start
        }), h = c.end;
      }

      return f > h && g.push({
        start: h,
        end: f
      }), g;
    },
    sortEventSegs: function sortEventSegs(a) {
      a.sort(ca(this, "compareEventSegs"));
    },
    compareEventSegs: function compareEventSegs(a, b) {
      return a.eventStartMS - b.eventStartMS || b.eventDurationMS - a.eventDurationMS || b.event.allDay - a.event.allDay || B(a.event, b.event, this.view.eventOrderSpecs);
    }
  }), Pa.isBgEvent = wa, Pa.dataAttrPrefix = "";
  var lb = Pa.DayTableMixin = {
    breakOnWeeks: !1,
    dayDates: null,
    dayIndices: null,
    daysPerRow: null,
    rowCnt: null,
    colCnt: null,
    colHeadFormat: null,
    updateDayTable: function updateDayTable() {
      for (var a, b, c, d = this.view, e = this.start.clone(), f = -1, g = [], h = []; e.isBefore(this.end);) {
        d.isHiddenDay(e) ? g.push(f + .5) : (f++, g.push(f), h.push(e.clone())), e.add(1, "days");
      }

      if (this.breakOnWeeks) {
        for (b = h[0].day(), a = 1; a < h.length && h[a].day() != b; a++) {
          ;
        }

        c = Math.ceil(h.length / a);
      } else c = 1, a = h.length;

      this.dayDates = h, this.dayIndices = g, this.daysPerRow = a, this.rowCnt = c, this.updateDayTableCols();
    },
    updateDayTableCols: function updateDayTableCols() {
      this.colCnt = this.computeColCnt(), this.colHeadFormat = this.view.opt("columnFormat") || this.computeColHeadFormat();
    },
    computeColCnt: function computeColCnt() {
      return this.daysPerRow;
    },
    getCellDate: function getCellDate(a, b) {
      return this.dayDates[this.getCellDayIndex(a, b)].clone();
    },
    getCellRange: function getCellRange(a, b) {
      var c = this.getCellDate(a, b),
          d = c.clone().add(1, "days");
      return {
        start: c,
        end: d
      };
    },
    getCellDayIndex: function getCellDayIndex(a, b) {
      return a * this.daysPerRow + this.getColDayIndex(b);
    },
    getColDayIndex: function getColDayIndex(a) {
      return this.isRTL ? this.colCnt - 1 - a : a;
    },
    getDateDayIndex: function getDateDayIndex(a) {
      var b = this.dayIndices,
          c = a.diff(this.start, "days");
      return 0 > c ? b[0] - 1 : c >= b.length ? b[b.length - 1] + 1 : b[c];
    },
    computeColHeadFormat: function computeColHeadFormat() {
      return this.rowCnt > 1 || this.colCnt > 10 ? "ddd" : this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd";
    },
    sliceRangeByRow: function sliceRangeByRow(a) {
      var b,
          c,
          d,
          e,
          f,
          g = this.daysPerRow,
          h = this.view.computeDayRange(a),
          i = this.getDateDayIndex(h.start),
          j = this.getDateDayIndex(h.end.clone().subtract(1, "days")),
          k = [];

      for (b = 0; b < this.rowCnt; b++) {
        c = b * g, d = c + g - 1, e = Math.max(i, c), f = Math.min(j, d), e = Math.ceil(e), f = Math.floor(f), f >= e && k.push({
          row: b,
          firstRowDayIndex: e - c,
          lastRowDayIndex: f - c,
          isStart: e === i,
          isEnd: f === j
        });
      }

      return k;
    },
    sliceRangeByDay: function sliceRangeByDay(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = this.daysPerRow,
          i = this.view.computeDayRange(a),
          j = this.getDateDayIndex(i.start),
          k = this.getDateDayIndex(i.end.clone().subtract(1, "days")),
          l = [];

      for (b = 0; b < this.rowCnt; b++) {
        for (c = b * h, d = c + h - 1, e = c; d >= e; e++) {
          f = Math.max(j, e), g = Math.min(k, e), f = Math.ceil(f), g = Math.floor(g), g >= f && l.push({
            row: b,
            firstRowDayIndex: f - c,
            lastRowDayIndex: g - c,
            isStart: f === j,
            isEnd: g === k
          });
        }
      }

      return l;
    },
    renderHeadHtml: function renderHeadHtml() {
      var a = this.view;
      return '<div class="fc-row ' + a.widgetHeaderClass + '"><table><thead>' + this.renderHeadTrHtml() + "</thead></table></div>";
    },
    renderHeadIntroHtml: function renderHeadIntroHtml() {
      return this.renderIntroHtml();
    },
    renderHeadTrHtml: function renderHeadTrHtml() {
      return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml() + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>";
    },
    renderHeadDateCellsHtml: function renderHeadDateCellsHtml() {
      var a,
          b,
          c = [];

      for (a = 0; a < this.colCnt; a++) {
        b = this.getCellDate(0, a), c.push(this.renderHeadDateCellHtml(b));
      }

      return c.join("");
    },
    renderHeadDateCellHtml: function renderHeadDateCellHtml(a, b, c) {
      var d = this.view;
      return '<th class="fc-day-header ' + d.widgetHeaderClass + " fc-" + Ta[a.day()] + '"' + (1 == this.rowCnt ? ' data-date="' + a.format("YYYY-MM-DD") + '"' : "") + (b > 1 ? ' colspan="' + b + '"' : "") + (c ? " " + c : "") + ">" + Y(a.format(this.colHeadFormat)) + "</th>";
    },
    renderBgTrHtml: function renderBgTrHtml(a) {
      return "<tr>" + (this.isRTL ? "" : this.renderBgIntroHtml(a)) + this.renderBgCellsHtml(a) + (this.isRTL ? this.renderBgIntroHtml(a) : "") + "</tr>";
    },
    renderBgIntroHtml: function renderBgIntroHtml(a) {
      return this.renderIntroHtml();
    },
    renderBgCellsHtml: function renderBgCellsHtml(a) {
      var b,
          c,
          d = [];

      for (b = 0; b < this.colCnt; b++) {
        c = this.getCellDate(a, b), d.push(this.renderBgCellHtml(c));
      }

      return d.join("");
    },
    renderBgCellHtml: function renderBgCellHtml(a, b) {
      var c = this.view,
          d = this.getDayClasses(a);
      return d.unshift("fc-day", c.widgetContentClass), '<td class="' + d.join(" ") + '" data-date="' + a.format("YYYY-MM-DD") + '"' + (b ? " " + b : "") + "></td>";
    },
    renderIntroHtml: function renderIntroHtml() {},
    bookendCells: function bookendCells(a) {
      var b = this.renderIntroHtml();
      b && (this.isRTL ? a.append(b) : a.prepend(b));
    }
  },
      mb = Pa.DayGrid = kb.extend(lb, {
    numbersVisible: !1,
    bottomCoordPadding: 0,
    rowEls: null,
    cellEls: null,
    helperEls: null,
    rowCoordCache: null,
    colCoordCache: null,
    renderDates: function renderDates(a) {
      var b,
          c,
          d = this.view,
          e = this.rowCnt,
          f = this.colCnt,
          g = "";

      for (b = 0; e > b; b++) {
        g += this.renderDayRowHtml(b, a);
      }

      for (this.el.html(g), this.rowEls = this.el.find(".fc-row"), this.cellEls = this.el.find(".fc-day"), this.rowCoordCache = new gb({
        els: this.rowEls,
        isVertical: !0
      }), this.colCoordCache = new gb({
        els: this.cellEls.slice(0, this.colCnt),
        isHorizontal: !0
      }), b = 0; e > b; b++) {
        for (c = 0; f > c; c++) {
          d.trigger("dayRender", null, this.getCellDate(b, c), this.getCellEl(b, c));
        }
      }
    },
    unrenderDates: function unrenderDates() {
      this.removeSegPopover();
    },
    renderBusinessHours: function renderBusinessHours() {
      var a = this.view.calendar.getBusinessHoursEvents(!0),
          b = this.eventsToSegs(a);
      this.renderFill("businessHours", b, "bgevent");
    },
    renderDayRowHtml: function renderDayRowHtml(a, b) {
      var c = this.view,
          d = ["fc-row", "fc-week", c.widgetContentClass];
      return b && d.push("fc-rigid"), '<div class="' + d.join(" ") + '"><div class="fc-bg"><table>' + this.renderBgTrHtml(a) + '</table></div><div class="fc-content-skeleton"><table>' + (this.numbersVisible ? "<thead>" + this.renderNumberTrHtml(a) + "</thead>" : "") + "</table></div></div>";
    },
    renderNumberTrHtml: function renderNumberTrHtml(a) {
      return "<tr>" + (this.isRTL ? "" : this.renderNumberIntroHtml(a)) + this.renderNumberCellsHtml(a) + (this.isRTL ? this.renderNumberIntroHtml(a) : "") + "</tr>";
    },
    renderNumberIntroHtml: function renderNumberIntroHtml(a) {
      return this.renderIntroHtml();
    },
    renderNumberCellsHtml: function renderNumberCellsHtml(a) {
      var b,
          c,
          d = [];

      for (b = 0; b < this.colCnt; b++) {
        c = this.getCellDate(a, b), d.push(this.renderNumberCellHtml(c));
      }

      return d.join("");
    },
    renderNumberCellHtml: function renderNumberCellHtml(a) {
      var b;
      return this.view.dayNumbersVisible ? (b = this.getDayClasses(a), b.unshift("fc-day-number"), '<td class="' + b.join(" ") + '" data-date="' + a.format() + '">' + a.date() + "</td>") : "<td/>";
    },
    computeEventTimeFormat: function computeEventTimeFormat() {
      return this.view.opt("extraSmallTimeFormat");
    },
    computeDisplayEventEnd: function computeDisplayEventEnd() {
      return 1 == this.colCnt;
    },
    rangeUpdated: function rangeUpdated() {
      this.updateDayTable();
    },
    spanToSegs: function spanToSegs(a) {
      var b,
          c,
          d = this.sliceRangeByRow(a);

      for (b = 0; b < d.length; b++) {
        c = d[b], this.isRTL ? (c.leftCol = this.daysPerRow - 1 - c.lastRowDayIndex, c.rightCol = this.daysPerRow - 1 - c.firstRowDayIndex) : (c.leftCol = c.firstRowDayIndex, c.rightCol = c.lastRowDayIndex);
      }

      return d;
    },
    prepareHits: function prepareHits() {
      this.colCoordCache.build(), this.rowCoordCache.build(), this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding;
    },
    releaseHits: function releaseHits() {
      this.colCoordCache.clear(), this.rowCoordCache.clear();
    },
    queryHit: function queryHit(a, b) {
      var c = this.colCoordCache.getHorizontalIndex(a),
          d = this.rowCoordCache.getVerticalIndex(b);
      return null != d && null != c ? this.getCellHit(d, c) : void 0;
    },
    getHitSpan: function getHitSpan(a) {
      return this.getCellRange(a.row, a.col);
    },
    getHitEl: function getHitEl(a) {
      return this.getCellEl(a.row, a.col);
    },
    getCellHit: function getCellHit(a, b) {
      return {
        row: a,
        col: b,
        component: this,
        left: this.colCoordCache.getLeftOffset(b),
        right: this.colCoordCache.getRightOffset(b),
        top: this.rowCoordCache.getTopOffset(a),
        bottom: this.rowCoordCache.getBottomOffset(a)
      };
    },
    getCellEl: function getCellEl(a, b) {
      return this.cellEls.eq(a * this.colCnt + b);
    },
    renderDrag: function renderDrag(a, b) {
      return this.renderHighlight(this.eventToSpan(a)), b && !b.el.closest(this.el).length ? (this.renderEventLocationHelper(a, b), this.applyDragOpacity(this.helperEls), !0) : void 0;
    },
    unrenderDrag: function unrenderDrag() {
      this.unrenderHighlight(), this.unrenderHelper();
    },
    renderEventResize: function renderEventResize(a, b) {
      this.renderHighlight(this.eventToSpan(a)), this.renderEventLocationHelper(a, b);
    },
    unrenderEventResize: function unrenderEventResize() {
      this.unrenderHighlight(), this.unrenderHelper();
    },
    renderHelper: function renderHelper(b, c) {
      var d,
          e = [],
          f = this.eventToSegs(b);
      f = this.renderFgSegEls(f), d = this.renderSegRows(f), this.rowEls.each(function (b, f) {
        var g,
            h = a(f),
            i = a('<div class="fc-helper-skeleton"><table/></div>');
        g = c && c.row === b ? c.el.position().top : h.find(".fc-content-skeleton tbody").position().top, i.css("top", g).find("table").append(d[b].tbodyEl), h.append(i), e.push(i[0]);
      }), this.helperEls = a(e);
    },
    unrenderHelper: function unrenderHelper() {
      this.helperEls && (this.helperEls.remove(), this.helperEls = null);
    },
    fillSegTag: "td",
    renderFill: function renderFill(b, c, d) {
      var e,
          f,
          g,
          h = [];

      for (c = this.renderFillSegEls(b, c), e = 0; e < c.length; e++) {
        f = c[e], g = this.renderFillRow(b, f, d), this.rowEls.eq(f.row).append(g), h.push(g[0]);
      }

      return this.elsByFill[b] = a(h), c;
    },
    renderFillRow: function renderFillRow(b, c, d) {
      var e,
          f,
          g = this.colCnt,
          h = c.leftCol,
          i = c.rightCol + 1;
      return d = d || b.toLowerCase(), e = a('<div class="fc-' + d + '-skeleton"><table><tr/></table></div>'), f = e.find("tr"), h > 0 && f.append('<td colspan="' + h + '"/>'), f.append(c.el.attr("colspan", i - h)), g > i && f.append('<td colspan="' + (g - i) + '"/>'), this.bookendCells(f), e;
    }
  });
  mb.mixin({
    rowStructs: null,
    unrenderEvents: function unrenderEvents() {
      this.removeSegPopover(), kb.prototype.unrenderEvents.apply(this, arguments);
    },
    getEventSegs: function getEventSegs() {
      return kb.prototype.getEventSegs.call(this).concat(this.popoverSegs || []);
    },
    renderBgSegs: function renderBgSegs(b) {
      var c = a.grep(b, function (a) {
        return a.event.allDay;
      });
      return kb.prototype.renderBgSegs.call(this, c);
    },
    renderFgSegs: function renderFgSegs(b) {
      var c;
      return b = this.renderFgSegEls(b), c = this.rowStructs = this.renderSegRows(b), this.rowEls.each(function (b, d) {
        a(d).find(".fc-content-skeleton > table").append(c[b].tbodyEl);
      }), b;
    },
    unrenderFgSegs: function unrenderFgSegs() {
      for (var a, b = this.rowStructs || []; a = b.pop();) {
        a.tbodyEl.remove();
      }

      this.rowStructs = null;
    },
    renderSegRows: function renderSegRows(a) {
      var b,
          c,
          d = [];

      for (b = this.groupSegRows(a), c = 0; c < b.length; c++) {
        d.push(this.renderSegRow(c, b[c]));
      }

      return d;
    },
    fgSegHtml: function fgSegHtml(a, b) {
      var c,
          d,
          e = this.view,
          f = a.event,
          g = e.isEventDraggable(f),
          h = !b && f.allDay && a.isStart && e.isEventResizableFromStart(f),
          i = !b && f.allDay && a.isEnd && e.isEventResizableFromEnd(f),
          j = this.getSegClasses(a, g, h || i),
          k = $(this.getSegSkinCss(a)),
          l = "";
      return j.unshift("fc-day-grid-event", "fc-h-event"), a.isStart && (c = this.getEventTimeText(f), c && (l = '<span class="fc-time">' + Y(c) + "</span>")), d = '<span class="fc-title">' + (Y(f.title || "") || "&nbsp;") + "</span>", '<a class="' + j.join(" ") + '"' + (f.url ? ' href="' + Y(f.url) + '"' : "") + (k ? ' style="' + k + '"' : "") + '><div class="fc-content">' + (this.isRTL ? d + " " + l : l + " " + d) + "</div>" + (h ? '<div class="fc-resizer fc-start-resizer" />' : "") + (i ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>";
    },
    renderSegRow: function renderSegRow(b, c) {
      function d(b) {
        for (; b > g;) {
          k = (r[e - 1] || [])[g], k ? k.attr("rowspan", parseInt(k.attr("rowspan") || 1, 10) + 1) : (k = a("<td/>"), h.append(k)), q[e][g] = k, r[e][g] = k, g++;
        }
      }

      var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = this.colCnt,
          m = this.buildSegLevels(c),
          n = Math.max(1, m.length),
          o = a("<tbody/>"),
          p = [],
          q = [],
          r = [];

      for (e = 0; n > e; e++) {
        if (f = m[e], g = 0, h = a("<tr/>"), p.push([]), q.push([]), r.push([]), f) for (i = 0; i < f.length; i++) {
          for (j = f[i], d(j.leftCol), k = a('<td class="fc-event-container"/>').append(j.el), j.leftCol != j.rightCol ? k.attr("colspan", j.rightCol - j.leftCol + 1) : r[e][g] = k; g <= j.rightCol;) {
            q[e][g] = k, p[e][g] = j, g++;
          }

          h.append(k);
        }
        d(l), this.bookendCells(h), o.append(h);
      }

      return {
        row: b,
        tbodyEl: o,
        cellMatrix: q,
        segMatrix: p,
        segLevels: m,
        segs: c
      };
    },
    buildSegLevels: function buildSegLevels(a) {
      var b,
          c,
          d,
          e = [];

      for (this.sortEventSegs(a), b = 0; b < a.length; b++) {
        for (c = a[b], d = 0; d < e.length && Ca(c, e[d]); d++) {
          ;
        }

        c.level = d, (e[d] || (e[d] = [])).push(c);
      }

      for (d = 0; d < e.length; d++) {
        e[d].sort(Da);
      }

      return e;
    },
    groupSegRows: function groupSegRows(a) {
      var b,
          c = [];

      for (b = 0; b < this.rowCnt; b++) {
        c.push([]);
      }

      for (b = 0; b < a.length; b++) {
        c[a[b].row].push(a[b]);
      }

      return c;
    }
  }), mb.mixin({
    segPopover: null,
    popoverSegs: null,
    removeSegPopover: function removeSegPopover() {
      this.segPopover && this.segPopover.hide();
    },
    limitRows: function limitRows(a) {
      var b,
          c,
          d = this.rowStructs || [];

      for (b = 0; b < d.length; b++) {
        this.unlimitRow(b), c = a ? "number" == typeof a ? a : this.computeRowLevelLimit(b) : !1, c !== !1 && this.limitRow(b, c);
      }
    },
    computeRowLevelLimit: function computeRowLevelLimit(b) {
      function c(b, c) {
        f = Math.max(f, a(c).outerHeight());
      }

      var d,
          e,
          f,
          g = this.rowEls.eq(b),
          h = g.height(),
          i = this.rowStructs[b].tbodyEl.children();

      for (d = 0; d < i.length; d++) {
        if (e = i.eq(d).removeClass("fc-limited"), f = 0, e.find("> td > :first-child").each(c), e.position().top + f > h) return d;
      }

      return !1;
    },
    limitRow: function limitRow(b, c) {
      function d(d) {
        for (; d > w;) {
          j = t.getCellSegs(b, w, c), j.length && (m = f[c - 1][w], s = t.renderMoreLink(b, w, j), r = a("<div/>").append(s), m.append(r), v.push(r[0])), w++;
        }
      }

      var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t = this,
          u = this.rowStructs[b],
          v = [],
          w = 0;

      if (c && c < u.segLevels.length) {
        for (e = u.segLevels[c - 1], f = u.cellMatrix, g = u.tbodyEl.children().slice(c).addClass("fc-limited").get(), h = 0; h < e.length; h++) {
          for (i = e[h], d(i.leftCol), l = [], k = 0; w <= i.rightCol;) {
            j = this.getCellSegs(b, w, c), l.push(j), k += j.length, w++;
          }

          if (k) {
            for (m = f[c - 1][i.leftCol], n = m.attr("rowspan") || 1, o = [], p = 0; p < l.length; p++) {
              q = a('<td class="fc-more-cell"/>').attr("rowspan", n), j = l[p], s = this.renderMoreLink(b, i.leftCol + p, [i].concat(j)), r = a("<div/>").append(s), q.append(r), o.push(q[0]), v.push(q[0]);
            }

            m.addClass("fc-limited").after(a(o)), g.push(m[0]);
          }
        }

        d(this.colCnt), u.moreEls = a(v), u.limitedEls = a(g);
      }
    },
    unlimitRow: function unlimitRow(a) {
      var b = this.rowStructs[a];
      b.moreEls && (b.moreEls.remove(), b.moreEls = null), b.limitedEls && (b.limitedEls.removeClass("fc-limited"), b.limitedEls = null);
    },
    renderMoreLink: function renderMoreLink(b, c, d) {
      var e = this,
          f = this.view;
      return a('<a class="fc-more"/>').text(this.getMoreLinkText(d.length)).on("click", function (g) {
        var h = f.opt("eventLimitClick"),
            i = e.getCellDate(b, c),
            j = a(this),
            k = e.getCellEl(b, c),
            l = e.getCellSegs(b, c),
            m = e.resliceDaySegs(l, i),
            n = e.resliceDaySegs(d, i);
        "function" == typeof h && (h = f.trigger("eventLimitClick", null, {
          date: i,
          dayEl: k,
          moreEl: j,
          segs: m,
          hiddenSegs: n
        }, g)), "popover" === h ? e.showSegPopover(b, c, j, m) : "string" == typeof h && f.calendar.zoomTo(i, h);
      });
    },
    showSegPopover: function showSegPopover(a, b, c, d) {
      var e,
          f,
          g = this,
          h = this.view,
          i = c.parent();
      e = 1 == this.rowCnt ? h.el : this.rowEls.eq(a), f = {
        className: "fc-more-popover",
        content: this.renderSegPopoverContent(a, b, d),
        parentEl: this.el,
        top: e.offset().top,
        autoHide: !0,
        viewportConstrain: h.opt("popoverViewportConstrain"),
        hide: function hide() {
          g.segPopover.removeElement(), g.segPopover = null, g.popoverSegs = null;
        }
      }, this.isRTL ? f.right = i.offset().left + i.outerWidth() + 1 : f.left = i.offset().left - 1, this.segPopover = new fb(f), this.segPopover.show();
    },
    renderSegPopoverContent: function renderSegPopoverContent(b, c, d) {
      var e,
          f = this.view,
          g = f.opt("theme"),
          h = this.getCellDate(b, c).format(f.opt("dayPopoverFormat")),
          i = a('<div class="fc-header ' + f.widgetHeaderClass + '"><span class="fc-close ' + (g ? "ui-icon ui-icon-closethick" : "fc-icon fc-icon-x") + '"></span><span class="fc-title">' + Y(h) + '</span><div class="fc-clear"/></div><div class="fc-body ' + f.widgetContentClass + '"><div class="fc-event-container"></div></div>'),
          j = i.find(".fc-event-container");

      for (d = this.renderFgSegEls(d, !0), this.popoverSegs = d, e = 0; e < d.length; e++) {
        this.prepareHits(), d[e].hit = this.getCellHit(b, c), this.releaseHits(), j.append(d[e].el);
      }

      return i;
    },
    resliceDaySegs: function resliceDaySegs(b, c) {
      var d = a.map(b, function (a) {
        return a.event;
      }),
          e = c.clone(),
          f = e.clone().add(1, "days"),
          g = {
        start: e,
        end: f
      };
      return b = this.eventsToSegs(d, function (a) {
        var b = E(a, g);
        return b ? [b] : [];
      }), this.sortEventSegs(b), b;
    },
    getMoreLinkText: function getMoreLinkText(a) {
      var b = this.view.opt("eventLimitText");
      return "function" == typeof b ? b(a) : "+" + a + " " + b;
    },
    getCellSegs: function getCellSegs(a, b, c) {
      for (var d, e = this.rowStructs[a].segMatrix, f = c || 0, g = []; f < e.length;) {
        d = e[f][b], d && g.push(d), f++;
      }

      return g;
    }
  });
  var nb = Pa.TimeGrid = kb.extend(lb, {
    slotDuration: null,
    snapDuration: null,
    snapsPerSlot: null,
    minTime: null,
    maxTime: null,
    labelFormat: null,
    labelInterval: null,
    colEls: null,
    slatEls: null,
    nowIndicatorEls: null,
    colCoordCache: null,
    slatCoordCache: null,
    constructor: function constructor() {
      kb.apply(this, arguments), this.processOptions();
    },
    renderDates: function renderDates() {
      this.el.html(this.renderHtml()), this.colEls = this.el.find(".fc-day"), this.slatEls = this.el.find(".fc-slats tr"), this.colCoordCache = new gb({
        els: this.colEls,
        isHorizontal: !0
      }), this.slatCoordCache = new gb({
        els: this.slatEls,
        isVertical: !0
      }), this.renderContentSkeleton();
    },
    renderHtml: function renderHtml() {
      return '<div class="fc-bg"><table>' + this.renderBgTrHtml(0) + '</table></div><div class="fc-slats"><table>' + this.renderSlatRowHtml() + "</table></div>";
    },
    renderSlatRowHtml: function renderSlatRowHtml() {
      for (var a, c, d, e = this.view, f = this.isRTL, g = "", h = b.duration(+this.minTime); h < this.maxTime;) {
        a = this.start.clone().time(h), c = ba(L(h, this.labelInterval)), d = '<td class="fc-axis fc-time ' + e.widgetContentClass + '" ' + e.axisStyleAttr() + ">" + (c ? "<span>" + Y(a.format(this.labelFormat)) + "</span>" : "") + "</td>", g += '<tr data-time="' + a.format("HH:mm:ss") + '"' + (c ? "" : ' class="fc-minor"') + ">" + (f ? "" : d) + '<td class="' + e.widgetContentClass + '"/>' + (f ? d : "") + "</tr>", h.add(this.slotDuration);
      }

      return g;
    },
    processOptions: function processOptions() {
      var c,
          d = this.view,
          e = d.opt("slotDuration"),
          f = d.opt("snapDuration");
      e = b.duration(e), f = f ? b.duration(f) : e, this.slotDuration = e, this.snapDuration = f, this.snapsPerSlot = e / f, this.minResizeDuration = f, this.minTime = b.duration(d.opt("minTime")), this.maxTime = b.duration(d.opt("maxTime")), c = d.opt("slotLabelFormat"), a.isArray(c) && (c = c[c.length - 1]), this.labelFormat = c || d.opt("axisFormat") || d.opt("smallTimeFormat"), c = d.opt("slotLabelInterval"), this.labelInterval = c ? b.duration(c) : this.computeLabelInterval(e);
    },
    computeLabelInterval: function computeLabelInterval(a) {
      var c, d, e;

      for (c = Db.length - 1; c >= 0; c--) {
        if (d = b.duration(Db[c]), e = L(d, a), ba(e) && e > 1) return d;
      }

      return b.duration(a);
    },
    computeEventTimeFormat: function computeEventTimeFormat() {
      return this.view.opt("noMeridiemTimeFormat");
    },
    computeDisplayEventEnd: function computeDisplayEventEnd() {
      return !0;
    },
    prepareHits: function prepareHits() {
      this.colCoordCache.build(), this.slatCoordCache.build();
    },
    releaseHits: function releaseHits() {
      this.colCoordCache.clear();
    },
    queryHit: function queryHit(a, b) {
      var c = this.snapsPerSlot,
          d = this.colCoordCache,
          e = this.slatCoordCache,
          f = d.getHorizontalIndex(a),
          g = e.getVerticalIndex(b);

      if (null != f && null != g) {
        var h = e.getTopOffset(g),
            i = e.getHeight(g),
            j = (b - h) / i,
            k = Math.floor(j * c),
            l = g * c + k,
            m = h + k / c * i,
            n = h + (k + 1) / c * i;
        return {
          col: f,
          snap: l,
          component: this,
          left: d.getLeftOffset(f),
          right: d.getRightOffset(f),
          top: m,
          bottom: n
        };
      }
    },
    getHitSpan: function getHitSpan(a) {
      var b,
          c = this.getCellDate(0, a.col),
          d = this.computeSnapTime(a.snap);
      return c.time(d), b = c.clone().add(this.snapDuration), {
        start: c,
        end: b
      };
    },
    getHitEl: function getHitEl(a) {
      return this.colEls.eq(a.col);
    },
    rangeUpdated: function rangeUpdated() {
      this.updateDayTable();
    },
    computeSnapTime: function computeSnapTime(a) {
      return b.duration(this.minTime + this.snapDuration * a);
    },
    spanToSegs: function spanToSegs(a) {
      var b,
          c = this.sliceRangeByTimes(a);

      for (b = 0; b < c.length; b++) {
        this.isRTL ? c[b].col = this.daysPerRow - 1 - c[b].dayIndex : c[b].col = c[b].dayIndex;
      }

      return c;
    },
    sliceRangeByTimes: function sliceRangeByTimes(a) {
      var b,
          c,
          d,
          e,
          f = [];

      for (c = 0; c < this.daysPerRow; c++) {
        d = this.dayDates[c].clone(), e = {
          start: d.clone().time(this.minTime),
          end: d.clone().time(this.maxTime)
        }, b = E(a, e), b && (b.dayIndex = c, f.push(b));
      }

      return f;
    },
    updateSize: function updateSize(a) {
      this.slatCoordCache.build(), a && this.updateSegVerticals([].concat(this.fgSegs || [], this.bgSegs || [], this.businessSegs || []));
    },
    computeDateTop: function computeDateTop(a, c) {
      return this.computeTimeTop(b.duration(a - c.clone().stripTime()));
    },
    computeTimeTop: function computeTimeTop(a) {
      var b,
          c,
          d = this.slatEls.length,
          e = (a - this.minTime) / this.slotDuration;
      return e = Math.max(0, e), e = Math.min(d, e), b = Math.floor(e), b = Math.min(b, d - 1), c = e - b, this.slatCoordCache.getTopPosition(b) + this.slatCoordCache.getHeight(b) * c;
    },
    renderDrag: function renderDrag(a, b) {
      if (b) {
        this.renderEventLocationHelper(a, b);

        for (var c = 0; c < this.helperSegs.length; c++) {
          this.applyDragOpacity(this.helperSegs[c].el);
        }

        return !0;
      }

      this.renderHighlight(this.eventToSpan(a));
    },
    unrenderDrag: function unrenderDrag() {
      this.unrenderHelper(), this.unrenderHighlight();
    },
    renderEventResize: function renderEventResize(a, b) {
      this.renderEventLocationHelper(a, b);
    },
    unrenderEventResize: function unrenderEventResize() {
      this.unrenderHelper();
    },
    renderHelper: function renderHelper(a, b) {
      this.renderHelperSegs(this.eventToSegs(a), b);
    },
    unrenderHelper: function unrenderHelper() {
      this.unrenderHelperSegs();
    },
    renderBusinessHours: function renderBusinessHours() {
      var a = this.view.calendar.getBusinessHoursEvents(),
          b = this.eventsToSegs(a);
      this.renderBusinessSegs(b);
    },
    unrenderBusinessHours: function unrenderBusinessHours() {
      this.unrenderBusinessSegs();
    },
    getNowIndicatorUnit: function getNowIndicatorUnit() {
      return "minute";
    },
    renderNowIndicator: function renderNowIndicator(b) {
      var c,
          d = this.spanToSegs({
        start: b,
        end: b
      }),
          e = this.computeDateTop(b, b),
          f = [];

      for (c = 0; c < d.length; c++) {
        f.push(a('<div class="fc-now-indicator fc-now-indicator-line"></div>').css("top", e).appendTo(this.colContainerEls.eq(d[c].col))[0]);
      }

      d.length > 0 && f.push(a('<div class="fc-now-indicator fc-now-indicator-arrow"></div>').css("top", e).appendTo(this.el.find(".fc-content-skeleton"))[0]), this.nowIndicatorEls = a(f);
    },
    unrenderNowIndicator: function unrenderNowIndicator() {
      this.nowIndicatorEls && (this.nowIndicatorEls.remove(), this.nowIndicatorEls = null);
    },
    renderSelection: function renderSelection(a) {
      this.view.opt("selectHelper") ? this.renderEventLocationHelper(a) : this.renderHighlight(a);
    },
    unrenderSelection: function unrenderSelection() {
      this.unrenderHelper(), this.unrenderHighlight();
    },
    renderHighlight: function renderHighlight(a) {
      this.renderHighlightSegs(this.spanToSegs(a));
    },
    unrenderHighlight: function unrenderHighlight() {
      this.unrenderHighlightSegs();
    }
  });
  nb.mixin({
    colContainerEls: null,
    fgContainerEls: null,
    bgContainerEls: null,
    helperContainerEls: null,
    highlightContainerEls: null,
    businessContainerEls: null,
    fgSegs: null,
    bgSegs: null,
    helperSegs: null,
    highlightSegs: null,
    businessSegs: null,
    renderContentSkeleton: function renderContentSkeleton() {
      var b,
          c,
          d = "";

      for (b = 0; b < this.colCnt; b++) {
        d += '<td><div class="fc-content-col"><div class="fc-event-container fc-helper-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>';
      }

      c = a('<div class="fc-content-skeleton"><table><tr>' + d + "</tr></table></div>"), this.colContainerEls = c.find(".fc-content-col"), this.helperContainerEls = c.find(".fc-helper-container"), this.fgContainerEls = c.find(".fc-event-container:not(.fc-helper-container)"), this.bgContainerEls = c.find(".fc-bgevent-container"), this.highlightContainerEls = c.find(".fc-highlight-container"), this.businessContainerEls = c.find(".fc-business-container"), this.bookendCells(c.find("tr")), this.el.append(c);
    },
    renderFgSegs: function renderFgSegs(a) {
      return a = this.renderFgSegsIntoContainers(a, this.fgContainerEls), this.fgSegs = a, a;
    },
    unrenderFgSegs: function unrenderFgSegs() {
      this.unrenderNamedSegs("fgSegs");
    },
    renderHelperSegs: function renderHelperSegs(a, b) {
      var c, d, e;

      for (a = this.renderFgSegsIntoContainers(a, this.helperContainerEls), c = 0; c < a.length; c++) {
        d = a[c], b && b.col === d.col && (e = b.el, d.el.css({
          left: e.css("left"),
          right: e.css("right"),
          "margin-left": e.css("margin-left"),
          "margin-right": e.css("margin-right")
        }));
      }

      this.helperSegs = a;
    },
    unrenderHelperSegs: function unrenderHelperSegs() {
      this.unrenderNamedSegs("helperSegs");
    },
    renderBgSegs: function renderBgSegs(a) {
      return a = this.renderFillSegEls("bgEvent", a), this.updateSegVerticals(a), this.attachSegsByCol(this.groupSegsByCol(a), this.bgContainerEls), this.bgSegs = a, a;
    },
    unrenderBgSegs: function unrenderBgSegs() {
      this.unrenderNamedSegs("bgSegs");
    },
    renderHighlightSegs: function renderHighlightSegs(a) {
      a = this.renderFillSegEls("highlight", a), this.updateSegVerticals(a), this.attachSegsByCol(this.groupSegsByCol(a), this.highlightContainerEls), this.highlightSegs = a;
    },
    unrenderHighlightSegs: function unrenderHighlightSegs() {
      this.unrenderNamedSegs("highlightSegs");
    },
    renderBusinessSegs: function renderBusinessSegs(a) {
      a = this.renderFillSegEls("businessHours", a), this.updateSegVerticals(a), this.attachSegsByCol(this.groupSegsByCol(a), this.businessContainerEls), this.businessSegs = a;
    },
    unrenderBusinessSegs: function unrenderBusinessSegs() {
      this.unrenderNamedSegs("businessSegs");
    },
    groupSegsByCol: function groupSegsByCol(a) {
      var b,
          c = [];

      for (b = 0; b < this.colCnt; b++) {
        c.push([]);
      }

      for (b = 0; b < a.length; b++) {
        c[a[b].col].push(a[b]);
      }

      return c;
    },
    attachSegsByCol: function attachSegsByCol(a, b) {
      var c, d, e;

      for (c = 0; c < this.colCnt; c++) {
        for (d = a[c], e = 0; e < d.length; e++) {
          b.eq(c).append(d[e].el);
        }
      }
    },
    unrenderNamedSegs: function unrenderNamedSegs(a) {
      var b,
          c = this[a];

      if (c) {
        for (b = 0; b < c.length; b++) {
          c[b].el.remove();
        }

        this[a] = null;
      }
    },
    renderFgSegsIntoContainers: function renderFgSegsIntoContainers(a, b) {
      var c, d;

      for (a = this.renderFgSegEls(a), c = this.groupSegsByCol(a), d = 0; d < this.colCnt; d++) {
        this.updateFgSegCoords(c[d]);
      }

      return this.attachSegsByCol(c, b), a;
    },
    fgSegHtml: function fgSegHtml(a, b) {
      var c,
          d,
          e,
          f = this.view,
          g = a.event,
          h = f.isEventDraggable(g),
          i = !b && a.isStart && f.isEventResizableFromStart(g),
          j = !b && a.isEnd && f.isEventResizableFromEnd(g),
          k = this.getSegClasses(a, h, i || j),
          l = $(this.getSegSkinCss(a));
      return k.unshift("fc-time-grid-event", "fc-v-event"), f.isMultiDayEvent(g) ? (a.isStart || a.isEnd) && (c = this.getEventTimeText(a), d = this.getEventTimeText(a, "LT"), e = this.getEventTimeText(a, null, !1)) : (c = this.getEventTimeText(g), d = this.getEventTimeText(g, "LT"), e = this.getEventTimeText(g, null, !1)), '<a class="' + k.join(" ") + '"' + (g.url ? ' href="' + Y(g.url) + '"' : "") + (l ? ' style="' + l + '"' : "") + '><div class="fc-content">' + (c ? '<div class="fc-time" data-start="' + Y(e) + '" data-full="' + Y(d) + '"><span>' + Y(c) + "</span></div>" : "") + (g.title ? '<div class="fc-title">' + Y(g.title) + "</div>" : "") + '</div><div class="fc-bg"/>' + (j ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>";
    },
    updateSegVerticals: function updateSegVerticals(a) {
      this.computeSegVerticals(a), this.assignSegVerticals(a);
    },
    computeSegVerticals: function computeSegVerticals(a) {
      var b, c;

      for (b = 0; b < a.length; b++) {
        c = a[b], c.top = this.computeDateTop(c.start, c.start), c.bottom = this.computeDateTop(c.end, c.start);
      }
    },
    assignSegVerticals: function assignSegVerticals(a) {
      var b, c;

      for (b = 0; b < a.length; b++) {
        c = a[b], c.el.css(this.generateSegVerticalCss(c));
      }
    },
    generateSegVerticalCss: function generateSegVerticalCss(a) {
      return {
        top: a.top,
        bottom: -a.bottom
      };
    },
    updateFgSegCoords: function updateFgSegCoords(a) {
      this.computeSegVerticals(a), this.computeFgSegHorizontals(a), this.assignSegVerticals(a), this.assignFgSegHorizontals(a);
    },
    computeFgSegHorizontals: function computeFgSegHorizontals(a) {
      var b, c, d;

      if (this.sortEventSegs(a), b = Ea(a), Fa(b), c = b[0]) {
        for (d = 0; d < c.length; d++) {
          Ga(c[d]);
        }

        for (d = 0; d < c.length; d++) {
          this.computeFgSegForwardBack(c[d], 0, 0);
        }
      }
    },
    computeFgSegForwardBack: function computeFgSegForwardBack(a, b, c) {
      var d,
          e = a.forwardSegs;
      if (void 0 === a.forwardCoord) for (e.length ? (this.sortForwardSegs(e), this.computeFgSegForwardBack(e[0], b + 1, c), a.forwardCoord = e[0].backwardCoord) : a.forwardCoord = 1, a.backwardCoord = a.forwardCoord - (a.forwardCoord - c) / (b + 1), d = 0; d < e.length; d++) {
        this.computeFgSegForwardBack(e[d], 0, a.forwardCoord);
      }
    },
    sortForwardSegs: function sortForwardSegs(a) {
      a.sort(ca(this, "compareForwardSegs"));
    },
    compareForwardSegs: function compareForwardSegs(a, b) {
      return b.forwardPressure - a.forwardPressure || (a.backwardCoord || 0) - (b.backwardCoord || 0) || this.compareEventSegs(a, b);
    },
    assignFgSegHorizontals: function assignFgSegHorizontals(a) {
      var b, c;

      for (b = 0; b < a.length; b++) {
        c = a[b], c.el.css(this.generateFgSegHorizontalCss(c)), c.bottom - c.top < 30 && c.el.addClass("fc-short");
      }
    },
    generateFgSegHorizontalCss: function generateFgSegHorizontalCss(a) {
      var b,
          c,
          d = this.view.opt("slotEventOverlap"),
          e = a.backwardCoord,
          f = a.forwardCoord,
          g = this.generateSegVerticalCss(a);
      return d && (f = Math.min(1, e + 2 * (f - e))), this.isRTL ? (b = 1 - f, c = e) : (b = e, c = 1 - f), g.zIndex = a.level + 1, g.left = 100 * b + "%", g.right = 100 * c + "%", d && a.forwardPressure && (g[this.isRTL ? "marginLeft" : "marginRight"] = 20), g;
    }
  });
  var ob = Pa.View = ra.extend({
    type: null,
    name: null,
    title: null,
    calendar: null,
    options: null,
    el: null,
    displaying: null,
    isSkeletonRendered: !1,
    isEventsRendered: !1,
    start: null,
    end: null,
    intervalStart: null,
    intervalEnd: null,
    intervalDuration: null,
    intervalUnit: null,
    isRTL: !1,
    isSelected: !1,
    eventOrderSpecs: null,
    scrollerEl: null,
    scrollTop: null,
    widgetHeaderClass: null,
    widgetContentClass: null,
    highlightStateClass: null,
    nextDayThreshold: null,
    isHiddenDayHash: null,
    documentMousedownProxy: null,
    isNowIndicatorRendered: null,
    initialNowDate: null,
    initialNowQueriedMs: null,
    nowIndicatorTimeoutID: null,
    nowIndicatorIntervalID: null,
    constructor: function constructor(a, c, d, e) {
      this.calendar = a, this.type = this.name = c, this.options = d, this.intervalDuration = e || b.duration(1, "day"), this.nextDayThreshold = b.duration(this.opt("nextDayThreshold")), this.initThemingProps(), this.initHiddenDays(), this.isRTL = this.opt("isRTL"), this.eventOrderSpecs = A(this.opt("eventOrder")), this.documentMousedownProxy = ca(this, "documentMousedown"), this.initialize();
    },
    initialize: function initialize() {},
    opt: function opt(a) {
      return this.options[a];
    },
    trigger: function trigger(a, b) {
      var c = this.calendar;
      return c.trigger.apply(c, [a, b || this].concat(Array.prototype.slice.call(arguments, 2), [this]));
    },
    setDate: function setDate(a) {
      this.setRange(this.computeRange(a));
    },
    setRange: function setRange(b) {
      a.extend(this, b), this.updateTitle();
    },
    computeRange: function computeRange(a) {
      var b,
          c,
          d = I(this.intervalDuration),
          e = a.clone().startOf(d),
          f = e.clone().add(this.intervalDuration);
      return /year|month|week|day/.test(d) ? (e.stripTime(), f.stripTime()) : (e.hasTime() || (e = this.calendar.time(0)), f.hasTime() || (f = this.calendar.time(0))), b = e.clone(), b = this.skipHiddenDays(b), c = f.clone(), c = this.skipHiddenDays(c, -1, !0), {
        intervalUnit: d,
        intervalStart: e,
        intervalEnd: f,
        start: b,
        end: c
      };
    },
    computePrevDate: function computePrevDate(a) {
      return this.massageCurrentDate(a.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1);
    },
    computeNextDate: function computeNextDate(a) {
      return this.massageCurrentDate(a.clone().startOf(this.intervalUnit).add(this.intervalDuration));
    },
    massageCurrentDate: function massageCurrentDate(a, b) {
      return this.intervalDuration.as("days") <= 1 && this.isHiddenDay(a) && (a = this.skipHiddenDays(a, b), a.startOf("day")), a;
    },
    updateTitle: function updateTitle() {
      this.title = this.computeTitle();
    },
    computeTitle: function computeTitle() {
      return this.formatRange({
        start: this.calendar.applyTimezone(this.intervalStart),
        end: this.calendar.applyTimezone(this.intervalEnd)
      }, this.opt("titleFormat") || this.computeTitleFormat(), this.opt("titleRangeSeparator"));
    },
    computeTitleFormat: function computeTitleFormat() {
      return "year" == this.intervalUnit ? "YYYY" : "month" == this.intervalUnit ? this.opt("monthYearFormat") : this.intervalDuration.as("days") > 1 ? "ll" : "LL";
    },
    formatRange: function formatRange(a, b, c) {
      var d = a.end;
      return d.hasTime() || (d = d.clone().subtract(1)), ma(a.start, d, b, c, this.opt("isRTL"));
    },
    setElement: function setElement(a) {
      this.el = a, this.bindGlobalHandlers();
    },
    removeElement: function removeElement() {
      this.clear(), this.isSkeletonRendered && (this.unrenderSkeleton(), this.isSkeletonRendered = !1), this.unbindGlobalHandlers(), this.el.remove();
    },
    display: function display(b) {
      var c = this,
          d = null;
      return this.displaying && (d = this.queryScroll()), this.calendar.freezeContentHeight(), this.clear().then(function () {
        return c.displaying = a.when(c.displayView(b)).then(function () {
          c.forceScroll(c.computeInitialScroll(d)), c.calendar.unfreezeContentHeight(), c.triggerRender();
        });
      });
    },
    clear: function clear() {
      var b = this,
          c = this.displaying;
      return c ? c.then(function () {
        return b.displaying = null, b.clearEvents(), b.clearView();
      }) : a.when();
    },
    displayView: function displayView(a) {
      this.isSkeletonRendered || (this.renderSkeleton(), this.isSkeletonRendered = !0), a && this.setDate(a), this.render && this.render(), this.renderDates(), this.updateSize(), this.renderBusinessHours(), this.startNowIndicator();
    },
    clearView: function clearView() {
      this.unselect(), this.stopNowIndicator(), this.triggerUnrender(), this.unrenderBusinessHours(), this.unrenderDates(), this.destroy && this.destroy();
    },
    renderSkeleton: function renderSkeleton() {},
    unrenderSkeleton: function unrenderSkeleton() {},
    renderDates: function renderDates() {},
    unrenderDates: function unrenderDates() {},
    triggerRender: function triggerRender() {
      this.trigger("viewRender", this, this, this.el);
    },
    triggerUnrender: function triggerUnrender() {
      this.trigger("viewDestroy", this, this, this.el);
    },
    bindGlobalHandlers: function bindGlobalHandlers() {
      a(document).on("mousedown", this.documentMousedownProxy);
    },
    unbindGlobalHandlers: function unbindGlobalHandlers() {
      a(document).off("mousedown", this.documentMousedownProxy);
    },
    initThemingProps: function initThemingProps() {
      var a = this.opt("theme") ? "ui" : "fc";
      this.widgetHeaderClass = a + "-widget-header", this.widgetContentClass = a + "-widget-content", this.highlightStateClass = a + "-state-highlight";
    },
    renderBusinessHours: function renderBusinessHours() {},
    unrenderBusinessHours: function unrenderBusinessHours() {},
    startNowIndicator: function startNowIndicator() {
      var a,
          c,
          d,
          e = this;
      this.opt("nowIndicator") && (a = this.getNowIndicatorUnit(), a && (c = ca(this, "updateNowIndicator"), this.initialNowDate = this.calendar.getNow(), this.initialNowQueriedMs = +new Date(), this.renderNowIndicator(this.initialNowDate), this.isNowIndicatorRendered = !0, d = this.initialNowDate.clone().startOf(a).add(1, a) - this.initialNowDate, this.nowIndicatorTimeoutID = setTimeout(function () {
        e.nowIndicatorTimeoutID = null, c(), d = +b.duration(1, a), d = Math.max(100, d), e.nowIndicatorIntervalID = setInterval(c, d);
      }, d)));
    },
    updateNowIndicator: function updateNowIndicator() {
      this.isNowIndicatorRendered && (this.unrenderNowIndicator(), this.renderNowIndicator(this.initialNowDate.clone().add(new Date() - this.initialNowQueriedMs)));
    },
    stopNowIndicator: function stopNowIndicator() {
      this.isNowIndicatorRendered && (this.nowIndicatorTimeoutID && (clearTimeout(this.nowIndicatorTimeoutID), this.nowIndicatorTimeoutID = null), this.nowIndicatorIntervalID && (clearTimeout(this.nowIndicatorIntervalID), this.nowIndicatorIntervalID = null), this.unrenderNowIndicator(), this.isNowIndicatorRendered = !1);
    },
    getNowIndicatorUnit: function getNowIndicatorUnit() {},
    renderNowIndicator: function renderNowIndicator(a) {},
    unrenderNowIndicator: function unrenderNowIndicator() {},
    updateSize: function updateSize(a) {
      var b;
      a && (b = this.queryScroll()), this.updateHeight(a), this.updateWidth(a), this.updateNowIndicator(), a && this.setScroll(b);
    },
    updateWidth: function updateWidth(a) {},
    updateHeight: function updateHeight(a) {
      var b = this.calendar;
      this.setHeight(b.getSuggestedViewHeight(), b.isHeightAuto());
    },
    setHeight: function setHeight(a, b) {},
    computeScrollerHeight: function computeScrollerHeight(a) {
      var b,
          c,
          d = this.scrollerEl;
      return b = this.el.add(d), b.css({
        position: "relative",
        left: -1
      }), c = this.el.outerHeight() - d.height(), b.css({
        position: "",
        left: ""
      }), a - c;
    },
    computeInitialScroll: function computeInitialScroll(a) {
      return 0;
    },
    queryScroll: function queryScroll() {
      return this.scrollerEl ? this.scrollerEl.scrollTop() : void 0;
    },
    setScroll: function setScroll(a) {
      return this.scrollerEl ? this.scrollerEl.scrollTop(a) : void 0;
    },
    forceScroll: function forceScroll(a) {
      var b = this;
      this.setScroll(a), setTimeout(function () {
        b.setScroll(a);
      }, 0);
    },
    displayEvents: function displayEvents(a) {
      var b = this.queryScroll();
      this.clearEvents(), this.renderEvents(a), this.isEventsRendered = !0, this.setScroll(b), this.triggerEventRender();
    },
    clearEvents: function clearEvents() {
      var a;
      this.isEventsRendered && (a = this.queryScroll(), this.triggerEventUnrender(), this.destroyEvents && this.destroyEvents(), this.unrenderEvents(), this.setScroll(a), this.isEventsRendered = !1);
    },
    renderEvents: function renderEvents(a) {},
    unrenderEvents: function unrenderEvents() {},
    triggerEventRender: function triggerEventRender() {
      this.renderedEventSegEach(function (a) {
        this.trigger("eventAfterRender", a.event, a.event, a.el);
      }), this.trigger("eventAfterAllRender");
    },
    triggerEventUnrender: function triggerEventUnrender() {
      this.renderedEventSegEach(function (a) {
        this.trigger("eventDestroy", a.event, a.event, a.el);
      });
    },
    resolveEventEl: function resolveEventEl(b, c) {
      var d = this.trigger("eventRender", b, b, c);
      return d === !1 ? c = null : d && d !== !0 && (c = a(d)), c;
    },
    showEvent: function showEvent(a) {
      this.renderedEventSegEach(function (a) {
        a.el.css("visibility", "");
      }, a);
    },
    hideEvent: function hideEvent(a) {
      this.renderedEventSegEach(function (a) {
        a.el.css("visibility", "hidden");
      }, a);
    },
    renderedEventSegEach: function renderedEventSegEach(a, b) {
      var c,
          d = this.getEventSegs();

      for (c = 0; c < d.length; c++) {
        b && d[c].event._id !== b._id || d[c].el && a.call(this, d[c]);
      }
    },
    getEventSegs: function getEventSegs() {
      return [];
    },
    isEventDraggable: function isEventDraggable(a) {
      var b = a.source || {};
      return X(a.startEditable, b.startEditable, this.opt("eventStartEditable"), a.editable, b.editable, this.opt("editable"));
    },
    reportEventDrop: function reportEventDrop(a, b, c, d, e) {
      var f = this.calendar,
          g = f.mutateEvent(a, b, c),
          h = function h() {
        g.undo(), f.reportEventChange();
      };

      this.triggerEventDrop(a, g.dateDelta, h, d, e), f.reportEventChange();
    },
    triggerEventDrop: function triggerEventDrop(a, b, c, d, e) {
      this.trigger("eventDrop", d[0], a, b, c, e, {});
    },
    reportExternalDrop: function reportExternalDrop(b, c, d, e, f) {
      var g,
          h,
          i = b.eventProps;
      i && (g = a.extend({}, i, c), h = this.calendar.renderEvent(g, b.stick)[0]), this.triggerExternalDrop(h, c, d, e, f);
    },
    triggerExternalDrop: function triggerExternalDrop(a, b, c, d, e) {
      this.trigger("drop", c[0], b.start, d, e), a && this.trigger("eventReceive", null, a);
    },
    renderDrag: function renderDrag(a, b) {},
    unrenderDrag: function unrenderDrag() {},
    isEventResizableFromStart: function isEventResizableFromStart(a) {
      return this.opt("eventResizableFromStart") && this.isEventResizable(a);
    },
    isEventResizableFromEnd: function isEventResizableFromEnd(a) {
      return this.isEventResizable(a);
    },
    isEventResizable: function isEventResizable(a) {
      var b = a.source || {};
      return X(a.durationEditable, b.durationEditable, this.opt("eventDurationEditable"), a.editable, b.editable, this.opt("editable"));
    },
    reportEventResize: function reportEventResize(a, b, c, d, e) {
      var f = this.calendar,
          g = f.mutateEvent(a, b, c),
          h = function h() {
        g.undo(), f.reportEventChange();
      };

      this.triggerEventResize(a, g.durationDelta, h, d, e), f.reportEventChange();
    },
    triggerEventResize: function triggerEventResize(a, b, c, d, e) {
      this.trigger("eventResize", d[0], a, b, c, e, {});
    },
    select: function select(a, b) {
      this.unselect(b), this.renderSelection(a), this.reportSelection(a, b);
    },
    renderSelection: function renderSelection(a) {},
    reportSelection: function reportSelection(a, b) {
      this.isSelected = !0, this.triggerSelect(a, b);
    },
    triggerSelect: function triggerSelect(a, b) {
      this.trigger("select", null, this.calendar.applyTimezone(a.start), this.calendar.applyTimezone(a.end), b);
    },
    unselect: function unselect(a) {
      this.isSelected && (this.isSelected = !1, this.destroySelection && this.destroySelection(), this.unrenderSelection(), this.trigger("unselect", null, a));
    },
    unrenderSelection: function unrenderSelection() {},
    documentMousedown: function documentMousedown(b) {
      var c;
      this.isSelected && this.opt("unselectAuto") && v(b) && (c = this.opt("unselectCancel"), c && a(b.target).closest(c).length || this.unselect(b));
    },
    triggerDayClick: function triggerDayClick(a, b, c) {
      this.trigger("dayClick", b, this.calendar.applyTimezone(a.start), c);
    },
    initHiddenDays: function initHiddenDays() {
      var b,
          c = this.opt("hiddenDays") || [],
          d = [],
          e = 0;

      for (this.opt("weekends") === !1 && c.push(0, 6), b = 0; 7 > b; b++) {
        (d[b] = -1 !== a.inArray(b, c)) || e++;
      }

      if (!e) throw "invalid hiddenDays";
      this.isHiddenDayHash = d;
    },
    isHiddenDay: function isHiddenDay(a) {
      return b.isMoment(a) && (a = a.day()), this.isHiddenDayHash[a];
    },
    skipHiddenDays: function skipHiddenDays(a, b, c) {
      var d = a.clone();

      for (b = b || 1; this.isHiddenDayHash[(d.day() + (c ? b : 0) + 7) % 7];) {
        d.add(b, "days");
      }

      return d;
    },
    computeDayRange: function computeDayRange(a) {
      var b,
          c = a.start.clone().stripTime(),
          d = a.end,
          e = null;
      return d && (e = d.clone().stripTime(), b = +d.time(), b && b >= this.nextDayThreshold && e.add(1, "days")), (!d || c >= e) && (e = c.clone().add(1, "days")), {
        start: c,
        end: e
      };
    },
    isMultiDayEvent: function isMultiDayEvent(a) {
      var b = this.computeDayRange(a);
      return b.end.diff(b.start, "days") > 1;
    }
  }),
      pb = Pa.Calendar = ra.extend({
    dirDefaults: null,
    langDefaults: null,
    overrides: null,
    options: null,
    viewSpecCache: null,
    view: null,
    header: null,
    loadingLevel: 0,
    constructor: Ja,
    initialize: function initialize() {},
    initOptions: function initOptions(a) {
      var b, e, f, g;
      a = d(a), b = a.lang, e = qb[b], e || (b = pb.defaults.lang, e = qb[b] || {}), f = X(a.isRTL, e.isRTL, pb.defaults.isRTL), g = f ? pb.rtlDefaults : {}, this.dirDefaults = g, this.langDefaults = e, this.overrides = a, this.options = c([pb.defaults, g, e, a]), Ka(this.options), this.viewSpecCache = {};
    },
    getViewSpec: function getViewSpec(a) {
      var b = this.viewSpecCache;
      return b[a] || (b[a] = this.buildViewSpec(a));
    },
    getUnitViewSpec: function getUnitViewSpec(b) {
      var c, d, e;
      if (-1 != a.inArray(b, Ua)) for (c = this.header.getViewsWithButtons(), a.each(Pa.views, function (a) {
        c.push(a);
      }), d = 0; d < c.length; d++) {
        if (e = this.getViewSpec(c[d]), e && e.singleUnit == b) return e;
      }
    },
    buildViewSpec: function buildViewSpec(a) {
      for (var d, e, f, g, h = this.overrides.views || {}, i = [], j = [], k = [], l = a; l;) {
        d = Qa[l], e = h[l], l = null, "function" == typeof d && (d = {
          "class": d
        }), d && (i.unshift(d), j.unshift(d.defaults || {}), f = f || d.duration, l = l || d.type), e && (k.unshift(e), f = f || e.duration, l = l || e.type);
      }

      return d = Q(i), d.type = a, d["class"] ? (f && (f = b.duration(f), f.valueOf() && (d.duration = f, g = I(f), 1 === f.as(g) && (d.singleUnit = g, k.unshift(h[g] || {})))), d.defaults = c(j), d.overrides = c(k), this.buildViewSpecOptions(d), this.buildViewSpecButtonText(d, a), d) : !1;
    },
    buildViewSpecOptions: function buildViewSpecOptions(a) {
      a.options = c([pb.defaults, a.defaults, this.dirDefaults, this.langDefaults, this.overrides, a.overrides]), Ka(a.options);
    },
    buildViewSpecButtonText: function buildViewSpecButtonText(a, b) {
      function c(c) {
        var d = c.buttonText || {};
        return d[b] || (a.singleUnit ? d[a.singleUnit] : null);
      }

      a.buttonTextOverride = c(this.overrides) || a.overrides.buttonText, a.buttonTextDefault = c(this.langDefaults) || c(this.dirDefaults) || a.defaults.buttonText || c(pb.defaults) || (a.duration ? this.humanizeDuration(a.duration) : null) || b;
    },
    instantiateView: function instantiateView(a) {
      var b = this.getViewSpec(a);
      return new b["class"](this, a, b.options, b.duration);
    },
    isValidViewType: function isValidViewType(a) {
      return Boolean(this.getViewSpec(a));
    },
    pushLoading: function pushLoading() {
      this.loadingLevel++ || this.trigger("loading", null, !0, this.view);
    },
    popLoading: function popLoading() {
      --this.loadingLevel || this.trigger("loading", null, !1, this.view);
    },
    buildSelectSpan: function buildSelectSpan(a, b) {
      var c,
          d = this.moment(a).stripZone();
      return c = b ? this.moment(b).stripZone() : d.hasTime() ? d.clone().add(this.defaultTimedEventDuration) : d.clone().add(this.defaultAllDayEventDuration), {
        start: d,
        end: c
      };
    }
  });
  pb.mixin(eb), pb.defaults = {
    titleRangeSeparator: " — ",
    monthYearFormat: "MMMM YYYY",
    defaultTimedEventDuration: "02:00:00",
    defaultAllDayEventDuration: {
      days: 1
    },
    forceEventDuration: !1,
    nextDayThreshold: "09:00:00",
    defaultView: "month",
    aspectRatio: 1.35,
    header: {
      left: "title",
      center: "",
      right: "today prev,next"
    },
    weekends: !0,
    weekNumbers: !1,
    weekNumberTitle: "W",
    weekNumberCalculation: "local",
    scrollTime: "06:00:00",
    lazyFetching: !0,
    startParam: "start",
    endParam: "end",
    timezoneParam: "timezone",
    timezone: !1,
    isRTL: !1,
    buttonText: {
      prev: "prev",
      next: "next",
      prevYear: "prev year",
      nextYear: "next year",
      year: "year",
      today: "today",
      month: "month",
      week: "week",
      day: "day"
    },
    buttonIcons: {
      prev: "left-single-arrow",
      next: "right-single-arrow",
      prevYear: "left-double-arrow",
      nextYear: "right-double-arrow"
    },
    theme: !1,
    themeButtonIcons: {
      prev: "circle-triangle-w",
      next: "circle-triangle-e",
      prevYear: "seek-prev",
      nextYear: "seek-next"
    },
    dragOpacity: .75,
    dragRevertDuration: 500,
    dragScroll: !0,
    unselectAuto: !0,
    dropAccept: "*",
    eventOrder: "title",
    eventLimit: !1,
    eventLimitText: "more",
    eventLimitClick: "popover",
    dayPopoverFormat: "LL",
    handleWindowResize: !0,
    windowResizeDelay: 200
  }, pb.englishDefaults = {
    dayPopoverFormat: "dddd, MMMM D"
  }, pb.rtlDefaults = {
    header: {
      left: "next,prev today",
      center: "",
      right: "title"
    },
    buttonIcons: {
      prev: "right-single-arrow",
      next: "left-single-arrow",
      prevYear: "right-double-arrow",
      nextYear: "left-double-arrow"
    },
    themeButtonIcons: {
      prev: "circle-triangle-e",
      next: "circle-triangle-w",
      nextYear: "seek-prev",
      prevYear: "seek-next"
    }
  };
  var qb = Pa.langs = {};
  Pa.datepickerLang = function (b, c, d) {
    var e = qb[b] || (qb[b] = {});
    e.isRTL = d.isRTL, e.weekNumberTitle = d.weekHeader, a.each(rb, function (a, b) {
      e[a] = b(d);
    }), a.datepicker && (a.datepicker.regional[c] = a.datepicker.regional[b] = d, a.datepicker.regional.en = a.datepicker.regional[""], a.datepicker.setDefaults(d));
  }, Pa.lang = function (b, d) {
    var e, f;
    e = qb[b] || (qb[b] = {}), d && (e = qb[b] = c([e, d])), f = La(b), a.each(sb, function (a, b) {
      null == e[a] && (e[a] = b(f, e));
    }), pb.defaults.lang = b;
  };
  var rb = {
    buttonText: function buttonText(a) {
      return {
        prev: Z(a.prevText),
        next: Z(a.nextText),
        today: Z(a.currentText)
      };
    },
    monthYearFormat: function monthYearFormat(a) {
      return a.showMonthAfterYear ? "YYYY[" + a.yearSuffix + "] MMMM" : "MMMM YYYY[" + a.yearSuffix + "]";
    }
  },
      sb = {
    dayOfMonthFormat: function dayOfMonthFormat(a, b) {
      var c = a.longDateFormat("l");
      return c = c.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), b.isRTL ? c += " ddd" : c = "ddd " + c, c;
    },
    mediumTimeFormat: function mediumTimeFormat(a) {
      return a.longDateFormat("LT").replace(/\s*a$/i, "a");
    },
    smallTimeFormat: function smallTimeFormat(a) {
      return a.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a");
    },
    extraSmallTimeFormat: function extraSmallTimeFormat(a) {
      return a.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t");
    },
    hourFormat: function hourFormat(a) {
      return a.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a");
    },
    noMeridiemTimeFormat: function noMeridiemTimeFormat(a) {
      return a.longDateFormat("LT").replace(/\s*a$/i, "");
    }
  },
      tb = {
    smallDayDateFormat: function smallDayDateFormat(a) {
      return a.isRTL ? "D dd" : "dd D";
    },
    weekFormat: function weekFormat(a) {
      return a.isRTL ? "w[ " + a.weekNumberTitle + "]" : "[" + a.weekNumberTitle + " ]w";
    },
    smallWeekFormat: function smallWeekFormat(a) {
      return a.isRTL ? "w[" + a.weekNumberTitle + "]" : "[" + a.weekNumberTitle + "]w";
    }
  };
  Pa.lang("en", pb.englishDefaults), Pa.sourceNormalizers = [], Pa.sourceFetchers = [];
  var ub = {
    dataType: "json",
    cache: !1
  },
      vb = 1;

  pb.prototype.getPeerEvents = function (a, b) {
    var c,
        d,
        e = this.getEventCache(),
        f = [];

    for (c = 0; c < e.length; c++) {
      d = e[c], b && b._id === d._id || f.push(d);
    }

    return f;
  };

  var wb = Pa.BasicView = ob.extend({
    dayGridClass: mb,
    dayGrid: null,
    dayNumbersVisible: !1,
    weekNumbersVisible: !1,
    weekNumberWidth: null,
    headContainerEl: null,
    headRowEl: null,
    initialize: function initialize() {
      this.dayGrid = this.instantiateDayGrid();
    },
    instantiateDayGrid: function instantiateDayGrid() {
      var a = this.dayGridClass.extend(xb);
      return new a(this);
    },
    setRange: function setRange(a) {
      ob.prototype.setRange.call(this, a), this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit), this.dayGrid.setRange(a);
    },
    computeRange: function computeRange(a) {
      var b = ob.prototype.computeRange.call(this, a);
      return /year|month/.test(b.intervalUnit) && (b.start.startOf("week"), b.start = this.skipHiddenDays(b.start), b.end.weekday() && (b.end.add(1, "week").startOf("week"), b.end = this.skipHiddenDays(b.end, -1, !0))), b;
    },
    renderDates: function renderDates() {
      this.dayNumbersVisible = this.dayGrid.rowCnt > 1, this.weekNumbersVisible = this.opt("weekNumbers"), this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible, this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-day-grid-container"), this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(this.hasRigidRows());
    },
    renderHead: function renderHead() {
      this.headContainerEl = this.el.find(".fc-head-container").html(this.dayGrid.renderHeadHtml()), this.headRowEl = this.headContainerEl.find(".fc-row");
    },
    unrenderDates: function unrenderDates() {
      this.dayGrid.unrenderDates(), this.dayGrid.removeElement();
    },
    renderBusinessHours: function renderBusinessHours() {
      this.dayGrid.renderBusinessHours();
    },
    renderSkeletonHtml: function renderSkeletonHtml() {
      return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '"><div class="fc-day-grid-container"><div class="fc-day-grid"/></div></td></tr></tbody></table>';
    },
    weekNumberStyleAttr: function weekNumberStyleAttr() {
      return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : "";
    },
    hasRigidRows: function hasRigidRows() {
      var a = this.opt("eventLimit");
      return a && "number" != typeof a;
    },
    updateWidth: function updateWidth() {
      this.weekNumbersVisible && (this.weekNumberWidth = k(this.el.find(".fc-week-number")));
    },
    setHeight: function setHeight(a, b) {
      var c,
          d = this.opt("eventLimit");
      m(this.scrollerEl), f(this.headRowEl), this.dayGrid.removeSegPopover(), d && "number" == typeof d && this.dayGrid.limitRows(d), c = this.computeScrollerHeight(a), this.setGridHeight(c, b), d && "number" != typeof d && this.dayGrid.limitRows(d), !b && l(this.scrollerEl, c) && (e(this.headRowEl, r(this.scrollerEl)), c = this.computeScrollerHeight(a), this.scrollerEl.height(c));
    },
    setGridHeight: function setGridHeight(a, b) {
      b ? j(this.dayGrid.rowEls) : i(this.dayGrid.rowEls, a, !0);
    },
    prepareHits: function prepareHits() {
      this.dayGrid.prepareHits();
    },
    releaseHits: function releaseHits() {
      this.dayGrid.releaseHits();
    },
    queryHit: function queryHit(a, b) {
      return this.dayGrid.queryHit(a, b);
    },
    getHitSpan: function getHitSpan(a) {
      return this.dayGrid.getHitSpan(a);
    },
    getHitEl: function getHitEl(a) {
      return this.dayGrid.getHitEl(a);
    },
    renderEvents: function renderEvents(a) {
      this.dayGrid.renderEvents(a), this.updateHeight();
    },
    getEventSegs: function getEventSegs() {
      return this.dayGrid.getEventSegs();
    },
    unrenderEvents: function unrenderEvents() {
      this.dayGrid.unrenderEvents();
    },
    renderDrag: function renderDrag(a, b) {
      return this.dayGrid.renderDrag(a, b);
    },
    unrenderDrag: function unrenderDrag() {
      this.dayGrid.unrenderDrag();
    },
    renderSelection: function renderSelection(a) {
      this.dayGrid.renderSelection(a);
    },
    unrenderSelection: function unrenderSelection() {
      this.dayGrid.unrenderSelection();
    }
  }),
      xb = {
    renderHeadIntroHtml: function renderHeadIntroHtml() {
      var a = this.view;
      return a.weekNumbersVisible ? '<th class="fc-week-number ' + a.widgetHeaderClass + '" ' + a.weekNumberStyleAttr() + "><span>" + Y(a.opt("weekNumberTitle")) + "</span></th>" : "";
    },
    renderNumberIntroHtml: function renderNumberIntroHtml(a) {
      var b = this.view;
      return b.weekNumbersVisible ? '<td class="fc-week-number" ' + b.weekNumberStyleAttr() + "><span>" + this.getCellDate(a, 0).format("w") + "</span></td>" : "";
    },
    renderBgIntroHtml: function renderBgIntroHtml() {
      var a = this.view;
      return a.weekNumbersVisible ? '<td class="fc-week-number ' + a.widgetContentClass + '" ' + a.weekNumberStyleAttr() + "></td>" : "";
    },
    renderIntroHtml: function renderIntroHtml() {
      var a = this.view;
      return a.weekNumbersVisible ? '<td class="fc-week-number" ' + a.weekNumberStyleAttr() + "></td>" : "";
    }
  },
      yb = Pa.MonthView = wb.extend({
    computeRange: function computeRange(a) {
      var b,
          c = wb.prototype.computeRange.call(this, a);
      return this.isFixedWeeks() && (b = Math.ceil(c.end.diff(c.start, "weeks", !0)), c.end.add(6 - b, "weeks")), c;
    },
    setGridHeight: function setGridHeight(a, b) {
      b = b || "variable" === this.opt("weekMode"), b && (a *= this.rowCnt / 6), i(this.dayGrid.rowEls, a, !b);
    },
    isFixedWeeks: function isFixedWeeks() {
      var a = this.opt("weekMode");
      return a ? "fixed" === a : this.opt("fixedWeekCount");
    }
  });
  Qa.basic = {
    "class": wb
  }, Qa.basicDay = {
    type: "basic",
    duration: {
      days: 1
    }
  }, Qa.basicWeek = {
    type: "basic",
    duration: {
      weeks: 1
    }
  }, Qa.month = {
    "class": yb,
    duration: {
      months: 1
    },
    defaults: {
      fixedWeekCount: !0
    }
  };
  var zb = Pa.AgendaView = ob.extend({
    timeGridClass: nb,
    timeGrid: null,
    dayGridClass: mb,
    dayGrid: null,
    axisWidth: null,
    headContainerEl: null,
    noScrollRowEls: null,
    bottomRuleEl: null,
    bottomRuleHeight: null,
    initialize: function initialize() {
      this.timeGrid = this.instantiateTimeGrid(), this.opt("allDaySlot") && (this.dayGrid = this.instantiateDayGrid());
    },
    instantiateTimeGrid: function instantiateTimeGrid() {
      var a = this.timeGridClass.extend(Ab);
      return new a(this);
    },
    instantiateDayGrid: function instantiateDayGrid() {
      var a = this.dayGridClass.extend(Bb);
      return new a(this);
    },
    setRange: function setRange(a) {
      ob.prototype.setRange.call(this, a), this.timeGrid.setRange(a), this.dayGrid && this.dayGrid.setRange(a);
    },
    renderDates: function renderDates() {
      this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-time-grid-container"), this.timeGrid.setElement(this.el.find(".fc-time-grid")), this.timeGrid.renderDates(), this.bottomRuleEl = a('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>').appendTo(this.timeGrid.el), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight()), this.noScrollRowEls = this.el.find(".fc-row:not(.fc-scroller *)");
    },
    renderHead: function renderHead() {
      this.headContainerEl = this.el.find(".fc-head-container").html(this.timeGrid.renderHeadHtml());
    },
    unrenderDates: function unrenderDates() {
      this.timeGrid.unrenderDates(), this.timeGrid.removeElement(), this.dayGrid && (this.dayGrid.unrenderDates(), this.dayGrid.removeElement());
    },
    renderSkeletonHtml: function renderSkeletonHtml() {
      return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + this.widgetHeaderClass + '"/>' : "") + '<div class="fc-time-grid-container"><div class="fc-time-grid"/></div></td></tr></tbody></table>';
    },
    axisStyleAttr: function axisStyleAttr() {
      return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : "";
    },
    renderBusinessHours: function renderBusinessHours() {
      this.timeGrid.renderBusinessHours(), this.dayGrid && this.dayGrid.renderBusinessHours();
    },
    unrenderBusinessHours: function unrenderBusinessHours() {
      this.timeGrid.unrenderBusinessHours(), this.dayGrid && this.dayGrid.unrenderBusinessHours();
    },
    getNowIndicatorUnit: function getNowIndicatorUnit() {
      return this.timeGrid.getNowIndicatorUnit();
    },
    renderNowIndicator: function renderNowIndicator(a) {
      this.timeGrid.renderNowIndicator(a);
    },
    unrenderNowIndicator: function unrenderNowIndicator() {
      this.timeGrid.unrenderNowIndicator();
    },
    updateSize: function updateSize(a) {
      this.timeGrid.updateSize(a), ob.prototype.updateSize.call(this, a);
    },
    updateWidth: function updateWidth() {
      this.axisWidth = k(this.el.find(".fc-axis"));
    },
    setHeight: function setHeight(a, b) {
      var c, d;
      null === this.bottomRuleHeight && (this.bottomRuleHeight = this.bottomRuleEl.outerHeight()), this.bottomRuleEl.hide(), this.scrollerEl.css("overflow", ""), m(this.scrollerEl), f(this.noScrollRowEls), this.dayGrid && (this.dayGrid.removeSegPopover(), c = this.opt("eventLimit"), c && "number" != typeof c && (c = Cb), c && this.dayGrid.limitRows(c)), b || (d = this.computeScrollerHeight(a), l(this.scrollerEl, d) ? (e(this.noScrollRowEls, r(this.scrollerEl)), d = this.computeScrollerHeight(a), this.scrollerEl.height(d)) : (this.scrollerEl.height(d).css("overflow", "hidden"), this.bottomRuleEl.show()));
    },
    computeInitialScroll: function computeInitialScroll() {
      var a = b.duration(this.opt("scrollTime")),
          c = this.timeGrid.computeTimeTop(a);
      return c = Math.ceil(c), c && c++, c;
    },
    prepareHits: function prepareHits() {
      this.timeGrid.prepareHits(), this.dayGrid && this.dayGrid.prepareHits();
    },
    releaseHits: function releaseHits() {
      this.timeGrid.releaseHits(), this.dayGrid && this.dayGrid.releaseHits();
    },
    queryHit: function queryHit(a, b) {
      var c = this.timeGrid.queryHit(a, b);
      return !c && this.dayGrid && (c = this.dayGrid.queryHit(a, b)), c;
    },
    getHitSpan: function getHitSpan(a) {
      return a.component.getHitSpan(a);
    },
    getHitEl: function getHitEl(a) {
      return a.component.getHitEl(a);
    },
    renderEvents: function renderEvents(a) {
      var b,
          c,
          d = [],
          e = [],
          f = [];

      for (c = 0; c < a.length; c++) {
        a[c].allDay ? d.push(a[c]) : e.push(a[c]);
      }

      b = this.timeGrid.renderEvents(e), this.dayGrid && (f = this.dayGrid.renderEvents(d)), this.updateHeight();
    },
    getEventSegs: function getEventSegs() {
      return this.timeGrid.getEventSegs().concat(this.dayGrid ? this.dayGrid.getEventSegs() : []);
    },
    unrenderEvents: function unrenderEvents() {
      this.timeGrid.unrenderEvents(), this.dayGrid && this.dayGrid.unrenderEvents();
    },
    renderDrag: function renderDrag(a, b) {
      return a.start.hasTime() ? this.timeGrid.renderDrag(a, b) : this.dayGrid ? this.dayGrid.renderDrag(a, b) : void 0;
    },
    unrenderDrag: function unrenderDrag() {
      this.timeGrid.unrenderDrag(), this.dayGrid && this.dayGrid.unrenderDrag();
    },
    renderSelection: function renderSelection(a) {
      a.start.hasTime() || a.end.hasTime() ? this.timeGrid.renderSelection(a) : this.dayGrid && this.dayGrid.renderSelection(a);
    },
    unrenderSelection: function unrenderSelection() {
      this.timeGrid.unrenderSelection(), this.dayGrid && this.dayGrid.unrenderSelection();
    }
  }),
      Ab = {
    renderHeadIntroHtml: function renderHeadIntroHtml() {
      var a,
          b = this.view;
      return b.opt("weekNumbers") ? (a = this.start.format(b.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + b.widgetHeaderClass + '" ' + b.axisStyleAttr() + "><span>" + Y(a) + "</span></th>") : '<th class="fc-axis ' + b.widgetHeaderClass + '" ' + b.axisStyleAttr() + "></th>";
    },
    renderBgIntroHtml: function renderBgIntroHtml() {
      var a = this.view;
      return '<td class="fc-axis ' + a.widgetContentClass + '" ' + a.axisStyleAttr() + "></td>";
    },
    renderIntroHtml: function renderIntroHtml() {
      var a = this.view;
      return '<td class="fc-axis" ' + a.axisStyleAttr() + "></td>";
    }
  },
      Bb = {
    renderBgIntroHtml: function renderBgIntroHtml() {
      var a = this.view;
      return '<td class="fc-axis ' + a.widgetContentClass + '" ' + a.axisStyleAttr() + "><span>" + (a.opt("allDayHtml") || Y(a.opt("allDayText"))) + "</span></td>";
    },
    renderIntroHtml: function renderIntroHtml() {
      var a = this.view;
      return '<td class="fc-axis" ' + a.axisStyleAttr() + "></td>";
    }
  },
      Cb = 5,
      Db = [{
    hours: 1
  }, {
    minutes: 30
  }, {
    minutes: 15
  }, {
    seconds: 30
  }, {
    seconds: 15
  }];
  return Qa.agenda = {
    "class": zb,
    defaults: {
      allDaySlot: !0,
      allDayText: "all-day",
      slotDuration: "00:30:00",
      minTime: "00:00:00",
      maxTime: "24:00:00",
      slotEventOverlap: !0
    }
  }, Qa.agendaDay = {
    type: "agenda",
    duration: {
      days: 1
    }
  }, Qa.agendaWeek = {
    type: "agenda",
    duration: {
      weeks: 1
    }
  }, Pa;
});

/***/ }),

/***/ "./assets/js/jquery-ui.custom.min.js":
/*!*******************************************!*\
  !*** ./assets/js/jquery-ui.custom.min.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

/*! jQuery UI - v1.11.4 - 2015-09-20
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, slider.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
!function (a) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (a) {
  function b(b, d) {
    var e,
        f,
        g,
        h = b.nodeName.toLowerCase();
    return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap='#" + f + "']")[0], !!g && c(g)) : !1) : (/^(input|select|textarea|button|object)$/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b);
  }

  function c(b) {
    return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
      return "hidden" === a.css(this, "visibility");
    }).length;
  }

  a.ui = a.ui || {}, a.extend(a.ui, {
    version: "1.11.4",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  }), a.fn.extend({
    scrollParent: function scrollParent(b) {
      var c = this.css("position"),
          d = "absolute" === c,
          e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          f = this.parents().filter(function () {
        var b = a(this);
        return d && "static" === b.css("position") ? !1 : e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"));
      }).eq(0);
      return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document);
    },
    uniqueId: function () {
      var a = 0;
      return function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++a);
        });
      };
    }(),
    removeUniqueId: function removeUniqueId() {
      return this.each(function () {
        /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id");
      });
    }
  }), a.extend(a.expr[":"], {
    data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
      return function (c) {
        return !!a.data(c, b);
      };
    }) : function (b, c, d) {
      return !!a.data(b, d[3]);
    },
    focusable: function focusable(c) {
      return b(c, !isNaN(a.attr(c, "tabindex")));
    },
    tabbable: function tabbable(c) {
      var d = a.attr(c, "tabindex"),
          e = isNaN(d);
      return (e || d >= 0) && b(c, !e);
    }
  }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (b, c) {
    function d(b, c, d, f) {
      return a.each(e, function () {
        c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0);
      }), c;
    }

    var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
        f = c.toLowerCase(),
        g = {
      innerWidth: a.fn.innerWidth,
      innerHeight: a.fn.innerHeight,
      outerWidth: a.fn.outerWidth,
      outerHeight: a.fn.outerHeight
    };
    a.fn["inner" + c] = function (b) {
      return void 0 === b ? g["inner" + c].call(this) : this.each(function () {
        a(this).css(f, d(this, b) + "px");
      });
    }, a.fn["outer" + c] = function (b, e) {
      return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function () {
        a(this).css(f, d(this, b, !0, e) + "px");
      });
    };
  }), a.fn.addBack || (a.fn.addBack = function (a) {
    return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
  }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
    return function (c) {
      return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this);
    };
  }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
    focus: function (b) {
      return function (c, d) {
        return "number" == typeof c ? this.each(function () {
          var b = this;
          setTimeout(function () {
            a(b).focus(), d && d.call(b);
          }, c);
        }) : b.apply(this, arguments);
      };
    }(a.fn.focus),
    disableSelection: function () {
      var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
      return function () {
        return this.bind(a + ".ui-disableSelection", function (a) {
          a.preventDefault();
        });
      };
    }(),
    enableSelection: function enableSelection() {
      return this.unbind(".ui-disableSelection");
    },
    zIndex: function zIndex(b) {
      if (void 0 !== b) return this.css("zIndex", b);
      if (this.length) for (var c, d, e = a(this[0]); e.length && e[0] !== document;) {
        if (c = e.css("position"), ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d)) return d;
        e = e.parent();
      }
      return 0;
    }
  }), a.ui.plugin = {
    add: function add(b, c, d) {
      var e,
          f = a.ui[b].prototype;

      for (e in d) {
        f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]]);
      }
    },
    call: function call(a, b, c, d) {
      var e,
          f = a.plugins[b];
      if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)) for (e = 0; e < f.length; e++) {
        a.options[f[e][0]] && f[e][1].apply(a.element, c);
      }
    }
  };
  var d = 0,
      e = Array.prototype.slice;
  a.cleanData = function (b) {
    return function (c) {
      var d, e, f;

      for (f = 0; null != (e = c[f]); f++) {
        try {
          d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove");
        } catch (g) {}
      }

      b(c);
    };
  }(a.cleanData), a.widget = function (b, c, d) {
    var e,
        f,
        g,
        h,
        i = {},
        j = b.split(".")[0];
    return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function (b) {
      return !!a.data(b, e);
    }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function (a, b) {
      return this._createWidget ? void (arguments.length && this._createWidget(a, b)) : new g(a, b);
    }, a.extend(g, f, {
      version: d.version,
      _proto: a.extend({}, d),
      _childConstructors: []
    }), h = new c(), h.options = a.widget.extend({}, h.options), a.each(d, function (b, d) {
      return a.isFunction(d) ? void (i[b] = function () {
        var a = function a() {
          return c.prototype[b].apply(this, arguments);
        },
            e = function e(a) {
          return c.prototype[b].apply(this, a);
        };

        return function () {
          var b,
              c = this._super,
              f = this._superApply;
          return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b;
        };
      }()) : void (i[b] = d);
    }), g.prototype = a.widget.extend(h, {
      widgetEventPrefix: f ? h.widgetEventPrefix || b : b
    }, i, {
      constructor: g,
      namespace: j,
      widgetName: b,
      widgetFullName: e
    }), f ? (a.each(f._childConstructors, function (b, c) {
      var d = c.prototype;
      a.widget(d.namespace + "." + d.widgetName, g, c._proto);
    }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g;
  }, a.widget.extend = function (b) {
    for (var c, d, f = e.call(arguments, 1), g = 0, h = f.length; h > g; g++) {
      for (c in f[g]) {
        d = f[g][c], f[g].hasOwnProperty(c) && void 0 !== d && (a.isPlainObject(d) ? b[c] = a.isPlainObject(b[c]) ? a.widget.extend({}, b[c], d) : a.widget.extend({}, d) : b[c] = d);
      }
    }

    return b;
  }, a.widget.bridge = function (b, c) {
    var d = c.prototype.widgetFullName || b;

    a.fn[b] = function (f) {
      var g = "string" == typeof f,
          h = e.call(arguments, 1),
          i = this;
      return g ? this.each(function () {
        var c,
            e = a.data(this, d);
        return "instance" === f ? (i = e, !1) : e ? a.isFunction(e[f]) && "_" !== f.charAt(0) ? (c = e[f].apply(e, h), c !== e && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'");
      }) : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))), this.each(function () {
        var b = a.data(this, d);
        b ? (b.option(f || {}), b._init && b._init()) : a.data(this, d, new c(f, this));
      })), i;
    };
  }, a.Widget = function () {}, a.Widget._childConstructors = [], a.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      disabled: !1,
      create: null
    },
    _createWidget: function _createWidget(b, c) {
      c = a(c || this.defaultElement || this)[0], this.element = a(c), this.uuid = d++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), c !== this && (a.data(c, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function remove(a) {
          a.target === c && this.destroy();
        }
      }), this.document = a(c.style ? c.ownerDocument : c.document || c), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
    },
    _getCreateOptions: a.noop,
    _getCreateEventData: a.noop,
    _create: a.noop,
    _init: a.noop,
    destroy: function destroy() {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus");
    },
    _destroy: a.noop,
    widget: function widget() {
      return this.element;
    },
    option: function option(b, c) {
      var d,
          e,
          f,
          g = b;
      if (0 === arguments.length) return a.widget.extend({}, this.options);
      if ("string" == typeof b) if (g = {}, d = b.split("."), b = d.shift(), d.length) {
        for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) {
          e[d[f]] = e[d[f]] || {}, e = e[d[f]];
        }

        if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
        e[b] = c;
      } else {
        if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
        g[b] = c;
      }
      return this._setOptions(g), this;
    },
    _setOptions: function _setOptions(a) {
      var b;

      for (b in a) {
        this._setOption(b, a[b]);
      }

      return this;
    },
    _setOption: function _setOption(a, b) {
      return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this;
    },
    enable: function enable() {
      return this._setOptions({
        disabled: !1
      });
    },
    disable: function disable() {
      return this._setOptions({
        disabled: !0
      });
    },
    _on: function _on(b, c, d) {
      var e,
          f = this;
      "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function (d, g) {
        function h() {
          return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0;
        }

        "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
        var i = d.match(/^([\w:-]*)\s*(.*)$/),
            j = i[1] + f.eventNamespace,
            k = i[2];
        k ? e.delegate(k, j, h) : c.bind(j, h);
      });
    },
    _off: function _off(b, c) {
      c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get());
    },
    _delay: function _delay(a, b) {
      function c() {
        return ("string" == typeof a ? d[a] : a).apply(d, arguments);
      }

      var d = this;
      return setTimeout(c, b || 0);
    },
    _hoverable: function _hoverable(b) {
      this.hoverable = this.hoverable.add(b), this._on(b, {
        mouseenter: function mouseenter(b) {
          a(b.currentTarget).addClass("ui-state-hover");
        },
        mouseleave: function mouseleave(b) {
          a(b.currentTarget).removeClass("ui-state-hover");
        }
      });
    },
    _focusable: function _focusable(b) {
      this.focusable = this.focusable.add(b), this._on(b, {
        focusin: function focusin(b) {
          a(b.currentTarget).addClass("ui-state-focus");
        },
        focusout: function focusout(b) {
          a(b.currentTarget).removeClass("ui-state-focus");
        }
      });
    },
    _trigger: function _trigger(b, c, d) {
      var e,
          f,
          g = this.options[b];
      if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent) for (e in f) {
        e in c || (c[e] = f[e]);
      }
      return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented());
    }
  }, a.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function (b, c) {
    a.Widget.prototype["_" + b] = function (d, e, f) {
      "string" == typeof e && (e = {
        effect: e
      });
      var g,
          h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
      e = e || {}, "number" == typeof e && (e = {
        duration: e
      }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
        a(this)[b](), f && f.call(d[0]), c();
      });
    };
  });
  var f = (a.widget, !1);
  a(document).mouseup(function () {
    f = !1;
  });
  a.widget("ui.mouse", {
    version: "1.11.4",
    options: {
      cancel: "input,textarea,button,select,option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function _mouseInit() {
      var b = this;
      this.element.bind("mousedown." + this.widgetName, function (a) {
        return b._mouseDown(a);
      }).bind("click." + this.widgetName, function (c) {
        return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0;
      }), this.started = !1;
    },
    _mouseDestroy: function _mouseDestroy() {
      this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function _mouseDown(b) {
      if (!f) {
        this._mouseMoved = !1, this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
        var c = this,
            d = 1 === b.which,
            e = "string" == typeof this.options.cancel && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
        return d && !e && this._mouseCapture(b) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
          c.mouseDelayMet = !0;
        }, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
          return c._mouseMove(a);
        }, this._mouseUpDelegate = function (a) {
          return c._mouseUp(a);
        }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), f = !0, !0)) : !0;
      }
    },
    _mouseMove: function _mouseMove(b) {
      if (this._mouseMoved) {
        if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button) return this._mouseUp(b);
        if (!b.which) return this._mouseUp(b);
      }

      return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted);
    },
    _mouseUp: function _mouseUp(b) {
      return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), f = !1, !1;
    },
    _mouseDistanceMet: function _mouseDistanceMet(a) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function _mouseDelayMet() {
      return this.mouseDelayMet;
    },
    _mouseStart: function _mouseStart() {},
    _mouseDrag: function _mouseDrag() {},
    _mouseStop: function _mouseStop() {},
    _mouseCapture: function _mouseCapture() {
      return !0;
    }
  });
  !function () {
    function b(a, b, c) {
      return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)];
    }

    function c(b, c) {
      return parseInt(a.css(b, c), 10) || 0;
    }

    function d(b) {
      var c = b[0];
      return 9 === c.nodeType ? {
        width: b.width(),
        height: b.height(),
        offset: {
          top: 0,
          left: 0
        }
      } : a.isWindow(c) ? {
        width: b.width(),
        height: b.height(),
        offset: {
          top: b.scrollTop(),
          left: b.scrollLeft()
        }
      } : c.preventDefault ? {
        width: 0,
        height: 0,
        offset: {
          top: c.pageY,
          left: c.pageX
        }
      } : {
        width: b.outerWidth(),
        height: b.outerHeight(),
        offset: b.offset()
      };
    }

    a.ui = a.ui || {};
    var e,
        f,
        g = Math.max,
        h = Math.abs,
        i = Math.round,
        j = /left|center|right/,
        k = /top|center|bottom/,
        l = /[\+\-]\d+(\.[\d]+)?%?/,
        m = /^\w+/,
        n = /%$/,
        o = a.fn.position;
    a.position = {
      scrollbarWidth: function scrollbarWidth() {
        if (void 0 !== e) return e;
        var b,
            c,
            d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            f = d.children()[0];
        return a("body").append(d), b = f.offsetWidth, d.css("overflow", "scroll"), c = f.offsetWidth, b === c && (c = d[0].clientWidth), d.remove(), e = b - c;
      },
      getScrollInfo: function getScrollInfo(b) {
        var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
            d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
            e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
            f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
        return {
          width: f ? a.position.scrollbarWidth() : 0,
          height: e ? a.position.scrollbarWidth() : 0
        };
      },
      getWithinInfo: function getWithinInfo(b) {
        var c = a(b || window),
            d = a.isWindow(c[0]),
            e = !!c[0] && 9 === c[0].nodeType;
        return {
          element: c,
          isWindow: d,
          isDocument: e,
          offset: c.offset() || {
            left: 0,
            top: 0
          },
          scrollLeft: c.scrollLeft(),
          scrollTop: c.scrollTop(),
          width: d || e ? c.width() : c.outerWidth(),
          height: d || e ? c.height() : c.outerHeight()
        };
      }
    }, a.fn.position = function (e) {
      if (!e || !e.of) return o.apply(this, arguments);
      e = a.extend({}, e);
      var n,
          p,
          q,
          r,
          s,
          t,
          u = a(e.of),
          v = a.position.getWithinInfo(e.within),
          w = a.position.getScrollInfo(v),
          x = (e.collision || "flip").split(" "),
          y = {};
      return t = d(u), u[0].preventDefault && (e.at = "left top"), p = t.width, q = t.height, r = t.offset, s = a.extend({}, r), a.each(["my", "at"], function () {
        var a,
            b,
            c = (e[this] || "").split(" ");
        1 === c.length && (c = j.test(c[0]) ? c.concat(["center"]) : k.test(c[0]) ? ["center"].concat(c) : ["center", "center"]), c[0] = j.test(c[0]) ? c[0] : "center", c[1] = k.test(c[1]) ? c[1] : "center", a = l.exec(c[0]), b = l.exec(c[1]), y[this] = [a ? a[0] : 0, b ? b[0] : 0], e[this] = [m.exec(c[0])[0], m.exec(c[1])[0]];
      }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? s.left += p : "center" === e.at[0] && (s.left += p / 2), "bottom" === e.at[1] ? s.top += q : "center" === e.at[1] && (s.top += q / 2), n = b(y.at, p, q), s.left += n[0], s.top += n[1], this.each(function () {
        var d,
            j,
            k = a(this),
            l = k.outerWidth(),
            m = k.outerHeight(),
            o = c(this, "marginLeft"),
            t = c(this, "marginTop"),
            z = l + o + c(this, "marginRight") + w.width,
            A = m + t + c(this, "marginBottom") + w.height,
            B = a.extend({}, s),
            C = b(y.my, k.outerWidth(), k.outerHeight());
        "right" === e.my[0] ? B.left -= l : "center" === e.my[0] && (B.left -= l / 2), "bottom" === e.my[1] ? B.top -= m : "center" === e.my[1] && (B.top -= m / 2), B.left += C[0], B.top += C[1], f || (B.left = i(B.left), B.top = i(B.top)), d = {
          marginLeft: o,
          marginTop: t
        }, a.each(["left", "top"], function (b, c) {
          a.ui.position[x[b]] && a.ui.position[x[b]][c](B, {
            targetWidth: p,
            targetHeight: q,
            elemWidth: l,
            elemHeight: m,
            collisionPosition: d,
            collisionWidth: z,
            collisionHeight: A,
            offset: [n[0] + C[0], n[1] + C[1]],
            my: e.my,
            at: e.at,
            within: v,
            elem: k
          });
        }), e.using && (j = function j(a) {
          var b = r.left - B.left,
              c = b + p - l,
              d = r.top - B.top,
              f = d + q - m,
              i = {
            target: {
              element: u,
              left: r.left,
              top: r.top,
              width: p,
              height: q
            },
            element: {
              element: k,
              left: B.left,
              top: B.top,
              width: l,
              height: m
            },
            horizontal: 0 > c ? "left" : b > 0 ? "right" : "center",
            vertical: 0 > f ? "top" : d > 0 ? "bottom" : "middle"
          };
          l > p && h(b + c) < p && (i.horizontal = "center"), m > q && h(d + f) < q && (i.vertical = "middle"), g(h(b), h(c)) > g(h(d), h(f)) ? i.important = "horizontal" : i.important = "vertical", e.using.call(this, a, i);
        }), k.offset(a.extend(B, {
          using: j
        }));
      });
    }, a.ui.position = {
      fit: {
        left: function left(a, b) {
          var c,
              d = b.within,
              e = d.isWindow ? d.scrollLeft : d.offset.left,
              f = d.width,
              h = a.left - b.collisionPosition.marginLeft,
              i = e - h,
              j = h + b.collisionWidth - f - e;
          b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : j > 0 && 0 >= i ? a.left = e : i > j ? a.left = e + f - b.collisionWidth : a.left = e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left);
        },
        top: function top(a, b) {
          var c,
              d = b.within,
              e = d.isWindow ? d.scrollTop : d.offset.top,
              f = b.within.height,
              h = a.top - b.collisionPosition.marginTop,
              i = e - h,
              j = h + b.collisionHeight - f - e;
          b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : j > 0 && 0 >= i ? a.top = e : i > j ? a.top = e + f - b.collisionHeight : a.top = e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top);
        }
      },
      flip: {
        left: function left(a, b) {
          var c,
              d,
              e = b.within,
              f = e.offset.left + e.scrollLeft,
              g = e.width,
              i = e.isWindow ? e.scrollLeft : e.offset.left,
              j = a.left - b.collisionPosition.marginLeft,
              k = j - i,
              l = j + b.collisionWidth - g - i,
              m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
              n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
              o = -2 * b.offset[0];
          0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o));
        },
        top: function top(a, b) {
          var c,
              d,
              e = b.within,
              f = e.offset.top + e.scrollTop,
              g = e.height,
              i = e.isWindow ? e.scrollTop : e.offset.top,
              j = a.top - b.collisionPosition.marginTop,
              k = j - i,
              l = j + b.collisionHeight - g - i,
              m = "top" === b.my[1],
              n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
              o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
              p = -2 * b.offset[1];
          0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, (0 > d || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, (c > 0 || h(c) < l) && (a.top += n + o + p));
        }
      },
      flipfit: {
        left: function left() {
          a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments);
        },
        top: function top() {
          a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments);
        }
      }
    }, function () {
      var b,
          c,
          d,
          e,
          g,
          h = document.getElementsByTagName("body")[0],
          i = document.createElement("div");
      b = document.createElement(h ? "div" : "body"), d = {
        visibility: "hidden",
        width: 0,
        height: 0,
        border: 0,
        margin: 0,
        background: "none"
      }, h && a.extend(d, {
        position: "absolute",
        left: "-1000px",
        top: "-1000px"
      });

      for (g in d) {
        b.style[g] = d[g];
      }

      b.appendChild(i), c = h || document.documentElement, c.insertBefore(b, c.firstChild), i.style.cssText = "position: absolute; left: 10.7432222px;", e = a(i).offset().left, f = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b);
    }();
  }();
  a.ui.position;
  a.widget("ui.draggable", a.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null
    },
    _create: function _create() {
      "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit();
    },
    _setOption: function _setOption(a, b) {
      this._super(a, b), "handle" === a && (this._removeHandleClassName(), this._setHandleClassName());
    },
    _destroy: function _destroy() {
      return (this.helper || this.element).is(".ui-draggable-dragging") ? void (this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy());
    },
    _mouseCapture: function _mouseCapture(b) {
      var c = this.options;
      return this._blurActiveElement(b), this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), this.handle ? (this._blockFrames(c.iframeFix === !0 ? "iframe" : c.iframeFix), !0) : !1);
    },
    _blockFrames: function _blockFrames(b) {
      this.iframeBlocks = this.document.find(b).map(function () {
        var b = a(this);
        return a("<div>").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0];
      });
    },
    _unblockFrames: function _unblockFrames() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    },
    _blurActiveElement: function _blurActiveElement(b) {
      var c = this.document[0];
      if (this.handleElement.is(b.target)) try {
        c.activeElement && "body" !== c.activeElement.nodeName.toLowerCase() && a(c.activeElement).blur();
      } catch (d) {}
    },
    _mouseStart: function _mouseStart(b) {
      var c = this.options;
      return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
        return "fixed" === a(this).css("position");
      }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(b), this.originalPosition = this.position = this._generatePosition(b, !1), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._normalizeRightBottom(), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0);
    },
    _refreshOffsets: function _refreshOffsets(a) {
      this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: !1,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }, this.offset.click = {
        left: a.pageX - this.offset.left,
        top: a.pageY - this.offset.top
      };
    },
    _mouseDrag: function _mouseDrag(b, c) {
      if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b, !0), this.positionAbs = this._convertPositionTo("absolute"), !c) {
        var d = this._uiHash();

        if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
        this.position = d.position;
      }

      return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1;
    },
    _mouseStop: function _mouseStop(b) {
      var c = this,
          d = !1;
      return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
        c._trigger("stop", b) !== !1 && c._clear();
      }) : this._trigger("stop", b) !== !1 && this._clear(), !1;
    },
    _mouseUp: function _mouseUp(b) {
      return this._unblockFrames(), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), this.handleElement.is(b.target) && this.element.focus(), a.ui.mouse.prototype._mouseUp.call(this, b);
    },
    cancel: function cancel() {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this;
    },
    _getHandle: function _getHandle(b) {
      return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0;
    },
    _setHandleClassName: function _setHandleClassName() {
      this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle");
    },
    _removeHandleClassName: function _removeHandleClassName() {
      this.handleElement.removeClass("ui-draggable-handle");
    },
    _createHelper: function _createHelper(b) {
      var c = this.options,
          d = a.isFunction(c.helper),
          e = d ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
      return e.parents("body").length || e.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d && e[0] === this.element[0] && this._setPositionRelative(), e[0] === this.element[0] || /(fixed|absolute)/.test(e.css("position")) || e.css("position", "absolute"), e;
    },
    _setPositionRelative: function _setPositionRelative() {
      /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
    },
    _adjustOffsetFromHelper: function _adjustOffsetFromHelper(b) {
      "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
    },
    _isRootNode: function _isRootNode(a) {
      return /(html|body)/i.test(a.tagName) || a === this.document[0];
    },
    _getParentOffset: function _getParentOffset() {
      var b = this.offsetParent.offset(),
          c = this.document[0];
      return "absolute" === this.cssPosition && this.scrollParent[0] !== c && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function _getRelativeOffset() {
      if ("relative" !== this.cssPosition) return {
        top: 0,
        left: 0
      };

      var a = this.element.position(),
          b = this._isRootNode(this.scrollParent[0]);

      return {
        top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()),
        left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft())
      };
    },
    _cacheMargins: function _cacheMargins() {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      };
    },
    _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function _setContainment() {
      var b,
          c,
          d,
          e = this.options,
          f = this.document[0];
      return this.relativeContainer = null, e.containment ? "window" === e.containment ? void (this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === e.containment ? void (this.containment = [0, 0, a(f).width() - this.helperProportions.width - this.margins.left, (a(f).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : e.containment.constructor === Array ? void (this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], void (d && (b = /(scroll|auto)/.test(c.css("overflow")), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void (this.containment = null);
    },
    _convertPositionTo: function _convertPositionTo(a, b) {
      b || (b = this.position);

      var c = "absolute" === a ? 1 : -1,
          d = this._isRootNode(this.scrollParent[0]);

      return {
        top: b.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top) * c,
        left: b.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left) * c
      };
    },
    _generatePosition: function _generatePosition(a, b) {
      var c,
          d,
          e,
          f,
          g = this.options,
          h = this._isRootNode(this.scrollParent[0]),
          i = a.pageX,
          j = a.pageY;

      return h && this.offset.scroll || (this.offset.scroll = {
        top: this.scrollParent.scrollTop(),
        left: this.scrollParent.scrollLeft()
      }), b && (this.containment && (this.relativeContainer ? (d = this.relativeContainer.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, a.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), a.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), a.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), a.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f), "y" === g.axis && (i = this.originalPageX), "x" === g.axis && (j = this.originalPageY)), {
        top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
        left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
      };
    },
    _clear: function _clear() {
      this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
    },
    _normalizeRightBottom: function _normalizeRightBottom() {
      "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"));
    },
    _trigger: function _trigger(b, c, d) {
      return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d, this], !0), /^(drag|start|stop)/.test(b) && (this.positionAbs = this._convertPositionTo("absolute"), d.offset = this.positionAbs), a.Widget.prototype._trigger.call(this, b, c, d);
    },
    plugins: {},
    _uiHash: function _uiHash() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  }), a.ui.plugin.add("draggable", "connectToSortable", {
    start: function start(b, c, d) {
      var e = a.extend({}, c, {
        item: d.element
      });
      d.sortables = [], a(d.options.connectToSortable).each(function () {
        var c = a(this).sortable("instance");
        c && !c.options.disabled && (d.sortables.push(c), c.refreshPositions(), c._trigger("activate", b, e));
      });
    },
    stop: function stop(b, c, d) {
      var e = a.extend({}, c, {
        item: d.element
      });
      d.cancelHelperRemoval = !1, a.each(d.sortables, function () {
        var a = this;
        a.isOver ? (a.isOver = 0, d.cancelHelperRemoval = !0, a.cancelHelperRemoval = !1, a._storedCSS = {
          position: a.placeholder.css("position"),
          top: a.placeholder.css("top"),
          left: a.placeholder.css("left")
        }, a._mouseStop(b), a.options.helper = a.options._helper) : (a.cancelHelperRemoval = !0, a._trigger("deactivate", b, e));
      });
    },
    drag: function drag(b, c, d) {
      a.each(d.sortables, function () {
        var e = !1,
            f = this;
        f.positionAbs = d.positionAbs, f.helperProportions = d.helperProportions, f.offset.click = d.offset.click, f._intersectsWith(f.containerCache) && (e = !0, a.each(d.sortables, function () {
          return this.positionAbs = d.positionAbs, this.helperProportions = d.helperProportions, this.offset.click = d.offset.click, this !== f && this._intersectsWith(this.containerCache) && a.contains(f.element[0], this.element[0]) && (e = !1), e;
        })), e ? (f.isOver || (f.isOver = 1, d._parent = c.helper.parent(), f.currentItem = c.helper.appendTo(f.element).data("ui-sortable-item", !0), f.options._helper = f.options.helper, f.options.helper = function () {
          return c.helper[0];
        }, b.target = f.currentItem[0], f._mouseCapture(b, !0), f._mouseStart(b, !0, !0), f.offset.click.top = d.offset.click.top, f.offset.click.left = d.offset.click.left, f.offset.parent.left -= d.offset.parent.left - f.offset.parent.left, f.offset.parent.top -= d.offset.parent.top - f.offset.parent.top, d._trigger("toSortable", b), d.dropped = f.element, a.each(d.sortables, function () {
          this.refreshPositions();
        }), d.currentItem = d.element, f.fromOutside = d), f.currentItem && (f._mouseDrag(b), c.position = f.position)) : f.isOver && (f.isOver = 0, f.cancelHelperRemoval = !0, f.options._revert = f.options.revert, f.options.revert = !1, f._trigger("out", b, f._uiHash(f)), f._mouseStop(b, !0), f.options.revert = f.options._revert, f.options.helper = f.options._helper, f.placeholder && f.placeholder.remove(), c.helper.appendTo(d._parent), d._refreshOffsets(b), c.position = d._generatePosition(b, !0), d._trigger("fromSortable", b), d.dropped = !1, a.each(d.sortables, function () {
          this.refreshPositions();
        }));
      });
    }
  }), a.ui.plugin.add("draggable", "cursor", {
    start: function start(b, c, d) {
      var e = a("body"),
          f = d.options;
      e.css("cursor") && (f._cursor = e.css("cursor")), e.css("cursor", f.cursor);
    },
    stop: function stop(b, c, d) {
      var e = d.options;
      e._cursor && a("body").css("cursor", e._cursor);
    }
  }), a.ui.plugin.add("draggable", "opacity", {
    start: function start(b, c, d) {
      var e = a(c.helper),
          f = d.options;
      e.css("opacity") && (f._opacity = e.css("opacity")), e.css("opacity", f.opacity);
    },
    stop: function stop(b, c, d) {
      var e = d.options;
      e._opacity && a(c.helper).css("opacity", e._opacity);
    }
  }), a.ui.plugin.add("draggable", "scroll", {
    start: function start(a, b, c) {
      c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1)), c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset());
    },
    drag: function drag(b, c, d) {
      var e = d.options,
          f = !1,
          g = d.scrollParentNotHidden[0],
          h = d.document[0];
      g !== h && "HTML" !== g.tagName ? (e.axis && "x" === e.axis || (d.overflowOffset.top + g.offsetHeight - b.pageY < e.scrollSensitivity ? g.scrollTop = f = g.scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (g.scrollTop = f = g.scrollTop - e.scrollSpeed)), e.axis && "y" === e.axis || (d.overflowOffset.left + g.offsetWidth - b.pageX < e.scrollSensitivity ? g.scrollLeft = f = g.scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (g.scrollLeft = f = g.scrollLeft - e.scrollSpeed))) : (e.axis && "x" === e.axis || (b.pageY - a(h).scrollTop() < e.scrollSensitivity ? f = a(h).scrollTop(a(h).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(h).scrollTop()) < e.scrollSensitivity && (f = a(h).scrollTop(a(h).scrollTop() + e.scrollSpeed))), e.axis && "y" === e.axis || (b.pageX - a(h).scrollLeft() < e.scrollSensitivity ? f = a(h).scrollLeft(a(h).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(h).scrollLeft()) < e.scrollSensitivity && (f = a(h).scrollLeft(a(h).scrollLeft() + e.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b);
    }
  }), a.ui.plugin.add("draggable", "snap", {
    start: function start(b, c, d) {
      var e = d.options;
      d.snapElements = [], a(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function () {
        var b = a(this),
            c = b.offset();
        this !== d.element[0] && d.snapElements.push({
          item: this,
          width: b.outerWidth(),
          height: b.outerHeight(),
          top: c.top,
          left: c.left
        });
      });
    },
    drag: function drag(b, c, d) {
      var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o = d.options,
          p = o.snapTolerance,
          q = c.offset.left,
          r = q + d.helperProportions.width,
          s = c.offset.top,
          t = s + d.helperProportions.height;

      for (m = d.snapElements.length - 1; m >= 0; m--) {
        i = d.snapElements[m].left - d.margins.left, j = i + d.snapElements[m].width, k = d.snapElements[m].top - d.margins.top, l = k + d.snapElements[m].height, i - p > r || q > j + p || k - p > t || s > l + p || !a.contains(d.snapElements[m].item.ownerDocument, d.snapElements[m].item) ? (d.snapElements[m].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
          snapItem: d.snapElements[m].item
        })), d.snapElements[m].snapping = !1) : ("inner" !== o.snapMode && (e = Math.abs(k - t) <= p, f = Math.abs(l - s) <= p, g = Math.abs(i - r) <= p, h = Math.abs(j - q) <= p, e && (c.position.top = d._convertPositionTo("relative", {
          top: k - d.helperProportions.height,
          left: 0
        }).top), f && (c.position.top = d._convertPositionTo("relative", {
          top: l,
          left: 0
        }).top), g && (c.position.left = d._convertPositionTo("relative", {
          top: 0,
          left: i - d.helperProportions.width
        }).left), h && (c.position.left = d._convertPositionTo("relative", {
          top: 0,
          left: j
        }).left)), n = e || f || g || h, "outer" !== o.snapMode && (e = Math.abs(k - s) <= p, f = Math.abs(l - t) <= p, g = Math.abs(i - q) <= p, h = Math.abs(j - r) <= p, e && (c.position.top = d._convertPositionTo("relative", {
          top: k,
          left: 0
        }).top), f && (c.position.top = d._convertPositionTo("relative", {
          top: l - d.helperProportions.height,
          left: 0
        }).top), g && (c.position.left = d._convertPositionTo("relative", {
          top: 0,
          left: i
        }).left), h && (c.position.left = d._convertPositionTo("relative", {
          top: 0,
          left: j - d.helperProportions.width
        }).left)), !d.snapElements[m].snapping && (e || f || g || h || n) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
          snapItem: d.snapElements[m].item
        })), d.snapElements[m].snapping = e || f || g || h || n);
      }
    }
  }), a.ui.plugin.add("draggable", "stack", {
    start: function start(b, c, d) {
      var e,
          f = d.options,
          g = a.makeArray(a(f.stack)).sort(function (b, c) {
        return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0);
      });
      g.length && (e = parseInt(a(g[0]).css("zIndex"), 10) || 0, a(g).each(function (b) {
        a(this).css("zIndex", e + b);
      }), this.css("zIndex", e + g.length));
    }
  }), a.ui.plugin.add("draggable", "zIndex", {
    start: function start(b, c, d) {
      var e = a(c.helper),
          f = d.options;
      e.css("zIndex") && (f._zIndex = e.css("zIndex")), e.css("zIndex", f.zIndex);
    },
    stop: function stop(b, c, d) {
      var e = d.options;
      e._zIndex && a(c.helper).css("zIndex", e._zIndex);
    }
  });
  a.ui.draggable;
  a.widget("ui.droppable", {
    version: "1.11.4",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function _create() {
      var b,
          c = this.options,
          d = c.accept;
      this.isover = !1, this.isout = !0, this.accept = a.isFunction(d) ? d : function (a) {
        return a.is(d);
      }, this.proportions = function () {
        return arguments.length ? void (b = arguments[0]) : b ? b : b = {
          width: this.element[0].offsetWidth,
          height: this.element[0].offsetHeight
        };
      }, this._addToManager(c.scope), c.addClasses && this.element.addClass("ui-droppable");
    },
    _addToManager: function _addToManager(b) {
      a.ui.ddmanager.droppables[b] = a.ui.ddmanager.droppables[b] || [], a.ui.ddmanager.droppables[b].push(this);
    },
    _splice: function _splice(a) {
      for (var b = 0; b < a.length; b++) {
        a[b] === this && a.splice(b, 1);
      }
    },
    _destroy: function _destroy() {
      var b = a.ui.ddmanager.droppables[this.options.scope];
      this._splice(b), this.element.removeClass("ui-droppable ui-droppable-disabled");
    },
    _setOption: function _setOption(b, c) {
      if ("accept" === b) this.accept = a.isFunction(c) ? c : function (a) {
        return a.is(c);
      };else if ("scope" === b) {
        var d = a.ui.ddmanager.droppables[this.options.scope];
        this._splice(d), this._addToManager(c);
      }

      this._super(b, c);
    },
    _activate: function _activate(b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c));
    },
    _deactivate: function _deactivate(b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c));
    },
    _over: function _over(b) {
      var c = a.ui.ddmanager.current;
      c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)));
    },
    _out: function _out(b) {
      var c = a.ui.ddmanager.current;
      c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)));
    },
    _drop: function _drop(b, c) {
      var d = c || a.ui.ddmanager.current,
          e = !1;
      return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
        var c = a(this).droppable("instance");
        return c.options.greedy && !c.options.disabled && c.options.scope === d.options.scope && c.accept.call(c.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(c, {
          offset: c.element.offset()
        }), c.options.tolerance, b) ? (e = !0, !1) : void 0;
      }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1) : !1;
    },
    ui: function ui(a) {
      return {
        draggable: a.currentItem || a.element,
        helper: a.helper,
        position: a.position,
        offset: a.positionAbs
      };
    }
  }), a.ui.intersect = function () {
    function a(a, b, c) {
      return a >= b && b + c > a;
    }

    return function (b, c, d, e) {
      if (!c.offset) return !1;
      var f = (b.positionAbs || b.position.absolute).left + b.margins.left,
          g = (b.positionAbs || b.position.absolute).top + b.margins.top,
          h = f + b.helperProportions.width,
          i = g + b.helperProportions.height,
          j = c.offset.left,
          k = c.offset.top,
          l = j + c.proportions().width,
          m = k + c.proportions().height;

      switch (d) {
        case "fit":
          return f >= j && l >= h && g >= k && m >= i;

        case "intersect":
          return j < f + b.helperProportions.width / 2 && h - b.helperProportions.width / 2 < l && k < g + b.helperProportions.height / 2 && i - b.helperProportions.height / 2 < m;

        case "pointer":
          return a(e.pageY, k, c.proportions().height) && a(e.pageX, j, c.proportions().width);

        case "touch":
          return (g >= k && m >= g || i >= k && m >= i || k > g && i > m) && (f >= j && l >= f || h >= j && l >= h || j > f && h > l);

        default:
          return !1;
      }
    };
  }(), a.ui.ddmanager = {
    current: null,
    droppables: {
      "default": []
    },
    prepareOffsets: function prepareOffsets(b, c) {
      var d,
          e,
          f = a.ui.ddmanager.droppables[b.options.scope] || [],
          g = c ? c.type : null,
          h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();

      a: for (d = 0; d < f.length; d++) {
        if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
          for (e = 0; e < h.length; e++) {
            if (h[e] === f[d].element[0]) {
              f[d].proportions().height = 0;
              continue a;
            }
          }

          f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions({
            width: f[d].element[0].offsetWidth,
            height: f[d].element[0].offsetHeight
          }));
        }
      }
    },
    drop: function drop(b, c) {
      var d = !1;
      return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function () {
        this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance, c) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)));
      }), d;
    },
    dragStart: function dragStart(b, c) {
      b.element.parentsUntil("body").bind("scroll.droppable", function () {
        b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
      });
    },
    drag: function drag(b, c) {
      b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var d,
              e,
              f,
              g = a.ui.intersect(b, this, this.options.tolerance, c),
              h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
          h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function () {
            return a(this).droppable("instance").options.scope === e;
          }), f.length && (d = a(f[0]).droppable("instance"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)));
        }
      });
    },
    dragStop: function dragStop(b, c) {
      b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c);
    }
  };
  a.ui.droppable;
  a.widget("ui.resizable", a.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: !1,
      animate: !1,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: !1,
      autoHide: !1,
      containment: !1,
      ghost: !1,
      grid: !1,
      handles: "e,s,se",
      helper: !1,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 90,
      resize: null,
      start: null,
      stop: null
    },
    _num: function _num(a) {
      return parseInt(a, 10) || 0;
    },
    _isNumber: function _isNumber(a) {
      return !isNaN(parseInt(a, 10));
    },
    _hasScroll: function _hasScroll(b, c) {
      if ("hidden" === a(b).css("overflow")) return !1;
      var d = c && "left" === c ? "scrollLeft" : "scrollTop",
          e = !1;
      return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e);
    },
    _create: function _create() {
      var b,
          c,
          d,
          e,
          f,
          g = this,
          h = this.options;
      if (this.element.addClass("ui-resizable"), a.extend(this, {
        _aspectRatio: !!h.aspectRatio,
        aspectRatio: h.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
      }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
        position: this.element.css("position"),
        width: this.element.outerWidth(),
        height: this.element.outerHeight(),
        top: this.element.css("top"),
        left: this.element.css("left")
      })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
        marginLeft: this.originalElement.css("marginLeft"),
        marginTop: this.originalElement.css("marginTop"),
        marginRight: this.originalElement.css("marginRight"),
        marginBottom: this.originalElement.css("marginBottom")
      }), this.originalElement.css({
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0
      }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
        position: "static",
        zoom: 1,
        display: "block"
      })), this.originalElement.css({
        margin: this.originalElement.css("margin")
      }), this._proportionallyResize()), this.handles = h.handles || (a(".ui-resizable-handle", this.element).length ? {
        n: ".ui-resizable-n",
        e: ".ui-resizable-e",
        s: ".ui-resizable-s",
        w: ".ui-resizable-w",
        se: ".ui-resizable-se",
        sw: ".ui-resizable-sw",
        ne: ".ui-resizable-ne",
        nw: ".ui-resizable-nw"
      } : "e,s,se"), this._handles = a(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), b = this.handles.split(","), this.handles = {}, c = 0; c < b.length; c++) {
        d = a.trim(b[c]), f = "ui-resizable-" + d, e = a("<div class='ui-resizable-handle " + f + "'></div>"), e.css({
          zIndex: h.zIndex
        }), "se" === d && e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, this.element.append(e);
      }
      this._renderAxis = function (b) {
        var c, d, e, f;
        b = b || this.element;

        for (c in this.handles) {
          this.handles[c].constructor === String ? this.handles[c] = this.element.children(this.handles[c]).first().show() : (this.handles[c].jquery || this.handles[c].nodeType) && (this.handles[c] = a(this.handles[c]), this._on(this.handles[c], {
            mousedown: g._mouseDown
          })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), this._handles = this._handles.add(this.handles[c]);
        }
      }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function () {
        g.resizing || (this.className && (e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), g.axis = e && e[1] ? e[1] : "se");
      }), h.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
        h.disabled || (a(this).removeClass("ui-resizable-autohide"), g._handles.show());
      }).mouseleave(function () {
        h.disabled || g.resizing || (a(this).addClass("ui-resizable-autohide"), g._handles.hide());
      })), this._mouseInit();
    },
    _destroy: function _destroy() {
      this._mouseDestroy();

      var b,
          c = function c(b) {
        a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
      };

      return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
        position: b.css("position"),
        width: b.outerWidth(),
        height: b.outerHeight(),
        top: b.css("top"),
        left: b.css("left")
      }).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this;
    },
    _mouseCapture: function _mouseCapture(b) {
      var c,
          d,
          e = !1;

      for (c in this.handles) {
        d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
      }

      return !this.options.disabled && e;
    },
    _mouseStart: function _mouseStart(b) {
      var c,
          d,
          e,
          f = this.options,
          g = this.element;
      return this.resizing = !0, this._renderProxy(), c = this._num(this.helper.css("left")), d = this._num(this.helper.css("top")), f.containment && (c += a(f.containment).scrollLeft() || 0, d += a(f.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
        left: c,
        top: d
      }, this.size = this._helper ? {
        width: this.helper.width(),
        height: this.helper.height()
      } : {
        width: g.width(),
        height: g.height()
      }, this.originalSize = this._helper ? {
        width: g.outerWidth(),
        height: g.outerHeight()
      } : {
        width: g.width(),
        height: g.height()
      }, this.sizeDiff = {
        width: g.outerWidth() - g.width(),
        height: g.outerHeight() - g.height()
      }, this.originalPosition = {
        left: c,
        top: d
      }, this.originalMousePosition = {
        left: b.pageX,
        top: b.pageY
      }, this.aspectRatio = "number" == typeof f.aspectRatio ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), g.addClass("ui-resizable-resizing"), this._propagate("start", b), !0;
    },
    _mouseDrag: function _mouseDrag(b) {
      var c,
          d,
          e = this.originalMousePosition,
          f = this.axis,
          g = b.pageX - e.left || 0,
          h = b.pageY - e.top || 0,
          i = this._change[f];
      return this._updatePrevProperties(), i ? (c = i.apply(this, [b, g, h]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), d = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(d) || (this._updatePrevProperties(), this._trigger("resize", b, this.ui()), this._applyChanges()), !1) : !1;
    },
    _mouseStop: function _mouseStop(b) {
      this.resizing = !1;
      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j = this.options,
          k = this;
      return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && this._hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = {
        width: k.helper.width() - f,
        height: k.helper.height() - e
      }, h = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, i = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, {
        top: i,
        left: h
      })), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1;
    },
    _updatePrevProperties: function _updatePrevProperties() {
      this.prevPosition = {
        top: this.position.top,
        left: this.position.left
      }, this.prevSize = {
        width: this.size.width,
        height: this.size.height
      };
    },
    _applyChanges: function _applyChanges() {
      var a = {};
      return this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (a.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (a.height = this.size.height + "px"), this.helper.css(a), a;
    },
    _updateVirtualBoundaries: function _updateVirtualBoundaries(a) {
      var b,
          c,
          d,
          e,
          f,
          g = this.options;
      f = {
        minWidth: this._isNumber(g.minWidth) ? g.minWidth : 0,
        maxWidth: this._isNumber(g.maxWidth) ? g.maxWidth : 1 / 0,
        minHeight: this._isNumber(g.minHeight) ? g.minHeight : 0,
        maxHeight: this._isNumber(g.maxHeight) ? g.maxHeight : 1 / 0
      }, (this._aspectRatio || a) && (b = f.minHeight * this.aspectRatio, d = f.minWidth / this.aspectRatio, c = f.maxHeight * this.aspectRatio, e = f.maxWidth / this.aspectRatio, b > f.minWidth && (f.minWidth = b), d > f.minHeight && (f.minHeight = d), c < f.maxWidth && (f.maxWidth = c), e < f.maxHeight && (f.maxHeight = e)), this._vBoundaries = f;
    },
    _updateCache: function _updateCache(a) {
      this.offset = this.helper.offset(), this._isNumber(a.left) && (this.position.left = a.left), this._isNumber(a.top) && (this.position.top = a.top), this._isNumber(a.height) && (this.size.height = a.height), this._isNumber(a.width) && (this.size.width = a.width);
    },
    _updateRatio: function _updateRatio(a) {
      var b = this.position,
          c = this.size,
          d = this.axis;
      return this._isNumber(a.height) ? a.width = a.height * this.aspectRatio : this._isNumber(a.width) && (a.height = a.width / this.aspectRatio), "sw" === d && (a.left = b.left + (c.width - a.width), a.top = null), "nw" === d && (a.top = b.top + (c.height - a.height), a.left = b.left + (c.width - a.width)), a;
    },
    _respectSize: function _respectSize(a) {
      var b = this._vBoundaries,
          c = this.axis,
          d = this._isNumber(a.width) && b.maxWidth && b.maxWidth < a.width,
          e = this._isNumber(a.height) && b.maxHeight && b.maxHeight < a.height,
          f = this._isNumber(a.width) && b.minWidth && b.minWidth > a.width,
          g = this._isNumber(a.height) && b.minHeight && b.minHeight > a.height,
          h = this.originalPosition.left + this.originalSize.width,
          i = this.position.top + this.size.height,
          j = /sw|nw|w/.test(c),
          k = /nw|ne|n/.test(c);
      return f && (a.width = b.minWidth), g && (a.height = b.minHeight), d && (a.width = b.maxWidth), e && (a.height = b.maxHeight), f && j && (a.left = h - b.minWidth), d && j && (a.left = h - b.maxWidth), g && k && (a.top = i - b.minHeight), e && k && (a.top = i - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a;
    },
    _getPaddingPlusBorderDimensions: function _getPaddingPlusBorderDimensions(a) {
      for (var b = 0, c = [], d = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")], e = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")]; 4 > b; b++) {
        c[b] = parseInt(d[b], 10) || 0, c[b] += parseInt(e[b], 10) || 0;
      }

      return {
        height: c[0] + c[2],
        width: c[1] + c[3]
      };
    },
    _proportionallyResize: function _proportionallyResize() {
      if (this._proportionallyResizeElements.length) for (var a, b = 0, c = this.helper || this.element; b < this._proportionallyResizeElements.length; b++) {
        a = this._proportionallyResizeElements[b], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(a)), a.css({
          height: c.height() - this.outerDimensions.height || 0,
          width: c.width() - this.outerDimensions.width || 0
        });
      }
    },
    _renderProxy: function _renderProxy() {
      var b = this.element,
          c = this.options;
      this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
        width: this.element.outerWidth() - 1,
        height: this.element.outerHeight() - 1,
        position: "absolute",
        left: this.elementOffset.left + "px",
        top: this.elementOffset.top + "px",
        zIndex: ++c.zIndex
      }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
    },
    _change: {
      e: function e(a, b) {
        return {
          width: this.originalSize.width + b
        };
      },
      w: function w(a, b) {
        var c = this.originalSize,
            d = this.originalPosition;
        return {
          left: d.left + b,
          width: c.width - b
        };
      },
      n: function n(a, b, c) {
        var d = this.originalSize,
            e = this.originalPosition;
        return {
          top: e.top + c,
          height: d.height - c
        };
      },
      s: function s(a, b, c) {
        return {
          height: this.originalSize.height + c
        };
      },
      se: function se(b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]));
      },
      sw: function sw(b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]));
      },
      ne: function ne(b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]));
      },
      nw: function nw(b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]));
      }
    },
    _propagate: function _propagate(b, c) {
      a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui());
    },
    plugins: {},
    ui: function ui() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      };
    }
  }), a.ui.plugin.add("resizable", "animate", {
    stop: function stop(b) {
      var c = a(this).resizable("instance"),
          d = c.options,
          e = c._proportionallyResizeElements,
          f = e.length && /textarea/i.test(e[0].nodeName),
          g = f && c._hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
          h = f ? 0 : c.sizeDiff.width,
          i = {
        width: c.size.width - h,
        height: c.size.height - g
      },
          j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null,
          k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
      c.element.animate(a.extend(i, k && j ? {
        top: k,
        left: j
      } : {}), {
        duration: d.animateDuration,
        easing: d.animateEasing,
        step: function step() {
          var d = {
            width: parseInt(c.element.css("width"), 10),
            height: parseInt(c.element.css("height"), 10),
            top: parseInt(c.element.css("top"), 10),
            left: parseInt(c.element.css("left"), 10)
          };
          e && e.length && a(e[0]).css({
            width: d.width,
            height: d.height
          }), c._updateCache(d), c._propagate("resize", b);
        }
      });
    }
  }), a.ui.plugin.add("resizable", "containment", {
    start: function start() {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = a(this).resizable("instance"),
          j = i.options,
          k = i.element,
          l = j.containment,
          m = l instanceof a ? l.get(0) : /parent/.test(l) ? k.parent().get(0) : l;
      m && (i.containerElement = a(m), /document/.test(l) || l === document ? (i.containerOffset = {
        left: 0,
        top: 0
      }, i.containerPosition = {
        left: 0,
        top: 0
      }, i.parentData = {
        element: a(document),
        left: 0,
        top: 0,
        width: a(document).width(),
        height: a(document).height() || document.body.parentNode.scrollHeight
      }) : (b = a(m), c = [], a(["Top", "Right", "Left", "Bottom"]).each(function (a, d) {
        c[a] = i._num(b.css("padding" + d));
      }), i.containerOffset = b.offset(), i.containerPosition = b.position(), i.containerSize = {
        height: b.innerHeight() - c[3],
        width: b.innerWidth() - c[1]
      }, d = i.containerOffset, e = i.containerSize.height, f = i.containerSize.width, g = i._hasScroll(m, "left") ? m.scrollWidth : f, h = i._hasScroll(m) ? m.scrollHeight : e, i.parentData = {
        element: m,
        left: d.left,
        top: d.top,
        width: g,
        height: h
      }));
    },
    resize: function resize(b) {
      var c,
          d,
          e,
          f,
          g = a(this).resizable("instance"),
          h = g.options,
          i = g.containerOffset,
          j = g.position,
          k = g._aspectRatio || b.shiftKey,
          l = {
        top: 0,
        left: 0
      },
          m = g.containerElement,
          n = !0;
      m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio, n = !1), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio, n = !1), g.position.top = g._helper ? i.top : 0), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f ? (g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top) : (g.offset.left = g.element.offset().left, g.offset.top = g.element.offset().top), c = Math.abs(g.sizeDiff.width + (g._helper ? g.offset.left - l.left : g.offset.left - i.left)), d = Math.abs(g.sizeDiff.height + (g._helper ? g.offset.top - l.top : g.offset.top - i.top)), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio, n = !1)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio, n = !1)), n || (g.position.left = g.prevPosition.left, g.position.top = g.prevPosition.top, g.size.width = g.prevSize.width, g.size.height = g.prevSize.height);
    },
    stop: function stop() {
      var b = a(this).resizable("instance"),
          c = b.options,
          d = b.containerOffset,
          e = b.containerPosition,
          f = b.containerElement,
          g = a(b.helper),
          h = g.offset(),
          i = g.outerWidth() - b.sizeDiff.width,
          j = g.outerHeight() - b.sizeDiff.height;
      b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
        left: h.left - e.left - d.left,
        width: i,
        height: j
      }), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
        left: h.left - e.left - d.left,
        width: i,
        height: j
      });
    }
  }), a.ui.plugin.add("resizable", "alsoResize", {
    start: function start() {
      var b = a(this).resizable("instance"),
          c = b.options;
      a(c.alsoResize).each(function () {
        var b = a(this);
        b.data("ui-resizable-alsoresize", {
          width: parseInt(b.width(), 10),
          height: parseInt(b.height(), 10),
          left: parseInt(b.css("left"), 10),
          top: parseInt(b.css("top"), 10)
        });
      });
    },
    resize: function resize(b, c) {
      var d = a(this).resizable("instance"),
          e = d.options,
          f = d.originalSize,
          g = d.originalPosition,
          h = {
        height: d.size.height - f.height || 0,
        width: d.size.width - f.width || 0,
        top: d.position.top - g.top || 0,
        left: d.position.left - g.left || 0
      };
      a(e.alsoResize).each(function () {
        var b = a(this),
            d = a(this).data("ui-resizable-alsoresize"),
            e = {},
            f = b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
        a.each(f, function (a, b) {
          var c = (d[b] || 0) + (h[b] || 0);
          c && c >= 0 && (e[b] = c || null);
        }), b.css(e);
      });
    },
    stop: function stop() {
      a(this).removeData("resizable-alsoresize");
    }
  }), a.ui.plugin.add("resizable", "ghost", {
    start: function start() {
      var b = a(this).resizable("instance"),
          c = b.options,
          d = b.size;
      b.ghost = b.originalElement.clone(), b.ghost.css({
        opacity: .25,
        display: "block",
        position: "relative",
        height: d.height,
        width: d.width,
        margin: 0,
        left: 0,
        top: 0
      }).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper);
    },
    resize: function resize() {
      var b = a(this).resizable("instance");
      b.ghost && b.ghost.css({
        position: "relative",
        height: b.size.height,
        width: b.size.width
      });
    },
    stop: function stop() {
      var b = a(this).resizable("instance");
      b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0));
    }
  }), a.ui.plugin.add("resizable", "grid", {
    resize: function resize() {
      var b,
          c = a(this).resizable("instance"),
          d = c.options,
          e = c.size,
          f = c.originalSize,
          g = c.originalPosition,
          h = c.axis,
          i = "number" == typeof d.grid ? [d.grid, d.grid] : d.grid,
          j = i[0] || 1,
          k = i[1] || 1,
          l = Math.round((e.width - f.width) / j) * j,
          m = Math.round((e.height - f.height) / k) * k,
          n = f.width + l,
          o = f.height + m,
          p = d.maxWidth && d.maxWidth < n,
          q = d.maxHeight && d.maxHeight < o,
          r = d.minWidth && d.minWidth > n,
          s = d.minHeight && d.minHeight > o;
      d.grid = i, r && (n += j), s && (o += k), p && (n -= j), q && (o -= k), /^(se|s|e)$/.test(h) ? (c.size.width = n, c.size.height = o) : /^(ne)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.top = g.top - m) : /^(sw)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.left = g.left - l) : ((0 >= o - k || 0 >= n - j) && (b = c._getPaddingPlusBorderDimensions(this)), o - k > 0 ? (c.size.height = o, c.position.top = g.top - m) : (o = k - b.height, c.size.height = o, c.position.top = g.top + f.height - o), n - j > 0 ? (c.size.width = n, c.position.left = g.left - l) : (n = j - b.width, c.size.width = n, c.position.left = g.left + f.width - n));
    }
  });
  a.ui.resizable, a.widget("ui.selectable", a.ui.mouse, {
    version: "1.11.4",
    options: {
      appendTo: "body",
      autoRefresh: !0,
      distance: 0,
      filter: "*",
      tolerance: "touch",
      selected: null,
      selecting: null,
      start: null,
      stop: null,
      unselected: null,
      unselecting: null
    },
    _create: function _create() {
      var b,
          c = this;
      this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
        b = a(c.options.filter, c.element[0]), b.addClass("ui-selectee"), b.each(function () {
          var b = a(this),
              c = b.offset();
          a.data(this, "selectable-item", {
            element: this,
            $element: b,
            left: c.left,
            top: c.top,
            right: c.left + b.outerWidth(),
            bottom: c.top + b.outerHeight(),
            startselected: !1,
            selected: b.hasClass("ui-selected"),
            selecting: b.hasClass("ui-selecting"),
            unselecting: b.hasClass("ui-unselecting")
          });
        });
      }, this.refresh(), this.selectees = b.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>");
    },
    _destroy: function _destroy() {
      this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy();
    },
    _mouseStart: function _mouseStart(b) {
      var c = this,
          d = this.options;
      this.opos = [b.pageX, b.pageY], this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
        left: b.pageX,
        top: b.pageY,
        width: 0,
        height: 0
      }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
        var d = a.data(this, "selectable-item");
        d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
          unselecting: d.element
        }));
      }), a(b.target).parents().addBack().each(function () {
        var d,
            e = a.data(this, "selectable-item");
        return e ? (d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), e.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting"), e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, {
          selecting: e.element
        }) : c._trigger("unselecting", b, {
          unselecting: e.element
        }), !1) : void 0;
      }));
    },
    _mouseDrag: function _mouseDrag(b) {
      if (this.dragged = !0, !this.options.disabled) {
        var c,
            d = this,
            e = this.options,
            f = this.opos[0],
            g = this.opos[1],
            h = b.pageX,
            i = b.pageY;
        return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({
          left: f,
          top: g,
          width: h - f,
          height: i - g
        }), this.selectees.each(function () {
          var c = a.data(this, "selectable-item"),
              j = !1;
          c && c.element !== d.element[0] && ("touch" === e.tolerance ? j = !(c.left > h || c.right < f || c.top > i || c.bottom < g) : "fit" === e.tolerance && (j = c.left > f && c.right < h && c.top > g && c.bottom < i), j ? (c.selected && (c.$element.removeClass("ui-selected"), c.selected = !1), c.unselecting && (c.$element.removeClass("ui-unselecting"), c.unselecting = !1), c.selecting || (c.$element.addClass("ui-selecting"), c.selecting = !0, d._trigger("selecting", b, {
            selecting: c.element
          }))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.$element.addClass("ui-selected"), c.selected = !0) : (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.startselected && (c.$element.addClass("ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, {
            unselecting: c.element
          }))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {
            unselecting: c.element
          })))));
        }), !1;
      }
    },
    _mouseStop: function _mouseStop(b) {
      var c = this;
      return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function () {
        var d = a.data(this, "selectable-item");
        d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
          unselected: d.element
        });
      }), a(".ui-selecting", this.element[0]).each(function () {
        var d = a.data(this, "selectable-item");
        d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
          selected: d.element
        });
      }), this._trigger("stop", b), this.helper.remove(), !1;
    }
  }), a.widget("ui.sortable", a.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "sort",
    ready: !1,
    options: {
      appendTo: "parent",
      axis: !1,
      connectWith: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      dropOnEmpty: !0,
      forcePlaceholderSize: !1,
      forceHelperSize: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      items: "> *",
      opacity: !1,
      placeholder: !1,
      revert: !1,
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1e3,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },
    _isOverAxis: function _isOverAxis(a, b, c) {
      return a >= b && b + c > a;
    },
    _isFloating: function _isFloating(a) {
      return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"));
    },
    _create: function _create() {
      this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0;
    },
    _setOption: function _setOption(a, b) {
      this._super(a, b), "handle" === a && this._setHandleClassName();
    },
    _setHandleClassName: function _setHandleClassName() {
      this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), a.each(this.items, function () {
        (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle");
      });
    },
    _destroy: function _destroy() {
      this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();

      for (var a = this.items.length - 1; a >= 0; a--) {
        this.items[a].item.removeData(this.widgetName + "-item");
      }

      return this;
    },
    _mouseCapture: function _mouseCapture(b, c) {
      var d = null,
          e = !1,
          f = this;
      return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(b), a(b.target).parents().each(function () {
        return a.data(this, f.widgetName + "-item") === f ? (d = a(this), !1) : void 0;
      }), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), d && (!this.options.handle || c || (a(this.options.handle, d).find("*").addBack().each(function () {
        this === b.target && (e = !0);
      }), e)) ? (this.currentItem = d, this._removeCurrentsFromItems(), !0) : !1);
    },
    _mouseStart: function _mouseStart(b, c, d) {
      var e,
          f,
          g = this.options;
      if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, a.extend(this.offset, {
        click: {
          left: b.pageX - this.offset.left,
          top: b.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {
        prev: this.currentItem.prev()[0],
        parent: this.currentItem.parent()[0]
      }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d) for (e = this.containers.length - 1; e >= 0; e--) {
        this.containers[e]._trigger("activate", b, this._uiHash(this));
      }
      return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0;
    },
    _mouseDrag: function _mouseDrag(b) {
      var c,
          d,
          e,
          f,
          g = this.options,
          h = !1;

      for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - this.document.scrollTop() < g.scrollSensitivity ? h = this.document.scrollTop(this.document.scrollTop() - g.scrollSpeed) : this.window.height() - (b.pageY - this.document.scrollTop()) < g.scrollSensitivity && (h = this.document.scrollTop(this.document.scrollTop() + g.scrollSpeed)), b.pageX - this.document.scrollLeft() < g.scrollSensitivity ? h = this.document.scrollLeft(this.document.scrollLeft() - g.scrollSpeed) : this.window.width() - (b.pageX - this.document.scrollLeft()) < g.scrollSensitivity && (h = this.document.scrollLeft(this.document.scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--) {
        if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && e !== this.currentItem[0] && this.placeholder[1 === f ? "next" : "prev"]()[0] !== e && !a.contains(this.placeholder[0], e) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], e) : !0)) {
          if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
          this._rearrange(b, d), this._trigger("change", b, this._uiHash());
          break;
        }
      }

      return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
    },
    _mouseStop: function _mouseStop(b, c) {
      if (b) {
        if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
          var d = this,
              e = this.placeholder.offset(),
              f = this.options.axis,
              g = {};
          f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function () {
            d._clear(b);
          });
        } else this._clear(b, c);

        return !1;
      }
    },
    cancel: function cancel() {
      if (this.dragging) {
        this._mouseUp({
          target: null
        }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();

        for (var b = this.containers.length - 1; b >= 0; b--) {
          this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0);
        }
      }

      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
        helper: null,
        dragging: !1,
        reverting: !1,
        _noFinalSort: null
      }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this;
    },
    serialize: function serialize(b) {
      var c = this._getItemsAsjQuery(b && b.connected),
          d = [];

      return b = b || {}, a(c).each(function () {
        var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
        c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]));
      }), !d.length && b.key && d.push(b.key + "="), d.join("&");
    },
    toArray: function toArray(b) {
      var c = this._getItemsAsjQuery(b && b.connected),
          d = [];

      return b = b || {}, c.each(function () {
        d.push(a(b.item || this).attr(b.attribute || "id") || "");
      }), d;
    },
    _intersectsWith: function _intersectsWith(a) {
      var b = this.positionAbs.left,
          c = b + this.helperProportions.width,
          d = this.positionAbs.top,
          e = d + this.helperProportions.height,
          f = a.left,
          g = f + a.width,
          h = a.top,
          i = h + a.height,
          j = this.offset.click.top,
          k = this.offset.click.left,
          l = "x" === this.options.axis || d + j > h && i > d + j,
          m = "y" === this.options.axis || b + k > f && g > b + k,
          n = l && m;
      return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i;
    },
    _intersectsWithPointer: function _intersectsWithPointer(a) {
      var b = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height),
          c = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width),
          d = b && c,
          e = this._getDragVerticalDirection(),
          f = this._getDragHorizontalDirection();

      return d ? this.floating ? f && "right" === f || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1) : !1;
    },
    _intersectsWithSides: function _intersectsWithSides(a) {
      var b = this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
          c = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
          d = this._getDragVerticalDirection(),
          e = this._getDragHorizontalDirection();

      return this.floating && e ? "right" === e && c || "left" === e && !c : d && ("down" === d && b || "up" === d && !b);
    },
    _getDragVerticalDirection: function _getDragVerticalDirection() {
      var a = this.positionAbs.top - this.lastPositionAbs.top;
      return 0 !== a && (a > 0 ? "down" : "up");
    },
    _getDragHorizontalDirection: function _getDragHorizontalDirection() {
      var a = this.positionAbs.left - this.lastPositionAbs.left;
      return 0 !== a && (a > 0 ? "right" : "left");
    },
    refresh: function refresh(a) {
      return this._refreshItems(a), this._setHandleClassName(), this.refreshPositions(), this;
    },
    _connectWith: function _connectWith() {
      var a = this.options;
      return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith;
    },
    _getItemsAsjQuery: function _getItemsAsjQuery(b) {
      function c() {
        h.push(this);
      }

      var d,
          e,
          f,
          g,
          h = [],
          i = [],
          j = this._connectWith();

      if (j && b) for (d = j.length - 1; d >= 0; d--) {
        for (f = a(j[d], this.document[0]), e = f.length - 1; e >= 0; e--) {
          g = a.data(f[e], this.widgetFullName), g && g !== this && !g.options.disabled && i.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g]);
        }
      }

      for (i.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
        options: this.options,
        item: this.currentItem
      }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), d = i.length - 1; d >= 0; d--) {
        i[d][0].each(c);
      }

      return a(h);
    },
    _removeCurrentsFromItems: function _removeCurrentsFromItems() {
      var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = a.grep(this.items, function (a) {
        for (var c = 0; c < b.length; c++) {
          if (b[c] === a.item[0]) return !1;
        }

        return !0;
      });
    },
    _refreshItems: function _refreshItems(b) {
      this.items = [], this.containers = [this];

      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = this.items,
          l = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
        item: this.currentItem
      }) : a(this.options.items, this.element), this]],
          m = this._connectWith();

      if (m && this.ready) for (c = m.length - 1; c >= 0; c--) {
        for (e = a(m[c], this.document[0]), d = e.length - 1; d >= 0; d--) {
          f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {
            item: this.currentItem
          }) : a(f.options.items, f.element), f]), this.containers.push(f));
        }
      }

      for (c = l.length - 1; c >= 0; c--) {
        for (g = l[c][1], h = l[c][0], d = 0, j = h.length; j > d; d++) {
          i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({
            item: i,
            instance: g,
            width: 0,
            height: 0,
            left: 0,
            top: 0
          });
        }
      }
    },
    refreshPositions: function refreshPositions(b) {
      this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      var c, d, e, f;

      for (c = this.items.length - 1; c >= 0; c--) {
        d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top);
      }

      if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);else for (c = this.containers.length - 1; c >= 0; c--) {
        f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
      }
      return this;
    },
    _createPlaceholder: function _createPlaceholder(b) {
      b = b || this;
      var c,
          d = b.options;
      d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
        element: function element() {
          var d = b.currentItem[0].nodeName.toLowerCase(),
              e = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
          return "tbody" === d ? b._createTrPlaceholder(b.currentItem.find("tr").eq(0), a("<tr>", b.document[0]).appendTo(e)) : "tr" === d ? b._createTrPlaceholder(b.currentItem, e) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), e;
        },
        update: function update(a, e) {
          c && !d.forcePlaceholderSize || (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)));
        }
      }), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder);
    },
    _createTrPlaceholder: function _createTrPlaceholder(b, c) {
      var d = this;
      b.children().each(function () {
        a("<td>&#160;</td>", d.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(c);
      });
    },
    _contactContainers: function _contactContainers(b) {
      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m = null,
          n = null;

      for (c = this.containers.length - 1; c >= 0; c--) {
        if (!a.contains(this.currentItem[0], this.containers[c].element[0])) if (this._intersectsWith(this.containers[c].containerCache)) {
          if (m && a.contains(this.containers[c].element[0], m.element[0])) continue;
          m = this.containers[c], n = c;
        } else this.containers[c].containerCache.over && (this.containers[c]._trigger("out", b, this._uiHash(this)), this.containers[c].containerCache.over = 0);
      }

      if (m) if (1 === this.containers.length) this.containers[n].containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1);else {
        for (e = 1e4, f = null, k = m.floating || this._isFloating(this.currentItem), g = k ? "left" : "top", h = k ? "width" : "height", l = k ? "clientX" : "clientY", d = this.items.length - 1; d >= 0; d--) {
          a.contains(this.containers[n].element[0], this.items[d].item[0]) && this.items[d].item[0] !== this.currentItem[0] && (i = this.items[d].item.offset()[g], j = !1, b[l] - i > this.items[d][h] / 2 && (j = !0), Math.abs(b[l] - i) < e && (e = Math.abs(b[l] - i), f = this.items[d], this.direction = j ? "up" : "down"));
        }

        if (!f && !this.options.dropOnEmpty) return;
        if (this.currentContainer === this.containers[n]) return void (this.currentContainer.containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash()), this.currentContainer.containerCache.over = 1));
        f ? this._rearrange(b, f, null, !0) : this._rearrange(b, null, this.containers[n].element, !0), this._trigger("change", b, this._uiHash()), this.containers[n]._trigger("change", b, this._uiHash(this)), this.currentContainer = this.containers[n], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1;
      }
    },
    _createHelper: function _createHelper(b) {
      var c = this.options,
          d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
      return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
        width: this.currentItem[0].style.width,
        height: this.currentItem[0].style.height,
        position: this.currentItem.css("position"),
        top: this.currentItem.css("top"),
        left: this.currentItem.css("left")
      }), d[0].style.width && !c.forceHelperSize || d.width(this.currentItem.width()), d[0].style.height && !c.forceHelperSize || d.height(this.currentItem.height()), d;
    },
    _adjustOffsetFromHelper: function _adjustOffsetFromHelper(b) {
      "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top);
    },
    _getParentOffset: function _getParentOffset() {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function _getRelativeOffset() {
      if ("relative" === this.cssPosition) {
        var a = this.currentItem.position();
        return {
          top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        };
      }

      return {
        top: 0,
        left: 0
      };
    },
    _cacheMargins: function _cacheMargins() {
      this.margins = {
        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
      };
    },
    _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function _setContainment() {
      var b,
          c,
          d,
          e = this.options;
      "parent" === e.containment && (e.containment = this.helper[0].parentNode), "document" !== e.containment && "window" !== e.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === e.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === e.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);
    },
    _convertPositionTo: function _convertPositionTo(b, c) {
      c || (c = this.position);
      var d = "absolute" === b ? 1 : -1,
          e = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
          f = /(html|body)/i.test(e[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
      };
    },
    _generatePosition: function _generatePosition(b) {
      var c,
          d,
          e = this.options,
          f = b.pageX,
          g = b.pageY,
          h = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
          i = /(html|body)/i.test(h[0].tagName);
      return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
      };
    },
    _rearrange: function _rearrange(a, b, c, d) {
      c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var e = this.counter;

      this._delay(function () {
        e === this.counter && this.refreshPositions(!d);
      });
    },
    _clear: function _clear(a, b) {
      function c(a, b, c) {
        return function (d) {
          c._trigger(a, d, b._uiHash(b));
        };
      }

      this.reverting = !1;
      var d,
          e = [];

      if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
        for (d in this._storedCSS) {
          "auto" !== this._storedCSS[d] && "static" !== this._storedCSS[d] || (this._storedCSS[d] = "");
        }

        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
      } else this.currentItem.show();

      for (this.fromOutside && !b && e.push(function (a) {
        this._trigger("receive", a, this._uiHash(this.fromOutside));
      }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || e.push(function (a) {
        this._trigger("update", a, this._uiHash());
      }), this !== this.currentContainer && (b || (e.push(function (a) {
        this._trigger("remove", a, this._uiHash());
      }), e.push(function (a) {
        return function (b) {
          a._trigger("receive", b, this._uiHash(this));
        };
      }.call(this, this.currentContainer)), e.push(function (a) {
        return function (b) {
          a._trigger("update", b, this._uiHash(this));
        };
      }.call(this, this.currentContainer)))), d = this.containers.length - 1; d >= 0; d--) {
        b || e.push(c("deactivate", this, this.containers[d])), this.containers[d].containerCache.over && (e.push(c("out", this, this.containers[d])), this.containers[d].containerCache.over = 0);
      }

      if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !b) {
        for (d = 0; d < e.length; d++) {
          e[d].call(this, a);
        }

        this._trigger("stop", a, this._uiHash());
      }

      return this.fromOutside = !1, !this.cancelHelperRemoval;
    },
    _trigger: function _trigger() {
      a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
    },
    _uiHash: function _uiHash(b) {
      var c = b || this;
      return {
        helper: c.helper,
        placeholder: c.placeholder || a([]),
        position: c.position,
        originalPosition: c.originalPosition,
        offset: c.positionAbs,
        item: c.currentItem,
        sender: b ? b.element : null
      };
    }
  }), a.widget("ui.slider", a.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    numPages: 5,
    _create: function _create() {
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1;
    },
    _refresh: function _refresh() {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
    },
    _createHandles: function _createHandles() {
      var b,
          c,
          d = this.options,
          e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
          f = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
          g = [];

      for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; c > b; b++) {
        g.push(f);
      }

      this.handles = e.add(a(g.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (b) {
        a(this).data("ui-slider-handle-index", b);
      });
    },
    _createRange: function _createRange() {
      var b = this.options,
          c = "";
      b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
        left: "",
        bottom: ""
      }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : (this.range && this.range.remove(), this.range = null);
    },
    _setupEvents: function _setupEvents() {
      this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
    },
    _destroy: function _destroy() {
      this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy();
    },
    _mouseCapture: function _mouseCapture(b) {
      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = this,
          l = this.options;
      return l.disabled ? !1 : (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), c = {
        x: b.pageX,
        y: b.pageY
      }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function (b) {
        var c = Math.abs(d - k.values(b));
        (e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b);
      }), h = this._start(b, g), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = g, f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {
        left: 0,
        top: 0
      } : {
        left: b.pageX - i.left - f.width() / 2,
        top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
      }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0));
    },
    _mouseStart: function _mouseStart() {
      return !0;
    },
    _mouseDrag: function _mouseDrag(a) {
      var b = {
        x: a.pageX,
        y: a.pageY
      },
          c = this._normValueFromMouse(b);

      return this._slide(a, this._handleIndex, c), !1;
    },
    _mouseStop: function _mouseStop(a) {
      return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1;
    },
    _detectOrientation: function _detectOrientation() {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
    },
    _normValueFromMouse: function _normValueFromMouse(a) {
      var b, c, d, e, f;
      return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f);
    },
    _start: function _start(a, b) {
      var c = {
        handle: this.handles[b],
        value: this.value()
      };
      return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c);
    },
    _slide: function _slide(a, b, c) {
      var d, e, f;
      this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
        handle: this.handles[b],
        value: c,
        values: e
      }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c))) : c !== this.value() && (f = this._trigger("slide", a, {
        handle: this.handles[b],
        value: c
      }), f !== !1 && this.value(c));
    },
    _stop: function _stop(a, b) {
      var c = {
        handle: this.handles[b],
        value: this.value()
      };
      this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c);
    },
    _change: function _change(a, b) {
      if (!this._keySliding && !this._mouseSliding) {
        var c = {
          handle: this.handles[b],
          value: this.value()
        };
        this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c);
      }
    },
    value: function value(a) {
      return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value();
    },
    values: function values(b, c) {
      var d, e, f;
      if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b);
      if (!arguments.length) return this._values();
      if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();

      for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) {
        d[f] = this._trimAlignValue(e[f]), this._change(null, f);
      }

      this._refreshValue();
    },
    _setOption: function _setOption(b, c) {
      var d,
          e = 0;

      switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), "disabled" === b && this.element.toggleClass("ui-state-disabled", !!c), this._super(b, c), b) {
        case "orientation":
          this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === c ? "bottom" : "left", "");
          break;

        case "value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
          break;

        case "values":
          for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1) {
            this._change(null, d);
          }

          this._animateOff = !1;
          break;

        case "step":
        case "min":
        case "max":
          this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
          break;

        case "range":
          this._animateOff = !0, this._refresh(), this._animateOff = !1;
      }
    },
    _value: function _value() {
      var a = this.options.value;
      return a = this._trimAlignValue(a);
    },
    _values: function _values(a) {
      var b, c, d;
      if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);

      if (this.options.values && this.options.values.length) {
        for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) {
          c[d] = this._trimAlignValue(c[d]);
        }

        return c;
      }

      return [];
    },
    _trimAlignValue: function _trimAlignValue(a) {
      if (a <= this._valueMin()) return this._valueMin();
      if (a >= this._valueMax()) return this._valueMax();
      var b = this.options.step > 0 ? this.options.step : 1,
          c = (a - this._valueMin()) % b,
          d = a - c;
      return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5));
    },
    _calculateNewMax: function _calculateNewMax() {
      var a = this.options.max,
          b = this._valueMin(),
          c = this.options.step,
          d = Math.floor(+(a - b).toFixed(this._precision()) / c) * c;

      a = d + b, this.max = parseFloat(a.toFixed(this._precision()));
    },
    _precision: function _precision() {
      var a = this._precisionOf(this.options.step);

      return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a;
    },
    _precisionOf: function _precisionOf(a) {
      var b = a.toString(),
          c = b.indexOf(".");
      return -1 === c ? 0 : b.length - c - 1;
    },
    _valueMin: function _valueMin() {
      return this.options.min;
    },
    _valueMax: function _valueMax() {
      return this.max;
    },
    _refreshValue: function _refreshValue() {
      var b,
          c,
          d,
          e,
          f,
          g = this.options.range,
          h = this.options,
          i = this,
          j = this._animateOff ? !1 : h.animate,
          k = {};
      this.options.values && this.options.values.length ? this.handles.each(function (d) {
        c = (i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin()) * 100, k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
          left: c + "%"
        }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
          width: c - b + "%"
        }, {
          queue: !1,
          duration: h.animate
        })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
          bottom: c + "%"
        }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
          height: c - b + "%"
        }, {
          queue: !1,
          duration: h.animate
        }))), b = c;
      }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? (d - e) / (f - e) * 100 : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
        width: c + "%"
      }, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({
        width: 100 - c + "%"
      }, {
        queue: !1,
        duration: h.animate
      }), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
        height: c + "%"
      }, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({
        height: 100 - c + "%"
      }, {
        queue: !1,
        duration: h.animate
      }));
    },
    _handleEvents: {
      keydown: function keydown(b) {
        var c,
            d,
            e,
            f,
            g = a(b.target).data("ui-slider-handle-index");

        switch (b.keyCode) {
          case a.ui.keyCode.HOME:
          case a.ui.keyCode.END:
          case a.ui.keyCode.PAGE_UP:
          case a.ui.keyCode.PAGE_DOWN:
          case a.ui.keyCode.UP:
          case a.ui.keyCode.RIGHT:
          case a.ui.keyCode.DOWN:
          case a.ui.keyCode.LEFT:
            if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, a(b.target).addClass("ui-state-active"), c = this._start(b, g), c === !1)) return;
        }

        switch (f = this.options.step, d = e = this.options.values && this.options.values.length ? this.values(g) : this.value(), b.keyCode) {
          case a.ui.keyCode.HOME:
            e = this._valueMin();
            break;

          case a.ui.keyCode.END:
            e = this._valueMax();
            break;

          case a.ui.keyCode.PAGE_UP:
            e = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages);
            break;

          case a.ui.keyCode.PAGE_DOWN:
            e = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages);
            break;

          case a.ui.keyCode.UP:
          case a.ui.keyCode.RIGHT:
            if (d === this._valueMax()) return;
            e = this._trimAlignValue(d + f);
            break;

          case a.ui.keyCode.DOWN:
          case a.ui.keyCode.LEFT:
            if (d === this._valueMin()) return;
            e = this._trimAlignValue(d - f);
        }

        this._slide(b, g, e);
      },
      keyup: function keyup(b) {
        var c = a(b.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"));
      }
    }
  });
});

/***/ }),

/***/ "./assets/js/jquery.easypiechart.min.js":
/*!**********************************************!*\
  !*** ./assets/js/jquery.easypiechart.min.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.date.now.js */ "./node_modules/core-js/modules/es.date.now.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**!
 * easy-pie-chart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license 
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.7
 **/
!function (a, b) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (a) {
    return b(a);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(this, function (a) {
  var b = function b(a, _b) {
    var c,
        d = document.createElement("canvas");
    a.appendChild(d), "object" == (typeof G_vmlCanvasManager === "undefined" ? "undefined" : _typeof(G_vmlCanvasManager)) && G_vmlCanvasManager.initElement(d);
    var e = d.getContext("2d");
    d.width = d.height = _b.size;
    var f = 1;
    window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [_b.size, "px"].join(""), d.width = d.height = _b.size * f, e.scale(f, f)), e.translate(_b.size / 2, _b.size / 2), e.rotate((-0.5 + _b.rotate / 180) * Math.PI);
    var g = (_b.size - _b.lineWidth) / 2;
    _b.scaleColor && _b.scaleLength && (g -= _b.scaleLength + 2), Date.now = Date.now || function () {
      return +new Date();
    };

    var h = function h(a, b, c) {
      c = Math.min(Math.max(-1, c || 0), 1);
      var d = 0 >= c;
      e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke();
    },
        i = function i() {
      var a, c;
      e.lineWidth = 1, e.fillStyle = _b.scaleColor, e.save();

      for (var d = 24; d > 0; --d) {
        d % 6 === 0 ? (c = _b.scaleLength, a = 0) : (c = .6 * _b.scaleLength, a = _b.scaleLength - c), e.fillRect(-_b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
      }

      e.restore();
    },
        j = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) {
        window.setTimeout(a, 1e3 / 60);
      };
    }(),
        k = function k() {
      _b.scaleColor && i(), _b.trackColor && h(_b.trackColor, _b.trackWidth || _b.lineWidth, 1);
    };

    this.getCanvas = function () {
      return d;
    }, this.getCtx = function () {
      return e;
    }, this.clear = function () {
      e.clearRect(_b.size / -2, _b.size / -2, _b.size, _b.size);
    }, this.draw = function (a) {
      _b.scaleColor || _b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, _b.size * f, _b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = _b.lineCap;
      var d;
      d = "function" == typeof _b.barColor ? _b.barColor(a) : _b.barColor, h(d, _b.lineWidth, a / 100);
    }.bind(this), this.animate = function (a, c) {
      var d = Date.now();

      _b.onStart(a, c);

      var e = function () {
        var f = Math.min(Date.now() - d, _b.animate.duration),
            g = _b.easing(this, f, a, c - a, _b.animate.duration);

        this.draw(g), _b.onStep(a, c, g), f >= _b.animate.duration ? _b.onStop(a, c) : j(e);
      }.bind(this);

      j(e);
    }.bind(this);
  },
      c = function c(a, _c) {
    var d = {
      barColor: "#ef1e25",
      trackColor: "#f9f9f9",
      scaleColor: "#dfe0e0",
      scaleLength: 5,
      lineCap: "round",
      lineWidth: 3,
      trackWidth: void 0,
      size: 110,
      rotate: 0,
      animate: {
        duration: 1e3,
        enabled: !0
      },
      easing: function easing(a, b, c, d, e) {
        return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c;
      },
      onStart: function onStart(a, b) {},
      onStep: function onStep(a, b, c) {},
      onStop: function onStop(a, b) {}
    };
    if ("undefined" != typeof b) d.renderer = b;else {
      if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
      d.renderer = SVGRenderer;
    }

    var e = {},
        f = 0,
        g = function () {
      this.el = a, this.options = e;

      for (var b in d) {
        d.hasOwnProperty(b) && (e[b] = _c && "undefined" != typeof _c[b] ? _c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
      }

      "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? e.easing = jQuery.easing[e.easing] : e.easing = d.easing, "number" == typeof e.animate && (e.animate = {
        duration: e.animate,
        enabled: !0
      }), "boolean" != typeof e.animate || e.animate || (e.animate = {
        duration: 1e3,
        enabled: e.animate
      }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent"))), a.style.width = a.style.height = e.size + "px", a.style.lineHeight = e.size - 1 + "px";
    }.bind(this);

    this.update = function (a) {
      return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this;
    }.bind(this), this.disableAnimation = function () {
      return e.animate.enabled = !1, this;
    }, this.enableAnimation = function () {
      return e.animate.enabled = !0, this;
    }, g();
  };

  a.fn.easyPieChart = function (b) {
    return this.each(function () {
      var d;
      a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)));
    });
  };
});

/***/ }),

/***/ "./assets/js/jquery.flot.min.js":
/*!**************************************!*\
  !*** ./assets/js/jquery.flot.min.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.array.fill.js */ "./node_modules/core-js/modules/es.array.fill.js");

__webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

/* Javascript plotting library for jQuery, version 0.8.3.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

*/
!function (a) {
  a.color = {}, a.color.make = function (b, c, d, e) {
    var f = {};
    return f.r = b || 0, f.g = c || 0, f.b = d || 0, f.a = null != e ? e : 1, f.add = function (a, b) {
      for (var c = 0; c < a.length; ++c) {
        f[a.charAt(c)] += b;
      }

      return f.normalize();
    }, f.scale = function (a, b) {
      for (var c = 0; c < a.length; ++c) {
        f[a.charAt(c)] *= b;
      }

      return f.normalize();
    }, f.toString = function () {
      return f.a >= 1 ? "rgb(" + [f.r, f.g, f.b].join(",") + ")" : "rgba(" + [f.r, f.g, f.b, f.a].join(",") + ")";
    }, f.normalize = function () {
      function a(a, b, c) {
        return a > b ? a : b > c ? c : b;
      }

      return f.r = a(0, parseInt(f.r), 255), f.g = a(0, parseInt(f.g), 255), f.b = a(0, parseInt(f.b), 255), f.a = a(0, f.a, 1), f;
    }, f.clone = function () {
      return a.color.make(f.r, f.b, f.g, f.a);
    }, f.normalize();
  }, a.color.extract = function (b, c) {
    var d;

    do {
      if (d = b.css(c).toLowerCase(), "" != d && "transparent" != d) break;
      b = b.parent();
    } while (b.length && !a.nodeName(b.get(0), "body"));

    return "rgba(0, 0, 0, 0)" == d && (d = "transparent"), a.color.parse(d);
  }, a.color.parse = function (c) {
    var d,
        e = a.color.make;
    if (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c)) return e(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10));
    if (d = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c)) return e(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10), parseFloat(d[4]));
    if (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c)) return e(2.55 * parseFloat(d[1]), 2.55 * parseFloat(d[2]), 2.55 * parseFloat(d[3]));
    if (d = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c)) return e(2.55 * parseFloat(d[1]), 2.55 * parseFloat(d[2]), 2.55 * parseFloat(d[3]), parseFloat(d[4]));
    if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c)) return e(parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16));
    if (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c)) return e(parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16));
    var f = a.trim(c).toLowerCase();
    return "transparent" == f ? e(255, 255, 255, 0) : (d = b[f] || [0, 0, 0], e(d[0], d[1], d[2]));
  };
  var b = {
    aqua: [0, 255, 255],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    black: [0, 0, 0],
    blue: [0, 0, 255],
    brown: [165, 42, 42],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgrey: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkviolet: [148, 0, 211],
    fuchsia: [255, 0, 255],
    gold: [255, 215, 0],
    green: [0, 128, 0],
    indigo: [75, 0, 130],
    khaki: [240, 230, 140],
    lightblue: [173, 216, 230],
    lightcyan: [224, 255, 255],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    navy: [0, 0, 128],
    olive: [128, 128, 0],
    orange: [255, 165, 0],
    pink: [255, 192, 203],
    purple: [128, 0, 128],
    violet: [128, 0, 128],
    red: [255, 0, 0],
    silver: [192, 192, 192],
    white: [255, 255, 255],
    yellow: [255, 255, 0]
  };
}(jQuery), function (a) {
  function b(b, c) {
    var d = c.children("." + b)[0];

    if (null == d && (d = document.createElement("canvas"), d.className = b, a(d).css({
      direction: "ltr",
      position: "absolute",
      left: 0,
      top: 0
    }).appendTo(c), !d.getContext)) {
      if (!window.G_vmlCanvasManager) throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
      d = window.G_vmlCanvasManager.initElement(d);
    }

    this.element = d;
    var e = this.context = d.getContext("2d"),
        f = window.devicePixelRatio || 1,
        g = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
    this.pixelRatio = f / g, this.resize(c.width(), c.height()), this.textContainer = null, this.text = {}, this._textCache = {};
  }

  function c(c, e, f, g) {
    function h(a, b) {
      b = [qa].concat(b);

      for (var c = 0; c < a.length; ++c) {
        a[c].apply(this, b);
      }
    }

    function i() {
      for (var c = {
        Canvas: b
      }, d = 0; d < g.length; ++d) {
        var e = g[d];
        e.init(qa, c), e.options && a.extend(!0, ea, e.options);
      }
    }

    function j(b) {
      a.extend(!0, ea, b), b && b.colors && (ea.colors = b.colors), null == ea.xaxis.color && (ea.xaxis.color = a.color.parse(ea.grid.color).scale("a", .22).toString()), null == ea.yaxis.color && (ea.yaxis.color = a.color.parse(ea.grid.color).scale("a", .22).toString()), null == ea.xaxis.tickColor && (ea.xaxis.tickColor = ea.grid.tickColor || ea.xaxis.color), null == ea.yaxis.tickColor && (ea.yaxis.tickColor = ea.grid.tickColor || ea.yaxis.color), null == ea.grid.borderColor && (ea.grid.borderColor = ea.grid.color), null == ea.grid.tickColor && (ea.grid.tickColor = a.color.parse(ea.grid.color).scale("a", .22).toString());
      var d,
          e,
          f,
          g = c.css("font-size"),
          i = g ? +g.replace("px", "") : 13,
          j = {
        style: c.css("font-style"),
        size: Math.round(.8 * i),
        variant: c.css("font-variant"),
        weight: c.css("font-weight"),
        family: c.css("font-family")
      };

      for (f = ea.xaxes.length || 1, d = 0; f > d; ++d) {
        e = ea.xaxes[d], e && !e.tickColor && (e.tickColor = e.color), e = a.extend(!0, {}, ea.xaxis, e), ea.xaxes[d] = e, e.font && (e.font = a.extend({}, j, e.font), e.font.color || (e.font.color = e.color), e.font.lineHeight || (e.font.lineHeight = Math.round(1.15 * e.font.size)));
      }

      for (f = ea.yaxes.length || 1, d = 0; f > d; ++d) {
        e = ea.yaxes[d], e && !e.tickColor && (e.tickColor = e.color), e = a.extend(!0, {}, ea.yaxis, e), ea.yaxes[d] = e, e.font && (e.font = a.extend({}, j, e.font), e.font.color || (e.font.color = e.color), e.font.lineHeight || (e.font.lineHeight = Math.round(1.15 * e.font.size)));
      }

      for (ea.xaxis.noTicks && null == ea.xaxis.ticks && (ea.xaxis.ticks = ea.xaxis.noTicks), ea.yaxis.noTicks && null == ea.yaxis.ticks && (ea.yaxis.ticks = ea.yaxis.noTicks), ea.x2axis && (ea.xaxes[1] = a.extend(!0, {}, ea.xaxis, ea.x2axis), ea.xaxes[1].position = "top", null == ea.x2axis.min && (ea.xaxes[1].min = null), null == ea.x2axis.max && (ea.xaxes[1].max = null)), ea.y2axis && (ea.yaxes[1] = a.extend(!0, {}, ea.yaxis, ea.y2axis), ea.yaxes[1].position = "right", null == ea.y2axis.min && (ea.yaxes[1].min = null), null == ea.y2axis.max && (ea.yaxes[1].max = null)), ea.grid.coloredAreas && (ea.grid.markings = ea.grid.coloredAreas), ea.grid.coloredAreasColor && (ea.grid.markingsColor = ea.grid.coloredAreasColor), ea.lines && a.extend(!0, ea.series.lines, ea.lines), ea.points && a.extend(!0, ea.series.points, ea.points), ea.bars && a.extend(!0, ea.series.bars, ea.bars), null != ea.shadowSize && (ea.series.shadowSize = ea.shadowSize), null != ea.highlightColor && (ea.series.highlightColor = ea.highlightColor), d = 0; d < ea.xaxes.length; ++d) {
        q(ka, d + 1).options = ea.xaxes[d];
      }

      for (d = 0; d < ea.yaxes.length; ++d) {
        q(la, d + 1).options = ea.yaxes[d];
      }

      for (var k in pa) {
        ea.hooks[k] && ea.hooks[k].length && (pa[k] = pa[k].concat(ea.hooks[k]));
      }

      h(pa.processOptions, [ea]);
    }

    function k(a) {
      da = l(a), r(), s();
    }

    function l(b) {
      for (var c = [], d = 0; d < b.length; ++d) {
        var e = a.extend(!0, {}, ea.series);
        null != b[d].data ? (e.data = b[d].data, delete b[d].data, a.extend(!0, e, b[d]), b[d].data = e.data) : e.data = b[d], c.push(e);
      }

      return c;
    }

    function m(a, b) {
      var c = a[b + "axis"];
      return "object" == _typeof(c) && (c = c.n), "number" != typeof c && (c = 1), c;
    }

    function n() {
      return a.grep(ka.concat(la), function (a) {
        return a;
      });
    }

    function o(a) {
      var b,
          c,
          d = {};

      for (b = 0; b < ka.length; ++b) {
        c = ka[b], c && c.used && (d["x" + c.n] = c.c2p(a.left));
      }

      for (b = 0; b < la.length; ++b) {
        c = la[b], c && c.used && (d["y" + c.n] = c.c2p(a.top));
      }

      return void 0 !== d.x1 && (d.x = d.x1), void 0 !== d.y1 && (d.y = d.y1), d;
    }

    function p(a) {
      var b,
          c,
          d,
          e = {};

      for (b = 0; b < ka.length; ++b) {
        if (c = ka[b], c && c.used && (d = "x" + c.n, null == a[d] && 1 == c.n && (d = "x"), null != a[d])) {
          e.left = c.p2c(a[d]);
          break;
        }
      }

      for (b = 0; b < la.length; ++b) {
        if (c = la[b], c && c.used && (d = "y" + c.n, null == a[d] && 1 == c.n && (d = "y"), null != a[d])) {
          e.top = c.p2c(a[d]);
          break;
        }
      }

      return e;
    }

    function q(b, c) {
      return b[c - 1] || (b[c - 1] = {
        n: c,
        direction: b == ka ? "x" : "y",
        options: a.extend(!0, {}, b == ka ? ea.xaxis : ea.yaxis)
      }), b[c - 1];
    }

    function r() {
      var b,
          c = da.length,
          d = -1;

      for (b = 0; b < da.length; ++b) {
        var e = da[b].color;
        null != e && (c--, "number" == typeof e && e > d && (d = e));
      }

      d >= c && (c = d + 1);
      var f,
          g = [],
          h = ea.colors,
          i = h.length,
          j = 0;

      for (b = 0; c > b; b++) {
        f = a.color.parse(h[b % i] || "#666"), b % i == 0 && b && (j = j >= 0 ? .5 > j ? -j - .2 : 0 : -j), g[b] = f.scale("rgb", 1 + j);
      }

      var k,
          l = 0;

      for (b = 0; b < da.length; ++b) {
        if (k = da[b], null == k.color ? (k.color = g[l].toString(), ++l) : "number" == typeof k.color && (k.color = g[k.color].toString()), null == k.lines.show) {
          var n,
              o = !0;

          for (n in k) {
            if (k[n] && k[n].show) {
              o = !1;
              break;
            }
          }

          o && (k.lines.show = !0);
        }

        null == k.lines.zero && (k.lines.zero = !!k.lines.fill), k.xaxis = q(ka, m(k, "x")), k.yaxis = q(la, m(k, "y"));
      }
    }

    function s() {
      function b(a, b, c) {
        b < a.datamin && b != -s && (a.datamin = b), c > a.datamax && c != s && (a.datamax = c);
      }

      var c,
          d,
          e,
          f,
          g,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q = Number.POSITIVE_INFINITY,
          r = Number.NEGATIVE_INFINITY,
          s = Number.MAX_VALUE;

      for (a.each(n(), function (a, b) {
        b.datamin = q, b.datamax = r, b.used = !1;
      }), c = 0; c < da.length; ++c) {
        g = da[c], g.datapoints = {
          points: []
        }, h(pa.processRawData, [g, g.data, g.datapoints]);
      }

      for (c = 0; c < da.length; ++c) {
        if (g = da[c], o = g.data, p = g.datapoints.format, !p) {
          if (p = [], p.push({
            x: !0,
            number: !0,
            required: !0
          }), p.push({
            y: !0,
            number: !0,
            required: !0
          }), g.bars.show || g.lines.show && g.lines.fill) {
            var t = !!(g.bars.show && g.bars.zero || g.lines.show && g.lines.zero);
            p.push({
              y: !0,
              number: !0,
              required: !1,
              defaultValue: 0,
              autoscale: t
            }), g.bars.horizontal && (delete p[p.length - 1].y, p[p.length - 1].x = !0);
          }

          g.datapoints.format = p;
        }

        if (null == g.datapoints.pointsize) {
          g.datapoints.pointsize = p.length, j = g.datapoints.pointsize, i = g.datapoints.points;
          var u = g.lines.show && g.lines.steps;

          for (g.xaxis.used = g.yaxis.used = !0, d = e = 0; d < o.length; ++d, e += j) {
            m = o[d];
            var v = null == m;
            if (!v) for (f = 0; j > f; ++f) {
              k = m[f], l = p[f], l && (l.number && null != k && (k = +k, isNaN(k) ? k = null : k == 1 / 0 ? k = s : k == -(1 / 0) && (k = -s)), null == k && (l.required && (v = !0), null != l.defaultValue && (k = l.defaultValue))), i[e + f] = k;
            }
            if (v) for (f = 0; j > f; ++f) {
              k = i[e + f], null != k && (l = p[f], l.autoscale !== !1 && (l.x && b(g.xaxis, k, k), l.y && b(g.yaxis, k, k))), i[e + f] = null;
            } else if (u && e > 0 && null != i[e - j] && i[e - j] != i[e] && i[e - j + 1] != i[e + 1]) {
              for (f = 0; j > f; ++f) {
                i[e + j + f] = i[e + f];
              }

              i[e + 1] = i[e - j + 1], e += j;
            }
          }
        }
      }

      for (c = 0; c < da.length; ++c) {
        g = da[c], h(pa.processDatapoints, [g, g.datapoints]);
      }

      for (c = 0; c < da.length; ++c) {
        g = da[c], i = g.datapoints.points, j = g.datapoints.pointsize, p = g.datapoints.format;
        var w = q,
            x = q,
            y = r,
            z = r;

        for (d = 0; d < i.length; d += j) {
          if (null != i[d]) for (f = 0; j > f; ++f) {
            k = i[d + f], l = p[f], l && l.autoscale !== !1 && k != s && k != -s && (l.x && (w > k && (w = k), k > y && (y = k)), l.y && (x > k && (x = k), k > z && (z = k)));
          }
        }

        if (g.bars.show) {
          var A;

          switch (g.bars.align) {
            case "left":
              A = 0;
              break;

            case "right":
              A = -g.bars.barWidth;
              break;

            default:
              A = -g.bars.barWidth / 2;
          }

          g.bars.horizontal ? (x += A, z += A + g.bars.barWidth) : (w += A, y += A + g.bars.barWidth);
        }

        b(g.xaxis, w, y), b(g.yaxis, x, z);
      }

      a.each(n(), function (a, b) {
        b.datamin == q && (b.datamin = null), b.datamax == r && (b.datamax = null);
      });
    }

    function t() {
      c.css("padding", 0).children().filter(function () {
        return !a(this).hasClass("flot-overlay") && !a(this).hasClass("flot-base");
      }).remove(), "static" == c.css("position") && c.css("position", "relative"), fa = new b("flot-base", c), ga = new b("flot-overlay", c), ia = fa.context, ja = ga.context, ha = a(ga.element).unbind();
      var d = c.data("plot");
      d && (d.shutdown(), ga.clear()), c.data("plot", qa);
    }

    function u() {
      ea.grid.hoverable && (ha.mousemove(T), ha.bind("mouseleave", U)), ea.grid.clickable && ha.click(V), h(pa.bindEvents, [ha]);
    }

    function v() {
      sa && clearTimeout(sa), ha.unbind("mousemove", T), ha.unbind("mouseleave", U), ha.unbind("click", V), h(pa.shutdown, [ha]);
    }

    function w(a) {
      function b(a) {
        return a;
      }

      var c,
          d,
          e = a.options.transform || b,
          f = a.options.inverseTransform;
      "x" == a.direction ? (c = a.scale = na / Math.abs(e(a.max) - e(a.min)), d = Math.min(e(a.max), e(a.min))) : (c = a.scale = oa / Math.abs(e(a.max) - e(a.min)), c = -c, d = Math.max(e(a.max), e(a.min))), e == b ? a.p2c = function (a) {
        return (a - d) * c;
      } : a.p2c = function (a) {
        return (e(a) - d) * c;
      }, f ? a.c2p = function (a) {
        return f(d + a / c);
      } : a.c2p = function (a) {
        return d + a / c;
      };
    }

    function x(a) {
      for (var b = a.options, c = a.ticks || [], d = b.labelWidth || 0, e = b.labelHeight || 0, f = d || ("x" == a.direction ? Math.floor(fa.width / (c.length || 1)) : null), g = a.direction + "Axis " + a.direction + a.n + "Axis", h = "flot-" + a.direction + "-axis flot-" + a.direction + a.n + "-axis " + g, i = b.font || "flot-tick-label tickLabel", j = 0; j < c.length; ++j) {
        var k = c[j];

        if (k.label) {
          var l = fa.getTextInfo(h, k.label, i, null, f);
          d = Math.max(d, l.width), e = Math.max(e, l.height);
        }
      }

      a.labelWidth = b.labelWidth || d, a.labelHeight = b.labelHeight || e;
    }

    function y(b) {
      var c = b.labelWidth,
          d = b.labelHeight,
          e = b.options.position,
          f = "x" === b.direction,
          g = b.options.tickLength,
          h = ea.grid.axisMargin,
          i = ea.grid.labelMargin,
          j = !0,
          k = !0,
          l = !0,
          m = !1;
      a.each(f ? ka : la, function (a, c) {
        c && (c.show || c.reserveSpace) && (c === b ? m = !0 : c.options.position === e && (m ? k = !1 : j = !1), m || (l = !1));
      }), k && (h = 0), null == g && (g = l ? "full" : 5), isNaN(+g) || (i += +g), f ? (d += i, "bottom" == e ? (ma.bottom += d + h, b.box = {
        top: fa.height - ma.bottom,
        height: d
      }) : (b.box = {
        top: ma.top + h,
        height: d
      }, ma.top += d + h)) : (c += i, "left" == e ? (b.box = {
        left: ma.left + h,
        width: c
      }, ma.left += c + h) : (ma.right += c + h, b.box = {
        left: fa.width - ma.right,
        width: c
      })), b.position = e, b.tickLength = g, b.box.padding = i, b.innermost = j;
    }

    function z(a) {
      "x" == a.direction ? (a.box.left = ma.left - a.labelWidth / 2, a.box.width = fa.width - ma.left - ma.right + a.labelWidth) : (a.box.top = ma.top - a.labelHeight / 2, a.box.height = fa.height - ma.bottom - ma.top + a.labelHeight);
    }

    function A() {
      var b,
          c = ea.grid.minBorderMargin;
      if (null == c) for (c = 0, b = 0; b < da.length; ++b) {
        c = Math.max(c, 2 * (da[b].points.radius + da[b].points.lineWidth / 2));
      }
      var d = {
        left: c,
        right: c,
        top: c,
        bottom: c
      };
      a.each(n(), function (a, b) {
        b.reserveSpace && b.ticks && b.ticks.length && ("x" === b.direction ? (d.left = Math.max(d.left, b.labelWidth / 2), d.right = Math.max(d.right, b.labelWidth / 2)) : (d.bottom = Math.max(d.bottom, b.labelHeight / 2), d.top = Math.max(d.top, b.labelHeight / 2)));
      }), ma.left = Math.ceil(Math.max(d.left, ma.left)), ma.right = Math.ceil(Math.max(d.right, ma.right)), ma.top = Math.ceil(Math.max(d.top, ma.top)), ma.bottom = Math.ceil(Math.max(d.bottom, ma.bottom));
    }

    function B() {
      var b,
          c = n(),
          d = ea.grid.show;

      for (var e in ma) {
        var f = ea.grid.margin || 0;
        ma[e] = "number" == typeof f ? f : f[e] || 0;
      }

      h(pa.processOffset, [ma]);

      for (var e in ma) {
        "object" == _typeof(ea.grid.borderWidth) ? ma[e] += d ? ea.grid.borderWidth[e] : 0 : ma[e] += d ? ea.grid.borderWidth : 0;
      }

      if (a.each(c, function (a, b) {
        var c = b.options;
        b.show = null == c.show ? b.used : c.show, b.reserveSpace = null == c.reserveSpace ? b.show : c.reserveSpace, C(b);
      }), d) {
        var g = a.grep(c, function (a) {
          return a.show || a.reserveSpace;
        });

        for (a.each(g, function (a, b) {
          D(b), E(b), F(b, b.ticks), x(b);
        }), b = g.length - 1; b >= 0; --b) {
          y(g[b]);
        }

        A(), a.each(g, function (a, b) {
          z(b);
        });
      }

      na = fa.width - ma.left - ma.right, oa = fa.height - ma.bottom - ma.top, a.each(c, function (a, b) {
        w(b);
      }), d && K(), R();
    }

    function C(a) {
      var b = a.options,
          c = +(null != b.min ? b.min : a.datamin),
          d = +(null != b.max ? b.max : a.datamax),
          e = d - c;

      if (0 == e) {
        var f = 0 == d ? 1 : .01;
        null == b.min && (c -= f), null != b.max && null == b.min || (d += f);
      } else {
        var g = b.autoscaleMargin;
        null != g && (null == b.min && (c -= e * g, 0 > c && null != a.datamin && a.datamin >= 0 && (c = 0)), null == b.max && (d += e * g, d > 0 && null != a.datamax && a.datamax <= 0 && (d = 0)));
      }

      a.min = c, a.max = d;
    }

    function D(b) {
      var c,
          e = b.options;
      c = "number" == typeof e.ticks && e.ticks > 0 ? e.ticks : .3 * Math.sqrt("x" == b.direction ? fa.width : fa.height);
      var f = (b.max - b.min) / c,
          g = -Math.floor(Math.log(f) / Math.LN10),
          h = e.tickDecimals;
      null != h && g > h && (g = h);
      var i,
          j = Math.pow(10, -g),
          k = f / j;
      if (1.5 > k ? i = 1 : 3 > k ? (i = 2, k > 2.25 && (null == h || h >= g + 1) && (i = 2.5, ++g)) : i = 7.5 > k ? 5 : 10, i *= j, null != e.minTickSize && i < e.minTickSize && (i = e.minTickSize), b.delta = f, b.tickDecimals = Math.max(0, null != h ? h : g), b.tickSize = e.tickSize || i, "time" == e.mode && !b.tickGenerator) throw new Error("Time mode requires the flot.time plugin.");

      if (b.tickGenerator || (b.tickGenerator = function (a) {
        var b,
            c = [],
            e = d(a.min, a.tickSize),
            f = 0,
            g = Number.NaN;

        do {
          b = g, g = e + f * a.tickSize, c.push(g), ++f;
        } while (g < a.max && g != b);

        return c;
      }, b.tickFormatter = function (a, b) {
        var c = b.tickDecimals ? Math.pow(10, b.tickDecimals) : 1,
            d = "" + Math.round(a * c) / c;

        if (null != b.tickDecimals) {
          var e = d.indexOf("."),
              f = -1 == e ? 0 : d.length - e - 1;
          if (f < b.tickDecimals) return (f ? d : d + ".") + ("" + c).substr(1, b.tickDecimals - f);
        }

        return d;
      }), a.isFunction(e.tickFormatter) && (b.tickFormatter = function (a, b) {
        return "" + e.tickFormatter(a, b);
      }), null != e.alignTicksWithAxis) {
        var l = ("x" == b.direction ? ka : la)[e.alignTicksWithAxis - 1];

        if (l && l.used && l != b) {
          var m = b.tickGenerator(b);

          if (m.length > 0 && (null == e.min && (b.min = Math.min(b.min, m[0])), null == e.max && m.length > 1 && (b.max = Math.max(b.max, m[m.length - 1]))), b.tickGenerator = function (a) {
            var b,
                c,
                d = [];

            for (c = 0; c < l.ticks.length; ++c) {
              b = (l.ticks[c].v - l.min) / (l.max - l.min), b = a.min + b * (a.max - a.min), d.push(b);
            }

            return d;
          }, !b.mode && null == e.tickDecimals) {
            var n = Math.max(0, -Math.floor(Math.log(b.delta) / Math.LN10) + 1),
                o = b.tickGenerator(b);
            o.length > 1 && /\..*0$/.test((o[1] - o[0]).toFixed(n)) || (b.tickDecimals = n);
          }
        }
      }
    }

    function E(b) {
      var c = b.options.ticks,
          d = [];
      null == c || "number" == typeof c && c > 0 ? d = b.tickGenerator(b) : c && (d = a.isFunction(c) ? c(b) : c);
      var e, f;

      for (b.ticks = [], e = 0; e < d.length; ++e) {
        var g = null,
            h = d[e];
        "object" == _typeof(h) ? (f = +h[0], h.length > 1 && (g = h[1])) : f = +h, null == g && (g = b.tickFormatter(f, b)), isNaN(f) || b.ticks.push({
          v: f,
          label: g
        });
      }
    }

    function F(a, b) {
      a.options.autoscaleMargin && b.length > 0 && (null == a.options.min && (a.min = Math.min(a.min, b[0].v)), null == a.options.max && b.length > 1 && (a.max = Math.max(a.max, b[b.length - 1].v)));
    }

    function G() {
      fa.clear(), h(pa.drawBackground, [ia]);
      var a = ea.grid;
      a.show && a.backgroundColor && I(), a.show && !a.aboveData && J();

      for (var b = 0; b < da.length; ++b) {
        h(pa.drawSeries, [ia, da[b]]), L(da[b]);
      }

      h(pa.draw, [ia]), a.show && a.aboveData && J(), fa.render(), X();
    }

    function H(a, b) {
      for (var c, d, e, f, g = n(), h = 0; h < g.length; ++h) {
        if (c = g[h], c.direction == b && (f = b + c.n + "axis", a[f] || 1 != c.n || (f = b + "axis"), a[f])) {
          d = a[f].from, e = a[f].to;
          break;
        }
      }

      if (a[f] || (c = "x" == b ? ka[0] : la[0], d = a[b + "1"], e = a[b + "2"]), null != d && null != e && d > e) {
        var i = d;
        d = e, e = i;
      }

      return {
        from: d,
        to: e,
        axis: c
      };
    }

    function I() {
      ia.save(), ia.translate(ma.left, ma.top), ia.fillStyle = ca(ea.grid.backgroundColor, oa, 0, "rgba(255, 255, 255, 0)"), ia.fillRect(0, 0, na, oa), ia.restore();
    }

    function J() {
      var b, c, d, e;
      ia.save(), ia.translate(ma.left, ma.top);
      var f = ea.grid.markings;
      if (f) for (a.isFunction(f) && (c = qa.getAxes(), c.xmin = c.xaxis.min, c.xmax = c.xaxis.max, c.ymin = c.yaxis.min, c.ymax = c.yaxis.max, f = f(c)), b = 0; b < f.length; ++b) {
        var g = f[b],
            h = H(g, "x"),
            i = H(g, "y");

        if (null == h.from && (h.from = h.axis.min), null == h.to && (h.to = h.axis.max), null == i.from && (i.from = i.axis.min), null == i.to && (i.to = i.axis.max), !(h.to < h.axis.min || h.from > h.axis.max || i.to < i.axis.min || i.from > i.axis.max)) {
          h.from = Math.max(h.from, h.axis.min), h.to = Math.min(h.to, h.axis.max), i.from = Math.max(i.from, i.axis.min), i.to = Math.min(i.to, i.axis.max);
          var j = h.from === h.to,
              k = i.from === i.to;
          if (!j || !k) if (h.from = Math.floor(h.axis.p2c(h.from)), h.to = Math.floor(h.axis.p2c(h.to)), i.from = Math.floor(i.axis.p2c(i.from)), i.to = Math.floor(i.axis.p2c(i.to)), j || k) {
            var l = g.lineWidth || ea.grid.markingsLineWidth,
                m = l % 2 ? .5 : 0;
            ia.beginPath(), ia.strokeStyle = g.color || ea.grid.markingsColor, ia.lineWidth = l, j ? (ia.moveTo(h.to + m, i.from), ia.lineTo(h.to + m, i.to)) : (ia.moveTo(h.from, i.to + m), ia.lineTo(h.to, i.to + m)), ia.stroke();
          } else ia.fillStyle = g.color || ea.grid.markingsColor, ia.fillRect(h.from, i.to, h.to - h.from, i.from - i.to);
        }
      }
      c = n(), d = ea.grid.borderWidth;

      for (var o = 0; o < c.length; ++o) {
        var p,
            q,
            r,
            s,
            t = c[o],
            u = t.box,
            v = t.tickLength;

        if (t.show && 0 != t.ticks.length) {
          for (ia.lineWidth = 1, "x" == t.direction ? (p = 0, q = "full" == v ? "top" == t.position ? 0 : oa : u.top - ma.top + ("top" == t.position ? u.height : 0)) : (q = 0, p = "full" == v ? "left" == t.position ? 0 : na : u.left - ma.left + ("left" == t.position ? u.width : 0)), t.innermost || (ia.strokeStyle = t.options.color, ia.beginPath(), r = s = 0, "x" == t.direction ? r = na + 1 : s = oa + 1, 1 == ia.lineWidth && ("x" == t.direction ? q = Math.floor(q) + .5 : p = Math.floor(p) + .5), ia.moveTo(p, q), ia.lineTo(p + r, q + s), ia.stroke()), ia.strokeStyle = t.options.tickColor, ia.beginPath(), b = 0; b < t.ticks.length; ++b) {
            var w = t.ticks[b].v;
            r = s = 0, isNaN(w) || w < t.min || w > t.max || "full" == v && ("object" == _typeof(d) && d[t.position] > 0 || d > 0) && (w == t.min || w == t.max) || ("x" == t.direction ? (p = t.p2c(w), s = "full" == v ? -oa : v, "top" == t.position && (s = -s)) : (q = t.p2c(w), r = "full" == v ? -na : v, "left" == t.position && (r = -r)), 1 == ia.lineWidth && ("x" == t.direction ? p = Math.floor(p) + .5 : q = Math.floor(q) + .5), ia.moveTo(p, q), ia.lineTo(p + r, q + s));
          }

          ia.stroke();
        }
      }

      d && (e = ea.grid.borderColor, "object" == _typeof(d) || "object" == _typeof(e) ? ("object" != _typeof(d) && (d = {
        top: d,
        right: d,
        bottom: d,
        left: d
      }), "object" != _typeof(e) && (e = {
        top: e,
        right: e,
        bottom: e,
        left: e
      }), d.top > 0 && (ia.strokeStyle = e.top, ia.lineWidth = d.top, ia.beginPath(), ia.moveTo(0 - d.left, 0 - d.top / 2), ia.lineTo(na, 0 - d.top / 2), ia.stroke()), d.right > 0 && (ia.strokeStyle = e.right, ia.lineWidth = d.right, ia.beginPath(), ia.moveTo(na + d.right / 2, 0 - d.top), ia.lineTo(na + d.right / 2, oa), ia.stroke()), d.bottom > 0 && (ia.strokeStyle = e.bottom, ia.lineWidth = d.bottom, ia.beginPath(), ia.moveTo(na + d.right, oa + d.bottom / 2), ia.lineTo(0, oa + d.bottom / 2), ia.stroke()), d.left > 0 && (ia.strokeStyle = e.left, ia.lineWidth = d.left, ia.beginPath(), ia.moveTo(0 - d.left / 2, oa + d.bottom), ia.lineTo(0 - d.left / 2, 0), ia.stroke())) : (ia.lineWidth = d, ia.strokeStyle = ea.grid.borderColor, ia.strokeRect(-d / 2, -d / 2, na + d, oa + d))), ia.restore();
    }

    function K() {
      a.each(n(), function (a, b) {
        var c,
            d,
            e,
            f,
            g,
            h = b.box,
            i = b.direction + "Axis " + b.direction + b.n + "Axis",
            j = "flot-" + b.direction + "-axis flot-" + b.direction + b.n + "-axis " + i,
            k = b.options.font || "flot-tick-label tickLabel";
        if (fa.removeText(j), b.show && 0 != b.ticks.length) for (var l = 0; l < b.ticks.length; ++l) {
          c = b.ticks[l], !c.label || c.v < b.min || c.v > b.max || ("x" == b.direction ? (f = "center", d = ma.left + b.p2c(c.v), "bottom" == b.position ? e = h.top + h.padding : (e = h.top + h.height - h.padding, g = "bottom")) : (g = "middle", e = ma.top + b.p2c(c.v), "left" == b.position ? (d = h.left + h.width - h.padding, f = "right") : d = h.left + h.padding), fa.addText(j, d, e, c.label, k, null, null, f, g));
        }
      });
    }

    function L(a) {
      a.lines.show && M(a), a.bars.show && P(a), a.points.show && N(a);
    }

    function M(a) {
      function b(a, b, c, d, e) {
        var f = a.points,
            g = a.pointsize,
            h = null,
            i = null;
        ia.beginPath();

        for (var j = g; j < f.length; j += g) {
          var k = f[j - g],
              l = f[j - g + 1],
              m = f[j],
              n = f[j + 1];

          if (null != k && null != m) {
            if (n >= l && l < e.min) {
              if (n < e.min) continue;
              k = (e.min - l) / (n - l) * (m - k) + k, l = e.min;
            } else if (l >= n && n < e.min) {
              if (l < e.min) continue;
              m = (e.min - l) / (n - l) * (m - k) + k, n = e.min;
            }

            if (l >= n && l > e.max) {
              if (n > e.max) continue;
              k = (e.max - l) / (n - l) * (m - k) + k, l = e.max;
            } else if (n >= l && n > e.max) {
              if (l > e.max) continue;
              m = (e.max - l) / (n - l) * (m - k) + k, n = e.max;
            }

            if (m >= k && k < d.min) {
              if (m < d.min) continue;
              l = (d.min - k) / (m - k) * (n - l) + l, k = d.min;
            } else if (k >= m && m < d.min) {
              if (k < d.min) continue;
              n = (d.min - k) / (m - k) * (n - l) + l, m = d.min;
            }

            if (k >= m && k > d.max) {
              if (m > d.max) continue;
              l = (d.max - k) / (m - k) * (n - l) + l, k = d.max;
            } else if (m >= k && m > d.max) {
              if (k > d.max) continue;
              n = (d.max - k) / (m - k) * (n - l) + l, m = d.max;
            }

            k == h && l == i || ia.moveTo(d.p2c(k) + b, e.p2c(l) + c), h = m, i = n, ia.lineTo(d.p2c(m) + b, e.p2c(n) + c);
          }
        }

        ia.stroke();
      }

      function c(a, b, c) {
        for (var d = a.points, e = a.pointsize, f = Math.min(Math.max(0, c.min), c.max), g = 0, h = !1, i = 1, j = 0, k = 0;;) {
          if (e > 0 && g > d.length + e) break;
          g += e;
          var l = d[g - e],
              m = d[g - e + i],
              n = d[g],
              o = d[g + i];

          if (h) {
            if (e > 0 && null != l && null == n) {
              k = g, e = -e, i = 2;
              continue;
            }

            if (0 > e && g == j + e) {
              ia.fill(), h = !1, e = -e, i = 1, g = j = k + e;
              continue;
            }
          }

          if (null != l && null != n) {
            if (n >= l && l < b.min) {
              if (n < b.min) continue;
              m = (b.min - l) / (n - l) * (o - m) + m, l = b.min;
            } else if (l >= n && n < b.min) {
              if (l < b.min) continue;
              o = (b.min - l) / (n - l) * (o - m) + m, n = b.min;
            }

            if (l >= n && l > b.max) {
              if (n > b.max) continue;
              m = (b.max - l) / (n - l) * (o - m) + m, l = b.max;
            } else if (n >= l && n > b.max) {
              if (l > b.max) continue;
              o = (b.max - l) / (n - l) * (o - m) + m, n = b.max;
            }

            if (h || (ia.beginPath(), ia.moveTo(b.p2c(l), c.p2c(f)), h = !0), m >= c.max && o >= c.max) ia.lineTo(b.p2c(l), c.p2c(c.max)), ia.lineTo(b.p2c(n), c.p2c(c.max));else if (m <= c.min && o <= c.min) ia.lineTo(b.p2c(l), c.p2c(c.min)), ia.lineTo(b.p2c(n), c.p2c(c.min));else {
              var p = l,
                  q = n;
              o >= m && m < c.min && o >= c.min ? (l = (c.min - m) / (o - m) * (n - l) + l, m = c.min) : m >= o && o < c.min && m >= c.min && (n = (c.min - m) / (o - m) * (n - l) + l, o = c.min), m >= o && m > c.max && o <= c.max ? (l = (c.max - m) / (o - m) * (n - l) + l, m = c.max) : o >= m && o > c.max && m <= c.max && (n = (c.max - m) / (o - m) * (n - l) + l, o = c.max), l != p && ia.lineTo(b.p2c(p), c.p2c(m)), ia.lineTo(b.p2c(l), c.p2c(m)), ia.lineTo(b.p2c(n), c.p2c(o)), n != q && (ia.lineTo(b.p2c(n), c.p2c(o)), ia.lineTo(b.p2c(q), c.p2c(o)));
            }
          }
        }
      }

      ia.save(), ia.translate(ma.left, ma.top), ia.lineJoin = "round";
      var d = a.lines.lineWidth,
          e = a.shadowSize;

      if (d > 0 && e > 0) {
        ia.lineWidth = e, ia.strokeStyle = "rgba(0,0,0,0.1)";
        var f = Math.PI / 18;
        b(a.datapoints, Math.sin(f) * (d / 2 + e / 2), Math.cos(f) * (d / 2 + e / 2), a.xaxis, a.yaxis), ia.lineWidth = e / 2, b(a.datapoints, Math.sin(f) * (d / 2 + e / 4), Math.cos(f) * (d / 2 + e / 4), a.xaxis, a.yaxis);
      }

      ia.lineWidth = d, ia.strokeStyle = a.color;
      var g = Q(a.lines, a.color, 0, oa);
      g && (ia.fillStyle = g, c(a.datapoints, a.xaxis, a.yaxis)), d > 0 && b(a.datapoints, 0, 0, a.xaxis, a.yaxis), ia.restore();
    }

    function N(a) {
      function b(a, b, c, d, e, f, g, h) {
        for (var i = a.points, j = a.pointsize, k = 0; k < i.length; k += j) {
          var l = i[k],
              m = i[k + 1];
          null == l || l < f.min || l > f.max || m < g.min || m > g.max || (ia.beginPath(), l = f.p2c(l), m = g.p2c(m) + d, "circle" == h ? ia.arc(l, m, b, 0, e ? Math.PI : 2 * Math.PI, !1) : h(ia, l, m, b, e), ia.closePath(), c && (ia.fillStyle = c, ia.fill()), ia.stroke());
        }
      }

      ia.save(), ia.translate(ma.left, ma.top);
      var c = a.points.lineWidth,
          d = a.shadowSize,
          e = a.points.radius,
          f = a.points.symbol;

      if (0 == c && (c = 1e-4), c > 0 && d > 0) {
        var g = d / 2;
        ia.lineWidth = g, ia.strokeStyle = "rgba(0,0,0,0.1)", b(a.datapoints, e, null, g + g / 2, !0, a.xaxis, a.yaxis, f), ia.strokeStyle = "rgba(0,0,0,0.2)", b(a.datapoints, e, null, g / 2, !0, a.xaxis, a.yaxis, f);
      }

      ia.lineWidth = c, ia.strokeStyle = a.color, b(a.datapoints, e, Q(a.points, a.color), 0, !1, a.xaxis, a.yaxis, f), ia.restore();
    }

    function O(a, b, c, d, e, f, g, h, i, j, k) {
      var l, m, n, o, p, q, r, s, t;
      j ? (s = q = r = !0, p = !1, l = c, m = a, o = b + d, n = b + e, l > m && (t = m, m = l, l = t, p = !0, q = !1)) : (p = q = r = !0, s = !1, l = a + d, m = a + e, n = c, o = b, n > o && (t = o, o = n, n = t, s = !0, r = !1)), m < g.min || l > g.max || o < h.min || n > h.max || (l < g.min && (l = g.min, p = !1), m > g.max && (m = g.max, q = !1), n < h.min && (n = h.min, s = !1), o > h.max && (o = h.max, r = !1), l = g.p2c(l), n = h.p2c(n), m = g.p2c(m), o = h.p2c(o), f && (i.fillStyle = f(n, o), i.fillRect(l, o, m - l, n - o)), k > 0 && (p || q || r || s) && (i.beginPath(), i.moveTo(l, n), p ? i.lineTo(l, o) : i.moveTo(l, o), r ? i.lineTo(m, o) : i.moveTo(m, o), q ? i.lineTo(m, n) : i.moveTo(m, n), s ? i.lineTo(l, n) : i.moveTo(l, n), i.stroke()));
    }

    function P(a) {
      function b(b, c, d, e, f, g) {
        for (var h = b.points, i = b.pointsize, j = 0; j < h.length; j += i) {
          null != h[j] && O(h[j], h[j + 1], h[j + 2], c, d, e, f, g, ia, a.bars.horizontal, a.bars.lineWidth);
        }
      }

      ia.save(), ia.translate(ma.left, ma.top), ia.lineWidth = a.bars.lineWidth, ia.strokeStyle = a.color;
      var c;

      switch (a.bars.align) {
        case "left":
          c = 0;
          break;

        case "right":
          c = -a.bars.barWidth;
          break;

        default:
          c = -a.bars.barWidth / 2;
      }

      var d = a.bars.fill ? function (b, c) {
        return Q(a.bars, a.color, b, c);
      } : null;
      b(a.datapoints, c, c + a.bars.barWidth, d, a.xaxis, a.yaxis), ia.restore();
    }

    function Q(b, c, d, e) {
      var f = b.fill;
      if (!f) return null;
      if (b.fillColor) return ca(b.fillColor, d, e, c);
      var g = a.color.parse(c);
      return g.a = "number" == typeof f ? f : .4, g.normalize(), g.toString();
    }

    function R() {
      if (null != ea.legend.container ? a(ea.legend.container).html("") : c.find(".legend").remove(), ea.legend.show) {
        for (var b, d, e = [], f = [], g = !1, h = ea.legend.labelFormatter, i = 0; i < da.length; ++i) {
          b = da[i], b.label && (d = h ? h(b.label, b) : b.label, d && f.push({
            label: d,
            color: b.color
          }));
        }

        if (ea.legend.sorted) if (a.isFunction(ea.legend.sorted)) f.sort(ea.legend.sorted);else if ("reverse" == ea.legend.sorted) f.reverse();else {
          var j = "descending" != ea.legend.sorted;
          f.sort(function (a, b) {
            return a.label == b.label ? 0 : a.label < b.label != j ? 1 : -1;
          });
        }

        for (var i = 0; i < f.length; ++i) {
          var k = f[i];
          i % ea.legend.noColumns == 0 && (g && e.push("</tr>"), e.push("<tr>"), g = !0), e.push('<td class="legendColorBox"><div style="border:1px solid ' + ea.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + k.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + k.label + "</td>");
        }

        if (g && e.push("</tr>"), 0 != e.length) {
          var l = '<table style="font-size:smaller;color:' + ea.grid.color + '">' + e.join("") + "</table>";
          if (null != ea.legend.container) a(ea.legend.container).html(l);else {
            var m = "",
                n = ea.legend.position,
                o = ea.legend.margin;
            null == o[0] && (o = [o, o]), "n" == n.charAt(0) ? m += "top:" + (o[1] + ma.top) + "px;" : "s" == n.charAt(0) && (m += "bottom:" + (o[1] + ma.bottom) + "px;"), "e" == n.charAt(1) ? m += "right:" + (o[0] + ma.right) + "px;" : "w" == n.charAt(1) && (m += "left:" + (o[0] + ma.left) + "px;");
            var p = a('<div class="legend">' + l.replace('style="', 'style="position:absolute;' + m + ";") + "</div>").appendTo(c);

            if (0 != ea.legend.backgroundOpacity) {
              var q = ea.legend.backgroundColor;
              null == q && (q = ea.grid.backgroundColor, q = q && "string" == typeof q ? a.color.parse(q) : a.color.extract(p, "background-color"), q.a = 1, q = q.toString());
              var r = p.children();
              a('<div style="position:absolute;width:' + r.width() + "px;height:" + r.height() + "px;" + m + "background-color:" + q + ';"> </div>').prependTo(p).css("opacity", ea.legend.backgroundOpacity);
            }
          }
        }
      }
    }

    function S(a, b, c) {
      var d,
          e,
          f,
          g = ea.grid.mouseActiveRadius,
          h = g * g + 1,
          i = null;

      for (d = da.length - 1; d >= 0; --d) {
        if (c(da[d])) {
          var j = da[d],
              k = j.xaxis,
              l = j.yaxis,
              m = j.datapoints.points,
              n = k.c2p(a),
              o = l.c2p(b),
              p = g / k.scale,
              q = g / l.scale;
          if (f = j.datapoints.pointsize, k.options.inverseTransform && (p = Number.MAX_VALUE), l.options.inverseTransform && (q = Number.MAX_VALUE), j.lines.show || j.points.show) for (e = 0; e < m.length; e += f) {
            var r = m[e],
                s = m[e + 1];

            if (null != r && !(r - n > p || -p > r - n || s - o > q || -q > s - o)) {
              var t = Math.abs(k.p2c(r) - a),
                  u = Math.abs(l.p2c(s) - b),
                  v = t * t + u * u;
              h > v && (h = v, i = [d, e / f]);
            }
          }

          if (j.bars.show && !i) {
            var w, x;

            switch (j.bars.align) {
              case "left":
                w = 0;
                break;

              case "right":
                w = -j.bars.barWidth;
                break;

              default:
                w = -j.bars.barWidth / 2;
            }

            for (x = w + j.bars.barWidth, e = 0; e < m.length; e += f) {
              var r = m[e],
                  s = m[e + 1],
                  y = m[e + 2];
              null != r && (da[d].bars.horizontal ? n <= Math.max(y, r) && n >= Math.min(y, r) && o >= s + w && s + x >= o : n >= r + w && r + x >= n && o >= Math.min(y, s) && o <= Math.max(y, s)) && (i = [d, e / f]);
            }
          }
        }
      }

      return i ? (d = i[0], e = i[1], f = da[d].datapoints.pointsize, {
        datapoint: da[d].datapoints.points.slice(e * f, (e + 1) * f),
        dataIndex: e,
        series: da[d],
        seriesIndex: d
      }) : null;
    }

    function T(a) {
      ea.grid.hoverable && W("plothover", a, function (a) {
        return 0 != a.hoverable;
      });
    }

    function U(a) {
      ea.grid.hoverable && W("plothover", a, function (a) {
        return !1;
      });
    }

    function V(a) {
      W("plotclick", a, function (a) {
        return 0 != a.clickable;
      });
    }

    function W(a, b, d) {
      var e = ha.offset(),
          f = b.pageX - e.left - ma.left,
          g = b.pageY - e.top - ma.top,
          h = o({
        left: f,
        top: g
      });
      h.pageX = b.pageX, h.pageY = b.pageY;
      var i = S(f, g, d);

      if (i && (i.pageX = parseInt(i.series.xaxis.p2c(i.datapoint[0]) + e.left + ma.left, 10), i.pageY = parseInt(i.series.yaxis.p2c(i.datapoint[1]) + e.top + ma.top, 10)), ea.grid.autoHighlight) {
        for (var j = 0; j < ra.length; ++j) {
          var k = ra[j];
          k.auto != a || i && k.series == i.series && k.point[0] == i.datapoint[0] && k.point[1] == i.datapoint[1] || $(k.series, k.point);
        }

        i && Z(i.series, i.datapoint, a);
      }

      c.trigger(a, [h, i]);
    }

    function X() {
      var a = ea.interaction.redrawOverlayInterval;
      return -1 == a ? void Y() : void (sa || (sa = setTimeout(Y, a)));
    }

    function Y() {
      sa = null, ja.save(), ga.clear(), ja.translate(ma.left, ma.top);
      var a, b;

      for (a = 0; a < ra.length; ++a) {
        b = ra[a], b.series.bars.show ? ba(b.series, b.point) : aa(b.series, b.point);
      }

      ja.restore(), h(pa.drawOverlay, [ja]);
    }

    function Z(a, b, c) {
      if ("number" == typeof a && (a = da[a]), "number" == typeof b) {
        var d = a.datapoints.pointsize;
        b = a.datapoints.points.slice(d * b, d * (b + 1));
      }

      var e = _(a, b);

      -1 == e ? (ra.push({
        series: a,
        point: b,
        auto: c
      }), X()) : c || (ra[e].auto = !1);
    }

    function $(a, b) {
      if (null == a && null == b) return ra = [], void X();

      if ("number" == typeof a && (a = da[a]), "number" == typeof b) {
        var c = a.datapoints.pointsize;
        b = a.datapoints.points.slice(c * b, c * (b + 1));
      }

      var d = _(a, b);

      -1 != d && (ra.splice(d, 1), X());
    }

    function _(a, b) {
      for (var c = 0; c < ra.length; ++c) {
        var d = ra[c];
        if (d.series == a && d.point[0] == b[0] && d.point[1] == b[1]) return c;
      }

      return -1;
    }

    function aa(b, c) {
      var d = c[0],
          e = c[1],
          f = b.xaxis,
          g = b.yaxis,
          h = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString();

      if (!(d < f.min || d > f.max || e < g.min || e > g.max)) {
        var i = b.points.radius + b.points.lineWidth / 2;
        ja.lineWidth = i, ja.strokeStyle = h;
        var j = 1.5 * i;
        d = f.p2c(d), e = g.p2c(e), ja.beginPath(), "circle" == b.points.symbol ? ja.arc(d, e, j, 0, 2 * Math.PI, !1) : b.points.symbol(ja, d, e, j, !1), ja.closePath(), ja.stroke();
      }
    }

    function ba(b, c) {
      var d,
          e = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString(),
          f = e;

      switch (b.bars.align) {
        case "left":
          d = 0;
          break;

        case "right":
          d = -b.bars.barWidth;
          break;

        default:
          d = -b.bars.barWidth / 2;
      }

      ja.lineWidth = b.bars.lineWidth, ja.strokeStyle = e, O(c[0], c[1], c[2] || 0, d, d + b.bars.barWidth, function () {
        return f;
      }, b.xaxis, b.yaxis, ja, b.bars.horizontal, b.bars.lineWidth);
    }

    function ca(b, c, d, e) {
      if ("string" == typeof b) return b;

      for (var f = ia.createLinearGradient(0, d, 0, c), g = 0, h = b.colors.length; h > g; ++g) {
        var i = b.colors[g];

        if ("string" != typeof i) {
          var j = a.color.parse(e);
          null != i.brightness && (j = j.scale("rgb", i.brightness)), null != i.opacity && (j.a *= i.opacity), i = j.toString();
        }

        f.addColorStop(g / (h - 1), i);
      }

      return f;
    }

    var da = [],
        ea = {
      colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
      legend: {
        show: !0,
        noColumns: 1,
        labelFormatter: null,
        labelBoxBorderColor: "#ccc",
        container: null,
        position: "ne",
        margin: 5,
        backgroundColor: null,
        backgroundOpacity: .85,
        sorted: null
      },
      xaxis: {
        show: null,
        position: "bottom",
        mode: null,
        font: null,
        color: null,
        tickColor: null,
        transform: null,
        inverseTransform: null,
        min: null,
        max: null,
        autoscaleMargin: null,
        ticks: null,
        tickFormatter: null,
        labelWidth: null,
        labelHeight: null,
        reserveSpace: null,
        tickLength: null,
        alignTicksWithAxis: null,
        tickDecimals: null,
        tickSize: null,
        minTickSize: null
      },
      yaxis: {
        autoscaleMargin: .02,
        position: "left"
      },
      xaxes: [],
      yaxes: [],
      series: {
        points: {
          show: !1,
          radius: 3,
          lineWidth: 2,
          fill: !0,
          fillColor: "#ffffff",
          symbol: "circle"
        },
        lines: {
          lineWidth: 2,
          fill: !1,
          fillColor: null,
          steps: !1
        },
        bars: {
          show: !1,
          lineWidth: 2,
          barWidth: 1,
          fill: !0,
          fillColor: null,
          align: "left",
          horizontal: !1,
          zero: !0
        },
        shadowSize: 3,
        highlightColor: null
      },
      grid: {
        show: !0,
        aboveData: !1,
        color: "#545454",
        backgroundColor: null,
        borderColor: null,
        tickColor: null,
        margin: 0,
        labelMargin: 5,
        axisMargin: 8,
        borderWidth: 2,
        minBorderMargin: null,
        markings: null,
        markingsColor: "#f4f4f4",
        markingsLineWidth: 2,
        clickable: !1,
        hoverable: !1,
        autoHighlight: !0,
        mouseActiveRadius: 10
      },
      interaction: {
        redrawOverlayInterval: 1e3 / 60
      },
      hooks: {}
    },
        fa = null,
        ga = null,
        ha = null,
        ia = null,
        ja = null,
        ka = [],
        la = [],
        ma = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
        na = 0,
        oa = 0,
        pa = {
      processOptions: [],
      processRawData: [],
      processDatapoints: [],
      processOffset: [],
      drawBackground: [],
      drawSeries: [],
      draw: [],
      bindEvents: [],
      drawOverlay: [],
      shutdown: []
    },
        qa = this;
    qa.setData = k, qa.setupGrid = B, qa.draw = G, qa.getPlaceholder = function () {
      return c;
    }, qa.getCanvas = function () {
      return fa.element;
    }, qa.getPlotOffset = function () {
      return ma;
    }, qa.width = function () {
      return na;
    }, qa.height = function () {
      return oa;
    }, qa.offset = function () {
      var a = ha.offset();
      return a.left += ma.left, a.top += ma.top, a;
    }, qa.getData = function () {
      return da;
    }, qa.getAxes = function () {
      var b = {};
      return a.each(ka.concat(la), function (a, c) {
        c && (b[c.direction + (1 != c.n ? c.n : "") + "axis"] = c);
      }), b;
    }, qa.getXAxes = function () {
      return ka;
    }, qa.getYAxes = function () {
      return la;
    }, qa.c2p = o, qa.p2c = p, qa.getOptions = function () {
      return ea;
    }, qa.highlight = Z, qa.unhighlight = $, qa.triggerRedrawOverlay = X, qa.pointOffset = function (a) {
      return {
        left: parseInt(ka[m(a, "x") - 1].p2c(+a.x) + ma.left, 10),
        top: parseInt(la[m(a, "y") - 1].p2c(+a.y) + ma.top, 10)
      };
    }, qa.shutdown = v, qa.destroy = function () {
      v(), c.removeData("plot").empty(), da = [], ea = null, fa = null, ga = null, ha = null, ia = null, ja = null, ka = [], la = [], pa = null, ra = [], qa = null;
    }, qa.resize = function () {
      var a = c.width(),
          b = c.height();
      fa.resize(a, b), ga.resize(a, b);
    }, qa.hooks = pa, i(qa), j(f), t(), k(e), B(), G(), u();
    var ra = [],
        sa = null;
  }

  function d(a, b) {
    return b * Math.floor(a / b);
  }

  var e = Object.prototype.hasOwnProperty;
  a.fn.detach || (a.fn.detach = function () {
    return this.each(function () {
      this.parentNode && this.parentNode.removeChild(this);
    });
  }), b.prototype.resize = function (a, b) {
    if (0 >= a || 0 >= b) throw new Error("Invalid dimensions for plot, width = " + a + ", height = " + b);
    var c = this.element,
        d = this.context,
        e = this.pixelRatio;
    this.width != a && (c.width = a * e, c.style.width = a + "px", this.width = a), this.height != b && (c.height = b * e, c.style.height = b + "px", this.height = b), d.restore(), d.save(), d.scale(e, e);
  }, b.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
  }, b.prototype.render = function () {
    var a = this._textCache;

    for (var b in a) {
      if (e.call(a, b)) {
        var c = this.getTextLayer(b),
            d = a[b];
        c.hide();

        for (var f in d) {
          if (e.call(d, f)) {
            var g = d[f];

            for (var h in g) {
              if (e.call(g, h)) {
                for (var i, j = g[h].positions, k = 0; i = j[k]; k++) {
                  i.active ? i.rendered || (c.append(i.element), i.rendered = !0) : (j.splice(k--, 1), i.rendered && i.element.detach());
                }

                0 == j.length && delete g[h];
              }
            }
          }
        }

        c.show();
      }
    }
  }, b.prototype.getTextLayer = function (b) {
    var c = this.text[b];
    return null == c && (null == this.textContainer && (this.textContainer = a("<div class='flot-text'></div>").css({
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      "font-size": "smaller",
      color: "#545454"
    }).insertAfter(this.element)), c = this.text[b] = a("<div></div>").addClass(b).css({
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }).appendTo(this.textContainer)), c;
  }, b.prototype.getTextInfo = function (b, c, d, e, f) {
    var g, h, i, j;

    if (c = "" + c, g = "object" == _typeof(d) ? d.style + " " + d.variant + " " + d.weight + " " + d.size + "px/" + d.lineHeight + "px " + d.family : d, h = this._textCache[b], null == h && (h = this._textCache[b] = {}), i = h[g], null == i && (i = h[g] = {}), j = i[c], null == j) {
      var k = a("<div></div>").html(c).css({
        position: "absolute",
        "max-width": f,
        top: -9999
      }).appendTo(this.getTextLayer(b));
      "object" == _typeof(d) ? k.css({
        font: g,
        color: d.color
      }) : "string" == typeof d && k.addClass(d), j = i[c] = {
        width: k.outerWidth(!0),
        height: k.outerHeight(!0),
        element: k,
        positions: []
      }, k.detach();
    }

    return j;
  }, b.prototype.addText = function (a, b, c, d, e, f, g, h, i) {
    var j = this.getTextInfo(a, d, e, f, g),
        k = j.positions;
    "center" == h ? b -= j.width / 2 : "right" == h && (b -= j.width), "middle" == i ? c -= j.height / 2 : "bottom" == i && (c -= j.height);

    for (var l, m = 0; l = k[m]; m++) {
      if (l.x == b && l.y == c) return void (l.active = !0);
    }

    l = {
      active: !0,
      rendered: !1,
      element: k.length ? j.element.clone() : j.element,
      x: b,
      y: c
    }, k.push(l), l.element.css({
      top: Math.round(c),
      left: Math.round(b),
      "text-align": h
    });
  }, b.prototype.removeText = function (a, b, c, d, f, g) {
    if (null == d) {
      var h = this._textCache[a];
      if (null != h) for (var i in h) {
        if (e.call(h, i)) {
          var j = h[i];

          for (var k in j) {
            if (e.call(j, k)) for (var l, m = j[k].positions, n = 0; l = m[n]; n++) {
              l.active = !1;
            }
          }
        }
      }
    } else for (var l, m = this.getTextInfo(a, d, f, g).positions, n = 0; l = m[n]; n++) {
      l.x == b && l.y == c && (l.active = !1);
    }
  }, a.plot = function (b, d, e) {
    var f = new c(a(b), d, e, a.plot.plugins);
    return f;
  }, a.plot.version = "0.8.3", a.plot.plugins = [], a.fn.plot = function (b, c) {
    return this.each(function () {
      a.plot(this, b, c);
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/js/jquery.flot.pie.min.js":
/*!******************************************!*\
  !*** ./assets/js/jquery.flot.pie.min.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.array.fill.js */ "./node_modules/core-js/modules/es.array.fill.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");

/* Flot plugin for rendering pie charts.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

The plugin assumes that each series has a single data value, and that each
value is a positive integer or zero.  Negative numbers don't make sense for a
pie chart, and have unpredictable results.  The values do NOT need to be
passed in as percentages; the plugin will calculate the total and per-slice
percentages internally.

* Created by Brian Medendorp

* Updated with contributions from btburnett3, Anthony Aragues and Xavi Ivars

The plugin supports these options:

	series: {
		pie: {
			show: true/false
			radius: 0-1 for percentage of fullsize, or a specified pixel length, or 'auto'
			innerRadius: 0-1 for percentage of fullsize or a specified pixel length, for creating a donut effect
			startAngle: 0-2 factor of PI used for starting angle (in radians) i.e 3/2 starts at the top, 0 and 2 have the same result
			tilt: 0-1 for percentage to tilt the pie, where 1 is no tilt, and 0 is completely flat (nothing will show)
			offset: {
				top: integer value to move the pie up or down
				left: integer value to move the pie left or right, or 'auto'
			},
			stroke: {
				color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#FFF')
				width: integer pixel width of the stroke
			},
			label: {
				show: true/false, or 'auto'
				formatter:  a user-defined function that modifies the text/style of the label text
				radius: 0-1 for percentage of fullsize, or a specified pixel length
				background: {
					color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#000')
					opacity: 0-1
				},
				threshold: 0-1 for the percentage value at which to hide labels (if they're too small)
			},
			combine: {
				threshold: 0-1 for the percentage value at which to combine slices (if they're too small)
				color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#CCC'), if null, the plugin will automatically use the color of the first slice to be combined
				label: any text value of what the combined slice should be labeled
			}
			highlight: {
				opacity: 0-1
			}
		}
	}

More detail and specific examples can be found in the included HTML file.

*/
!function (a) {
  function b(b) {
    function e(b, c, d) {
      x || (x = !0, r = b.getCanvas(), s = a(r).parent(), t = b.getOptions(), b.setData(f(b.getData())));
    }

    function f(b) {
      for (var c = 0, d = 0, e = 0, f = t.series.pie.combine.color, g = [], h = 0; h < b.length; ++h) {
        var i = b[h].data;
        a.isArray(i) && 1 == i.length && (i = i[0]), a.isArray(i) ? !isNaN(parseFloat(i[1])) && isFinite(i[1]) ? i[1] = +i[1] : i[1] = 0 : i = !isNaN(parseFloat(i)) && isFinite(i) ? [1, +i] : [1, 0], b[h].data = [i];
      }

      for (var h = 0; h < b.length; ++h) {
        c += b[h].data[0][1];
      }

      for (var h = 0; h < b.length; ++h) {
        var i = b[h].data[0][1];
        i / c <= t.series.pie.combine.threshold && (d += i, e++, f || (f = b[h].color));
      }

      for (var h = 0; h < b.length; ++h) {
        var i = b[h].data[0][1];
        (2 > e || i / c > t.series.pie.combine.threshold) && g.push(a.extend(b[h], {
          data: [[1, i]],
          color: b[h].color,
          label: b[h].label,
          angle: i * Math.PI * 2 / c,
          percent: i / (c / 100)
        }));
      }

      return e > 1 && g.push({
        data: [[1, d]],
        color: f,
        label: t.series.pie.combine.label,
        angle: d * Math.PI * 2 / c,
        percent: d / (c / 100)
      }), g;
    }

    function g(b, e) {
      function f() {
        y.clearRect(0, 0, j, k), s.children().filter(".pieLabel, .pieLabelBackground").remove();
      }

      function g() {
        var a = t.series.pie.shadow.left,
            b = t.series.pie.shadow.top,
            c = 10,
            d = t.series.pie.shadow.alpha,
            e = t.series.pie.radius > 1 ? t.series.pie.radius : u * t.series.pie.radius;

        if (!(e >= j / 2 - a || e * t.series.pie.tilt >= k / 2 - b || c >= e)) {
          y.save(), y.translate(a, b), y.globalAlpha = d, y.fillStyle = "#000", y.translate(v, w), y.scale(1, t.series.pie.tilt);

          for (var f = 1; c >= f; f++) {
            y.beginPath(), y.arc(0, 0, e, 0, 2 * Math.PI, !1), y.fill(), e -= f;
          }

          y.restore();
        }
      }

      function i() {
        function b(a, b, c) {
          0 >= a || isNaN(a) || (c ? y.fillStyle = b : (y.strokeStyle = b, y.lineJoin = "round"), y.beginPath(), Math.abs(a - 2 * Math.PI) > 1e-9 && y.moveTo(0, 0), y.arc(0, 0, e, f, f + a / 2, !1), y.arc(0, 0, e, f + a / 2, f + a, !1), y.closePath(), f += a, c ? y.fill() : y.stroke());
        }

        function c() {
          function b(b, c, d) {
            if (0 == b.data[0][1]) return !0;
            var f,
                g = t.legend.labelFormatter,
                h = t.series.pie.label.formatter;
            f = g ? g(b.label, b) : b.label, h && (f = h(f, b));
            var i = (c + b.angle + c) / 2,
                l = v + Math.round(Math.cos(i) * e),
                m = w + Math.round(Math.sin(i) * e) * t.series.pie.tilt,
                n = "<span class='pieLabel' id='pieLabel" + d + "' style='position:absolute;top:" + m + "px;left:" + l + "px;'>" + f + "</span>";
            s.append(n);
            var o = s.children("#pieLabel" + d),
                p = m - o.height() / 2,
                q = l - o.width() / 2;
            if (o.css("top", p), o.css("left", q), 0 - p > 0 || 0 - q > 0 || k - (p + o.height()) < 0 || j - (q + o.width()) < 0) return !1;

            if (0 != t.series.pie.label.background.opacity) {
              var r = t.series.pie.label.background.color;
              null == r && (r = b.color);
              var u = "top:" + p + "px;left:" + q + "px;";
              a("<div class='pieLabelBackground' style='position:absolute;width:" + o.width() + "px;height:" + o.height() + "px;" + u + "background-color:" + r + ";'></div>").css("opacity", t.series.pie.label.background.opacity).insertBefore(o);
            }

            return !0;
          }

          for (var c = d, e = t.series.pie.label.radius > 1 ? t.series.pie.label.radius : u * t.series.pie.label.radius, f = 0; f < m.length; ++f) {
            if (m[f].percent >= 100 * t.series.pie.label.threshold && !b(m[f], c, f)) return !1;
            c += m[f].angle;
          }

          return !0;
        }

        var d = Math.PI * t.series.pie.startAngle,
            e = t.series.pie.radius > 1 ? t.series.pie.radius : u * t.series.pie.radius;
        y.save(), y.translate(v, w), y.scale(1, t.series.pie.tilt), y.save();

        for (var f = d, g = 0; g < m.length; ++g) {
          m[g].startAngle = f, b(m[g].angle, m[g].color, !0);
        }

        if (y.restore(), t.series.pie.stroke.width > 0) {
          y.save(), y.lineWidth = t.series.pie.stroke.width, f = d;

          for (var g = 0; g < m.length; ++g) {
            b(m[g].angle, t.series.pie.stroke.color, !1);
          }

          y.restore();
        }

        return h(y), y.restore(), t.series.pie.label.show ? c() : !0;
      }

      if (s) {
        var j = b.getPlaceholder().width(),
            k = b.getPlaceholder().height(),
            l = s.children().filter(".legend").children().width() || 0;
        y = e, x = !1, u = Math.min(j, k / t.series.pie.tilt) / 2, w = k / 2 + t.series.pie.offset.top, v = j / 2, "auto" == t.series.pie.offset.left ? (t.legend.position.match("w") ? v += l / 2 : v -= l / 2, u > v ? v = u : v > j - u && (v = j - u)) : v += t.series.pie.offset.left;
        var m = b.getData(),
            n = 0;

        do {
          n > 0 && (u *= d), n += 1, f(), t.series.pie.tilt <= .8 && g();
        } while (!i() && c > n);

        n >= c && (f(), s.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")), b.setSeries && b.insertLegend && (b.setSeries(m), b.insertLegend());
      }
    }

    function h(a) {
      if (t.series.pie.innerRadius > 0) {
        a.save();
        var b = t.series.pie.innerRadius > 1 ? t.series.pie.innerRadius : u * t.series.pie.innerRadius;
        a.globalCompositeOperation = "destination-out", a.beginPath(), a.fillStyle = t.series.pie.stroke.color, a.arc(0, 0, b, 0, 2 * Math.PI, !1), a.fill(), a.closePath(), a.restore(), a.save(), a.beginPath(), a.strokeStyle = t.series.pie.stroke.color, a.arc(0, 0, b, 0, 2 * Math.PI, !1), a.stroke(), a.closePath(), a.restore();
      }
    }

    function i(a, b) {
      for (var c = !1, d = -1, e = a.length, f = e - 1; ++d < e; f = d) {
        (a[d][1] <= b[1] && b[1] < a[f][1] || a[f][1] <= b[1] && b[1] < a[d][1]) && b[0] < (a[f][0] - a[d][0]) * (b[1] - a[d][1]) / (a[f][1] - a[d][1]) + a[d][0] && (c = !c);
      }

      return c;
    }

    function j(a, c) {
      for (var d, e, f = b.getData(), g = b.getOptions(), h = g.series.pie.radius > 1 ? g.series.pie.radius : u * g.series.pie.radius, j = 0; j < f.length; ++j) {
        var k = f[j];

        if (k.pie.show) {
          if (y.save(), y.beginPath(), y.moveTo(0, 0), y.arc(0, 0, h, k.startAngle, k.startAngle + k.angle / 2, !1), y.arc(0, 0, h, k.startAngle + k.angle / 2, k.startAngle + k.angle, !1), y.closePath(), d = a - v, e = c - w, y.isPointInPath) {
            if (y.isPointInPath(a - v, c - w)) return y.restore(), {
              datapoint: [k.percent, k.data],
              dataIndex: 0,
              series: k,
              seriesIndex: j
            };
          } else {
            var l = h * Math.cos(k.startAngle),
                m = h * Math.sin(k.startAngle),
                n = h * Math.cos(k.startAngle + k.angle / 4),
                o = h * Math.sin(k.startAngle + k.angle / 4),
                p = h * Math.cos(k.startAngle + k.angle / 2),
                q = h * Math.sin(k.startAngle + k.angle / 2),
                r = h * Math.cos(k.startAngle + k.angle / 1.5),
                s = h * Math.sin(k.startAngle + k.angle / 1.5),
                t = h * Math.cos(k.startAngle + k.angle),
                x = h * Math.sin(k.startAngle + k.angle),
                z = [[0, 0], [l, m], [n, o], [p, q], [r, s], [t, x]],
                A = [d, e];
            if (i(z, A)) return y.restore(), {
              datapoint: [k.percent, k.data],
              dataIndex: 0,
              series: k,
              seriesIndex: j
            };
          }

          y.restore();
        }
      }

      return null;
    }

    function k(a) {
      m("plothover", a);
    }

    function l(a) {
      m("plotclick", a);
    }

    function m(a, c) {
      var d = b.offset(),
          e = parseInt(c.pageX - d.left),
          f = parseInt(c.pageY - d.top),
          g = j(e, f);
      if (t.grid.autoHighlight) for (var h = 0; h < z.length; ++h) {
        var i = z[h];
        i.auto != a || g && i.series == g.series || o(i.series);
      }
      g && n(g.series, a);
      var k = {
        pageX: c.pageX,
        pageY: c.pageY
      };
      s.trigger(a, [k, g]);
    }

    function n(a, c) {
      var d = p(a);
      -1 == d ? (z.push({
        series: a,
        auto: c
      }), b.triggerRedrawOverlay()) : c || (z[d].auto = !1);
    }

    function o(a) {
      null == a && (z = [], b.triggerRedrawOverlay());
      var c = p(a);
      -1 != c && (z.splice(c, 1), b.triggerRedrawOverlay());
    }

    function p(a) {
      for (var b = 0; b < z.length; ++b) {
        var c = z[b];
        if (c.series == a) return b;
      }

      return -1;
    }

    function q(a, b) {
      function c(a) {
        a.angle <= 0 || isNaN(a.angle) || (b.fillStyle = "rgba(255, 255, 255, " + d.series.pie.highlight.opacity + ")", b.beginPath(), Math.abs(a.angle - 2 * Math.PI) > 1e-9 && b.moveTo(0, 0), b.arc(0, 0, e, a.startAngle, a.startAngle + a.angle / 2, !1), b.arc(0, 0, e, a.startAngle + a.angle / 2, a.startAngle + a.angle, !1), b.closePath(), b.fill());
      }

      var d = a.getOptions(),
          e = d.series.pie.radius > 1 ? d.series.pie.radius : u * d.series.pie.radius;
      b.save(), b.translate(v, w), b.scale(1, d.series.pie.tilt);

      for (var f = 0; f < z.length; ++f) {
        c(z[f].series);
      }

      h(b), b.restore();
    }

    var r = null,
        s = null,
        t = null,
        u = null,
        v = null,
        w = null,
        x = !1,
        y = null,
        z = [];
    b.hooks.processOptions.push(function (a, b) {
      b.series.pie.show && (b.grid.show = !1, "auto" == b.series.pie.label.show && (b.legend.show ? b.series.pie.label.show = !1 : b.series.pie.label.show = !0), "auto" == b.series.pie.radius && (b.series.pie.label.show ? b.series.pie.radius = .75 : b.series.pie.radius = 1), b.series.pie.tilt > 1 ? b.series.pie.tilt = 1 : b.series.pie.tilt < 0 && (b.series.pie.tilt = 0));
    }), b.hooks.bindEvents.push(function (a, b) {
      var c = a.getOptions();
      c.series.pie.show && (c.grid.hoverable && b.unbind("mousemove").mousemove(k), c.grid.clickable && b.unbind("click").click(l));
    }), b.hooks.processDatapoints.push(function (a, b, c, d) {
      var f = a.getOptions();
      f.series.pie.show && e(a, b, c, d);
    }), b.hooks.drawOverlay.push(function (a, b) {
      var c = a.getOptions();
      c.series.pie.show && q(a, b);
    }), b.hooks.draw.push(function (a, b) {
      var c = a.getOptions();
      c.series.pie.show && g(a, b);
    });
  }

  var c = 10,
      d = .95,
      e = {
    series: {
      pie: {
        show: !1,
        radius: "auto",
        innerRadius: 0,
        startAngle: 1.5,
        tilt: 1,
        shadow: {
          left: 5,
          top: 15,
          alpha: .02
        },
        offset: {
          top: 0,
          left: "auto"
        },
        stroke: {
          color: "#fff",
          width: 1
        },
        label: {
          show: "auto",
          formatter: function formatter(a, b) {
            return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + b.color + ";'>" + a + "<br/>" + Math.round(b.percent) + "%</div>";
          },
          radius: 1,
          background: {
            color: null,
            opacity: 0
          },
          threshold: 0
        },
        combine: {
          threshold: -1,
          color: null,
          label: "Other"
        },
        highlight: {
          opacity: .5
        }
      }
    }
  };
  a.plot.plugins.push({
    init: b,
    options: e,
    name: "pie",
    version: "1.1"
  });
}(jQuery);

/***/ }),

/***/ "./assets/js/jquery.flot.resize.min.js":
/*!*********************************************!*\
  !*** ./assets/js/jquery.flot.resize.min.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

/* Flot plugin for automatically redrawing plots as the placeholder resizes.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

It works by listening for changes on the placeholder div (through the jQuery
resize event plugin) - if the size changes, it will redraw the plot.

There are no options. If you need to disable the plugin for some plots, you
can just fix the size of their placeholders.

*/
!function (a, b, c) {
  "$:nomunge";

  function d(c) {
    h === !0 && (h = c || 1);

    for (var i = f.length - 1; i >= 0; i--) {
      var m = a(f[i]);

      if (m[0] == b || m.is(":visible")) {
        var n = m.width(),
            o = m.height(),
            p = m.data(k);
        !p || n === p.w && o === p.h || (m.trigger(j, [p.w = n, p.h = o]), h = c || !0);
      } else p = m.data(k), p.w = 0, p.h = 0;
    }

    null !== e && (h && (null == c || 1e3 > c - h) ? e = b.requestAnimationFrame(d) : (e = setTimeout(d, g[l]), h = !1));
  }

  var e,
      f = [],
      g = a.resize = a.extend(a.resize, {}),
      h = !1,
      i = "setTimeout",
      j = "resize",
      k = j + "-special-event",
      l = "pendingDelay",
      m = "activeDelay",
      n = "throttleWindow";
  g[l] = 200, g[m] = 20, g[n] = !0, a.event.special[j] = {
    setup: function setup() {
      if (!g[n] && this[i]) return !1;
      var b = a(this);
      f.push(this), b.data(k, {
        w: b.width(),
        h: b.height()
      }), 1 === f.length && (e = c, d());
    },
    teardown: function teardown() {
      if (!g[n] && this[i]) return !1;

      for (var b = a(this), c = f.length - 1; c >= 0; c--) {
        if (f[c] == this) {
          f.splice(c, 1);
          break;
        }
      }

      b.removeData(k), f.length || (h ? cancelAnimationFrame(e) : clearTimeout(e), e = null);
    },
    add: function add(b) {
      function d(b, d, f) {
        var g = a(this),
            h = g.data(k) || {};
        h.w = d !== c ? d : g.width(), h.h = f !== c ? f : g.height(), e.apply(this, arguments);
      }

      if (!g[n] && this[i]) return !1;
      var e;
      return a.isFunction(b) ? (e = b, d) : (e = b.handler, void (b.handler = d));
    }
  }, b.requestAnimationFrame || (b.requestAnimationFrame = function () {
    return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function (a, c) {
      return b.setTimeout(function () {
        a(new Date().getTime());
      }, g[m]);
    };
  }()), b.cancelAnimationFrame || (b.cancelAnimationFrame = function () {
    return b.webkitCancelRequestAnimationFrame || b.mozCancelRequestAnimationFrame || b.oCancelRequestAnimationFrame || b.msCancelRequestAnimationFrame || clearTimeout;
  }());
}(jQuery, this), function (a) {
  function b(a) {
    function b() {
      var b = a.getPlaceholder();
      0 != b.width() && 0 != b.height() && (a.resize(), a.setupGrid(), a.draw());
    }

    function c(a, c) {
      a.getPlaceholder().resize(b);
    }

    function d(a, c) {
      a.getPlaceholder().unbind("resize", b);
    }

    a.hooks.bindEvents.push(c), a.hooks.shutdown.push(d);
  }

  var c = {};
  a.plot.plugins.push({
    init: b,
    options: c,
    name: "resize",
    version: "1.0"
  });
}(jQuery);

/***/ }),

/***/ "./assets/js/jquery.sparkline.index.min.js":
/*!*************************************************!*\
  !*** ./assets/js/jquery.sparkline.index.min.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.fill.js */ "./node_modules/core-js/modules/es.array.fill.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

/**
*
* jquery.sparkline.js
*
* v2.1.2
* (c) Splunk, Inc
* Contact: Gareth Watts (gareth@splunk.com)
* http://omnipotent.net/jquery.sparkline/
*
* Generates inline sparkline charts from data supplied either to the method
* or inline in HTML
*
* Compatible with Internet Explorer 6.0+ and modern browsers equipped with the canvas tag
* (Firefox 2.0+, Safari, Opera, etc)
*
* License: New BSD License
*
* Copyright (c) 2012, Splunk Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright notice,
*       this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright notice,
*       this list of conditions and the following disclaimer in the documentation
*       and/or other materials provided with the distribution.
*     * Neither the name of Splunk Inc nor the names of its contributors may
*       be used to endorse or promote products derived from this software without
*       specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
* OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
*
* Usage:
*  $(selector).sparkline(values, options)
*
* If values is undefined or set to 'html' then the data values are read from the specified tag:
*   <p>Sparkline: <span class="sparkline">1,4,6,6,8,5,3,5</span></p>
*   $('.sparkline').sparkline();
* There must be no spaces in the enclosed data set
*
* Otherwise values must be an array of numbers or null values
*    <p>Sparkline: <span id="sparkline1">This text replaced if the browser is compatible</span></p>
*    $('#sparkline1').sparkline([1,4,6,6,8,5,3,5])
*    $('#sparkline2').sparkline([1,4,6,null,null,5,3,5])
*
* Values can also be specified in an HTML comment, or as a values attribute:
*    <p>Sparkline: <span class="sparkline"><!--1,4,6,6,8,5,3,5 --></span></p>
*    <p>Sparkline: <span class="sparkline" values="1,4,6,6,8,5,3,5"></span></p>
*    $('.sparkline').sparkline();
*
* For line charts, x values can also be specified:
*   <p>Sparkline: <span class="sparkline">1:1,2.7:4,3.4:6,5:6,6:8,8.7:5,9:3,10:5</span></p>
*    $('#sparkline1').sparkline([ [1,1], [2.7,4], [3.4,6], [5,6], [6,8], [8.7,5], [9,3], [10,5] ])
*
* By default, options should be passed in as teh second argument to the sparkline function:
*   $('.sparkline').sparkline([1,2,3,4], {type: 'bar'})
*
* Options can also be set by passing them on the tag itself.  This feature is disabled by default though
* as there's a slight performance overhead:
*   $('.sparkline').sparkline([1,2,3,4], {enableTagOptions: true})
*   <p>Sparkline: <span class="sparkline" sparkType="bar" sparkBarColor="red">loading</span></p>
* Prefix all options supplied as tag attribute with "spark" (configurable by setting tagOptionPrefix)
*
* Supported options:
*   lineColor - Color of the line used for the chart
*   fillColor - Color used to fill in the chart - Set to '' or false for a transparent chart
*   width - Width of the chart - Defaults to 3 times the number of values in pixels
*   height - Height of the chart - Defaults to the height of the containing element
*   chartRangeMin - Specify the minimum value to use for the Y range of the chart - Defaults to the minimum value supplied
*   chartRangeMax - Specify the maximum value to use for the Y range of the chart - Defaults to the maximum value supplied
*   chartRangeClip - Clip out of range values to the max/min specified by chartRangeMin and chartRangeMax
*   chartRangeMinX - Specify the minimum value to use for the X range of the chart - Defaults to the minimum value supplied
*   chartRangeMaxX - Specify the maximum value to use for the X range of the chart - Defaults to the maximum value supplied
*   composite - If true then don't erase any existing chart attached to the tag, but draw
*           another chart over the top - Note that width and height are ignored if an
*           existing chart is detected.
*   tagValuesAttribute - Name of tag attribute to check for data values - Defaults to 'values'
*   enableTagOptions - Whether to check tags for sparkline options
*   tagOptionPrefix - Prefix used for options supplied as tag attributes - Defaults to 'spark'
*   disableHiddenCheck - If set to true, then the plugin will assume that charts will never be drawn into a
*           hidden dom element, avoding a browser reflow
*   disableInteraction - If set to true then all mouseover/click interaction behaviour will be disabled,
*       making the plugin perform much like it did in 1.x
*   disableTooltips - If set to true then tooltips will be disabled - Defaults to false (tooltips enabled)
*   disableHighlight - If set to true then highlighting of selected chart elements on mouseover will be disabled
*       defaults to false (highlights enabled)
*   highlightLighten - Factor to lighten/darken highlighted chart values by - Defaults to 1.4 for a 40% increase
*   tooltipContainer - Specify which DOM element the tooltip should be rendered into - defaults to document.body
*   tooltipClassname - Optional CSS classname to apply to tooltips - If not specified then a default style will be applied
*   tooltipOffsetX - How many pixels away from the mouse pointer to render the tooltip on the X axis
*   tooltipOffsetY - How many pixels away from the mouse pointer to render the tooltip on the r axis
*   tooltipFormatter  - Optional callback that allows you to override the HTML displayed in the tooltip
*       callback is given arguments of (sparkline, options, fields)
*   tooltipChartTitle - If specified then the tooltip uses the string specified by this setting as a title
*   tooltipFormat - A format string or SPFormat object  (or an array thereof for multiple entries)
*       to control the format of the tooltip
*   tooltipPrefix - A string to prepend to each field displayed in a tooltip
*   tooltipSuffix - A string to append to each field displayed in a tooltip
*   tooltipSkipNull - If true then null values will not have a tooltip displayed (defaults to true)
*   tooltipValueLookups - An object or range map to map field values to tooltip strings
*       (eg. to map -1 to "Lost", 0 to "Draw", and 1 to "Win")
*   numberFormatter - Optional callback for formatting numbers in tooltips
*   numberDigitGroupSep - Character to use for group separator in numbers "1,234" - Defaults to ","
*   numberDecimalMark - Character to use for the decimal point when formatting numbers - Defaults to "."
*   numberDigitGroupCount - Number of digits between group separator - Defaults to 3
*
* There are 7 types of sparkline, selected by supplying a "type" option of 'line' (default),
* 'bar', 'tristate', 'bullet', 'discrete', 'pie' or 'box'
*    line - Line chart.  Options:
*       spotColor - Set to '' to not end each line in a circular spot
*       minSpotColor - If set, color of spot at minimum value
*       maxSpotColor - If set, color of spot at maximum value
*       spotRadius - Radius in pixels
*       lineWidth - Width of line in pixels
*       normalRangeMin
*       normalRangeMax - If set draws a filled horizontal bar between these two values marking the "normal"
*                      or expected range of values
*       normalRangeColor - Color to use for the above bar
*       drawNormalOnTop - Draw the normal range above the chart fill color if true
*       defaultPixelsPerValue - Defaults to 3 pixels of width for each value in the chart
*       highlightSpotColor - The color to use for drawing a highlight spot on mouseover - Set to null to disable
*       highlightLineColor - The color to use for drawing a highlight line on mouseover - Set to null to disable
*       valueSpots - Specify which points to draw spots on, and in which color.  Accepts a range map
*
*   bar - Bar chart.  Options:
*       barColor - Color of bars for postive values
*       negBarColor - Color of bars for negative values
*       zeroColor - Color of bars with zero values
*       nullColor - Color of bars with null values - Defaults to omitting the bar entirely
*       barWidth - Width of bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*                  can be an Array of values to control the color of individual bars or a range map
*                  to specify colors for individual ranges of values
*       barSpacing - Gap between bars in pixels
*       zeroAxis - Centers the y-axis around zero if true
*
*   tristate - Charts values of win (>0), lose (<0) or draw (=0)
*       posBarColor - Color of win values
*       negBarColor - Color of lose values
*       zeroBarColor - Color of draw values
*       barWidth - Width of bars in pixels
*       barSpacing - Gap between bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*                  can be an Array of values to control the color of individual bars or a range map
*                  to specify colors for individual ranges of values
*
*   discrete - Options:
*       lineHeight - Height of each line in pixels - Defaults to 30% of the graph height
*       thesholdValue - Values less than this value will be drawn using thresholdColor instead of lineColor
*       thresholdColor
*
*   bullet - Values for bullet graphs msut be in the order: target, performance, range1, range2, range3, ...
*       options:
*       targetColor - The color of the vertical target marker
*       targetWidth - The width of the target marker in pixels
*       performanceColor - The color of the performance measure horizontal bar
*       rangeColors - Colors to use for each qualitative range background color
*
*   pie - Pie chart. Options:
*       sliceColors - An array of colors to use for pie slices
*       offset - Angle in degrees to offset the first slice - Try -90 or +90
*       borderWidth - Width of border to draw around the pie chart, in pixels - Defaults to 0 (no border)
*       borderColor - Color to use for the pie chart border - Defaults to #000
*
*   box - Box plot. Options:
*       raw - Set to true to supply pre-computed plot points as values
*             values should be: low_outlier, low_whisker, q1, median, q3, high_whisker, high_outlier
*             When set to false you can supply any number of values and the box plot will
*             be computed for you.  Default is false.
*       showOutliers - Set to true (default) to display outliers as circles
*       outlierIQR - Interquartile range used to determine outliers.  Default 1.5
*       boxLineColor - Outline color of the box
*       boxFillColor - Fill color for the box
*       whiskerColor - Line color used for whiskers
*       outlierLineColor - Outline color of outlier circles
*       outlierFillColor - Fill color of the outlier circles
*       spotRadius - Radius of outlier circles
*       medianColor - Line color of the median line
*       target - Draw a target cross hair at the supplied value (default undefined)
*
*
*
*   Examples:
*   $('#sparkline1').sparkline(myvalues, { lineColor: '#f00', fillColor: false });
*   $('.barsparks').sparkline('html', { type:'bar', height:'40px', barWidth:5 });
*   $('#tristate').sparkline([1,1,-1,1,0,0,-1], { type:'tristate' }):
*   $('#discrete').sparkline([1,3,4,5,5,3,4,5], { type:'discrete' });
*   $('#bullet').sparkline([10,12,12,9,7], { type:'bullet' });
*   $('#pie').sparkline([1,1,2], { type:'pie' });
*/
!function (a, b, c) {
  !function (a) {
     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
  }(function (d) {
    "use strict";

    var e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K = {},
        L = 0;
    e = function e() {
      return {
        common: {
          type: "line",
          lineColor: "#00f",
          fillColor: "#cdf",
          defaultPixelsPerValue: 3,
          width: "auto",
          height: "auto",
          composite: !1,
          tagValuesAttribute: "values",
          tagOptionsPrefix: "spark",
          enableTagOptions: !1,
          enableHighlight: !0,
          highlightLighten: 1.4,
          tooltipSkipNull: !0,
          tooltipPrefix: "",
          tooltipSuffix: "",
          disableHiddenCheck: !1,
          numberFormatter: !1,
          numberDigitGroupCount: 3,
          numberDigitGroupSep: ",",
          numberDecimalMark: ".",
          disableTooltips: !1,
          disableInteraction: !1
        },
        line: {
          spotColor: "#f80",
          highlightSpotColor: "#5f5",
          highlightLineColor: "#f22",
          spotRadius: 1.5,
          minSpotColor: "#f80",
          maxSpotColor: "#f80",
          lineWidth: 1,
          normalRangeMin: c,
          normalRangeMax: c,
          normalRangeColor: "#ccc",
          drawNormalOnTop: !1,
          chartRangeMin: c,
          chartRangeMax: c,
          chartRangeMinX: c,
          chartRangeMaxX: c,
          tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
        },
        bar: {
          barColor: "#3366cc",
          negBarColor: "#f44",
          stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
          zeroColor: c,
          nullColor: c,
          zeroAxis: !0,
          barWidth: 4,
          barSpacing: 1,
          chartRangeMax: c,
          chartRangeMin: c,
          chartRangeClip: !1,
          colorMap: c,
          tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
        },
        tristate: {
          barWidth: 4,
          barSpacing: 1,
          posBarColor: "#6f6",
          negBarColor: "#f44",
          zeroBarColor: "#999",
          colorMap: {},
          tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
          tooltipValueLookups: {
            map: {
              "-1": "Loss",
              0: "Draw",
              1: "Win"
            }
          }
        },
        discrete: {
          lineHeight: "auto",
          thresholdColor: c,
          thresholdValue: 0,
          chartRangeMax: c,
          chartRangeMin: c,
          chartRangeClip: !1,
          tooltipFormat: new g("{{prefix}}{{value}}{{suffix}}")
        },
        bullet: {
          targetColor: "#f33",
          targetWidth: 3,
          performanceColor: "#33f",
          rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
          base: c,
          tooltipFormat: new g("{{fieldkey:fields}} - {{value}}"),
          tooltipValueLookups: {
            fields: {
              r: "Range",
              p: "Performance",
              t: "Target"
            }
          }
        },
        pie: {
          offset: 0,
          sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
          borderWidth: 0,
          borderColor: "#000",
          tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
        },
        box: {
          raw: !1,
          boxLineColor: "#000",
          boxFillColor: "#cdf",
          whiskerColor: "#000",
          outlierLineColor: "#333",
          outlierFillColor: "#fff",
          medianColor: "#f00",
          showOutliers: !0,
          outlierIQR: 1.5,
          spotRadius: 1.5,
          target: c,
          targetColor: "#4a2",
          chartRangeMax: c,
          chartRangeMin: c,
          tooltipFormat: new g("{{field:fields}}: {{value}}"),
          tooltipFormatFieldlistKey: "field",
          tooltipValueLookups: {
            fields: {
              lq: "Lower Quartile",
              med: "Median",
              uq: "Upper Quartile",
              lo: "Left Outlier",
              ro: "Right Outlier",
              lw: "Left Whisker",
              rw: "Right Whisker"
            }
          }
        }
      };
    }, D = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', f = function f() {
      var a, b;
      return a = function a() {
        this.init.apply(this, arguments);
      }, arguments.length > 1 ? (arguments[0] ? (a.prototype = d.extend(new arguments[0](), arguments[arguments.length - 1]), a._super = arguments[0].prototype) : a.prototype = arguments[arguments.length - 1], arguments.length > 2 && (b = Array.prototype.slice.call(arguments, 1, -1), b.unshift(a.prototype), d.extend.apply(d, b))) : a.prototype = arguments[0], a.prototype.cls = a, a;
    }, d.SPFormatClass = g = f({
      fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
      precre: /(\w+)\.(\d+)/,
      init: function init(a, b) {
        this.format = a, this.fclass = b;
      },
      render: function render(a, b, d) {
        var e,
            f,
            g,
            h,
            i,
            j = this,
            k = a;
        return this.format.replace(this.fre, function () {
          var a;
          return f = arguments[1], g = arguments[3], e = j.precre.exec(f), e ? (i = e[2], f = e[1]) : i = !1, h = k[f], h === c ? "" : g && b && b[g] ? (a = b[g], a.get ? b[g].get(h) || h : b[g][h] || h) : (m(h) && (h = d.get("numberFormatter") ? d.get("numberFormatter")(h) : r(h, i, d.get("numberDigitGroupCount"), d.get("numberDigitGroupSep"), d.get("numberDecimalMark"))), h);
        });
      }
    }), d.spformat = function (a, b) {
      return new g(a, b);
    }, h = function h(a, b, c) {
      return b > a ? b : a > c ? c : a;
    }, i = function i(a, c) {
      var d;
      return 2 === c ? (d = b.floor(a.length / 2), a.length % 2 ? a[d] : (a[d - 1] + a[d]) / 2) : a.length % 2 ? (d = (a.length * c + c) / 4, d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1]) : (d = (a.length * c + 2) / 4, d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1]);
    }, j = function j(a) {
      var b;

      switch (a) {
        case "undefined":
          a = c;
          break;

        case "null":
          a = null;
          break;

        case "true":
          a = !0;
          break;

        case "false":
          a = !1;
          break;

        default:
          b = parseFloat(a), a == b && (a = b);
      }

      return a;
    }, k = function k(a) {
      var b,
          c = [];

      for (b = a.length; b--;) {
        c[b] = j(a[b]);
      }

      return c;
    }, l = function l(a, b) {
      var c,
          d,
          e = [];

      for (c = 0, d = a.length; d > c; c++) {
        a[c] !== b && e.push(a[c]);
      }

      return e;
    }, m = function m(a) {
      return !isNaN(parseFloat(a)) && isFinite(a);
    }, r = function r(a, b, c, e, f) {
      var g, h;

      for (a = (b === !1 ? parseFloat(a).toString() : a.toFixed(b)).split(""), g = (g = d.inArray(".", a)) < 0 ? a.length : g, g < a.length && (a[g] = f), h = g - c; h > 0; h -= c) {
        a.splice(h, 0, e);
      }

      return a.join("");
    }, n = function n(a, b, c) {
      var d;

      for (d = b.length; d--;) {
        if ((!c || null !== b[d]) && b[d] !== a) return !1;
      }

      return !0;
    }, o = function o(a) {
      var b,
          c = 0;

      for (b = a.length; b--;) {
        c += "number" == typeof a[b] ? a[b] : 0;
      }

      return c;
    }, q = function q(a) {
      return d.isArray(a) ? a : [a];
    }, p = function p(b) {
      var c;
      a.createStyleSheet ? a.createStyleSheet().cssText = b : (c = a.createElement("style"), c.type = "text/css", a.getElementsByTagName("head")[0].appendChild(c), c["string" == typeof a.body.style.WebkitAppearance ? "innerText" : "innerHTML"] = b);
    }, d.fn.simpledraw = function (b, e, f, g) {
      var h, i;
      if (f && (h = this.data("_jqs_vcanvas"))) return h;
      if (d.fn.sparkline.canvas === !1) return !1;

      if (d.fn.sparkline.canvas === c) {
        var j = a.createElement("canvas");
        if (j.getContext && j.getContext("2d")) d.fn.sparkline.canvas = function (a, b, c, d) {
          return new H(a, b, c, d);
        };else {
          if (!a.namespaces || a.namespaces.v) return d.fn.sparkline.canvas = !1, !1;
          a.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), d.fn.sparkline.canvas = function (a, b, c, d) {
            return new I(a, b, c);
          };
        }
      }

      return b === c && (b = d(this).innerWidth()), e === c && (e = d(this).innerHeight()), h = d.fn.sparkline.canvas(b, e, this, g), i = d(this).data("_jqs_mhandler"), i && i.registerCanvas(h), h;
    }, d.fn.cleardraw = function () {
      var a = this.data("_jqs_vcanvas");
      a && a.reset();
    }, d.RangeMapClass = s = f({
      init: function init(a) {
        var b,
            c,
            d = [];

        for (b in a) {
          a.hasOwnProperty(b) && "string" == typeof b && b.indexOf(":") > -1 && (c = b.split(":"), c[0] = 0 === c[0].length ? -(1 / 0) : parseFloat(c[0]), c[1] = 0 === c[1].length ? 1 / 0 : parseFloat(c[1]), c[2] = a[b], d.push(c));
        }

        this.map = a, this.rangelist = d || !1;
      },
      get: function get(a) {
        var b,
            d,
            e,
            f = this.rangelist;
        if ((e = this.map[a]) !== c) return e;
        if (f) for (b = f.length; b--;) {
          if (d = f[b], d[0] <= a && d[1] >= a) return d[2];
        }
        return c;
      }
    }), d.range_map = function (a) {
      return new s(a);
    }, t = f({
      init: function init(a, b) {
        var c = d(a);
        this.$el = c, this.options = b, this.currentPageX = 0, this.currentPageY = 0, this.el = a, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !b.get("disableTooltips"), this.highlightEnabled = !b.get("disableHighlight");
      },
      registerSparkline: function registerSparkline(a) {
        this.splist.push(a), this.over && this.updateDisplay();
      },
      registerCanvas: function registerCanvas(a) {
        var b = d(a.canvas);
        this.canvas = a, this.$canvas = b, b.mouseenter(d.proxy(this.mouseenter, this)), b.mouseleave(d.proxy(this.mouseleave, this)), b.click(d.proxy(this.mouseclick, this));
      },
      reset: function reset(a) {
        this.splist = [], this.tooltip && a && (this.tooltip.remove(), this.tooltip = c);
      },
      mouseclick: function mouseclick(a) {
        var b = d.Event("sparklineClick");
        b.originalEvent = a, b.sparklines = this.splist, this.$el.trigger(b);
      },
      mouseenter: function mouseenter(b) {
        d(a.body).unbind("mousemove.jqs"), d(a.body).bind("mousemove.jqs", d.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = b.pageX, this.currentPageY = b.pageY, this.currentEl = b.target, !this.tooltip && this.displayTooltips && (this.tooltip = new u(this.options), this.tooltip.updatePosition(b.pageX, b.pageY)), this.updateDisplay();
      },
      mouseleave: function mouseleave() {
        d(a.body).unbind("mousemove.jqs");
        var b,
            c,
            e = this.splist,
            f = e.length,
            g = !1;

        for (this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null), c = 0; f > c; c++) {
          b = e[c], b.clearRegionHighlight() && (g = !0);
        }

        g && this.canvas.render();
      },
      mousemove: function mousemove(a) {
        this.currentPageX = a.pageX, this.currentPageY = a.pageY, this.currentEl = a.target, this.tooltip && this.tooltip.updatePosition(a.pageX, a.pageY), this.updateDisplay();
      },
      updateDisplay: function updateDisplay() {
        var a,
            b,
            c,
            e,
            f,
            g = this.splist,
            h = g.length,
            i = !1,
            j = this.$canvas.offset(),
            k = this.currentPageX - j.left,
            l = this.currentPageY - j.top;

        if (this.over) {
          for (c = 0; h > c; c++) {
            b = g[c], e = b.setRegionHighlight(this.currentEl, k, l), e && (i = !0);
          }

          if (i) {
            if (f = d.Event("sparklineRegionChange"), f.sparklines = this.splist, this.$el.trigger(f), this.tooltip) {
              for (a = "", c = 0; h > c; c++) {
                b = g[c], a += b.getCurrentRegionTooltip();
              }

              this.tooltip.setContent(a);
            }

            this.disableHighlight || this.canvas.render();
          }

          null === e && this.mouseleave();
        }
      }
    }), u = f({
      sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
      init: function init(b) {
        var c,
            e = b.get("tooltipClassname", "jqstooltip"),
            f = this.sizeStyle;
        this.container = b.get("tooltipContainer") || a.body, this.tooltipOffsetX = b.get("tooltipOffsetX", 10), this.tooltipOffsetY = b.get("tooltipOffsetY", 12), d("#jqssizetip").remove(), d("#jqstooltip").remove(), this.sizetip = d("<div/>", {
          id: "jqssizetip",
          style: f,
          "class": e
        }), this.tooltip = d("<div/>", {
          id: "jqstooltip",
          "class": e
        }).appendTo(this.container), c = this.tooltip.offset(), this.offsetLeft = c.left, this.offsetTop = c.top, this.hidden = !0, d(window).unbind("resize.jqs scroll.jqs"), d(window).bind("resize.jqs scroll.jqs", d.proxy(this.updateWindowDims, this)), this.updateWindowDims();
      },
      updateWindowDims: function updateWindowDims() {
        this.scrollTop = d(window).scrollTop(), this.scrollLeft = d(window).scrollLeft(), this.scrollRight = this.scrollLeft + d(window).width(), this.updatePosition();
      },
      getSize: function getSize(a) {
        this.sizetip.html(a).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove();
      },
      setContent: function setContent(a) {
        return a ? (this.getSize(a), this.tooltip.html(a).css({
          width: this.width,
          height: this.height,
          visibility: "visible"
        }), void (this.hidden && (this.hidden = !1, this.updatePosition()))) : (this.tooltip.css("visibility", "hidden"), void (this.hidden = !0));
      },
      updatePosition: function updatePosition(a, b) {
        if (a === c) {
          if (this.mousex === c) return;
          a = this.mousex - this.offsetLeft, b = this.mousey - this.offsetTop;
        } else this.mousex = a -= this.offsetLeft, this.mousey = b -= this.offsetTop;

        this.height && this.width && !this.hidden && (b -= this.height + this.tooltipOffsetY, a += this.tooltipOffsetX, b < this.scrollTop && (b = this.scrollTop), a < this.scrollLeft ? a = this.scrollLeft : a + this.width > this.scrollRight && (a = this.scrollRight - this.width), this.tooltip.css({
          left: a,
          top: b
        }));
      },
      remove: function remove() {
        this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = c, d(window).unbind("resize.jqs scroll.jqs");
      }
    }), E = function E() {
      p(D);
    }, d(E), J = [], d.fn.sparkline = function (b, e) {
      return this.each(function () {
        var f,
            g,
            h = new d.fn.sparkline.options(this, e),
            i = d(this);

        if (f = function f() {
          var e, f, g, j, k, l, m;
          return "html" === b || b === c ? (m = this.getAttribute(h.get("tagValuesAttribute")), m !== c && null !== m || (m = i.html()), e = m.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")) : e = b, f = "auto" === h.get("width") ? e.length * h.get("defaultPixelsPerValue") : h.get("width"), "auto" === h.get("height") ? h.get("composite") && d.data(this, "_jqs_vcanvas") || (j = a.createElement("span"), j.innerHTML = "a", i.html(j), g = d(j).innerHeight() || d(j).height(), d(j).remove(), j = null) : g = h.get("height"), h.get("disableInteraction") ? k = !1 : (k = d.data(this, "_jqs_mhandler"), k ? h.get("composite") || k.reset() : (k = new t(this, h), d.data(this, "_jqs_mhandler", k))), h.get("composite") && !d.data(this, "_jqs_vcanvas") ? void (d.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), d.data(this, "_jqs_errnotify", !0))) : (l = new d.fn.sparkline[h.get("type")](this, e, h, f, g), l.render(), void (k && k.registerSparkline(l)));
        }, d(this).html() && !h.get("disableHiddenCheck") && d(this).is(":hidden") || !d(this).parents("body").length) {
          if (!h.get("composite") && d.data(this, "_jqs_pending")) for (g = J.length; g; g--) {
            J[g - 1][0] == this && J.splice(g - 1, 1);
          }
          J.push([this, f]), d.data(this, "_jqs_pending", !0);
        } else f.call(this);
      });
    }, d.fn.sparkline.defaults = e(), d.sparkline_display_visible = function () {
      var a,
          b,
          c,
          e = [];

      for (b = 0, c = J.length; c > b; b++) {
        a = J[b][0], d(a).is(":visible") && !d(a).parents().is(":hidden") ? (J[b][1].call(a), d.data(J[b][0], "_jqs_pending", !1), e.push(b)) : d(a).closest("html").length || d.data(a, "_jqs_pending") || (d.data(J[b][0], "_jqs_pending", !1), e.push(b));
      }

      for (b = e.length; b; b--) {
        J.splice(e[b - 1], 1);
      }
    }, d.fn.sparkline.options = f({
      init: function init(a, b) {
        var c, e, f, g;
        this.userOptions = b = b || {}, this.tag = a, this.tagValCache = {}, e = d.fn.sparkline.defaults, f = e.common, this.tagOptionsPrefix = b.enableTagOptions && (b.tagOptionsPrefix || f.tagOptionsPrefix), g = this.getTagSetting("type"), c = g === K ? e[b.type || f.type] : e[g], this.mergedOptions = d.extend({}, f, c, b);
      },
      getTagSetting: function getTagSetting(a) {
        var b,
            d,
            e,
            f,
            g = this.tagOptionsPrefix;
        if (g === !1 || g === c) return K;
        if (this.tagValCache.hasOwnProperty(a)) b = this.tagValCache.key;else {
          if (b = this.tag.getAttribute(g + a), b === c || null === b) b = K;else if ("[" === b.substr(0, 1)) for (b = b.substr(1, b.length - 2).split(","), d = b.length; d--;) {
            b[d] = j(b[d].replace(/(^\s*)|(\s*$)/g, ""));
          } else if ("{" === b.substr(0, 1)) for (e = b.substr(1, b.length - 2).split(","), b = {}, d = e.length; d--;) {
            f = e[d].split(":", 2), b[f[0].replace(/(^\s*)|(\s*$)/g, "")] = j(f[1].replace(/(^\s*)|(\s*$)/g, ""));
          } else b = j(b);
          this.tagValCache.key = b;
        }
        return b;
      },
      get: function get(a, b) {
        var d,
            e = this.getTagSetting(a);
        return e !== K ? e : (d = this.mergedOptions[a]) === c ? b : d;
      }
    }), d.fn.sparkline._base = f({
      disabled: !1,
      init: function init(a, b, e, f, g) {
        this.el = a, this.$el = d(a), this.values = b, this.options = e, this.width = f, this.height = g, this.currentRegion = c;
      },
      initTarget: function initTarget() {
        var a = !this.options.get("disableInteraction");
        (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), a)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0;
      },
      render: function render() {
        return this.disabled ? (this.el.innerHTML = "", !1) : !0;
      },
      getRegion: function getRegion(a, b) {},
      setRegionHighlight: function setRegionHighlight(a, b, d) {
        var e,
            f = this.currentRegion,
            g = !this.options.get("disableHighlight");
        return b > this.canvasWidth || d > this.canvasHeight || 0 > b || 0 > d ? null : (e = this.getRegion(a, b, d), f !== e ? (f !== c && g && this.removeHighlight(), this.currentRegion = e, e !== c && g && this.renderHighlight(), !0) : !1);
      },
      clearRegionHighlight: function clearRegionHighlight() {
        return this.currentRegion !== c ? (this.removeHighlight(), this.currentRegion = c, !0) : !1;
      },
      renderHighlight: function renderHighlight() {
        this.changeHighlight(!0);
      },
      removeHighlight: function removeHighlight() {
        this.changeHighlight(!1);
      },
      changeHighlight: function changeHighlight(a) {},
      getCurrentRegionTooltip: function getCurrentRegionTooltip() {
        var a,
            b,
            e,
            f,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r = this.options,
            s = "",
            t = [];
        if (this.currentRegion === c) return "";
        if (a = this.getCurrentRegionFields(), n = r.get("tooltipFormatter")) return n(this, r, a);
        if (r.get("tooltipChartTitle") && (s += '<div class="jqs jqstitle">' + r.get("tooltipChartTitle") + "</div>\n"), b = this.options.get("tooltipFormat"), !b) return "";

        if (d.isArray(b) || (b = [b]), d.isArray(a) || (a = [a]), j = this.options.get("tooltipFormatFieldlist"), k = this.options.get("tooltipFormatFieldlistKey"), j && k) {
          for (l = [], i = a.length; i--;) {
            m = a[i][k], -1 != (q = d.inArray(m, j)) && (l[q] = a[i]);
          }

          a = l;
        }

        for (e = b.length, p = a.length, i = 0; e > i; i++) {
          for (o = b[i], "string" == typeof o && (o = new g(o)), f = o.fclass || "jqsfield", q = 0; p > q; q++) {
            a[q].isNull && r.get("tooltipSkipNull") || (d.extend(a[q], {
              prefix: r.get("tooltipPrefix"),
              suffix: r.get("tooltipSuffix")
            }), h = o.render(a[q], r.get("tooltipValueLookups"), r), t.push('<div class="' + f + '">' + h + "</div>"));
          }
        }

        return t.length ? s + t.join("\n") : "";
      },
      getCurrentRegionFields: function getCurrentRegionFields() {},
      calcHighlightColor: function calcHighlightColor(a, c) {
        var d,
            e,
            f,
            g,
            i = c.get("highlightColor"),
            j = c.get("highlightLighten");
        if (i) return i;

        if (j && (d = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a))) {
          for (f = [], e = 4 === a.length ? 16 : 1, g = 0; 3 > g; g++) {
            f[g] = h(b.round(parseInt(d[g + 1], 16) * e * j), 0, 255);
          }

          return "rgb(" + f.join(",") + ")";
        }

        return a;
      }
    }), v = {
      changeHighlight: function changeHighlight(a) {
        var b,
            c = this.currentRegion,
            e = this.target,
            f = this.regionShapes[c];
        f && (b = this.renderRegion(c, a), d.isArray(b) || d.isArray(f) ? (e.replaceWithShapes(f, b), this.regionShapes[c] = d.map(b, function (a) {
          return a.id;
        })) : (e.replaceWithShape(f, b), this.regionShapes[c] = b.id));
      },
      render: function render() {
        var a,
            b,
            c,
            e,
            f = this.values,
            g = this.target,
            h = this.regionShapes;

        if (this.cls._super.render.call(this)) {
          for (c = f.length; c--;) {
            if (a = this.renderRegion(c)) {
              if (d.isArray(a)) {
                for (b = [], e = a.length; e--;) {
                  a[e].append(), b.push(a[e].id);
                }

                h[c] = b;
              } else a.append(), h[c] = a.id;
            } else h[c] = null;
          }

          g.render();
        }
      }
    }, d.fn.sparkline.line = w = f(d.fn.sparkline._base, {
      type: "line",
      init: function init(a, b, c, d, e) {
        w._super.init.call(this, a, b, c, d, e), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget();
      },
      getRegion: function getRegion(a, b, d) {
        var e,
            f = this.regionMap;

        for (e = f.length; e--;) {
          if (null !== f[e] && b >= f[e][0] && b <= f[e][1]) return f[e][2];
        }

        return c;
      },
      getCurrentRegionFields: function getCurrentRegionFields() {
        var a = this.currentRegion;
        return {
          isNull: null === this.yvalues[a],
          x: this.xvalues[a],
          y: this.yvalues[a],
          color: this.options.get("lineColor"),
          fillColor: this.options.get("fillColor"),
          offset: a
        };
      },
      renderHighlight: function renderHighlight() {
        var a,
            b,
            d = this.currentRegion,
            e = this.target,
            f = this.vertices[d],
            g = this.options,
            h = g.get("spotRadius"),
            i = g.get("highlightSpotColor"),
            j = g.get("highlightLineColor");
        f && (h && i && (a = e.drawCircle(f[0], f[1], h, c, i), this.highlightSpotId = a.id, e.insertAfterShape(this.lastShapeId, a)), j && (b = e.drawLine(f[0], this.canvasTop, f[0], this.canvasTop + this.canvasHeight, j), this.highlightLineId = b.id, e.insertAfterShape(this.lastShapeId, b)));
      },
      removeHighlight: function removeHighlight() {
        var a = this.target;
        this.highlightSpotId && (a.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (a.removeShapeId(this.highlightLineId), this.highlightLineId = null);
      },
      scanValues: function scanValues() {
        var a,
            c,
            d,
            e,
            f,
            g = this.values,
            h = g.length,
            i = this.xvalues,
            j = this.yvalues,
            k = this.yminmax;

        for (a = 0; h > a; a++) {
          c = g[a], d = "string" == typeof g[a], e = "object" == _typeof(g[a]) && g[a] instanceof Array, f = d && g[a].split(":"), d && 2 === f.length ? (i.push(Number(f[0])), j.push(Number(f[1])), k.push(Number(f[1]))) : e ? (i.push(c[0]), j.push(c[1]), k.push(c[1])) : (i.push(a), null === g[a] || "null" === g[a] ? j.push(null) : (j.push(Number(c)), k.push(Number(c))));
        }

        this.options.get("xvalues") && (i = this.options.get("xvalues")), this.maxy = this.maxyorg = b.max.apply(b, k), this.miny = this.minyorg = b.min.apply(b, k), this.maxx = b.max.apply(b, i), this.minx = b.min.apply(b, i), this.xvalues = i, this.yvalues = j, this.yminmax = k;
      },
      processRangeOptions: function processRangeOptions() {
        var a = this.options,
            b = a.get("normalRangeMin"),
            d = a.get("normalRangeMax");
        b !== c && (b < this.miny && (this.miny = b), d > this.maxy && (this.maxy = d)), a.get("chartRangeMin") !== c && (a.get("chartRangeClip") || a.get("chartRangeMin") < this.miny) && (this.miny = a.get("chartRangeMin")), a.get("chartRangeMax") !== c && (a.get("chartRangeClip") || a.get("chartRangeMax") > this.maxy) && (this.maxy = a.get("chartRangeMax")), a.get("chartRangeMinX") !== c && (a.get("chartRangeClipX") || a.get("chartRangeMinX") < this.minx) && (this.minx = a.get("chartRangeMinX")), a.get("chartRangeMaxX") !== c && (a.get("chartRangeClipX") || a.get("chartRangeMaxX") > this.maxx) && (this.maxx = a.get("chartRangeMaxX"));
      },
      drawNormalRange: function drawNormalRange(a, d, e, f, g) {
        var h = this.options.get("normalRangeMin"),
            i = this.options.get("normalRangeMax"),
            j = d + b.round(e - e * ((i - this.miny) / g)),
            k = b.round(e * (i - h) / g);
        this.target.drawRect(a, j, f, k, c, this.options.get("normalRangeColor")).append();
      },
      render: function render() {
        var a,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            t,
            u,
            v,
            x,
            y,
            z,
            A,
            B,
            C,
            D,
            E = this.options,
            F = this.target,
            G = this.canvasWidth,
            H = this.canvasHeight,
            I = this.vertices,
            J = E.get("spotRadius"),
            K = this.regionMap;

        if (w._super.render.call(this) && (this.scanValues(), this.processRangeOptions(), B = this.xvalues, C = this.yvalues, this.yminmax.length && !(this.yvalues.length < 2))) {
          for (g = h = 0, a = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx, e = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny, f = this.yvalues.length - 1, J && (4 * J > G || 4 * J > H) && (J = 0), J && (z = E.get("highlightSpotColor") && !E.get("disableInteraction"), (z || E.get("minSpotColor") || E.get("spotColor") && C[f] === this.miny) && (H -= b.ceil(J)), (z || E.get("maxSpotColor") || E.get("spotColor") && C[f] === this.maxy) && (H -= b.ceil(J), g += b.ceil(J)), (z || (E.get("minSpotColor") || E.get("maxSpotColor")) && (C[0] === this.miny || C[0] === this.maxy)) && (h += b.ceil(J), G -= b.ceil(J)), (z || E.get("spotColor") || E.get("minSpotColor") || E.get("maxSpotColor") && (C[f] === this.miny || C[f] === this.maxy)) && (G -= b.ceil(J))), H--, E.get("normalRangeMin") === c || E.get("drawNormalOnTop") || this.drawNormalRange(h, g, H, G, e), j = [], k = [j], q = r = null, t = C.length, D = 0; t > D; D++) {
            l = B[D], n = B[D + 1], m = C[D], o = h + b.round((l - this.minx) * (G / a)), p = t - 1 > D ? h + b.round((n - this.minx) * (G / a)) : G, r = o + (p - o) / 2, K[D] = [q || 0, r, D], q = r, null === m ? D && (null !== C[D - 1] && (j = [], k.push(j)), I.push(null)) : (m < this.miny && (m = this.miny), m > this.maxy && (m = this.maxy), j.length || j.push([o, g + H]), i = [o, g + b.round(H - H * ((m - this.miny) / e))], j.push(i), I.push(i));
          }

          for (u = [], v = [], x = k.length, D = 0; x > D; D++) {
            j = k[D], j.length && (E.get("fillColor") && (j.push([j[j.length - 1][0], g + H]), v.push(j.slice(0)), j.pop()), j.length > 2 && (j[0] = [j[0][0], j[1][1]]), u.push(j));
          }

          for (x = v.length, D = 0; x > D; D++) {
            F.drawShape(v[D], E.get("fillColor"), E.get("fillColor")).append();
          }

          for (E.get("normalRangeMin") !== c && E.get("drawNormalOnTop") && this.drawNormalRange(h, g, H, G, e), x = u.length, D = 0; x > D; D++) {
            F.drawShape(u[D], E.get("lineColor"), c, E.get("lineWidth")).append();
          }

          if (J && E.get("valueSpots")) for (y = E.get("valueSpots"), y.get === c && (y = new s(y)), D = 0; t > D; D++) {
            A = y.get(C[D]), A && F.drawCircle(h + b.round((B[D] - this.minx) * (G / a)), g + b.round(H - H * ((C[D] - this.miny) / e)), J, c, A).append();
          }
          J && E.get("spotColor") && null !== C[f] && F.drawCircle(h + b.round((B[B.length - 1] - this.minx) * (G / a)), g + b.round(H - H * ((C[f] - this.miny) / e)), J, c, E.get("spotColor")).append(), this.maxy !== this.minyorg && (J && E.get("minSpotColor") && (l = B[d.inArray(this.minyorg, C)], F.drawCircle(h + b.round((l - this.minx) * (G / a)), g + b.round(H - H * ((this.minyorg - this.miny) / e)), J, c, E.get("minSpotColor")).append()), J && E.get("maxSpotColor") && (l = B[d.inArray(this.maxyorg, C)], F.drawCircle(h + b.round((l - this.minx) * (G / a)), g + b.round(H - H * ((this.maxyorg - this.miny) / e)), J, c, E.get("maxSpotColor")).append())), this.lastShapeId = F.getLastShapeId(), this.canvasTop = g, F.render();
        }
      }
    }), d.fn.sparkline.bar = x = f(d.fn.sparkline._base, v, {
      type: "bar",
      init: function init(a, e, f, g, i) {
        var m,
            n,
            o,
            p,
            q,
            r,
            t,
            u,
            v,
            w,
            y,
            z,
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H,
            I,
            J,
            K = parseInt(f.get("barWidth"), 10),
            L = parseInt(f.get("barSpacing"), 10),
            M = f.get("chartRangeMin"),
            N = f.get("chartRangeMax"),
            O = f.get("chartRangeClip"),
            P = 1 / 0,
            Q = -(1 / 0);

        for (x._super.init.call(this, a, e, f, g, i), r = 0, t = e.length; t > r; r++) {
          H = e[r], m = "string" == typeof H && H.indexOf(":") > -1, (m || d.isArray(H)) && (C = !0, m && (H = e[r] = k(H.split(":"))), H = l(H, null), n = b.min.apply(b, H), o = b.max.apply(b, H), P > n && (P = n), o > Q && (Q = o));
        }

        this.stacked = C, this.regionShapes = {}, this.barWidth = K, this.barSpacing = L, this.totalBarWidth = K + L, this.width = g = e.length * K + (e.length - 1) * L, this.initTarget(), O && (A = M === c ? -(1 / 0) : M, B = N === c ? 1 / 0 : N), q = [], p = C ? [] : q;
        var R = [],
            S = [];

        for (r = 0, t = e.length; t > r; r++) {
          if (C) for (D = e[r], e[r] = G = [], R[r] = 0, p[r] = S[r] = 0, E = 0, F = D.length; F > E; E++) {
            H = G[E] = O ? h(D[E], A, B) : D[E], null !== H && (H > 0 && (R[r] += H), 0 > P && Q > 0 ? 0 > H ? S[r] += b.abs(H) : p[r] += H : p[r] += b.abs(H - (0 > H ? Q : P)), q.push(H));
          } else H = O ? h(e[r], A, B) : e[r], H = e[r] = j(H), null !== H && q.push(H);
        }

        this.max = z = b.max.apply(b, q), this.min = y = b.min.apply(b, q), this.stackMax = Q = C ? b.max.apply(b, R) : z, this.stackMin = P = C ? b.min.apply(b, q) : y, f.get("chartRangeMin") !== c && (f.get("chartRangeClip") || f.get("chartRangeMin") < y) && (y = f.get("chartRangeMin")), f.get("chartRangeMax") !== c && (f.get("chartRangeClip") || f.get("chartRangeMax") > z) && (z = f.get("chartRangeMax")), this.zeroAxis = v = f.get("zeroAxis", !0), w = 0 >= y && z >= 0 && v ? 0 : 0 == v ? y : y > 0 ? y : z, this.xaxisOffset = w, u = C ? b.max.apply(b, p) + b.max.apply(b, S) : z - y, this.canvasHeightEf = v && 0 > y ? this.canvasHeight - 2 : this.canvasHeight - 1, w > y ? (J = C && z >= 0 ? Q : z, I = (J - w) / u * this.canvasHeight, I !== b.ceil(I) && (this.canvasHeightEf -= 2, I = b.ceil(I))) : I = this.canvasHeight, this.yoffset = I, d.isArray(f.get("colorMap")) ? (this.colorMapByIndex = f.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = f.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === c && (this.colorMapByValue = new s(this.colorMapByValue))), this.range = u;
      },
      getRegion: function getRegion(a, d, e) {
        var f = b.floor(d / this.totalBarWidth);
        return 0 > f || f >= this.values.length ? c : f;
      },
      getCurrentRegionFields: function getCurrentRegionFields() {
        var a,
            b,
            c = this.currentRegion,
            d = q(this.values[c]),
            e = [];

        for (b = d.length; b--;) {
          a = d[b], e.push({
            isNull: null === a,
            value: a,
            color: this.calcColor(b, a, c),
            offset: c
          });
        }

        return e;
      },
      calcColor: function calcColor(a, b, e) {
        var f,
            g,
            h = this.colorMapByIndex,
            i = this.colorMapByValue,
            j = this.options;
        return f = this.stacked ? j.get("stackedBarColor") : 0 > b ? j.get("negBarColor") : j.get("barColor"), 0 === b && j.get("zeroColor") !== c && (f = j.get("zeroColor")), i && (g = i.get(b)) ? f = g : h && h.length > e && (f = h[e]), d.isArray(f) ? f[a % f.length] : f;
      },
      renderRegion: function renderRegion(a, e) {
        var f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            o,
            p,
            q = this.values[a],
            r = this.options,
            s = this.xaxisOffset,
            t = [],
            u = this.range,
            v = this.stacked,
            w = this.target,
            x = a * this.totalBarWidth,
            y = this.canvasHeightEf,
            z = this.yoffset;
        if (q = d.isArray(q) ? q : [q], l = q.length, m = q[0], i = n(null, q), p = n(s, q, !0), i) return r.get("nullColor") ? (h = e ? r.get("nullColor") : this.calcHighlightColor(r.get("nullColor"), r), f = z > 0 ? z - 1 : z, w.drawRect(x, f, this.barWidth - 1, 0, h, h)) : c;

        for (j = z, k = 0; l > k; k++) {
          if (m = q[k], v && m === s) {
            if (!p || o) continue;
            o = !0;
          }

          g = u > 0 ? b.floor(y * (b.abs(m - s) / u)) + 1 : 1, s > m || m === s && 0 === z ? (f = j, j += g) : (f = z - g, z -= g), h = this.calcColor(k, m, a), e && (h = this.calcHighlightColor(h, r)), t.push(w.drawRect(x, f, this.barWidth - 1, g - 1, h, h));
        }

        return 1 === t.length ? t[0] : t;
      }
    }), d.fn.sparkline.tristate = y = f(d.fn.sparkline._base, v, {
      type: "tristate",
      init: function init(a, b, e, f, g) {
        var h = parseInt(e.get("barWidth"), 10),
            i = parseInt(e.get("barSpacing"), 10);
        y._super.init.call(this, a, b, e, f, g), this.regionShapes = {}, this.barWidth = h, this.barSpacing = i, this.totalBarWidth = h + i, this.values = d.map(b, Number), this.width = f = b.length * h + (b.length - 1) * i, d.isArray(e.get("colorMap")) ? (this.colorMapByIndex = e.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = e.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === c && (this.colorMapByValue = new s(this.colorMapByValue))), this.initTarget();
      },
      getRegion: function getRegion(a, c, d) {
        return b.floor(c / this.totalBarWidth);
      },
      getCurrentRegionFields: function getCurrentRegionFields() {
        var a = this.currentRegion;
        return {
          isNull: this.values[a] === c,
          value: this.values[a],
          color: this.calcColor(this.values[a], a),
          offset: a
        };
      },
      calcColor: function calcColor(a, b) {
        var c,
            d,
            e = this.values,
            f = this.options,
            g = this.colorMapByIndex,
            h = this.colorMapByValue;
        return c = h && (d = h.get(a)) ? d : g && g.length > b ? g[b] : e[b] < 0 ? f.get("negBarColor") : e[b] > 0 ? f.get("posBarColor") : f.get("zeroBarColor");
      },
      renderRegion: function renderRegion(a, c) {
        var d,
            e,
            f,
            g,
            h,
            i,
            j = this.values,
            k = this.options,
            l = this.target;
        return d = l.pixelHeight, f = b.round(d / 2), g = a * this.totalBarWidth, j[a] < 0 ? (h = f, e = f - 1) : j[a] > 0 ? (h = 0, e = f - 1) : (h = f - 1, e = 2), i = this.calcColor(j[a], a), null !== i ? (c && (i = this.calcHighlightColor(i, k)), l.drawRect(g, h, this.barWidth - 1, e - 1, i, i)) : void 0;
      }
    }), d.fn.sparkline.discrete = z = f(d.fn.sparkline._base, v, {
      type: "discrete",
      init: function init(a, e, f, g, h) {
        z._super.init.call(this, a, e, f, g, h), this.regionShapes = {}, this.values = e = d.map(e, Number), this.min = b.min.apply(b, e), this.max = b.max.apply(b, e), this.range = this.max - this.min, this.width = g = "auto" === f.get("width") ? 2 * e.length : this.width, this.interval = b.floor(g / e.length), this.itemWidth = g / e.length, f.get("chartRangeMin") !== c && (f.get("chartRangeClip") || f.get("chartRangeMin") < this.min) && (this.min = f.get("chartRangeMin")), f.get("chartRangeMax") !== c && (f.get("chartRangeClip") || f.get("chartRangeMax") > this.max) && (this.max = f.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = "auto" === f.get("lineHeight") ? b.round(.3 * this.canvasHeight) : f.get("lineHeight"));
      },
      getRegion: function getRegion(a, c, d) {
        return b.floor(c / this.itemWidth);
      },
      getCurrentRegionFields: function getCurrentRegionFields() {
        var a = this.currentRegion;
        return {
          isNull: this.values[a] === c,
          value: this.values[a],
          offset: a
        };
      },
      renderRegion: function renderRegion(a, c) {
        var d,
            e,
            f,
            g,
            i = this.values,
            j = this.options,
            k = this.min,
            l = this.max,
            m = this.range,
            n = this.interval,
            o = this.target,
            p = this.canvasHeight,
            q = this.lineHeight,
            r = p - q;
        return e = h(i[a], k, l), g = a * n, d = b.round(r - r * ((e - k) / m)), f = j.get("thresholdColor") && e < j.get("thresholdValue") ? j.get("thresholdColor") : j.get("lineColor"), c && (f = this.calcHighlightColor(f, j)), o.drawLine(g, d, g, d + q, f);
      }
    }), d.fn.sparkline.bullet = A = f(d.fn.sparkline._base, {
      type: "bullet",
      init: function init(a, d, e, f, g) {
        var h, i, j;
        A._super.init.call(this, a, d, e, f, g), this.values = d = k(d), j = d.slice(), j[0] = null === j[0] ? j[2] : j[0], j[1] = null === d[1] ? j[2] : j[1], h = b.min.apply(b, d), i = b.max.apply(b, d), h = e.get("base") === c ? 0 > h ? h : 0 : e.get("base"), this.min = h, this.max = i, this.range = i - h, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = f = "auto" === e.get("width") ? "4.0em" : f, this.target = this.$el.simpledraw(f, g, e.get("composite")), d.length || (this.disabled = !0), this.initTarget();
      },
      getRegion: function getRegion(a, b, d) {
        var e = this.target.getShapeAt(a, b, d);
        return e !== c && this.shapes[e] !== c ? this.shapes[e] : c;
      },
      getCurrentRegionFields: function getCurrentRegionFields() {
        var a = this.currentRegion;
        return {
          fieldkey: a.substr(0, 1),
          value: this.values[a.substr(1)],
          region: a
        };
      },
      changeHighlight: function changeHighlight(a) {
        var b,
            c = this.currentRegion,
            d = this.valueShapes[c];

        switch (delete this.shapes[d], c.substr(0, 1)) {
          case "r":
            b = this.renderRange(c.substr(1), a);
            break;

          case "p":
            b = this.renderPerformance(a);
            break;

          case "t":
            b = this.renderTarget(a);
        }

        this.valueShapes[c] = b.id, this.shapes[b.id] = c, this.target.replaceWithShape(d, b);
      },
      renderRange: function renderRange(a, c) {
        var d = this.values[a],
            e = b.round(this.canvasWidth * ((d - this.min) / this.range)),
            f = this.options.get("rangeColors")[a - 2];
        return c && (f = this.calcHighlightColor(f, this.options)), this.target.drawRect(0, 0, e - 1, this.canvasHeight - 1, f, f);
      },
      renderPerformance: function renderPerformance(a) {
        var c = this.values[1],
            d = b.round(this.canvasWidth * ((c - this.min) / this.range)),
            e = this.options.get("performanceColor");
        return a && (e = this.calcHighlightColor(e, this.options)), this.target.drawRect(0, b.round(.3 * this.canvasHeight), d - 1, b.round(.4 * this.canvasHeight) - 1, e, e);
      },
      renderTarget: function renderTarget(a) {
        var c = this.values[0],
            d = b.round(this.canvasWidth * ((c - this.min) / this.range) - this.options.get("targetWidth") / 2),
            e = b.round(.1 * this.canvasHeight),
            f = this.canvasHeight - 2 * e,
            g = this.options.get("targetColor");
        return a && (g = this.calcHighlightColor(g, this.options)), this.target.drawRect(d, e, this.options.get("targetWidth") - 1, f - 1, g, g);
      },
      render: function render() {
        var a,
            b,
            c = this.values.length,
            d = this.target;

        if (A._super.render.call(this)) {
          for (a = 2; c > a; a++) {
            b = this.renderRange(a).append(), this.shapes[b.id] = "r" + a, this.valueShapes["r" + a] = b.id;
          }

          null !== this.values[1] && (b = this.renderPerformance().append(), this.shapes[b.id] = "p1", this.valueShapes.p1 = b.id), null !== this.values[0] && (b = this.renderTarget().append(), this.shapes[b.id] = "t0", this.valueShapes.t0 = b.id), d.render();
        }
      }
    }), d.fn.sparkline.pie = B = f(d.fn.sparkline._base, {
      type: "pie",
      init: function init(a, c, e, f, g) {
        var h,
            i = 0;
        if (B._super.init.call(this, a, c, e, f, g), this.shapes = {}, this.valueShapes = {}, this.values = c = d.map(c, Number), "auto" === e.get("width") && (this.width = this.height), c.length > 0) for (h = c.length; h--;) {
          i += c[h];
        }
        this.total = i, this.initTarget(), this.radius = b.floor(b.min(this.canvasWidth, this.canvasHeight) / 2);
      },
      getRegion: function getRegion(a, b, d) {
        var e = this.target.getShapeAt(a, b, d);
        return e !== c && this.shapes[e] !== c ? this.shapes[e] : c;
      },
      getCurrentRegionFields: function getCurrentRegionFields() {
        var a = this.currentRegion;
        return {
          isNull: this.values[a] === c,
          value: this.values[a],
          percent: this.values[a] / this.total * 100,
          color: this.options.get("sliceColors")[a % this.options.get("sliceColors").length],
          offset: a
        };
      },
      changeHighlight: function changeHighlight(a) {
        var b = this.currentRegion,
            c = this.renderSlice(b, a),
            d = this.valueShapes[b];
        delete this.shapes[d], this.target.replaceWithShape(d, c), this.valueShapes[b] = c.id, this.shapes[c.id] = b;
      },
      renderSlice: function renderSlice(a, d) {
        var e,
            f,
            g,
            h,
            i,
            j = this.target,
            k = this.options,
            l = this.radius,
            m = k.get("borderWidth"),
            n = k.get("offset"),
            o = 2 * b.PI,
            p = this.values,
            q = this.total,
            r = n ? 2 * b.PI * (n / 360) : 0;

        for (h = p.length, g = 0; h > g; g++) {
          if (e = r, f = r, q > 0 && (f = r + o * (p[g] / q)), a === g) return i = k.get("sliceColors")[g % k.get("sliceColors").length], d && (i = this.calcHighlightColor(i, k)), j.drawPieSlice(l, l, l - m, e, f, c, i);
          r = f;
        }
      },
      render: function render() {
        var a,
            d,
            e = this.target,
            f = this.values,
            g = this.options,
            h = this.radius,
            i = g.get("borderWidth");

        if (B._super.render.call(this)) {
          for (i && e.drawCircle(h, h, b.floor(h - i / 2), g.get("borderColor"), c, i).append(), d = f.length; d--;) {
            f[d] && (a = this.renderSlice(d).append(), this.valueShapes[d] = a.id, this.shapes[a.id] = d);
          }

          e.render();
        }
      }
    }), d.fn.sparkline.box = C = f(d.fn.sparkline._base, {
      type: "box",
      init: function init(a, b, c, e, f) {
        C._super.init.call(this, a, b, c, e, f), this.values = d.map(b, Number), this.width = "auto" === c.get("width") ? "4.0em" : e, this.initTarget(), this.values.length || (this.disabled = 1);
      },
      getRegion: function getRegion() {
        return 1;
      },
      getCurrentRegionFields: function getCurrentRegionFields() {
        var a = [{
          field: "lq",
          value: this.quartiles[0]
        }, {
          field: "med",
          value: this.quartiles[1]
        }, {
          field: "uq",
          value: this.quartiles[2]
        }];
        return this.loutlier !== c && a.push({
          field: "lo",
          value: this.loutlier
        }), this.routlier !== c && a.push({
          field: "ro",
          value: this.routlier
        }), this.lwhisker !== c && a.push({
          field: "lw",
          value: this.lwhisker
        }), this.rwhisker !== c && a.push({
          field: "rw",
          value: this.rwhisker
        }), a;
      },
      render: function render() {
        var a,
            d,
            e,
            f,
            g,
            h,
            j,
            k,
            l,
            m,
            n,
            o = this.target,
            p = this.values,
            q = p.length,
            r = this.options,
            s = this.canvasWidth,
            t = this.canvasHeight,
            u = r.get("chartRangeMin") === c ? b.min.apply(b, p) : r.get("chartRangeMin"),
            v = r.get("chartRangeMax") === c ? b.max.apply(b, p) : r.get("chartRangeMax"),
            w = 0;

        if (C._super.render.call(this)) {
          if (r.get("raw")) r.get("showOutliers") && p.length > 5 ? (d = p[0], a = p[1], f = p[2], g = p[3], h = p[4], j = p[5], k = p[6]) : (a = p[0], f = p[1], g = p[2], h = p[3], j = p[4]);else if (p.sort(function (a, b) {
            return a - b;
          }), f = i(p, 1), g = i(p, 2), h = i(p, 3), e = h - f, r.get("showOutliers")) {
            for (a = j = c, l = 0; q > l; l++) {
              a === c && p[l] > f - e * r.get("outlierIQR") && (a = p[l]), p[l] < h + e * r.get("outlierIQR") && (j = p[l]);
            }

            d = p[0], k = p[q - 1];
          } else a = p[0], j = p[q - 1];
          this.quartiles = [f, g, h], this.lwhisker = a, this.rwhisker = j, this.loutlier = d, this.routlier = k, n = s / (v - u + 1), r.get("showOutliers") && (w = b.ceil(r.get("spotRadius")), s -= 2 * b.ceil(r.get("spotRadius")), n = s / (v - u + 1), a > d && o.drawCircle((d - u) * n + w, t / 2, r.get("spotRadius"), r.get("outlierLineColor"), r.get("outlierFillColor")).append(), k > j && o.drawCircle((k - u) * n + w, t / 2, r.get("spotRadius"), r.get("outlierLineColor"), r.get("outlierFillColor")).append()), o.drawRect(b.round((f - u) * n + w), b.round(.1 * t), b.round((h - f) * n), b.round(.8 * t), r.get("boxLineColor"), r.get("boxFillColor")).append(), o.drawLine(b.round((a - u) * n + w), b.round(t / 2), b.round((f - u) * n + w), b.round(t / 2), r.get("lineColor")).append(), o.drawLine(b.round((a - u) * n + w), b.round(t / 4), b.round((a - u) * n + w), b.round(t - t / 4), r.get("whiskerColor")).append(), o.drawLine(b.round((j - u) * n + w), b.round(t / 2), b.round((h - u) * n + w), b.round(t / 2), r.get("lineColor")).append(), o.drawLine(b.round((j - u) * n + w), b.round(t / 4), b.round((j - u) * n + w), b.round(t - t / 4), r.get("whiskerColor")).append(), o.drawLine(b.round((g - u) * n + w), b.round(.1 * t), b.round((g - u) * n + w), b.round(.9 * t), r.get("medianColor")).append(), r.get("target") && (m = b.ceil(r.get("spotRadius")), o.drawLine(b.round((r.get("target") - u) * n + w), b.round(t / 2 - m), b.round((r.get("target") - u) * n + w), b.round(t / 2 + m), r.get("targetColor")).append(), o.drawLine(b.round((r.get("target") - u) * n + w - m), b.round(t / 2), b.round((r.get("target") - u) * n + w + m), b.round(t / 2), r.get("targetColor")).append()), o.render();
        }
      }
    }), F = f({
      init: function init(a, b, c, d) {
        this.target = a, this.id = b, this.type = c, this.args = d;
      },
      append: function append() {
        return this.target.appendShape(this), this;
      }
    }), G = f({
      _pxregex: /(\d+)(px)?\s*$/i,
      init: function init(a, b, c) {
        a && (this.width = a, this.height = b, this.target = c, this.lastShapeId = null, c[0] && (c = c[0]), d.data(c, "_jqs_vcanvas", this));
      },
      drawLine: function drawLine(a, b, c, d, e, f) {
        return this.drawShape([[a, b], [c, d]], e, f);
      },
      drawShape: function drawShape(a, b, c, d) {
        return this._genShape("Shape", [a, b, c, d]);
      },
      drawCircle: function drawCircle(a, b, c, d, e, f) {
        return this._genShape("Circle", [a, b, c, d, e, f]);
      },
      drawPieSlice: function drawPieSlice(a, b, c, d, e, f, g) {
        return this._genShape("PieSlice", [a, b, c, d, e, f, g]);
      },
      drawRect: function drawRect(a, b, c, d, e, f) {
        return this._genShape("Rect", [a, b, c, d, e, f]);
      },
      getElement: function getElement() {
        return this.canvas;
      },
      getLastShapeId: function getLastShapeId() {
        return this.lastShapeId;
      },
      reset: function reset() {
        alert("reset not implemented");
      },
      _insert: function _insert(a, b) {
        d(b).html(a);
      },
      _calculatePixelDims: function _calculatePixelDims(a, b, c) {
        var e;
        e = this._pxregex.exec(b), e ? this.pixelHeight = e[1] : this.pixelHeight = d(c).height(), e = this._pxregex.exec(a), e ? this.pixelWidth = e[1] : this.pixelWidth = d(c).width();
      },
      _genShape: function _genShape(a, b) {
        var c = L++;
        return b.unshift(c), new F(this, c, a, b);
      },
      appendShape: function appendShape(a) {
        alert("appendShape not implemented");
      },
      replaceWithShape: function replaceWithShape(a, b) {
        alert("replaceWithShape not implemented");
      },
      insertAfterShape: function insertAfterShape(a, b) {
        alert("insertAfterShape not implemented");
      },
      removeShapeId: function removeShapeId(a) {
        alert("removeShapeId not implemented");
      },
      getShapeAt: function getShapeAt(a, b, c) {
        alert("getShapeAt not implemented");
      },
      render: function render() {
        alert("render not implemented");
      }
    }), H = f(G, {
      init: function init(b, e, f, g) {
        H._super.init.call(this, b, e, f), this.canvas = a.createElement("canvas"), f[0] && (f = f[0]), d.data(f, "_jqs_vcanvas", this), d(this.canvas).css({
          display: "inline-block",
          width: b,
          height: e,
          verticalAlign: "top"
        }), this._insert(this.canvas, f), this._calculatePixelDims(b, e, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = g, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = c, d(this.canvas).css({
          width: this.pixelWidth,
          height: this.pixelHeight
        });
      },
      _getContext: function _getContext(a, b, d) {
        var e = this.canvas.getContext("2d");
        return a !== c && (e.strokeStyle = a), e.lineWidth = d === c ? 1 : d, b !== c && (e.fillStyle = b), e;
      },
      reset: function reset() {
        var a = this._getContext();

        a.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = c;
      },
      _drawShape: function _drawShape(a, b, d, e, f) {
        var g,
            h,
            i = this._getContext(d, e, f);

        for (i.beginPath(), i.moveTo(b[0][0] + .5, b[0][1] + .5), g = 1, h = b.length; h > g; g++) {
          i.lineTo(b[g][0] + .5, b[g][1] + .5);
        }

        d !== c && i.stroke(), e !== c && i.fill(), this.targetX !== c && this.targetY !== c && i.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a);
      },
      _drawCircle: function _drawCircle(a, d, e, f, g, h, i) {
        var j = this._getContext(g, h, i);

        j.beginPath(), j.arc(d, e, f, 0, 2 * b.PI, !1), this.targetX !== c && this.targetY !== c && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a), g !== c && j.stroke(), h !== c && j.fill();
      },
      _drawPieSlice: function _drawPieSlice(a, b, d, e, f, g, h, i) {
        var j = this._getContext(h, i);

        j.beginPath(), j.moveTo(b, d), j.arc(b, d, e, f, g, !1), j.lineTo(b, d), j.closePath(), h !== c && j.stroke(), i && j.fill(), this.targetX !== c && this.targetY !== c && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a);
      },
      _drawRect: function _drawRect(a, b, c, d, e, f, g) {
        return this._drawShape(a, [[b, c], [b + d, c], [b + d, c + e], [b, c + e], [b, c]], f, g);
      },
      appendShape: function appendShape(a) {
        return this.shapes[a.id] = a, this.shapeseq.push(a.id), this.lastShapeId = a.id, a.id;
      },
      replaceWithShape: function replaceWithShape(a, b) {
        var c,
            d = this.shapeseq;

        for (this.shapes[b.id] = b, c = d.length; c--;) {
          d[c] == a && (d[c] = b.id);
        }

        delete this.shapes[a];
      },
      replaceWithShapes: function replaceWithShapes(a, b) {
        var c,
            d,
            e,
            f = this.shapeseq,
            g = {};

        for (d = a.length; d--;) {
          g[a[d]] = !0;
        }

        for (d = f.length; d--;) {
          c = f[d], g[c] && (f.splice(d, 1), delete this.shapes[c], e = d);
        }

        for (d = b.length; d--;) {
          f.splice(e, 0, b[d].id), this.shapes[b[d].id] = b[d];
        }
      },
      insertAfterShape: function insertAfterShape(a, b) {
        var c,
            d = this.shapeseq;

        for (c = d.length; c--;) {
          if (d[c] === a) return d.splice(c + 1, 0, b.id), void (this.shapes[b.id] = b);
        }
      },
      removeShapeId: function removeShapeId(a) {
        var b,
            c = this.shapeseq;

        for (b = c.length; b--;) {
          if (c[b] === a) {
            c.splice(b, 1);
            break;
          }
        }

        delete this.shapes[a];
      },
      getShapeAt: function getShapeAt(a, b, c) {
        return this.targetX = b, this.targetY = c, this.render(), this.currentTargetShapeId;
      },
      render: function render() {
        var a,
            b,
            c,
            d = this.shapeseq,
            e = this.shapes,
            f = d.length,
            g = this._getContext();

        for (g.clearRect(0, 0, this.pixelWidth, this.pixelHeight), c = 0; f > c; c++) {
          a = d[c], b = e[a], this["_draw" + b.type].apply(this, b.args);
        }

        this.interact || (this.shapes = {}, this.shapeseq = []);
      }
    }), I = f(G, {
      init: function init(b, c, e) {
        var f;
        I._super.init.call(this, b, c, e), e[0] && (e = e[0]), d.data(e, "_jqs_vcanvas", this), this.canvas = a.createElement("span"), d(this.canvas).css({
          display: "inline-block",
          position: "relative",
          overflow: "hidden",
          width: b,
          height: c,
          margin: "0px",
          padding: "0px",
          verticalAlign: "top"
        }), this._insert(this.canvas, e), this._calculatePixelDims(b, c, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, f = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", f), this.group = d(this.canvas).children()[0], this.rendered = !1, this.prerender = "";
      },
      _drawShape: function _drawShape(a, b, d, e, f) {
        var g,
            h,
            i,
            j,
            k,
            l,
            m,
            n = [];

        for (m = 0, l = b.length; l > m; m++) {
          n[m] = "" + b[m][0] + "," + b[m][1];
        }

        return g = n.splice(0, 1), f = f === c ? 1 : f, h = d === c ? ' stroked="false" ' : ' strokeWeight="' + f + 'px" strokeColor="' + d + '" ', i = e === c ? ' filled="false"' : ' fillColor="' + e + '" filled="true" ', j = n[0] === n[n.length - 1] ? "x " : "", k = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + a + '" ' + h + i + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + g + " l " + n.join(", ") + " " + j + 'e"> </v:shape>';
      },
      _drawCircle: function _drawCircle(a, b, d, e, f, g, h) {
        var i, j, k;
        return b -= e, d -= e, i = f === c ? ' stroked="false" ' : ' strokeWeight="' + h + 'px" strokeColor="' + f + '" ', j = g === c ? ' filled="false"' : ' fillColor="' + g + '" filled="true" ', k = '<v:oval  id="jqsshape' + a + '" ' + i + j + ' style="position:absolute;top:' + d + "px; left:" + b + "px; width:" + 2 * e + "px; height:" + 2 * e + 'px"></v:oval>';
      },
      _drawPieSlice: function _drawPieSlice(a, d, e, f, g, h, i, j) {
        var k, l, m, n, o, p, q, r;
        if (g === h) return "";

        if (h - g === 2 * b.PI && (g = 0, h = 2 * b.PI), l = d + b.round(b.cos(g) * f), m = e + b.round(b.sin(g) * f), n = d + b.round(b.cos(h) * f), o = e + b.round(b.sin(h) * f), l === n && m === o) {
          if (h - g < b.PI) return "";
          l = n = d + f, m = o = e;
        }

        return l === n && m === o && h - g < b.PI ? "" : (k = [d - f, e - f, d + f, e + f, l, m, n, o], p = i === c ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + i + '" ', q = j === c ? ' filled="false"' : ' fillColor="' + j + '" filled="true" ', r = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + a + '" ' + p + q + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + d + "," + e + " wa " + k.join(", ") + ' x e"> </v:shape>');
      },
      _drawRect: function _drawRect(a, b, c, d, e, f, g) {
        return this._drawShape(a, [[b, c], [b, c + e], [b + d, c + e], [b + d, c], [b, c]], f, g);
      },
      reset: function reset() {
        this.group.innerHTML = "";
      },
      appendShape: function appendShape(a) {
        var b = this["_draw" + a.type].apply(this, a.args);
        return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", b) : this.prerender += b, this.lastShapeId = a.id, a.id;
      },
      replaceWithShape: function replaceWithShape(a, b) {
        var c = d("#jqsshape" + a),
            e = this["_draw" + b.type].apply(this, b.args);
        c[0].outerHTML = e;
      },
      replaceWithShapes: function replaceWithShapes(a, b) {
        var c,
            e = d("#jqsshape" + a[0]),
            f = "",
            g = b.length;

        for (c = 0; g > c; c++) {
          f += this["_draw" + b[c].type].apply(this, b[c].args);
        }

        for (e[0].outerHTML = f, c = 1; c < a.length; c++) {
          d("#jqsshape" + a[c]).remove();
        }
      },
      insertAfterShape: function insertAfterShape(a, b) {
        var c = d("#jqsshape" + a),
            e = this["_draw" + b.type].apply(this, b.args);
        c[0].insertAdjacentHTML("afterEnd", e);
      },
      removeShapeId: function removeShapeId(a) {
        var b = d("#jqsshape" + a);
        this.group.removeChild(b[0]);
      },
      getShapeAt: function getShapeAt(a, b, c) {
        var d = a.id.substr(8);
        return d;
      },
      render: function render() {
        this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0);
      }
    });
  });
}(document, Math);

/***/ }),

/***/ "./assets/js/jquery.ui.touch-punch.min.js":
/*!************************************************!*\
  !*** ./assets/js/jquery.ui.touch-punch.min.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function (a) {
  function b(a, b) {
    if (!(a.originalEvent.touches.length > 1)) {
      a.preventDefault();
      var c = a.originalEvent.changedTouches[0],
          d = document.createEvent("MouseEvents");
      d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d);
    }
  }

  if (a.support.touch = "ontouchend" in document, a.support.touch) {
    var c,
        d = a.ui.mouse.prototype,
        e = d._mouseInit,
        f = d._mouseDestroy;
    d._touchStart = function (a) {
      var d = this;
      !c && d._mouseCapture(a.originalEvent.changedTouches[0]) && (c = !0, d._touchMoved = !1, b(a, "mouseover"), b(a, "mousemove"), b(a, "mousedown"));
    }, d._touchMove = function (a) {
      c && (this._touchMoved = !0, b(a, "mousemove"));
    }, d._touchEnd = function (a) {
      c && (b(a, "mouseup"), b(a, "mouseout"), this._touchMoved || b(a, "click"), c = !1);
    }, d._mouseInit = function () {
      var b = this;
      b.element.bind({
        touchstart: a.proxy(b, "_touchStart"),
        touchmove: a.proxy(b, "_touchMove"),
        touchend: a.proxy(b, "_touchEnd")
      }), e.call(b);
    }, d._mouseDestroy = function () {
      var b = this;
      b.element.unbind({
        touchstart: a.proxy(b, "_touchStart"),
        touchmove: a.proxy(b, "_touchMove"),
        touchend: a.proxy(b, "_touchEnd")
      }), f.call(b);
    };
  }
}(jQuery);

/***/ }),

/***/ "./assets/css/ace-rtl.min.css":
/*!************************************!*\
  !*** ./assets/css/ace-rtl.min.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/ace-skins.min.css":
/*!**************************************!*\
  !*** ./assets/css/ace-skins.min.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/ace.min.css":
/*!********************************!*\
  !*** ./assets/css/ace.min.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/app.css":
/*!****************************!*\
  !*** ./assets/css/app.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/bootstrap-colorpicker.min.css":
/*!**************************************************!*\
  !*** ./assets/css/bootstrap-colorpicker.min.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/bootstrap-datepicker3.min.css":
/*!**************************************************!*\
  !*** ./assets/css/bootstrap-datepicker3.min.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/bootstrap-datetimepicker.min.css":
/*!*****************************************************!*\
  !*** ./assets/css/bootstrap-datetimepicker.min.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/bootstrap-timepicker.min.css":
/*!*************************************************!*\
  !*** ./assets/css/bootstrap-timepicker.min.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/bootstrap.min.css":
/*!**************************************!*\
  !*** ./assets/css/bootstrap.min.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/daterangepicker.min.css":
/*!********************************************!*\
  !*** ./assets/css/daterangepicker.min.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/fonts.googleapis.com.css":
/*!*********************************************!*\
  !*** ./assets/css/fonts.googleapis.com.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/fullcalendar.min.css":
/*!*****************************************!*\
  !*** ./assets/css/fullcalendar.min.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/css/jquery-ui.custom.min.css":
/*!*********************************************!*\
  !*** ./assets/css/jquery-ui.custom.min.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/font-awesome/4.5.0/css/font-awesome.min.css":
/*!************************************************************!*\
  !*** ./assets/font-awesome/4.5.0/css/font-awesome.min.css ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_index-of_js-node_modules_core-js_modules_es_dat-627bfd","vendors-node_modules_symfony_stimulus-bridge_dist_index_js-node_modules_core-js_modules_es_ar-ebe0de"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);