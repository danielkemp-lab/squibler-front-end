import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-toolbar',
  templateUrl: './image-toolbar.component.html',
  styleUrls: ['./image-toolbar.component.scss']
})
export class ImageToolbarComponent {

    @Input() linkAvailability;
    @Output() onImageFormat = new EventEmitter();
    @Input() fontFamilyText = 'Lora';
    @Input() boldBtnClass = '';
    @Input() italicBtnClass = '';
    @Input() underlineBtnClass = '';
    @Input() toolbarPositionTop;
    @Input() isTopPosition;
    @Input() isBottomPosition;
    alignClass = 'fa fa-align-justify';
    alignStatus = false;
    fontFamilyStatus = false;
    displayStatus = false;
    styleStatus = false;
    altStatus = false;
    captionStatus = false;
    resizeStatus = false;
    linkStatus = false;
    editLinkStatus = false;
    alignToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';
    displayToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';
    styleToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';
    altToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';
    resizeToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';
    captionToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';
    editLinkToggleClass = 'te-command te-btn te-dropdown te-selection te-active ';

    round(): void {
        this.onImageFormat.emit({ action: 'style', value: {borderRadius: '50%'}});
        this.toggleStyleDropdown();
    }
    border(): void {
        this.onImageFormat.emit({ action: 'style', value: {border: '5px solid rgb(204, 204, 204)'}});
        this.toggleStyleDropdown();
    }
    shadow(): void {
        this.onImageFormat.emit({ action: 'style', value: {boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.16) 0px 1px 1px 1px'}});
        this.toggleStyleDropdown();
    }
    alignCenter(): void {
        this.onImageFormat.emit({ action: 'style', value: {textAlign: 'center'}});
        this.toggleAlignDropdown();
    }
    alignRight(): void {
        this.onImageFormat.emit({ action: 'style', value: {textAlign: 'right'}});
        this.toggleAlignDropdown();
    }
    alignLeft(): void {
        this.onImageFormat.emit({ action: 'style', value:  {textAlign: 'left'}});
        this.toggleAlignDropdown();
    }
    delete(): void {
        this.onImageFormat.emit({ action: 'delete' });
    }
    captionToggle(): void {
        this.captionStatus = !this.captionStatus;
        if(this.fontFamilyStatus) this.fontFamilyStatus = false;
    }
    caption(e): void {
        this.captionToggle();
        this.onImageFormat.emit({ action: 'caption', value: e.srcElement.value});
    }
    inline(): void {
        this.onImageFormat.emit({ action: 'style', value: {display: 'inline-block'}});
        this.toggleDisplayDropdown();
    }
    block(): void {
        this.onImageFormat.emit({ action: 'style', value:   {display: 'block'}});
        this.toggleDisplayDropdown();
    }
    altTextToggle(): void {
        this.altStatus = !this.altStatus;
        if(this.fontFamilyStatus) this.fontFamilyStatus = false;
    }
    altText(e): void {
        this.altTextToggle();
        this.onImageFormat.emit({ action: 'alt', value: e.srcElement.value});
    }
    resizeToggle(): void {
        this.resizeStatus = !this.resizeStatus;
        if(this.fontFamilyStatus) this.fontFamilyStatus = false;
    }
    resize(): void {
        this.resizeToggle();
        const width = (document.getElementById("te-image-size-layer-width-2") as HTMLInputElement).value;
        const height = (document.getElementById("te-image-size-layer-height2") as HTMLInputElement).value;
        this.onImageFormat.emit({ action: 'style', value: {width: parseInt(width) + 'px', height: parseInt(height) + 'px'}});
    }
    toggleAlignDropdown(): void {
        this.alignStatus = !this.alignStatus;
        if(this.fontFamilyStatus) this.fontFamilyStatus = false;

    }
    toggleDisplayDropdown(): void {
        this.displayStatus = !this.displayStatus;
        if(this.fontFamilyStatus) this.fontFamilyStatus = false;

    }
    toggleStyleDropdown(): void {
        this.styleStatus = !this.styleStatus;
        if(this.fontFamilyStatus) this.fontFamilyStatus = false;

    }
    toggleLinkInput(): void {
        this.editLinkStatus = !this.editLinkStatus;
        if(this.fontFamilyStatus) this.fontFamilyStatus = false;

    }
    openlink(): void {
        window.open(this.linkAvailability, '_blank');
    }
    unlink(): void {
        this.linkAvailability = '#';
        this.onImageFormat.emit({ action: 'link', value: this.linkAvailability});
    }
    link(e): void {
        if (e) {
            this.linkAvailability = e.target.value;
            this.onImageFormat.emit({ action: 'link', value: this.linkAvailability});
        } else {
            this.linkAvailability = '';
        }
        this.toggleLinkInput();
    }
}
