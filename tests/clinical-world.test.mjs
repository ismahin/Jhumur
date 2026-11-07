import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { buildClinicalWorld, createClinicalCamera } from "../app/components/clinical-world.ts";

function world() { return buildClinicalWorld({ chart: new THREE.Texture(), monitor: new THREE.Texture() }); }
const state = (overrides = {}) => ({ mode: "vision", row: 0, playing: true, reducedMotion: false, replay: 0, ...overrides });

test("both complete care scenes fit within a finite, compact world", () => {
  const instance = world();
  for (const mode of ["vision", "bp"]) {
    instance.update(0, state({ mode }));
    const group = mode === "vision" ? instance.vision : instance.bp;
    const bounds = new THREE.Box3().setFromObject(group);
    const size = bounds.getSize(new THREE.Vector3());
    assert.ok([size.x, size.y, size.z].every(value => Number.isFinite(value) && value > 0));
    assert.ok(size.x < 6 && size.y < 4 && size.z < 4, `${mode} scene exceeds the camera's intended composition`);
    assert.equal(instance.vision.visible, mode === "vision");
    assert.equal(instance.bp.visible, mode === "bp");
  }
  instance.dispose();
});

test("row selection and continuous animation never produce invalid transforms", () => {
  const instance = world();
  for (const mode of ["vision", "bp"]) {
    for (const row of [-1, 0, 2, 4, 8, NaN]) {
      for (const seconds of [0, .016, 1, 3.5, 9, 100]) {
        instance.update(seconds, state({ mode, row }));
        instance.root.updateMatrixWorld(true);
        instance.root.traverse(object => assert.ok(object.matrixWorld.elements.every(Number.isFinite), `Invalid transform: ${object.name}`));
      }
    }
  }
  instance.dispose();
});

test("a reduced motion preference holds character and equipment poses still", () => {
  const instance = world();
  const snapshot = () => {
    instance.root.updateMatrixWorld(true);
    const matrices = [];
    instance.root.traverse(object => matrices.push(...object.matrixWorld.elements));
    return matrices;
  };
  instance.update(0, state({ mode: "bp", row: 3, reducedMotion: true }));
  const before = snapshot();
  instance.update(10, state({ mode: "bp", row: 3, reducedMotion: true }));
  assert.deepEqual(snapshot(), before);
  instance.dispose();
});

test("cleanup disposes every geometry exactly once", () => {
  const instance = world();
  const counts = new Map();
  instance.root.traverse(object => {
    if (object instanceof THREE.Mesh) {
      const geometry = object.geometry;
      if (!counts.has(geometry)) {
        counts.set(geometry, 0);
        geometry.addEventListener("dispose", () => counts.set(geometry, counts.get(geometry) + 1));
      }
    }
  });
  instance.dispose();
  assert.ok(counts.size > 0);
  assert.ok([...counts.values()].every(count => count === 1));
});

test("BP animation keeps small rounded details smaller than a patient's head", () => {
  const instance = world();
  try {
    for (let frame = 0; frame <= 240; frame++) {
      instance.update(frame / 20, state({ mode: "bp" }));
      instance.root.updateMatrixWorld(true);
      instance.bp.traverse(object => {
        if (object instanceof THREE.Mesh && object.geometry instanceof THREE.SphereGeometry) {
          const size = new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3());
          assert.ok(Math.max(size.x, size.y, size.z) < .8, `Oversized rounded detail at ${frame / 20}s: ${object.name || object.type}`);
        }
      });
    }
  } finally { instance.dispose(); }
});

test("the BP cuff follows the upper arm and the patient's palm stays over its support", () => {
  const instance = world();
  try {
    for (const seconds of [0, 1.5, 3.5, 8, 12]) {
      instance.update(seconds, state({ mode: "bp" }));
      instance.root.updateMatrixWorld(true);
      const arm = instance.bp.getObjectByName("Patient upper arm");
      const cuff = instance.bp.getObjectByName("Blood pressure upper arm cuff");
      const hand = instance.bp.getObjectByName("Supported patient hand");
      const support = instance.bp.getObjectByName("Patient arm support");
      assert.ok(arm && cuff && hand && support);
      assert.ok(arm.getWorldPosition(new THREE.Vector3()).distanceTo(cuff.getWorldPosition(new THREE.Vector3())) < .001);
      const handBounds = new THREE.Box3().setFromObject(hand);
      const supportBounds = new THREE.Box3().setFromObject(support);
      assert.ok(handBounds.min.y - supportBounds.max.y >= 0 && handBounds.min.y - supportBounds.max.y < .015);
      assert.ok(handBounds.min.x >= supportBounds.min.x && handBounds.max.x <= supportBounds.max.x);
      const cuffSize = new THREE.Box3().setFromObject(cuff, true).getSize(new THREE.Vector3());
      assert.ok(Math.max(cuffSize.x, cuffSize.y, cuffSize.z) < .4);
    }
  } finally { instance.dispose(); }
});

test("patients, equipment, and charts stay inside phone and desktop camera frames", () => {
  const instance = world();
  for (const aspect of [250 / 280, 320 / 280, 390 / 280, 640 / 360]) {
    const camera = createClinicalCamera(aspect);
    camera.updateMatrixWorld(true);
    for (const mode of ["vision", "bp"]) {
      for (const rotation of [-.1, 0, .1]) {
        instance.root.rotation.y = rotation;
        instance.update(3.5, state({ mode, row: 4 }));
        instance.root.updateMatrixWorld(true);
        const group = mode === "vision" ? instance.vision : instance.bp;
        const bounds = new THREE.Box3().setFromObject(group);
        for (const x of [bounds.min.x, bounds.max.x]) {
          for (const y of [bounds.min.y, bounds.max.y]) {
            for (const z of [bounds.min.z, bounds.max.z]) {
              const projected = new THREE.Vector3(x, y, z).project(camera);
              assert.ok(Math.abs(projected.x) <= 1 && Math.abs(projected.y) <= 1, `${mode} scene clips at aspect ${aspect}`);
            }
          }
        }
      }
    }
  }
  instance.dispose();
});
