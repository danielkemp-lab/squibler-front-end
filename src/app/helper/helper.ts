import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

export const helper = (fieldName, value, inputDebug) => {
  const emailInput = inputDebug.query(By.css(`input[name=${fieldName}]`));
  const inputEmailChanged: HTMLInputElement = emailInput.nativeElement;
  inputEmailChanged.value = value;
  inputEmailChanged.dispatchEvent(new Event('input'));

  return value;
};

export const getSelectedItem = (fixture, itemClass) => {
  const bannerDe: DebugElement = fixture.debugElement;
  const bannerEl: HTMLElement = bannerDe.nativeElement;
  const tdValue = bannerEl.querySelector(itemClass);

  return tdValue;
};

export const getCurrentUrlParams = () => {
  const splitter = location.pathname.split('/');
  let urlProjectId;
  let urlSectionId;
  let urlSubSectionId;
  let urlBoardId;
  splitter.forEach((item, i, _arr) => {
    if (item === 'projects') {
      urlProjectId = splitter[i + 1];
    }
    if (item === 'sections') {
      urlSectionId = splitter[i + 1];
    }
    if (item === 'subsections') {
      urlSubSectionId = splitter[i + 1];
    }
    if (item === 'boards') {
      urlBoardId = Number(splitter[i + 1]);
    }
  });

  return {
    urlProjectId,
    urlSectionId,
    urlSubSectionId,
    urlBoardId
  };
};

export const getFroalaOptions = events => ({
  key: environment.froalaKey,
  events,
  tooltips: false,
  placeholderText: 'Start writing here...',
  toolbarButtons: [
    'fontFamily',
    'Add Section',
    'bold',
    'italic',
    'underline',
    'formatUL',
    'align',
    'insertImage'
  ],
  fontFamily: {
    "'Times New Roman',Times,serif": 'Times New Roman',
    "'Arial'": 'Arial',
    "'Courier'": 'Courier',
    "'Garamond'": 'Garamond',
    // "'Comic Sans'": 'Comic Sans',
    "'Papyrus'": 'Papyrus',
    "'Palatino'": 'Palatino',
    "'Century Schoolbook'": 'Century Schoolbook',
    "'Georgia'": 'Georgia',
    "'Australian Sunset'": 'Australian Sunset',
    "'Adobe Caslon Pro'": 'Adobe Caslon Pro',
    "'Bembo'": 'Bembo',
    "'ITC Baskerville'": 'ITC Baskerville',
    "'Minion Pro'": 'Minion Pro',
    "'Garamond Premier Pro'": 'Garamond Premier Pro',
    "'Franklin Gothic Medium'": 'Franklin Gothic Medium',
    "'Janson'": 'Janson',
    "'Futura'": 'Futura',

  },
  charCounterCount: false,
  imageUploadURL: `${environment.backUrlImage}/upload`,
  imageMaxSize: 10 * 10000 * 10000,
  paragraphFormatSelection: true,
  fontFamilySelection: true,
  requestHeaders: {
    Authorization: `JWT ${localStorage.token}`
  },
  fontSizeSelection: true,
  quickInsertButtons: []
});
