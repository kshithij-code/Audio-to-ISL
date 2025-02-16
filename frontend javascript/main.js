import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";
import GSAP from "gsap";
import { Pane } from "tweakpane";

// Pane
const pane = new Pane({
  container: document.getElementById("pane"),
});
const tab = pane.addTab({
  pages: [{ title: "Hand 🤟" }],
});
const clench = tab.pages[0].addFolder({
  title: "Clench",
  expanded: true,
});
const spread = tab.pages[0].addFolder({
  title: "Spread (WIP)",
  expanded: true,
});
const PARAMS = {
  bg: 0x4b46b2,
  hand: 0xe7a183,
  shirt: 0x303030,
  vest: 0xe7d55c,
  wrist: 0.1,
  thumb: 0.25,
  index: 0.25,
  middle: 1.1,
  ring: 1.1,
  pinky: 0.25,
  thumbz: -0.15,
  indexz: -0.3,
  middlez: -0.08,
  ringz: -0.22,
  pinkyz: -0.52,
};

// Buttons
const raisedHand = document.querySelector("#raised-hand");
// const raisedFinger = document.querySelector("#raised-finger");
// const rockOn = document.querySelector("#rock-on");
// const peace = document.querySelector("#peace");

const centerThresholdX = 10;
const centerThresholdY = 20;

let lastPosition = { x: 0, y: 0 };

const placeButtonRandomly = (button) => {
  const position = lastPosition;
  const rotation = 0;
  button.style.left = `${position.x}%`;
  button.style.top = `${position.y}%`;
  lastPosition.x += 30;
  button.style.transform = `rotate(${rotation}deg)`;
};

placeButtonRandomly(raisedHand);
// placeButtonRandomly(raisedFinger);
// placeButtonRandomly(rockOn);
// placeButtonRandomly(peace);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const bgColor = new THREE.Color(PARAMS.bg);
scene.background = bgColor;

const gltfLoader = new GLTFLoader();

gltfLoader.load("hand2.glb", (gltf) => {
  const model = gltf.scene.children[1];
  scene.add(model);
  model.position.setX(2);
  model.position.setY(-2);
  model.position.setZ(0);
  // model.scale.set(0.9, 0.9, 0.9)
  model.rotation.y = Math.PI * -0.15;

//   setMaterials();
//   setBones();
});
gltfLoader.load("hand2.glb", (gltf) => {
    const model = gltf.scene.children[0];
    scene.add(model);
    model.position.setX(-2);
    model.position.setY(-2);
    model.position.setZ(0);
    // model.scale.set(0.9, 0.9, 0.9)
    model.rotation.y = Math.PI * -0.15;
  
    setMaterials();
    setBones();
  });
// Materials
const handMaterial = new THREE.MeshToonMaterial();
const shirtMaterial = new THREE.MeshToonMaterial();
const vestMaterial = new THREE.MeshToonMaterial();

const setMaterials = () => {
  const textureLoader = new THREE.TextureLoader();
  const gradientTexture = textureLoader.load("3.jpg");
  gradientTexture.minFilter = THREE.NearestFilter;
  gradientTexture.magFilter = THREE.NearestFilter;
  gradientTexture.generateMipmaps = false;

  handMaterial.color = new THREE.Color(PARAMS.hand);
  handMaterial.gradientMap = gradientTexture;
  handMaterial.roughness = 0.7;
  handMaterial.emissive = new THREE.Color(PARAMS.hand);
  handMaterial.emissiveIntensity = 0.2;
  scene.getObjectByName("Hand1").material = handMaterial;

  shirtMaterial.color = new THREE.Color(PARAMS.shirt);
  shirtMaterial.gradientMap = gradientTexture;
  scene.getObjectByName("Shirt1").material = shirtMaterial;

  vestMaterial.color = new THREE.Color(PARAMS.vest);
  vestMaterial.gradientMap = gradientTexture;
  scene.getObjectByName("Vest1").material = vestMaterial;
  scene.getObjectByName("Hand").material = handMaterial;

  shirtMaterial.color = new THREE.Color(PARAMS.shirt);
  shirtMaterial.gradientMap = gradientTexture;
  scene.getObjectByName("Shirt").material = shirtMaterial;

  vestMaterial.color = new THREE.Color(PARAMS.vest);
  vestMaterial.gradientMap = gradientTexture;
  scene.getObjectByName("Vest").material = vestMaterial;
};



