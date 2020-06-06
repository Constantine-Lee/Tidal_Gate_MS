import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { Gate } from '../_models/gate';
import { GateService } from '../_services/gate.service';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { fadeInAnimation } from '../_animations';
declare var $: any;

@Component({
  selector: 'app-update-gate',
  templateUrl: './update-gate.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class UpdateGateComponent implements OnInit {
  gate: Gate;
  fileData: File = null;
  previewUrl: any = environment.apiUrl + '/images/tidalGatePlaceHolder.png';
  uploadedFilePath: string = null;
  public fileInput: string = "Choose Image";

  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  currentUser: User;
  receive: boolean;
  loading = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';

  constructor(private route: ActivatedRoute,
    private router: Router, private qcs: QuestionControlService, private gateService: GateService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.getGateByID(params.get('gateID'))
      )
    ).subscribe();
  }

  async getGateByID(id: string) {

    await this.gateService.getGateByID(id)
      .then(gate => this.gate = gate);
    this.questions = JSON.parse(this.gate.question);
    this.form = this.qcs.toFormGroup(this.questions);
    this.previewUrl = this.gate.profilePhoto;  
    this.receive = true;
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      return;
    };

    this.loading = true;
    const formData = new FormData();
    let formValue = this.form.getRawValue();
    this.questions.map(question => question.value = formValue[question.key]);

    formData.append('name', formValue['Gate Name']);
    formData.append('question', JSON.stringify(this.questions));
    formData.append('GateID', formValue['Gate_ID']);
    formData.append('image', this.fileData);
    formData.append('profilePhoto', this.gate.profilePhoto);
    formData.append('timestamp', this.gate.timestamp.toString());

    this.gateService.updateGate(formData, this.gate._id).subscribe(_ => this.router.navigate(['/gate']),
      err => {
        console.log(err);
        if (err != undefined) {
          this.errorString = err;
        }
        else {
          this.errorString = 'Unknown Error Occurs... Operation Failed.';
        }
        this.loading = false;
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
}

