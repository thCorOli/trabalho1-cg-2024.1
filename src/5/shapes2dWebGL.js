/* Classes com implementação WebGL dos objetos gráficos */
// Avoid using. Too much resource use for a simple point
// Prefer use WebGLPointList
class WebGLPoint2d extends Point2d{
    constructor (gl,program,x,y,color,size = 1){
        super(x,y,color,size);
        this.gl = gl;
        this.program = program;
    }

    /* Retorna um modelo WebGL do objeto gráfico */
    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        var coords = [this.x,this.y,0.0];
        var indices = [0];
        var colors = [this.color.r,this.color.g,this.color.g];

        const webGLPoint2dModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coords,indices,colors,null,null,null);
        webGLPoint2dModel.set(attribShaderVariables,uniformShaderVariables);
        return webGLPoint2dModel;
    }
}


class WebGLPointList extends PointList{
    constructor (gl,program){
        super();
        this.gl = gl;
        this.program = program;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var indices = [];
        var colors = [];
        var i;
        for (i=0;i<this.list.length;i++){
            var p = this.list[i];
            coords.push(p.x);
            coords.push(p.y);
            coords.push(0.0);
            indices.push(i);
            colors.push(p.color.r);
            colors.push(p.color.g);
            colors.push(p.color.b);
        }
        

        const webGLPointListModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coords,indices,colors,null,null,null);
        webGLPointListModel.set(attribShaderVariables,uniformShaderVariables);
      
        return webGLPointListModel;
    }
}

class WebGLTriangle extends Triangle{
    constructor (gl,program,p0,p1,p2,c,interpolation){
        super(p0,p1,p2,c);
        this.gl = gl;
        this.program = program;
        this.interpolation = interpolation;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        var coords = [this.p0.x,this.p0.y,0,
                      this.p1.x,this.p1.y,0,
                      this.p2.x,this.p2.y,0];
        
        var indices = [0,1,2]; 
        var colors;

        if (this.interpolation == true)
        {
            colors = [this.p0.color.r,this.p0.color.g,this.p0.color.b,
                      this.p1.color.r,this.p1.color.g,this.p1.color.b,
                      this.p2.color.r,this.p2.color.g,this.p2.color.b];
        }
        else{
            colors = [this.color.r,this.color.g,this.color.b,
                      this.color.r,this.color.g,this.color.b,
                      this.color.r,this.color.g,this.color.b];
        }    

        const webGLTriangleModel = new WebGLModel(this.gl,this.program,2,this.gl.TRIANGLES,coords,indices,colors,null,null,null);
        webGLTriangleModel.set(attribShaderVariables,uniformShaderVariables);

        return webGLTriangleModel;
    }
}

class WebGLTriangleList extends TriangleList{
    constructor (gl,program){
        super();
        this.gl = gl;
        this.program = program;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var indices = [];
        var colors = [];
        var i;
        for (i=0;i<this.list.length;i++){
            var t = this.list[i];
            coords.push(t.p0.x);
            coords.push(t.p0.y);
            coords.push(0);
            coords.push(t.p1.x);
            coords.push(t.p1.y);
            coords.push(0);
            coords.push(t.p2.x);
            coords.push(t.p2.y);
            coords.push(0);
            
            indices.push(3*i);
            indices.push(3*i+1);
            indices.push(3*i+2);

            if (this.interpolation == true)
                {
                    colors.push(t.p0.color.r);
                    colors.push(t.p0.color.g);
                    colors.push(t.p0.color.b);
                    colors.push(t.p1.color.r);
                    colors.push(t.p1.color.g);
                    colors.push(t.p1.color.b);
                    colors.push(t.p2.color.r);
                    colors.push(t.p2.color.g);
                    colors.push(t.p2.color.b);
                        }
                else{
                    colors.push(t.color.r);
                    colors.push(t.color.g);
                    colors.push(t.color.b);
                    colors.push(t.color.r);
                    colors.push(t.color.g);
                    colors.push(t.color.b);
                    colors.push(t.color.r);
                    colors.push(t.color.g);
                    colors.push(t.color.b);
            }


        }

        const webGLTriangleListModel = new WebGLModel(this.gl,this.program,2,this.gl.TRIANGLES,coords,indices,colors,null,null,null);
        webGLTriangleListModel.set(attribShaderVariables,uniformShaderVariables);

        return webGLTriangleListModel;
    }
}


class WebGLPolygon extends Polygon {
    constructor(gl, program, color, interpolation, filled = false) {
        super(color, interpolation);
        this.gl = gl;
        this.program = program;
        this.filled = filled;
    }

    getWebGLModel(attribShaderVariables = null, uniformShaderVariables = null) {
        var coords = [];
        var indices = [];
        var colors = [];
        var i;

        for (i = 0; i < this.pointList.size; i++) {
            var p = this.pointList.list[i];
            coords.push(p.x);
            coords.push(p.y);
            coords.push(0.0);
            indices.push(i);

            if (this.interpolation) {
                colors.push(this.color.r);
                colors.push(this.color.g);
                colors.push(this.color.b);
            } else {
                colors.push(p.color.r);
                colors.push(p.color.g);
                colors.push(p.color.b);
            }
        }

        let primitiveType = this.gl.LINE_LOOP;
        if (this.filled) {
            primitiveType = this.gl.TRIANGLES;
            indices = triangulatePolygon(coords);
        }

        const webGLPolygonModel = new WebGLModel(this.gl, this.program, 2, primitiveType, coords, indices, colors, null, null, null);
        webGLPolygonModel.set(attribShaderVariables, uniformShaderVariables);

        return webGLPolygonModel;
    }
}


