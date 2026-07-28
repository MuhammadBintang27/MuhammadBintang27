import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import ScrollLineDivider from '../Professional/SectionDivider/ScrollLineDivider';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, RoundedBox, Text, useTexture } from '@react-three/drei';
import { TECH_STACK_BASE, TECH_STACK_COLORS } from '../../data/techStackData';

const buildTechKeys = (theme) => {
  const colors = TECH_STACK_COLORS[theme] || TECH_STACK_COLORS.professional;

  return TECH_STACK_BASE.map((skill, index) => {
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
      color: colors[skill.name],
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
};

const THEME_STYLES = {
  professional: {
    sectionBg: 'bg-[#101117]',
    eyebrow: 'text-cyan-100/62',
    heading: 'text-[#e8e0c2]',
    headingFont: '',
    headingSize: 'text-[clamp(2.3rem,7vw,6.2rem)]',
    hintLabel: 'text-cyan-300/80',
    hintTitle: 'text-white',
    hintBody: 'text-slate-300',
    fog: '#101117',
    contactShadowColor: '#020617',
  },
  playful: {
    sectionBg: 'bg-[#F2E1C4]',
    eyebrow: 'text-[#D68C0A] font-modak tracking-wide',
    heading: 'text-[#E5301E]',
    headingFont: 'font-mouse [-webkit-text-stroke:2px_#FFFDF8] [paint-order:stroke_fill]',
    headingSize: 'text-[clamp(3.2rem,12vw,9rem)]',
    hintLabel: 'text-[#D68C0A]',
    hintTitle: 'text-[#241A12]',
    hintBody: 'text-[#4A3220]',
    fog: '#F2E1C4',
    contactShadowColor: '#3A2A1A',
  },
};

const damp = (current, target, delta, speed = 8) => (
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta))
);

// Same easing as `damp`, but skips the lerp/exp math once a value is already
// within EPS of its target — avoids paying for 7 damp() calls x 24 keycaps
// every frame while the scene is idle (no hover in progress).
const DAMP_EPS = 0.0001;
const dampTo = (current, target, delta, speed = 8) => (
  Math.abs(current - target) < DAMP_EPS ? target : damp(current, target, delta, speed)
);

// `pointer: coarse` = touch-primary input (no real hover), used to switch
// the keycap interaction model from hover to tap-to-select. (An earlier
// version also used hardwareConcurrency to drop shadows/AA/dpr on "low-power"
// devices, but that heuristic misfires on plenty of normal phones and made
// the scene visibly worse — removed; render quality is now the same on
// every device.)
const detectDeviceProfile = () => {
  if (typeof window === 'undefined') return { isTouch: false };
  const isTouch = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  return { isTouch };
};

const Keycap = ({ skill, isSelected, isHovered, onHoverChange, isTouch }) => {
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
  // Touch devices don't get pointerover/pointerout, only a tap. Toggle
  // selection instead of "hovering": tap once to select, tap the same
  // keycap again to deselect.
  const handleTap = (event) => {
    event.stopPropagation();
    onHoverChange(isHovered ? null : skill);
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

    groupRef.current.position.z = dampTo(groupRef.current.position.z, targetDepth, delta, 12);
    groupRef.current.rotation.x = dampTo(groupRef.current.rotation.x, targetRotationX, delta, 10);
    groupRef.current.rotation.y = dampTo(groupRef.current.rotation.y, targetRotationY, delta, 10);
    groupRef.current.rotation.z = dampTo(groupRef.current.rotation.z, targetRotationZ, delta, 10);

    capTopMaterialRef.current.emissiveIntensity = dampTo(
      capTopMaterialRef.current.emissiveIntensity,
      targetGlow,
      delta,
      8,
    );
    capBodyMaterialRef.current.emissiveIntensity = dampTo(
      capBodyMaterialRef.current.emissiveIntensity,
      targetBodyGlow,
      delta,
      8,
    );
    housingMaterialRef.current.emissiveIntensity = dampTo(
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
        smoothness={3}
        position={[0, 0, -0.18]}
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
        smoothness={3}
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
        smoothness={3}
        position={[0, 0, 0.34]}
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
        onPointerOver={isTouch ? undefined : handleHoverStart}
        onPointerMove={isTouch ? undefined : handleHoverStart}
        onPointerOut={isTouch ? undefined : handleHoverEnd}
        onClick={isTouch ? handleTap : undefined}
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

const KeyboardScene = ({ techKeys, hoveredSkill, onHoverChange, isTouch }) => {
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
        smoothness={4}
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
        smoothness={4}
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
          isTouch={isTouch}
        />
      ))}
    </group>
  );
};

