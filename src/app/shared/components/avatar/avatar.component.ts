import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { LoadingService } from '../../controllers/loading/loading.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent  implements OnInit {
  protected image = "https://ionicframework.com/docs/img/demos/avatar.svg";
  @Input() control = new FormControl("");
  @Input() onlyView = false;

  protected mimeType = "ïmage/jpeg";

  constructor(private readonly storageSrv: StorageService, private readonly loadingSrv: LoadingService) { }

  ngOnInit() {}

  public async uploadFile(event: any) {
    try {
      await this.loadingSrv.show();
      console.log(event.target.files[0]);
      const url = await this.storageSrv.uploadFileAndGetUrl(event.target.files[0]);
      console.log(url);
      await this.loadingSrv.dismiss();
      this.control.setValue(url);
    } catch (error) {
      await this.loadingSrv.dismiss();
      console.error(error);
    }
  }

}
