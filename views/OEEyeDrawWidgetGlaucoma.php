<?php
/**
 * Contains a Yii widget for EyeDraw
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
// by default assume editable (create/update):
$divFloat = "left";
// again, for edit assume no margins:
$divMargins = "";

if ($isEditable) {
    if ($side == 'R') {
        ?>
        <div style="float: left">
            <div class="ed_toolbar">
                <button class="ed_img_button" disabled=true id="moveToFront<?php echo $idSuffix ?>" title="Move to front" onclick="<?php echo $drawingName ?>.moveToFront(); return false;">
                    <img src="<?php echo $imgPath ?>moveToFront.gif" />
                </button>
                <button class="ed_img_button" disabled=true id="moveToBack<?php echo $idSuffix ?>" title="Move to back" onclick="<?php echo $drawingName ?>.moveToBack(); return false;">
                    <img src="<?php echo $imgPath ?>moveToBack.gif" />
                </button>
                <button class="ed_img_button" disabled=true id="deleteDoodle<?php echo $idSuffix ?>" title="Delete" onclick="<?php echo $drawingName ?>.deleteDoodle(); return false;">
                    <img src="<?php echo $imgPath ?>deleteDoodle.gif" />
                </button>
                <button class="ed_img_button" disabled=true id="lock<?php echo $idSuffix ?>" title="Lock" onclick="<?php echo $drawingName ?>.lock(); return false;">
                    <img src="<?php echo $imgPath ?>lock.gif" />
                </button>
                <button class="ed_img_button" id="unlock<?php echo $idSuffix ?>" title="Unlock" onclick="<?php echo $drawingName ?>.unlock(); return false;">
                    <img src="<?php echo $imgPath ?>unlock.gif" />
                </button>
            </div>
            <div class="ed_toolbar">
                <?php foreach ($doodleToolBarArray as $i => $item) { ?>
                    <?php if ($i > 0 && $i % 5 == 0) { ?>
                    </div>
                    <div class="ed_toolbar">
                    <?php } ?>
                    <button class="ed_img_button" id="<?php echo $item['classname'] . $idSuffix ?>" title="<?php echo $item['title'] ?>" onclick="<?php echo $drawingName ?>.addDoodle('<?php echo $item['classname'] ?>'); return false;">
                        <img src="<?php echo $imgPath . $item['classname'] ?>.gif" />
                    </button>
                <?php } ?>
            </div>
        </div>
    <?php
    }
} else {
    $divFloat = "center";
    $divMargins = "margin-left:20px; margin-right:20px;";
}
?>
<div style="float:<?php echo $divFloat ?>; <?php echo $divMargins ?>; width: <?php echo ($size + 20) ?>px; height: <?php echo ($size + 20) ?>px;">
    <canvas id="<?php echo $canvasId ?>" class="<?php
if ($isEditable) {
    echo 'edit';
} else {
    echo 'display';
}
?>" width="<?php echo $size ?>" height="<?php echo $size ?>" tabindex="1"<?php if ($canvasStyle) { ?> style="<?php echo $canvasStyle ?>"<?php } ?>></canvas>
    <input type="hidden" id="<?php echo $inputId ?>" name="<?php echo $inputName ?>" value='<?php echo $this->model[$this->attribute] ?>' />
</div>

<?php
if ($isEditable) {
    if ($side == 'L') {
        ?>
        <div style="float: left">
            <div class="ed_toolbar">
                <button class="ed_img_button" disabled=true id="moveToFront<?php echo $idSuffix ?>" title="Move to front" onclick="<?php echo $drawingName ?>.moveToFront(); return false;">
                    <img src="<?php echo $imgPath ?>moveToFront.gif" />
                </button>
                <button class="ed_img_button" disabled=true id="moveToBack<?php echo $idSuffix ?>" title="Move to back" onclick="<?php echo $drawingName ?>.moveToBack(); return false;">
                    <img src="<?php echo $imgPath ?>moveToBack.gif" />
                </button>
                <button class="ed_img_button" disabled=true id="deleteDoodle<?php echo $idSuffix ?>" title="Delete" onclick="<?php echo $drawingName ?>.deleteDoodle(); return false;">
                    <img src="<?php echo $imgPath ?>deleteDoodle.gif" />
                </button>
                <button class="ed_img_button" disabled=true id="lock<?php echo $idSuffix ?>" title="Lock" onclick="<?php echo $drawingName ?>.lock(); return false;">
                    <img src="<?php echo $imgPath ?>lock.gif" />
                </button>
                <button class="ed_img_button" id="unlock<?php echo $idSuffix ?>" title="Unlock" onclick="<?php echo $drawingName ?>.unlock(); return false;">
                    <img src="<?php echo $imgPath ?>unlock.gif" />
                </button>
            </div>
            <div class="ed_toolbar">
                <?php foreach ($doodleToolBarArray as $i => $item) { ?>
                    <?php if ($i > 0 && $i % 5 == 0) { ?>
                    </div>
                    <div class="ed_toolbar">
                    <?php } ?>
                    <button class="ed_img_button" id="<?php echo $item['classname'] . $idSuffix ?>" title="<?php echo $item['title'] ?>" onclick="<?php echo $drawingName ?>.addDoodle('<?php echo $item['classname'] ?>'); return false;">
                        <img src="<?php echo $imgPath . $item['classname'] ?>.gif" />
                    </button>
                <?php } ?>
            </div>
        </div>
    <?php
    }
}
?>