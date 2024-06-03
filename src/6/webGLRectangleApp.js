document.addEventListener('DOMContentLoaded', (event) => {
    class WebGLRectangleApp extends WebGLMainApp {
        constructor() {
            super();
            this.time = 0;
            this.rectangle = null;
            this.init();
        }

        create() {
            this.program = this.createProgram('vertex-shader', 'fragment-shader');
            this.setProgramAttribShaderVariablesLocation(this.program, ['aVertexPosition', 'aVertexColor']);
            this.setProgramUniformShaderVariablesLocation(this.program, ['uModelViewMatrix']);

            const coords = [
                -0.5, -0.5, 0.0,
                 0.5, -0.5, 0.0,
                 0.5,  0.5, 0.0,
                -0.5,  0.5, 0.0
            ];
            const indices = [0, 1, 2, 0, 2, 3];
            const colors = [
                0.0, 1.0, 1.0,
                0.0, 1.0, 1.0,
                0.0, 1.0, 1.0,
                0.0, 1.0, 1.0
            ];
            this.rectangle = new WebGLModel(this.gl, this.program, 3, this.gl.TRIANGLES, coords, indices, colors);
            this.rectangle.set(['aVertexPosition', 'aVertexColor'], null);
        }

        draw() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            this.time += 0.02;
            const translateX = 1 * Math.sin(this.time);
            const translateY = 0.02 * Math.cos(this.time);

            const modelViewMatrix = [
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                translateX, translateY, 0.0, 1.0
            ];

            this.setProgramUniformShaderVariablesValues(this.program, { uModelViewMatrix: ['mat4', false, modelViewMatrix] });

            this.rectangle.draw();
        }
    }

    const app = new WebGLRectangleApp();
});
