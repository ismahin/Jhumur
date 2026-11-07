import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type ClinicalMode = "vision" | "bp";
export interface ClinicalState {
  mode: ClinicalMode;
  row: number;
  playing: boolean;
  reducedMotion: boolean;
  replay: number;
}
export const chartRows = ["E", "F P", "T O Z", "L P E D", "P E C F D"];
const rowHeights = [2.64, 2.18, 1.84, 1.57, 1.34];
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export function fitClinicalCamera(camera: THREE.OrthographicCamera, aspect: number) {
  const safeAspect = Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
  const vertical = Math.max(3.9, 5.2 / safeAspect);
  camera.left = -vertical * safeAspect / 2;
  camera.right = vertical * safeAspect / 2;
  camera.top = vertical / 2;
  camera.bottom = -vertical / 2;
  camera.updateProjectionMatrix();
}

export function createClinicalCamera(aspect = 1) {
  const camera = new THREE.OrthographicCamera(-3, 3, 2, -2, .1, 40);
  camera.position.set(3.2, 3.0, 7.5);
  camera.lookAt(0, 1.4, 0);
  fitClinicalCamera(camera, aspect);
  return camera;
}

export function buildClinicalWorld(textures: { chart: THREE.Texture; monitor: THREE.Texture }) {
  const root = new THREE.Group();
  root.name = "Everyday patient care";
  const vision = new THREE.Group();
  vision.name = "Eye chart testing";
  const bp = new THREE.Group();
  bp.name = "Blood pressure check";
  root.add(vision, bp);
  const materials = new Map<string, THREE.MeshStandardMaterial>();
  const material = (color: string) => {
    if (!materials.has(color)) materials.set(color, new THREE.MeshStandardMaterial({ color, roughness: .72, metalness: 0 }));
    return materials.get(color)!;
  };
  function mesh(parent: THREE.Group, geometry: THREE.BufferGeometry, color: string, position: THREE.Vector3) {
    const object = new THREE.Mesh(geometry, material(color));
    object.position.copy(position);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(parent: THREE.Group, size: [number, number, number], color: string, position: THREE.Vector3, radius = .06) {
    return mesh(parent, new RoundedBoxGeometry(...size, 3, Math.min(radius, Math.min(...size) / 2)), color, position);
  }
  function sphere(parent: THREE.Group, size: [number, number, number], color: string, position: THREE.Vector3) {
    const object = mesh(parent, new THREE.SphereGeometry(1, 24, 16), color, position);
    object.scale.set(...size);
    return object;
  }
  function rod(parent: THREE.Group, color: string, radius = .05) {
    const object = mesh(parent, new THREE.CylinderGeometry(1, 1, 1, 16), color, v(0, 0, 0));
    object.userData.radius = radius;
    return object;
  }
  function connect(object: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3) {
    const direction = end.clone().sub(start);
    object.position.copy(start).add(end).multiplyScalar(.5);
    object.quaternion.setFromUnitVectors(v(0, 1, 0), direction.clone().normalize());
    object.scale.set(object.userData.radius, Math.max(direction.length(), .001), object.userData.radius);
  }
  function tube(parent: THREE.Group, points: THREE.Vector3[], radius: number, color: string) {
    return mesh(parent, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 32, radius, 8, false), color, v(0, 0, 0));
  }
  function heart(parent: THREE.Group, position: THREE.Vector3, size: number) {
    const shape = new THREE.Shape();
    shape.moveTo(0, .1);
    shape.bezierCurveTo(-.45, .65, -.85, -.05, 0, -.6);
    shape.bezierCurveTo(.85, -.05, .45, .65, 0, .1);
    const object = mesh(parent, new THREE.ExtrudeGeometry(shape, { depth: .13, bevelEnabled: true, bevelSize: .045, bevelThickness: .045, bevelSegments: 3, steps: 1, curveSegments: 16 }), "#ce4e88", position);
    object.scale.setScalar(size);
    return object;
  }
  function person(parent: THREE.Group, x: number, z: number, seated = false, clinician = true) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    parent.add(group);
    const offset = seated ? -.2 : 0;
    const skin = clinician ? "#d8a17d" : "#bd8e79";
    const clothing = clinician ? "#cd7a9e" : "#b29bc7";
    const hair = clinician ? "#4a302c" : "#62463c";
    box(group, [.62, .78, .4], clothing, v(0, 1.3 + offset, 0), .12);
    sphere(group, [.1, .14, .1], skin, v(0, 1.77 + offset, .02));
    sphere(group, [.33, .37, .22], hair, v(0, 2.08 + offset, -.12));
    sphere(group, [.285, .32, .265], skin, v(0, 2.08 + offset, .065));
    sphere(group, [.22, .11, .15], hair, v(-.09, 2.34 + offset, .13)).rotation.z = -.2;
    if (clinician) {
      sphere(group, [.075, .27, .11], hair, v(-.265, 1.97 + offset, -.01));
      sphere(group, [.075, .27, .11], hair, v(.265, 1.97 + offset, -.01));
      const collarLeft = box(group, [.13, .21, .025], "#fff8f1", v(-.08, 1.61 + offset, .217), .01);
      collarLeft.rotation.z = .4;
      const collarRight = box(group, [.13, .21, .025], "#fff8f1", v(.08, 1.61 + offset, .217), .01);
      collarRight.rotation.z = -.4;
      box(group, [.12, .15, .03], "#fff8f1", v(.17, 1.36 + offset, .22), .02);
      box(group, [.065, .025, .04], "#d77ea8", v(.17, 1.38 + offset, .245), .008);
    }
    [-1, 1].forEach(side => {
      sphere(group, [.018, .025, .012], "#422b32", v(side * .09, 2.09 + offset, .319));
      sphere(group, [.039, .018, .012], "#d7848b", v(side * .167, 2.01 + offset, .292));
      const hip = v(side * .16, .96 + offset, 0);
      const knee = v(side * .16, seated ? .62 : .58, seated ? .44 : 0);
      const ankle = v(side * .16, .17, seated ? .44 : 0);
      connect(rod(group, clinician ? "#785f84" : "#8e7c9c", .10), hip, knee);
      connect(rod(group, clinician ? "#785f84" : "#8e7c9c", .095), knee, ankle);
      sphere(group, [.103, .103, .103], clinician ? "#785f84" : "#8e7c9c", knee);
      box(group, [.23, .13, .37], "#604458", ankle.clone().add(v(0, -.06, .07)), .06);
    });
    sphere(group, [.027, .034, .035], skin, v(0, 2.035 + offset, .332));
    tube(group, [v(-.055, 1.968 + offset, .311), v(0, 1.95 + offset, .327), v(.055, 1.968 + offset, .311)], .008, "#8e4f50");
    const arms = [-1, 1].map(side => {
      const shoulder = v(side * .35, 1.57 + offset, 0);
      const upper = rod(group, clothing, .105);
      const lower = rod(group, skin, .074);
      const elbow = sphere(group, [.079, .079, .079], skin, shoulder);
      const hand = sphere(group, [.09, .105, .075], skin, shoulder);
      return { shoulder, upper, lower, elbow, hand };
    });
    function pose(index: number, elbow: THREE.Vector3, hand: THREE.Vector3) {
      const arm = arms[index];
      connect(arm.upper, arm.shoulder, elbow);
      connect(arm.lower, elbow, hand);
      arm.elbow.position.copy(elbow);
      arm.hand.position.copy(hand);
    }
    pose(0, v(-.44, 1.2 + offset, .1), v(-.4, 1 + offset, .2));
    pose(1, v(.44, 1.2 + offset, .1), v(.4, 1 + offset, .2));
    return {
      group,
      pose,
      hands: arms.map(arm => arm.hand),
      exposeUpperArm(index: number) {
        arms[index].upper.material = material(skin);
        return arms[index].upper;
      },
    };
  }

  const floor = mesh(root, new THREE.CylinderGeometry(2.65, 2.7, .07, 72), "#f7d8e7", v(0, .015, .05));
  floor.scale.z = .7;
  const floorRim = mesh(root, new THREE.CylinderGeometry(2.72, 2.74, .045, 72), "#eec3d8", v(0, -.035, .05));
  floorRim.scale.z = .7;

  const board = new THREE.Group();
  board.position.set(-1.3, 1.91, -.13);
  vision.add(board);
  box(board, [1.65, 2.22, .13], "#d6bbd4", v(0, 0, 0));
  const chart = new THREE.Mesh(new THREE.PlaneGeometry(1.52, 2.08), new THREE.MeshBasicMaterial({ map: textures.chart }));
  chart.position.set(0, 0, .071);
  board.add(chart);
  box(board, [.36, .09, .16], "#b286a8", v(0, 1.10, .02), .02);
  const chartStand = rod(vision, "#b992b0", .047);
  connect(chartStand, v(-1.3, .1, -.13), v(-1.3, 1.1, -.13));
  [[-.52, .34], [.52, .34], [0, -.5]].forEach(([x, z]) => connect(rod(vision, "#b992b0", .035), v(-1.3, .45, -.13), v(-1.3 + x, .09, z)));
  const highlight = new THREE.Mesh(new THREE.PlaneGeometry(1.38, .27), new THREE.MeshBasicMaterial({ color: "#ec9dc5", transparent: true, opacity: .22, depthWrite: false }));
  highlight.position.set(-1.3, rowHeights[0], -.052);
  highlight.name = "Selected eye chart row";
  vision.add(highlight);
  const visionist = person(vision, 1.1, 0);
  const pointer = rod(vision, "#8b6179", .018);
  const pointerTip = sphere(vision, [.04, .04, .04], "#cc548c", v(0, 0, 0));
  const visionHeart = heart(vision, v(1.95, 2.5, .1), .29);

  // A seated patient, an upper arm cuff, connecting tube and a monitor.
  box(bp, [.86, .16, .85], "#dba4c0", v(-1.15, .62, .03), .08);
  box(bp, [.86, 1.02, .14], "#e7bdd3", v(-1.15, 1.07, -.40), .07);
  [-1, 1].forEach(side => {
    [-1, 1].forEach(front => connect(rod(bp, "#b48da6", .035), v(-1.15 + side * .30, .6, front * .28), v(-1.15 + side * .35, .08, front * .32)));
  });
  const patient = person(bp, -1.15, .04, true, false);
  patient.pose(1, v(.58, 1.20, .22), v(1.00, 1.20, .28));
  patient.pose(0, v(-.39, .96, .28), v(-.12, .88, .47));
  patient.exposeUpperArm(1).name = "Patient upper arm";
  patient.hands[1].scale.set(.115, .070, .078);
  patient.hands[1].name = "Supported patient hand";
  const bpVisionist = person(bp, 1.12, -.10);
  bpVisionist.pose(0, v(-.46, 1.26, .28), v(-.60, 1.20, .73));
  bpVisionist.pose(1, v(.38, 1.18, .18), v(.05, .96, .22));
  // Align the fabric cuff to the exposed upper arm; only a subtle inflation moves.
  const cuffRig = new THREE.Group();
  cuffRig.position.set(-.685, 1.285, .15);
  cuffRig.quaternion.setFromUnitVectors(v(0, 1, 0), v(.23, -.17, .22).normalize());
  bp.add(cuffRig);
  const cuff = mesh(cuffRig, new THREE.CylinderGeometry(.135, .135, .26, 32, 1, true), "#94658c", v(0, 0, 0));
  cuff.name = "Blood pressure upper arm cuff";
  mesh(cuffRig, new THREE.CylinderGeometry(.137, .137, .03, 32, 1, true), "#d4a7c3", v(0, .09, 0));
  box(cuffRig, [.095, .18, .035], "#a87b9f", v(0, -.015, .13), .012);
  sphere(cuffRig, [.032, .032, .032], "#785571", v(-.06, -.08, .12)).name = "Cuff tubing connector";
  tube(bp, [v(-.72, 1.25, .27), v(-.96, 1.08, .60), v(-.80, .85, 1.18), v(-.15, .91, 1.19), v(.20, 1.23, .96)], .022, "#82677e");
  // The patient's palm rests on a pad, with the monitor on the same stable table.
  const careTable = box(bp, [1.75, .09, 1.0], "#e7c3d5", v(0, 1.04, .56), .045);
  careTable.name = "Care table";
  [-1, 1].forEach(side => {
    [-1, 1].forEach(front => connect(rod(bp, "#b89aaf", .035), v(side * .7, 1.0, .56 + front * .35), v(side * .75, .07, .56 + front * .38)));
  });
  const armSupport = box(bp, [.66, .04, .30], "#f2d9e5", v(-.35, 1.105, .31), .02);
  armSupport.name = "Patient arm support";
  const monitor = box(bp, [.72, .48, .27], "#fff8f6", v(.52, 1.325, .78), .08);
  monitor.name = "Illustrated blood pressure monitor";
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(.55, .29), new THREE.MeshBasicMaterial({ map: textures.monitor }));
  screen.position.set(.52, 1.385, .921);
  bp.add(screen);
  sphere(bp, [.03, .03, .015], "#b99aad", v(.52, 1.16, .921));
  let selectedRow = 0;

  function update(seconds: number, state: ClinicalState) {
    const time = state.reducedMotion ? 0 : seconds;
    vision.visible = state.mode === "vision";
    bp.visible = state.mode === "bp";
    const requestedRow = Number.isFinite(state.row) ? Math.min(4, Math.max(0, Math.round(state.row))) : 0;
    selectedRow += (requestedRow - selectedRow) * (state.reducedMotion || !state.playing ? 1 : .12);
    const low = Math.floor(selectedRow), high = Math.min(4, low + 1);
    const rowY = THREE.MathUtils.lerp(rowHeights[low], rowHeights[high], selectedRow - low);
    const breathing = Math.sin(time * 1.35) * .008;
    visionist.group.position.y = breathing;
    bpVisionist.group.position.y = breathing;
    patient.group.position.y = Math.sin(time * 1.1) * .004;
    const wrist = v(-.78, 1.66 + Math.sin(time * 1.2) * .025, .20);
    visionist.pose(0, v(-.52, 1.49, .06), wrist);
    const hand = wrist.clone().add(visionist.group.position);
    const target = v(-.66, rowY, -.025);
    connect(pointer, hand, target);
    pointerTip.position.copy(target);
    highlight.position.y = rowY;
    const puff = 1 + Math.sin(time * 1.4) * .008;
    cuffRig.scale.set(puff, 1, puff);
    cuffRig.position.y = 1.285 + patient.group.position.y;
    bpVisionist.pose(0, v(-.46, 1.26, .28), v(-.60, 1.20 + Math.sin(time * .9) * .008, .73));
    visionHeart.rotation.z = Math.sin(time * .9) * .12;
    visionHeart.position.y = 2.5 + Math.sin(time * 1.1) * .04;
  }
  update(0, { mode: "vision", row: 0, playing: true, reducedMotion: false, replay: 0 });
  function dispose() {
    const geometries = new Set<THREE.BufferGeometry>();
    const usedMaterials = new Set<THREE.Material>();
    root.traverse(object => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        (Array.isArray(object.material) ? object.material : [object.material]).forEach(item => usedMaterials.add(item));
      }
    });
    geometries.forEach(item => item.dispose());
    usedMaterials.forEach(item => item.dispose());
  }
  return { root, vision, bp, update, dispose };
}