const TechStack = ({ theme = 'professional' }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const canvasWrapRef = useRef(null);
  const techKeys = useMemo(() => buildTechKeys(theme), [theme]);
  const styles = THEME_STYLES[theme] || THEME_STYLES.professional;
  // Render the 3D scene only while the section is on screen. Once the user
  // scrolls past it, the WebGL frameloop is fully stopped so it can't steal
  // frames from scroll animations elsewhere on the page.
  const [canvasActive, setCanvasActive] = useState(false);
  // isTouch fires for any coarse-pointer device (all phones/tablets) and
  // switches the keycap interaction model from hover to tap-to-select.
  const [{ isTouch }] = useState(detectDeviceProfile);

  useEffect(() => {
    const node = canvasWrapRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setCanvasActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setCanvasActive(entries.some((entry) => entry.isIntersecting));
      },
      { rootMargin: '160px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {theme === 'professional' && <ScrollLineDivider />}

      <div id="tech-stack" className={styles.sectionBg}>
        {theme === 'playful' ? (
          <header className="pt-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`mb-2 text-xs font-semibold uppercase tracking-[0.24em] ${styles.eyebrow}`}
            >
              Skills &amp; Tools
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -1.5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className={`font-black uppercase leading-[0.9] tracking-[-0.02em] ${styles.headingSize} ${styles.heading} ${styles.headingFont}`}
            >
              Tech Stack
            </motion.h2>
          </header>
        ) : (
          <header className=" pt-16 text-center ">
            <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.24em] ${styles.eyebrow}`}>
              Skills &amp; Tools
            </p>
            <h2 className={`font-black uppercase leading-[0.9] tracking-[-0.02em] ${styles.headingSize} ${styles.heading} ${styles.headingFont}`}>
              Tech Stack
            </h2>
          </header>
        )}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative isolate h-screen w-full px-2 sm:px-4 overflow-visible flex flex-col justify-center gap-10 lg:block"
        >
      <div className={`pointer-events-none absolute inset-0 -z-10 ${styles.sectionBg}`} />

      <div className="relative z-20 w-full max-w-xl select-text lg:absolute lg:left-[10%] lg:top-1/2 lg:w-[24%] lg:max-w-none lg:-translate-y-1/2 lg:[transform:translateY(-50%)_perspective(1400px)_rotateY(28deg)_rotateX(8deg)_skewY(-6deg)_scaleY(0.9)] lg:origin-left">
        <motion.article
          key={hoveredSkill?.name ?? 'default-copy'}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="min-h-[230px] max-w-md lg:max-w-[20rem]"
        >
          <p className={`text-xs uppercase tracking-[0.45em] lg:text-[0.72rem] lg:tracking-[0.55em] ${styles.hintLabel}`}>
            {hoveredSkill ? hoveredSkill.label : 'Hint'}
          </p>

          <h3 className={`mt-4 text-3xl font-semibold sm:text-4xl lg:mt-3 lg:text-[3.4rem] lg:leading-[0.94] ${styles.hintTitle}`}>
            {hoveredSkill ? hoveredSkill.name : (isTouch ? 'Tap a keycap to see details!' : 'Hover over a keycap to see details!')}
          </h3>

          <p className={`mt-5 max-w-sm text-base leading-8 sm:text-lg lg:mt-3 lg:max-w-[17rem] lg:text-[1rem] lg:leading-6 ${styles.hintBody}`}>
            {hoveredSkill
              ? hoveredSkill.description
              : (isTouch
                ? 'Keycaps represent various technologies I have experience with. Tap a keycap to reveal the technology name, category, and a brief description of its role in my skill set.'
                : 'Keycaps represent various technologies I have experience with. Hovering over each keycap reveals the technology name, category, and a brief description of its role in my skill set.')}
          </p>

        </motion.article>
      </div>

      <div ref={canvasWrapRef} className="relative z-10 w-full lg:ml-auto lg:w-[76%] h-[420px] sm:h-[500px] lg:h-full overflow-visible">
        <Canvas
          dpr={[1, 1.35]}
          shadows
          frameloop={canvasActive ? 'always' : 'never'}
          camera={{ position: [8.9, 4.2, 5.8], fov: 36 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
          onPointerMissed={() => setHoveredSkill(null)}
        >
          {theme !== 'playful' && <fog attach="fog" args={[styles.fog, 7.4, 17]} />}
          <ambientLight intensity={0.52} />
          <directionalLight
            position={[4.5, 6.5, 5.4]}
            intensity={1.25}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
          <pointLight position={[-4.2, 2.8, 2.2]} intensity={0.72} color="#67e8f9" />
          <pointLight position={[4.2, 2.1, 4.4]} intensity={0.5} color="#f59e0b" />
          <pointLight position={[1, 1.4, -3]} intensity={0.2} color="#f8fafc" />

          <Suspense fallback={null}>
            <KeyboardScene techKeys={techKeys} hoveredSkill={hoveredSkill} onHoverChange={setHoveredSkill} isTouch={isTouch} />
          </Suspense>

          <ContactShadows
            position={theme === 'playful' ? [0.3, -2.5, 0] : [0, -2.95, 0]}
            opacity={theme === 'playful' ? 0.42 : 0.52}
            scale={theme === 'playful' ? 8 : 14}
            blur={theme === 'playful' ? 1.5 : 2.4}
            resolution={theme === 'playful' ? 1024 : 512}
            far={4.4}
            frames={1}
            color={styles.contactShadowColor}
          />
        </Canvas>
      </div>
        </motion.section>
      </div>
    </>
  );
};

export default TechStack;