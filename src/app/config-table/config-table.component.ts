import { Component, OnInit } from "@angular/core";
import { ThreeViewComponent } from "../three-view/three-view.component";

@Component({
  selector: "app-config-table",
  templateUrl: "./config-table.component.html",
  styleUrls: ["./config-table.component.css"]
})
export class ConfigTableComponent implements OnInit {
  objects: Objects[] = [
    { value: this.three.getThree.BoxGeometry, viewValue: "Cube" },
    { value: this.three.getThree.SphereGeometry, viewValue: "Sphere" },
    { value: this.three.getThree.TorusKnotGeometry, viewValue: "TorusKnot" }
  ];

  objectsArgs = {
    BoxGeometry: {
      width: 1,
      heigth: 1,
      depth: 1,
      widthSegments: 0
    },
    SphereGeometry: {
      radius: 5,
      widthSegments: 32,
      heightSegments: 32,
      phiStart: 0,
      phiLength: Math.PI * 2,
      thetaStart: 0,
      thetaLength: Math.PI
    },

    TorusKnotGeometry: {
      radius: 1,
      tube: 4,
      tubularSegments: 64,
      radialSegments: 8,
      p: 2,
      q: 3
    }
  };
  objectKeys = Object.keys;
  currentArgumentsInputs;
  currentObjectToInstantiate;

  selected;

  constructor(private three: ThreeViewComponent) {}

  ngOnInit() {
    this.changeObject(this.objects[0].value);
  }

  changeObject(obj) {
    this.selected = obj;
    this.currentArgumentsInputs = this.objectsArgs[obj.name];
  }

  instantiateObject() {
    let args = [];
    for (let prop in this.currentArgumentsInputs) {
      args.push(this.currentArgumentsInputs[prop]);
    }

    var material = new this.three.getThree.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.2,
      envMap: this.three.envMap
    });

    var geometry = new this.selected(...args);
    let mesh = new this.three.getThree.Mesh(geometry, material);

    this.currentObjectToInstantiate = mesh;
    this.currentObjectToInstantiate.material.needsUpdate = true;

    this.three.instantiateObject(this.currentObjectToInstantiate);
  }
}

/*

ngFor(let prop in this.currentObjectToInstantiate.material){
  prop(property name)  | this.currentObjectToInstantiate.material[prop]  (property value)
}


checkPropType(prop){
  return prop type;
}
*/




export interface Objects {
  value: any;
  viewValue: string;
}
