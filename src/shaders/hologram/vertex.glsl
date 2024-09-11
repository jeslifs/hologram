uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/random2D.glsl

void main() 
{
    // modelPosition
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // glitch
    float time = uTime - modelPosition.y;
    float strength = sin(time) + sin(time * 3.45) + sin(time * 8.76);
    strength /= 3.0;
    strength = smoothstep(0.3, 1.0, strength);
    strength *= 0.25;
    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * strength;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * strength;

    // final postion
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // varying
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
    // vPosition = position.xyz;
}