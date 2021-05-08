import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivationService } from 'src/app/core/activation/activation.service';
import { MediaService } from 'src/app/core/media/media.service';
import { RolesService } from 'src/app/core/roles/roles.service';
import { UsersService } from 'src/app/core/users/users.service';
import { Activation } from 'src/app/models/activation';
import { Role } from 'src/app/models/role';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { HasUnsavedData } from 'src/app/models/ui/hasUnsavedData';
import { UserDetailNode } from 'src/app/models/ui/userDetailNode';
import { User } from 'src/app/models/user';
import { InputOutputValue, SingleMultiChoiceItem } from 'src/app/shared/models/InputOutputValue';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

import { UsersDetailService } from './user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy, HasUnsavedData {
  breadCrumbs: BreadCrumbInfo[]=[]
  userId: string;
  _userDetail: UserDetailNode;
  get userDetail(): UserDetailNode{
    return this._userDetail
  };
  set userDetail(value){
    this._userDetail=value
    this.selectedRole = (value.role) ? {'value': value.role.id, 'label': value.role.name} : {'value' : '', 'label': ''}
  }
  orginalUserDetail: UserDetailNode;
  avatarImage: File;
  avatarUrl: string;

  availableRoles: Role[];
  availabelRolesSelection: SingleMultiChoiceItem[]=[]
  isEditing = false;
  checkForError= false
  roleField:InputOutputValue=new InputOutputValue('role', $localize `Role`, false)
  usernameField:InputOutputValue=new InputOutputValue('Username', $localize `username`, false)
  firstname:InputOutputValue=new InputOutputValue('firstname', $localize `First name`, false)
  lastname:InputOutputValue=new InputOutputValue('lastname', $localize `Last name`, false)

  activation: Activation;

  _selectedRole:SingleMultiChoiceItem=undefined
  get selectedRole():SingleMultiChoiceItem{
    return this._selectedRole
  }
  set selectedRole(value:SingleMultiChoiceItem){
    if (value!=this._selectedRole) {
      this._selectedRole=value
      this.rolesService.getById(value.value.toString()).subscribe(role => this.userDetail.role = role);
    }
  }
  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersDetailService: UsersDetailService ,
    private rolesService: RolesService,
    private usersService: UsersService,
    private authService: AuthService,
    private mediaService: MediaService,
    private toastr: ToastrService,
    private activationService: ActivationService
    ) {
      //history.pushState(null, null, window.location.href);
    // check if back or forward button is pressed.
    /* this.location.onPopState(() => {
        history.pushState(null, null, window.location.href);
    });  */
     }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.refresh();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //this.cancelModal()
  }
  /* @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.cancelModal()
  } */

  hasUnsavedData(){
    return (! _.isEqual(this.userDetail, this.orginalUserDetail))
  }
  s(){
    let d = _.isEqual(this.userDetail, this.orginalUserDetail)
  }


  async save() {
    this.checkForError=true
    if (!(this.roleField.error || this.usernameField.error || this.firstname.error || this.lastname.error)) {
      if (this.avatarImage) {
        const media = await this.mediaService.upload(this.avatarImage).toPromise();
        this.userDetail.avatar = media.url;
      }
      if (this.userDetail.id==undefined) {
        let userDraft:User = {...this.userDetail, 'companyId': this.authService.getLocalUser().companyId, 'role': this.userDetail.role }
        this.usersService.createUser(userDraft).subscribe((user) => this.router.navigate(['users/' + user.id]));
      }else{
        this.usersDetailService.updateDetail(this.userDetail);

      }
      this.orginalUserDetail = _.cloneDeep(this.userDetail)
    }

    this.toastr.show(
      '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
      + $localize `Success` + '</span> <span>' + $localize `Saved` + '</span></div>',
      '',
      {
        timeOut: 1500,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass: "ngx-toastr alert alert-dismissible alert-success alert-notify",
      }
    );
  }

  selectAvatar(event) {
    this.avatarImage = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.avatarImage);

    reader.onload = () => {
      this.avatarUrl = reader.result.toString();
    };
  }

  clearAvatar() {
    this.avatarUrl = null;
    this.avatarImage = null;
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = environment.clientHost + '/activation/' + this.activation.id + '?code=' + this.activation.code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toastr.show(
      '<span class="alert-icon ni ni-bell-55"></span> <div class="alert-text"> <span class="alert-title">'
      + $localize `Success` + '</span> <span>' + $localize `Copied` + '</span></div>',
      '',
      {
        timeOut: 1500,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass: "ngx-toastr alert alert-dismissible alert-success alert-notify",
      }
    );
  }

  async refresh() {

    if (this.userId!= 'undefined') {
      this.userDetail = await this.usersDetailService.getDetail(this.userId).toPromise();

      if (!this.userDetail.activatedAt) {
        this.activation = await this.activationService.getByUserId(this.userId).toPromise();
        console.log(this.activation);
      }
    }else{
      this.userDetail = {
        role: undefined,
        company:undefined,
        id: undefined,
        password: "",
        username:"",
        firstName:"",
        lastName:"",
        avatar: undefined
      }
    }
    this.orginalUserDetail = _.cloneDeep(this.userDetail)
    this.breadCrumbs = [{name: $localize `Users`, url: "/users" },
      {name:(this.userDetail.id)? this.userDetail.username : $localize `New`, url:this.router.url}]


    this.availableRoles = await this.rolesService.getAll().toPromise();
    this.availabelRolesSelection= this.availableRoles.map((r)=>{
      return {value:r.id, label:r.name}

    })
  }
  cancelModal(){
    this.router.navigate(['users']);

  }
  deleteModal(){

    swal.fire({
      title: $localize `Are you sure to delete?`,
      text: $localize `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-default',
      confirmButtonText: $localize `Yes, delete!`,
      cancelButtonClass: 'btn btn-secondary',
      cancelButtonText: $localize `Cancel`
    }).then((result) => {
      if (result.value) {

          if (this.userDetail.id) {
            this.usersService.deleteUser(this.userDetail.id);
            this.router.navigate(['users'])
          }
          // Show confirmation
          //this.deleteDraft()
      }
    })
  }
  saveModal(dontFireModal:boolean=false){
    if (!dontFireModal) {
      swal.fire({
        title: $localize `Back to overview?`,
        text: '',
        type: 'success',
        showCancelButton: true,
        showConfirmButton:true,
        buttonsStyling: false,
        confirmButtonText: $localize `Yes`,
        cancelButtonClass: 'btn btn-secondary',
        confirmButtonClass: 'btn btn-default',
        cancelButtonText: $localize `No`
    }).then((result) => {
      if (result.value) {
          // Show confirmation
          this.router.navigate(['users']);
      }else{
        this.usersService.getByUserName(this.userDetail.username).subscribe(user => {
          this.router.navigate(['users/' + user.id])
        });
      }
    })
    }
  }

}
