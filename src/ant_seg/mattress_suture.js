/**
 * MattressSuture
 *
 * @class MattressSuture
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
ED.MattressSuture = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "MattressSuture";

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.MattressSuture.prototype = new ED.Doodle;
ED.MattressSuture.prototype.constructor = ED.MattressSuture;
ED.MattressSuture.superclass = ED.Doodle.prototype;

/**
 * Sets default dragging attributes
 */
ED.MattressSuture.prototype.setPropertyDefaults = function() {
    this.isScaleable = false;
    this.isMoveable = false;
}

/**
 * Sets default parameters
 */
ED.MattressSuture.prototype.setParameterDefaults = function() {
    this.radius = 374;
    this.setRotationWithDisplacements(10, 20);
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.MattressSuture.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.MattressSuture.superclass.draw.call(this, _point);

    // Boundary path
    ctx.beginPath();

    var r = this.radius;
    ctx.rect(-40, -(r + 40), 80, 80);

    ctx.closePath();

    // Colour of fill
    ctx.fillStyle = "rgba(255,255,255,0.0)";

    // Set line attributes
    ctx.lineWidth = 4;

    // Colour of outer line is dark gray
    ctx.strokeStyle = "rgba(120,120,120,0.0)";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Other stuff here
    if (this.drawFunctionMode == ED.drawFunctionMode.Draw) {
        ctx.beginPath();
        ctx.moveTo(-40, -(r + 40));
        ctx.lineTo(40, -(r + 40));
        ctx.lineTo(-40, -(r - 40));
        ctx.lineTo(40, -(r - 40));
        ctx.lineTo(-40, -(r + 40));

        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(0,0,120,0.7)";
        ctx.closePath();

        ctx.stroke();
    }

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
ED.MattressSuture.prototype.description = function() {
    var returnString = "Mattress suture at ";

    returnString += this.clockHour() + " o'clock";

    return returnString;
}
