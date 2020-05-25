import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { GateQuestionService } from '../question/gateQuestion.service';
import { ImageService } from '../image-service.service';
import { Gate } from '../_models/gate';
import { Location } from '@angular/common';
import { GateService } from '../_services/gate.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInAnimation } from '../_animations';
declare var $: any;

@Component({
  selector: 'app-gate-form',
  templateUrl: './gate-form.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class GateFormComponent implements OnInit {
  fileData: File = null;
  previewUrl: any = "../../assets/images/tidalGatePlaceHolder.png";
  uploadedFilePath: string = null;
  public fileInput: string = "Choose Image";

  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  currentUser: User;
  receive: boolean;
  loading = false;
  error: string = 'Unknown Error Occurs... Operation Failed.';

  constructor(private router: Router, service: GateQuestionService, private qcs: QuestionControlService, private gateService: GateService, private authenticationService: AuthenticationService) {
    this.questions = service.getGates();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
    this.receive = true;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    const formValue = this.form.getRawValue();
        
    this.questions.map(question => question.value = formValue[question.key]);    
    formData.append('name', formValue['Gate Name']);
    formData.append('question', JSON.stringify(this.questions));
    formData.append('image', this.fileData);

    this.gateService.addGate(formData).subscribe(_ => this.router.navigate(['/gate']),
      err => {
        this.loading = false;
        console.log(err);
        if (err != undefined) {
          this.error = err.error;
        }
       
        $('#errorModal').modal('show');
      });
  }

  fileProgress(fileInput: any) {
    this.fileInput = fileInput.target.files[0].name;
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  get isAdmin() {    
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
