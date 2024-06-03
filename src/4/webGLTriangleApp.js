document.addEventListener('DOMContentLoaded', (event) => {
    class WebGLTriangleApp extends WebGLMainApp {
        constructor() {
            super();
            this.triangles = [];
            this.init();
        }

        create() {
            // Configurar o shader
            this.program = this.createProgram('vertex-shader', 'fragment-shader');
            this.setProgramAttribShaderVariablesLocation(this.program, ['aVertexPosition', 'aVertexColor']);
            this.setProgramUniformShaderVariablesLocation(this.program, ['uModelViewMatrix']);

            // Criar triângulos com diferentes transformações
            this.createTriangles();
        }

        createTriangles() {
            const color1 = new Color(1.0, 0.0, 0.0, 1.0); // Red
            const color2 = new Color(0.0, 1.0, 0.0, 1.0); // Green
            const color3 = new Color(0.0, 0.0, 1.0, 1.0); // Blue

            // Primeiro triângulo
            this.triangles.push(this.createTriangle(
                new Vec3d(-0.5, -0.5, 0),
                new Vec3d(0.5, -0.5, 0),
                new Vec3d(0, 0.5, 0),
                color1,
                [0.5, 0.5, 0], // Translate
                0.0, // Rotate
                [1.0, 1.0, 1.0] // Scale
            ));

            // Segundo triângulo
            this.triangles.push(this.createTriangle(
                new Vec3d(-0.5, -0.5, 0),
                new Vec3d(0.5, -0.5, 0),
                new Vec3d(0, 0.5, 0),
                color2,
                [-0.5, 0.5, 0], // Translate
                Math.PI / 4, // Rotate
                [0.5, 0.5, 1.0] // Scale
            ));

            // Terceiro triângulo
            this.triangles.push(this.createTriangle(
                new Vec3d(-0.5, -0.5, 0),
                new Vec3d(0.5, -0.5, 0),
                new Vec3d(0, 0.5, 0),
                color3,
                [0.5, -0.5, 0], // Translate
                Math.PI / 2, // Rotate
                [1.5, 1.5, 1.0] // Scale
            ));
        }

        createTriangle(p0, p1, p2, color, translate, rotate, scale) {
            const triangle = new WebGLTriangle(this.gl, this.program, p0, p1, p2, color, false);
            const modelViewMatrix = mat4.create();
            mat4.translate(modelViewMatrix, modelViewMatrix, translate);
            mat4.rotateZ(modelViewMatrix, modelViewMatrix, rotate);
            mat4.scale(modelViewMatrix, modelViewMatrix, scale);

            return {
                model: triangle.getWebGLModel(['aVertexPosition', 'aVertexColor'], null),
                matrix: modelViewMatrix
            };
        }

        draw() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            this.triangles.forEach(triangle => {
                // Passar a matriz de transformação para o shader
                this.setProgramUniformShaderVariablesValues(this.program, { uModelViewMatrix: ['mat4', false, triangle.matrix] });

                // Desenhar o triângulo
                triangle.model.draw();
            });
        }
    }

    // Inicializar a aplicação WebGL
    const app = new WebGLTriangleApp();
});
