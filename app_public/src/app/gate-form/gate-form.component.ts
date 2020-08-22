import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '.././question/questionControl.service';
import { environment } from '../../environments/environment';
import { GateService } from '../_services/gate.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../_animations';
import { QuestionBase } from '../question/questionType';
import { LoggingService } from '../_services/logging.service';

declare var $: any;

@Component({
  selector: 'app-gate-form',
  templateUrl: './gate-form.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class GateFormComponent implements OnInit {

  file: File = null;
  previewUrl: any = `${environment.apiUrl}/images/uploadImage.png`;
  uploadedFilePath: string = null;

  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  currentUser: User;
  loading = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  constructor
    (
      private router: Router,
      private qcs: QuestionControlService,
      private gateService: GateService,
      private authenticationService: AuthenticationService,
      private logger: LoggingService
    ) {
  }

  ngOnInit(): void {
    this.logger.info("Function: ngOnInit()");
    this.authenticationService.currentUser.subscribe(
      x => {
        this.currentUser = x;
        this.logger.debug(JSON.stringify(this.currentUser));
      }
    );
    this.gateService.getForms().subscribe(
      q => {
        this.questions = q;
        this.logger.debug(JSON.stringify(this.questions));
        this.form = this.qcs.toFormGroup(q);        
      }
    )
  }


  onSubmit() {
    this.logger.info("Function: onSubmit()");

    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      return;
    };
    this.loading = true;
    const formData = new FormData();
    const formValue = this.form.getRawValue();

    this.questions.map(question => question.value = formValue[question.key]);
    formData.append('name', formValue['Gate Name']);
    formData.append('GateID', formValue['Gate_ID']);
    formData.append('question', JSON.stringify(this.questions));
    formData.append('image', this.file);

    this.gateService.addGate(formData).subscribe(_ => this.router.navigate(['/gate']),
      err => {
        this.loading = false;
        console.log(err);
        if (err != undefined) {
          this.errorString = err.error;
        }
        else {
          this.errorString = 'Unknown Error Occurs... Operation Failed.';
        }
        this.loading = false;
        $('#errorModal').modal('show');
      });
  }

  fileProgress(fileInput: any) {
    this.previewUrl = `${environment.apiUrl}/images/loading.gif`;
    let width: number = 250;
    let height: number = 190;
    
    var mimeType = fileInput.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Please upload image of PNG and JPG format.");
      return;
    }

    this.file = fileInput.target.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(this.file)
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = width;
      elem.height = height;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      let base64: string = ctx.canvas.toDataURL('image/jpeg', 1);
      this.logger.debug(base64);
      this.gateService.upload({ base64String: base64 }).subscribe(_ => {
        this.previewUrl = base64;
      }
      );
    }
  }

}
