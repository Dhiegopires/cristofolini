/* Home hero background: a dark liquid-metal surface lit in the brand amber.
   Plain WebGL (no library). The pointer acts as the light and bends the
   surface slightly; without a pointer the light orbits on its own.
   Renders at reduced resolution, pauses when off screen or in a hidden tab,
   and draws one still frame under prefers-reduced-motion. If WebGL or the
   derivatives extension is missing, the CSS gradient behind it stays. */
(function () {
  var canvas = document.querySelector('[data-hero-gl]');
  if (!canvas) return;
  // Start after the page has loaded and the main thread is idle, so shader
  // compilation never competes with the first paint.
  var go = function () {
    if (window.requestIdleCallback) requestIdleCallback(init, { timeout: 1500 });
    else setTimeout(init, 200);
  };
  if (document.readyState === 'complete') go();
  else window.addEventListener('load', go);

  function init() {
  var gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl || !gl.getExtension('OES_standard_derivatives')) return;

  var vert = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var frag = [
    '#extension GL_OES_standard_derivatives : enable',
    'precision highp float;',
    'uniform vec2 r;uniform float t;uniform vec2 m;',
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);',
    ' return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+1.),u.x),u.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);',
    ' for(int i=0;i<4;i++){v+=a*n(p);p=R*p*2.03;a*=.5;}return v;}',
    'void main(){',
    ' vec2 p=(gl_FragCoord.xy-.5*r)/r.y;',
    ' vec2 mp=(m-.5)*vec2(r.x/r.y,1.);',
    ' float d=length(p-mp);',
    ' p-=(p-mp)*.18*exp(-d*d*5.);',
    ' vec2 s=p*1.05;',
    ' vec2 q=vec2(fbm(s+vec2(0.,t*.06)),fbm(s+vec2(5.2,1.3)-t*.05));',
    ' vec2 w=vec2(fbm(s+2.8*q+vec2(1.7,9.2)+t*.035),fbm(s+2.8*q+vec2(8.3,2.8)-t*.03));',
    ' float f=fbm(s+2.*w);',
    ' vec3 N=normalize(vec3(-dFdx(f)*r.y*.3,-dFdy(f)*r.y*.3,1.));',
    ' vec3 L=normalize(vec3(mp-p,.55));',
    ' vec3 V=vec3(0.,0.,1.);',
    ' float dif=max(dot(N,L),0.);',
    ' float spec=pow(max(dot(reflect(-L,N),V),0.),22.);',
    ' float fall=exp(-d*d*2.2);',
    ' vec3 amber=vec3(.988,.753,0.);',
    ' vec3 col=vec3(.018,.016,.014)+vec3(.11,.1,.09)*pow(dif,3.)*f;',
    ' col+=amber*spec*(.12+.85*fall);',
    ' col+=vec3(1.,.93,.75)*pow(spec,3.)*.3*fall;',
    ' col+=amber*.06*smoothstep(.55,.9,f)*fall;',
    ' vec2 uv=gl_FragCoord.xy/r;',
    ' col*=.35+.65*smoothstep(1.15,.25,length(uv-.5)*1.6);',
    ' col+=(h(gl_FragCoord.xy+fract(t))-.5)*.025;',
    ' gl_FragColor=vec4(col,1.);',
    '}',
  ].join('\n');

  function sh(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  var vs = sh(gl.VERTEX_SHADER, vert);
  var fs = sh(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uR = gl.getUniformLocation(prog, 'r');
  var uT = gl.getUniformLocation(prog, 't');
  var uM = gl.getUniformLocation(prog, 'm');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  // Render scale: the field is soft, so a fraction of the CSS size upscales cleanly.
  var scale = coarse ? 0.45 : 0.7;

  function resize() {
    var w = Math.max(1, Math.round(canvas.clientWidth * scale));
    var hgt = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== hgt) {
      canvas.width = w;
      canvas.height = hgt;
      gl.viewport(0, 0, w, hgt);
    }
  }

  var target = { x: 0.68, y: 0.62 };
  var cur = { x: 0.68, y: 0.62 };
  var hasPointer = false;
  window.addEventListener(
    'pointermove',
    function (e) {
      if (e.pointerType !== 'mouse') return;
      var b = canvas.getBoundingClientRect();
      target.x = (e.clientX - b.left) / b.width;
      target.y = 1 - (e.clientY - b.top) / b.height;
      hasPointer = true;
    },
    { passive: true }
  );

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      visible = en[0].isIntersecting;
      if (visible) loop();
    }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) loop();
  });

  var start = performance.now();
  var raf = 0;
  function draw(now) {
    var t = (now - start) / 1000;
    if (!hasPointer) {
      // Touch: orbit low on the screen, away from the headline.
      target.x = 0.5 + Math.cos(t * 0.23) * (coarse ? 0.4 : 0.28);
      target.y = coarse ? 0.07 + Math.sin(t * 0.31) * 0.05 : 0.55 + Math.sin(t * 0.31) * 0.22;
    }
    cur.x += (target.x - cur.x) * 0.06;
    cur.y += (target.y - cur.y) * 0.06;
    resize();
    gl.uniform2f(uR, canvas.width, canvas.height);
    gl.uniform1f(uT, t + 20);
    gl.uniform2f(uM, cur.x, cur.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function frame(now) {
    raf = 0;
    if (!visible || document.hidden || reduce.matches) return;
    draw(now);
    raf = requestAnimationFrame(frame);
  }
  function loop() {
    if (reduce.matches) {
      draw(start + 8000);
      return;
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }
  window.addEventListener('resize', function () {
    if (reduce.matches) draw(start + 8000);
  });
  if (reduce.addEventListener) reduce.addEventListener('change', loop);

  canvas.classList.add('is-ready');
  loop();
  }
})();
