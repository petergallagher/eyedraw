/**
 * Corneal abrasion
 *
 * @class CornealAbrasion
 * @property {String} className Name of doodle subclass
 * @param {Drawing} _drawing
 * @param {Int} _originX
 * @param {Int} _originY
 * @param {Float} _radius
 * @param {Int} _apexX
 * @param {Int} _apexY
 * @param {Float} _scaleX
 * @param {Float} _scaleY
 * @param {Float} _arc
 * @param {Float} _rotation
 * @param {Int} _order
 */
ED.CornealAbrasion = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "CornealAbrasion";

    // Doodle specific property
    this.isInVisualAxis = false;

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.CornealAbrasion.prototype = new ED.Doodle;
ED.CornealAbrasion.prototype.constructor = ED.CornealAbrasion;
ED.CornealAbrasion.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.CornealAbrasion.prototype.setHandles = function() {
    this.handleArray[2] = new ED.Handle(null, true, ED.Mode.Scale, false);
}

/**
 * Sets default dragging attributes
 */
ED.CornealAbrasion.prototype.setPropertyDefaults = function() {
    this.isSqueezable = true;
    this.isRotatable = false;

    // Update component of validation array for simple parameters
    this.parameterValidationArray['scaleX']['range'].setMinAndMax(+0.25, +2);
    this.parameterValidationArray['scaleY']['range'].setMinAndMax(+0.25, +2);
}

/**
 * Sets default parameters
 */
ED.CornealAbrasion.prototype.setParameterDefaults = function() {
    this.apexY = -50;
    this.scaleX = 1.5;
    this.scaleY = 1;

    this.setOriginWithDisplacements(0, 25);
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.CornealAbrasion.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.CornealAbrasion.superclass.draw.call(this, _point);

    // Boundary path
    ctx.beginPath();

    // CornealAbrasion
    var r = 120;
    ctx.arc(0, 0, r, 0, Math.PI * 2, false);

    // Close path
    ctx.closePath();

    // Create fill
    var alpha = -this.apexY / 100;
    ctx.fillStyle = "rgba(0, 255, 0, 1)";

    // Semi -transparent stroke
    ctx.strokeStyle = "rgba(100,100,100,0.9)";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Coordinates of handles (in canvas plane)
    var point = new ED.Point(0, 0);
    point.setWithPolars(r, Math.PI / 4);
    this.handleArray[2].location = this.transform.transformPoint(point);

    // Draw handles if selected
    if (this.isSelected && !this.isForDrawing) this.drawHandles(_point);

    // Return value indicating successful hittest
    return this.isClicked;
}

/**
 * Returns a string containing a text description of the doodle
 *
 * @returns {String} Description of doodle
 */
ED.CornealAbrasion.prototype.description = function() {
    var returnString = "";

    // Calculate size
    var averageScale = this.scaleX + this.scaleY;

    // Arbitrary cutoffs
    if (averageScale < 2) returnString = "Small ";
    else if (averageScale < 4) returnString = "Medium ";
    else returnString = "Large ";

    returnString += "corneal abrasion";

    return returnString;
}
