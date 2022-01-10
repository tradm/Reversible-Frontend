import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators}  from '@angular/forms';
import { validateAllFormFields } from './shared/helpers/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  testForm: FormGroup;

  get f(): any {
    return this.testForm.controls;
  }

  constructor() {}

  ngOnInit(): void {
    this.testForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    });
  }

  ngOnDestroy(): void {
  }

  submitForm(): void {
    if (this.testForm.invalid) {
      validateAllFormFields(this.testForm);
      return;
    }
  }

  isFieldInvalid(field): boolean {
    return this.f[field].errors && (this.f[field].dirty || this.f[field].touched);
  }
}
