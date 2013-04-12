/**
 * Post Subcapsular Cataract Cross Section
 *
 * @class PostSubcapCataractCrossSection
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
ED.PostSubcapCataractCrossSection = function(_drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order) {
    // Set classname
    this.className = "PostSubcapCataractCrossSection";

    // Derived parameters (NB must set a value here to define parameter as a property of the object, even though value set later)
    this.grade = 'Mild';

    // Call superclass constructor
    ED.Doodle.call(this, _drawing, _originX, _originY, _radius, _apexX, _apexY, _scaleX, _scaleY, _arc, _rotation, _order);
}

/**
 * Sets superclass and constructor
 */
ED.PostSubcapCataractCrossSection.prototype = new ED.Doodle;
ED.PostSubcapCataractCrossSection.prototype.constructor = ED.PostSubcapCataractCrossSection;
ED.PostSubcapCataractCrossSection.superclass = ED.Doodle.prototype;

/**
 * Sets handle attributes
 */
ED.PostSubcapCataractCrossSection.prototype.setHandles = function() {
    //this.handleArray[4] = new ED.Handle(null, true, ED.Mode.Apex, false);
}

/**
 * Sets default properties
 */
ED.PostSubcapCataractCrossSection.prototype.setPropertyDefaults = function() {
    this.isScaleable = false;
    this.isRotatable = false;
    this.isUnique = true;
    this.parentClass = "LensCrossSection";
    this.inFrontOfClassArray = ["LensCrossSection"];

    // Update validation array for simple parameters
    this.parameterValidationArray['apexX']['range'].setMinAndMax(-0, +0);
    this.parameterValidationArray['apexY']['range'].setMinAndMax(-180, -20);
}

/**
 * Sets default parameters (Only called for new doodles)
 * Use the setParameter function for derived parameters, as this will also update dependent variables
 */
ED.PostSubcapCataractCrossSection.prototype.setParameterDefaults = function() {
    this.originX = 44;
    this.apexY = -35;
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.PostSubcapCataractCrossSection.prototype.draw = function(_point) {
    // Get context
    var ctx = this.drawing.context;

    // Call draw method in superclass
    ED.PostSubcapCataractCrossSection.superclass.draw.call(this, _point);

    // Height of cross section (half value of ro in AntSeg doodle)
    var h = 240;

    // Radius of curvature of lens
    var r = 300;

    // Displacement lens from centre
    var ld = 100;

    // Angle of arc
    var theta = Math.asin(h / r);

    // X coordinate of centre of circle
    var x = r * Math.cos(theta);

    // Radius of cataract (Just inside capsule)
    var rco = r - 10;

    // Calculate nucleus angles
    theta = Math.acos(x / rco);

    // Calculate cataract angles
    var phi = Math.asin(-this.apexY / rco);

    // Boundary path
    ctx.beginPath();

    // Draw cataract with two sections of circumference of circle
    ctx.arc(ld - x, 0, rco, -phi, phi, false);

    // Set line attributes
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.strokeStyle = "rgba(150,150,150,0.75)";

    // Draw boundary path (also hit testing)
    this.drawBoundary(_point);

    // Other stuff here
    if (this.drawFunctionMode == ED.drawFunctionMode.Draw) {}

    // Coordinates of handles (in canvas plane)
    //this.handleArray[4].location = this.transform.transformPoint(new ED.Point(ld, this.apexY));

    // Draw handles if selected
    if (this.isSelected && !this.isForDrawing) this.drawHandles(_point);

    // Return value indicating successful hittest
    return this.isClicked;
}

