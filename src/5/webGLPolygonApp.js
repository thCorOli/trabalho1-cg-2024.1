document.addEventListener('DOMContentLoaded', (event) => {
    class WebGLPolygonApp extends WebGLMainApp {
        constructor() {
            super();
            this.polygon = null;
            this.init();
        }

        create() {
            // Configurar o shader
            this.program = this.createProgram('vertex-shader', 'fragment-shader');
            this.setProgramAttribShaderVariablesLocation(this.program, ['aVertexPosition', 'aVertexColor']);
            this.setProgramUniformShaderVariablesLocation(this.program, ['uModelViewMatrix']);

            // Criar um polígono
            const color = new Color(1.0, 0.0, 0.0, 1.0);
            this.polygon = new WebGLPolygon(this.gl, this.program, color, false, true);

            // Adicionar pontos ao polígono
            this.polygon.push(new Point2d(-0.5, -0.5, color));
            this.polygon.push(new Point2d(0.5, -0.5, color));
            this.polygon.push(new Point2d(0.5, 0.5, color));
            this.polygon.push(new Point2d(-0.5, 0.5, color));

            this.polygonModel = this.polygon.getWebGLModel(['aVertexPosition', 'aVertexColor'], null);
        }

        draw() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            const modelViewMatrix = mat4.create();
            mat4.identity(modelViewMatrix);

            this.setProgramUniformShaderVariablesValues(this.program, { uModelViewMatrix: ['mat4', false, modelViewMatrix] });

            this.polygonModel.draw();
        }
    }

    // Inicializar a aplicação WebGL
    const app = new WebGLPolygonApp();
});
