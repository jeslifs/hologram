uniform float uTime;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{

    // normal
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
        normal *= -1.0;
    // stripes
    float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0);
    stripes = pow(stripes, 3.0);

    // fersnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    // falloff
    float falloff = smoothstep(0.8, 0.0, fresnel);
    
    // hologram
    float holgram = stripes * fresnel;
    holgram += fresnel * 1.25;
    holgram *= falloff;


    // final color
    gl_FragColor = vec4(uColor, holgram);
    // gl_FragColor = vec4(vNormal, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}