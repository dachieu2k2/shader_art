export const fragmentShader = `

    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uPointer;

    varying vec2 vUv;


   

    
    float sdStar5(in vec2 p, in float r, in float rf)
    {
        const vec2 k1 = vec2(0.809016994375, -0.587785252292);
        const vec2 k2 = vec2(-k1.x,k1.y);
        p.x = abs(p.x);
        p -= 2.0*max(dot(k1,p),0.0)*k1;
        p -= 2.0*max(dot(k2,p),0.0)*k2;
        p.x = abs(p.x);
        p.y -= r;
        vec2 ba = rf*vec2(-k1.y,k1.x) - vec2(0,1);
        float h = clamp( dot(p,ba)/dot(ba,ba), 0.0, r );
        return length(p-ba*h) * sign(p.y*ba.x-p.x*ba.y);
    }

    float sdCircle( in vec2 p, in float r ) 
    {
        return length(p)-r;
    }
    float rand(vec2 co){
        // https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    vec3 lastExplosion(float time)
    {
        // vec3(time since last explosion,
        //      index of last explosion,
        //      time until next explosion)
        float t = mod(time, 10.);
        float interval = floor(time/10.);
        float t0max = 0., imax=-1.;
        float t0next = 10.;
        for(float i=0.; i<10.; i++)
        {
            float t0 = rand(vec2(interval, i)) * 10.;
            if(t > t0 && t0 > t0max)
            {
                t0max = t0;
                imax = i;
            }
            if(t < t0 && t0 < t0next)
            {
                t0next = t0;
            }
        }
        return vec3(t-t0max, 10.*interval+imax, t0next-t);
    }
    vec2 rotate(vec2 v, float a) {
        float s = sin(a);
        float c = cos(a);
        mat2 m = mat2(c, -s, s, c);
        return m * v;
    }


        
    void main(){

        vec2 fragCoord = gl_FragCoord.xy;
        vec2 uv = (vUv - .5) * 2.;
        vec2 p = (2.0*fragCoord-uResolution.xy)/uResolution.y;
        vec2 m = (2.0*uPointer.xy-uResolution.xy)/uResolution.y;

        float d = 0.0;
            vec3 lastExpl = lastExplosion(uTime);
        float t = lastExpl.x, explNum = lastExpl.y, tFadeout = lastExpl.z;
        
        // Number of particles
        float N_LIGHTS = 40.;
        for(float i=0.; i<N_LIGHTS; i++)
        {
                // (see Total Compendium eq. (34))
            float f = i/N_LIGHTS;
            float r = sqrt(1. - f*f);
            float th = 2.*0.618033*3.14159*i; // Use Golden Ratio for a quasirandom sequence
            float hash = sin(i*85412.243);
            float weight = (1.-0.2*hash);
            th += hash *3.* 6.28/N_LIGHTS;
            // Only take x and y coordinates
            vec2 lpos = vec2(cos(th), sin(th)) * r;
            // Add some physics
            lpos.xy *= (1.-exp(-3.*t/weight)) * weight; // explosion, easing out
            lpos.y += t*0.3*weight - t*(1.-exp(-t*weight)) * 0.6 * weight; // vertical free-fall motion
            float scale = 10.0-t*2.0;
            d = min(d,sdStar5(rotate(scale*p-scale*lpos,sin(0.2*t)),0.5 ,0.5));
            }
        
        vec3 col = (d<0.0) ? vec3(255/208,0.0,0.0) : vec3(0.65,0.85,1.0);
        
        // coloring
        // vec3 col = vec3(d);
        gl_FragColor = vec4(col, 1.);
    }
`