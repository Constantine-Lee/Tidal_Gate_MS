import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { GateQuestionService } from '../_services/gateQuestion.service';

import { Gate } from '../_models/gate';
import { Location } from '@angular/common';
import { GateService } from '../_services/gate.service';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';

@Component({
  selector: 'app-update-gate',
  templateUrl: './update-gate.component.html'
})
export class UpdateGateComponent implements OnInit {
  
    fileData: File = null;
    previewUrl: any = "../../assets/images/tidalGatePlaceHolder.png";
    uploadedFilePath: string = null;
    public fileInput: string = "Choose Image";
  
    questions: QuestionBase<string>[] = [];
    form: FormGroup;

    @Input() gate: Gate;
    currentUser: User;
    
    constructor(service: GateQuestionService, private qcs: QuestionControlService, private gateService: GateService, private location: Location, private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isAdmin() {
      console.log(this.currentUser && this.currentUser.role === Role.Admin);
      return this.currentUser && this.currentUser.role === Role.Admin;
    }

    ngOnInit(): void {
      console.log("update component init");
      this.questions = JSON.parse(this.gate.question);
      this.form = this.qcs.toFormGroup(this.questions);
      this.previewUrl = `${environment.apiUrl}/gate/image/${this.gate.profilePhoto}`;
    }
  
    goBack(): void {
      this.location.back();
    }
  
    onSubmit() {
      const formData = new FormData();
  
      let formValue = this.form.getRawValue();
      this.questions.map(question => question.value = formValue[question.key]);       
      
      formData.append('name', formValue['Gate Name']);
      formData.append('question', JSON.stringify(this.questions));
      formData.append('image', this.fileData);
      this.gateService.addGate(formData).subscribe(res => this.goBack(), err => console.log(err));
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
  }
  
