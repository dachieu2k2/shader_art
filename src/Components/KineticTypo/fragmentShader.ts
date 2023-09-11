// ** Refer : https://tympanus.net/codrops/2020/06/02/kinetic-typography-with-three-js/


export const fragmentShader = `

    uniform float uTime;
    uniform vec2 uResolution;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying vec3 vPos;


    
    void main(){
        // vec2 uv = vUv;
        // vec2 uv = (2.*gl_FragCoord.xy-uResolution.xy)/uResolution.y;

        // vec2 uv = (vUv - .5) * 2.;


        float time = uTime * 0.5;

        vec2 repeat = -vec2(12., 3.);
        // To repeat the uvs we need to multiply them by a scalar
        // and then get the fractional part of it so they from 0 to 1

        // To move them continuously we have to add time
        // to the x or y component, to change the direction
        vec2 uv = fract(vUv * repeat - vec2(time, 0.)); // The sign of time change direction of movement

        // Fake shadow
        float shadow = clamp(vPos.z / 5., 0., 1.);
    
        
        vec4 texture = texture2D(uTexture, uv);
        // texture *= vec4(uv.x, uv.y, 1., 1.); // To help visualize the repeated uvs
        
        if (texture.a <0.5) discard;

        gl_FragColor = vec4(texture*shadow);
    }
`