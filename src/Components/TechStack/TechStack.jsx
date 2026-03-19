import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
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
    description: 'Komponen interaktif, stateful UI, dan fondasi utama untuk web app yang dinamis.',
  },
  {
    name: 'Next.js',
    icon: '/tech/nextdotjs.svg',
    short: 'NX',
    color: '#f8fafc',
    label: 'Full-stack web',
    description: 'Routing, SSR, dan struktur aplikasi modern saat butuh performa sekaligus DX yang rapi.',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodedotjs.svg',
    short: 'ND',
    color: '#4ade80',
    label: 'Runtime backend',
    description: 'API, automation, dan service layer yang cepat untuk prototyping sampai production workflows.',
  },
  {
    name: 'GitHub',
    icon: '/tech/github.svg',
    short: 'GH',
    color: '#c084fc',
    label: 'Version control',
    description: 'Kolaborasi, source control, dan deployment flow yang terhubung langsung ke project lifecycle.',
  },
  {
    name: 'Express',
    icon: '/tech/express.svg',
    short: 'EX',
    color: '#38bdf8',
    label: 'API layer',
    description: 'Backend ringan untuk REST endpoints, middleware, dan integrasi service yang fleksibel.',
  },
  {
    name: 'MongoDB',
    icon: '/tech/mongodb.svg',
    short: 'MG',
    color: '#34d399',
    label: 'NoSQL database',
    description: 'Schema fleksibel untuk produk yang berkembang cepat dan butuh iterasi data tanpa friction besar.',
  },
  {
    name: 'Laravel',
    icon: '/tech/laravel.svg',
    short: 'LV',
    color: '#fb7185',
    label: 'PHP framework',
    description: 'Cocok untuk aplikasi dengan struktur backend yang jelas, auth, ORM, dan workflow yang matang.',
  },
  {
    name: 'MySQL',
    icon: '/tech/mysql.svg',
    short: 'MY',
    color: '#60a5fa',
    label: 'Relational data',
    description: 'Pilihan saat relasi data, query yang solid, dan kestabilan storage jadi prioritas utama.',
  },
  {
    name: 'TensorFlow',
    icon: '/tech/tensorflow.svg',
    short: 'TF',
    color: '#fb923c',
    label: 'Machine learning',
    description: 'Dipakai untuk eksplorasi model, training pipeline, dan eksperimen AI yang lebih terstruktur.',
  },
  {
    name: 'PyTorch',
    icon: '/tech/pytorch.svg',
    short: 'PT',
    color: '#f97316',
    label: 'Deep learning',
    description: 'Lebih nyaman untuk riset, eksperimen model, dan iterasi cepat saat mencoba ide computer vision atau NLP.',
  },
  {
    name: 'Flutter',
    icon: '/tech/flutter.svg',
    short: 'FL',
    color: '#22d3ee',
    label: 'Cross-platform app',
    description: 'Saat satu codebase perlu melayani mobile UI yang konsisten dengan delivery yang efisien.',
  },
  {
    name: 'Kotlin',
    icon: '/tech/kotlin.svg',
    short: 'KT',
    color: '#a78bfa',
    label: 'Android native',
    description: 'Untuk Android development yang lebih native, aman, dan enak dipakai membangun fitur yang spesifik.',
  },
  {
    name: 'React',
    icon: '/tech/react.svg',
    short: 'RE',
    color: '#61dafb',
    label: 'Frontend core',
    description: 'Komponen interaktif, stateful UI, dan fondasi utama untuk web app yang dinamis.',
  },
  {
    name: 'Next.js',
    icon: '/tech/nextdotjs.svg',
    short: 'NX',
    color: '#f8fafc',
    label: 'Full-stack web',
    description: 'Routing, SSR, dan struktur aplikasi modern saat butuh performa sekaligus DX yang rapi.',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodedotjs.svg',
    short: 'ND',
    color: '#4ade80',
    label: 'Runtime backend',
    description: 'API, automation, dan service layer yang cepat untuk prototyping sampai production workflows.',
  },
  {
    name: 'GitHub',
    icon: '/tech/github.svg',
    short: 'GH',
    color: '#c084fc',
    label: 'Version control',
    description: 'Kolaborasi, source control, dan deployment flow yang terhubung langsung ke project lifecycle.',
  },
  {
    name: 'Express',
    icon: '/tech/express.svg',
    short: 'EX',
    color: '#38bdf8',
    label: 'API layer',
    description: 'Backend ringan untuk REST endpoints, middleware, dan integrasi service yang fleksibel.',
  },
  {
    name: 'MongoDB',
    icon: '/tech/mongodb.svg',
    short: 'MG',
    color: '#34d399',
    label: 'NoSQL database',
    description: 'Schema fleksibel untuk produk yang berkembang cepat dan butuh iterasi data tanpa friction besar.',
  },
  {
    name: 'Laravel',
    icon: '/tech/laravel.svg',
    short: 'LV',
    color: '#fb7185',
    label: 'PHP framework',
    description: 'Cocok untuk aplikasi dengan struktur backend yang jelas, auth, ORM, dan workflow yang matang.',
  },
  {
    name: 'MySQL',
    icon: '/tech/mysql.svg',
    short: 'MY',
    color: '#60a5fa',
    label: 'Relational data',
    description: 'Pilihan saat relasi data, query yang solid, dan kestabilan storage jadi prioritas utama.',
  },
  {
    name: 'TensorFlow',
    icon: '/tech/tensorflow.svg',
    short: 'TF',
    color: '#fb923c',
    label: 'Machine learning',
    description: 'Dipakai untuk eksplorasi model, training pipeline, dan eksperimen AI yang lebih terstruktur.',
  },
  {
    name: 'PyTorch',
    icon: '/tech/pytorch.svg',
    short: 'PT',
    color: '#f97316',
    label: 'Deep learning',
    description: 'Lebih nyaman untuk riset, eksperimen model, dan iterasi cepat saat mencoba ide computer vision atau NLP.',
  },
  {
    name: 'Flutter',
    icon: '/tech/flutter.svg',
    short: 'FL',
    color: '#22d3ee',
    label: 'Cross-platform app',
    description: 'Saat satu codebase perlu melayani mobile UI yang konsisten dengan delivery yang efisien.',
  },
  {
    name: 'Kotlin',
    icon: '/tech/kotlin.svg',
    short: 'KT',
    color: '#a78bfa',
    label: 'Android native',
    description: 'Untuk Android development yang lebih native, aman, dan enak dipakai membangun fitur yang spesifik.',
  }
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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="relative isolate h-full w-full px-2 sm:px-4 overflow-visible flex flex-col justify-center gap-10 lg:block"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_34%,rgba(56,189,248,0.16),transparent_38%),radial-gradient(circle_at_88%_62%,rgba(251,191,36,0.12),transparent_42%),linear-gradient(160deg,#02040b_0%,#020617_48%,#02030a_100%)]" />

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
            {hoveredSkill ? hoveredSkill.name : 'Arahkan cursor ke keyboard'}
          </h3>

          <p className="mt-5 max-w-sm text-base leading-8 text-slate-300 sm:text-lg lg:mt-3 lg:max-w-[17rem] lg:text-[1rem] lg:leading-6">
            {hoveredSkill
              ? hoveredSkill.description
              : 'Keyboard berisi 24 skill dalam grid 4 x 6 dengan profil keycap tinggi, material matte, dan sudut sinematik seperti setup mechanical keyboard.'}
          </p>

        </motion.article>
      </div>

      <div className="relative z-10 w-full lg:ml-auto lg:w-[76%] h-[420px] sm:h-[500px] lg:h-full overflow-visible">
        <Canvas
          dpr={[1, 1.35]}
          shadows
          camera={{ position: [8.9, 2.55, 5.0], fov: 31 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
          onPointerMissed={() => setHoveredSkill(null)}
        >
          <fog attach="fog" args={['#01040c', 7.4, 17]} />
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
  );
};

export default TechStack;