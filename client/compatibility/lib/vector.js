function Vector2(x,y) {
	this.x = x;
	this.y = y;
}

Vector2.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;

	return this;
}

Vector2.prototype.copy = function(v) {
	this.x = v.x;
	this.y = v.y;

	return this;
}

Vector2.prototype.clone = function() {
	return new Vector2(this.x, this.y);
}

Vector2.prototype.add = function(v1, v2) {
	this.x = v1.x + v2.x;
	this.y = v1.y + v2.y;

	return this;
}

Vector2.prototype.addSelf = function(v) {
	this.x += v.x;
	this.y += v.y;

	return this;
}

Vector2.prototype.multiplyScalar = function(s) {
	this.x *= s;
	this.y *= s;

	return this;
}

Vector2.prototype.devideScalar = function(s) {
	if(s) {
		this.x /= s;
		this.y /= s;
	} else {
		this.x = 0;
		this.y = 0;
	}

	return this;
}

Vector2.prototype.negate = function() {
	return this.multiplyScalar(-1);
}

Vector2.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y;
}

Vector2.prototype.lengthSq = function() {
	return this.x * this.x + this.y * this.y;
}

Vector2.prototype.length = function() {
	return Math.sqrt( this.lengthSq() );
}

Vector2.prototype.normalize = function() {
	return this.devideScalar( this.length() );
}

Vector2.prototype.distanceTo = function(v) {
	return Math.sqrt( this.distanceToSquared(v) );
}

Vector2.prototype.distanceToSquared = function(v) {
	var dx = this.x - v.x;
	var dy = this.y - v.y;

	return dx * dx + dy * dy;
}

Vector2.prototype.setLength = function(l) {
	return this.normalize().multiplyScalar(l);
}

Vector2.prototype.equals = function(v) {
	return ((v.x === this.x) && (v.y === this.y));
}

Vector2.prototype.findAngleBetween = function(v) {
	return Math.atan2(v.x-this.x, v.y-this.y);
}