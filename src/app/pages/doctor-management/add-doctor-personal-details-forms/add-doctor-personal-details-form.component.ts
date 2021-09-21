import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import {Specialty} from "src/app/core/commons/constants/Constant";

interface Spaciality {
  id: string;
  name: string;
}

@Component({
  selector: "app-add-doctor-personal-details-form",
  templateUrl: "./add-doctor-personal-details-form.component.html",
  styleUrls: ["./add-doctor-personal-details-form.component.scss"],
})
export class AddDoctorPersonalDetailsFormComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  selectedImageName: string = "";

  specialties: Spaciality[] = [];

  url: string = "";

  constructor( private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.specialties = this.getSpecialitiesAsList();
    this.url = this.formGroup.get("profilePicture")?.value || "https://www.asvinshospitals.com/wp-content/uploads/2019/10/default-placeholder-doctor-half-length-Copy.jpg";
    this.selectedImageName = this.formGroup.get("profileUrl")?.value?.name || ""

  }

  onselectFile(e: Event) {
    const element = e.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) {
      this.formGroup.patchValue({
        profileUrl: file
      })
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.formGroup.patchValue({
          profilePicture: event.target.result
        })
        this.selectedImageName = file.name;

      };
    }
  }

  // onSubmit(){

  // }

  openFileDialog() {
    let fileInput: HTMLElement = document.getElementById(
      "imageUploader"
    ) as HTMLElement;
    fileInput.click();
  }

  getSpecialitiesAsList(): Spaciality[] {
    const arrayObjects: Spaciality[] = [];
    for (const [propertyKey, propertyValue] of Object.entries(Specialty)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({id: propertyKey, name: propertyValue});
    }
    return arrayObjects;
  }

  isInvalidWhile(name: string) {
    return (this.formGroup.get(name)?.invalid &&
      (this.formGroup.get(name)?.dirty || this.formGroup.get(name)?.touched));
  }

  isInvalidAfter(name: string) {
    return (this.formGroup.get(name)?.invalid && this.formGroup.get(name)?.touched);
  }
}