const setBones = () => {
  const wrist = scene.getObjectByName("Hand1").skeleton.bones[0];
  const wrist1 = scene.getObjectByName("Hand1").skeleton.bones[1];
  const wrist2 = scene.getObjectByName("Hand1").skeleton.bones[2];
  const wrist3 = scene.getObjectByName("Hand1").skeleton.bones[6];
  const wrist4 = scene.getObjectByName("Hand1").skeleton.bones[10];
  const wrist5 = scene.getObjectByName("Hand1").skeleton.bones[14];
  const wrist6 = scene.getObjectByName("Hand1").skeleton.bones[18];
  
    wrist1.rotation.x = PARAMS.wrist;
    wrist2.rotation.x = PARAMS.wrist;
    wrist3.rotation.x = PARAMS.wrist;
    wrist4.rotation.x = PARAMS.wrist;
    wrist5.rotation.x = PARAMS.wrist;
    wrist6.rotation.x = PARAMS.wrist;

  const wrist_ = scene.getObjectByName("Hand").skeleton.bones[0];
  const wrist1_ = scene.getObjectByName("Hand").skeleton.bones[1];
  const wrist2_ = scene.getObjectByName("Hand").skeleton.bones[2];
  const wrist3_ = scene.getObjectByName("Hand").skeleton.bones[6];
  const wrist4_ = scene.getObjectByName("Hand").skeleton.bones[10];
  const wrist5_ = scene.getObjectByName("Hand").skeleton.bones[14];
  const wrist6_ = scene.getObjectByName("Hand").skeleton.bones[18];

  wrist1_.rotation.x = PARAMS.wrist;
  wrist2_.rotation.x = PARAMS.wrist;
  wrist3_.rotation.x = PARAMS.wrist;
  wrist4_.rotation.x = PARAMS.wrist;
  wrist5_.rotation.x = PARAMS.wrist;
  wrist6_.rotation.x = PARAMS.wrist;

  const thumb1 = scene.getObjectByName("Hand1").skeleton.bones[3];
  const thumb2 = scene.getObjectByName("Hand1").skeleton.bones[4];
  const thumb3 = scene.getObjectByName("Hand1").skeleton.bones[5];
  thumb1.rotation.x = PARAMS.thumb;
  thumb2.rotation.x = PARAMS.thumb;
  thumb3.rotation.x = PARAMS.thumb;
  thumb1.rotation.z = PARAMS.thumbz;
  thumb2.rotation.z = PARAMS.thumbz;
  thumb3.rotation.z = PARAMS.thumbz;

  const thumb1_ = scene.getObjectByName("Hand").skeleton.bones[3];
  const thumb2_ = scene.getObjectByName("Hand").skeleton.bones[4];
  const thumb3_ = scene.getObjectByName("Hand").skeleton.bones[5];
  thumb1_.rotation.x = PARAMS.thumb;
  thumb2_.rotation.x = PARAMS.thumb;
  thumb3_.rotation.x = PARAMS.thumb;
  thumb1_.rotation.z = PARAMS.thumbz;
  thumb2_.rotation.z = PARAMS.thumbz;
  thumb3_.rotation.z = PARAMS.thumbz;

  const index1 = scene.getObjectByName("Hand1").skeleton.bones[7];
  const index2 = scene.getObjectByName("Hand1").skeleton.bones[8];
  const index3 = scene.getObjectByName("Hand1").skeleton.bones[9];
  index1.rotation.x = PARAMS.index;
  index2.rotation.x = PARAMS.index;
  index3.rotation.x = PARAMS.index;

  const index1_ = scene.getObjectByName("Hand").skeleton.bones[7];
  const index2_ = scene.getObjectByName("Hand").skeleton.bones[8];
  const index3_ = scene.getObjectByName("Hand").skeleton.bones[9];
  index1_.rotation.x = PARAMS.index;
  index2_.rotation.x = PARAMS.index;
  index3_.rotation.x = PARAMS.index;

  const middle1 = scene.getObjectByName("Hand1").skeleton.bones[11];
  const middle2 = scene.getObjectByName("Hand1").skeleton.bones[12];
  const middle3 = scene.getObjectByName("Hand1").skeleton.bones[13];
  middle1.rotation.x = PARAMS.middle;
  middle2.rotation.x = PARAMS.middle;
  middle3.rotation.x = PARAMS.middle;

  const middle1_ = scene.getObjectByName("Hand").skeleton.bones[11];
  const middle2_ = scene.getObjectByName("Hand").skeleton.bones[12];
  const middle3_ = scene.getObjectByName("Hand").skeleton.bones[13];
  middle1_.rotation.x = PARAMS.middle;
  middle2_.rotation.x = PARAMS.middle;
  middle3_.rotation.x = PARAMS.middle;

  const ring1 = scene.getObjectByName("Hand1").skeleton.bones[15];
  const ring2 = scene.getObjectByName("Hand1").skeleton.bones[16];
  const ring3 = scene.getObjectByName("Hand1").skeleton.bones[17];
  ring1.rotation.x = PARAMS.ring;
  ring2.rotation.x = PARAMS.ring;
  ring3.rotation.x = PARAMS.ring;

  const ring1_ = scene.getObjectByName("Hand").skeleton.bones[15];
  const ring2_ = scene.getObjectByName("Hand").skeleton.bones[16];
  const ring3_ = scene.getObjectByName("Hand").skeleton.bones[17];
  ring1_.rotation.x = PARAMS.ring;
  ring2_.rotation.x = PARAMS.ring;
  ring3_.rotation.x = PARAMS.ring;

  const pinky1 = scene.getObjectByName("Hand1").skeleton.bones[19];
  const pinky2 = scene.getObjectByName("Hand1").skeleton.bones[20];
  const pinky3 = scene.getObjectByName("Hand1").skeleton.bones[21];
  pinky1.rotation.x = PARAMS.pinky;
  pinky2.rotation.x = PARAMS.pinky;
  pinky3.rotation.x = PARAMS.pinky;

  const pinky1_ = scene.getObjectByName("Hand").skeleton.bones[19];
  const pinky2_ = scene.getObjectByName("Hand").skeleton.bones[20];
  const pinky3_ = scene.getObjectByName("Hand").skeleton.bones[21];
  pinky1_.rotation.x = PARAMS.pinky;
  pinky2_.rotation.x = PARAMS.pinky;
  pinky3_.rotation.x = PARAMS.pinky;

  // PANE
  // Wrist
  clench
    .addInput(PARAMS, "wrist", { min: -0.4, max: 0.4, step: 0.01 })
    .on("change", (ev) => {
      wrist.rotation.x = ev.value;
      wrist1.rotation.x = ev.value;
      wrist2.rotation.x = ev.value;
      wrist3.rotation.x = ev.value;
      wrist4.rotation.x = ev.value;
      wrist5.rotation.x = ev.value;
      wrist6.rotation.x = ev.value;

      wrist_.rotation.x = ev.value;
      wrist1_.rotation.x = ev.value;
      wrist2_.rotation.x = ev.value;
      wrist3_.rotation.x = ev.value;
      wrist4_.rotation.x = ev.value;
      wrist5_.rotation.x = ev.value;
      wrist6_.rotation.x = ev.value;
    });

  // Thumb
  clench
    .addInput(PARAMS, "thumb", { min: 0, max: 0.9, step: 0.01 })
    .on("change", (ev) => {
      thumb1.rotation.x = ev.value;
      thumb2.rotation.x = ev.value;
      thumb3.rotation.x = ev.value;

      thumb1_.rotation.x = ev.value;
      thumb2_.rotation.x = ev.value;
      thumb3_.rotation.x = ev.value;
    });

  spread
    .addInput(PARAMS, "thumbz", { min: -0.4, max: 0.3, step: 0.01 })
    .on("change", (ev) => {
      thumb1.rotation.z = ev.value;
      thumb2.rotation.z = ev.value;
      thumb3.rotation.z = ev.value;

      thumb1_.rotation.z = ev.value;
      thumb2_.rotation.z = ev.value;
      thumb3_.rotation.z = ev.value;
    });

  // Index
  clench
    .addInput(PARAMS, "index", { min: 0, max: 1.1, step: 0.01 })
    .on("change", (ev) => {
      index1.rotation.x = ev.value;
      index2.rotation.x = ev.value;
      index3.rotation.x = ev.value;

      index1_.rotation.x = ev.value;
      index2_.rotation.x = ev.value;
      index3_.rotation.x = ev.value;
    });

  spread
    .addInput(PARAMS, "indexz", { min: -0.5, max: 0, step: 0.01 })
    .on("change", (ev) => {
      index1.rotation.z = ev.value;

      index1_.rotation.z = ev.value;
    });

  // Middle
  clench
    .addInput(PARAMS, "middle", { min: 0, max: 1.25, step: 0.01 })
    .on("change", (ev) => {
      middle1.rotation.x = ev.value;
      middle2.rotation.x = ev.value;
      middle3.rotation.x = ev.value;

      middle1_.rotation.x = ev.value;
      middle2_.rotation.x = ev.value;
      middle3_.rotation.x = ev.value;
    });

  spread
    .addInput(PARAMS, "middlez", { min: -0.35, max: 0.25, step: 0.01 })
    .on("change", (ev) => {
      middle1.rotation.z = ev.value;

      middle1_.rotation.z = ev.value;
    });

  // Ring
  clench
    .addInput(PARAMS, "ring", { min: 0, max: 1.25, step: 0.01 })
    .on("change", (ev) => {
      ring1.rotation.x = ev.value;
      ring2.rotation.x = ev.value;
      ring3.rotation.x = ev.value;

      ring1_.rotation.x = ev.value;
      ring2_.rotation.x = ev.value;
      ring3_.rotation.x = ev.value;
    });

  spread
    .addInput(PARAMS, "ringz", { min: -0.4, max: 0.2, step: 0.01 })
    .on("change", (ev) => {
      wrist5.position.x + ev.value * 0.1;
      wrist5.position.y - ev.value * 0.1;
      ring1.rotation.z = -ev.value;

      wrist5_.position.x + ev.value * 0.1;
      wrist5_.position.y - ev.value * 0.1;
      ring1_.rotation.z = -ev.value;
    });

  // Pinky
  clench
    .addInput(PARAMS, "pinky", { min: 0, max: 1.15, step: 0.01 })
    .on("change", (ev) => {
      pinky1.rotation.x = ev.value;
      pinky2.rotation.x = ev.value;
      pinky3.rotation.x = ev.value;

      pinky1_.rotation.x = ev.value;
      pinky2_.rotation.x = ev.value;
      pinky3_.rotation.x = ev.value;
    });

  spread
    .addInput(PARAMS, "pinkyz", { min: -0.52, max: -0.25, step: 0.01 })
    .on("change", (ev) => {
      wrist6.position.x + ev.value * 0.1;
      pinky1.rotation.z = -ev.value;

      wrist6_.position.x + ev.value * 0.1;
      pinky1_.rotation.z = -ev.value;
    });

  /**
   * Poses
   */

  const wristRotation = [
    wrist.rotation,
    wrist1.rotation,
    wrist2.rotation,
    wrist3.rotation,
    wrist4.rotation,
    wrist5.rotation,
    wrist6.rotation,
  ];
  const thumbRotation = [thumb1.rotation, thumb2.rotation, thumb3.rotation];
  const indexRotation = [index1.rotation, index2.rotation, index3.rotation];
  const middleRotation = [middle1.rotation, middle2.rotation, middle3.rotation];
  const ringRotation = [ring1.rotation, ring2.rotation, ring3.rotation];
  const pinkyRotation = [pinky1.rotation, pinky2.rotation, pinky3.rotation];

  const wristRotation_ = [
    wrist_.rotation,
    wrist1_.rotation,
    wrist2_.rotation,
    wrist3_.rotation,
    wrist4_.rotation,
    wrist5_.rotation,
    wrist6_.rotation,
  ];
  const thumbRotation_ = [thumb1_.rotation, thumb2_.rotation, thumb3_.rotation];
  const indexRotation_ = [index1_.rotation, index2_.rotation, index3_.rotation];
  const middleRotation_ = [middle1_.rotation, middle2_.rotation, middle3_.rotation];
  const ringRotation_ = [ring1_.rotation, ring2_.rotation, ring3_.rotation];
  const pinkyRotation_ = [pinky1_.rotation, pinky2_.rotation, pinky3_.rotation];

  

  async function fetched() {
    try {
    let name="";
    name=document.getElementById("audio").value;
    const response = await fetch("http://127.0.0.1:5000/send",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name}),
    });
      const data = await response.json();
      console.log(data);

      // Update PARAMS with fetched data
      PARAMS.wrist = data.wrist !== undefined ? data.wrist : PARAMS.wrist;
      PARAMS.thumb = data.thumb !== undefined ? data.thumb : PARAMS.thumb;
      PARAMS.index = data.index !== undefined ? data.index : PARAMS.index;
      PARAMS.middle = data.middle !== undefined ? data.middle : PARAMS.middle;
      PARAMS.ring = data.ring !== undefined ? data.ring : PARAMS.ring;
      PARAMS.pinky = data.pinky !== undefined ? data.pinky : PARAMS.pinky;
      PARAMS.thumbz = data.thumbz !== undefined ? data.thumbz : PARAMS.thumbz;
      PARAMS.indexz = data.indexz !== undefined ? data.indexz : PARAMS.indexz;
      PARAMS.middlez = data.middlez !== undefined ? data.middlez : PARAMS.middlez;
      PARAMS.ringz = data.ringz !== undefined ? data.ringz : PARAMS.ringz;
      PARAMS.pinkyz = data.pinkyz !== undefined ? data.pinkyz : PARAMS.pinkyz;

      return PARAMS;
    } catch (error) {
      console.error("Error fetching data from Flask:", error);
      console.log("Using default values");
      return {
        duration: 0,
        wrist: 0,
        thumb: 0,
        index: 0,
        middle: 0,
        ring: 0,
        pinky: 0,
        thumbz: -0.15,
        indexz: -0.3,
        middlez: -0.08,
        ringz: -0.22,
        pinkyz: -0.52,
      };
    }
  }

  raisedHand.addEventListener("click", () => {
    const tlRaisedHand = GSAP.timeline();

    tlRaisedHand
      // First hand
      .to(PARAMS, fetched(), "same")
      .to(wristRotation, { duration: 0.5, x: PARAMS.wrist }, "same")
      .to(thumbRotation, { duration: 0.5, x: PARAMS.thumb }, "same")
      .to(indexRotation, { duration: 0.5, x: PARAMS.index }, "same")
      .to(middleRotation, { duration: 0.5, x: PARAMS.middle }, "same")
      .to(ringRotation, { duration: 0.5, x: PARAMS.ring }, "same")
      .to(pinkyRotation, { duration: 0.5, x: PARAMS.pinky }, "same")
      .to(thumbRotation, { duration: 0.5, z: PARAMS.thumbz }, "same")
      .to(indexRotation[0], { duration: 0.5, z: PARAMS.indexz }, "same")
      .to(middleRotation[0], { duration: 0.5, z: PARAMS.middlez }, "same")
      .to(ringRotation[0], { duration: 0.5, z: -PARAMS.ringz }, "same")
      .to(pinkyRotation[0], { duration: 0.5, z: -PARAMS.pinkyz }, "same")
      // Second hand (mirrored)
      .to(wristRotation_, { duration: 0.5, x: PARAMS.wrist }, "same")
      .to(thumbRotation_, { duration: 0.5, x: PARAMS.thumb }, "same")
      .to(indexRotation_, { duration: 0.5, x: PARAMS.index }, "same")
      .to(middleRotation_, { duration: 0.5, x: PARAMS.middle }, "same")
      .to(ringRotation_, { duration: 0.5, x: PARAMS.ring }, "same")
      .to(pinkyRotation_, { duration: 0.5, x: PARAMS.pinky }, "same")
      .to(thumbRotation_, { duration: 0.5, z: PARAMS.thumbz }, "same")
      .to(indexRotation_[0], { duration: 0.5, z: PARAMS.indexz }, "same")
      .to(middleRotation_[0], { duration: 0.5, z: PARAMS.middlez }, "same")
      .to(ringRotation_[0], { duration: 0.5, z: -PARAMS.ringz }, "same")
      .to(pinkyRotation_[0], { duration: 0.5, z: -PARAMS.pinkyz }, "same")
      // Additional animations for wrist rotations
    //   .to(wristRotation, { duration: 0.5, y: -PARAMS.wrist * 0.5 }, "same")
    //   .to(wristRotation_, { duration: 0.5, y: -PARAMS.wrist * 0.5 }, "same")
      // Update UI
      .call(() => {
        pane.refresh();
      })
      .play();
  });

