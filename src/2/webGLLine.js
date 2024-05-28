class WebGLLine {
    constructor(gl, program, startX, startY, endX, endY, color) {
        this.gl = gl;
        this.program = program;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
    }

    getWebGLModel(attribShaderVariables = null, uniformShaderVariables = null) {
        const coords = [
            (this.startX / 400) - 1, 1 - (this.startY / 300), 0.0,
            (this.endX / 400) - 1, 1 - (this.endY / 300), 0.0
        ];

        const indices = [0, 1];

        const colors = [
            this.color.r, this.color.g, this.color.b,
            this.color.r, this.color.g, this.color.b
        ];

        const webGLLineModel = new WebGLModel(this.gl, this.program, 3, this.gl.LINES, coords, indices, colors, null, null, null);
        webGLLineModel.set(attribShaderVariables, uniformShaderVariables);
        return webGLLineModel;
    }
}
