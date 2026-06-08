import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import ScrollLineDivider from '../SectionDivider/ScrollLineDivider';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, RoundedBox, Text, useTexture } from '@react-three/drei';

const techKeys = [
  {
    name: 'React',
    icon: '/tech/react.svg',
    short: 'RE',
    color: '#61dafb',
    label: 'Frontend core',
    description: 'Builds interactive and dynamic user interfaces with a component-based architecture.',
  },
  {
    name: 'Next.js',
    icon: '/tech/nextdotjs.svg',
    short: 'NX',
    color: '#f8fafc',
    label: 'Full-stack web',
    description: 'Provides routing, server-side rendering, and modern tooling for scalable web applications.',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodedotjs.svg',
    short: 'ND',
    color: '#4ade80',
    label: 'Runtime backend',
    description: 'Powers fast and scalable backend services, APIs, and automation workflows.',
  },
  {
    name: 'GitHub',
    icon: '/tech/github.svg',
    short: 'GH',
    color: '#c084fc',
    label: 'Collaboration',
    description: 'Enables version control, team collaboration, and streamlined development workflows.',
  },
  {
    name: 'Express',
    icon: '/tech/express.svg',
    short: 'EX',
    color: '#38bdf8',
    label: 'API framework',
    description: 'Lightweight framework for building RESTful APIs and backend services.',
  },
  {
    name: 'MongoDB',
    icon: '/tech/mongodb.svg',
    short: 'MG',
    color: '#34d399',
    label: 'NoSQL database',
    description: 'Flexible document database designed for rapid development and evolving data structures.',
  },
  {
    name: 'Laravel',
    icon: '/tech/laravel.svg',
    short: 'LV',
    color: '#fb7185',
    label: 'PHP framework',
    description: 'Robust framework for building secure and maintainable web applications.',
  },
  {
    name: 'MySQL',
    icon: '/tech/mysql.svg',
    short: 'MY',
    color: '#60a5fa',
    label: 'SQL database',
    description: 'Reliable relational database for structured data and complex queries.',
  },
  {
    name: 'TensorFlow',
    icon: '/tech/tensorflow.svg',
    short: 'TF',
    color: '#fb923c',
    label: 'Machine learning',
    description: 'Framework for developing, training, and deploying machine learning models.',
  },
  {
    name: 'PyTorch',
    icon: '/tech/pytorch.svg',
    short: 'PT',
    color: '#f97316',
    label: 'Deep learning',
    description: 'Popular deep learning framework for research, experimentation, and production AI.',
  },
  {
    name: 'Flutter',
    icon: '/tech/flutter.svg',
    short: 'FL',
    color: '#22d3ee',
    label: 'Cross-platform mobile',
    description: 'Builds high-performance mobile applications from a single codebase.',
  },
  {
    name: 'Kotlin',
    icon: '/tech/kotlin.svg',
    short: 'KT',
    color: '#a78bfa',
    label: 'Android development',
    description: 'Modern programming language for creating native Android applications.',
  },
  {
    name: 'TypeScript',
    icon: '/tech/typescript.svg',
    short: 'TS',
    color: '#3178c6',
    label: 'Typed JavaScript',
    description: 'Enhances JavaScript with static typing for safer and more maintainable code.',
  },
  {
    name: 'Tailwind CSS',
    icon: '/tech/tailwindcss.svg',
    short: 'TW',
    color: '#06b6d4',
    label: 'CSS framework',
    description: 'Utility-first framework for building responsive and modern user interfaces.',
  },
  {
    name: 'Python',
    icon: '/tech/python.svg',
    short: 'PY',
    color: '#facc15',
    label: 'Programming language',
    description: 'Versatile language widely used for automation, data science, AI, and backend development.',
  },
  {
    name: 'PostgreSQL',
    icon: '/tech/postgresql.svg',
    short: 'PG',
    color: '#3b82f6',
    label: 'Relational database',
    description: 'Advanced SQL database known for reliability, scalability, and performance.',
  },
  {
    name: 'Docker',
    icon: '/tech/docker.svg',
    short: 'DK',
    color: '#0ea5e9',
    label: 'Containerization',
    description: 'Packages applications into portable containers for consistent deployment.',
  },
  {
    name: 'Vue.js',
    icon: '/tech/vue.svg',
    short: 'VU',
    color: '#42b883',
    label: 'Frontend framework',
    description: 'Progressive JavaScript framework for building modern and reactive interfaces.',
  },
  {
    name: 'Vercel',
    icon: '/tech/vercel.svg',
    short: 'VC',
    color: '#ffffff',
    label: 'Deployment platform',
    description: 'Optimized platform for deploying frontend and full-stack web applications.',
  },
  {
    name: 'OpenCV',
    icon: '/tech/opencv.svg',
    short: 'CV',
    color: '#ef4444',
    label: 'Computer vision',
    description: 'Open-source library for image processing and computer vision applications.',
  },
  {
    name: 'Scikit-Learn',
    icon: '/tech/python.svg',
    short: 'SK',
    color: '#f97316',
    label: 'Machine learning',
    description: 'Comprehensive toolkit for classical machine learning and data analysis.',
  },
  {
    name: 'OpenAI',
    icon: '/tech/openai.svg',
    short: 'LX',
    color: '#eab308',
    label: 'AI services',
    description: 'Provides powerful AI models and APIs for natural language processing, computer vision, and more.',
  },
  {
    name: 'Github',
    icon: '/tech/github.svg',
    short: 'GT',
    color: '#f97316',
    label: 'Version control',
    description: 'Tracks code changes and supports efficient collaboration across development teams.',
  },
  {
    name: 'FastAPI',
    icon: '/tech/fastapi.svg',
    short: 'FA',
    color: '#14b8a6',
    label: 'Python backend',
    description: 'High-performance framework for building modern APIs with Python.',
  },
].map((skill, index) => {
  const columns = 4;
  const rows = 6;
  const row = Math.floor(index / columns);
  const col = index % columns;
  const xSpacing = 1.03;
  const ySpacing = 0.88;
  const rowOffsets = [0.21, 0.13, 0.05, -0.04, -0.13, -0.23];
  const variation = ((index * 37) % 100) / 100;
  const signedVariation = (((index * 53) % 100) / 100) - 0.5;
  const zVariation = (((index * 71) % 100) / 100) - 0.5;

  return {
    ...skill,
    position: [
      (col - 1.5) * xSpacing + rowOffsets[row],
      ((rows - 1) / 2 - row) * ySpacing,
      0,
    ],
    restHeight: 0.042 + variation * 0.014,
    hoverDepth: -0.062 - variation * 0.008,
    tilt: [
      signedVariation * 0.028,
      signedVariation * 0.017,
      zVariation * 0.012,
    ],
    iconSize: 0.34 + variation * 0.04,
  };
});

