<?php
/**
 * Contains a Yii widget for EyeDraw
 * @package EyeDraw
 * @package OphCiGlaucomaexamination
 * @author Richard Meeking <richard@plus10tech.co.uk>
 * @version 0.1
 * @copyright Copyright (c) 2012 OpenEyes Foundation
 * @copyright Copyright (c) 2012 Cardiff University
 * @license http://www.yiiframework.com/license/
 *
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
require_once(dirname(__FILE__) . "/OEEyeDrawWidget.php");

class OEEyeDrawWidgetGonioscopy extends OEEyeDrawWidget {

	public $doodleToolBarArray = array('AngleNV', 'AntSynech', 'AngleRecession');

	public $onLoadedCommandArray = array(
			array('addDoodle', array('Gonioscopy')),
			array('addDoodle', array('AngleGrade', 0)),
			array('addDoodle', array('AngleGrade', 1.575)),
			array('addDoodle', array('AngleGrade', -1.575)),
			array('addDoodle', array('AngleGrade', 3.1415926535898)),
			array('deselectDoodles', array()),
	);
	public $identifier = 'Gonioscopy';
	public $no_wrapper = true;
	
	public function init() {
		if ($this->mode == 'view') {
			$this->doodleToolBarArray = array();
			$this->onLoadedCommandArray = array(array('addDoodle',
					array('Gonioscopy')), array('deselectDoodles', array()));
		}
		parent::init();
	}

}
