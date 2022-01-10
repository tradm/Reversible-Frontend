import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators}  from '@angular/forms';
import { validateAllFormFields } from './shared/helpers/common';
import { ToastrService } from 'ngx-toastr';
import { ReversibleService } from './services/reversible.service';

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

  constructor(
    protected toastSrv:ToastrService,
    protected reversibleSrv: ReversibleService
  ) {
  }

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

    const form = {
      ...this.testForm.value
    };

    this.reversibleSrv.check(form).subscribe((response) => {
      if (response) {
        this.toastSrv.success('Success!');
      }
      }, (error) => {
        this.toastSrv.error(error.message);
      }
    );
  }

  isFieldInvalid(field): boolean {
    return this.f[field].errors && (this.f[field].dirty || this.f[field].touched);
  }
}