const damp = (current, target, delta, speed = 8) => (
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta))
);

const Keycap = ({ skill, isSelected, isHovered, onHoverChange }) => {
  const groupRef = useRef(null);
  const capBodyMaterialRef = useRef(null);
  const capTopMaterialRef = useRef(null);
  const housingMaterialRef = useRef(null);
  const texture = useTexture(skill.icon || '/tech/github.svg');
  const topColor = useMemo(() => new THREE.Color(skill.color), [skill.color]);
  const bodyColor = useMemo(() => {
    const base = new THREE.Color(skill.color);
    return base.lerp(new THREE.Color('#0b1220'), 0.36);
  }, [skill.color]);
  const handleHoverStart = (event) => {
    event.stopPropagation();
    onHoverChange(skill);
  };

  const handleHoverEnd = (event) => {
    event.stopPropagation();
    onHoverChange(null);
  };

  useEffect(() => {
    if (skill.icon) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [skill.icon, texture]);

  useFrame((_, delta) => {
    if (
      !groupRef.current
      || !capBodyMaterialRef.current
      || !capTopMaterialRef.current
      || !housingMaterialRef.current
    ) {
      return;
    }

    const targetDepth = isHovered ? skill.hoverDepth : skill.restHeight;
    const targetRotationX = isHovered ? skill.tilt[0] * 0.22 : skill.tilt[0];
    const targetRotationY = isHovered ? skill.tilt[1] * 0.22 : skill.tilt[1];
    const targetRotationZ = isHovered ? skill.tilt[2] * 0.12 : skill.tilt[2];
    const targetGlow = isHovered ? 0.24 : isSelected ? 0.14 : 0.06;
    const targetBodyGlow = isHovered ? 0.18 : isSelected ? 0.1 : 0.04;
    const targetHousingGlow = isHovered ? 0.06 : 0.025;

    groupRef.current.position.z = damp(groupRef.current.position.z, targetDepth, delta, 12);
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, targetRotationX, delta, 10);
    groupRef.current.rotation.y = damp(groupRef.current.rotation.y, targetRotationY, delta, 10);
    groupRef.current.rotation.z = damp(groupRef.current.rotation.z, targetRotationZ, delta, 10);

    capTopMaterialRef.current.emissiveIntensity = damp(
      capTopMaterialRef.current.emissiveIntensity,
      targetGlow,
      delta,
      8,
    );
    capBodyMaterialRef.current.emissiveIntensity = damp(
      capBodyMaterialRef.current.emissiveIntensity,
      targetBodyGlow,
      delta,
      8,
    );
    housingMaterialRef.current.emissiveIntensity = damp(
      housingMaterialRef.current.emissiveIntensity,
      targetHousingGlow,
      delta,
      8,
    );

  });

  return (
    <group ref={groupRef} position={skill.position}>
      <RoundedBox
        args={[1.0, 1.0, 0.24]}
        radius={0.105}
        smoothness={6}
        position={[0, 0, -0.18]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={housingMaterialRef}
          color="#050a14"
          emissive="#02060f"
          emissiveIntensity={0.025}
          metalness={0.06}
          roughness={0.9}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.86, 0.86, 0.44]}
        radius={0.125}
        smoothness={8}
        position={[0, 0, 0.1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={capBodyMaterialRef}
          color={bodyColor}
          emissive={bodyColor}
          emissiveIntensity={0.04}
          metalness={0.04}
          roughness={0.76}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.72, 0.72, 0.22]}
        radius={0.09}
        smoothness={10}
        position={[0, 0, 0.34]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={capTopMaterialRef}
          color={topColor}
          emissive={topColor}
          emissiveIntensity={0.06}
          metalness={0.03}
          roughness={0.62}
        />
      </RoundedBox>

      <mesh
        position={[0, 0, 0.2]}
        onPointerOver={handleHoverStart}
        onPointerMove={handleHoverStart}
        onPointerOut={handleHoverEnd}
      >
        <boxGeometry args={[0.8, 0.8, 0.88]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {skill.icon ? (
        <mesh
          position={[0, 0, 0.47]}
          rotation={[-0.08, 0.01, skill.tilt[2] * 0.2]}
          renderOrder={10}
          raycast={() => null}
        >
          <planeGeometry args={[skill.iconSize, skill.iconSize]} />
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
            side={THREE.DoubleSide}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      ) : (
        <Text
          position={[0, 0, 0.48]}
          fontSize={0.148}
          maxWidth={0.72}
          color="#f9fafb"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.011}
          outlineColor="#111827"
          depthOffset={-1}
          raycast={() => null}
        >
          {skill.short}
        </Text>
      )}
    </group>
  );
};

