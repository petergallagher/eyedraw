/**
 * Corneal Oedema
 *
 * @class CornealOedema
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
ED.CornealOedema = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "CornealOedema";

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.CornealOedema.prototype = new ED.Doodle;
ED.CornealOedema.prototype.constructor = ED.CornealOedema;
ED.CornealOedema.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.CornealOedema.prototype.setHandles = function() {
    this.handleArray[4] = new ED.Handle(null, true, ED.Mode.Apex, false);
}

/**
 * Sets default dragging attributes
 */
ED.CornealOedema.prototype.setPropertyDefaults = function() {
    // Update component of validation array for simple parameters
    this.parameterValidationArray['apexX']['range'].setMinAndMax(-50, +50);
    this.parameterValidationArray['apexY']['range'].setMinAndMax(-380, -100);
}

/**
 * Sets default parameters
 */
ED.CornealOedema.prototype.setParameterDefaults = function() {
    this.apexY = -350;
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.CornealOedema.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.CornealOedema.superclass.draw.call(this, _point);

    // Boundary path
    ctx.beginPath();

    // CornealOedema
    var r = -this.apexY;
    ctx.arc(0, 0, r, 0, Math.PI * 2, false);

    // Close path
    ctx.closePath();

    // Create fill
    var alpha = 0.3 + (this.apexX + 50) / 200;
    ctx.fillStyle = "rgba(100,100,100," + alpha.toFixed(2) + ")";
    ctx.strokeStyle = ctx.fillStyle;

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Coordinates of handles (in canvas plane)
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
ED.CornealOedema.prototype.description = function() {
    return "Corneal oedema";
}
