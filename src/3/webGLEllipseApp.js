document.addEventListener('DOMContentLoaded', (event) => {
    class WebGLEllipseApp extends WebGLMainApp {
        constructor() {
            super();
            this.startX = 0;
            this.startY = 0;
            this.endX = 0;
            this.endY = 0;
            this.isDrawing = false;
            this.ellipses = [];
            this.previewEllipse = null;
            this.currentColor = new Color(1.0, 0.0, 0.0, 1.0); // Cor padrão vermelha
            this.numSubdiv = 100; // Número de subdivisões da elipse

            // Eventos do mouse
            this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));

            // Evento para o botão de limpar
            document.getElementById('clear-button').addEventListener('click', this.clearCanvas.bind(this));

            this.init();
        }

        onMouseDown(event) {
            this.isDrawing = true;
            const rect = this.canvas.getBoundingClientRect();
            this.startX = event.clientX - rect.left;
            this.startY = event.clientY - rect.top;
            this.previewEllipse = new WebGLEllipse(this.gl, this.program, this.startX, this.startY, 0, 0, this.currentColor, this.numSubdiv);
        }

        onMouseMove(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            const radiusX = Math.abs(this.endX - this.startX);
            const radiusY = Math.abs(this.endY - this.startY);
            this.previewEllipse = new WebGLEllipse(this.gl, this.program, this.startX, this.startY, radiusX, radiusY, this.currentColor, this.numSubdiv);
        }

        onMouseUp(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.isDrawing = false;

            const radiusX = Math.abs(this.endX - this.startX);
            const radiusY = Math.abs(this.endY - this.startY);

            const ellipse = new WebGLEllipse(this.gl, this.program, this.startX, this.startY, radiusX, radiusY, this.currentColor, this.numSubdiv);
            this.ellipses.push(ellipse);
            this.previewEllipse = null;
        }

        clearCanvas() {
            this.ellipses = [];
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }

        create() {
            // Configurar o shader
            this.program = this.createProgram('vertex-shader', 'fragment-shader');
            this.setProgramAttribShaderVariablesLocation(this.program, ['aVertexPosition', 'aVertexColor']);
        }

        draw() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            for (let ellipse of this.ellipses) {
                ellipse.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
            if (this.previewEllipse) {
                this.previewEllipse.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
        }
    }

    // Inicializar a aplicação WebGL
    const app = new WebGLEllipseApp();
});