class WebGLCircle extends Circle{
    constructor (gl,program,cx,cy,radius,color,numSubdiv,filled,interpolation){
        super(cx,cy,radius,color,numSubdiv);
        this.gl = gl;
        this.program = program;
        this.interpolation = interpolation;
        this.filled = filled;
    
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var indices = [];
        var colors = [];
        var primitiveType;

        if (this.filled == true){
            this.discreticizeFilled(this.numSubdiv,coords,indices,colors);
            primitiveType = this.gl.TRIANGLES;
        }
        else{
            this.discreticize(this.numSubdiv,coords,indices,colors);
            primitiveType = this.gl.LINE_LOOP;
        }
 
        const webGLCircleModel = new WebGLModel(this.gl,this.program,2,primitiveType,coords,indices,colors,null,null,null);
        webGLCircleModel.set(attribShaderVariables,uniformShaderVariables);

        return webGLCircleModel;
    }
}


class WebGLBezier extends Bezier{
    constructor (gl,program,color,controlPoints,degree,nDiv,filled = false, interpolation = false){
        super(controlPoints,degree,color);
        this.gl = gl;
        this.program = program;
        this.nDiv = nDiv;
        this.filled = filled;
        this.interpolation = interpolation;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var colors = [];
        var indices = [];
        var indicesEdges = [];
        var coordsPol = [];
        var colorsPol = [];
        var indicesPol = [];
        var indicesEdgesPol = [];
        
        this.discreticize(this.nDiv,coords,colors,indices,indicesEdges,coordsPol,colorsPol,indicesPol,indicesEdgesPol);
      
        const webGLBezierControlPointsModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coordsPol,indicesPol,colorsPol,null,null,null);
        webGLBezierControlPointsModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBezierControlPointsEdgesModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coordsPol,indicesEdgesPol,colorsPol,null,null,null);
        webGLBezierControlPointsEdgesModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBezierModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coords,indicesEdges,colors,null,null,null);
        webGLBezierModel.set(attribShaderVariables,uniformShaderVariables);

        return [webGLBezierControlPointsModel,webGLBezierControlPointsEdgesModel,webGLBezierModel];
    }
}

class WebGLBSpline extends BSpline{
    constructor (gl,program,color,controlPoints,knots,degree,nDiv,filled = false, interpolation = false){
        super(controlPoints,knots,degree,color);
        this.gl = gl;
        this.program = program;
        this.nDiv = nDiv;
        this.filled = filled;
        this.interpolation = interpolation;
    }

    getWebGLModel(attribShaderVariables = null,uniformShaderVariables = null){
        
        var coords = [];
        var colors = [];
        var indices = [];
        var indicesEdges = [];
        var coordsPol = [];
        var colorsPol = [];
        var indicesPol = [];
        var indicesEdgesPol = [];
        
        this.discreticize(this.nDiv,coords,colors,indices,indicesEdges,coordsPol,colorsPol,indicesPol,indicesEdgesPol);
      
        const webGLBSplineControlPointsModel = new WebGLModel(this.gl,this.program,2,this.gl.POINTS,coordsPol,indicesPol,colorsPol,null,null,null);
        webGLBSplineControlPointsModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBSplineControlPointsEdgesModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coordsPol,indicesEdgesPol,colorsPol,null,null,null);
        webGLBSplineControlPointsEdgesModel.set(attribShaderVariables,uniformShaderVariables);

        const webGLBSplineModel = new WebGLModel(this.gl,this.program,2,this.gl.LINES,coords,indicesEdges,colors,null,null,null);
        webGLBSplineModel.set(attribShaderVariables,uniformShaderVariables);

        return [webGLBSplineControlPointsModel,webGLBSplineControlPointsEdgesModel,webGLBSplineModel];
    }
}

function isPointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
    const v0 = [cx - ax, cy - ay];
    const v1 = [bx - ax, by - ay];
    const v2 = [px - ax, py - ay];

    const dot00 = v0[0] * v0[0] + v0[1] * v0[1];
    const dot01 = v0[0] * v1[0] + v0[1] * v1[1];
    const dot02 = v0[0] * v2[0] + v0[1] * v2[1];
    const dot11 = v1[0] * v1[0] + v1[1] * v1[1];
    const dot12 = v1[0] * v2[0] + v1[1] * v2[1];

    const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return (u >= 0) && (v >= 0) && (u + v < 1);
}

function triangulatePolygon(vertices) {
    if (vertices.length < 6) {
        return [];
    }

    const result = [];
    const indices = [];
    for (let i = 0; i < vertices.length / 2; i++) {
        indices.push(i);
    }

    let earFound = true;
    while (indices.length > 3 && earFound) {
        earFound = false;
        for (let i = 0; i < indices.length; i++) {
            const i0 = indices[i];
            const i1 = indices[(i + 1) % indices.length];
            const i2 = indices[(i + 2) % indices.length];

            const ax = vertices[2 * i0], ay = vertices[2 * i0 + 1];
            const bx = vertices[2 * i1], by = vertices[2 * i1 + 1];
            const cx = vertices[2 * i2], cy = vertices[2 * i2 + 1];

            let isEar = true;
            for (let j = 0; j < indices.length; j++) {
                if (j === i || j === (i + 1) % indices.length || j === (i + 2) % indices.length) {
                    continue;
                }
                const px = vertices[2 * indices[j]], py = vertices[2 * indices[j] + 1];
                if (isPointInTriangle(px, py, ax, ay, bx, by, cx, cy)) {
                    isEar = false;
                    break;
                }
            }

            if (isEar) {
                result.push(i0, i1, i2);
                indices.splice((i + 1) % indices.length, 1);
                earFound = true;
                break;
            }
        }
    }

    if (indices.length === 3) {
        result.push(indices[0], indices[1], indices[2]);
    }

    return result;
}

