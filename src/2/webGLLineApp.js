document.addEventListener('DOMContentLoaded', (event) => {
    class WebGLLinesApp extends WebGLMainApp {
        constructor() {
            super();
            this.startX = 0;
            this.startY = 0;
            this.endX = 0;
            this.endY = 0;
            this.isDrawing = false;
            this.lines = [];
            this.previewLine = null;
            this.currentColor = new Color(1.0, 0.0, 0.0, 1.0); // Cor padrão vermelha

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
            this.previewLine = new WebGLLine(this.gl, this.program, this.startX, this.startY, this.startX, this.startY, this.currentColor);
        }

        onMouseMove(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.previewLine = new WebGLLine(this.gl, this.program, this.startX, this.startY, this.endX, this.endY, this.currentColor);
        }

        onMouseUp(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.isDrawing = false;

            const line = new WebGLLine(this.gl, this.program, this.startX, this.startY, this.endX, this.endY, this.currentColor);
            this.lines.push(line);
            this.previewLine = null;
        }

        clearCanvas() {
            this.lines = [];
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }

        create() {
            // Configurar o shader
            this.program = this.createProgram('vertex-shader', 'fragment-shader');
            this.setProgramAttribShaderVariablesLocation(this.program, ['aVertexPosition', 'aVertexColor']);
        }

        draw() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            for (let line of this.lines) {
                line.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
            if (this.previewLine) {
                this.previewLine.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
        }
    }

    // Inicializar a aplicação WebGL
    const app = new WebGLLinesApp();
});