//   raisedHand.addEventListener("click", () => {
//     const tlRaisedHand = GSAP.timeline();
//     tlRaisedHand
//       .to(PARAMS, fetched(), "same") 
//       .to(wristRotation_, { duration: 0.5, x: PARAMS.wrist }, "same")
//       .to(thumbRotation_, { duration: 0.5, x: PARAMS.thumb }, "same") 
//       .to(indexRotation_, { duration: 0.5, x: PARAMS.index }, "same")
//       .to(middleRotation_, { duration: 0.5, x: PARAMS.middle }, "same")
//       .to(ringRotation_, { duration: 0.5, x: PARAMS.ring }, "same")
//       .to(pinkyRotation_, { duration: 0.5, x: -PARAMS.pinky }, "same")
//       .to(thumbRotation_, { duration: 0.5, z: PARAMS.thumbz }, "same")
//       .to(indexRotation_[0], { duration: 0.5, z: PARAMS.indexz }, "same")
//       .to(middleRotation_[0], { duration: 0.5, z: PARAMS.middlez }, "same")
//       .to(ringRotation_[0], { duration: 0.5, z: -PARAMS.ringz }, "same")
//       .to(pinkyRotation_[0], { duration: 0.5, z: -PARAMS.pinkyz }, "same")
//       .call(() => {
//         pane.refresh();
//       })
//       .play();
//   });

