import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent {
  @Input() configs;
  @Output() onFormat = new EventEmitter();
  @Output() onImageUpload = new EventEmitter();
  @Output() onUrlAdd = new EventEmitter();

  @Input() fontFamilyText = 'Lora';
  fontFamilyStatus = false;
  urlSearchStatus = false;
  alignClass = 'fa fa-align-justify';
  alignToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';
  alignStatus = false;
  btnClass = "te-command te-btn te-btn-font_awesome";
  @Input() boldBtnClass = '';
  @Input() urlBtnClass = '';
  @Input() italicBtnClass = '';
  @Input() underlineBtnClass = '';

  @ViewChild('urlLink') urlLink;
  @ViewChild('urlText') urlText;
  @ViewChild('urlBlank') urlBlank;

  listBtnClass = '';

  getBtnClass(action): string {
    return document.queryCommandState(action) ? ' te-active' : '';
  }

  bold(): void {
    this.onFormat.emit({ action: 'bold' });
    this.boldBtnClass = this.getBtnClass('bold');
  }
  italic(): void {
    this.onFormat.emit({ action: 'italic' });
    this.italicBtnClass = this.getBtnClass('italic');
  }
  underline(): void {
    this.onFormat.emit({ action: 'underline' });
    this.underlineBtnClass = this.getBtnClass('underline');
  }
  insertUnorderedList(): void {
    this.onFormat.emit({ action: 'insertUnorderedList' });
    this.listBtnClass = this.getBtnClass('insertUnorderedList');
  }
  fontchange(fontName, fontValue): void {
    this.fontFamilyText = fontName;
    this.onFormat.emit({ action: 'fontName', value: fontValue });
    this.toggleFontDropdown();
  }
  alignCenter(): void {
    this.onFormat.emit({ action: 'justifyCenter' });
    this.alignClass = 'fa fa-align-center';
    this.alignStatus = !this.alignStatus;
  }
  alignRight(): void {
    this.onFormat.emit({ action: 'justifyRight' });
    this.alignClass = 'fa fa-align-right';
    this.alignStatus = !this.alignStatus;
  }
  alignLeft(): void {
    this.onFormat.emit({ action: 'justifyLeft' });
    this.alignClass = 'fa fa-align-left';
    this.alignStatus = !this.alignStatus;
  }
  alignFull(): void {
    this.onFormat.emit({ action: 'justifyFull' });
    this.alignClass = 'fa fa-align-justify';
    this.alignStatus = !this.alignStatus;
  }
  toggleFontDropdown(): void {
    this.fontFamilyStatus = !this.fontFamilyStatus;
    if(this.alignStatus) this.alignStatus = false;
  }
  toggleAlignDropdown(): void {
    this.alignStatus = !this.alignStatus;
    if(this.fontFamilyStatus) this.fontFamilyStatus = false;

  }

  urlSearchBtnClick(){
    this.urlSearchStatus = !this.urlSearchStatus;
  }

  linkClick(linkName, linkValue){
    this.urlLink.nativeElement.value = linkValue;
    this.urlText.nativeElement.value = linkName;
    this.urlBlank.nativeElement.checked = true;
    this.urlSearchStatus = false;
  }
  imageUploaderToggle(): void {
    this.configs.imageUploadSpaceOpen = !this.configs.imageUploadSpaceOpen;
    this.configs.urlInsertSpaceOpen = false;
  }

  urlInsertToggle(): void {
    this.configs.urlInsertSpaceOpen = !this.configs.urlInsertSpaceOpen;
    this.configs.imageUploadSpaceOpen = false;
  }

  onFileChange(event): void {
      if (event.target.files && event.target.files[0]) {
          this.onImageUpload.emit({ _event: event, value: event.target.files[0] });
      }
  }

  onUrlInsert(): void {
    const link = this.urlLink.nativeElement.value;
    const text = this.urlText.nativeElement.value;
    const newTab = this.urlBlank.nativeElement.checked;
    this.configs.urlInsertSpaceOpen = false;
    this.onUrlAdd.emit({ text: text, link: link , newTab: newTab});
  }
}
