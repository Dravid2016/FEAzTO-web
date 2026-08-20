import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF, useTexture, Environment } from '@react-three/drei';
import {
  BallCollider, CuboidCollider, Physics,
  RigidBody, useRopeJoint, useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

/* ── Band (rope physics) ──────────────────────────────────── */
function Band({ lanyardWidth = 0.3 }: { lanyardWidth?: number }) {
  const bandRef  = useRef<any>(null);
  const fixed    = useRef<any>(null);
  const j1       = useRef<any>(null);
  const j2       = useRef<any>(null);
  const j3       = useRef<any>(null);
  const card     = useRef<any>(null);

  const [curve]    = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(),
    new THREE.Vector3(), new THREE.Vector3(),
  ]));
  const [dragging, setDragging] = useState<THREE.Vector3 | false>(false);
  const [hovered,  setHovered]  = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1,    j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2,    j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    document.body.style.cursor = hovered ? (dragging ? 'grabbing' : 'grab') : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered, dragging]);

  const { nodes, materials } = useGLTF('/card.glb') as any;
  const lanyardTex = useTexture('/lanyard.png');
  lanyardTex.wrapS = lanyardTex.wrapT = THREE.RepeatWrapping;

  useFrame((state) => {
    if (dragging && card.current) {
      const v = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera)
        .sub(state.camera.position).normalize();
      const dist = state.camera.position.length() / Math.abs(v.z || 1);
      v.multiplyScalar(dist).add(state.camera.position);
      card.current.setNextKinematicTranslation({
        x: v.x - (dragging as THREE.Vector3).x,
        y: v.y - (dragging as THREE.Vector3).y,
        z: v.z - (dragging as THREE.Vector3).z,
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && bandRef.current) {
      [j1, j2].forEach(r => {
        if (!r.current.lerped)
          r.current.lerped = new THREE.Vector3().copy(r.current.translation());
        r.current.lerped.lerp(r.current.translation(), 0.1);
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      bandRef.current.geometry.setPoints(curve.getPoints(32));

      if (card.current) {
        const ang = card.current.angvel();
        const rot = card.current.rotation();
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <RigidBody ref={fixed} type="fixed" angularDamping={2} linearDamping={2} />
      <RigidBody ref={j1} position={[0.5, 0, 0]} angularDamping={2} linearDamping={2}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j2} position={[1, 0, 0]} angularDamping={2} linearDamping={2}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j3} position={[1.5, 0, 0]} angularDamping={2} linearDamping={2}>
        <BallCollider args={[0.1]} />
      </RigidBody>

      <RigidBody
        ref={card}
        position={[2, 0, 0]}
        type={dragging ? 'kinematicPosition' : 'dynamic'}
        angularDamping={2}
        linearDamping={2}
      >
        <CuboidCollider args={[0.45, 0.6, 0.01]} />
        <group
          scale={2.25}
          position={[0, -0.1, 0.095]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerUp={e => {
            (e.target as any).releasePointerCapture(e.pointerId);
            setDragging(false);
          }}
          onPointerDown={e => {
            (e.target as any).setPointerCapture(e.pointerId);
            const t = card.current.translation();
            setDragging(
              new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(t.x, t.y, t.z))
            );
          }}
        >
          <mesh geometry={nodes.card.geometry}>
            <meshPhysicalMaterial
              map={materials.base?.map}
              map-anisotropy={16}
              clearcoat={1}
              clearcoatRoughness={0.15}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
          {nodes.clip  && <mesh geometry={nodes.clip.geometry}  material={materials.metal} />}
          {nodes.clamp && <mesh geometry={nodes.clamp.geometry} material={materials.metal} />}
        </group>
      </RigidBody>

      {/* Lanyard band */}
      <mesh ref={bandRef}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1024, 1024]}
          useMap={1}
          map={lanyardTex}
          repeat={[-3, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

/* ── Exported component ───────────────────────────────────── */
interface LanyardProps {
  position?:    [number, number, number];
  gravity?:     [number, number, number];
  fov?:         number;
  transparent?: boolean;
  lanyardWidth?:number;
}

export default function Lanyard({
  position    = [0, 0, 20],
  gravity     = [0, -40, 0],
  fov         = 20,
  transparent = true,
  lanyardWidth = 0.3,
}: LanyardProps) {
  return (
    <Canvas
      camera={{ position, fov }}
      gl={{ alpha: transparent, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics
        interpolate
        gravity={gravity}
        timeStep={1 / 60}
      >
        <Band lanyardWidth={lanyardWidth} />
      </Physics>
      <Environment preset="city" />
    </Canvas>
  );
}

useGLTF.preload('/card.glb');
