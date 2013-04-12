/**
 * LimbalRelaxingIncision
 *
 * @class LimbalRelaxingIncision
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
ED.LimbalRelaxingIncision = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "LimbalRelaxingIncision";

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.LimbalRelaxingIncision.prototype = new ED.Doodle;
ED.LimbalRelaxingIncision.prototype.constructor = ED.LimbalRelaxingIncision;
ED.LimbalRelaxingIncision.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.LimbalRelaxingIncision.prototype.setHandles = function() {
    this.handleArray[3] = new ED.Handle(null, true, ED.Mode.Arc, false);
}

/**
 * Sets default dragging attributes
 */
ED.LimbalRelaxingIncision.prototype.setPropertyDefaults = function() {
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
ED.LimbalRelaxingIncision.prototype.setParameterDefaults = function() {
    // Default arc
    this.arc = 30 * Math.PI / 180;

    // Make it 180 degress to last one of same class
    var doodle = this.drawing.lastDoodleOfClass(this.className);
    if (doodle) {
        this.rotation = doodle.rotation + Math.PI;
        this.arc = doodle.arc;
    } else {
        // LRIs are usually temporal
        if (this.drawing.eye == ED.eye.Right) {
            this.rotation = -Math.PI / 2;
        } else {
            this.rotation = Math.PI / 2;
        }
    }
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.LimbalRelaxingIncision.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.LimbalRelaxingIncision.superclass.draw.call(this, _point);

    // Radius
    var r = 360
    var d = 12;
    var ro = r + d;
    var ri = r - d;

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
    ctx.fillStyle = "rgba(100,100,200,0.75)";

    // Set line attributes
    ctx.lineWidth = 4;

    // Colour of outer line is dark gray
    ctx.strokeStyle = "rgba(120,120,120,0.75)";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Coordinates of handles (in canvas plane)
    var point = new ED.Point(0, 0);
    point.setWithPolars(r, theta);
    this.handleArray[3].location = this.transform.transformPoint(point);

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
ED.LimbalRelaxingIncision.prototype.description = function() {
    var returnString = "Limbal relaxing incision " + (this.arc * 180 / Math.PI).toFixed(0) + " degrees at ";
    returnString += this.clockHour() + " o'clock";

    return returnString;
}
