import { Component, OnInit } from "@angular/core";
import * as THREE from "three";
import * as orbitControlsModule from "three-orbit-controls";
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';

@Component({
  selector: "app-three-view",
  templateUrl: "./three-view.component.html",
  styleUrls: ["./three-view.component.css"]
})
export class ThreeViewComponent implements OnInit {
  public currentSelectedObject = undefined;
  public scene;
  camera;
  renderer;
  container;
  controls;
  cube;

  private _lastObject = undefined;

  constructor() {}

  ngOnInit() {
    this.init3D();
  }

  get getThree() {
    return THREE;
  }

  setCurrentSelected(obj) {
    this.currentSelectedObject = obj;
  }

  init3D() {
    const OrbitControls = orbitControlsModule(THREE);

    this.container = document.getElementById("webGL");

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(0, 0, 10);

    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.update();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var cubeMap = new THREE.CubeTextureLoader()
      .setPath("../../assets/images/")
      .load([
        "posx.jpg",
        "negx.jpg",
        "posy.jpg",
        "negy.jpg",
        "posz.jpg",
        "negz.jpg"
      ]);

    this.scene.background = cubeMap;

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.scene.add(directionalLight);

    var light1 = new THREE.PointLight(0xffffff, 0.5, 100);
    light1.position.set(-4, 0, 4);
    this.scene.add(light1);

    var light2 = new THREE.PointLight(0xffffff, 0.5, 100);
    light2.position.set(4, 0, 4);
    this.scene.add(light2);

    this.animate();
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
    if(this._lastObject){
      this._lastObject.rotation.x +=0.02;
      this._lastObject.rotation.y +=0.02;
    }
    this.controls.update();
  }

  instantiateObject(obj){
    if(this._lastObject) this.scene.remove(this._lastObject);
    this.scene.add(obj);
    this._lastObject = obj;
  }

  get envMap(){
    return this.scene.background;
  }
}
