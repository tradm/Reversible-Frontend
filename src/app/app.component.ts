import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators}  from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  testForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.testForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    });
  }

  ngOnDestroy(): void {
  }

  submitForm(): void {
  }
}
