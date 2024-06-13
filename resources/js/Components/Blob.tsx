import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import "../../css/blob.css"

const THREEScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const h1 = h1Ref.current;
    const nav = navRef.current;
    const canvas = canvasRef.current;

    if (!container || !h1 || !nav || !canvas) return;

    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.001, 100);
    camera.position.set(0, 0, 20);
    camera.updateProjectionMatrix();

    const geometry = new THREE.IcosahedronGeometry(4, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        u_factor: { value: 0.5 },
        u_opacity: { value: 0 }
      },
      vertexShader: `
        varying vec3 v_position;
        varying vec2 vUv;

        uniform float time;
        uniform float scroll;
        uniform float u_factor;

        mat3 rotation3dX(float angle) {
          float s = sin(angle);
          float c = cos(angle);

          return mat3(
            1.0, 0.0, 0.0,
            0.0, c, s,
            0.0, -s, c
          );
        }

        mat3 rotation3dY(float angle) {
          float s = sin(angle);
          float c = cos(angle);

          return mat3(
            c, 0.0, -s,
            0.0, 1.0, 0.0,
            s, 0.0, c
          );
        }

        void main () {
          vUv = uv;
          vec3 new_position = position;

          float wave = 0.0;
          wave += 0.10 * sin(time + position.x) + 0.05 * sin(1.0 * time + position.x) + 0.05 * sin(0.25 * time + position.x);
          wave += 0.15 * sin(time + position.y) + 0.05 * sin(2.0 * time + position.y) + 0.05 * sin(0.25 * time + position.y);
          wave += 0.20 * sin(time + position.z) + 0.05 * sin(0.5 * time + position.z) + 0.05 * sin(0.25 * time + position.z);

          new_position *= mix(u_factor, 1.0, wave);

          new_position *= rotation3dX(scroll * 0.001);
          new_position *= rotation3dY(scroll * 0.002);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
          gl_PointSize = 1.5;

          v_position = new_position;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float u_opacity;
        varying vec3 v_position;
        varying vec2 vUv;

        vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
          return a + b * cos(6.28318 * (c * t + d));
        }

        void main () {
          vec3 position = v_position;
          vec3 col = palette(vUv.y, vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.20, 0.25));
          vec3 color = mix(vec3(0.0, 0.9, 1.0), vec3(0.5, 0.0, 1.0), vUv.y); // Gradient Color (R, G, B)
          gl_FragColor = vec4(color, 0.5);
        }
      `
    });

    const cube = new THREE.Points(geometry, material);
    cube.scale.set(0.75, 0.75, 0.75);
    scene.add(cube);

    const render = () => {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);

      material.uniforms.time.value = clock.getElapsedTime();
      cube.rotation.y += 0.005;
      cube.rotation.x += 0.003;

      requestAnimationFrame(render);
    };

    render();

    gsap.set(h1, { x: -24 });

    const tl = gsap.timeline({ delay: 1 });

    tl.to(h1, { x: 0, opacity: 1 })
      .fromTo(nav.children, { opacity: 0, y: 32 }, { opacity: 1, y: 0, stagger: 0.15, ease: 'power2.out' }, 0)
      .set(canvas, { opacity: 1 })
      .to(camera.position, { duration: 4, ease: 'power3.inOut', z: 7, y: 0, x: 0 }, 1)

    nav.addEventListener('mouseenter', () => {
      gsap.to(material.uniforms.u_factor, { value: 1.0 });
    });

    nav.addEventListener('mouseleave', () => {
      gsap.to(material.uniforms.u_factor, { value: 0.5 });
    });

    const onWindowResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className='flex-blob' ref={containerRef} style={{ height: '100vh', width: '100%' }}>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <div className="content">
        <div>
            <h1 className='text-p font-shubbak-semi-bold text-3xl flex justify-center items-center' ref={h1Ref}>أهداف هذا الموقع</h1>
        </div>
        <ul className='text-4xl text-center' ref={navRef}>
            <li>
                <div>
                    <span className='text-p text-4xl leading-[1.5] mb-12 ml-[25rem]'>رقمنة المجال الطبي</span>
                </div>
            </li>
            <li>
                <div>
                    <span className='text-p text-4xl leading-[1.5] mb-12 ml-[-15rem]'>مساعدة المرضى على تلقي العلاج اللازم</span>
                </div>
            </li>
            <li>
                <div>
                    <span className='text-p text-4xl leading-[1.5] ml-[12rem]'>حل أزمة البحث عن الأدوية النادرة</span>
                </div>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default THREEScene;
