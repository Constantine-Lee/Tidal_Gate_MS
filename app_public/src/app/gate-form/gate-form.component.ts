import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../_services/questionControl.service';
import { environment } from '../../environments/environment';
import { GateService } from '../_services/gate.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from '../_animations';
import { QuestionBase } from '../_models/questionType';
import { LoggingService } from '../_services/logging.service';
import { Gate } from '../_models/gate';

declare var $: any;

@Component({
  selector: 'app-gate-form',
  templateUrl: './gate-form.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class GateFormComponent implements OnInit {

  previewUrl: string;
  questions: QuestionBase[] = [];
  form: FormGroup;
  currentUser: User;
  submitting = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';
  gate: Gate;
  submitButtonLabel: string;
  NotFound: string;

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  constructor(
    private router: Router,
    private qcs: QuestionControlService,
    private gateService: GateService,
    private authenticationService: AuthenticationService,
    private logger: LoggingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.logger.info("Function: ngOnInit()");

    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.logger.debug(JSON.stringify(this.currentUser));
    }
    );
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('gateID')) {
        this.gateService.getGateByID(params.get('gateID')).subscribe(
          g => this.initForm(g, 'Update'),
          err => this.NotFound = err.status
        )
      }
      else {
        this.gateService.getForms().subscribe(g => this.initForm(g, 'Submit'));
      }
    }
    );
  }

  initForm(g: Gate, buttonLabel: string) {
    this.logger.info("Function: initForm(g: Gate, buttonLabel: string)");
    this.gate = g;
    this.previewUrl = this.gate.profilePhoto;
    this.questions = this.gate.questions;
    this.form = this.qcs.toFormGroup(this.questions);
    this.submitButtonLabel = buttonLabel;
    this.logger.debug("this.gate: " + JSON.stringify(this.gate, null, 2) + "this.previewUrl: " + this.previewUrl + "this.submitButtonLabel: " + this.submitButtonLabel);
  }

  onSubmit() {
    this.logger.info("Function: onSubmit()");

    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      return;
    };
    this.submitting = true;
    const formValue = this.form.getRawValue();
    this.logger.debug("formValue: " + JSON.stringify(formValue, null, 2));    
    
    this.gate.questions = this.questions;

    if (this.submitButtonLabel == 'Submit') {
      this.gateService.addGate(this.gate)
        .subscribe(
          _ => this.router.navigate(['/gate']),
          err => this.submitErrHandling(err));
    }
    else if (this.submitButtonLabel == 'Update') {
      this.gateService.updateGate(this.gate)
        .subscribe(
          _ => this.router.navigate(['/gate']),
          err => this.submitErrHandling(err));
    }
  }

  submitErrHandling(err) {
    this.logger.error(err);
    if (err != undefined) {
      
        this.ngOnInit();
      
      this.errorString = err.error;
    }
    else {
      this.errorString = 'Unknown Error Occurs... Operation Failed.';
    }
    this.submitting = false;
    $('#errorModal').modal('show');
  }

  fileUpload(fileInput: any) {
    this.previewUrl = `${environment.apiUrl}/images/loading.gif`;
    let width: number = 150;
    let height: number = 150;

    var mimeType = fileInput.target.files[0].type;
    //check format
    if (mimeType.match(/image\/*/) == null) {
      alert("Please upload image of PNG and JPG format.");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(fileInput.target.files[0]);
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = width;
      elem.height = height;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      let base64: string = ctx.canvas.toDataURL('image/jpeg', 0.85);
      this.gateService.upload(base64, this.gate._id ).subscribe(url => {
        this.previewUrl = `${environment.imageFolderUrl}/${url}`;
        this.gate.profilePhoto = `${environment.imageFolderUrl}/${url}`;
      }
      );
    }
  }

}
