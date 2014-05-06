/**
 * (C) Moorfields Eye Hospital NHS Foundation Trust, 2008-2011
 * (C) OpenEyes Foundation, 2011-2014
 * This file is part of OpenEyes.
 *
 * OpenEyes is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OpenEyes is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenEyes.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global $: false */

var ED = ED || {};
ED.Views = ED.Views || {};

/**
 * This view class manages the toolbar.
 */
ED.Views.Toolbar = (function() {

	'use strict';

	/** Constants **/
	var EVENT_NAMESPACE = 'eyedraw.toolbar';

	/**
	 * Toolbar constructor
	 * @param {ED.Drawing} drawing   A doodle drawing instance.
	 * @param {HTMLElement} container The widget container element
	 * @extends {EventEmitter2}
	 */
	function Toolbar() {
		ED.View.apply(this, arguments);
		this.buttons = this.container.find('.eyedraw-button');
		this.bindEvents();
	}

	Toolbar.prototype = Object.create(ED.View.prototype);
	Toolbar.prototype.constructor = Toolbar;

	/**
	 * Register a ED.Drawing notification handler. For each event, update
	 * the toolbar state.
	 */
	Toolbar.prototype.registerForNotifications = function() {
		this.drawing.registerForNotifications(this, 'updateState', [
			'doodleAdded',
			'doodleDeleted',
		]);
	};

	/**
	 * Bind UI events.
	 */
	Toolbar.prototype.bindEvents = function() {
		this.container.on('click.' + EVENT_NAMESPACE, '.eyedraw-button', this.onButtonClick.bind(this));
	};

	Toolbar.prototype.enableButton = function(button) {
		button.attr('disabled', false).removeClass('disabled');
	};

	Toolbar.prototype.disableButton = function(button) {
		button.attr('disabled', true).addClass('disabled');
	};

	/**
	 * Update the state of a toolbar button. Find the associated doodle
	 * and determine if the button should be enabled or disabled.
	 * @param  {jQuery} button A jQuery button instance
	 */
	Toolbar.prototype.updateButtonState = function(button) {

		this.enableButton(button);

		var func = button.data('function');
		var arg = button.data('arg');

		if (func !== 'addDoodle') {
			return;
		}

		var doodle = this.drawing.doodleArray.filter(function(doodle) {
			return (doodle.className === arg);
		})[0];

		if (doodle && doodle.isUnique) {
			this.disableButton(button);
		}
	};

	/**
	 * Update the state of all toolbar buttons.
	 */
	Toolbar.prototype.updateState  = function() {
		this.buttons.each(function(i, button) {
			this.updateButtonState($(button));
		}.bind(this));
	};

	/*********************
	 * EVENT HANDLERS
	 *********************/

	/**
	 * Run an action when clicking on a toolbar button.
	 * @param  {Object} e Event object.
	 */
	Toolbar.prototype.onButtonClick = function(e) {

		e.preventDefault();
		e.stopImmediatePropagation();

		var button = $(e.currentTarget);

		if (button.hasClass('disabled')) {
			return;
		}

		var fn = button.data('function');
		var arg = button.data('arg');

		if (typeof this.drawing[fn] === 'function') {
			this.drawing[fn](arg);
			this.emit('doodle.action', {
				fn: fn,
				arg: arg
			});
		} else {
			this.emit('doodle.error', 'Invalid doodle function: ' + fn);
		}
	};

	return Toolbar;
}());