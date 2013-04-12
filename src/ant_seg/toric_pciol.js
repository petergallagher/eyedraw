/**
 * Toric Posterior chamber IOL
 *
 * @class ToricPCIOL
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
ED.ToricPCIOL = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "ToricPCIOL";

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.ToricPCIOL.prototype = new ED.Doodle;
ED.ToricPCIOL.prototype.constructor = ED.ToricPCIOL;
ED.ToricPCIOL.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.ToricPCIOL.prototype.setHandles = function() {
    this.handleArray[2] = new ED.Handle(null, true, ED.Mode.Rotate, false);
}

/**
 * Sets default dragging attributes
 */
ED.ToricPCIOL.prototype.setPropertyDefaults = function() {
    this.addAtBack = true;
    this.isOrientated = false;
    this.isScaleable = false;
    this.isUnique = true;
}

/**
 * Sets default parameters
 */
ED.ToricPCIOL.prototype.setParameterDefaults = function() {
    this.scaleX = 0.75;
    this.scaleY = 0.75;
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.ToricPCIOL.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.ToricPCIOL.superclass.draw.call(this, _point);

    // Boundary path
    ctx.beginPath();

    // Radius of IOL optic
    var r = 240;

    // Draw optic
    ctx.arc(0, 0, r, 0, Math.PI * 2, false);

    // Draw upper haptic
    ctx.moveTo(150, -190);
    ctx.bezierCurveTo(160, -200, 190, -350, 160, -380);
    ctx.bezierCurveTo(90, -440, -150, -410, -220, -370);
    ctx.bezierCurveTo(-250, -350, -260, -400, -200, -430);
    ctx.bezierCurveTo(-110, -480, 130, -470, 200, -430);
    ctx.bezierCurveTo(270, -390, 220, -140, 220, -100);

    // Draw lower haptic
    ctx.moveTo(-150, 190);
    ctx.bezierCurveTo(-160, 200, -190, 350, -160, 380);
    ctx.bezierCurveTo(-90, 440, 150, 410, 220, 370);
    ctx.bezierCurveTo(250, 350, 260, 400, 200, 430);
    ctx.bezierCurveTo(110, 480, -130, 470, -200, 430);
    ctx.bezierCurveTo(-270, 390, -220, 140, -220, 100);

    // Colour of fill is white but with transparency
    ctx.fillStyle = "rgba(255,255,255,0.75)";

    // Set line attributes
    ctx.lineWidth = 4;

    // Colour of outer line is dark gray
    ctx.strokeStyle = "darkgray";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Other stuff here
    if (this.drawFunctionMode == ED.drawFunctionMode.Draw) {
        // Lines for toric IOL
        ctx.beginPath();

        // Create points
        var phi = 0.7 * Math.PI / 4;
        var theta = phi + Math.PI;
        var p1 = new ED.Point(0, 0)
        p1.setWithPolars(r - 20, phi);
        var p2 = new ED.Point(0, 0);
        p2.setWithPolars(r - 100, phi);
        var p3 = new ED.Point(0, 0)
        p3.setWithPolars(r - 20, theta);
        var p4 = new ED.Point(0, 0);
        p4.setWithPolars(r - 100, theta);

        // Create lines
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);

        // Set line attributes
        ctx.lineWidth = 24;
        ctx.lineCap = "round";
        ctx.strokeStyle = "darkgray";

        // Draw lines
        ctx.stroke();
    }

    // Coordinates of handles (in canvas plane)
    var point = new ED.Point(0, 0)
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
ED.ToricPCIOL.prototype.description = function() {
    var returnValue = "Toric posterior chamber IOL";

    // Displacement limit
    var limit = 40;

    // ***TODO*** ensure description takes account of side of eye
    var displacementValue = "";

    if (this.originY < -limit) {
        if (displacementValue.length > 0) displacementValue += " and";
        displacementValue += " superiorly";
    }
    if (this.originY > limit) {
        if (displacementValue.length > 0) displacementValue += " and";
        displacementValue += " inferiorly";
    }
    if (this.originX < -limit) {
        if (displacementValue.length > 0) displacementValue += " and";
        displacementValue += " temporally";
    }
    if (this.originX > limit) {
        if (displacementValue.length > 0) displacementValue += " and";
        displacementValue += " nasally";
    }

    // Add displacement description
    if (displacementValue.length > 0) returnValue += " displaced" + displacementValue;

    return returnValue;
}
