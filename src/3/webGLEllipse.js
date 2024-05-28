class WebGLEllipse {
    constructor(gl, program, centerX, centerY, radiusX, radiusY, color, numSubdiv) {
        this.gl = gl;
        this.program = program;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.color = color;
        this.numSubdiv = numSubdiv;
    }

    evaluate(ang) {
        var x = this.radiusX * Math.cos(ang) + this.centerX;
        var y = this.radiusY * Math.sin(ang) + this.centerY;
        return [x, y];
    }

    getWebGLModel(attribShaderVariables = null, uniformShaderVariables = null) {
        const coords = [];
        const indices = [];
        const colors = [];
        const delta = 2 * Math.PI / this.numSubdiv;
        
        for (let i = 0; i < this.numSubdiv; i++) {
            const p = this.evaluate(i * delta);
            coords.push((p[0] / 400) - 1, 1 - (p[1] / 300), 0.0);
            indices.push(i);
            colors.push(this.color.r, this.color.g, this.color.b);
        }

        const webGLEllipseModel = new WebGLModel(this.gl, this.program, 3, this.gl.LINE_LOOP, coords, indices, colors, null, null, null);
        webGLEllipseModel.set(attribShaderVariables, uniformShaderVariables);
        return webGLEllipseModel;
    }
}