const KeyboardScene = ({ hoveredSkill, onHoverChange }) => {
  const keyboardRef = useRef(null);
  const { viewport } = useThree();
  const keyboardScale = viewport.width < 5.6 ? 0.7 : viewport.width < 7 ? 0.82 : 0.93;

  useFrame((state, delta) => {
    if (!keyboardRef.current) {
      return;
    }

    const baseX = keyboardScale < 0.8 ? 0.46 : 0.44;
    const baseY = keyboardScale < 0.8 ? 0.3 : 0.24;

    const targetRotationX = -1.14 + state.mouse.y * 0.06;
    const targetRotationY = 0.26 + state.mouse.x * 0.09;
    const targetRotationZ = 0.34 - state.mouse.x * 0.025;

    keyboardRef.current.rotation.x = damp(keyboardRef.current.rotation.x, targetRotationX, delta, 4);
    keyboardRef.current.rotation.y = damp(keyboardRef.current.rotation.y, targetRotationY, delta, 4);
    keyboardRef.current.rotation.z = damp(keyboardRef.current.rotation.z, targetRotationZ, delta, 4);
    keyboardRef.current.position.x = damp(keyboardRef.current.position.x, baseX + state.mouse.x * 0.12, delta, 3);
    keyboardRef.current.position.y = damp(keyboardRef.current.position.y, baseY + state.mouse.y * 0.06, delta, 3);
  });

  return (
    <group ref={keyboardRef} scale={keyboardScale}>
      <RoundedBox
        args={[5.08, 6.34, 0.42]}
        radius={0.2}
        smoothness={10}
        position={[0, 0, -0.36]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#060b16"
          metalness={0.08}
          roughness={0.92}
          emissive="#030712"
          emissiveIntensity={0.03}
        />
      </RoundedBox>

      <RoundedBox
        args={[4.62, 5.78, 0.16]}
        radius={0.1}
        smoothness={8}
        position={[0, 0, -0.12]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#040914"
          emissive="#020617"
          emissiveIntensity={0.02}
          metalness={0.04}
          roughness={0.94}
        />
      </RoundedBox>

      {techKeys.map((skill, index) => (
        <Keycap
          key={`${skill.name}-${index}`}
          skill={skill}
          isSelected={hoveredSkill?.name === skill.name}
          isHovered={hoveredSkill?.name === skill.name}
          onHoverChange={onHoverChange}
        />
      ))}
    </group>
  );
};

const TechStack = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <>
      <ScrollLineDivider />

      <div id="tech-stack" className="bg-[#101117]">
        <header className=" pt-16 text-center ">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
            Skills &amp; Tools
          </p>
          <h2 className="text-[clamp(2.3rem,7vw,6.2rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#e8e0c2]">
            Tech Stack
          </h2>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative isolate h-screen w-full px-2 sm:px-4 overflow-visible flex flex-col justify-center gap-10 lg:block"
        >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#101117]" />

      <div className="relative z-20 w-full max-w-xl select-text lg:absolute lg:left-[10%] lg:top-1/2 lg:w-[24%] lg:max-w-none lg:-translate-y-1/2 lg:[transform:translateY(-50%)_perspective(1400px)_rotateY(28deg)_rotateX(8deg)_skewY(-6deg)_scaleY(0.9)] lg:origin-left">
        <motion.article
          key={hoveredSkill?.name ?? 'default-copy'}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="min-h-[230px] max-w-md lg:max-w-[20rem]"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/80 lg:text-[0.72rem] lg:tracking-[0.55em]">
            {hoveredSkill ? hoveredSkill.label : 'Hint'}
          </p>

          <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl lg:mt-3 lg:text-[3.4rem] lg:leading-[0.94]">
            {hoveredSkill ? hoveredSkill.name : 'Hover over a keycap to see details!'}
          </h3>

          <p className="mt-5 max-w-sm text-base leading-8 text-slate-300 sm:text-lg lg:mt-3 lg:max-w-[17rem] lg:text-[1rem] lg:leading-6">
            {hoveredSkill
              ? hoveredSkill.description
              : 'Keycaps represent various technologies I have experience with. Hovering over each keycap reveals the technology name, category, and a brief description of its role in my skill set.'}
          </p>

        </motion.article>
      </div>

      <div className="relative z-10 w-full lg:ml-auto lg:w-[76%] h-[420px] sm:h-[500px] lg:h-full overflow-visible">
        <Canvas
          dpr={[1, 1.35]}
          shadows
          camera={{ position: [8.9, 4.2, 5.8], fov: 36 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
          onPointerMissed={() => setHoveredSkill(null)}
        >
          <fog attach="fog" args={['#101117', 7.4, 17]} />
          <ambientLight intensity={0.52} />
          <directionalLight
            position={[4.5, 6.5, 5.4]}
            intensity={1.25}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-4.2, 2.8, 2.2]} intensity={0.72} color="#67e8f9" />
          <pointLight position={[4.2, 2.1, 4.4]} intensity={0.5} color="#f59e0b" />
          <pointLight position={[1, 1.4, -3]} intensity={0.2} color="#f8fafc" />

          <Suspense fallback={null}>
            <KeyboardScene hoveredSkill={hoveredSkill} onHoverChange={setHoveredSkill} />
          </Suspense>

          <ContactShadows
            position={[0, -2.95, 0]}
            opacity={0.52}
            scale={14}
            blur={2.4}
            far={4.4}
            color="#020617"
          />
        </Canvas>
      </div>
        </motion.section>
      </div>
    </>
  );
};

export default TechStack;