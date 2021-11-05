import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';
  public chooseType: boolean = false;
  public type1: boolean = false;
  public type2: boolean = false;
  public viewConfigs: boolean = false;
  maxConfigAmount: boolean = false;
  submitted: boolean = false;
  doesExist1: boolean = false;
  doesExist2: boolean = false;
  // @ts-ignore
  configSchema1Form: FormGroup;
  // @ts-ignore
  configSchema2Form: FormGroup;


  public createdConfigs: any = [];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // Form of configSchema1
    this.configSchema1Form = this.formBuilder.group( {
      name1: ['', [Validators.required]],
      nameSpace1: this.formBuilder.group({
        subNameSpace1: this.formBuilder.group({
          parameter1: ['', [Validators.required]],
          parameter2: [5, [Validators.min(0)]],
        }),
        parameter3: false,
      }),
      nameSpace2: this.formBuilder.group(({
        subNameSpace2: this.formBuilder.group({
          parameter4: [-2, [Validators.min(-10), Validators.max(10)]],
        }),
        parameter8: [''],
      })),
      type: [1]
    })

    // Form of configSchema2
    this.configSchema2Form = this.formBuilder.group({
      name2: ['', [Validators.required]],
      parameter10: ['', [Validators.required]],
      nameSpace3: this.formBuilder.group({
        subNameSpace4: this.formBuilder.group({
            parameter14: true,
            parameter15: [0.35, [Validators.min(0), Validators.max(1)]],
            subNameSpace5: this.formBuilder.group({
              subNameSpace6: this.formBuilder.group({
                  parameter16: [0.7, [Validators.min(-1), Validators.max(1)]],
                  parameter17: ['']
              })
            })
        }),
        parameter18: [],
      }),
      type: [2]
    })

    //Assigns a boolean variable to see details
    for (let item of this.createdConfigs) {
      this.createdConfigs['isDetail'] = false;
    }
  }

  get f1() {
    return this.configSchema1Form.controls;
  }
  get f2() {
    return this.configSchema2Form.controls;
  }

  deleteConfig(id: number) {
    this.createdConfigs.forEach((value: any, index: any) => {
      if (value.id == id) {
        this.createdConfigs.splice(index,1);
      }
    })
}
  onConfigSchema1Submit() {
    this.submitted = true;
    if (this.configSchema1Form.invalid) {
      // If there is an invalid input, function stops here
      return false;
    } else {
        let counter = [];
        // @ts-ignore
        counter = this.createdConfigs.filter(el => {return el.type === 1});
        if (counter.length >= 5) {  // Checks number of config types
          this.maxConfigAmount = true;
          return false;
        } else {
              this.maxConfigAmount = false;
              let formData = new FormData();
              formData.append('name1', this.configSchema1Form.value.name1);
              formData.append('parameter1', this.configSchema1Form.value.nameSpace1.subNameSpace1.parameter1);
              formData.append('parameter2', this.configSchema1Form.value.nameSpace1.subNameSpace1.parameter2);
              formData.append('parameter3', this.configSchema1Form.value.nameSpace1.parameter3);
              formData.append('parameter4', this.configSchema1Form.value.nameSpace2.subNameSpace2.parameter4);
              formData.append('parameter8', this.configSchema1Form.value.nameSpace2.parameter8);

              if(this.createdConfigs.length === 0 || !this.createdConfigs) {
                  this.createdConfigs.push(this.configSchema1Form.value);
              } else if (this.createdConfigs.length > 0 && this.createdConfigs){
                for (let item of this.createdConfigs) {
                  if (this.configSchema1Form.value.name1 === item.name1 || this.configSchema1Form.value.name1 === item.name2) { //Does not allow to add configs with same names
                    this.doesExist1 = true;
                    return false;
                  }
                }
                this.doesExist1 = false;
                this.createdConfigs.push(this.configSchema1Form.value);
              }

              // Assigns an id for every config
              this.createdConfigs.forEach(function (item: { id: number; }, index: number) {
                item.id = index;
              })
              this.onReset(1);
              return true;
      }

    }

  }

 onReset(type: number) {
    this.submitted = false;
    if(type === 1) {    //Resets configSchema1
      this.configSchema1Form = this.formBuilder.group({
        name1: ['', [Validators.required]],
        nameSpace1: this.formBuilder.group({
          subNameSpace1: this.formBuilder.group({
            parameter1: ['', [Validators.required]],
            parameter2: [5, [Validators.min(0)]],
          }),
          parameter3: false,
        }),
        nameSpace2: this.formBuilder.group(({
          subNameSpace2: this.formBuilder.group({
            parameter4: [-2, [Validators.min(-10), Validators.max(10)]],
          }),
          parameter8: [''],
        })),
        type: [1]

      })
    } else if (type === 2) {   //Resets configSchema2
      this.configSchema2Form = this.formBuilder.group({
        name2: ['', [Validators.required]],
        parameter10: ['', [Validators.required]],
        nameSpace3: this.formBuilder.group({
          subNameSpace4: this.formBuilder.group({
            parameter14: true,
            parameter15: [0.35, [Validators.min(0), Validators.max(1)]],
            subNameSpace5: this.formBuilder.group({
              subNameSpace6: this.formBuilder.group({
                parameter16: [0.7, [Validators.min(-1), Validators.max(1)]],
                parameter17: ['']
              })
            })
          }),
          parameter18: [],
        })
      })
    }
 }
  onConfigSchema2Submit() {
    this.submitted = true;
    if (this.configSchema2Form.invalid) {
      // If there is an invalid input, function stops here
      return false;
    } else {
      let counter = [];
      // @ts-ignore
      counter = this.createdConfigs.filter(el => {return el.type === 2});
      if (counter.length >= 5) { // Checks number of config types
        this.maxConfigAmount = true;
        return false;
      } else {
        this.maxConfigAmount = false;
        let formData = new FormData();
        formData.append('name2', this.configSchema2Form.value.name2);
        formData.append('parameter10', this.configSchema2Form.value.parameter10);
        formData.append('parameter14', this.configSchema2Form.value.nameSpace3.subNameSpace4.parameter14);
        formData.append('parameter15', this.configSchema2Form.value.nameSpace3.subNameSpace4.parameter15);
        formData.append('parameter16', this.configSchema2Form.value.nameSpace3.subNameSpace4.subNameSpace5.subNameSpace6.parameter16);
        formData.append('parameter17', this.configSchema2Form.value.nameSpace3.subNameSpace4.subNameSpace5.subNameSpace6.parameter17);
        formData.append('parameter18', this.configSchema2Form.value.nameSpace3.parameter18);

        if(this.createdConfigs.length === 0 || !this.createdConfigs) {
          this.createdConfigs.push(this.configSchema2Form.value);
        } else if (this.createdConfigs.length > 0 && this.createdConfigs){
          for (let item of this.createdConfigs) {
            if (this.configSchema2Form.value.name2 === item.name2 || this.configSchema2Form.value.name2 === item.name1) { //Does not allow to add configs with same names
              this.doesExist2 = true;
              return false;
            }
          }
          this.doesExist2 = false;
          this.createdConfigs.push(this.configSchema2Form.value);
        }
        // Assigns an id for every config
        this.createdConfigs.forEach(function (item: { id: number; }, index: number) {
          item.id = index;
        })
        this.onReset(2);
        return true;
      }

    }

  }

}
