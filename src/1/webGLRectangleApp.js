document.addEventListener('DOMContentLoaded', (event) => {
    class WebGLRectangleApp extends WebGLMainApp {
        constructor() {
            super();
            this.startX = 0;
            this.startY = 0;
            this.endX = 0;
            this.endY = 0;
            this.isDrawing = false;
            this.rectangles = [];
            this.previewRectangle = null;

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
            this.previewRectangle = new WebGLRectangle(this.gl, this.program, this.startX, this.startY, this.startX, this.startY, new Color(1.0, 0.0, 0.0, 1.0));
        }

        onMouseMove(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.previewRectangle = new WebGLRectangle(this.gl, this.program, this.startX, this.startY, this.endX, this.endY, new Color(1.0, 0.0, 0.0, 1.0));
        }

        onMouseUp(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.isDrawing = false;

            const color = new Color(1.0, 0.0, 0.0, 1.0); // Vermelho
            const rectangle = new WebGLRectangle(this.gl, this.program, this.startX, this.startY, this.endX, this.endY, color);
            this.rectangles.push(rectangle);
            this.previewRectangle = null;
        }

        clearCanvas() {
            this.rectangles = [];
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }

        create() {
            // Configurar o shader
            this.program = this.createProgram('vertex-shader', 'fragment-shader');
            this.setProgramAttribShaderVariablesLocation(this.program, ['aVertexPosition', 'aVertexColor']);
        }

        draw() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            for (let rectangle of this.rectangles) {
                rectangle.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
            if (this.previewRectangle) {
                this.previewRectangle.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
        }
    }

    // Inicializar a aplicação WebGL
    const app = new WebGLRectangleApp();
});
document.addEventListener('DOMContentLoaded', (event) => {
    class WebGLRectangleApp extends WebGLMainApp {
        constructor() {
            super();
            this.startX = 0;
            this.startY = 0;
            this.endX = 0;
            this.endY = 0;
            this.isDrawing = false;
            this.rectangles = [];
            this.previewRectangle = null;

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
            this.previewRectangle = new WebGLRectangle(this.gl, this.program, this.startX, this.startY, this.startX, this.startY, new Color(1.0, 0.0, 0.0, 1.0));
        }

        onMouseMove(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.previewRectangle = new WebGLRectangle(this.gl, this.program, this.startX, this.startY, this.endX, this.endY, new Color(1.0, 0.0, 0.0, 1.0));
        }

        onMouseUp(event) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.isDrawing = false;

            const color = new Color(1.0, 0.0, 0.0, 1.0); // Vermelho
            const rectangle = new WebGLRectangle(this.gl, this.program, this.startX, this.startY, this.endX, this.endY, color);
            this.rectangles.push(rectangle);
            this.previewRectangle = null;
        }

        clearCanvas() {
            this.rectangles = [];
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }

        create() {
            // Configurar o shader
            this.program = this.createProgram('vertex-shader', 'fragment-shader');
            this.setProgramAttribShaderVariablesLocation(this.program, ['aVertexPosition', 'aVertexColor']);
        }

        draw() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            for (let rectangle of this.rectangles) {
                rectangle.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
            if (this.previewRectangle) {
                this.previewRectangle.getWebGLModel(['aVertexPosition', 'aVertexColor']).draw();
            }
        }
    }

    // Inicializar a aplicação WebGL
    const app = new WebGLRectangleApp();
});
