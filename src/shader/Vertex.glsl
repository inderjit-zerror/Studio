

const Vertex = `
   uniform float uTime;
uniform float uStrength;

void main() {
    vec3 pos = position;

            // Wave when hovered
    pos.x += sin(pos.y * 5.0 + uTime * 5.0) * 0.15 * uStrength;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
export default Vertex;