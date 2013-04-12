/**
 * Radial keratotomy
 *
 * @class RK
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
ED.RK = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "RK";

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.RK.prototype = new ED.Doodle;
ED.RK.prototype.constructor = ED.RK;
ED.RK.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.RK.prototype.setHandles = function() {
    this.handleArray[2] = new ED.Handle(null, true, ED.Mode.Scale, false);
    this.handleArray[4] = new ED.Handle(null, true, ED.Mode.Apex, false);
}

/**
 * Sets default dragging attributes
 */
ED.RK.prototype.setPropertyDefaults = function() {
    this.isMoveable = false;
    this.isUnique;

    // Update component of validation array for simple parameters
    this.parameterValidationArray['scaleX']['range'].setMinAndMax(+0.5, +1.15);
    this.parameterValidationArray['scaleY']['range'].setMinAndMax(+0.5, +1.15);
    this.parameterValidationArray['apexX']['range'].setMinAndMax(-0, +0);
    this.parameterValidationArray['apexY']['range'].setMinAndMax(-200, -60);
}

/**
 * Sets default parameters
 */
ED.RK.prototype.setParameterDefaults = function() {
    this.apexY = -100;
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.RK.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.RK.superclass.draw.call(this, _point);

    // RK number and size
    var ro = 320;
    var ri = -this.apexY;
    var n = 8;

    // Calculate parameters for arcs
    var arcStart = 0;
    var arcEnd = 2 * Math.PI;

    // Boundary path
    ctx.beginPath();

    // Do a 360 arc
    ctx.arc(0, 0, ro, arcStart, arcEnd, true);

    // Move to inner circle
    ctx.moveTo(ri, 0);

    // Arc back the other way
    ctx.arc(0, 0, ri, arcEnd, arcStart, false);

    // Close path
    ctx.closePath();

    // Create fill pattern
    ctx.fillStyle = "rgba(155,255,255,0)";

    // Transparent stroke
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(100,100,100,0)";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Non-boundary paths
    if (this.drawFunctionMode == ED.drawFunctionMode.Draw) {
        var theta = 2 * Math.PI / n; // Angle between radii
        ctx.strokeStyle = "rgba(100,100,100,0.7)";

        // Draw radii spokes
        ctx.beginPath();
        var i;
        for (i = 0; i < n; i++) {
            var angle = i * theta;
            var pi = new ED.Point(0, 0);
            pi.setWithPolars(ri, angle);
            var po = new ED.Point(0, 0);
            po.setWithPolars(ro, angle);
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(po.x, po.y);
            ctx.closePath();
        }
        ctx.stroke();
    }

    // Coordinates of handles (in canvas plane)
    var point = new ED.Point(0, 0)
    point.setWithPolars(ro, Math.PI / 4);
    this.handleArray[2].location = this.transform.transformPoint(point);
    this.handleArray[4].location = this.transform.transformPoint(new ED.Point(this.apexX, this.apexY));

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
ED.RK.prototype.description = function() {
    return "Radial keratotomy";
}
