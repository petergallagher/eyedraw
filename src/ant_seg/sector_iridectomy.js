/**
 * SectorIridectomy
 *
 * @class SectorIridectomy
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
ED.SectorIridectomy = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "SectorIridectomy";

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.SectorIridectomy.prototype = new ED.Doodle;
ED.SectorIridectomy.prototype.constructor = ED.SectorIridectomy;
ED.SectorIridectomy.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.SectorIridectomy.prototype.setHandles = function() {
    this.handleArray[0] = new ED.Handle(null, true, ED.Mode.Arc, false);
    this.handleArray[3] = new ED.Handle(null, true, ED.Mode.Arc, false);
}

/**
 * Sets default dragging attributes
 */
ED.SectorIridectomy.prototype.setPropertyDefaults = function() {
    this.isScaleable = false;
    this.isMoveable = false;
    this.isRotatable = true;
    this.isArcSymmetrical = true;

    // Update component of validation array for simple parameters
    this.parameterValidationArray['arc']['range'].setMinAndMax(20 * Math.PI / 180, Math.PI / 2);
    this.parameterValidationArray['apexX']['range'].setMinAndMax(-0, +0);
    this.parameterValidationArray['apexY']['range'].setMinAndMax(-334, -300);
    this.parameterValidationArray['radius']['range'].setMinAndMax(250, 450);
}

/**
 * Sets default parameters
 */
ED.SectorIridectomy.prototype.setParameterDefaults = function() {
    // Default arc
    this.arc = 60 * Math.PI / 180;

    // Make a second one 90 degress to last one of same class
    var doodle = this.drawing.lastDoodleOfClass(this.className);
    if (doodle) {
        this.rotation = doodle.rotation + Math.PI / 2;
    }
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.SectorIridectomy.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.SectorIridectomy.superclass.draw.call(this, _point);

    // Radii
    var ro = 376;

    // If iris there, take account of pupil size
    var ri;
    var doodle = this.drawing.lastDoodleOfClass("AntSeg");
    if (doodle) ri = -doodle.apexY - 2;
    else ri = 300;

    var r = ri + (ro - ri) / 2;

    // Calculate parameters for arcs
    var theta = this.arc / 2;
    var arcStart = -Math.PI / 2 + theta;
    var arcEnd = -Math.PI / 2 - theta;

    // Coordinates of 'corners' of doodle
    var topRightX = r * Math.sin(theta);
    var topRightY = -r * Math.cos(theta);
    var topLeftX = -r * Math.sin(theta);
    var topLeftY = topRightY;

    // Boundary path
    ctx.beginPath();

    // Half angle of arc
    var theta = this.arc / 2;

    // Arc across
    ctx.arc(0, 0, ro, -Math.PI / 2 + theta, -Math.PI / 2 - theta, true);

    // Arc back to mirror image point on the other side
    ctx.arc(0, 0, ri, -Math.PI / 2 - theta, -Math.PI / 2 + theta, false);

    // Close path
    ctx.closePath();

    // Colour of fill
    ctx.fillStyle = "rgba(218,230,241,1)";

    // Set line attributes
    ctx.lineWidth = 4;

    // Colour of outer line
    ctx.strokeStyle = "rgba(218,230,241,1)";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Coordinates of handles (in canvas plane)
    this.handleArray[0].location = this.transform.transformPoint(new ED.Point(topLeftX, topLeftY));
    this.handleArray[3].location = this.transform.transformPoint(new ED.Point(topRightX, topRightY));

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
ED.SectorIridectomy.prototype.description = function() {
    var returnString = "Sector iridectomy of " + (this.arc * 180 / Math.PI).toFixed(0) + " degrees at ";
    returnString += this.clockHour() + " o'clock";

    return returnString;
}
