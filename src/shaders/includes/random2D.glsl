float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898, 78.233)) * 4378.5453123));
}