//   raisedFinger.addEventListener("click", () => {
//     const tlRaisedFinger = GSAP.timeline();

//     tlRaisedFinger
//       .to(
//         PARAMS,
//         {
//           duration: 0,
//           wrist: 0,
//           thumb: 0.9,
//           index: 0,
//           middle: 1.25,
//           ring: 1.25,
//           pinky: 1.15,
//           thumbz: -0.15,
//           indexz: -0.3,
//           middlez: -0.08,
//           ringz: -0.22,
//           pinkyz: -0.52,
//         },
//         "same"
//       )
//       .to(wristRotation, { duration: 0.5, x: 0 }, "same")
//       .to(thumbRotation, { duration: 0.5, x: 0.9 }, "same")
//       .to(indexRotation, { duration: 0.5, x: 0 }, "same")
//       .to(middleRotation, { duration: 0.5, x: 1.25 }, "same")
//       .to(ringRotation, { duration: 0.5, x: 1.25 }, "same")
//       .to(pinkyRotation, { duration: 0.5, x: 1.15 }, "same")
//       .to(thumbRotation, { duration: 0.5, z: -0.15 }, "same")
//       .to(indexRotation[0], { duration: 0.5, z: -0.3 }, "same")
//       .to(middleRotation[0], { duration: 0.5, z: -0.08 }, "same")
//       .to(ringRotation[0], { duration: 0.5, z: 0.22 }, "same")
//       .to(pinkyRotation[0], { duration: 0.5, z: 0.52 }, "same")
//       .call(() => {
//         pane.refresh();
//       })
//       .play();
//   });


