/**
 * Iris Naevus
 *
 * @class IrisNaevus
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
ED.IrisNaevus = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "IrisNaevus";

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.IrisNaevus.prototype = new ED.Doodle;
ED.IrisNaevus.prototype.constructor = ED.IrisNaevus;
ED.IrisNaevus.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.IrisNaevus.prototype.setHandles = function() {
    this.handleArray[2] = new ED.Handle(null, true, ED.Mode.Scale, false);
}

/**
 * Sets default dragging attributes
 */
ED.IrisNaevus.prototype.setPropertyDefaults = function() {
    this.isSqueezable = true;
    this.isOrientated = true;
}

/**
 * Sets default parameters
 */
ED.IrisNaevus.prototype.setParameterDefaults = function() {
    this.originY = -226;
    this.scaleX = 1.8;
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.IrisNaevus.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.IrisNaevus.superclass.draw.call(this, _point);

    // Boundary path
    ctx.beginPath();

    // IrisNaevus
    var r = 50;
    ctx.arc(0, 0, r, 0, Math.PI * 2, false);

    // Close path
    ctx.closePath();

    // Create fill
    ctx.fillStyle = "brown";

    // Transparent stroke
    ctx.strokeStyle = "rgba(100,100,100,0.9)";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Coordinates of handles (in canvas plane)
    var point = new ED.Point(0, 0);
    point.setWithPolars(r, Math.PI / 4);
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
ED.IrisNaevus.prototype.description = function() {
    return "Iris naevus";
}
