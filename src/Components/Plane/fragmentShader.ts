export const fragmentShader = `

    uniform float uTime;
    varying vec2 vUv;

   

    // cosine based palette, 4 vec3 params
    vec3 palette(float t)
    {
        vec3 a = vec3(0.558 ,0.498, 0.718);
        vec3 b = vec3(0.468 ,-0.422 ,-0.192);
        vec3 c = vec3(-0.112 ,1.278, 0.948);
        vec3 d = vec3(-0.003 ,0.302 ,0.635);
    
        return a + b*cos( 6.28318*(c*t+d) );
    }
    
    void main(){

        gl_FragCoord.xy;
        vec2 uv = (vUv - .5) * 2.;
        vec2 uv0 = uv;
        vec3 finalColor = vec3(.0);

        for(float i = 0.; i < 4.; i++){
            uv = fract(uv * 2.) - .5;
            float d = length(uv) * exp(-length(uv0));

            vec3 color = palette(length(uv0) + i*.4 + uTime*.4);


            d = sin(d*8. + uTime) / 8.;
            d = abs(d);

            d = pow(0.01 / d, 1.2);

            finalColor += color*=d;
        }
        gl_FragColor = vec4(finalColor, 1.);
    }
`