//   rockOn.addEventListener("click", () => {
//     const tlRockOn = GSAP.timeline();
//     let bgColor = new THREE.Color(0x4b46b2);
//     let handColor = new THREE.Color(0xe7a183);
//     let shirtColor = new THREE.Color(0x303030);
//     let vestColor = new THREE.Color(0xe7d55c);

//     tlRockOn
//       .to(
//         PARAMS,
//         {
//           duration: 0,
//           bg: 0x4b46b2,
//           hand: 0xe7a183,
//           shirt: 0x303030,
//           vest: 0xe7d55c,
//           wrist: 0.1,
//           thumb: 0.25,
//           index: 0.25,
//           middle: 1.1,
//           ring: 1.1,
//           pinky: 0.25,
//           thumbz: -0.15,
//           indexz: -0.3,
//           middlez: -0.08,
//           ringz: -0.22,
//           pinkyz: -0.52,
//         },
//         "same"
//       )
//       .to(wristRotation, { duration: 0.5, x: 0.1 }, "same")
//       .to(thumbRotation, { duration: 0.5, x: 0.25 }, "same")
//       .to(indexRotation, { duration: 0.5, x: 0.25 }, "same")
//       .to(middleRotation, { duration: 0.5, x: 1.1 }, "same")
//       .to(ringRotation, { duration: 0.5, x: 1.1 }, "same")
//       .to(pinkyRotation, { duration: 0.5, x: 0.25 }, "same")
//       .to(thumbRotation, { duration: 0.5, z: -0.15 }, "same")
//       .to(indexRotation[0], { duration: 0.5, z: -0.3 }, "same")
//       .to(middleRotation[0], { duration: 0.5, z: -0.08 }, "same")
//       .to(ringRotation[0], { duration: 0.5, z: 0.22 }, "same")
//       .to(pinkyRotation[0], { duration: 0.5, z: 0.52 }, "same")
//       .to(
//         scene.background,
//         { duration: 0.5, r: bgColor.r, g: bgColor.g, b: bgColor.b },
//         "same"
//       )
//       .to(
//         handMaterial.color,
//         { duration: 0.5, r: handColor.r, g: handColor.g, b: handColor.b },
//         "same"
//       )
//       .to(
//         handMaterial.emissive,
//         { duration: 0.5, r: handColor.r, g: handColor.g, b: handColor.b },
//         "same"
//       )
//       .to(
//         shirtMaterial.color,
//         { duration: 0.5, r: shirtColor.r, g: shirtColor.g, b: shirtColor.b },
//         "same"
//       )
//       .to(
//         vestMaterial.color,
//         { duration: 0.5, r: vestColor.r, g: vestColor.g, b: vestColor.b },
//         "same"
//       )
//       .call(() => {
//         pane.refresh();
//       })
//       .play();
//   });

