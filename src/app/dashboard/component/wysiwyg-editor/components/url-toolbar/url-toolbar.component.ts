import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

@Component({
  selector: 'app-url-toolbar',
  templateUrl: './url-toolbar.component.html',
  styleUrls: ['./url-toolbar.component.scss']
})
export class UrlToolbarComponent {

    @Input() configs;
    @Output() onUrlFormat = new EventEmitter();
    @Input() urlLinkSelected;
    @Input() toolbarPositionTop;
    @Input() toolbarPositionLeft;
    isLinkStyleActive = false;
    isGreenActive = false;
    isThickActive = false;
    editActive = false;

    @ViewChild('urlLink') urlLink;
    @ViewChild('urlText') urlText;
    @ViewChild('urlBlank') urlBlank;

    ngOnInit(): void {
        this.isGreenActive = this.urlLinkSelected.style.color === '' ? false : true;
        this.isThickActive = this.urlLinkSelected.style.fontWeight === '' ? false : true;
        this.urlLink.nativeElement.value = this.urlLinkSelected.href;
        this.urlText.nativeElement.value = this.urlLinkSelected.innerText;
        this.urlBlank.nativeElement.checked = this.urlLinkSelected.target ? true : false;
    }

    openNewTab(): void {
        window.open(this.urlLinkSelected.href);
    }

    openUrlEditor(): void {
        this.editActive = !this.editActive;
    }

    onLinkStyleClick(): void {
        this.isLinkStyleActive = !this.isLinkStyleActive;
    }

    onLinkStyleGreenClick(): void {
        this.isGreenActive = !this.isGreenActive;
        if (this.isGreenActive){
            this.urlLinkSelected.style.color = 'green';
        } else {
            this.urlLinkSelected.style.color = '';
        }
        this.onUrlFormat.emit({ action: 'foreColor'});
    }

    unlink(): void {
        const text = this.urlLinkSelected.innerText;
        this.urlLinkSelected.remove();
        this.onUrlFormat.emit({action: "insertHTML", value: text});
    }

    selectText(): void {
        if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(this.urlLinkSelected);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    onLinkStyleThickClick(): void {
        this.isThickActive = !this.isThickActive;
        this.selectText();
        this.onUrlFormat.emit({ action: 'styleWithCss', value: true});
        this.onUrlFormat.emit({ action: 'bold'});
    }

    onUrlInsert(): void {
        const link = this.urlLink.nativeElement.value;
        const text = this.urlText.nativeElement.value;
        const newTab = this.urlBlank.nativeElement.checked;
        this.openUrlEditor();
        this.onUrlFormat.emit({ text: text, link: link , newTab: newTab});
    }
}
