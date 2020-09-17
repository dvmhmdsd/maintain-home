import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../services/settings.service';
import { ISettings } from './../../../../CONSTANTS/interfaces/settings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  images: any[];
  isImageLoading: boolean;
  isVideoLoading: boolean;
  selectedImage: File;
  selectedVideo: File;
  videoUrl: string;
  isVideoUploading: boolean;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.listImages();
  }

  listImages() {
    this.isImageLoading = true;
    this.settingsService.getImages().subscribe(
      (res: ISettings) => {
        this.images = res.images;
        this.isImageLoading = false;
      },
      (err) => {
        this.isImageLoading = false;
        alert(
          'حدث خطأ أثناء جلب الصور، من فضلك حاول مرة أخري أو قم بالاتصال بالدعم'
        );
      }
    );
  }

  onTabChange(event) {
    if (event.index === 1 && !this.videoUrl) {
      this.isVideoLoading = true;
      this.settingsService.getVideo().subscribe(
        (res: any) => {
          this.isVideoLoading = false;
          this.videoUrl = res.videoUrl
        },
        () => {
          this.isVideoLoading = false;
          alert(
            'حدث خطأ أثناء جلب الفيديو، من فضلك أعد تحميل الصفحة أو قم بالاتصال بالدعم'
          );
        }
      );
    }
  }

  onImageFileChanged(event: any) {
    this.selectedImage = event.target.files[0];
    this.uploadImage();
  }

  onVideoFileChanged(event: any) {
    this.selectedVideo = event.target.files[0];
    this.uploadVideo();
  }

  uploadVideo() {
    const uploadData = new FormData();
    uploadData.append('video', this.selectedVideo, this.selectedVideo.name);

    this.isVideoUploading = true;
    this.settingsService.addVideo(uploadData).subscribe(
      (res: any) => {
        this.isVideoUploading = false;
        this.videoUrl = res.video;
      },
      () => {
        this.isVideoUploading = false;
        alert('حدث خطأ اثناء رفع الفيديو، حاول مرة أخري أو قم بالاتصال بالدعم');
      }
    );
  }

  uploadImage() {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedImage, this.selectedImage.name);
    this.images.push({ url: 'assets/imgs/loading.png' });
    this.settingsService.addImage(uploadData).subscribe(
      (res: any) => {
        this.images.pop();
        this.images.push(res.image);
      },
      () => {
        this.images.pop();
        alert(
          'حدث خطأ أثناء رفع الصورة، يرجي المحاولة مرة أخري أو قم بالإتصال بالدعم'
        );
      }
    );
  }

  private hideRemoveBtn(event: any) {
    if (event.target.classList.contains('mat-icon')) {
      event.target.parentElement.parentElement.style.display = 'none';
    } else {
      event.target.style.display = 'none';
    }
  }

  private showRemoveBtn(event: any) {
    if (event.target.classList.contains('mat-icon')) {
      event.target.parentElement.parentElement.style.display = 'block';
    } else {
      event.target.style.display = 'block';
    }
  }

  removeImage(event: any, id: string) {
    this.hideRemoveBtn(event);
    this.settingsService.deleteImage(id).subscribe(
      () => {
        this.images = this.images.filter((image) => image._id !== id);
      },
      () => {
        this.showRemoveBtn(event);
        alert(
          'حدث خطأ أثناء حذف الصورة، من فضلك حاول مرة أخري أو قم بالاتصال بالدعم'
        );
      }
    );
  }
}