//   peace.addEventListener("click", () => {
//     const tlPeace = GSAP.timeline();
//     tlPeace
//       .to(
//         PARAMS,
//         {
//           duration: 0,
//           wrist: 0,
//           thumb: 0.9,
//           index: 0,
//           middle: 0,
//           ring: 1.25,
//           pinky: 1.15,
//           thumbz: -0.15,
//           indexz: -0.03,
//           middlez: -0.23,
//           ringz: -0.22,
//           pinkyz: -0.52,
//         },
//         "same"
//       )
//       .to(wristRotation, { duration: 0.5, x: 0 }, "same")
//       .to(thumbRotation, { duration: 0.5, x: 0.9 }, "same")
//       .to(indexRotation, { duration: 0.5, x: 0 }, "same")
//       .to(middleRotation, { duration: 0.5, x: 0 }, "same")
//       .to(ringRotation, { duration: 0.5, x: 1.25 }, "same")
//       .to(pinkyRotation, { duration: 0.5, x: 1.15 }, "same")
//       .to(thumbRotation, { duration: 0.5, z: -0.15 }, "same")
//       .to(indexRotation[0], { duration: 0.5, z: -0.03 }, "same")
//       .to(middleRotation[0], { duration: 0.5, z: -0.23 }, "same")
//       .to(ringRotation[0], { duration: 0.5, z: 0.22 }, "same")
//       .to(pinkyRotation[0], { duration: 0.5, z: 0.52 }, "same")
//       .call(() => {
//         pane.refresh();
//       })
//       .play();
//   });
};

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-5, 5, 5);
directionalLight.scale.set(0.5, 0.5, 0.5);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  outlineEffect.setSize(sizes.width, sizes.height);
  outlineEffect.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 5);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 3;
controls.maxDistance = 10;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const outlineEffect = new OutlineEffect(renderer, {
  defaultThickness: 0.0035,
  defaultColor: [0, 0, 0],
  defaultAlpha: 0.8,
  defaultKeepAlive: true,
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update controls
  controls.update();

  // Render
  outlineEffect.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
