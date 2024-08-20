import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @Output('files_uploaded') files_uploaded: EventEmitter<any> = new EventEmitter();
  @Input('max_file_size') max_file_size: number = 10;
  @Input('max_file_count') max_file_count: number = 5;
  @Input('disabled') disabled: boolean = false;
  @Input('is_on_table') is_on_table: boolean = false;
  @Input('required') required: boolean = true;
  @Input('files') files: any[] = [];
  @Input('folder') folder: string = 'general';
  @Input('accept') accept: string = '*';
  validate_file_size: boolean = false;

  constructor(
    private fileServerService: FileSaverService
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.validate_files();
  }

  delete_file(file: any) {
    let new_files: NgxFileDropEntry[] = [];
    this.files.forEach(element => {
      if (element != file) {
        new_files.push(element);
      }
    });
    this.files = new_files;
    this.return_files();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.validate_file_size = true;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (reader.result != null) {
              if (this.accept == 'image/*') {
                if (file.type.toString().search('image') != -1) {
                  let new_file = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    file_base64: reader.result.toString().split(',')[1],
                  };
                  if (file.size > (this.max_file_size * 1024 * 1024)) {
                    this.validate_file_size = false;
                  }
                  this.files.push(new_file);
                  this.return_files();
                }
              } else {
                let new_file = {
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  file_base64: reader.result.toString().split(',')[1],
                };
                if (file.size > (this.max_file_size * 1024 * 1024)) {
                  this.validate_file_size = false;
                }
                this.files.push(new_file);
                this.return_files();
              }
            }
          };
        });
      }
    }
  }

  return_files() {
    this.files_uploaded.emit(
      {files: this.files, validated: this.validate_files()}
    );
  }

  validate_files(): boolean {
    this.validate_file_size = true;
    this.files.forEach((file: File) => {
      if (file.size > (this.max_file_size * 1024 * 1024)) {
        this.validate_file_size = false;
      }
    });
    let exceded_quantity: boolean = this.files.length > this.max_file_count;
    let no_files: boolean = this.files.length == 0;
    let fail_file_size: boolean = !this.validate_file_size;
    let no_pass: boolean = exceded_quantity || no_files || fail_file_size;
    return !no_pass;
  }

  download(item: any) {
    const byteCharacters = atob(item.file_base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: item.type});
    this.fileServerService.save(blob, item.name);
  }
}
